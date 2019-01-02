const areaStatics = require("./statics/area_statics");
const AreaRepository = require("../repositories/areaRepository");

module.exports = {
    controllerName: "area",
    [areaStatics.create]: (req, res, next) => {
        try{
            console.log(req.body);
            const areaRepo = new AreaRepository();
            res.send(req.body);
        }catch (e){
            console.log(e);
        }
    },
    [areaStatics.getAll]: (req, res, next) => {},
    [areaStatics.update]: (req, res, next) => {},
    [areaStatics.delete]: (req, res, next) => {},
    [areaStatics.get]: (req, res, next) => {},
    [areaStatics.getByIndex]: (req, res, next) => {}
};
