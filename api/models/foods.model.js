const mongoose = require('mongoose');
const uniqueFoodNameValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let Food = new Schema({
    Name: {
        type: String,
        required: true,
        //unique:true
    },
    IsActive: {
        type: Boolean,
        default: true,
        required: true
    }
}, {
    collection: 'foods'
});
//Food.plugin(uniqueFoodNameValidator);

module.exports = mongoose.model('Food', Food);