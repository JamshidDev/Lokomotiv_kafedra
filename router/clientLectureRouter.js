
const express = require("express");
const langList = require("../utils/langList")
const { LectureUZ, LectureEN, LectureRU } = require("../models/lectureModels");

const router = express.Router();


router.get('/all', async (req, res) => {
    try{
        let lang_code = req.lang_code;
        let subject_id = req.query.subject_id;
        let per_page = req.query.per_page || 10;
        let page = req.query.page || 1;
        let lecture = null;
        if(lang_code == langList[0].code) {
            lecture = await LectureUZ.find({subjectId:subject_id}).populate("subjectId").skip((page-1)*per_page).limit(per_page);
             
         }else if(lang_code == langList[1].code){
             lecture = await LectureRU.find({subjectId:subject_id}).populate("subjectId").skip((page-1)*per_page).limit(per_page);
         }
         else if(lang_code == langList[2].code){
             lecture = await LectureEN.find({subjectId:subject_id}).populate("subjectId").skip((page-1)*per_page).limit(per_page);
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

router.get('/one', async (req, res) => {
    try{
        let lang_code = req.lang_code;
        let lecture_id = req.query.lecture_id;
        console.log(lecture_id);
        let lecture = null;
        if(lang_code == langList[0].code) {
            lecture = await LectureUZ.find({_id:lecture_id})
             
         }else if(lang_code == langList[1].code){
             lecture = await LectureRU.find({_id:lecture_id})
         }
         else if(lang_code == langList[2].code){
             lecture = await LectureEN.find({_id:lecture_id})
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







module.exports = router;