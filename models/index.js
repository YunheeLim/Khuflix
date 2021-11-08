var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {type: String, required: false},
    id: {type: String, required: true, unique: true},
    password: {type: String, required: false}
});

exports.Users = mongoose.model('users', UserSchema);