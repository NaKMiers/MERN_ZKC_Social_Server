const PostModel = require('../models/PostModel')
const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

class PostController {
   //  [GET]: /posts/:id
   getPosts = async function (req, res) {
      console.log('getPosts')

      const { id } = req.params
      try {
         const post = await PostModel.findById(id)
         res.status(200).json(post)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [POST]: /posts/:id
   createPost = async function (req, res) {
      console.log('createPost')

      try {
         const newPost = new PostModel(req.body)
         await newPost.save()

         res.status(200).json('Post created')
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PUT]: /posts/:id
   updatePost = async function (req, res) {
      console.log('updatePost')
      const { id } = req.params
      const { userId } = req.body

      try {
         const post = await PostModel.findById(id)
         if (post.userId === userId) {
            await post.updateOne(req.body)
            res.status(200).json('Post Updated')
         } else {
            res.status(403).json('Action forbidden')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [DELETE]: /posts/:id
   deletePost = async function (req, res) {
      console.log('deletePost')
      const { id } = req.params
      const { userId } = req.body

      try {
         const post = await PostModel.findById(id)
         if (post.userId === userId) {
            await post.deleteOne()
            res.status(200).json('Post deleted successfully')
         } else {
            res.status(403).json('Action forbidden')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [PATCH]: /posts/:id
   likePost = async function (req, res) {
      console.log('likePost')
      const { id } = req.params
      const { userId } = req.body

      try {
         const post = await PostModel.findById(id)
         if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json('Post liked')
         } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json('Post unliked')
         }
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }

   // [GET]: /posts/timeline/:id
   getTimelinePost = async function (req, res) {
      console.log('getTimeLinePost')
      const userId = req.params.id

      try {
         const curUserPosts = await PostModel.find({ userId })
         const followingPosts = await UserModel.aggregate([
            {
               $match: {
                  _id: new mongoose.Types.ObjectId(userId),
               },
            },
            {
               $lookup: {
                  from: 'posts',
                  localField: 'following',
                  foreignField: 'userId',
                  as: 'followingPosts',
               },
            },
            {
               $project: {
                  followingPosts: 1,
                  _id: 0,
               },
            },
         ])
         res.status(200)
            .json(curUserPosts.concat(...followingPosts[0].followingPosts))
            .sort((a, b) => b.createdAt - a.createdAt)
      } catch (err) {
         res.status(500).json({ message: err.message })
      }
   }
}

module.exports = new PostController()
