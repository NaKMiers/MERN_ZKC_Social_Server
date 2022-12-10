const express = require('express')
const router = express.Router()

const MessageController = require('../app/controllers/MessageController')

router.post('/', MessageController.addMessage)
router.get('/:chatId', MessageController.getMessages)

module.exports = router
