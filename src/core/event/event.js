const mongoose = require('mongoose');

const eventchema = mongoose.Schema
({
    eventtype: 
    {
        type: String,
        default: 'Anonymous'
    },
    name: 
    {
        type: String,
        required: true,
    },
    date:
     {
        type: date,
        required:true
    }
});

const eventModel = mongoose.model('event', eventchema);

module.exports = eventModel;