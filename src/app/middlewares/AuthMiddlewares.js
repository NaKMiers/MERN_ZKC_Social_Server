const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1]
      console.log('req.headers.authorization: ', req.headers.authorization)
      console.log('token: ', token)

      if (token) {
         const decoded = jwt.verify(token, process.env.JWT_KEY)
         req.body._id = decoded?.id
      }
      next()
   } catch (err) {
      console.log(err)
   }
}
module.exports = authMiddleware
