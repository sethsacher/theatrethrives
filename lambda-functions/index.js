'use strict';

var braintree = require('braintree');
console.log('Loading Braintree payment function');

exports.handler = async (event) => {
  let nonce = '';
  let amount = '0';
  let headers = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  };
  console.log('request: ' + JSON.stringify(event));

  if (event.body) {
    let body = JSON.parse(event.body);
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

  // Create a new transaction for $10
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

  if (newTransaction.success) {
    return {
      statusCode: 200,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({
        ...newTransaction,
      }),
    };
  }

  return {
    statusCode: 500,
    headers: headers,
    isBase64Encoded: false,
    body: JSON.stringify({
      ...newTransaction,
    }),
  };
};
