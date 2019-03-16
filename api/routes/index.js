const areaRoute = require("./areaRoutes");
const nodeRoute = require("./nodeRoutes");
const settingRoute = require("./settingRoutes");
const publicRoute = require("./publicRoutes");
const logRoute = require("./logRoutes");
module.exports = app => {
    areaRoute(app);
    nodeRoute(app);
    settingRoute(app);
    publicRoute(app);
    logRoute(app);
};
