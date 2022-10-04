
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


app.use(express.json());
app.use(cors());


app.use("/auth", authRouter);
app.use("/admin/news", lang, adminNewsRoutes);
app.use("/admin/teacher", auth, lang, teacherRouter);

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









const authorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})

const bookModel = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: authorSchema,
        required: true,
    },
})

const Book = mongoose.model('Book', bookModel)
const Author = mongoose.model('Author', authorSchema)

async function createBook(title, author) {
    let book = await Book.create({
        title,
        author,
    })
    book.save()
}

// createBook("Test Book",
// new Author({
//     firstName: "Test",
//     lastName: "Test",
//     email:"Test@mail.com",
// }))

async function updateBook(bookId) {
    let book = await Book.updateOne({ _id: bookId },
        {
            $set: {
                author: {
                    firstName: "Test 1",
                    lastName: "Test 1",
                }
            }
        }
    )
}

updateBook('633bbcac43ac48512e2076c6')





const PORT = process.env.PORT || 500;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})