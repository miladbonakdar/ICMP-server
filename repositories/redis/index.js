const redis = require("redis");

let client = undefined;
let connected = false;

/** TODO: add description
 *
 */
const setRedisClientEvents = () => {
    client.on("ready", () => {
        connected = true;
        console.log("redis is ready now");
    });
    client.on("error", err => {
        connected = false;
        console.log("Error " + err);
    });
};

/** TODO: add description
 *
 */
const startRedisClient = () => {
    client = redis.createClient();
    setRedisClientEvents();
};

/** TODO: add description
 *
 */
const set = (key, data) => {
    if (!connected) return;
    client.set(key, JSON.stringify(data), redis.print);
};

/** TODO: add description
 *
 */
const get = key => {
    if (!connected) return undefined;
    client.get(key, (err, stringData) => {
        if (err) reject(err);
        resolve(JSON.parse(stringData));
    });
};

/** TODO: add description
 *
 */
const isConnected = () => {
    return connected;
};

/** TODO: add description
 *
 */
const stopRedisClient = () => {
    if (client) {
        client.quit();
        client = undefined;
        connected = false;
    }
};

/** TODO: add description
 *
 */
const statics = {
    settingObjectKey: "settingObjectKey",
    getAreasObjectKey: "getAreasObjectKey",
    getNodesObjectKey: "getNodesObjectKey"
};

module.exports = {
    startRedisClient,
    set,
    get,
    isConnected,
    stopRedisClient,
    statics
};
