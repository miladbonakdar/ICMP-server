const nodeStatics = require("../statics/node_statics");
const NodeRepository = require("../../repositories/nodeRepository");
const response = require("../utils/response");
const csvConverter = require("../../utils/csvConverter");
const checkAsync = require("../utils/checkApifunctions").checkAsync;

module.exports = {
    controllerName: "node",
    inject: (req, res, next) => {
        req.nodeRepository = new NodeRepository();
        next();
    },

    [nodeStatics.create.name]: checkAsync(async (req, res, next) => {
        let node = req.nodeRepository.addNode(req.body);
        response.success(res, node, "node created successfuly");
    }),

    [nodeStatics.getAll.name]: checkAsync(async (req, res) => {
        let nodes = req.nodeRepository.getNodes();
        response.success(res, nodes);
    }),

    [nodeStatics.update.name]: checkAsync(async (req, res) => {
        let node = req.nodeRepository.updateNode(req.body);
        if (!node) response.notFound(res);
        response.success(res, node, "node updated successfuly");
    }),

    [nodeStatics.delete.name]: checkAsync(async (req, res) => {
        req.nodeRepository.deleteNode(req.params.areaId, req.params.id);
        response.success(res, {}, "node deleted successfuly");
    }),

    [nodeStatics.get.name]: checkAsync(async (req, res) => {
        let node = req.nodeRepository.getNodeById(req.params.areaId, req.params.id);
        response.success(res, node);
    }),

    //http://localhost:3000/api/v1/node/export/csv
    [nodeStatics.exportCsv.name]: checkAsync(async (req, res) => {
        const nodes = req.nodeRepository.getNodes();
        if (nodes.length == 0) response.notFound(res);
        if (req.params.type.toLowerCase() == "csv") {
            const date = new Date();
            response.exportCsv(
                res,
                `nodes Export - ${date.getNowFileName()}`,
                new csvConverter(nodes, null /*NodeModel.prototype.csvExportHeader */).convert()
            );
        } else response.badRequest(res, "type");
    })
};
