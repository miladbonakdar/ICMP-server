const areaController = require("../controllers/areaController");
const baseUrl = require("../utils/baseRoutController");
const areaStatics = require("../statics/area_statics");
module.exports = router => {
    /**
     * get all areas
     */
    router
        .route(baseUrl(areaController.controllerName))
        .get(areaController[areaStatics.getAll]);
    /**
     * add an area
     */
    router
        .route(baseUrl(areaController.controllerName))
        .post(areaController[areaStatics.create]);
    /**
     * update an area
     */
    router
        .route(baseUrl(areaController.controllerName))
        .put(areaController[areaStatics.update]);
    /**
     * delete an area
     */
    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        .delete(areaController[areaStatics.delete]);
    /**
     * get an area by item id
     */
    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        .get(areaController[areaStatics.get]);
    /**
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
