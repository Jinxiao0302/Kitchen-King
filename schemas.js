const Joi = require('joi');
const { number } = require('joi');

module.exports.receipeSchema = Joi.object({
    receipe: Joi.object({
        name: Joi.string().required(),
        image: Joi.number().required(),
        steps: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        level:Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

