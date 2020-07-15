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
  }

  var response = {
    status: 'Success!'
  }

  if (type === 'TOKEN') {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, //Dollars to cents
      currency: "usd"
    });

    return {
      statusCode: (true) ? 200 : 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
      }),
    };

  } else if (type === 'PAYMENT') {

    return {
      statusCode: (true) ? 200 : 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({
        ...response,
      }),
    };

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
