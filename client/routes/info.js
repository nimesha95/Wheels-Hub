'use strict'

var express = require('express');
var router = express.Router();
var request = require('request');
const $ = require('jquery')

router.get('/get', ensureAuthenticated, function (req, res) {
    res.render('Insurance/insurance_claim');
});


router.post('/vehicle', function (req, res) {
    var dir = req.body.vehiclestate
    var english_no = req.body.vehicleregistration
    var vehicle_no = req.body.vehicleno

    var tot = dir + english_no + vehicle_no;

    //var vehicle_id = req.body.vehicle_id;
    var res_link = "http://localhost:3000/api/vehicle_info"

    var postData = {
        "vehicle_no": tot
    }

    var options = {
        method: 'post',
        body: postData, // Javascript object
        json: true, // Use,If you are sending JSON data
        url: res_link,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    request(options, function (err, res1, body) {
        if (err) {
            console.log('Error :', err)
            return
        }
        console.log(' Body :', body)
        res.render('normal_user/info', { vehicle: body });
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

module.exports = router;