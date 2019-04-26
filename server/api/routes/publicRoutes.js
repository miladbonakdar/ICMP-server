const publicController = require('../controllers/publicController');
const baseUrl = require('../utils/baseRoutController');
const publicStatics = require('../statics/public_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = [passportAuthonticator, publicController.inject];

module.exports = router => {
    router
        .route(baseUrl(publicController.controllerName, publicStatics.getExecutationTimes.name))
        [publicStatics.getExecutationTimes.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                publicStatics.getExecutationTimes.access,
                publicStatics.getExecutationTimes.validate,
                publicController[publicStatics.getExecutationTimes.name]
            )
        );

    router
        .route(baseUrl(publicController.controllerName, publicStatics.getSiteInfo.name))
        [publicStatics.getSiteInfo.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                publicStatics.getSiteInfo.access,
                publicStatics.getSiteInfo.validate,
                publicController[publicStatics.getSiteInfo.name]
            )
        );

    router
        .route(baseUrl(publicController.controllerName, publicStatics.pingNodes.name))
        [publicStatics.pingNodes.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                publicStatics.pingNodes.access,
                publicStatics.pingNodes.validate,
                publicController[publicStatics.pingNodes.name]
            )
        );
};
