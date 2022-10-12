const Joi = require("joi");
const validator = (schema) => (payload) =>
schema.validate(payload, { abortEarly: false });

const subjectSchema  = Joi.object({
    name:Joi.string().min(3).required(),
}).unknown(true)


exports.validateSubject = validator(subjectSchema);
