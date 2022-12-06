const AuthRouter = require('./AuthRoute')
const UserRouter = require('./UserRoute')

function routes(app) {
   app.use('/auth', AuthRouter)
   app.use('/users', UserRouter)

   app.use('/', (req, res, next) => {
      res.send('<h1>This is Home Page</h1>')
   })
}

module.exports = routes
