const mongoose = require('mongoose')

const LectureSchemaUZ = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    context:{
        type:String,
        required:true,
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId, ref:"SubjectUZ",
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId, ref:"Admin",
    }
    
})

const LectureSchemaRU = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    context:{
        type:String,
        required:true,
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId, ref:"SubjectRU",
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId, ref:"Admin",
    },
    
})

const LectureSchemaEN = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId, ref:"SubjectEN",
    },
    context:{
        type:String,
        required:true,
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId, ref:"Admin",
    }
    
})

const LectureUZ = mongoose.model("LectureUZ", LectureSchemaUZ);
const LectureRU = mongoose.model("LectureRU", LectureSchemaRU);
const LectureEN = mongoose.model("LectureEN", LectureSchemaEN);

module.exports ={LectureEN, LectureRU, LectureUZ}