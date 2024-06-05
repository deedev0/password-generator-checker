require('dotenv').config();
const Hapi = require('@hapi/hapi');

// generators plugin
const generators = require('./api/generators');
const GeneratorsService = require('./services/inMemory/GeneratorsService');
const GeneratorsValidator = require('./validator/generators')

// checkers plugin
const checkers = require('./api/checkers');
const CheckersService = require('./services/inMemory/CheckersService');
const CheckersValidator = require('./validator/checkers');

const ClientError = require('./exceptions/ClientError');

const init = async() => {
    const generatorsService = new GeneratorsService();
    const checkersService = new CheckersService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register([
        {
            plugin: generators,
            options: {
                service: generatorsService,
                validator: GeneratorsValidator,
            },
        },
        {
            plugin: checkers,
            options: {
                service: checkersService,
                validator: CheckersValidator,
            },
        },
    ]);

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