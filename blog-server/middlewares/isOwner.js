const jwtHelper = require('../helpers/jwtHelper')
const Post = require('../models/Post')

function isOwner(req, res, next){
    let user = jwtHelper.decode(req.headers.token)
    Post.findOne({
        _id: req.params.id
    })
        .then(post=>{
            if(post.author == user.id){
                next()
            } else {
                res.status(403).json({
                    message: 'Forbidden'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message: 'Internal Server Error',
                error: err.message
            })
        })
}

module.exports= isOwner