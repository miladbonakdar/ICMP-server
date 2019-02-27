const publicController = require("../controllers/publicController");
const baseUrl = require("../utils/baseRoutController");
const publicStatics = require("../statics/public_statics");
module.exports = router => {
    /** TODO: add description
     * update the
     */
    router
        .route(
            baseUrl(
                publicController.controllerName,
                publicStatics.getExecutationTimes
            )
        )
        .get(publicController[publicStatics.getExecutationTimes]);

    /** TODO: add description
     * delete the setting and set it to default
     */
    router
        .route(
            baseUrl(publicController.controllerName, publicStatics.getSiteInfo)
        )
        .get(publicController[publicStatics.getSiteInfo]);

    /** TODO: add description
     * get the setting
     */
    router
        .route(
            baseUrl(publicController.controllerName, publicStatics.pingNodes)
        )
        .post(publicController[publicStatics.pingNodes]);
};
