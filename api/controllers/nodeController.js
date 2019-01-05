const nodeStatics = require("../statics/node_statics");
const NodeRepository = require("../../repositories/nodeRepository");
const response = require("../utils/response");

module.exports = {
    controllerName: "node",

    /** TODO: add description
     *
     */
    [nodeStatics.create]: (req, res) => {
        try {
            const nodeRepo = new NodeRepository();
            let node = nodeRepo.addNode(req.body);
            response.success(res, node, "node created successfuly");
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    /** TODO: add description
     *
     */
    [nodeStatics.getAll]: (_, res) => {
        try {
            const nodeRepo = new NodeRepository();
            let nodes = nodeRepo.getNodes();
            response.success(res, nodes);
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    /** TODO: add description
     *
     */
    [nodeStatics.update]: (req, res) => {
        try {
            const nodeRepo = new NodeRepository();
            let node = nodeRepo.updateNode(req.body);
            response.success(res, node, "node updated successfuly");
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    /** TODO: add description
     *
     */
    [nodeStatics.delete]: (req, res) => {
        try {
            if (!req.params.id) response.badRequest(res, "id");
            const nodeRepo = new NodeRepository();
            nodeRepo.deleteNode(req.params.id);
            response.success(res, {}, "node deleted successfuly");
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    /** TODO: add description
     *
     */
    [nodeStatics.get]: (req, res) => {
        try {
            if (!req.params.id) response.badRequest(res, "id");
            const nodeRepo = new NodeRepository();
            let node = nodeRepo.getNodeById(req.params.id);
            response.success(res, node);
        } catch (e) {
            response.internalServerError(res, e);
        }
    },

    /** TODO: add description
     *
     */
    [nodeStatics.getByIndex]: (req, res) => {
        try {
            if (!req.params.index) response.badRequest(res, "index");
            const nodeRepo = new NodeRepository();
            let node = nodeRepo.getNodeByIndex(req.params.index);
            response.success(res, node);
        } catch (e) {
            response.internalServerError(res, e);
        }
    }
};
