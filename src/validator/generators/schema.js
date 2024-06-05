const Joi = require('joi');

const GeneratePayloadSchema = Joi.object({
    password_length: Joi.number().integer().min(1).max(64).required(),
    capital: Joi.boolean(),
    lowercase: Joi.boolean(),
    uppercase: Joi.boolean(),
    numbers: Joi.boolean(),
    symbols: Joi.boolean(),
});

module.exports = { GeneratePayloadSchema };