const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foods = require('./foods.model');

let Place = new Schema({
    Name: {
        type: String,
        required: true
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

module.exports = mongoose.model('Place', Place);