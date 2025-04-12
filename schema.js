const Joi = require("joi");

module.exports.minorValidate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tag: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string())
    )
})

module.exports.ratingValidate = Joi.object({
    author: Joi.object().required(),
})

module.exports.authorValidate = Joi.object({
    name: Joi.string().required(),
    mail: Joi.string().required(),
    username: Joi.string().required(),  
    password: Joi.string().required(),  
    type: Joi.string().allow(''),  
    description: Joi.string().allow(''),  
    birthdate: Joi.string()  
})