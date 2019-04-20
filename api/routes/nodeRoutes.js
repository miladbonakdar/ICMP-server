const nodeController = require("../controllers/nodeController");
const baseUrl = require("../utils/baseRoutController");
const nodeStatics = require("../statics/node_statics");

const defaultMiddlewares = [nodeController.inject];

module.exports = router => {
    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.getAll.method](...defaultMiddlewares, nodeController[nodeStatics.getAll.name]);

    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.create.method](...defaultMiddlewares, nodeController[nodeStatics.create.name]);

    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.update.method](...defaultMiddlewares, nodeController[nodeStatics.update.name]);

    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        [nodeStatics.delete.method](...defaultMiddlewares, nodeController[nodeStatics.delete.name]);

    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        [nodeStatics.get.method](...defaultMiddlewares, nodeController[nodeStatics.get.name]);

    router
        .route(baseUrl(nodeController.controllerName, nodeStatics.exportCsv.name, "type"))
        [nodeStatics.exportCsv.method](...defaultMiddlewares, nodeController[nodeStatics.exportCsv.name]);
};
