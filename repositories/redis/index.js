const redis = require("redis");

let client = undefined;
let connected = false;

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

const startRedisClient = () => {
    client = redis.createClient();
    setRedisClientEvents();
};

const set = (key, data) => {
    if (!connected) return;
    client.set(key, JSON.stringify(data), redis.print);
};

const get = key => {
    if (!connected) return undefined;
    client.get(key, (err, stringData) => {
        if (err) reject(err);
        resolve(JSON.parse(stringData));
    });
};

const isConnected = () => {
    return connected;
};

const stopRedisClient = () => {
    if (client) {
        client.quit();
        client = undefined;
        connected = false;
    }
};

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
