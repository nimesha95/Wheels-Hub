'use strict'

var express = require('express');
var router = express.Router();
var request = require('request');
const $ = require('jquery')
const {
	submitUpdate,
	submitUpdate_sync,
	randomNameGenerator
} = require('../helpers/helpers')

var Vehicle = require('../models/vehicles');

const vehicle_global = {}


//get insurance claim page
router.get('/insurance_claim', ensureAuthenticated, function (req, res) {
	res.render('Insurance/insurance_claim');
});

router.get('/insurance_vehicle_info', ensureAuthenticated, function (req, res) {
	//console.log("he he-->" + req.query.link);
	var res_link = "http://localhost:8008/batches?id=" + req.query.link;
	request({
		url: res_link,
		method: "GET"
	}, function (error, response, body) {
		try {
			var obj = JSON.parse(response.body);
			/*
						Object.keys(obj.data).forEach(function(key){
							console.log('key:' + key);
						})
			*/
			var payload = obj.data[0].transactions[0].payload;
			//console.log("payload in base64--> " + payload);

			var decoded = new Buffer(payload, 'base64').toString('ascii');

			//here we decode the response we get from the backend
			var decoded = JSON.parse(decoded);

			//filtering the json
			delete decoded.action;
			delete decoded.asset;
			delete decoded.owner;

			//console.log("payload in text-->" + decoded.vehicle_info.vehicle.chasis_no);
			console.log("payload in text-->" + JSON.stringify(decoded));

			vehicle_global['info'] = decoded;
			//console.log("global---->"+JSON.stringify(vehicle_global));

			res.render('Insurance/insurance_claim', { vehicle: decoded });
		}
		catch (err) {
			console.log(err);
		}
	});
});

router.post('/insurance_claim', function (req, res) {
    //req.flash('success_msg', req.body.vehicle_no);
    var dir = req.body.vehiclestate
	var english_no = req.body.vehicleregistration
	var vehicle_no = req.body.vehicleno

	var tot = dir + english_no + vehicle_no;

	Vehicle.findOne({ vehicle_no: tot }, function (err, result) {
		if (err) throw err;
		console.log(result.link);
		var res_link = result.link + " ";

		try {
			//req.flash('success_msg', decoded.vehicle_info.vehicle.chasis_no);
			res.redirect('/insurance/insurance_vehicle_info/?link=' + res_link);
		}
		catch (err) {
			req.flash('error_msg', "vehicle not found");
			res.redirect('back');
			console.log(err);
		}
	});
});

router.post('/add_claim', function (req, res) {
	console.log("global---->"+JSON.stringify(vehicle_global));
	var key = ""+Date.now();
	var insuarance_claims = {}
	insuarance_claims[key] = {
		"policy_number": req.body.policy_number,
		"vehicle_no": req.body.vehicle_no,
		"model":req.body.model,
		"description":req.body.description,
		"date":req.body.date,
		"time":req.body.time,
		"name":req.body.name,
		"license_no":req.body.license_no,
		"report":req.body.report,
		"timestamp": Date.now()
	}
	
	var vehicle_info = vehicle_global.info.vehicle_info;
	vehicle_info.insuarance_claims[key] = insuarance_claims;
	console.log("haha"+JSON.stringify(vehicle_info));

	makeChanges(req,vehicle_info.vehicle.vehicle_no+Math.random(),vehicle_info);
	
	req.flash('success_msg', "Claim added to blockchain");
	res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

function makeChanges(req, asset, vehicle_info){
	req.flash('success_msg', "successfully added: " + asset);
	submitUpdate_sync(
		{ action: 'create', asset, vehicle_info, owner: req.user.public_key },
		req.user.private_key,
		success => success ? this.refresh() : null,
		vehicle_info.vehicle.vehicle_no
	)
}

module.exports = router;