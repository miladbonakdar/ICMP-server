const redis = require("redis");

let client = redis.createClient();
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
    if (!connected) throw "redis is not avalible";
    client.set(key, JSON.stringify(data), redis.print);
};

const getAsync = async key => {
    if (!connected) return undefined;
    return new Promise((resolve, reject) => {
        client.get(key, (err, stringData) => {
            if (err) reject(err);
            resolve(JSON.parse(stringData));
        });
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

module.exports = {
    startRedisClient,
    set,
    getAsync,
    isConnected,
    stopRedisClient
};
