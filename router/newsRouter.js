const express = require("express")
const router = express.Router()

const NEWS = require("../models/newsModels")
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


router.post("/add", upload.single('picture'), async function (req, res){
    try{
        let id = "21243"
        let fileName = req.file.filename;
        let { title, text } = req.body;
        let news = await NEWS.create({
            title,
            text,
            picture: fileName,
            creator: id,
            last_updated_date:new Date()
          })
          res.status(200).json({
            isSuccess: true,
            data: news,
            errorMessage: null,
          })
    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
          });
          console.log(`Add News Error --> ${error}`);
    }
})

// pagination
router.get("/all", async (req,res)=>{
    console.log(req);

    res.status(200).json({
        isSuccess: true,
        data: null,
        errorMessage: null,
    })
})





// Export module

module.exports = router