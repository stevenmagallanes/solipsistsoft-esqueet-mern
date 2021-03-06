const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Food = new Schema({
    Name: {
        type: String,
        required: true
    },
    IsActive: {
        type: Boolean,
        default: true,
        required: true
    }
},{
    collection: 'foods'
});

module.exports = mongoose.model('Food', Food);