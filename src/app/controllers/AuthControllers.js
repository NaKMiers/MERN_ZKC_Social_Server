const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')

class AuthController {
   // [POST]: /auth/login
   loginUser = async function (req, res, next) {
      console.log('loginUser')
      const { username, password } = req.body

      try {
         const user = await UserModel.findOne({ username })

         if (user) {
            const validity = await bcrypt.compare(password, user.password)
            validity ? res.status(200).json(user) : res.status(400).json('Wrong password')
         } else {
            res.status(403).json('User does not exists')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /auth/register
   registerUser = async function (req, res, next) {
      console.log('registerUser')
      const { username, password, firstName, lastName } = req.body

      // hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPass = await bcrypt.hash(password, salt)

      try {
         const newUser = new UserModel({ username, password: hashedPass, firstName, lastName })
         await newUser.save()
         res.status(200).json(newUser)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new AuthController()
