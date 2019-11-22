const mongoose = require('mongoose');
const validate = require('validator')
const eventchema = mongoose.Schema({
    eventtype: {
        type: String,
        default: 'Anonymous'
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

const eventModel = mongoose.model('event', eventchema);

module.exports = eventModel;