const express = require('express')
const router = express.Router()

const UserControllers = require('../app/controllers/UserControllers')

router.get('/:id', UserControllers.getUser)
router.put('/:id', UserControllers.updateUser)
router.delete('/:id', UserControllers.deleteUser)
router.patch('/follow/:id', UserControllers.followUser)
router.patch('/unfollow/:id', UserControllers.unFollowUser)

module.exports = router
