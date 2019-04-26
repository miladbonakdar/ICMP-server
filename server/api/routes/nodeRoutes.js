const nodeController = require('../controllers/nodeController');
const baseUrl = require('../utils/baseRoutController');
const nodeStatics = require('../statics/node_statics');
const middlewareValidator = require('../utils/middlewareValidator');
const passportAuthonticator = require('../utils/passportAuthonticator');

const defaultMiddlewares = [passportAuthonticator, nodeController.inject];

module.exports = router => {
    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.getAll.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                nodeStatics.getAll.validate,
                nodeController[nodeStatics.getAll.name]
            )
        );

    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.create.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                nodeStatics.create.validate,
                nodeController[nodeStatics.create.name]
            )
        );

    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.update.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                nodeStatics.update.validate,
                nodeController[nodeStatics.update.name]
            )
        );

    router
        .route(baseUrl(nodeController.controllerName, undefined, 'areaId/:id'))
        [nodeStatics.delete.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                nodeStatics.delete.validate,
                nodeController[nodeStatics.delete.name]
            )
        );

    router
        .route(baseUrl(nodeController.controllerName, undefined, 'areaId/:id'))
        [nodeStatics.get.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                nodeStatics.get.validate,
                nodeController[nodeStatics.get.name]
            )
        );

    router
        .route(baseUrl(nodeController.controllerName, nodeStatics.exportCsv.name, 'type'))
        [nodeStatics.exportCsv.method](
            ...middlewareValidator(
                ...defaultMiddlewares,
                nodeStatics.exportCsv.validate,
                nodeController[nodeStatics.exportCsv.name]
            )
        );
};
