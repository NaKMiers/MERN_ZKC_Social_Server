const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class AuthController {
   // [POST]: /auth/login
   loginUser = async function (req, res) {
      console.log('loginUser')
      const { username } = req.body

      try {
         const user = await UserModel.findOne({ username })

         if (user) {
            const validity = await bcrypt.compare(req.body.password, user.password)
            if (!validity) {
               res.status(400).json('Wrong password')
            }
            const { password, ...otherDetails } = user._doc
            const token = jwt.sign(
               { username: user.username, id: user._id },
               process.env.JWT_KEY,
               { expiresIn: '1h' }
            )

            res.status(200).json({ user: otherDetails, token })
         } else {
            res.status(403).json('User does not exists')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /auth/register
   registerUser = async function (req, res) {
      console.log('registerUser')
      // hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashedPass
      const { username } = req.body

      try {
         const oldUser = await UserModel.findOne({ username })
         if (oldUser) {
            res.status(400).json('Username is already registered')
         }
         const newUser = new UserModel(req.body)
         const user = await newUser.save()
         const { password, ...otherDetails } = newUser._doc

         const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, {
            expiresIn: '1h',
         })

         res.status(200).json({ user: otherDetails, token })
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new AuthController()
