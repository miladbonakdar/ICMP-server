const areaController = require('../controllers/areaController');
const baseUrl = require('../utils/baseRoutController');
const areaStatics = require('../statics/area_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = [passportAuthonticator, areaController.inject];

module.exports = router => {
    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.getAll.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                areaStatics.getAll.validate,
                areaController[areaStatics.getAll.name]
            )
        );

    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.create.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                areaStatics.create.validate,
                areaController[areaStatics.create.name]
            )
        );

    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.update.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                areaStatics.update.validate,
                areaController[areaStatics.update.name]
            )
        );

    router
        .route(baseUrl(areaController.controllerName, undefined, 'id'))
        [areaStatics.delete.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                areaStatics.delete.validate,
                areaController[areaStatics.delete.name]
            )
        );

    router
        .route(baseUrl(areaController.controllerName, undefined, 'id'))
        [areaStatics.get.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                areaStatics.get.validate,
                areaController[areaStatics.get.name]
            )
        );
};
