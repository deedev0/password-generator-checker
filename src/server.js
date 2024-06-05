require('dotenv').config();
const Hapi = require('@hapi/hapi');
const generators = require('./api/generators');
const GeneratorsService = require('./services/inMemory/GeneratorsService');
const GeneratorsValidator = require('./validator/generators')

const ClientError = require('./exceptions/ClientError');

const init = async() => {
    const generatorsService = new GeneratorsService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: generators,
        options: {
            service: generatorsService,
            validator: GeneratorsValidator,
        },
    });

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;

        if (response instanceof ClientError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            });
            newResponse.code(response.statuCode);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server bejalan pada ${server.info.uri}`);
}

init();