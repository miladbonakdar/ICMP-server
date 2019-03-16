const nodeController = require("../controllers/nodeController");
const baseUrl = require("../utils/baseRoutController");
const nodeStatics = require("../statics/node_statics");
module.exports = router => {
    /** TODO: add description
     * get all nodes
     */
    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.getAll.method](nodeController[nodeStatics.getAll.name]);

    /** TODO: add description
     * add an node
     */
    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.create.method](nodeController[nodeStatics.create.name]);

    /** TODO: add description
     * update an node
     */
    router
        .route(baseUrl(nodeController.controllerName))
        [nodeStatics.update.method](nodeController[nodeStatics.update.name]);

    /** TODO: add description
     * delete an node
     */
    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        [nodeStatics.delete.method](nodeController[nodeStatics.delete.name]);

    /** TODO: add description
     * get an node
     */
    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        [nodeStatics.get.method](nodeController[nodeStatics.get.name]);

    /** TODO: add description
     * get an areas by item index
     */
    router
        .route(
            baseUrl(
                nodeController.controllerName,
                nodeStatics.getByIndex.name,
                "index"
            )
        )
        [nodeStatics.getByIndex.method](
            nodeController[nodeStatics.getByIndex.name]
        );

    /** TODO: add description
     * get an node
     */
    router
        .route(
            baseUrl(
                nodeController.controllerName,
                nodeStatics.exportCsv.name,
                "type"
            )
        )
        [nodeStatics.exportCsv.method](
            nodeController[nodeStatics.exportCsv.name]
        );
};
