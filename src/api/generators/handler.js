class GeneratorsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postGenerateHandler = this.postGenerateHandler.bind(this);
    }

    async postGenerateHandler(request, h) {
        this._validator.validateGeneratePayload(request.payload);
        const { password_length, capital, uppercase, lowercase, numbers, symbols } = request.payload;

        const result = await this._service.generatePassword({
            password_length, capital, uppercase, lowercase, numbers, symbols
        });

        const response = h.response({
            status: 'success',
            message: 'Password berhasil digenerate',
            data: result
        });
        response.code(201);
        return response;
    }
}

module.exports = GeneratorsHandler;