const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = require('./users.model');

let Group = new Schema({
    LastPartyDate: {
        type: Date
    },
    Users: [users.schema],
    IsActive: {
        type: Boolean
    }
},{
    collection: 'groups'
});

module.exports = mongoose.model('Group', Group);