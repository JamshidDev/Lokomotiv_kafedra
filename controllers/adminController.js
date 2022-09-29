const ADMIN = require("../models/adminModels");
let {generateToken} = require("../utils/generateToken")

// auth admin
const authAdmin = async (req,res)=>{
    try{
        const {firstName, lastName,login, password } = req.body;
        let existAdmin = await ADMIN.find({login: login});
        if(existAdmin.length == 0 ){
            let admin = await ADMIN.create({
                firstName,
                lastName,
                login,
                password,
                updated_date: new Date()
            })
            let token = generateToken(admin._id)
            res.status(200).json({
                isSuccess:true,
                data:admin,
                access_token:token,
                refresh_token:token,
                errorMsg:null,
            })
        }else{
            res.status(400).json({
                isSuccess:true,
                data:null,
                errorMsg:"Siz allaqachon ro'yhatdan o'tgansiz."
            })
        }
        

    } catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            data:null,
            errorMsg:error,
        })
    }
}

const loginAdmin = async (req,res)=>{
    try{
        let {login, password} = req.body
        let existAdmin = await ADMIN.find({login, password});
        if(existAdmin.length==1){

            let token = generateToken(existAdmin[0]._id)
            res.status(200).json({
                isSuccess:true,
                data:existAdmin[0],
                access_token:token,
                refresh_token:token,
                errorMsg:null,
            })

        }else{
            res.status(400).json({
                isSuccess:true,
                data:null,
                errorMsg:"Parol yoki login noto'g'ri"
            })
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess:false,
            data:null,
            errorMsg:error,
        })
    }
}


module.exports = {authAdmin, loginAdmin}
