const Joi = require("joi");

const validator = (schema) => (payload)=> schema.validate(payload, { abortEarly:false});

const labaratorySchema = Joi.object({
    title:Joi.string().min(3).required(),
    context:Joi.string().min(3).required(),
    subjectId:Joi.required()
}).unknown(true);


exports.validateLabaratory = validator(labaratorySchema)