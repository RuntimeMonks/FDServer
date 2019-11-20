const express = require('express')
const router = new express.Router()
const FeedBack = require('../core/feedback/feedback')


router.post('/feedback', async(req, res) => {
    const feedBack = new FeedBack(req.body)
    try {
        await feedBack.save()
        res.status(201).send({ message: "your feedback has been submitted" })
    } catch (error) {
        res.status(400).send({ error })
    }
})

router.get('/feedback', async(req, res) => {
    const feedback = await FeedBack.find();
    // console.log(feedback)
    res.status(200).send(feedback)
})

module.exports = router