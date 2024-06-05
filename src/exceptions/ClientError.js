class ClientError extends Error {
    constructor(message, statuCode = 400) {
        super(message);
        this.statuCode = statuCode;
        this.name = 'ClientError';
    }
}

module.exports = ClientError;