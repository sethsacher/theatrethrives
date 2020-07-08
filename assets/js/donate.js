// PAYMENT
var amount = 25;
var rawAmount = amount;
var feeAmount = 1.03;
var coverFees = true;
var submitButton = document.querySelector('#submit-button');
submitButton.disabled = false;

var sameAddress = document.querySelector('#same-address');
sameAddress.value = 'false'

var isProd = window.location.hostname.includes('theatrethrives.org');
console.log('Prod environment? ' + isProd);

// PATRON INFORMATION
var billingFields = [
  'email',
  'billing-phone',
  'billing-given-name',
  'billing-surname',
  'billing-street-address',
  'billing-extended-address',
  'billing-locality',
  'billing-region',
  'billing-postal-code',
  'billing-country-code'
].reduce(function (fields, fieldName) {
  var field = fields[fieldName] = {
    input: document.getElementById(fieldName),
    help: document.getElementById('help-' + fieldName)
  };

  field.input.addEventListener('focus', function () {
    clearFieldValidations(field);
  });

  return fields;
}, {});

var shippingFields = [
  'shipping-given-name',
  'shipping-surname',
  'shipping-street-address',
  'shipping-extended-address',
  'shipping-locality',
  'shipping-region',
  'shipping-postal-code',
  'shipping-country-code'
].reduce(function (fields, fieldName) {
  var field = fields[fieldName] = {
    input: document.getElementById(fieldName),
    help: document.getElementById('help-' + fieldName)
  };

  field.input.addEventListener('focus', function () {
    clearFieldValidations(field);
  });

  return fields;
}, {});

function clearFieldValidations(field) {
  field.help.innerText = '';
  field.help.parentNode.classList.remove('has-error');
}

billingFields['billing-country-code'].input.value = "US";
shippingFields['shipping-country-code'].input.value = "US";
billingFields['billing-extended-address'].optional = true;
shippingFields['shipping-extended-address'].optional = true;

function validateFields(fields) {
  var isValid = true;

  Object.keys(fields).forEach(function (fieldName) {
    var fieldEmpty = false;
    var field = fields[fieldName];

    if (field.optional) {
      return;
    }

    fieldEmpty = field.input.value.trim() === '';

    if (fieldEmpty) {
      isValid = false;
      field.help.innerText = 'Field cannot be blank.';
      field.help.parentNode.classList.add('has-error');
    } else {
      clearFieldValidations(field);
    }
  });

  return isValid;
}

function toggleDisableFields(fields) {
  Object.keys(fields).forEach(function (fieldName) {
    if (!fieldName.includes('country-code')) {
      var field = fields[fieldName];
      field.input.disabled = !field.input.disabled
    }
  });

  return;
}

function setBillingTestData() {
  billingFields.email.input.value = "test@test.com";
  billingFields['billing-given-name'].input.value = "Seth";
  billingFields['billing-surname'].input.value = "Sacher";
  billingFields['billing-phone'].input.value = "1231231234";
  billingFields['billing-street-address'].input.value = "123 Fake St";
  billingFields['billing-extended-address'].input.value = "Apt 100";
  billingFields['billing-locality'].input.value = "Arlington";
  billingFields['billing-region'].input.value = "VA";
  billingFields['billing-postal-code'].input.value = "12345";
  billingFields['billing-country-code'].input.value = "US";
  return;
}

function mapBillingToShipping() {
  shippingFields['shipping-given-name'].input.value = billingFields['billing-given-name'].input.value;
  shippingFields['shipping-surname'].input.value = billingFields['billing-surname'].input.value;
  shippingFields['shipping-phone'].input.value = billingFields['billing-phone'].input.value.replace(/[\(\)\s\-]/g, '');
  shippingFields['shipping-street-address'].input.value = billingFields['billing-street-address'].input.value;
  shippingFields['shipping-extended-address'].input.value = billingFields['billing-extended-address'].input.value;
  shippingFields['shipping-locality'].input.value = billingFields['billing-locality'].input.value;
  shippingFields['shipping-region'].input.value = billingFields['billing-region'].input.value;
  shippingFields['shipping-postal-code'].input.value = billingFields['billing-postal-code'].input.value;
  shippingFields['shipping-country-code'].input.value = billingFields['billing-country-code'].input.value;
  return;
}

function enablePayNow() {
  submitButton.value = 'Submit Payment';
  submitButton.removeAttribute('disabled');
}

$(document).ready(function () {
  $('#same-address').on('change', function (e) {
    e.preventDefault();
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
      toggleDisableFields(shippingFields);
    } else {
      $(this).attr('value', 'false');
      toggleDisableFields(shippingFields);
    }
  });
})

// BRAINTREE CLIENT TOKEN
$.ajax({
  type: 'POST',
  url: isProd
    ? 'https://fep49t1mdc.execute-api.us-east-1.amazonaws.com/Prod/donate'
    : 'https://o2iaftp5s0.execute-api.us-east-1.amazonaws.com/Stage/donate',
  data: JSON.stringify({
    type: 'TOKEN'
  }),
  headers: {
    'content-type': 'application/json',
    'x-amz-docs-region': 'us-east-1',
  },
}).done(function (result) {

  // BRAINTREE PAYMENT
  braintree.dropin
    .create({
      // authorization: isProd
      //   ? 'sandbox_8hxgrcnv_y5nk3gv4jqys8ywn'
      //   : 'sandbox_8hxgrcnv_y5nk3gv4jqys8ywn',
      authorization: result.clientToken,
      container: '#dropin-container',
      threeDSecure: true,
      card: {
        cardholderName: {
          required: true,
        },
      },
    })
    .then(function (dropinInstance) {
      enablePayNow();

      submitButton.addEventListener('click', function () {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.value = 'Processing...';

        if (sameAddress.value === 'true') {
          mapBillingToShipping()
        }

        var billingIsValid = validateFields(billingFields);
        var shippingIsValid = validateFields(shippingFields);

        if (!billingIsValid || !shippingIsValid) {
          enablePayNow();
          return;
        }

        var customer = {
          firstName: billingFields['billing-given-name'].input.value,
          lastName: billingFields['billing-surname'].input.value,
          phone: billingFields['billing-phone'].input.value.replace(/[\(\)\s\-]/g, ''), // remove (), spaces, and - from phone number
          email: billingFields.email.input.value
        }

        var billingAddress = {
          firstName: billingFields['billing-given-name'].input.value,
          lastName: billingFields['billing-surname'].input.value,
          streetAddress: billingFields['billing-street-address'].input.value,
          extendedAddress: billingFields['billing-extended-address'].input.value,
          locality: billingFields['billing-locality'].input.value,
          region: billingFields['billing-region'].input.value,
          postalCode: billingFields['billing-postal-code'].input.value,
          countryCodeAlpha2: billingFields['billing-country-code'].input.value
        };

        var shippingAddress = {
          firstName: shippingFields['shipping-given-name'].input.value,
          lastName: shippingFields['shipping-surname'].input.value,
          streetAddress: shippingFields['shipping-street-address'].input.value,
          extendedAddress: shippingFields['shipping-extended-address'].input.value,
          locality: shippingFields['shipping-locality'].input.value,
          region: shippingFields['shipping-region'].input.value,
          postalCode: shippingFields['shipping-postal-code'].input.value,
          countryCodeAlpha2: shippingFields['shipping-country-code'].input.value
        };

        dropinInstance
          .requestPaymentMethod({
            threeDSecure: {
              amount,
              email: billingFields.email.input.value,
              billingAddress
            }
          })
          .then(function (payload) {
            // Send payload.nonce to your server
            $.ajax({
              type: 'POST',
              url: isProd
                ? 'https://fep49t1mdc.execute-api.us-east-1.amazonaws.com/Prod/donate'
                : 'https://o2iaftp5s0.execute-api.us-east-1.amazonaws.com/Stage/donate',
              data: JSON.stringify({
                type: 'PAYMENT',
                nonce: payload.nonce,
                amount: amount,
                customer,
                billingAddress,
                shippingAddress
              }),
              headers: {
                'content-type': 'application/json',
                'x-amz-docs-region': 'us-east-1',
              },
            }).done(function (result) {
              console.log(result);

              // Tear down the Drop-in UI
              dropinInstance.teardown(function (teardownErr) {
                if (teardownErr) {
                  console.error('Could not tear down Drop-in UI!');
                } else {
                  console.info('Drop-in UI has been torn down!');
                  // Remove the 'Submit payment' button
                  $('#submit-button').remove();
                }
              });

              if (result.success) {
                $('#checkout-message').html(
                  `<h2>Thank you for your donation!</h2>
              <p>Your generous donation of $${result.transaction.amount} goes a long way 
              in supporting DC-area community theatres. Thank you for supporting the arts!</p>
              <p>Refresh to make another donation.</p>`
                );
              } else {
                $('#checkout-message').html(
                  '<h2>Error</h2><p>An error has occurred. Please contact your administrator.</p>'
                );
              }
            });
          })
          .catch(function (err) {
            // Handle errors in requesting payment method
            console.log('tokenization error:');
            console.log(err);
            dropinInstance.clearSelectedPaymentMethod();
            enablePayNow();

            return;
          });
      });
    })
    .catch(function (err) {
      // Handle any errors that might've occurred when creating Drop-in
      console.error(err);
    });
}).catch(function (err) {
  console.log(err);
  return;
});

// AMOUNT
// https://codepen.io/sleepysensei/pen/jEaNro
$(document).ready(function () {
  setBillingTestData()
  // $('#searchbar').focus();

  // Set initial donation amount
  amount = rawAmount * feeAmount;
  $('#amount').html(amount);

  $('#donate-buttons').on('click', '.btn-blue', function (e) {
    e.preventDefault();
    $('.active').removeClass('active');
    $('#donate-other-input').hide().siblings('#donate-other').show();
    $(this).filter('.btn-blue').addClass('active');
    var value = $(this).data('impact');
    rawAmount = $(this).data('dollars');
    amount = coverFees ? rawAmount * feeAmount : rawAmount;
    $(this)
      .closest('div')
      .find('p')
      .text('' + value);
    $('#donate-other-input').find('input').val('');
    $('#amount').html(amount);
  });

  $('#fees').on('change', function (e) {
    e.preventDefault();
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
      coverFees = true;
      amount = rawAmount * feeAmount;
      $('#amount').html(amount);
    } else {
      $(this).attr('value', 'false');
      coverFees = false;
      amount = rawAmount;
      $('#amount').html(amount);
    }
  });

  // $('.btn-green').on('click', function () {
  //   var dollar;
  //   var input = $('#donate-other-input').find('input').val();
  //   if (!input) {
  //     dollar = $('.active').data('dollars');
  //   } else if ($.trim(input) === '' || isNaN(input)) {
  //     // empty space leaves value = 'undefined'.
  //     // Have to fix $.trim(input) == '' above so that it works.
  //     console.log('Yes');
  //     dollar = 'Please enter a number.';
  //   } else {
  //     dollar = input;
  //   }
  //   $('#price').text('' + dollar);
  // });

  $('#donate-other').on('click', function (e) {
    e.preventDefault();
    submitButton.disabled = true;
    var buttons = $(this).parent('#donate-buttons');
    buttons.find('.active').removeClass('active');
    var other = $(this).hide().siblings('#donate-other-input');
    other.show();
    other.find('input').focus();
    var pText = buttons.siblings('p');
    pText.text('Thank you!');
    var oValue = other.find('input');
    oValue.keyup(function () {
      if (
        oValue.val() === undefined ||
        oValue.val() === null ||
        $.trim(oValue.val()) === '' ||
        isNaN(oValue.val()) ||
        oValue.val() <= 0
      ) {
        $('#validation').html('<p>Please enter a valid number.</p>');
        submitButton.disabled = true;
      } else {
        $('#validation').html('<p></p>');
        submitButton.disabled = false;
        rawAmount = oValue.val();
        amount = coverFees ? rawAmount * feeAmount : rawAmount;
        $('#amount').html(amount);
      }
      // if (oValue.val() > 50) {
      //   pText.text(
      //     'Thank you!' +
      //       " You're donation covers housing and counseling services for " +
      //       oValue.val() / 25 +
      //       ' people.'
      //   );
      // } else {
      //   pText.text('Thank you!');
      // }
    });
  });
});
