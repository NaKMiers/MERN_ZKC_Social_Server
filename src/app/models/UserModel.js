const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = Schema(
   {
      username: { type: String, required: true },
      password: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      isAdmin: { type: Boolean, default: false },
      profileImg: String,
      coverImg: String,
      about: String,
      liveIn: String,
      country: String,
      workAt: String,
      relationship: String,
      followers: [],
      followings: [],
   },
   { timestamps: true }
)

module.exports = mongoose.model('Users', UserSchema)
