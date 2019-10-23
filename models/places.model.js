const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foods = require('./foods.model');

let Place = new Schema({
    Name: {
        type: String
    },
    FoodsServed: [foods.schema],
    IsActive: {
        type: Boolean
    }
},{
    collection: 'places'
});

module.exports = mongoose.model('Place', Place);