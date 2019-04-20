const areaController = require("../controllers/areaController");
const baseUrl = require("../utils/baseRoutController");
const areaStatics = require("../statics/area_statics");

const defaultMiddlewares = [areaController.inject];

module.exports = router => {
    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.getAll.method](...defaultMiddlewares, areaController[areaStatics.getAll.name]);

    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.create.method](...defaultMiddlewares, areaController[areaStatics.create.name]);

    router
        .route(baseUrl(areaController.controllerName))
        [areaStatics.update.method](...defaultMiddlewares, areaController[areaStatics.update.name]);

    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        [areaStatics.delete.method](...defaultMiddlewares, areaController[areaStatics.delete.name]);

    router
        .route(baseUrl(areaController.controllerName, undefined, "id"))
        [areaStatics.get.method](...defaultMiddlewares, areaController[areaStatics.get.name]);
};
