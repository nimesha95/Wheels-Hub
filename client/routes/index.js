'use strict'

var express = require('express');
var router = express.Router();
const $ = require('jquery')
const {
	submitUpdate
} = require('../helpers/helpers')

// Application Object
const app = { user: null, keys: [], assets: [], transfers: [] }

// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
	if(req.user.user_type=="rmv"){
		res.render('index');
	}
	else if(req.user.user_type=="insurance"){
		res.render('insurance');
	}
	else if(req.user.user_type=="gen_user"){
		res.render('gen_user');
	}
});

//Get Register vehicle page
router.get('/register_vehicle', ensureAuthenticated, function (req, res) {
	//console.log(req.user.public_key);
	res.render('register_vehicle');
});

//Get Tranfer vehicle page
router.get('/transfer_vehicle', ensureAuthenticated, function (req, res) {
	res.render('transfer_vehicle');
});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


router.post('/register_vehicle', function (req, res) {
	//console.log(req.user.private_key);
	/*
	(function(){
		req.flash('success_msg', 'hey there we call this function');
		console.log("hey there we call this function");
		submitUpdate(
			{ action: 'create', asset: 'hello', owner: 'whatsapp' },
			req.user.private_key,
			success => success ? this.refresh() : null
		)
	})
	*/
	RegVehicle(req,req.body.vehicle_no,req.body.chasis_no);
	//req.flash('success_msg', req.body.vehicle_no);
	res.redirect('/register_vehicle');
});

function RegVehicle(req,asset,chasis_no){
	req.flash('success_msg', 'hey there we call this function');
	submitUpdate(
		{ action: 'create', asset , chasis_no, owner: req.user.public_key },
		req.user.private_key,
		success => success ? this.refresh() : null
	)
}

module.exports = router;