const express = require('express')
require('./db/mongoose')
const cors = require('cors')
    // const urouter = require('./routers/userRouter')   

const com = express()
const portNo = process.env.portNo | 3000
com.use(cors())
com.use(express.json())

// com.use(urouter)

com.listen(portNo, () => {
    console.log("Listening on port no : " + portNo)
})