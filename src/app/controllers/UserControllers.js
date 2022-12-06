const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const e = require('express')

class UserControllers {
   // [POST]: /users/:id
   getUser = async function (req, res, next) {
      console.log('getUser')
      const id = req.params.id

      try {
         const user = await UserModel.findById(id)
         if (user) {
            const { password, ...otherDetails } = user._doc
            res.status(200).json(otherDetails)
         } else {
            res.status(403).json('User does not exists')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PUT]: /users/:id
   updateUser = async function (req, res, next) {
      console.log('updateUser')
      const id = req.params.id
      const { curUserId, curUserAdminStatus, password } = req.body
      if (password) {
         const salt = await bcrypt.genSalt(10)
         req.body.password = await bcrypt.hash(password, salt)
      }

      // id === cuurUserId, in case, another user sendRequest to change this user, because another user doesn't have the same curUserId as this user, so thay can't do it
      // curUserAdminStatus, admin can change any user infomation
      if (id === curUserId || curUserAdminStatus) {
         try {
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            res.status(200).json(user)
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
      } else {
         res.status(403).json('Access Denied! You can only update your own profile')
      }
   }

   // [DELETE]: /users/:id
   deleteUser = async function (req, res, next) {
      console.log('deleteUser')
      const { id } = req.params
      const { curUserId, currenUserAdminStatus } = req.body

      if (id == curUserId || curUserAdminStatus) {
         try {
            await UserModel.findByIdAndDelete(id)
            res.status(200).json('User deleted successfully')
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
      } else {
         res.status(403).json('Access Denied! You can only update your own profile')
      }
   }

   // [PATCH]: /users/follow/:id
   followUser = async function (req, res, next) {
      console.log('followUser')
      const { id } = req.params
      const { curUserId } = req.body

      if (id !== curUserId) {
         try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(curUserId)
            if (!followUser.followers.includes(curUserId)) {
               await followUser.updateOne({ $push: { followers: curUserId } })
               await followingUser.updateOne({ $push: { following: id } })
               res.status(200).json('User followed')
            } else {
               res.status(403).json('User is already followed by you')
            }
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
      } else {
         res.status(403).json('Action forbidden')
      }
   }

   // [PATCH]: /users/unfollow/:id
   unFollowUser = async function (req, res, next) {
      console.log('unFollowUser')
      const { id } = req.params
      const { curUserId } = req.body

      if (id !== curUserId) {
         try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(curUserId)
            if (followUser.followers.includes(curUserId)) {
               await followUser.updateOne({ $pull: { followers: curUserId } })
               await followingUser.updateOne({ $pull: { following: id } })
               res.status(200).json('User unfollowed')
            } else {
               res.status(403).json('User is not followed by you')
            }
         } catch (err) {
            res.status(500).json({ message: err.message })
         }
      } else {
         res.status(403).json('Action forbidden')
      }
   }
}

module.exports = new UserControllers()
