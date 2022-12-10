const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema(
   {
      members: [],
   },
   { timestamps: true }
)

module.exports = mongoose.model('chats', ChatSchema)
