const Response = require("../../models/responseModel");
let response = {};

response.echo = function(res, message, data, success, status) {
    res.status(status);
    res.send(
        new Response({
            data: data,
            success: success,
            message: message,
            auth: res.auth
        })
    );
};
response.success = function(
    res,
    data = {},
    message = "action successfully finished"
) {
    response.echo(res, message, data, true, 200);
};
response.error = function(res, message = "somthing bad happend", status = 500) {
    response.echo(res, message, {}, false, status);
};
response.notFound = function(res) {
    response.echo(res, "not found", {}, false, 404);
};
response.badRequest = function(res, invalidParam = "") {
    response.echo(res, "bad request '" + invalidParam + "'", {}, false, 400);
};
response.internalServerError = function(res, message) {
    response.echo(res, message, {}, false, 500);
};

module.exports = response;
