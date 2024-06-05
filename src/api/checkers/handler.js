class CheckersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postCheckHandler = this.postCheckHandler.bind(this);
    }

    async postCheckHandler(request, h) {
        this._validator.validateCheckPayload(request.payload);
        const { password } = request.payload;

        const result = await this._service.checkPassword({
            password
        });

        const response = h.response({
            status: 'success',
            message: 'Password berhasil dicheck',
            data: result
        });
        response.code(201);
        return response;
    }
}

module.exports = CheckersHandler;