const areaController = require("../controllers/areaController");
const baseUrl = require("../utils/baseRoutController");
const areaStatics = require("../statics/area_statics");
module.exports = router => {
    /** TODO: add description
     * get all areas
     */
    router
        .route(baseUrl(areaController.controllerName))
        .get(areaController[areaStatics.getAll]);

    /** TODO: add description
     * add an area
     */
    router
        .route(baseUrl(areaController.controllerName))
        .post(areaController[areaStatics.create]);

    /** TODO: add description
     * update an area
     */
    router
        .route(baseUrl(areaController.controllerName))
        .put(areaController[areaStatics.update]);

    /** TODO: add description
     * delete an area
     */
    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        .delete(areaController[areaStatics.delete]);

    /** TODO: add description
     * get an area by item id
     */
    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        .get(areaController[areaStatics.get]);

    /** TODO: add description
     * get an area by item index
     */
    router
        .route(
            baseUrl(
                areaController.controllerName,
                areaStatics.getByIndex,
                "index"
            )
        )
        .get(areaController[areaStatics.getByIndex]);
};
