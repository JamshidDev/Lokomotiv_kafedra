
const express = require('express');
const router = express.Router();
const { BannerUZ, BannerRU, BannerEN } = require("../models/BannerModal");
const langList = require("../utils/langList")

const fs = require("fs")
const multer = require("multer")

const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/banner')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })


router.post('/add', upload.single('picture'), async (req, res) =>{
    try{
        let lang_code = req.lang_code;
        let picture = req.file?.filename
        let banner = null; 
        let {title, subTitle, positionIndex} = req.body;

        if (lang_code == langList[0].code) {
             banner = await BannerUZ.create({
                title, 
                subTitle,
                picture,
                positionIndex,
            })
        } else if (lang_code == langList[1].code) { 

             banner = await BannerRU.create({
                title, 
                subTitle,
                picture,
                positionIndex,
            })

        }
        else if (lang_code == langList[2].code) {
             banner = await BannerEN.create({
                title, 
                subTitle,
                picture,
                positionIndex,
            })
           
        }

        res.status(200).json({
            isSuccess: true,
            data: banner,
            errorMessage: null,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error
        })
    }
})

router.get('/all', async (req, res) =>{
    try{
        let lang_code = req.lang_code;
        let per_page = req.query.per_page || 10;
        let banner = null; 
        let {title, subTitle, positionIndex} = req.body;
        if (lang_code == langList[0].code) {
             banner = await BannerUZ.find({}).sort({created_date: -1}).limit(per_page)
        } else if (lang_code == langList[1].code) { 
            banner = await BannerRU.find({}).sort({created_date: -1}).limit(per_page)
        }
        else if (lang_code == langList[2].code) {
            banner = await BannerEN.find({}).sort({created_date: -1}).limit(per_page)
        }

        res.status(200).json({
            isSuccess: true,
            data: banner,
            errorMessage: null,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error
        })
    }
})



module.exports = router;