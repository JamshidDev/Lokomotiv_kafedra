
const express = require('express');
const router = express.Router();

const { SubjectUZ, SubjectRU, SubjectEN } = require("../models/subjectModels");

const langList = require("../utils/langList")


router.get("/all", async (req, res) => {
    try {
        let lang_code = req.lang_code;
        let search = req.query.search || "";
        let course_id = req.query.course_id || "";
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        let subject = null;
        let totalPage = null;

        if (lang_code == langList[0].code) {
            totalPage = await SubjectUZ.countDocuments({ course_id, name: { $regex: search, $options: 'i' } });
            subject = await SubjectUZ.find({ course_id, name: { $regex: search, $options: 'i' } }).skip((page - 1) * per_page).limit(per_page)
        } else if (lang_code == langList[1].code) {
            totalPage = await SubjectRU.countDocuments({ course_id, name: { $regex: search, $options: 'i' } });
            subject = await SubjectRU.find({ course_id, name: { $regex: search, $options: 'i' } }).skip((page - 1) * per_page).limit(per_page)
        } else if (lang_code == langList[2].code) {
            totalPage = await SubjectEN.countDocuments({ course_id, name: { $regex: search, $options: 'i' } });
            subject = await SubjectEN.find({ course_id, name: { $regex: search, $options: 'i' } }).skip((page - 1) * per_page).limit(per_page)
        }
        res.status(200).json({
            isSuccess: true,
            data: subject,
            totalPage,
            errorMessage: null
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error
        })
    }
})




module.exports = router;