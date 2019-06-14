const areaStatics = require('../statics/area_statics');
const AreaRepository = require('../../repositories/areaRepository');
const checkAsync = require('../utils/checkApifunctions').checkAsync;

module.exports = {
    controllerName: 'area',
    inject: (req, res, next) => {
        req.areaRepository = new AreaRepository();
        next();
    },

    [areaStatics.create.name]: checkAsync(async (req, res) => {
        let area = await req.areaRepository.create(req.body);
        res.success(area, 'area created successfuly');
    }),

    [areaStatics.getAll.name]: checkAsync(async (req, res) => {
        let areas = await req.areaRepository.getAll();
        res.success(areas);
    }),

    [areaStatics.update.name]: checkAsync(async (req, res) => {
        let area = await req.areaRepository.update(req.body);
        res.success(area, 'area updated successfuly');
    }),

    [areaStatics.delete.name]: checkAsync(async (req, res) => {
        await req.areaRepository.delete(req.params.id);
        res.success({}, 'area deleted successfuly');
    }),

    [areaStatics.get.name]: checkAsync(async (req, res) => {
        let area = await req.areaRepository.getById(req.params.id);
        res.success(area);
    })
};
