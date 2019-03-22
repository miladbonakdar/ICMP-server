const logController = require("../controllers/logController.js");
const baseUrl = require("../utils/baseRoutController");
const logStatics = require("../statics/log_statics");
module.exports = router => {
    /** TODO: add description
     * http://localhost:3000/api/v1/log/2019-03-22
     * http://localhost:3000/api/v1/log/now
     */
    router
        .route(baseUrl(logController.controllerName, null, "date"))
        [logStatics.get.method](logController[logStatics.get.name]);

    /** TODO: add description
     * http://localhost:3000/api/v1/log/getLog/2019-03-22/cjtk1l8ww0002xsu4ftwv2p4q
     * http://localhost:3000/api/v1/log/getLog/now/cjtk1l8ww0002xsu4ftwv2p4q
     */
    router
        .route(baseUrl(logController.controllerName, logStatics.getLog.name, "date/:id"))
        [logStatics.getLog.method](logController[logStatics.getLog.name]);

    /** TODO: add description
     * http://localhost:3000/api/v1/log/getLog/2019-03-22/cjtk1l8ww0002xsu4ftwv2p4q
     * http://localhost:3000/api/v1/log/getLog/now/cjtk1l8ww0002xsu4ftwv2p4q
     */
    router
        .route(baseUrl(logController.controllerName, logStatics.getCsvLog.name, "date"))
        [logStatics.getCsvLog.method](logController[logStatics.getCsvLog.name]);
};
