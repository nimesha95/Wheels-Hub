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
	res.render('index');
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
	test(req);
	//req.flash('success_msg', req.user.public_key);
	res.redirect('/register_vehicle');
});

function test(req){
	req.flash('success_msg', 'hey there we call this function');
	submitUpdate(
		{ action: 'create', asset: 'hello', owner: 'whatsapp' },
		req.user.private_key,
		success => success ? this.refresh() : null
	)
}

module.exports = router;