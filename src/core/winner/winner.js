const mongoose = require('mongoose')
    //const validator = require('validator')
const winnerSchema = new mongoose.Schema({
    winners: {
        year: {
            type: Number,
            required: true,
            trim: true
        },
        events: [{
            eventName: {
                type: String,
                required: true,
                trim: true
            },
            winnerName: {
                type: String,
                required: true,
                trim: true
            }
        }]

    }
}, {
    timestamps: true
})

const Winners = mongoose.model('Winners', winnerSchema)

module.exports = Winners