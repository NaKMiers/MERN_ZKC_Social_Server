const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

async function ConnectDataBase() {
   try {
      await mongoose.connect(process.env.MONGODB, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('Database connect successfully')
   } catch (err) {
      console.log('Database connect failure')
   }
}

module.exports = ConnectDataBase
