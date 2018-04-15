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
    url: API_URL + '/batches?wait',
    method: "POST",
    headers: {
      "content-type": "application/octet-stream",  // <--Very important!!!
    },
    processData: false,
    body: batchBytes
  }, function (error, response, body) {
    try {
      console.log(response.body);
    }
    catch (err) {
      console.log("some error occured submitting the data");
    }
  });
}




module.exports = {
  submitUpdate
}