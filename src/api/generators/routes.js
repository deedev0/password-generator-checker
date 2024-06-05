const routes = (handler) => [
    {
        method: 'POST',
        path: '/generates',
        handler: handler.postGenerateHandler,
    }
];

module.exports = routes;