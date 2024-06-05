const Joi = require('joi');

const CheckPayloadSchema = Joi.object({
    password: Joi.string().max(64).required(),
});

module.exports = { CheckPayloadSchema };