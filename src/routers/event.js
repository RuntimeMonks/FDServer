const express = require('express')
const router = new express.Router()
const Event = require('../core/event/event')


router.post('/event', async(req, res) => {
    console.log("event", req.body)
    const event = new Event(req.body)
    try {
        await event.save()
        res.status(201).send(event)
    } catch (e) {
        res.status(400).send(e)
    }

    // event.save().then(() => {
    //     console.log(event)
    //     res.status(201).send(event)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})


router.get('/event/:id', (req, res) => {
    const _id = req.params.id // Access the id provided  
    Event.findById(_id).then((ev) => {
        if (!ev) {
            return res.status(404).send()
        }
        res.send(ev)
    }).catch((e) => {
        res.status(500).send()
    })
})


router.delete('/event', async(req, res) => {
    try {
        console.log("in delete event")
        var id = req.param('id');
        const ev = await Event.findByIdAndDelete(id)
        if (!ev) {
            return res.status(404).send()
        }
        res.send(ev)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/event/:id', async(req, res) => {
    const ups = Object.keys(req.body)
    const allowedUpdates = ['eventtype', ' name', 'date']
    const isValOp = ups.every((update) => allowedUpdates.includes(update))
    if (!isValOp) {
        return res.status(400).send({
            error: 'Invalid updates!'
        })
    }
    try {
        const ev = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!ev) {
            return res.status(404).send()
        }
        res.send(ev)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/event', (req, res) => {
    console.log("in event list")
    Event.find({}).then((events) => {
        res.send(events)
    }).catch((e) => {
        res.status(500).send()
    })

})


















// router.post('/event', async(req, res) => {
//     const event = new Event(req.body)
//     try {
//         await event.save()
//         res.status(201).send({ message: "your event has been submitted" })
//     } catch (error) {
//         res.status(400).send({ error })
//     }
// })

// router.get('/event', async(req, res) => {
//     const event = await Event.find();
//     res.status(200).send(event)
// })




module.exports = router