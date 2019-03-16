const logController = require("../controllers/logController.js");
const baseUrl = require("../utils/baseRoutController");
const logStatics = require("../statics/log_statics");
module.exports = router => {
    /** TODO: add description
     * get all areas
     */
    router
        .route(baseUrl(logController.controllerName, null, "date"))
        [logStatics.get.method](logController[logStatics.get.name]);

    /** TODO: add description
     * add an areas
     */
    router
        .route(
            baseUrl(logController.controllerName, logStatics.getLog.name, "date/:id")
        )
        [logStatics.getLog.method](logController[logStatics.getLog.name]);
};
