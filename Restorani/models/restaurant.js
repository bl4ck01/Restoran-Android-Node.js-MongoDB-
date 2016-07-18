var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var RestaurantSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    menu: {type: mongoose.Schema.Types.ObjectId, ref:'Menu'}
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);