const MessageModel = require('../models/MessageModel')

class MessageController {
   // [POST]: /messages/
   addMessage = async function (req, res, next) {
      console.log('addMessage')

      const {chatId, senderId, text} = req.body
      try {
         const message = new MessageModel({chatId, senderId, text})
         const result = await message.save()
         res.status(200).json(result)
      } catch (err) {
         res.status(500).json({message: err.message})
      }
   }

   // [GET]: /messages/:chatId
   getMessages = async function (req, res, next) {
      console.log('getMessages')

      try {
         const result = await MessageModel.find({chatId: req.params.chatId})
         res.status(200).json(result)
      } catch (err) {
         res.status(500).json({message: err.message})
      }
   }
}

module.exports = new MessageController()
