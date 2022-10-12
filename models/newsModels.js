const mongoose = require("mongoose");

const NewSchemaUZ = mongoose.Schema({
    title: {
        type: String,
        reqiured: true,
    },
    text: {
        type: String,
        reqiured: true,
    },
    picture: {
        type: String,
        reqiured: true,
    },
    views: {
        type: Number,
        reqiured: true,
        default: 0,
    },
    creatorId: {
        type: String,
        reqiured: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    last_updated_date: {
        type: Date,
        reqiured: true,
    }
})
const NewSchemaRU = mongoose.Schema({
    title: {
        type: String,
        reqiured: true,
    },
    text: {
        type: String,
        reqiured: true,
    },
    picture: {
        type: String,
        reqiured: true,
    },
    views: {
        type: Number,
        reqiured: true,
        default: 0,
    },
    creatorId: {
        type: String,
        reqiured: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    last_updated_date: {
        type: Date,
        reqiured: true,
    }
})

const NewSchemaEN = mongoose.Schema({
    title: {
        type: String,
        reqiured: true,
    },
    text: {
        type: String,
        reqiured: true,
    },
    picture: {
        type: String,
        reqiured: true,
    },
    views: {
        type: Number,
        reqiured: true,
        default: 0,
    },
    creatorId: {
        type: String,
        reqiured: true,
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
    last_updated_date: {
        type: Date,
        reqiured: true,
    }
})



// Export module
const NewUZ = mongoose.model("NewUZ", NewSchemaUZ)
const NewRU = mongoose.model("NewRU", NewSchemaRU)
const NewEN = mongoose.model("NewEN", NewSchemaEN)
module.exports = { NewUZ, NewRU, NewEN }