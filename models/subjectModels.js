const mongoose = require('mongoose');

const SubjectSchemaUZ = new mongoose.Schema({
    name: {
        type: String,
        reqiured: true,
    },
    course_id: {
        type: String,
        reqiured: true,
    },
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "TeacherUZ",
            default: [],
        }
    ],
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Admin",
    }
})
const SubjectSchemaRU = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course_id: {
        type: String,
        reqiured: true,
    },
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "TeacherRU",
            default: [],
        }
    ],
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Admin",
    }
})
const SubjectSchemaEN = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    course_id: {
        type: String,
        reqiured: true,
    },
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "TeacherEN",
            default: [],
        }
    ],
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, ref: "Admin",
    }
})

const SubjectUZ = mongoose.model("SubjectUZ", SubjectSchemaUZ)
const SubjectRU = mongoose.model("SubjectRU", SubjectSchemaRU)
const SubjectEN = mongoose.model("SubjectEN", SubjectSchemaEN)


module.exports = { SubjectUZ, SubjectRU, SubjectEN }

