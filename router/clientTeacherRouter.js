const express = require('express');
const router = express.Router();

const { TeacherUZ, TeacherRU, TeacherEN } = require("../models/teacherModels")
const langList = require("../utils/langList")


router.get('/all', async (req, res) =>{
    try{
        let lang_code = req.lang_code;
        let per_page = req.query.per_page || 10;
        let page = req.query.page || 1;
        let search = req.query.search || '';
        let teachers = null;
        let totalItems = 0;

        if (lang_code == langList[0].code){
            totalItems = await TeacherUZ.countDocuments();
            teachers = await TeacherUZ.find({}).skip((page-1)*per_page).limit(per_page);
        }else if (lang_code == langList[1].code){
            totalItems = await TeacherRU.countDocuments();
            teachers = await TeacherRU.find({}).skip((page-1)*per_page).limit(per_page);
        }else if (lang_code == langList[2].code){
            totalItems = await TeacherEN.countDocuments();
            teachers = await TeacherEN.find({}).skip((page-1)*per_page).limit(per_page);
        }

        res.status(200).json({
            isSuccess: true,
            data: teachers,
            totalItems:totalItems,
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


router.get('/one', async (req, res) =>{
    try{
        let lang_code = req.lang_code;
        let teacher_id = req.query.teacher_id || '';
        let teachers = null;

        if (lang_code == langList[0].code){
            teachers = await TeacherUZ.find({_id: teacher_id});
        }else if (lang_code == langList[1].code){
            teachers = await TeacherRU.find({_id: teacher_id});
        }else if (lang_code == langList[2].code){
            teachers = await TeacherEN.find({_id: teacher_id});
        }

        res.status(200).json({
            isSuccess: true,
            data: teachers,
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