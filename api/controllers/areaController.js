const areaStatics = require("../statics/area_statics");
const AreaRepository = require("../../repositories/areaRepository");
const response = require("../utils/response");
const check = require("../utils/checkApifunctions").check;

module.exports = {
    controllerName: "area",

    /** TODO: add description
     *  FIXME: unitTest
     */
    [areaStatics.create]: check((req, res) => {
        const areaRepo = new AreaRepository();
        let area = areaRepo.addArea(req.body);
        response.success(res, area, "area created successfuly");
    }),

    /** TODO: add description
     *  
     */
    [areaStatics.getAll]: check((req, res) => {
        const areaRepo = new AreaRepository();
        let areas = areaRepo.getAreas();
        response.success(res, areas);
    }),

    /** TODO: add description
     *
     */
    [areaStatics.update]: check((req, res) => {
        const areaRepo = new AreaRepository();
        let area = areaRepo.updateArea(req.body);
        response.success(res, area, "area updated successfuly");
    }),

    /** TODO: add description
     *
     */
    [areaStatics.delete]: check((req, res) => {
        if (!req.params.id) response.badRequest(res, "id");
        const areaRepo = new AreaRepository();
        areaRepo.deleteArea(req.params.id);
        response.success(res, {}, "area deleted successfuly");
    }),

    /** TODO: add description
     *
     */
    [areaStatics.get]: check((req, res) => {
        if (!req.params.id) response.badRequest(res, "id");
        const areaRepo = new AreaRepository();
        let area = areaRepo.getAreaById(req.params.id);
        response.success(res, area);
    }),

    /** TODO: add description
     *
     */
    [areaStatics.getByIndex]: check((req, res) => {
        if (!req.params.index) response.badRequest(res, "index");
        const areaRepo = new AreaRepository();
        let area = areaRepo.getAreaByIndex(req.params.index);
        response.success(res, area);
    })
};
