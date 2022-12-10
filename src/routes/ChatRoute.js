const express = require('express')
const router = express.Router()

const ChatController = require('../app/controllers/ChatController')

router.post('/', ChatController.createChat)
router.get('/:userId', ChatController.userChats)
router.get('/find/:firstId/:secondId', ChatController.findChat)

module.exports = router
