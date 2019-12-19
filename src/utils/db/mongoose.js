// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/FDServer', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: true
// })
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://anandlok:Punita@2@cluster0-oao9h.mongodb.net/FDServer?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})