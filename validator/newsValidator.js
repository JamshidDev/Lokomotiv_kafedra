const Joi = require("joi");

const validator = (schema) => (payload)=> schema.validate(payload, { abortEarly:false});

const newsSchema = Joi.object({
    title:Joi.string().min(3).required(),
    text:Joi.string().min(3).required(),
}).unknown(true);


exports.validateNews = validator(newsSchema)