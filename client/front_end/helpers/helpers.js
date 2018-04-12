'use strict'

const $ = require('jquery')
var request = require('request');
// Submit signed Transaction to validator
const {
  signer,
  BatchEncoder,
  TransactionEncoder
} = require('sawtooth-sdk/client')

// Config variables
const KEY_NAME = 'transfer-chain.keys'
const API_URL = 'http://localhost:8008'

const FAMILY = 'transfer-chain'
const VERSION = '0.0'
const PREFIX = '19d832'


const submitUpdate = (payload, privateKey, cb) => {
  console.log("sup-->" + payload);
  const transaction = new TransactionEncoder(privateKey, {
    inputs: [PREFIX],
    outputs: [PREFIX],
    familyName: FAMILY,
    familyVersion: VERSION,
    payloadEncoding: 'application/json',
    payloadEncoder: p => Buffer.from(JSON.stringify(p))
  }).create(payload)
  const batchBytes = new BatchEncoder(privateKey).createEncoded(transaction)

  request({
    url: API_URL+'/batches?wait',
    method: "POST",
    headers: {
      "content-type": "application/octet-stream",  // <--Very important!!!
    },
    processData: false,
    body: batchBytes
  }, function (error, response, body) {
    console.log(response);
  });
/*
  $.post({
    url: `${API_URL}/batches?wait`,
    data: batchBytes,
    headers: { 'Content-Type': 'application/octet-stream' },
    processData: false,
    // Any data object indicates the Batch was not committed
    success: ({ data }) => cb(!data),
    //error: () => cb(false)
    error: (data) => console.log(data)
  })
  */
}

module.exports = {
  submitUpdate
}