const JWT = require("jsonwebtoken")

module.exports = async function auth(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (token) {
        try {
            const decoded = JWT.verify(token, "Maxviy@Key");
            req.user_id = decoded._id;
            next()
        } catch (error) {
            res.status(401).json({
                isSuccess: false,
                data: null,
                errorMessage: "Token yaroqsiz"
            })
        }
    } else {
        res.status(401).json({
            isSuccess: false,
            data: null,
            errorMessage: "Ro'yhatdan o'tmagansiz"
        })
    }
}