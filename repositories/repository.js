const redisClient = require("./redis");

module.exports = class repository {
    constructor(db) {
        if (!db) throw "db is not valid";
        this.db = db;
        this.redis = redisClient;
    }
    updateRedis(object, key) {
        redisClient.set(key, object);
    }
    add(entityToAdd, validationFunction = this.checkModel) {
        try {
            if (!validationFunction(entityToAdd))
                throw "your object is not valid";
            this.db.push(entityToAdd.path, entityToAdd);
        } catch (exception) {
            throw exception;
        }
    }
    checkModel(entityToAdd) {
        if (
            !entityToAdd ||
            !entityToAdd.id ||
            !entityToAdd.path ||
            !entityToAdd.parent ||
            !entityToAdd.createdOn
        )
            return false;
        return true;
    }
    delete(path) {
        this.db.delete(path);
    }
    get(path) {
        try {
            return this.db.getData(path);
        } catch (error) {
            throw "path is not valid";
        }
    }
};
