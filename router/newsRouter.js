const express = require("express")
const router = express.Router()

const { NewEN, NewRU, NewUZ } = require("../models/newsModels")
const langList = require("../utils/langList")
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


router.post("/add", upload.single('picture'), async function (req, res) {
  try {
    let creatorId = req.user_id;
    let lang_code = req.lang_code;
    let fileName = req.file.filename;
    let { title, text } = req.body;
    let news = null;
    if (lang_code == langList[0].code) {
      news = await NewUZ.create({
        title,
        text,
        picture: fileName,
        creatorId,
        last_updated_date: new Date()
      })
    } else if (lang_code == langList[1].code) {
      news = await NewRU.create({
        title,
        text,
        picture: fileName,
        creatorId,
        last_updated_date: new Date()
      })
    } else if (lang_code == langList[2].code) {
      news = await NewEN.create({
        title,
        text,
        picture: fileName,
        creatorId,
        last_updated_date: new Date()
      })
    }
    res.status(200).json({
      isSuccess: true,
      data: news,
      errorMessage: null,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      data: null,
      errorMessage: error,
    });
    
  }
})

// pagination
router.get("/all", async (req, res) => {
  try{
    let lang_code = req.lang_code;
    let page = req.query.page || 1 ;
    let per_page = req.query.per_page || 10;
    let search = req.query.search || "";
    let news = []
    let totalPage = 0

    if(lang_code == langList[0].code){
      totalPage = await NewUZ.countDocuments({ title: { $regex: search }})
      news = await NewUZ.find({title:{ $regex: search }}).skip((page -1)*page).limit(per_page)
    }else if (lang_code == langList[1].code){
      totalPage = await NewRU.countDocuments({ title: { $regex: search }})
      news = await NewRU.find({title:{ $regex: search }}).skip((page -1)*page).limit(per_page)
    }
    else if (lang_code == langList[2].code){
      totalPage = await NewEN.countDocuments({ title: { $regex: search }})
      news = await NewEN.find({title:{ $regex: search }}).skip((page -1)*page).limit(per_page)
    }

    res.status(200).json({
      isSuccess: true,
      data: null,
      errorMessage: null,
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      data: null,
      errorMessage: error,
    });
  }

 
})





// Export module

module.exports = router