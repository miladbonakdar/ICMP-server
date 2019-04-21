const nodeController = require("../controllers/nodeController");
const baseUrl = require("../utils/baseRoutController");
const nodeStatics = require("../statics/node_statics");
const middlewareValidator = require("../utils/middlewareValidator");
const passportAuthonticator = require("../utils/passportAuthonticator");

const defaultMiddlewares = middlewareValidator(passportAuthonticator, nodeController.inject);

module.exports = router => {
    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.getAll.method](
            ...defaultMiddlewares,
            ...middlewareValidator(nodeStatics.getAll.validate, nodeController[nodeStatics.getAll.name])
        );

    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.create.method](
            ...defaultMiddlewares,
            ...middlewareValidator(nodeStatics.create.validate, nodeController[nodeStatics.create.name])
        );

    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.update.method](
            ...defaultMiddlewares,
            ...middlewareValidator(nodeStatics.update.validate, nodeController[nodeStatics.update.name])
        );

    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        [nodeStatics.delete.method](
            ...defaultMiddlewares,
            ...middlewareValidator(nodeStatics.delete.validate, nodeController[nodeStatics.delete.name])
        );

    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        [nodeStatics.get.method](
            ...defaultMiddlewares,
            ...middlewareValidator(nodeStatics.get.validate, nodeController[nodeStatics.get.name])
        );

    router
        .route(baseUrl(nodeController.controllerName, nodeStatics.exportCsv.name, "type"))
        [nodeStatics.exportCsv.method](
            ...defaultMiddlewares,
            ...middlewareValidator(nodeStatics.exportCsv.validate, nodeController[nodeStatics.exportCsv.name])
        );
};
