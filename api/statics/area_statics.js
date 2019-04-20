const response = require("../utils/response");

module.exports = {
    create: {
        name: "create",
        method: "post"
    },
    update: {
        name: "update",
        method: "put",
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                response.badRequest(res, "id");
                valid = false;
            }
            if (valid) next();
        }
    },
    get: {
        name: "get",
        method: "get",
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                response.badRequest(res, "id");
                valid = false;
            }
            if (valid) next();
        }
    },
    delete: {
        name: "delete",
        method: "delete",
        validate: (req, res, next) => {
            let valid = true;
            if (!req.params.id) {
                response.badRequest(res, "id");
                valid = false;
            }
            if (valid) next();
        }
    },
    getAll: { name: "getAll", method: "get" }
};
