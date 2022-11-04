const express = require("express")
const router = express.Router()



const fs = require("fs")
const multer = require("multer")

const fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/news')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: fileStorageEngine })

router.post('/news/picture',  upload.single('picture'), async (req, res) => {
  try{
    let fileName = req.file.filename;
    res.status(200).json({
      isSuccess: true,
      data: {
        fileName
      },
      errorMessage: null,
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      data: null,
      errorMessage: error,
    });
  }
})

router.delete('/news/delete', async (req, res)=>{
  try{
    let fileName = req.query.fileName
    const path = `./public/news/${fileName}`;
    fs.unlinkSync(path);
    res.status(200).json({
      isSuccess: true,
      data: 'Muvofaqiyatli o\'chirildi',
      errorMessage: null,
    });
  }catch(error){
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      data: null,
      errorMessage: error,
    });
  }
})

module.exports = router
