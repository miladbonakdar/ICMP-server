const areaRoute = require("./areaRoutes");
const nodeRoute = require("./nodeRoutes");
const settingRout = require("./settingRoutes");
const publicRout = require("./publicRoutes");
module.exports = app => {
    areaRoute(app);
    nodeRoute(app);
    settingRout(app);
    publicRout(app);
};
