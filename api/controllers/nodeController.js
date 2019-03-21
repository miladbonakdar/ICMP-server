const nodeStatics = require("../statics/node_statics");
const NodeRepository = require("../../repositories/nodeRepository");
const response = require("../utils/response");
const csvConvertor = require("../../utils/csvConverter");
const check = require("../utils/checkApifunctions").check;
const NodeModel = require("../../models/nodeModel");

module.exports = {
    controllerName: "node",

    /** TODO: add description
     *
     */
    [nodeStatics.create.name]: check((req, res, next) => {
        const nodeRepo = new NodeRepository();
        let node = nodeRepo.addNode(req.body);
        response.success(res, node, "node created successfuly");
    }),

    /** TODO: add description
     *
     */
    [nodeStatics.getAll.name]: check((_, res) => {
        const nodeRepo = new NodeRepository();
        let nodes = nodeRepo.getNodes();
        response.success(res, nodes);
    }),

    /** TODO: add description
     *
     */
    [nodeStatics.update.name]: check((req, res) => {
        const nodeRepo = new NodeRepository();
        let node = nodeRepo.updateNode(req.body);
        response.success(res, node, "node updated successfuly");
    }),

    /** TODO: add description
     *
     */
    [nodeStatics.delete.name]: check((req, res) => {
        if (!req.params.id) response.badRequest(res, "id");
        const nodeRepo = new NodeRepository();
        nodeRepo.deleteNode(req.params.id);
        response.success(res, {}, "node deleted successfuly");
    }),

    /** TODO: add description
     *
     */
    [nodeStatics.get.name]: check((req, res) => {
        if (!req.params.id) response.badRequest(res, "id");
        const nodeRepo = new NodeRepository();
        let node = nodeRepo.getNodeById(req.params.id);
        response.success(res, node);
    }),

    /** TODO: add description
     *
     */
    [nodeStatics.getByIndex.name]: check((req, res) => {
        if (!req.params.index) response.badRequest(res, "index");
        const nodeRepo = new NodeRepository();
        let node = nodeRepo.getNodeByIndex(req.params.index);
        response.success(res, node);
    }),

    /** TODO: add description
     *
     */
    [nodeStatics.exportCsv.name]: check((req, res) => {
        //http://localhost:3000/api/v1/node/export/csv
        const nodeRepo = new NodeRepository();
        const nodes = nodeRepo.getNodes();
        if (nodes.length == 0) response.notFound(res);
        if (req.params.type.toLowerCase() == "csv") {
            const date = new Date();
            response.exportCsv(
                res,
                `nodes Export - ${date.getNowFileName()}`,
                new csvConvertor(nodes, NodeModel.prototype.csvExportHeader).convert()
            );
        } else response.badRequest(res, "type");
    })
};
