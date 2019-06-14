const Response = require('../../models/responseModel');

function echo(message, data, success, status) {
    this.status(status);
    this.json(
        new Response({
            data: data,
            success: success,
            message: message,
            auth: this.auth
        })
    );
}

function success(data = {}, message = 'action successfully finished') {
    this.echo(message, data, true, 200);
}

function error(message = 'somthing bad happend', status = 500) {
    this.echo(message, {}, false, status);
}

function notFound() {
    this.echo('not found', {}, false, 404);
}

function accessDenied() {
    this.echo('access denied', {}, false, 403);
}

function badRequest(invalidParam = '') {
    this.echo('bad request \'' + invalidParam + '\'', {}, false, 400);
}

function unauthorized() {
    this.echo('user is unauthorized', {}, false, 401);
}

function internalServerError(e) {
    this.ret.echo(e.message || 'somthing bad happend', {}, false, 500);
}

function exportCsv(filename, content) {
    if (typeof content != 'string' || typeof filename != 'string') throw new Error('Data to export is not valid');
    this.setHeader('Content-Disposition', `attachment; filename=${filename}.csv`);
    this.setHeader('Content-Type', 'text/csv');
    this.send(content);
}

module.exports = function(_, res, next) {
    res.echo = echo;
    res.success = success;
    res.error = error;
    res.notFound = notFound;
    res.accessDenied = accessDenied;
    res.badRequest = badRequest;
    res.unauthorized = unauthorized;
    res.internalServerError = internalServerError;
    res.exportCsv = exportCsv;
    next();
};
