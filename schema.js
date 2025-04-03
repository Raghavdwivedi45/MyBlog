const Joi = require("joi");

module.exports.minorValidate = Joi.object({
    title: Joi.string().required(),
    img: Joi.string().required(),
    description: Joi.string().required(),
    tag: Joi.array().items(Joi.string())
})

module.exports.ratingValidate = Joi.object({
    author: Joi.object().required(),
})

module.exports.authorValidate = Joi.object({
    name: Joi.string().required(),
    img: Joi.object({
        url:  Joi.string().required(),
        filename: Joi.string().required()
    }),
    email: Joi.string().required(),
    dateOfBirth: Joi.string().required(),  
    typ: Joi.string().required()
})