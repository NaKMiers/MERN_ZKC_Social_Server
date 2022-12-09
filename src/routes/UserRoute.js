const express = require('express')
const router = express.Router()
const authMiddleware = require('../app/middlewares/AuthMiddlewares')
const UserControllers = require('../app/controllers/UserControllers')

router.get('/', UserControllers.getAllUser)
router.get('/:id', UserControllers.getUser)
router.put('/:id', authMiddleware, UserControllers.updateUser)
router.delete('/:id', authMiddleware, UserControllers.deleteUser)
router.patch('/follow/:id', authMiddleware, UserControllers.followUser)
router.patch('/unfollow/:id', authMiddleware, UserControllers.unFollowUser)

module.exports = router
