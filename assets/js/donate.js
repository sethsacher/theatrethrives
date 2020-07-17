// PAYMENT
var amount = 25;
var rawAmount = amount;
var feeAmount = 1.03;
var flatFee = 0.30
var coverFees = true;
var shareContactInfo = 'true';
var submitButton = document.querySelector('#submit');
submitButton.disabled = false;
var stripeSection = document.querySelector('#stripe');
var loadingError = document.querySelector('#loading-error');

var isProd = window.location.hostname.includes('theatrethrives.org');
if (!isProd) {
  console.log('Prod environment? ' + isProd);
}

var stripePk = (isProd) ? 'pk_live_51H4tSZLy4QiR4BrlDiEklGlApYdotMAYNLluyVVh9CvvMoQVTL7YGpirgr8WN02L4Zo278kW1j0lQvbw67RMQBKk00zXR3yEe5' : 'pk_test_51H4tSZLy4QiR4Brl5dD2xQ1fjYFcWequGWsxvUu5sT3sM5HTGc6yGcFA9twidcLygL4px0AFkpYgUIVjvvgERcUV002Z1BCDHe'

var theatres = [];

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

  // field.input.addEventListener('focus', function () {
  //   clearFieldValidations(field);
  // });

  return fields;
}, {});

billingFields['billing-country-code'].input.value = "US";
billingFields['billing-extended-address'].optional = true;

function setBillingTestData() {
  billingFields['email'].input.value = "test@test.com";
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

// setBillingTestData();

function calculateFeeAmount(amount) {
  return amount * feeAmount + flatFee
}

// Set initial donation amount
amount = calculateFeeAmount(rawAmount)

$(document).ready(function () {

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

})

// AMOUNT
// https://codepen.io/sleepysensei/pen/jEaNro
$(document).ready(function () {
  // $('#searchbar').focus();

  $('#amount').html("$" + amount);

  $('#donate-buttons').on('click', '.btn-blue', function (e) {
    e.preventDefault();
    $('#validation').html('<p>fewfew</p>');
    $('.active').removeClass('active');
    $('#donate-other-input').hide().siblings('#donate-other').show();
    $(this).filter('.btn-blue').addClass('active');
    var value = $(this).data('impact');
    rawAmount = $(this).data('dollars');
    amount = coverFees ? calculateFeeAmount(rawAmount) : rawAmount;
    $(this)
      .closest('div')
      .find('p')
      .text('' + value);
    $('#donate-other-input').find('input').val('');
    $('#amount').html("$" + amount);
  });

  $('#fees').on('change', function (e) {
    e.preventDefault();
    if ($(this).is(':checked')) {
      $(this).attr('value', 'true');
      coverFees = true;
      amount = calculateFeeAmount(rawAmount);
      $('#amount').html("$" + amount);
    } else {
      $(this).attr('value', 'false');
      coverFees = false;
      amount = rawAmount;
      $('#amount').html("$" + amount);
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
        amount = coverFees ? calculateFeeAmount(rawAmount) : rawAmount;
        $('#amount').html("$" + amount);
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

function hidePageElements() {
  document.querySelector("#stripe").classList.add("hidden");
  document.querySelector("#donation-amount").classList.add("hidden");
  document.querySelector("#donation-theatres").classList.add("hidden");
  document.querySelector("#donation-contact").classList.add("hidden");
  document.querySelector("#donation-billing").classList.add("hidden");
  document.querySelector("#donation-legal").classList.add("hidden");
}

function showLoadingError() {
  loadingError.classList.remove("hidden");
}

// STRIPE
// A reference to Stripe.js initialized with your real test publishable API key.
var stripe = Stripe(stripePk);

// Disable the button until we have Stripe set up on the page
submitButton.disabled = true;

// Create the Stripe payment window
var elements = stripe.elements();

var style = {
  base: {
    color: "#32325d",
    fontFamily: 'Open Sans',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#32325d"
    }
  },
  invalid: {
    fontFamily: 'Open Sans',
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

var card = elements.create("card", { style: style });
// Stripe injects an iframe into the DOM
card.mount("#card-element");
submitButton.disabled = false;

card.on("change", function (event) {
  // Disable the Pay button if there are no card details in the Element
  // submitButton.disabled = event.empty;
  document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
});

var form = document.getElementById("payment-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  submitButton.disabled = true;
  // Complete payment when the submit button is clicked
  updatePayment(stripe, card);
});


// Update PaymentIntent with customer inputs
var updatePayment = function (stripe, card) {
  fetch(isProd
    ? 'https://fep49t1mdc.execute-api.us-east-1.amazonaws.com/Prod/donate'
    : 'https://o2iaftp5s0.execute-api.us-east-1.amazonaws.com/Stage/donate', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'x-amz-docs-region': 'us-east-1',
    },
    body: JSON.stringify({
      type: 'PAYMENT',
      amount,
      shareContactInfo,
      theatres,
      email: billingFields['email'].input.value,
      phone: billingFields['billing-phone'].input.value.replace(/[\(\)\s\-]/g, '')
    })
  })
    .then(function (result) {
      if (result.status !== 200) {
        return result.json()
          .then((json) => {
            console.log(json)
            showLoadingError();
            hidePageElements();
          });
      } else {
        return result.json();
      }
    })
    .then(function (data) {
      payWithCard(stripe, card, data.clientSecret);
    })
    .catch(function (error) {
      console.log(error)
      submitButton.disabled = false;
      // stripeSection.style.display = "none";
      // loadingError.classList.remove("hidden");
      // hidePageElements();
    });
}

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function (stripe, card, clientSecret) {
  loading(true);
  stripe
    .confirmCardPayment(clientSecret, {
      receipt_email: billingFields['email'].input.value,
      payment_method: {
        card: card,
        billing_details: {
          address: {
            city: billingFields['billing-locality'].input.value,
            country: billingFields['billing-country-code'].input.value,
            line1: billingFields['billing-street-address'].input.value,
            line2: billingFields['billing-extended-address'].input.value,
            postal_code: billingFields['billing-postal-code'].input.value,
            state: billingFields['billing-region'].input.value
          },
          email: billingFields['email'].input.value,
          name: billingFields['billing-given-name'].input.value + " " + billingFields['billing-surname'].input.value,
          phone: billingFields['billing-phone'].input.value.replace(/[\(\)\s\-]/g, '')
        }
      },
    })
    .then(function (result) {
      // console.log(result);
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment succeeded!
        orderComplete(result.paymentIntent.amount);
      }
    });
};

/* ------- UI helpers ------- */

// Shows a success message when the payment is complete
var orderComplete = function (paymentAmount) {
  loading(false);
  document
    .querySelector(".result-message")
    .innerHTML = `<h2>Thank you for your donation!</h2>
    <p>Your generous donation of $${paymentAmount / 100} is greatly appreciated by 
    all of the participating theatre companies of Community Theatre Thrives. Each donation 
    will be shared among the participating theatre companies and helps support live theatre across 
    the Washington, DC metropolitan area. If you would like to be provided with a 
    donation letter for tax purposes, Reston Community Players will be happy to supply one.
    Please email us at communitytheatrethrives@restonplayers.org.</p>
    
    <p>Refresh to make another donation.</p>`
  document.querySelector(".result-message").classList.remove("hidden");
  hidePageElements();
  submitButton.disabled = true;
};

// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
  loading(false);
  submitButton.disabled = false;
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
    submitButton.disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    submitButton.disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};
