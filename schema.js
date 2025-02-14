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