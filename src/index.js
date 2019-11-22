const express = require('express')
require('./utils/db/mongoose')
const frouter = require('./routers/feedback')
const Event = require('./routers/event')

var cors = require('cors')
const app = express()
const portNo = 3000
app.use(express.json())
app.use(cors())
app.use(frouter)

app.use(Event)


app.listen(portNo, () => {
    console.log("Server is ON : " + portNo)
})