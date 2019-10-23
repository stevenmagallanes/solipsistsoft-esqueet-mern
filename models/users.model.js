const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foods = require('./foods.model');

let User = new Schema({
    UserName: String,
    PassSalt: String,
    PassHash: String,
    FirstName: String,
    LastName: String,
    FoodPreferences: [foods.schema],
    IsActive: Boolean
},{
    collection: 'users'
});

module.exports = mongoose.model('User', User);