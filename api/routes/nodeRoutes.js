const nodeController = require("../controllers/nodeController");
const baseUrl = require("../utils/baseRoutController");
const nodeStatics = require("../statics/node_statics");
module.exports = router => {
    /** TODO: add description
     * get all nodes
     */
    router
        .route(baseUrl(nodeController.controllerName))
        .get(nodeController[nodeStatics.getAll]);

    /** TODO: add description
     * add an node
     */
    router
        .route(baseUrl(nodeController.controllerName))
        .post(nodeController[nodeStatics.create]);

    /** TODO: add description
     * update an node
     */
    router
        .route(baseUrl(nodeController.controllerName))
        .put(nodeController[nodeStatics.update]);

    /** TODO: add description
     * delete an node
     */
    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        .delete(nodeController[nodeStatics.delete]);

    /** TODO: add description
     * get an node
     */
    router
        .route(baseUrl(nodeController.controllerName, undefined, "id"))
        .get(nodeController[nodeStatics.get]);

    /** TODO: add description
     * get an area by item index
     */
    router
        .route(
            baseUrl(
                nodeController.controllerName,
                nodeStatics.getByIndex,
                "index"
            )
        )
        .get(nodeController[nodeStatics.getByIndex]);
};
