'use strict';

var braintree = require('braintree');
console.log('Loading Braintree function');

exports.handler = async (event) => {
  let nonce = '';
  let amount = '0';
  let type = '';
  let headers = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
  console.log('request: ' + JSON.stringify(event));

  if (event.body) {
    let body = JSON.parse(event.body);
    // TYPE is either TOKEN or PAYMENT
    if (body.type) type = body.type;
    if (body.nonce) nonce = body.nonce;
    if (body.amount) amount = body.amount;
  }

  var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: process.env.BT_MERCHANT_ID,
    publicKey: process.env.BT_PUBLIC_KEY,
    privateKey: process.env.BT_PRIVATE_KEY,
  });

  if (type === 'TOKEN') {
    var generateToken = await gateway.clientToken.generate({});

    return {
      statusCode: (generateToken.success) ? 200 : 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({
        ...generateToken,
      }),
    };

  } else if (type === 'PAYMENT') {
    // Create a new transaction
    var newTransaction = await gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true,
      },
    });

    console.log('transaction: ' + JSON.stringify(newTransaction));

    return {
      statusCode: (newTransaction.success) ? 200 : 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({
        ...newTransaction,
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
