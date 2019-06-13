const _ = require('lodash');
const Area = require('./mongoModels/area.model');
const Node = require('./mongoModels/node.model');
module.exports = class NodeRepository {
    async getNodes() {
        const areas = await Area.find();
        const nodes = _.spread(_.union)(areas.map(item => item.nodes || []));
        return nodes;
    }

    async addNode(requestBody) {
        const area = await Area.findById(requestBody.areaId);
        if (!area || !area.nodes) area.nodes = [];
        const node = new Node(requestBody);
        area.nodes.push(node);
        await area.save();
        return node;
    }

    async updateNode(requestBody) {
        const area = await Area.findById(requestBody.areaId);
        if (!area.nodes) return null;
        const node = new Node(requestBody);
        for (let i = 0; i < area.nodes.length; i++) {
            if (area.nodes[i].id.toString() === node.id.toString()) {
                area.nodes[i] = node;
                area.nodes[i].updatedOn = new Date();
                break;
            }
        }
        await area.save();
        return node;
    }

    async deleteNode(nodeId) {
        const area = await Area.findOne({ nodes: { $elemMatch: { id: nodeId } } });
        if (!area || !area.nodes) return null;
        const index = area.nodes.findIndex(n => n.id == nodeId);
        if (index < 0) return null;
        const node = area.nodes.splice(index, 1);
        await area.save();
        return node;
    }

    async getNodeById(nodeId) {
        const area = await Area.findOne({ nodes: { $elemMatch: { id: nodeId } } });
        if (!area || !area.nodes) return null;
        const index = area.nodes.findIndex(n => n.id == nodeId);
        if (index < 0) return null;
        const res = area.nodes[index];
        res.areaId = area.id;
        return res;
    }

    getNodeHeader() {
        return Node.exportHeader;
    }
};
