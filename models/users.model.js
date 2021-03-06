const mongoose = require('mongoose');
mongoose.set('debug', function(coll, method, query, doc){
    console.log(coll);
});

const Schema = mongoose.Schema;
const foods = require('./foods.model');

let UserSchema = new Schema({
    UserName: {
        type: String,
        required: true
    },
    PassSalt: String,
    PassHash: String,
    FirstName: String,
    LastName: String,
    FoodPreferences: [foods.schema],
    IsActive: {
        type: Boolean,
        default: true,
        required: true
    }
},{
    collection: 'users'
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}