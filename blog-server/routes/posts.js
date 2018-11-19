var express = require('express');
var router = express.Router();
const PostController = require('../controllers/PostController')
const isOwner = require('../middlewares/isOwner')
const isLogin = require('../middlewares/isLogin')

router.get('/', PostController.index)
router.post('/', isLogin, PostController.create)
router.patch('/:id', isOwner, PostController.update)
router.put('/:id/comments',isLogin, PostController.comment)
router.get('/user',isLogin, PostController.userPost)
router.delete('/:id', isOwner, PostController.destroy)
router.get('/:id', PostController.show)

module.exports = router