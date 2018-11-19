const Post = require('../models/Post')
const jwtHelper = require('../helpers/jwtHelper')
const Comment = require('../models/Comment')

class PostController {
    static index(req,res){
        Post.find()
            .populate('author')
            .populate({
                path: 'comments',
                populate: {
                    path: 'commenter'
                }
            })
            .then(posts=>{
                res.status(200).json({posts})
            })
            .catch(err=>{
                res.status(500).json({
                    message : 'Internal Server Error'
                })
            })
    }

    static create(req,res){
        let decoded = jwtHelper.decode(req.headers.token)
        let authorId = decoded.id
        Post.create({
            title: req.body.title,
            content: req.body.content,
            author: authorId
        })
            .then(post=>{
                res.status(201).json({
                    message: "Post succesfully saved!"
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal server Error',
                    error : err.message
                })
            })
    }

    static comment(req,res){
        let decoded = jwtHelper.decode(req.headers.token)
        let commenter = decoded.id
        Comment.create({
            body : req.body.content,
            commenter: commenter
        })
            .then(comment=>{
                Post.update({
                    _id : req.params.id
                }, {
                    $push: {comments: comment}
                })
                    .then(result=>{
                        res.status(201).json({
                            message: 'Comment Added!',
                            result: result
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message: 'Internal Server error',
                            error: err.message
                        })
                    })
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server error',
                    error: err.message
                })
            })
    }

    static show(req,res){
        Post.findOne({
            _id: req.params.id
        })   
            .populate({
                path: 'comments',
                populate: {
                    path: 'commenter'
                }
            })
            .populate('author')
            .then(post=>{
                res.status(200).json(post)
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }

    static update(req,res){
        Post.update({
            _id: req.params.id
        }, req.body)
            .then(result=>{
                res.status(201).json({
                    message: 'Post Updated!',
                    result: result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }

    static userPost(req,res){
        let owner =  jwtHelper.decode(req.headers.token)
        Post.find({
            author: owner.id
        })
            .then(posts=>{
                if(posts){
                    res.status(200).json(posts)
                } else {
                    res.status(403).json({
                        message: 'forbidden',
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json(err)
            })
    }

    static destroy(req,res){
        Post.deleteOne({
            _id: req.params.id
        })
            .then(report=>{
                res.status(201).json({
                    message: 'Post Deleted',
                    report: report
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            })
    }

}

module.exports = PostController