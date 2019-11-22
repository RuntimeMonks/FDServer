const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please Enter a valid Email')
            }
        }
    },
    eid: {
        type: Number,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('you cannot include "password" in password')
            }
        }
    },
    token: {
        type: String,
        //    required: true
    }

})
userSchema.methods.generateAuthToken = async function() {
    // const user = this
    console.log("hi", this);
    this.token = jwt.sign({
        eid: this.eid.toString()
    }, 'thisismycourse')
    console.log(this)
    await this.save()
    return this.token
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('unable to login')
    }
    return user
}
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    // console.log("just before saving")
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User