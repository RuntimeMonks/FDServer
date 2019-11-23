const express = require('express')
const User = require('../core/user/user')
const router = new express.Router()

router.post('/signup', async(req, res) => {
    const user = new User(req.body)

    try {
        user.utype = "user";
        await user.save()

        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }

})
router.get('/login', async(req, res) => {
    try {
        var email = req.param('email');
        var password = req.param('password');
        console.log(email)
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        console.log("user login: ", user)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/logout', async(req, res) => {
    try {
        req.user.token = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/update/me', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'eid', 'gender', 'utype', 'event']
    const validateUpdates = updates.every((updates) => allowedUpdates.includes(updates))
        // console.log(validateUpdates)
    if (!validateUpdates) {
        return res.status(400).send({
            error: 'Invalid Update'
        })
    }
    try {
        updates.forEach(update => req.users[update] = req.body[update])
        await req.users.save()

        res.status(200).send(req.users)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router