const logController = require('../controllers/logController');
const baseUrl = require('../utils/baseRoutController');
const logStatics = require('../statics/log_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = [passportAuthonticator, logController.inject];

module.exports = router => {
    router
        .route(baseUrl(logController.controllerName, null))
        [logStatics.get.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                logStatics.get.access,
                logStatics.get.validate,
                logController[logStatics.get.name]
            )
        );

    router
        .route(baseUrl(logController.controllerName, logStatics.getCsvLog.name))
        [logStatics.getCsvLog.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                logStatics.getCsvLog.access,
                logStatics.getCsvLog.validate,
                logController[logStatics.getCsvLog.name]
            )
        );
};
