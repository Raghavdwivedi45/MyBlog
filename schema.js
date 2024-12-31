const Joi = require("joi");

module.exports.minorValidate = Joi.object({
    title: Joi.string().required(),
    img: Joi.string().required(),
    description: Joi.string().required(),
})

module.exports.ratingValidate = Joi.object({
    stars: Joi.number().required().min(1).max(5),
    author: Joi.object().required(),
})