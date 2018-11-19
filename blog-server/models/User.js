const mongoose = require('mongoose')
const bcryptHelper = require('../helpers/bcryptHelper')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        validate: {
            isAsync: true,
            validator: function(v, cb){
                setTimeout(function(){
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    var msg = v + ' is not a valid email'
                    cb(re.test(v), msg)
                }, 5)
            },
            message: 'Error input email'
        },
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, 'Password is required']
        
    },
    role: String
})

userSchema.pre('save', function(next){
    this.role= 'user'
    let hash = bcryptHelper.encode(this.password)
    this.password = hash
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User