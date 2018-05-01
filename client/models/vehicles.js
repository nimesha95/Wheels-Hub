var mongoose = require('mongoose');

//vehicle schema
var VehicleSchema = mongoose.Schema({
    vehicle_no: {
        type: String,
        index: true
    },
    link: {
        type: String
    },
});

var Vehicle = module.exports = mongoose.model('Vehicle', VehicleSchema);

module.exports.createVehicle = function (newVehicle, callback) {
    newVehicle.save(callback);
}

