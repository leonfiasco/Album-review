const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    passwordconfirm: { type: String, required: true },
    displayName: {type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);