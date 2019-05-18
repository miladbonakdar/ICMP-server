const areaRoute = require('./areaRoutes');
const nodeRoute = require('./nodeRoutes');
const settingRoute = require('./settingRoutes');
const publicRoute = require('./publicRoutes');
const logRoute = require('./logRoutes');
const userRoute = require('./userRoutes');
module.exports = app => {
    areaRoute(app);
    nodeRoute(app);
    settingRoute(app);
    publicRoute(app);
    logRoute(app);
    userRoute(app);
};
