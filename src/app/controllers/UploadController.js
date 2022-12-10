const multer = require('multer')

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './public/images')
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name)
   },
})
const upload = multer({ storage }).single('file')

class UploadController {
   // [POST]: /uploads/
   uploadImage = async function (req, res) {
      console.log('uploadImage')

      upload(req, res, async err => {
         try {
            return res.status(200).json('File uploaded successfully')
         } catch (err) {
            res.status(500).json(err)
         }
      })
   }
}

module.exports = new UploadController()
