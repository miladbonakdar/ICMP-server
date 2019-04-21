const areaStatics = require("../statics/area_statics");
const AreaRepository = require("../../repositories/areaRepository");
const response = require("../utils/response");
const checkAsync = require("../utils/checkApifunctions").checkAsync;

module.exports = {
    controllerName: "area",
    inject: (req, res, next) => {
        req.areaRepository = new AreaRepository();
        next();
    },

    [areaStatics.create.name]: checkAsync(async (req, res) => {
        let area = await req.areaRepository.create(req.body);
        response.success(res, area, "area created successfuly");
    }),

    [areaStatics.getAll.name]: checkAsync(async (req, res) => {
        let areas = await req.areaRepository.getAll();
        response.success(res, areas);
    }),

    [areaStatics.update.name]: checkAsync(async (req, res) => {
        let area = await req.areaRepository.update(req.body);
        response.success(res, area, "area updated successfuly");
    }),

    [areaStatics.delete.name]: checkAsync(async (req, res) => {
        await req.areaRepository.delete(req.params.id);
        response.success(res, {}, "area deleted successfuly");
    }),

    [areaStatics.get.name]: checkAsync(async (req, res) => {
        let area = await req.areaRepository.getById(req.params.id);
        response.success(res, area);
    })
};
