const express = require('express')
const router = express.Router()

const PostController = require('../app/controllers/PostController')

router.get('/:id', PostController.getPosts)
router.post('/', PostController.createPost)
router.put('/:id', PostController.updatePost)
router.delete('/:id', PostController.deletePost)
router.patch('/:id', PostController.likePost)
router.get('/timeline/:id', PostController.getTimelinePost)

module.exports = router
