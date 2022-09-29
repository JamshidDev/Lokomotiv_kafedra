const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:"admin.jpg"
    },
    login:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_date:{
        type:Date,
        default: Date.now
    },
    updated_date:{
        type:Date,
        required:true
    }
})

module.exports= mongoose.model('Admin', adminSchema)