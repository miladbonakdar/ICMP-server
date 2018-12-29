const ping = require("ping");
const areaRepository = new (require("../repositories/areaRepository"))();
const logRepository = require("../repositories/logRepository");
const pingHost = async (hostName = "localhost") => {
    try {
        let pingResponse = await ping.promise.probe(hostName);
        return pingResponse.alive;
    } catch (exception) {
        return false;
    }
};

const pingNode = async node => {
    node.alive = await pingHost(node.hostNmae);
};

const pingNodes = async nodes => {
    nodes.forEach(async item => {
        await pingNode(item.node);
    });
};

const pingAreas = async areas => {
    areas.forEach(async item => {
        await pingNodes(item.nodes);
    });
};

module.exports = async () => {
    let areas = await areaRepository.getConvertedAreas();
    await pingAreas(areas);
    await areaRepository.saveAreas(areas);
    await logRepository.saveAreasLog(areas);
};
