const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// mongoose.set('debug', function(coll, method, query, doc){
//     console.log('Mongoose called - [Collection: ' + coll + '] - [Method: ' + method + '] - [Query: ' + query + '] - [Document: ' + doc + ']');
// });

const Schema = mongoose.Schema;
const foods = require('./foods.model');

let UserSchema = new Schema({
    UserName: {
        type: String,
        required: true,
        unique: true
    },
    AuthenticationTokenId: String,
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
UserSchema.plugin(uniqueValidator);

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
}