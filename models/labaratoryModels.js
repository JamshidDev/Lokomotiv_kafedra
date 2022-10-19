const mongoose = require('mongoose');

const LabaratorySchemaUZ = mongoose.Schema({
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

const LabaratorySchemaRU = mongoose.Schema({
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

const LabaratorySchemaEN = mongoose.Schema({
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

const LabaratoryUZ = mongoose.model("LabaratoryUZ", LabaratorySchemaUZ)
const LabaratoryRU = mongoose.model("LabaratoryRU", LabaratorySchemaRU)
const LabaratoryEN = mongoose.model("LabaratoryEN", LabaratorySchemaEN)

module.exports = {LabaratoryEN, LabaratoryRU, LabaratoryUZ}
