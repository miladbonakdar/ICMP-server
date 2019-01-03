const settingController = require("../controllers/settingController");
const baseUrl = require("../utils/baseRoutController");
const settingStatics = require("../statics/setting_statics");
module.exports = router => {
    /**
     * update the
     */
    router
        .route(baseUrl(settingController.controllerName))
        .put(settingController[settingStatics.update]);
    /**
     * delete the setting and set it to default
     */
    router
        .route(baseUrl(settingController.controllerName))
        .delete(settingController[settingStatics.delete]);
    /**
     * get the setting
     */
    router
        .route(baseUrl(settingController.controllerName))
        .get(settingController[settingStatics.get]);
};
