const areaRoute = require("./areaRoutes");
const nodeRoute = require("./nodeRoutes");
const settingRout = require("./settingRoutes");
module.exports = app => {
    areaRoute(app);
    nodeRoute(app);
    settingRout(app);
};
