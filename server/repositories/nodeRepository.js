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
        if (!area.nodes) area.nodes = [];
        const node = new Node(requestBody);
        area.nodes.push(node);
        await area.save();
        return node;
    }

    async updateNode(requestBody) {
        const area = await Area.findById(requestBody.areaId);
        if (!area.nodes) return null;
        const node = new Node(requestBody);
        for (let n of area.nodes)
            if (n.id == node.id) {
                n = node;
                n.updatedOn = new Date();
                break;
            }
        await area.save();
        return node;
    }

    async deleteNode(areaId, nodeId) {
        const area = await Area.findById(areaId);
        if (!area.nodes) return null;
        const index = area.nodes.findIndex(n => n.id == nodeId);
        if (index < 0) return null;
        const node = area.nodes.splice(index, 1);
        await area.save();
        return node;
    }

    async getNodeById(areaId, nodeId) {
        const area = await Area.findById(areaId);
        if (!area.nodes) return null;
        const index = area.nodes.findIndex(n => n.id == nodeId);
        if (index < 0) return null;
        return area.nodes[index];
    }

    getNodeHeader() {
        return Node.exportHeader;
    }
};
