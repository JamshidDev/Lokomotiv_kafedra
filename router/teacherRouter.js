const express = require("express")
const router = express.Router()
const langList = require("../utils/langList")

const { TeacherUZ, TeacherRU, TeacherEN } = require("../models/teacherModels")
const fs = require("fs")
const multer = require("multer")
const e = require("express")

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
        let picture = req.file?.filename
        let creatorId = req.user_id;
        let lang_code = req.lang_code;
        let { firstName, lastName, midName, position, phone, email, visit_time, subjects } = req.body
        console.log(subjects);
        console.log(JSON.parse(subjects));
        let teacher = null;

        if (lang_code == langList[0].code) {
            teacher = await TeacherUZ.create({
                firstName,
                lastName,
                midName,
                position,
                phone,
                picture,
                email,
                visit_time,
                subjects,
                creatorId,
            })
        } else if (lang_code == langList[1].code) {
            teacher = await TeacherRU.create({
                firstName,
                lastName,
                midName,
                position,
                phone,
                picture,
                email,
                visit_time,
                subjects,
                creatorId,
            })
        } else if (lang_code == langList[2].code) {
            teacher = await TeacherEN.create({
                firstName,
                lastName,
                midName,
                position,
                phone,
                picture,
                email,
                visit_time,
                subjects,
                creatorId,
            })
        }



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
router.put("/update", upload.single('picture'), async (req, res) => {
    try {
        let picture = req.file?.filename
        let teacher_id = req.query.teacher_id
        let lang_code = req.lang_code;
        let { firstName, lastName, midName, position, phone, email, visit_time, subjects } = req.body;
        
        let teacher = null;
        if (lang_code == langList[0].code) {
            let oldTeacher = await TeacherUZ.findOne({ _id: teacher_id })
            const path = `./public/teacher/${oldTeacher.picture}`;
            fs.existsSync(path, function (exists) {
                if (exists) {
                    fs.unlinkSync(path);
                }
            });

            teacher = await TeacherUZ.findByIdAndUpdate(teacher_id, {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                midName: midName || undefined,
                position: position || undefined,
                phone: phone || undefined,
                email: email || undefined,
                visit_time: visit_time || undefined,
                subjects: subjects || undefined,
                picture: picture || undefined,
            });
        } else if (lang_code == langList[1].code) {

            let oldTeacher = await TeacherRU.findOne({ _id: teacher_id })
            const path = `./public/teacher/${oldTeacher.picture}`;
            fs.existsSync(path, function (exists) {
                if (exists) {
                    fs.unlinkSync(path);
                }
            });

            teacher = await TeacherRU.findByIdAndUpdate(teacher_id, {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                midName: midName || undefined,
                position: position || undefined,
                phone: phone || undefined,
                email: email || undefined,
                visit_time: visit_time || undefined,
                subjects: subjects || undefined,
                picture: picture || undefined,
            });
        } else if (lang_code == langList[2].code) {

            let oldTeacher = await TeacherEN.findOne({ _id: teacher_id })
            const path = `./public/teacher/${oldTeacher.picture}`;
            fs.existsSync(path, function (exists) {
                if (exists) {
                    fs.unlinkSync(path);
                }
            });

            teacher = await TeacherEN.findByIdAndUpdate(teacher_id, {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                midName: midName || undefined,
                position: position || undefined,
                phone: phone || undefined,
                email: email || undefined,
                visit_time: visit_time || undefined,
                subjects: subjects || undefined,
                picture: picture || undefined,
            });
        }

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

// Teacher pagination
router.get("/all", async (req, res) => {
    try {
        let lang_code = req.lang_code;
        let page = req.query.page || 1;
        let per_page = req.query.per_page || 10;
        let search = req.query.search || "";

        let teacher = null;
        let totalPage = null;

        if (lang_code == langList[0].code) {
            totalPage = await TeacherUZ.countDocuments({ firstName: { $regex: search } })
            teacher = await TeacherUZ.find({ firstName: { $regex: search } }).populate("creatorId", "firstName ").skip((page - 1) * per_page).limit(per_page);
        } else if (lang_code == langList[1].code) {
            totalPage = await TeacherRU.countDocuments({ firstName: { $regex: search } })
            teacher = await TeacherRU.find({ firstName: { $regex: search } }).populate("creatorId", "firstName ").skip((page - 1) * per_page).limit(per_page);
        } else if (lang_code == langList[2].code) {
            totalPage = await TeacherEN.countDocuments({ firstName: { $regex: search } })
            teacher = await TeacherEN.find({ firstName: { $regex: search } }).populate("creatorId", "firstName ").skip((page - 1) * per_page).limit(per_page);
        }

        res.status(200).json({
            isSuccess: true,
            data: teacher,
            totalPage,
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

// Get teacher by id
router.get("/one", async (req, res) => {
    try {
        let lang_code = req.lang_code;
        let teacher_id = req.query.teacher_id;
        let existTeacher = [];

        if (lang_code == langList[0].code) {
            existTeacher = await TeacherUZ.find({ _id: teacher_id })
        } else if (lang_code == langList[1].code) {
            existTeacher = await TeacherRU.find({ _id: teacher_id })
        } else if (lang_code == langList[2].code) {
            existTeacher = await TeacherEN.find({ _id: teacher_id })
        }
        let isHaveTEacher = existTeacher.length > 0
        res.status(isHaveTEacher ? 200 : 400).json({
            isSuccess: isHaveTEacher,
            data: isHaveTEacher ? existTeacher : null,
            errorMessage: isHaveTEacher ? null : "Teacher not found",
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

router.delete("/delete", async (req, res) => {
    try {
        let teacher_id = req.query.teacher_id;
        let lang_code = req.lang_code;
        let teacher = null;

        if (lang_code == langList[0].code) {
            let oldTeacher = await TeacherUZ.findOne({ _id: teacher_id })
            const path = `./public/teacher/${oldTeacher.picture}`;
            fs.existsSync(path, function (exists) {
                if (exists) {
                    fs.unlinkSync(path);
                }
            });
            teacher = await TeacherUZ.deleteOne({ _id: teacher_id })
        } else if (lang_code == langList[1].code) {
            let oldTeacher = await TeacherRU.findOne({ _id: teacher_id })
            const path = `./public/teacher/${oldTeacher.picture}`;
            fs.existsSync(path, function (exists) {
                if (exists) {
                    fs.unlinkSync(path);
                }
            });
            teacher = await TeacherRU.deleteOne({ _id: teacher_id })
        } else if (lang_code == langList[1].code) {
            let oldTeacher = await TeacherEN.findOne({ _id: teacher_id })
            const path = `./public/teacher/${oldTeacher.picture}`;
            fs.existsSync(path, function (exists) {
                if (exists) {
                    fs.unlinkSync(path);
                }
            });
            teacher = await TeacherEN.deleteOne({ _id: teacher_id })
        }
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



module.exports = router