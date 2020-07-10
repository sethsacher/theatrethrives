'use strict';

var braintree = require('braintree');
console.log('Loading Braintree function');

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
  let tshirt;
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
    if (body.tshirt) tshirt = body.tshirt;
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

  } else if (type === 'SEARCH') {
    let counter = 1;
    var stream = await gateway.transaction.search(function (search) {
      search.merchantAccountId().is(process.env.BT_MERCHANT_ID);
    });
    // response.each(function (err, transaction) {
    //   counter++;
    // });
    completeData = ""
    someWritableStream.on("data", function (chunk) {
      //Do Something With the chunk of data. You might want to concat the stream
      completeData += chunk;
    });

    someWritableStream.on("end", function () {
      //Do Something after the all the chunks are received.
      console.log(completeData);
    });
    return {
      statusCode: 200,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({
        test: stream,
      }),
    };
  } else if (type === 'PAYMENT') {
    // Create a new transaction
    var newTransaction = await gateway.transaction.sale({
      amount: amount,
      paymentMethodNonce: nonce,
      customFields: {
        share_contact_info: shareContactInfo,
        theatres_of_interest: theatres,
        tshirt_size: tshirt
      },
      customer,
      billing,
      shipping,
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
