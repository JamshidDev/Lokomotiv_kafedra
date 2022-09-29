
const express = require('express');
const router = express.Router();
const ADMIN = require('../models/adminModels');
const {authAdmin,loginAdmin} = require("../controllers/adminController")

router.post("/login",loginAdmin)
router.post("/register", authAdmin)



module.exports = router