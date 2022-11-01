const Joi = require("joi");
const validator = (schema) => (payload) =>
schema.validate(payload, { abortEarly: false });

const teacherSchema  = Joi.object({
    firstName:Joi.string().min(3).required(),
    lastName:Joi.string().min(3).required(),
    midName:Joi.string().min(3).required(),
    position:Joi.string().min(3).required(),
    phone:Joi.string().min(3).required(),
    additionalInfo:Joi.string().min(10).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
}).unknown(true)


exports.validateTeacher = validator(teacherSchema);
