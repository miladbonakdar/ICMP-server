const areaStatics = require("./statics/area_statics");
module.exports = {
    controllerName: "area",
    [areaStatics.create]: (req, res, next) => {
        res.end(areaStatics.create);
    },
    [areaStatics.getAll]: (req, res, next) => {
        res.end(areaStatics.getAll);
    },
    [areaStatics.update]: (req, res, next) => {
        res.end(areaStatics.update);
    },
    [areaStatics.delete]: (req, res, next) => {
        res.end(areaStatics.delete);
    },
    [areaStatics.get]: (req, res, next) => {
        res.end(areaStatics.get);
    }
};