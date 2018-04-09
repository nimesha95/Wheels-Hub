var express = require('express');
var router = express.Router();

const {
	submitUpdate
} = require('../helpers/helpers')

// Get Homepage
router.get('/', ensureAuthenticated, function (req, res) {
	res.render('index');
});

//Get Register vehicle page
router.get('/register_vehicle', ensureAuthenticated, function (req, res) {
	//console.log(req.user);
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
	console.log(req.body.vehicle_no);
/*
	submitUpdate(
		{ action, asset, owner },
		this.user.private,
		success => success ? this.refresh() : null
	)
*/
	req.flash('success_msg', 'You have successfully added the vehicle');
	res.redirect('/register_vehicle');
});

module.exports = router;