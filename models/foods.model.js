const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Food = new Schema({
    Name: String,
    IsActive: Boolean
},{
    collection: 'foods'
});

module.exports = mongoose.model('Food', Food);