const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema(
   {
      chatId: String,
      senderId: String,
      text: String,
   },
   { timestamps: true }
)

module.exports = mongoose.model('messages', MessageSchema)
