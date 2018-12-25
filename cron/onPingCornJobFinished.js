const ping = require("ping");
const areaRepository = require("../repositories/areaRepository");
const logRepository = require("../repositories/logRepository");
async function pingHost(hostName = "localhost") {
    try {
        let pingResponse = await ping.promise.probe(hostName);
        return pingResponse.alive;
    } catch (exception) {
        return false;
    }
}

function pingHosts(hostNames = ["localhost"]) {
    hostNames.array.forEach(async element => {
        await pingHost(element);
    });
}
async function pingNode(node) {
    node.alive = await pingHost(node.hostNmae);
}

async function pingNodes(nodes) {
    nodes.forEach(async item => {
        await pingNode(item.node);
    });
}

async function pingAreas(areas) {
    areas.forEach(async item => {
        await pingNodes(item.nodes);
    });
}

async function saveAreas(areas) {
    await areaRepository.saveAreas(areas);
}

module.exports = async () => {
    let areas = await areaRepository.getAreas();
    await pingAreas(areas);
    await saveAreas(areas);
    await logRepository.saveAreasLog(areas);
};
