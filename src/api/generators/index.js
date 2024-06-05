const GeneratorsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'generators',
    version: '1.0.0',
    register: async(server, {service, validator}) => {
        const generatorsHandler = new GeneratorsHandler(service, validator);
        server.route(routes(generatorsHandler));
    },
};