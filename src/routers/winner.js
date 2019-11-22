const express = require('express')
const Winners = require('../core/winner/winner')
    // const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/winners', async(req, res) => {
    const winnerInstance = new Winners(req.body)

    try {
        await winnerInstance.save()
        res.status(201).send(winnerInstance)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/winners', async(req, res) => {
    // const match = {}
    // const sort = {}
    // if (req.query.completed) {
    //     match.completed = req.query.completed === 'true'
    // }

    // if (req.query.sortBy) {
    //     const parts = req.query.sortBy.split(':')
    //     sort[parts[0]] = parts[0] === 'desc' ? -1 : 1
    // }
    try {
        const winnerInstance = await Winners.find()
            //await req.user.populate('tasks').execPopulate()

        res.status(200).send(winnerInstance)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/winners/:id', async(req, res) => {
    const _id = req.params.id
    try {
        const winner = await Winners.findOne({ _id })
        if (!winner) {
            return res.status(404).send()
        }
        res.status(200).send(winner)
    } catch (e) {
        res.status(500).send(e)
    }

})

router.patch('/winners/:id', async(req, res) => {

    const winnerUpdates = Object.keys(req.body)
    const validUpdates = ['year', 'eventName', 'winnerName', 'winners', 'events']
    const workingUpdates = winnerUpdates.every((update) => validUpdates.includes(update))

    if (!workingUpdates) {
        return res.status(400).send({ error: 'Updates Property Not Available' })
    }

    try {

        const winner = await Winners.findOne({ _id: req.params.id })

        if (!winner) {
            return res.status(404).send()
        }
        winnerUpdates.forEach((update) => winner[update] = req.body[update])
        await winner.save()
        res.status(200).send(winner)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/winners/:id', async(req, res) => {
    const deleteWinner = await Winners.findOneAndDelete({ _id: req.params.id })
    try {
        if (!deleteWinner) {
            return res.status(404).send()
        }
        res.status(200).send(deleteWinner)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router