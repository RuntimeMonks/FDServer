const express = require('express')
const User = require('../core/user/user')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.post('/signup', async(req, res) => {
    const user = new User(req.body)
<<<<<<< HEAD
   
 try{
     
    await user.save()
    const token = await user.generateAuthToken()
    
    res.status(201).send({user,token})
 }catch(e){
     res.status(400).send(e)
 }
 
 })
 router.post('/login',async (req,res)=>{
=======

>>>>>>> aa0a707835db1ef496e183ee968293d9a8561760
    try {

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
        res.send({
            user,
            token
        })
    } catch (e) {
        res.status(400).send()
    }
<<<<<<< HEAD
 })
 router.post('/logout', auth, async (req,res)=>{
    try{
       req.user.token = []
       await req.user.save()
       res.send()
    }catch(e){
        res.status(500).send()
    }
 })
 module.exports = router
=======
})
module.exports = router
>>>>>>> aa0a707835db1ef496e183ee968293d9a8561760
