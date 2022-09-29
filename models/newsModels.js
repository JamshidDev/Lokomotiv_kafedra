const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    title:{
        type:String,
        reqiured:true,
    },
    text:{
        type:String,
        reqiured:true,
    },
    picture:{
        type:String,
        reqiured:true,
    },
    views:{
        type:Number,
        reqiured:true,
        default:0,
    },
    creator:{
        type:String,
        reqiured:true,
    },
    created_date:{
        type:Date,
        default:Date.now,
    },
    last_updated_date:{
        type:Date,
        reqiured:true,
    }
})



// Export module

module.exports= mongoose.model("News", newsSchema);