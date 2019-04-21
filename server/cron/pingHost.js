const ping = require('ping');

module.exports = async hostName => {
    try {
        let pingResponse = await ping.promise.probe(hostName);
        return pingResponse.alive;
    } catch (exception) {
        return false;
    }
};
