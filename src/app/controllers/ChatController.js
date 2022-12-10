const ChatModel = require('../models/ChatModel')

class ChatController {
   // [POST]: /chats/
   createChat = async function (req, res) {
      console.log('createChat')

      try {
         const newChat = new ChatModel({
            members: [req.body.senderId, req.body.receiverId],
         })
         const result = await newChat.save()
         res.status(200).json(result)
      } catch (err) {
         res.status(500).json({message: err.message})
      }
   }
   // [GET]: /chats/:userId
   userChats = async function (req, res) {
      console.log('userChats')

      try {
         const chat = await ChatModel.find({
            members: {$in: [req.params.userId]},
         })
         res.status(200).json(chat)
      } catch (err) {
         res.status(500).json({message: err.message})
      }
   }
   // [GET]: /chats/find/:firstId/:secondId
   findChat = async function (req, res) {
      console.log('findChat')

      try {
         const chat = await ChatModel.findOne({
            members: {$all: [req.params.firstId, req.params.secondId]},
         })
         res.status(200).json(chat)
      } catch (err) {
         res.status(500).json({message: err.message})
      }
   }
}

module.exports = new ChatController()
