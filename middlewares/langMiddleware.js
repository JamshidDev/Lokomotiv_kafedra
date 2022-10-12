const JWT = require("jsonwebtoken")
let langList = require("../utils/langList")
module.exports = async function lang(req, res, next) {
    let lang_code = req.headers.lang_code? req.headers.lang_code : null
    let existLang = langList.filter((item)=> item.code ==lang_code )

    if (lang_code && existLang.length > 0) {
        try {
            req.lang_code = Number(lang_code)
            next()
        } catch (error) {
            res.status(400).json({
                isSuccess: false,
                data: null,
                errorMessage: "lang_code is invalid"
            })
        }
    } else {
        res.status(400).json({
            isSuccess: false,
            data: null,
            errorMessage: "lang_code is null or invalid "
        })
    }
}