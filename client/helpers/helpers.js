'use strict'

const $ = require('jquery')
var request = require('request');
// Submit signed Transaction to validator
const {
  signer,
  BatchEncoder,
  TransactionEncoder
} = require('sawtooth-sdk/client')

var Vehicle = require('../models/vehicles');

// Config variables
const KEY_NAME = 'transfer-chain.keys'
const API_URL = 'http://localhost:8008'

const FAMILY = 'transfer-chain'
const VERSION = '0.0'
const PREFIX = '19d832'


const submitUpdate = (payload, privateKey, cb, vehicle_name) => {
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
      //map the address with vehicle id
      var obj = JSON.parse(response.body);

      var fields = obj.link.split(/=/);
      var id_link = fields[1];

      console.log(id_link);

      var newVehicle = new Vehicle({
        vehicle_no: vehicle_name,
        link: id_link
      });

      Vehicle.createVehicle(newVehicle, function (err, user) {
        if (err) throw err;
      });

    }
    catch (err) {
      console.log("some error occured submitting the data");
    }
  });
}

function randomNameGenerator(){
  var s = Math.random().toString(36).substring(2);
  return s;
}




module.exports = {
  submitUpdate,
  randomNameGenerator
}