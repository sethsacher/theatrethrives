// PAYMENT
var amount = 25;
var submitButton = document.querySelector('#submit-button');
submitButton.disabled = false;

var isProd = window.location.hostname.includes('theatrethrives.org');
console.log('Prod environment? ' + isProd);

braintree.dropin
  .create({
    authorization: isProd
      ? 'sandbox_8hxgrcnv_y5nk3gv4jqys8ywn'
      : 'sandbox_8hxgrcnv_y5nk3gv4jqys8ywn',
    container: '#dropin-container',
    card: {
      cardholderName: {
        required: true,
      },
    },
  })
  .then(function (dropinInstance) {
    submitButton.addEventListener('click', function () {
      dropinInstance
        .requestPaymentMethod()
        .then(function (payload) {
          // Send payload.nonce to your server
          $.ajax({
            type: 'POST',
            url: isProd
              ? 'https://o2iaftp5s0.execute-api.us-east-1.amazonaws.com/Prod/donate'
              : 'https://o2iaftp5s0.execute-api.us-east-1.amazonaws.com/Prod/donate',
            data: JSON.stringify({
              nonce: payload.nonce,
              amount: amount,
            }),
            headers: {
              'content-type': 'application/json',
              'x-amz-docs-region': 'us-east-1',
            },
          }).done(function (result) {
            // console.log(result);
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
          console.error(err);
        });
    });
  })
  .catch(function (err) {
    // Handle any errors that might've occurred when creating Drop-in
    console.error(err);
  });

// AMOUNT
// https://codepen.io/sleepysensei/pen/jEaNro
$(document).ready(function () {
  // $('#searchbar').focus();

  $('#donate-buttons').on('click', '.btn-blue', function (e) {
    e.preventDefault();
    $('.active').removeClass('active');
    $('#donate-other-input').hide().siblings('#donate-other').show();
    $(this).filter('.btn-blue').addClass('active');
    var value = $(this).data('impact');
    amount = $(this).data('dollars');
    $(this)
      .closest('div')
      .find('p')
      .text('' + value);
    $('#donate-other-input').find('input').val('');
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
        amount = oValue.val();
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
