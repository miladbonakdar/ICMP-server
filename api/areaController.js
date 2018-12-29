const areaStatics = require("./statics/area_statics");
module.exports = {
    controllerName: "area",
    [areaStatics.create]: (req, res, next) => {},
    [areaStatics.getAll]: (req, res, next) => {},
    [areaStatics.update]: (req, res, next) => {},
    [areaStatics.delete]: (req, res, next) => {},
    [areaStatics.get]: (req, res, next) => {},
    [areaStatics.getByIndex]: (req, res, next) => {}
};
