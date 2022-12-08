const AuthRouter = require('./AuthRoute')
const UserRouter = require('./UserRoute')
const PostRouter = require('./PostRoute')
const UploadRouter = require('./UploadRoute')

function routes(app) {
   app.use('/auth', AuthRouter)
   app.use('/users', UserRouter)
   app.use('/posts', PostRouter)
   app.use('/upload', UploadRouter)

   app.use('/', (req, res, next) => {
      res.send('<h1>This is Home Page</h1>')
   })
}

module.exports = routes
