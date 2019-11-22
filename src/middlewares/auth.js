const jwt = require('jsonwebtoken')
const User = require('../core/user/user')
const auth = async (req, res, next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer','')
        const decode = jwt.verify(token, 'thisismycourse')
        const user = await User.findOne({eid:decode.eid,token:token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    }catch(e){
        res.status(401).send({ error: 'Please Authenticate' })
    }

}


module.exports = auth