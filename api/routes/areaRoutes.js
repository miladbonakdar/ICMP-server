const areaController = require("../areaController");
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
        .route(baseUrl(areaController.controllerName, true))
        .delete(areaController[areaStatics.delete]);
    /**
     * get an area
     */
    router
        .route(baseUrl(areaController.controllerName, true))
        .get(areaController[areaStatics.get]);
};
