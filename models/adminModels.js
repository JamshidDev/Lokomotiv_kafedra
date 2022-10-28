const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    fullName:{
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
    permissions:{
        type:[String],
        default:['admin', 'delete', 'edit', 'create']
    },
    active:{
        type:Boolean,
        default:true,
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