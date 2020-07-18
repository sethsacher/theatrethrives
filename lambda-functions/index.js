'use strict';

// https://github.com/stripe/stripe-node#network-retries
// Intermittent connection issues, add a retry to resolve
const stripe = require("stripe")(process.env.STRIPE_SK, {
  maxNetworkRetries: 2
});
console.log('Loading Stripe function');

exports.handler = async (event) => {
  let amount = '0';
  let type = '';
  let shareContactInfo = 'false';
  let headers = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
  let theatres;
  let email;
  let phone;

  console.log('request: ' + JSON.stringify(event));

  if (event.body) {
    let body = JSON.parse(event.body);
    // TYPE is either TOKEN or PAYMENT
    if (body.type) type = body.type;
    if (body.amount) amount = body.amount;
    if (body.shareContactInfo) shareContactInfo = body.shareContactInfo;
    if (body.theatres) theatres = body.theatres;
    if (body.email) email = body.email;
    if (body.phone) phone = body.phone;
  }

  if (type === 'PAYMENT') {

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.trunc(amount * 100), //Dollars to cents
        currency: "usd",
        metadata: {
          shareContactInfo,
          theatres: theatres.toString(),
          email,
          phone
        }
      });

      return {
        statusCode: 200,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
        }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({
          ...err
        }),
      };
    }

  } else {
    return {
      statusCode: 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({
        error: 'No transaction type was passed',
      }),
    };
  }

};
