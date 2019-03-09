const areaController = require("../controllers/areaController");
const baseUrl = require("../utils/baseRoutController");
const areaStatics = require("../statics/area_statics");
module.exports = router => {
    /** TODO: add description
     * get all areas
     */
    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.getAll.method](
            areaController[areaStatics.getAll.name]
        );

    /** TODO: add description
     * add an areas
     */
    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.create.method](
            areaController[areaStatics.create.name]
        );

    /** TODO: add description
     * update an areas
     */
    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.update.method](
            areaController[areaStatics.update.name]
        );

    /** TODO: add description
     * delete an areas
     */
    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        [areaStatics.delete.method](
            areaController[areaStatics.delete.name]
        );

    /** TODO: add description
     * get an areas by item id
     */
    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        [areaStatics.get.method](areaController[areaStatics.get.name]);

    /** TODO: add description
     * get an areas by item index
     */
    router
        .route(
            baseUrl(
                areaController.controllerName,
                areaStatics.getByIndex.name,
                "index"
            )
        )
        [areaStatics.getByIndex.method](
            areaController[areaStatics.getByIndex.name]
        );
};
