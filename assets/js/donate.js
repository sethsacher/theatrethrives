// PAYMENT
var amount = 25;
var rawAmount = amount;
var feeAmount = 1.03;
var coverFees = true;
var shareContactInfo = 'true';
// var submitButton = document.querySelector('#submit-button');
// submitButton.disabled = false;

var sameAddress = document.querySelector('#same-address');
sameAddress.value = 'false'

var isProd = window.location.hostname.includes('theatrethrives.org');
console.log('Prod environment? ' + isProd);

var theatres = [];
var tshirt;

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


  $('#contact').on('change', function (e) {
    e.preventDefault();
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
      shareContactInfo = 'true';
    } else {
      $(this).attr('value', 'false');
      shareContactInfo = 'false';
    }
  });

  $('#theatre').on('change', function (e) {
    e.preventDefault();
    theatres = $(this).val();
  });

  $('#tshirt').on('change', function (e) {
    e.preventDefault();
    tshirt = $(this).val();
  });
})

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

// STRIPE
// A reference to Stripe.js initialized with your real test publishable API key.
var stripe = Stripe("pk_test_51H4tSZLy4QiR4Brl5dD2xQ1fjYFcWequGWsxvUu5sT3sM5HTGc6yGcFA9twidcLygL4px0AFkpYgUIVjvvgERcUV002Z1BCDHe");

// The items the customer wants to buy
var purchase = {
  type: 'PAYMENT',
  items: [{ id: "xl-tshirt" }]
};

// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;
fetch(isProd
  ? 'https://fep49t1mdc.execute-api.us-east-1.amazonaws.com/Prod/donate'
  : 'https://o2iaftp5s0.execute-api.us-east-1.amazonaws.com/Stage/donate', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    'x-amz-docs-region': 'us-east-1',
  },
  body: JSON.stringify(purchase)
})
  .then(function (result) {
    return result.json();
  })
  .then(function (data) {
    var elements = stripe.elements();

    var style = {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };

    var card = elements.create("card", { style: style });
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");

    card.on("change", function (event) {
      // Disable the Pay button if there are no card details in the Element
      document.querySelector("button").disabled = event.empty;
      document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });

    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      // Complete payment when the submit button is clicked
      payWithCard(stripe, card, data.clientSecret);
    });
  });

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function (stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      receipt_email: document.getElementById('email').value,
      payment_method: {
        card: card
      }
    })
    .then(function (result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.id);
      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function (paymentIntentId) {
  loading(false);
  document
    .querySelector(".result-message a")
    .setAttribute(
      "href",
      "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    );
  document.querySelector(".result-message").classList.remove("hidden");
  document.querySelector("button").disabled = true;
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  var errorMsg = document.querySelector("#card-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function () {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var loading = function (isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
