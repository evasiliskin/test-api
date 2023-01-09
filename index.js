const http = require('http');
const routing = require('./src/shared/routing');
const routes = require('./src/routes');
const ActionResolver = require('./src/action.resolver');
const ErrorHandler = require('./src/shared/errors/handler');
const ResponseBuilder = require('./src/shared/response.builder');
const HttpStatusCodeResolver = require('./src/http-status-code.resolver');
const BodyResolver = require('./src/body.resolver');
const ModelBinder = require('./src/model.binder');
const config = require('dotenv').config().parsed;

process.on('unhandledRejection', (reason) => {
    // The error will be handled by the 'uncaughtException' handler.
    throw reason;
});

process.on('uncaughtException', (error) => {
    ErrorHandler.handle(error);
});

routing.add(routes);

const requestListener = async (request, response) => {
    let responseBody;
    let responseHttpStatusCode;
    let error;

    try {
        await ModelBinder.bind(request);
        const actionFn = ActionResolver.resolve(request);

        const { httpStatusCode, actionResult} = await actionFn(request.model);

        responseHttpStatusCode = httpStatusCode;

        responseBody = actionResult;
    } catch (err) {
        await ErrorHandler.handle(err);
        error = err;
    }

    responseHttpStatusCode = HttpStatusCodeResolver.resolve({
        error,
        responseHttpStatusCode,
    });

    responseBody = BodyResolver.resolve({
        responseBody,
        responseHttpStatusCode,
        error,
    });

    let bodySerialized = null;

    if (responseBody) {
        bodySerialized = JSON.stringify(responseBody)
    }

    const res = ResponseBuilder.build({
        response,
        responseHttpStatusCode,
        bodySerialized,
    });

    res.end(bodySerialized);
};

const server = http
    .createServer(requestListener)
    .listen(config.PORT);


module.exports = server;
