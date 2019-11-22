const express = require('express')
const router = new express.Router()
const Event = require('../core/event/event')


router.post('/event', async(req, res) => {
    const event = new Event(req.body)
    try {
        await event.save()
        res.status(201).send({ message: "your event has been submitted" })
    } catch (error) {
        res.status(400).send({ error })
    }
})

router.get('/event', async(req, res) => {
    const event = await Event.find();
    res.status(200).send(event)
})

router.get('/event/list', async(req, res) => {
    var type = req.param('type');
    const event = await Event.find(type);
    res.status(200).send(event)
})

module.exports = router