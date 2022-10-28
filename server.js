
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose")
require('dotenv').config()

const auth = require("./middlewares/authMiddleware")
const lang = require('./middlewares/langMiddleware');



// Routes
const adminNewsRoutes = require("./router/newsRouter")
const authRouter = require("./router/authRouter")
const teacherRouter = require("./router/teacherRouter")
const subjectRouter = require("./router/subjectRouter")
const lectureRouter = require("./router/lectureRouter")
const uploadRouter = require("./router/uploadFileRouter")


app.use(express.json());
app.use(cors());



app.use("/auth", authRouter);
app.use("/admin/news", lang, adminNewsRoutes);
app.use("/admin/teacher", lang, auth,teacherRouter);
app.use("/admin/subject", lang, auth, subjectRouter);
app.use("/admin/lecture", lang, auth, lectureRouter);
app.use('/admin/upload', uploadRouter);


// Public directions routes
app.use('/teacher/avatar', express.static(__dirname + '/public/teacher'));
app.use('/news/picture', express.static(__dirname + '/public/news'));





app.get("/", async (req, res) => {
    res.status(200).json({
        isSuccess: true,
        data: null,
    })
})














mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Server connect to database...");
}).catch((error) => {
    console.log(`Database connect error --->  ${error}`);
})






const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})