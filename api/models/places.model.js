const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const foods = require('./foods.model');

let Place = new Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    FoodsServed: [foods.schema],
    IsActive: {
        type: Boolean,
        default: true,
        required: true
    }
},{
    collection: 'places'
});
Place.plugin(uniqueValidator);

module.exports = mongoose.model('Place', Place);