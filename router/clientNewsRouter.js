
const express = require("express");
const router = express.Router();
const langList = require("../utils/langList")
const { NewEN, NewRU, NewUZ } = require("../models/newsModels")

// Lenta news
router.get('/lenta', async (req, res) =>{
   try{

    let per_page = req.query.per_page || 10;
    let lang_code = req.lang_code;
    let news = null;

    if(lang_code == langList[0].code){
        news = await NewUZ.find({}).sort({created_date:-1}).limit(per_page)
    }else if(lang_code == langList[1].code){
        news = await NewRU.find({}).sort({created_date:-1}).limit(per_page)
    }else if(lang_code == langList[2].code){
        news = await NewEN.find({}).sort({created_date:-1}).limit(per_page)
    }

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
   }
})


// All news
router.get('/all', async (req, res) =>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        let sort = req.query.sort || 1;
        let lang_code = req.lang_code;
        let news =null;

        if(lang_code == langList[0].code){
            news = await NewUZ.find({}).sort({created_date:sort}).skip((page-1)*per_page).limit(per_page)
        }else if(lang_code == langList[1].code){
            news = await NewRU.find({}).sort({created_date:sort}).skip((page-1)*per_page).limit(per_page)
        }else if(lang_code == langList[2].code){
            news = await  NewEN.find({}).sort({created_date:sort}).skip((page-1)*per_page).limit(per_page)
        }
    
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
    }
})

// Get one news
router.get('/one', async (req, res) =>{
    try{
 
     let news_id = req.query.news_id;
     let lang_code = req.lang_code;
     let news = null;
 
     if(lang_code == langList[0].code){
         news = await NewUZ.findById(news_id)
     }else if(lang_code == langList[1].code){
         news = await NewRU.findById(news_id)
     }else if(lang_code == langList[2].code){
         news = await NewEN.findById(news_id)
     }
 
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
    }
 })










module.exports = router;
