const nodeStatics = require("../statics/node_statics");
const NodeRepository = require("../../repositories/nodeRepository");
const response = require("../utils/response");
const check = require("../utils/checkApifunctions").check;

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
    })
};
