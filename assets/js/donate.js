// PAYMENT
var button = document.querySelector('#submit-button');

braintree.dropin.create(
  {
    // Insert your tokenization key here
    authorization: 'sandbox_8hxgrcnv_y5nk3gv4jqys8ywn',
    container: '#dropin-container',
  },
  function (createErr, instance) {
    button.addEventListener('click', function () {
      instance.requestPaymentMethod(function (
        requestPaymentMethodErr,
        payload
      ) {
        // When the user clicks on the 'Submit payment' button this code will send the
        // encrypted payment information in a variable called a payment method nonce
        $.ajax({
          type: 'POST',
          url:
            'https://isohkkvws2.execute-api.us-east-1.amazonaws.com/Prod/donate',
          // data: JSON.stringify({
          //   nonce: payload.nonce,
          // }),
          headers: {
            'content-type': 'application/json',
            'x-amz-docs-region': 'us-east-1',
          },
        }).done(function (result) {
          console.log(result);
          // Tear down the Drop-in UI
          // instance.teardown(function (teardownErr) {
          //   if (teardownErr) {
          //     console.error('Could not tear down Drop-in UI!');
          //   } else {
          //     console.info('Drop-in UI has been torn down!');
          //     // Remove the 'Submit payment' button
          //     $('#submit-button').remove();
          //   }
          // });

          // if (result.success) {
          //   $('#checkout-message').html(
          //     '<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>'
          //   );
          // } else {
          //   console.log(result);
          //   $('#checkout-message').html(
          //     '<h1>Error</h1><p>Check your console.</p>'
          //   );
          // }
        });
      });
    });
  }
);

// AMOUNT
$(document).ready(function () {
  $('#searchbar').focus();

  $('#donate-buttons').on('click', '.btn-blue', function (e) {
    e.preventDefault();
    $('.active').removeClass('active');
    $('#donate-other-input').hide().siblings('#donate-other').show();
    $(this).filter('.btn-blue').addClass('active');
    var value = $(this).data('impact');
    $(this)
      .closest('div')
      .find('p')
      .text('' + value);
    $('#donate-other-input').find('input').val('');
  });

  $('.btn-green').on('click', function () {
    var dollar;
    var input = $('#donate-other-input').find('input').val();
    if (!input) {
      dollar = $('.active').data('dollars');
    } else if ($.trim(input) === '' || isNaN(input)) {
      // empty space leaves value = 'undefined'.
      // Have to fix $.trim(input) == '' above so that it works.
      console.log('Yes');
      dollar = 'Please enter a number.';
    } else {
      dollar = input;
    }
    $('#price').text('' + dollar);
  });

  $('#donate-other').on('click', function (e) {
    e.preventDefault();
    var buttons = $(this).parent('#donate-buttons');
    buttons.find('.active').removeClass('active');
    var other = $(this).hide().siblings('#donate-ther-input');
    other.show();
    other.find('input').focus();
    var pText = buttons.siblings('p');
    pText.text('Thank you!');
    var oValue = other.find('input');
    oValue.keyup(function () {
      if (oValue.val() > 50) {
        pText.text(
          'Thank you!' +
            " You're donation covers housing and counseling services for " +
            oValue.val() / 25 +
            ' people.'
        );
      } else {
        pText.text('Thank you!');
      }
    });
  });
});
