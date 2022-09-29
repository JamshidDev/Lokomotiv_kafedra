const express = require("express")
const router = express.Router()

const TEACHER = require("../models/teacherModels")
const fs = require("fs")
const multer = require("multer")

const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/teacher')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })





router.post("/add", upload.single('picture'), async (req, res) => {
    try {
        let picture = req.file.filename
        let {firstName,lastName,midName,position,phone,email,visit_time,subjects} = req.body
        let teacher = await TEACHER.create({
            firstName,
            lastName,
            midName,
            position,
            phone,
            picture,
            email,
            visit_time,
            subjects,
        })
        res.status(200).json({
            isSuccess: true,
            data: teacher,
            errorMessage: null,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
})

//  edit teacher details
router.put("/update", upload.single('picture'), async(req,res)=>{
    try{
        let picture = req.file?.filename
        let teacher_id = req.query.teacher_id
        let {firstName,lastName,midName,position,phone,email,visit_time,subjects} = req.body;
        let oldTeacher = await TEACHER.findOne({ _id: teacher_id })
        const path = `./public/teacher/${oldTeacher.picture}`;
       if(picture){
        fs.unlinkSync(path, (error) => {
            if (error) {
              console.log(`Delete news picture error ---> ${error}`);
              return
            }
          })
       }
        let teacher = await TEACHER.findByIdAndUpdate(teacher_id, {
            firstName,
            lastName,
            midName,
            position,
            phone,
            email,
            visit_time,
            subjects,
            picture,
          });
          res.status(200).json({
            isSuccess: true,
            data: teacher,
            errorMessage: null,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
} )

// Teacher pagination
router.get("/all", async(req, res)=>{
    try{
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        console.log(req.query);
        let totalPage = await TEACHER.countDocuments({})

        let teacher = await TEACHER.find({}).skip((page-1)*per_page).limit(per_page);
        res.status(200).json({
            isSuccess: true,
            data: teacher,
            totalPage,
            errorMessage: null,
        })

     }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
})

// Get teacher by id
router.get("/one", async(req,res)=>{
    try{
        let teacher_id = req.query.teacher_id;
        let totalPage = await TEACHER.countDocuments({})
        let existTeacher = await TEACHER.find({_id:teacher_id})
        if(existTeacher.length>0){
            res.status(200).json({
                isSuccess: true,
                data: existTeacher,
                totalPage,
                errorMessage: null,
            })
        }else{
            res.status(400).json({
                isSuccess: false,
                data: null,
                errorMessage: "Teacher topilmadi",
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
})

router.delete("/delete", async(req, res) => {
    try{
        let teacher_id = req.query.teacher_id;
        let teacher = await TEACHER.deleteOne({_id: teacher_id})
        res.status(200).json({
            isSuccess: true,
            data: teacher,
            errorMessage: null,
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
})



module.exports = router