const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    family: {type: String},
    bio: {type: String, match: /[a-z]/},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);