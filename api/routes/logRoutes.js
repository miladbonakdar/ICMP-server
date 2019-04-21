const logController = require("../controllers/logController.js");
const baseUrl = require("../utils/baseRoutController");
const logStatics = require("../statics/log_statics");
const middlewareValidator = require("../utils/middlewareValidator");
const passportAuthonticator = require("../utils/passportAuthonticator");

const defaultMiddlewares = middlewareValidator(passportAuthonticator, logController.inject);

module.exports = router => {
    
    router
        .route(baseUrl(logController.controllerName, null, "date"))
        [logStatics.get.method](
            ...defaultMiddlewares,
            ...middlewareValidator(logStatics.get.validate, logController[logStatics.get.name])
        );

    router
        .route(baseUrl(logController.controllerName, logStatics.getCsvLog.name, "date"))
        [logStatics.getCsvLog.method](
            ...defaultMiddlewares,
            ...middlewareValidator(logStatics.getCsvLog.validate, logController[logStatics.getCsvLog.name])
        );
};
