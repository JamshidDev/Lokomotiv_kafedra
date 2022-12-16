const mongoose = require('mongoose');

let BannerSchemaUZ = mongoose.Schema({
    title:{
        type:String,
        default:null,
    },
    subTitle:{
        type:String,
        default:null,
    },
    picture:{
        type:String,
        required:true,
    },
    positionIndex:{
        type:Number,
        default:0,
    },
    created_date : { type: Date, required: true, default: Date.now }


})

let BannerSchemaRU = mongoose.Schema({
    title:{
        type:String,
        default:null,
    },
    subTitle:{
        type:String,
        default:null,
    },
    picture:{
        type:String,
        required:true,
    },
    positionIndex:{
        type:Number,
        default:0,
    },
    created_date : { type: Date, required: true, default: Date.now }


})

let BannerSchemaEN = mongoose.Schema({
    title:{
        type:String,
        default:null,
    },
    subTitle:{
        type:String,
        default:null,
    },
    picture:{
        type:String,
        required:true,
    },
    positionIndex:{
        type:Number,
        default:0,
    },
    created_date : { type: Date, required: true, default: Date.now }

})

const BannerUZ = mongoose.model("BannerUZ", BannerSchemaUZ);
const BannerRU = mongoose.model("BannerRU", BannerSchemaRU);
const BannerEN = mongoose.model("BannerEN", BannerSchemaEN);

module.exports = {
    BannerEN, BannerRU, BannerUZ
}