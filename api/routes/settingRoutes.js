const settingController = require("../controllers/settingController");
const baseUrl = require("../utils/baseRoutController");
const settingStatics = require("../statics/setting_statics");
module.exports = router => {
    /** TODO: add description
     * update the
     */
    router
        .route(baseUrl(settingController.controllerName))
        .put(settingController[settingStatics.update]);

    /** TODO: add description
     * delete the setting and set it to default
     */
    router
        .route(baseUrl(settingController.controllerName))
        .delete(settingController[settingStatics.delete]);

    /** TODO: add description
     * get the setting
     */
    router
        .route(baseUrl(settingController.controllerName))
        .get(settingController[settingStatics.get]);
};
