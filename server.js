
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose")
require('dotenv').config()



// Routes
const adminNewsRoutes = require("./router/newsRouter")
const authRouter = require("./router/authRouter")
const teacherRouter = require("./router/teacherRouter")


app.use(express.json());
app.use(cors());


app.use("/auth", authRouter);
app.use("/admin/news", adminNewsRoutes);
app.use("/teacher", teacherRouter);



app.get("/", async (req,res)=>{
    res.status(200).json({
        isSuccess:true,
        data:null,
    })
})














mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Server connect to database...");
}).catch((error)=>{
    console.log(`Database connect error --->  ${error}`);
})

const PORT = process.env.PORT ||500;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);   
})