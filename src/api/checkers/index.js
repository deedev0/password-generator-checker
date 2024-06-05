const CheckersHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'checkers',
    version: '1.0.0',
    register: async(server, {service, validator}) => {
        const checkersHandler = new CheckersHandler(service, validator);
        server.route(routes(checkersHandler));
    },
};