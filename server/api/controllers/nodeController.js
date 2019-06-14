const nodeStatics = require('../statics/node_statics');
const NodeRepository = require('../../repositories/nodeRepository');
const csvConverter = require('../../utils/csvConverter');
const checkAsync = require('../utils/checkApifunctions').checkAsync;

module.exports = {
    controllerName: 'node',
    inject: (req, res, next) => {
        req.nodeRepository = new NodeRepository();
        req.csvConverter = csvConverter;
        next();
    },

    [nodeStatics.create.name]: checkAsync(async (req, res, next) => {
        let node = await req.nodeRepository.addNode(req.body);
        res.success(node, 'node created successfuly');
    }),

    [nodeStatics.getAll.name]: checkAsync(async (req, res) => {
        let nodes = await req.nodeRepository.getNodes();
        res.success(nodes);
    }),

    [nodeStatics.update.name]: checkAsync(async (req, res) => {
        let node = await req.nodeRepository.updateNode(req.body);
        if (!node) res.notFound();
        res.success(node, 'node updated successfuly');
    }),

    [nodeStatics.delete.name]: checkAsync(async (req, res) => {
        await req.nodeRepository.deleteNode(req.params.id);
        res.success({}, 'node deleted successfuly');
    }),

    [nodeStatics.get.name]: checkAsync(async (req, res) => {
        let node = await req.nodeRepository.getNodeById(req.params.id);
        res.success(node);
    }),

    //http://localhost:3000/api/v1/node/export/csv
    [nodeStatics.exportCsv.name]: checkAsync(async (req, res) => {
        const nodes = await req.nodeRepository.getNodes();
        if (nodes.length == 0) res.notFound();
        if (req.params.type.toLowerCase() == 'csv') {
            const date = new Date();
            res.exportCsv(
                `nodes Export - ${date.getNowFileName()}`,
                new req.csvConverter(nodes, req.nodeRepository.getNodeHeader()).convert()
            );
        } else res.badRequest('type');
    })
};
