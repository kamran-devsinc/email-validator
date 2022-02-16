const mongoose = require('mongoose');

const VerifiedEmailSchema = mongoose.Schema({
    name: String,
    verifiedEmail: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Email', VerifiedEmailSchema);
