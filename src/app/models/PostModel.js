const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema(
   {
      userId: { type: String, require: true },
      desc: String,
      likes: [],
      image: String,
   },
   { timestamps: true }
)

module.exports = mongoose.model('posts', PostSchema)
