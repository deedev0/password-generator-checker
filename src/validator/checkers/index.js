const InvariantError = require('../../exceptions/InvariantError');
const { CheckPayloadSchema } = require('./schema');

const CheckersValidator = {
    validateCheckPayload: (payload) => {
        const validationResult = CheckPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = CheckersValidator;