var express = require('express');
var router = express.Router();
var request = require('request');

var Vehicle = require('../models/vehicles');

router.post('/vehicle_info', function (req, res) {
    if (req.body && req.body['vehicle_no']) {
        var vehicle_no = req.body.vehicle_no;

        Vehicle.findOne({ vehicle_no: vehicle_no }, function (err, result) {
            if (err) throw err;

            try {
                var res_link = "http://localhost:8008/batches?id=" + result.link;
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

                        res.send(decoded);
                    }
                    catch (err) {
                        console.log(err);
                    }
                });
            }
            catch (err) {
                res.send("Vehicle Not found");
            }
        });
    }
    else {
        res.send("Error! Please send valid json");
    }
});

module.exports = router;