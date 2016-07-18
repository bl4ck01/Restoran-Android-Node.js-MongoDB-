var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var MenuSchema = new Schema({
    name: String,
    cost: Number
});

module.exports = mongoose.model('Menu', MenuSchema);
