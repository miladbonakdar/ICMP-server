const settingController = require("../controllers/settingController");
const baseUrl = require("../utils/baseRoutController");
const settingStatics = require("../statics/setting_statics");
module.exports = router => {
    /** TODO: add description
     * update the
     */
    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.update.method](
            settingController[settingStatics.update.name]
        );

    /** TODO: add description
     * delete the setting and set it to default
     */
    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.delete.method](
            settingController[settingStatics.delete.name]
        );

    /** TODO: add description
     * get the setting
     */
    router
        .route(baseUrl(settingController.controllerName))
        [settingStatics.get.method](settingController[settingStatics.get.name]);
};
