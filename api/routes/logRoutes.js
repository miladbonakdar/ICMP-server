const logController = require("../controllers/logController.js");
const baseUrl = require("../utils/baseRoutController");
const logStatics = require("../statics/log_statics");
const middlewareValidator = require("../utils/middlewareValidator");

const defaultMiddlewares = [logController.inject];

module.exports = router => {
    /** TODO: add description
     * http://localhost:3000/api/v1/log/2019-03-22
     * http://localhost:3000/api/v1/log/now
     */
    router
        .route(baseUrl(logController.controllerName, null, "date"))
        [logStatics.get.method](
            ...defaultMiddlewares,
            ...middlewareValidator(logStatics.get.validate, logController[logStatics.get.name])
        );

    /** TODO: add description
     * http://localhost:3000/api/v1/log/getcsvlog/2019-03-22
     * http://localhost:3000/api/v1/log/getcsvlog/now
     */
    router
        .route(baseUrl(logController.controllerName, logStatics.getCsvLog.name, "date"))
        [logStatics.getCsvLog.method](
            ...defaultMiddlewares,
            ...middlewareValidator(logStatics.getCsvLog.validate, logController[logStatics.getCsvLog.name])
        );
};
