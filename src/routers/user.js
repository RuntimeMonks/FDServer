const express = require('express')
const User = require('../core/user/user')
const auth = require('../middlewares/auth')
const router = new express.Router()
router.post('/signup',async (req,res)=>{
    const user = new User(req.body)
   
 try{
     
    await user.save()
    const token = await user.generateAuthToken()
    
    res.status(201).send({user,token})
 }catch(e){
     res.status(400).send(e)
 }
 
 })
 router.post('/login',async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
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