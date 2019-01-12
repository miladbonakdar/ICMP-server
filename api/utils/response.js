const Response = require("../../models/responseModel");
let response = {};

/** TODO: add description
 *  FIXME: unitTest
 */
response.echo = function(res, message, data, success, status) {
    res.status(status);
    res.json(
        new Response({
            data: data,
            success: success,
            message: message,
            auth: res.auth
        })
    );
};

/** TODO: add description
 *  FIXME: unitTest
 */
response.success = function(
    res,
    data = {},
    message = "action successfully finished"
) {
    response.echo(res, message, data, true, 200);
};

/** TODO: add description
 *  FIXME: unitTest
 */
response.error = function(res, message = "somthing bad happend", status = 500) {
    response.echo(res, message, {}, false, status);
};

/** TODO: add description
 *  FIXME: unitTest
 */
response.notFound = function(res) {
    response.echo(res, "not found", {}, false, 404);
};

/** TODO: add description
 *  FIXME: unitTest
 */
response.badRequest = function(res, invalidParam = "") {
    response.echo(res, "bad request '" + invalidParam + "'", {}, false, 400);
};

/** TODO: add description
 *  FIXME: unitTest
 */
response.internalServerError = function(res, e) {
    response.echo(res, e.message, {}, false, 500);
};

module.exports = response;
