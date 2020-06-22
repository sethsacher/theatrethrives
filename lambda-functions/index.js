'use strict';

var braintree = require('braintree');
console.log('Loading Braintree payment function');

exports.handler = async (event) => {
  // let name = "you";
  // let city = 'World';
  // let time = 'day';
  // let day = '';
  let nonce = '';
  //   let responseCode = 200;
  console.log('request: ' + JSON.stringify(event));

  // if (event.queryStringParameters && event.queryStringParameters.name) {
  //     console.log("Received name: " + event.queryStringParameters.name);
  //     name = event.queryStringParameters.name;
  // }

  // if (event.queryStringParameters && event.queryStringParameters.city) {
  //     console.log("Received city: " + event.queryStringParameters.city);
  //     city = event.queryStringParameters.city;
  // }

  // if (event.headers && event.headers['day']) {
  //     console.log("Received day: " + event.headers.day);
  //     day = event.headers.day;
  // }

  // if (event.body) {
  //     let body = JSON.parse(event.body)
  //     if (body.time)
  //         time = body.time;
  // }

  if (event.body) {
    let body = JSON.parse(event.body);
    if (body.nonce) nonce = body.nonce;
  }

  // let greeting = `Good ${time}, ${name} of ${city}.`;
  // if (day) greeting += ` Happy ${day}!`;

  //   let responseBody = {
  //     message: greeting,
  //     input: event,
  //   };

  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: process.env.BT_MERCHANT_ID,
    publicKey: process.env.BT_PUBLIC_KEY,
    privateKey: process.env.BT_PRIVATE_KEY,
  });

  // Use the payment method nonce here
  var nonceFromTheClient = req.body.paymentMethodNonce;
  // Create a new transaction for $10
  var newTransaction = gateway.transaction.sale(
    {
      amount: '10.00',
      paymentMethodNonce: nonce,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true,
      },
    },
    function (error, result) {
      if (result) {
        let responseBody = {
          result,
          error: null,
        };

        // The output from a Lambda proxy integration must be
        // in the following JSON object. The 'headers' property
        // is for custom response headers in addition to standard
        // ones. The 'body' property  must be a JSON string. For
        // base64-encoded payload, you must also set the 'isBase64Encoded'
        // property to 'true'.
        let response = {
          statusCode: 200,
          headers: {
            'x-custom-header': 'my custom header value',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
          },
          body: JSON.stringify(responseBody),
        };
        console.log('response: ' + JSON.stringify(response));
        return response;
      } else {
        // res.status(500).send(error);
        let responseBody = {
          error,
          result: null,
        };

        let response = {
          statusCode: 500,
          headers: {
            'x-custom-header': 'my custom header value',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
          },
          body: JSON.stringify(responseBody),
        };
        console.log('response: ' + JSON.stringify(response));
        return response;
      }
    }
  );
};
