'use strict';

const stripe = require("stripe")(process.env.STRIPE_SK);
console.log('Loading Stripe function');

exports.handler = async (event) => {
  let nonce = '';
  let amount = '0';
  let type = '';
  let shareContactInfo = 'false';
  let customer;
  let billing;
  let shipping;
  let headers = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
  let theatres;
  let paymentIntentId;

  console.log('request: ' + JSON.stringify(event));

  if (event.body) {
    let body = JSON.parse(event.body);
    // TYPE is either TOKEN or PAYMENT
    if (body.type) type = body.type;
    if (body.nonce) nonce = body.nonce;
    if (body.amount) amount = body.amount;
    if (body.customer) customer = body.customer;
    if (body.billingAddress) billing = body.billingAddress;
    if (body.shippingAddress) shipping = body.shippingAddress;
    if (body.shareContactInfo) shareContactInfo = body.shareContactInfo;
    if (body.theatres) theatres = body.theatres;
    if (body.paymentIntentId) paymentIntentId = body.paymentIntentId;
  }
  // https://github.com/stripe/stripe-node#network-retries
  // Intermittent connection issues, add a retry to resolve
  if (type === 'TOKEN') {

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 100, //Cents
        maxNetworkRetries: 2,
        currency: "usd"
      });

      return {
        statusCode: 200,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({
          paymentIntentId: paymentIntent.id,
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

  } else if (type === 'PAYMENT') {

    try {
      const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
        amount: amount * 100, //Dollars to cents
        maxNetworkRetries: 2,
        metadata: {
          shareContactInfo: shareContactInfo,
          theatres: theatres
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
