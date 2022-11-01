const express = require("express")
const router = express.Router()
const langList = require("../utils/langList")
const { validateTeacher } = require("../validator/teacherValidatyor")

const { TeacherUZ, TeacherRU, TeacherEN } = require("../models/teacherModels")
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




//  Add new teacher

router.post("/add", upload.single('picture'), async (req, res) => {
    try {

        let picture = req.file?.filename
        let creatorId = req.user_id;
        let lang_code = req.lang_code;
        let teacher = null;

        const { error, value } = validateTeacher(req.body)
        if (error) {

            res.status(400).json({
                isSuccess: false,
                data: null,
                errorMessage: error,
            })

        } else {
            let { firstName, lastName, midName, position, phone, email, visit_time, additionalInfo, } = value
            if (lang_code == langList[0].code) {

                // Personal info of techer in Uzbek

                let existteacher = await TeacherUZ.find({ creatorId });
                if (existteacher.length == 0) {
                    teacher = await TeacherUZ.create({
                        firstName,
                        lastName,
                        midName,
                        position,
                        phone,
                        picture,
                        email,
                        visit_time,
                        creatorId,
                        additionalInfo
                    })
                    res.status(200).json({
                        isSuccess: true,
                        data: teacher,
                        errorMessage: null,
                    })
                } else {
                    res.status(403).json({
                        isSuccess: false,
                        data: null,
                        errorMessage: {
                            msg: `O'qtuvchining shaxsiy ma'lumotlari allaqchon mavjud`,
                            teacher: existteacher,
                        },
                    })
                }



            } else if (lang_code == langList[1].code) {

                // Personal info of techer in Russian

                let existteacher = await TeacherRU.find({ creatorId });
                if (existteacher.length == 0) {
                    teacher = await TeacherRU.create({
                        firstName,
                        lastName,
                        midName,
                        position,
                        phone,
                        picture,
                        email,
                        visit_time,
                        creatorId,
                        additionalInfo
                    })
                    res.status(200).json({
                        isSuccess: true,
                        data: teacher,
                        errorMessage: null,
                    })
                } else {
                    res.status(403).json({
                        isSuccess: false,
                        data: null,
                        errorMessage: {
                            msg: `Личная информация преподавателя уже доступна`,
                            teacher: existteacher,
                        },
                    })
                }


            } else if (lang_code == langList[2].code) {

                // Personal info of techer in English

                let existteacher = await TeacherEN.find({ creatorId });
                if (existteacher.length == 0) {
                    teacher = await TeacherEN.create({
                        firstName,
                        lastName,
                        midName,
                        position,
                        phone,
                        picture,
                        email,
                        visit_time,
                        creatorId,
                        additionalInfo
                    })
                    res.status(200).json({
                        isSuccess: true,
                        data: teacher,
                        errorMessage: null,
                    })
                } else {
                    res.status(403).json({
                        isSuccess: false,
                        data: null,
                        errorMessage: {
                            msg: `The teacher's personal information is already available`,
                            teacher: existteacher,
                        },
                    })
                }


            }



        }





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
        let teacher_id = req.user_id
        let lang_code = req.lang_code;
        let { firstName, lastName, midName, position, phone, email, visit_time, additionalInfo } = req.body;
        let teacher = null;
        if (lang_code == langList[0].code) {
            // let oldTeacher = await TeacherUZ.findOne({ _id: teacher_id })
            // const path = `./public/teacher/${oldTeacher.picture}`;
            // fs.existsSync(path, function (exists) {
            //     console.log(exists);
            //     if (exists) {
            //         fs.unlinkSync(path);
            //     }
            // });

            teacher = await TeacherUZ.findOneAndUpdate({ creatorId: teacher_id }, {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                midName: midName || undefined,
                position: position || undefined,
                phone: phone || undefined,
                email: email || undefined,
                visit_time: visit_time || undefined,
                picture: picture || undefined,
                picture: picture || undefined,
                additionalInfo: additionalInfo || undefined,

            });
            console.log(teacher);

        } else if (lang_code == langList[1].code) {

            // let oldTeacher = await TeacherRU.findOne({ _id: teacher_id })
            // const path = `./public/teacher/${oldTeacher.picture}`;
            // fs.existsSync(path, function (exists) {
            //     if (exists) {
            //         fs.unlinkSync(path);
            //     }
            // });

            teacher = await TeacherRU.findOneAndUpdate({ creatorId: teacher_id }, {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                midName: midName || undefined,
                position: position || undefined,
                phone: phone || undefined,
                email: email || undefined,
                visit_time: visit_time || undefined,
                picture: picture || undefined,
                additionalInfo: additionalInfo || undefined,
            });
        } else if (lang_code == langList[2].code) {

            // let oldTeacher = await TeacherEN.findOne({ _id: teacher_id })
            // const path = `./public/teacher/${oldTeacher.picture}`;
            // fs.existsSync(path, function (exists) {
            //     if (exists) {
            //         fs.unlinkSync(path);
            //     }
            // });

            teacher = await TeacherEN.findOneAndUpdate({ creatorId: teacher_id }, {
                firstName: firstName || undefined,
                lastName: lastName || undefined,
                midName: midName || undefined,
                position: position || undefined,
                phone: phone || undefined,
                email: email || undefined,
                visit_time: visit_time || undefined,
                picture: picture || undefined,
                additionalInfo: additionalInfo || undefined,
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
            totalPage = await TeacherUZ.countDocuments({ firstName: { $regex: search, $options: 'i' } })
            teacher = await TeacherUZ.find({ firstName: { $regex: search, $options: 'i' } }).populate("creatorId", "firstName ").skip((page - 1) * per_page).limit(per_page);
        } else if (lang_code == langList[1].code) {
            totalPage = await TeacherRU.countDocuments({ firstName: { $regex: search, $options: 'i' } })
            teacher = await TeacherRU.find({ firstName: { $regex: search, $options: 'i' } }).populate("creatorId", "firstName ").skip((page - 1) * per_page).limit(per_page);
        } else if (lang_code == langList[2].code) {
            totalPage = await TeacherEN.countDocuments({ firstName: { $regex: search, $options: 'i' } })
            teacher = await TeacherEN.find({ firstName: { $regex: search, $options: 'i' } }).populate("creatorId", "firstName ").skip((page - 1) * per_page).limit(per_page);
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
        let teacher_id = req.user_id;
        let existTeacher = [];

        if (lang_code == langList[0].code) {

            existTeacher = await TeacherUZ.find({ creatorId: teacher_id }).populate("creatorId", "-login -password ")

            let isHaveTEacher = existTeacher.length > 0
            res.status(isHaveTEacher ? 200 : 400).json({
                isSuccess: isHaveTEacher,
                data: isHaveTEacher ? existTeacher : null,
                errorMessage: isHaveTEacher ? null : "O'qtuvchining shaxsiy ma'lumotlari kiritilmagan",
            })

        } else if (lang_code == langList[1].code) {

            existTeacher = await TeacherRU.find({ creatorId: teacher_id }).populate("creatorId", "-login -password ")

            let isHaveTEacher = existTeacher.length > 0
            res.status(isHaveTEacher ? 200 : 400).json({
                isSuccess: isHaveTEacher,
                data: isHaveTEacher ? existTeacher : null,
                errorMessage: isHaveTEacher ? null : `Персональные данные учителя не включены`,
            })

        } else if (lang_code == langList[2].code) {

            existTeacher = await TeacherEN.find({ creatorId: teacher_id }).populate("creatorId", "-login -password ")

            let isHaveTEacher = existTeacher.length > 0
            res.status(isHaveTEacher ? 200 : 400).json({
                isSuccess: isHaveTEacher,
                data: isHaveTEacher ? existTeacher : null,
                errorMessage: isHaveTEacher ? null : `Personal information of the teacher is not included`,
            })

        }


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

        // let teacher_id = req.query.teacher_id;
        // let lang_code = req.lang_code;
        // let teacher = null;
        // if (lang_code == langList[0].code) {
        //     let oldTeacher = await TeacherUZ.findOne({ _id: teacher_id })
        //     const path = `./public/teacher/${oldTeacher.picture}`;
        //     fs.unlinkSync(path);
        //     teacher = await TeacherUZ.deleteOne({ _id: teacher_id })
        // } else if (lang_code == langList[1].code) {
        //     let oldTeacher = await TeacherRU.findOne({ _id: teacher_id })
        //     const path = `./public/teacher/${oldTeacher.picture}`;
        //     fs.unlinkSync(path);
        //     teacher = await TeacherRU.deleteOne({ _id: teacher_id })
        // } else if (lang_code == langList[1].code) {
        //     let oldTeacher = await TeacherEN.findOne({ _id: teacher_id })
        //     const path = `./public/teacher/${oldTeacher.picture}`;
        //     fs.unlinkSync(path);
        //     teacher = await TeacherEN.deleteOne({ _id: teacher_id })
        // }
        res.status(400).json({
            isSuccess: false,
            data: null,
            errorMessage: `Vaqtincha ruhsat etilmagan`,
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