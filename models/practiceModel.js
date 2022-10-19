const mongoose = require('mongoose')

const PracticeSchemaUZ = mongoose.Schema({
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

const PracticeSchemaRU = mongoose.Schema({
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
    }
})

const PracticeSchemaEN = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    context:{
        type:String,
        required:true,
    },
    subjectId:{
        type:mongoose.Schema.Types.ObjectId, ref:"SubjectEN",
    },
    creatorId:{
        type:mongoose.Schema.Types.ObjectId, ref:"Admin",
    }
})

const PracticeUZ = mongoose.model("PracticeUZ", PracticeSchemaUZ)
const PracticeRU = mongoose.model("PracticeRU", PracticeSchemaRU)
const PracticeEN = mongoose.model("PracticeEN", PracticeSchemaEN)


module.exports = {PracticeEN, PracticeRU, PracticeRU}