const express = require("express")
const router = express.Router()
const langList = require("../utils/langList")
const { LectureUZ, LectureEN, LectureRU } = require("../models/lectureModels")

router.post("/add", async (req, res) => {
    try {
        let lang_code = req.lang_code;
        let creatorId = req.user_id;
        let { title, context, subject_id, } = req.body;
        let lecture = null;

        if (lang_code == langList[0].code) {
            lecture = await LectureUZ.create({
                title,
                context,
                subjectId:subject_id,
                creatorId,
            })
        } else if (lang_code == langList[1].code) {
            lecture = await LectureRU.create({
                title,
                context,
                subjectId:subject_id,
                creatorId,
            })
        } else if (lang_code == langList[2].code) {
            lecture = await LectureEN.create({
                title,
                context,
                subjectId:subject_id,
                creatorId,
            })
        }

        res.status(200).json({
            isSuccess: true,
            data: lecture,
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

router.put("/update", async(req,res) =>{
    try{
        let lang_code = req.lang_code;
        let lecture_id = req.query.lecture_id
        let { title, context, subject_id, } = req.body;
        let lecture = null;

        if(lang_code == langList[0].code) {
            lecture = await LectureUZ.findByIdAndUpdate(lecture_id, {
                title: title || undefined,
                context: context || undefined,
                subject_id: subject_id || undefined,
            })
        }else if(lang_code == langList[1].code){
            lecture = await LectureRU.findByIdAndUpdate(lecture_id, {
                title: title || undefined,
                context: context || undefined,
                subject_id: subject_id || undefined,
            })
        }
        else if(lang_code == langList[2].code){
            lecture = await LectureEN.findByIdAndUpdate(lecture_id, {
                title: title || undefined,
                context: context || undefined,
                subject_id: subject_id || undefined,
            })
        }

        res.status(200).json({
            isSuccess: true,
            data: lecture,
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

router.get("/one", async(req,res) =>{
    try{
        let lang_code = req.lang_code;
        let lecture_id = req.query.lecture_id;
        let lecture = null;

        if(lang_code == langList[0].code) {
           lecture = await LectureUZ.find({_id:lecture_id}).populate('subjectId');
            
        }else if(lang_code == langList[1].code){
            lecture = await LectureRU.find({_id:lecture_id}).populate('subjectId');
        }
        else if(lang_code == langList[2].code){
            lecture = await LectureEN.find({_id:lecture_id}).populate('subjectId');
        }

        res.status(200).json({
            isSuccess: true,
            data: lecture,
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

router.get("/all", async(req,res) =>{
    try{
        let lang_code = req.lang_code;
        let lecture = null;
        let per_page = req.query.per_page || 10;
        let page = req.query.page || 1;


        if(lang_code == langList[0].code) {
           lecture = await LectureUZ.find({}).populate("subjectId").skip((page-1)*per_page).limit(per_page);
            
        }else if(lang_code == langList[1].code){
            lecture = await LectureRU.find({}).populate("subjectId").skip((page-1)*per_page).limit(per_page);
        }
        else if(lang_code == langList[2].code){
            lecture = await LectureEN.find({}).populate("subjectId").skip((page-1)*per_page).limit(per_page);
        }

        res.status(200).json({
            isSuccess: true,
            data: lecture,
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


router.delete("/delete", async(req,res) =>{
    try{
        let lang_code = req.lang_code;
        let lecture_id = req.query.lecture_id
        let lecture = null;

        if(lang_code == langList[0].code) {
            lecture = await LectureUZ.deleteOne({_id:lecture_id})
        }else if(lang_code == langList[1].code){
            lecture = await LectureRU.deleteOne({_id:lecture_id})
        }
        else if(lang_code == langList[2].code){
            lecture = await LectureEN.deleteOne({_id:lecture_id})
        }
        res.status(200).json({
            isSuccess: true,
            data: lecture,
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