const mongoose = require("mongoose")

const teacherSchemaUZ = mongoose.Schema({
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
    additionalInfo:{
        type:String,
        default:"Additional Information"
        
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId, ref:"Admin",
    },
    others:{
        type:String,
        default:"other Information"
        
    },
    indexOfPosition:{
        type:Number,
        default:0,
    }

})

const teacherSchemaRU = mongoose.Schema({
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
    additionalInfo:{
        type:String,
        default:"Additional Information"
        
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId, ref:"Admin",
    },
    others:{
        type:String,
        default:"other Information"
        
    },
    indexOfPosition:{
        type:Number,
        default:0,
    }

})

const teacherSchemaEN = mongoose.Schema({
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
    additionalInfo:{
        type:String,
        default:"Additional Information"
        
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId, ref:"Admin",
    },
    others:{
        type:String,
        default:"other Information"
        
    },
    indexOfPosition:{
        type:Number,
        default:0,
    }

})

const TeacherUZ =  mongoose.model("TeacherUZ", teacherSchemaUZ);
const TeacherRU = mongoose.model("TeacherRU", teacherSchemaRU);
const  TeacherEN = mongoose.model("TeacherEN", teacherSchemaEN)

module.exports = {TeacherUZ, TeacherRU, TeacherEN}


