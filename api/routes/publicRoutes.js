const publicController = require("../controllers/publicController");
const baseUrl = require("../utils/baseRoutController");
const publicStatics = require("../statics/public_statics");
const middlewareValidator = require("../utils/middlewareValidator");
const passportAuthonticator = require("../utils/passportAuthonticator");

const defaultMiddlewares = middlewareValidator(passportAuthonticator);

module.exports = router => {
    router
        .route(baseUrl(publicController.controllerName, publicStatics.getExecutationTimes.name))
        [publicStatics.getExecutationTimes.method](
            ...defaultMiddlewares,
            ...middlewareValidator(
                publicStatics.getExecutationTimes.validate,
                publicController[publicStatics.getExecutationTimes.name]
            )
        );

    router
        .route(baseUrl(publicController.controllerName, publicStatics.getSiteInfo.name))
        [publicStatics.getSiteInfo.method](
            ...defaultMiddlewares,
            ...middlewareValidator(publicStatics.getSiteInfo.validate, publicController[publicStatics.getSiteInfo.name])
        );

    router
        .route(baseUrl(publicController.controllerName, publicStatics.pingNodes.name))
        [publicStatics.pingNodes.method](
            ...defaultMiddlewares,
            ...middlewareValidator(publicStatics.pingNodes.validate, publicController[publicStatics.pingNodes.name])
        );
};
