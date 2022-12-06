const AuthRouter = require('./AuthRoute')
const UserRouter = require('./UserRoute')
const PostRouter = require('./PostRoute')

function routes(app) {
   app.use('/auth', AuthRouter)
   app.use('/users', UserRouter)
   app.use('/posts', PostRouter)

   app.use('/', (req, res, next) => {
      res.send('<h1>This is Home Page</h1>')
   })
}

module.exports = routes
