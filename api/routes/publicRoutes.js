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
                publicStatics.getExecutationTimes.name
            )
        )
        [publicStatics.getExecutationTimes.method](
            publicController[publicStatics.getExecutationTimes.name]
        );

    /** TODO: add description
     * delete the setting and set it to default
     */
    router
        .route(
            baseUrl(
                publicController.controllerName,
                publicStatics.getSiteInfo.name
            )
        )
        [publicStatics.getSiteInfo.method](
            publicController[publicStatics.getSiteInfo.name]
        );

    /** TODO: add description
     * get the setting
     */
    router
        .route(
            baseUrl(
                publicController.controllerName,
                publicStatics.pingNodes.name
            )
        )
        [publicStatics.pingNodes.method](
            publicController[publicStatics.pingNodes.name]
        );
};
