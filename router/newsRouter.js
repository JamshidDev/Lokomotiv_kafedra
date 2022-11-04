const express = require("express")
const router = express.Router()

const { validateNews } = require("../validator/newsValidator")

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
    let fileName = req.file?.filename;
    let news = null;

    const { error, value } = validateNews(req.body)
    if (error) {
      res.status(400).json({
        isSuccess: false,
        data: news,
        errorMessage: error,
      })
    } else {

      let { title, text } = value;

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
      }
      else if (lang_code == langList[2].code) {
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

    }


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
  try {
    let lang_code = req.lang_code;
    let page = req.query.page || 1;
    let per_page = req.query.per_page || 10;
    let search = req.query.search || "";
    let news = []
    let totalPage = 0

    if (lang_code == langList[0].code) {
      totalPage = await NewUZ.countDocuments({ title: { $regex: search } })
      news = await NewUZ.find({ title: { $regex: search } }).skip((page - 1) * page).limit(per_page)
    } else if (lang_code == langList[1].code) {
      totalPage = await NewRU.countDocuments({ title: { $regex: search } })
      news = await NewRU.find({ title: { $regex: search } }).skip((page - 1) * page).limit(per_page)
    }
    else if (lang_code == langList[2].code) {
      totalPage = await NewEN.countDocuments({ title: { $regex: search } })
      news = await NewEN.find({ title: { $regex: search } }).skip((page - 1) * page).limit(per_page)
    }

    res.status(200).json({
      isSuccess: true,
      data: news,
      errorMessage: null,
      totalPage: totalPage,
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

// get one news
router.get("/one", async (req, res) => {
  try {
    let lang_code = req.lang_code;
    let news_id = req.query.id || '';
    let news = null;

    if (lang_code == langList[0].code) {
      news = await NewUZ.findOne({ _id: news_id })
    } else if (lang_code == langList[1].code) {
      news = await NewRU.findOne({ _id: news_id })
    } else if (lang_code == langList[2].code) {
      news = await NewEN.findOne({ _id: news_id })
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


// viewed counter
router.get("/viewed", async (req, res) => {
  try {
    let lang_code = req.lang_code;
    let news_id = req.query.id || '';
    let updateNews = null;

    if (lang_code == langList[0].code) {

      let oldnew = await NewUZ.findOne({ _id: news_id });
      updateNews = await NewUZ.findByIdAndUpdate(news_id, {
        views: oldnew.views + 1
      })

    } else if (lang_code == langList[1].code) {
      let oldnew = await NewRU.findOne({ _id: news_id })
      updateNews = await NewRU.findByIdAndUpdate(news_id, {
        views: oldnew.views + 1
      })
    } else if (lang_code == langList[2].code) {
      let oldnew = await NewEN.findOne({ _id: news_id })
      updateNews = await NewEN.findByIdAndUpdate(news_id, {
        views: oldnew.views + 1
      })
    }
    res.status(200).json({
      isSuccess: true,
      data: updateNews,
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

router.put('/update', upload.single('picture'), async (req, res) => {
  try {
    let lang_code = req.lang_code;
    let news_id = req.query.id || '';
    let fileName = req.file?.filename;
    let { title, text } = req.body;
    let updateNews = null;

    if (lang_code == langList[0].code) {
      updateNews = await NewUZ.findOneAndUpdate({ _id: news_id }, {
        title: title || undefined,
        text: text || undefined,
        picture: fileName || undefined,
      });
    } else if (lang_code == langList[1].code) {
      updateNews = await NewRU.findOneAndUpdate({ _id: news_id }, {
        title: title || undefined,
        text: text || undefined,
        picture: fileName || undefined,
      });
    } else if (lang_code == langList[2].code) {
      updateNews = await NewEN.findOneAndUpdate({ _id: news_id }, {
        title: title || undefined,
        text: text || undefined,
        picture: fileName || undefined,
      });
    }

    res.status(200).json({
      isSuccess: true,
      data: updateNews,
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

router.delete("/delete", async (req, res) => {
  try {
    let lang_code = req.lang_code;
    let news_id = req.query.id || '';
    let deleteNews = null;

    if (lang_code == langList[0].code) {
      deleteNews = await NewUZ.deleteOne({ _id: news_id });
    } else if (lang_code == langList[1].code) {
      deleteNews = await NewRU.deleteOne({ _id: news_id });
    } else if (lang_code == langList[2].code) {
      deleteNews = await NewEN.deleteOne({ _id: news_id });
    }
    res.status(200).json({
      isSuccess: true,
      data: deleteNews,
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
});






// Export module

module.exports = router