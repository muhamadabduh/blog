const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT

class jwtHelper{
    static encode(data){
        return jwt.sign(data, secret)
    }

    static decode(token){
        return jwt.verify(token, secret)
    }
}

module.exports = jwtHelper