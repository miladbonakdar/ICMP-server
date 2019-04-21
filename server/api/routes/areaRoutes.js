const areaController = require('../controllers/areaController');
const baseUrl = require('../utils/baseRoutController');
const areaStatics = require('../statics/area_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = middlewareValidator(passportAuthonticator, areaController.inject);

module.exports = router => {
    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.getAll.method](
            ...defaultMiddlewares,
            ...middlewareValidator(areaStatics.getAll.validate, areaController[areaStatics.getAll.name])
        );

    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.create.method](
            ...defaultMiddlewares,
            ...middlewareValidator(areaStatics.create.validate, areaController[areaStatics.create.name])
        );

    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.update.method](
            ...defaultMiddlewares,
            ...middlewareValidator(areaStatics.update.validate, areaController[areaStatics.update.name])
        );

    router
        .route(baseUrl(areaController.controllerName, undefined, 'id'))
        [areaStatics.delete.method](
            ...defaultMiddlewares,
            ...middlewareValidator(areaStatics.delete.validate, areaController[areaStatics.delete.name])
        );

    router
        .route(baseUrl(areaController.controllerName, undefined, 'id'))
        [areaStatics.get.method](
            ...defaultMiddlewares,
            ...middlewareValidator(areaStatics.get.validate, areaController[areaStatics.get.name])
        );
};
