const areaRoute = require('./areaRoutes');
const nodeRoute = require('./nodeRoutes');
module.exports = (app) =>{
    areaRoute(app);
    nodeRoute(app);
}