const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 5
    },
    content: {
        type: String,
        minlength: 10
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post