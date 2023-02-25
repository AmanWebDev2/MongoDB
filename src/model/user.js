const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    age: {
        type: Number
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;