const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, default: 'hahaha'},
    family: {type: String, default: 'hahaha'},
    bio: {type: String, match: /[a-z]/},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', orderSchema);