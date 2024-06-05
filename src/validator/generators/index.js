const InvariantError = require('../../exceptions/InvariantError');
const { GeneratePayloadSchema } = require('./schema');

const GeneratorsValidator = {
    validateGeneratePayload: (payload) => {
        const validationResult = GeneratePayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = GeneratorsValidator;