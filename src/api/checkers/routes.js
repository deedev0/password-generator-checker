const routes = (handler) => [
    {
        method: 'POST',
        path: '/checkers',
        handler: handler.postCheckHandler,
    }
];

module.exports = routes;