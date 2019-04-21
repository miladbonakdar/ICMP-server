const Response = require("../../models/responseModel");
let response = {};

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

response.internalServerError = function(res, e) {
    response.echo(res, e.message || "somthing bad happend", {}, false, 500);
};

response.exportCsv = function(res, filename, content) {
    if (typeof content != "string" || typeof filename != "string")
        throw new Error("Data to export is not valid");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${filename}.csv`
    );
    res.setHeader("Content-Type", "text/csv");
    res.send(content);
};

module.exports = response;
