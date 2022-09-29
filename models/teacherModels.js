const mongoose = require("mongoose")

const teacherSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    midName:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        default:"admin.jpg"
    },
    email:{
        type:String,
        required:true,
    },
    visit_time:{
        type:String,
        required:true,
    },
    subjects:{
        type:Array,
        required:false
        
    },
    additionalInfo:{
        type:String,
        default:"Additional Information"
        
    },
    others:{
        type:String,
        default:"other Information"
        
    },

})
module.exports = mongoose.model("Teacher", teacherSchema)