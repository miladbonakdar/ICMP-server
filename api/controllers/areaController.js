const areaStatics = require("../statics/area_statics");
const AreaRepository = require("../../repositories/areaRepository");
const response = require("../utils/response");

module.exports = {
    controllerName: "area",

    [areaStatics.create]: (req, res) => {
        try {
            const areaRepo = new AreaRepository();
            let area = areaRepo.addArea(req.body);
            response.success(res, area, "area created successfuly");
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    [areaStatics.getAll]: (req, res) => {
        try {
            const areaRepo = new AreaRepository();
            let areas = areaRepo.getAreas();
            response.success(res, areas);
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    [areaStatics.update]: (req, res) => {
        try {
            const areaRepo = new AreaRepository();
            let area = areaRepo.updateArea(req.body);
            response.success(res, area, "area updated successfuly");
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    [areaStatics.delete]: (req, res) => {
        try {
            if (!req.params.id) response.badRequest(res, "id");
            const areaRepo = new AreaRepository();
            areaRepo.deleteArea(req.params.id);
            response.success(res, {}, "area deleted successfuly");
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    [areaStatics.get]: (req, res) => {
        try {
            if (!req.params.id) response.badRequest(res, "id");
            const areaRepo = new AreaRepository();
            let area = areaRepo.getAreaById(req.params.id);
            response.success(res, area);
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    [areaStatics.getByIndex]: (req, res) => {
        try {
            if (!req.params.index) response.badRequest(res, "index");
            const areaRepo = new AreaRepository();
            let area = areaRepo.getAreaByIndex(req.params.index);
            response.success(res, area);
        } catch (e) {
            response.internalServerError(res, e);
        }
    }
};
