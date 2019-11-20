const mongoose = require('mongoose');

const fSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String
    }
});

const feedbackModel = mongoose.model('feedback', fSchema);

module.exports = feedbackModel;