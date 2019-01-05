const ping = require("ping");
const areaRepository = new (require("../repositories/areaRepository"))();
const logRepository = require("../repositories/logRepository");

/** TODO: add description
 *
 */
const pingHost = async (hostName = "localhost") => {
    try {
        let pingResponse = await ping.promise.probe(hostName);
        return pingResponse.alive;
    } catch (exception) {
        return false;
    }
};

/** TODO: add description
 *
 */
const pingNode = async node => {
    node.alive = await pingHost(node.hostNmae);
};

/** TODO: add description
 *
 */
const pingNodes = async nodes => {
    nodes.forEach(async item => {
        await pingNode(item.node);
    });
};

/** TODO: add description
 *
 */
const pingAreas = async areas => {
    areas.forEach(async item => {
        await pingNodes(item.nodes);
    });
};

/** TODO: add description
 *
 */
const pingHosts = async () => {
    let areas = await areaRepository.getConvertedAreas();
    await pingAreas(areas);
    await areaRepository.saveAreas(areas);
    await logRepository.saveAreasLog(areas);
};

module.exports = pingHosts;
