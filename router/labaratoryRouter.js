const express = require("express")
const router = express.Router()
const langList = require("../utils/langList")

const { LabaratoryEN, LabaratoryUZ, LabaratoryRU } = require('../models/labaratoryModels')

const { validateLabaratory } = require("../validator/labaratoryValidator");


router.post("/add", async (req, res) => {
    try {

        let { creatorId, lang_code } = req;
        let labaratory = null;

        const { error, value } = validateLabaratory(req.body);

        if (error) {
            res.status(400).json({
                isSuccess: false,
                data: news,
                errorMessage: error,
            })
        } else {
            let { title, context, subjectId } = value
            if (lang_code == langList[0].code) {
                labaratory = await LabaratoryUZ.create({
                    title,
                    context,
                    subjectId,
                    creatorId,
                })
            } else if (lang_code == langList[1].code) {
                labaratory = await LabaratoryRU.create({
                    title,
                    context,
                    subjectId,
                    creatorId,
                })
            } else if (lang_code == langList[2].code) {
                labaratory = await LabaratoryEN.create({
                    title,
                    context,
                    subjectId,
                    creatorId,
                })
            }

            res.status(200).json({
                isSuccess: true,
                data: labaratory,
                errorMessage: null,
            })

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
})

router.put("/update", async (req, res) => {
    try {
        let { lang_code } = req;
        let Labaratory_id = req.params.Labaratory_id;
        let labaratory = null;
        let { title, context, additionalInfo } = req.body;


        if (lang_code == langList[0].code) {
            labaratory = await LabaratoryUZ.findByIdAndUpdate(Labaratory_id, {
                title: title || undefined,
                context: context || undefined,
                additionalInfo: additionalInfo || undefined,
            })
        } else if (lang_code == langList[1].code) {
            labaratory = await LabaratoryRU.findByIdAndUpdate(Labaratory_id, {
                title: title || undefined,
                context: context || undefined,
                additionalInfo: additionalInfo || undefined,
            })
        } else if (lang_code == langList[2].code) {
            labaratory = await LabaratoryEN.findByIdAndUpdate(Labaratory_id, {
                title: title || undefined,
                context: context || undefined,
                additionalInfo: additionalInfo || undefined,
            })
        }

        res.status(200).json({
            isSuccess: true,
            data: labaratory,
            errorMessage: null,
        })




    } catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
})

router.delete("/delete", async (req, res) =>{
    try{

    }catch(error){
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            data: null,
            errorMessage: error,
        })
    }
})




module.exports = router;
