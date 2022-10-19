const express = require('express');
const router = express.Router();

const { SubjectUZ, SubjectRU, SubjectEN } = require("../models/subjectModels");


const Joi = require('joi');
const { validateSubject } = require("../validator/subjectValidator");
const langList = require("../utils/langList")

router.post("/add", async (req, res) => {
    try {
        let creatorId = req.user_id;
        let lang_code = req.lang_code;
        let subject = null;

        const { error, value } = validateSubject(req.body)
        if (error) {
            res.status(400).json({
                isSuccess: false,
                data: null,
                errorMessage: error,
            })
        } else {
            const { name, course_id } = req.body
            if (lang_code == langList[0].code) {
                subject = await SubjectUZ.create({
                    name,
                    course_id,
                    creatorId
                })
            } else if (lang_code == langList[1].code) {
                subject = await SubjectRU.create({
                    name,
                    course_id,
                    creatorId
                })
            }
            else if (lang_code == langList[2].code) {
                subject = await SubjectEN.create({
                    name,
                    course_id,
                    creatorId
                })
            }

            res.status(200).json({
                isSuccess: true,
                data: subject,
                errorMessage: null,
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error
        })

    }
})

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

router.put("/update", async (req, res) => {
    try {
        let lang_code = req.lang_code;
        let subject_id = req.query.subject_id || "";
        let subject = null;
        let { name, course_id } = req.body;

        if (lang_code == langList[0].code) {
            subject = await SubjectUZ.findByIdAndUpdate(subject_id, {
                name: name || undefined,
                course_id: course_id || undefined,
            })
        } else if (lang_code == langList[1].code) {
            subject = await SubjectRU.findByIdAndUpdate(subject_id, {
                name: name || undefined,
                course_id: course_id || undefined,
            })
        } else if (lang_code == langList[2].code) {
            subject = await SubjectEN.findByIdAndUpdate(subject_id, {
                name: name || undefined,
                course_id: course_id || undefined,
            })
        }
        res.status(200).json({
            isSuccess: true,
            data: subject,
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

router.delete("/delete", async (req, res) => {
    try {
        let lang_code = req.lang_code;
        let subject_id = req.query.subject_id || "";
        let subject = null;
        if (lang_code == langList[0].code) {
            subject = await SubjectUZ.deleteOne({ _id: subject_id })
        } else if (lang_code == langList[1].code) {
            subject = await SubjectRU.deleteOne({ _id: subject_id })
        } else if (lang_code == langList[2].code) {
            subject = await SubjectEN.deleteOne({ _id: subject_id })
        }
        res.status(200).json({
            isSuccess: true,
            data: subject,
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





module.exports = router