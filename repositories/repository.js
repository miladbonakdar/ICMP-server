const redisClient = require("./redis");

module.exports = class repository {
    /** TODO: add description
     *
     */
    constructor(db) {
        if (!db) throw "db is not valid";
        this.db = db;
        this.redis = redisClient;
    }
    /** TODO: add description
     *
     */
    updateRedis(object, key) {
        redisClient.set(key, object);
    }
    /** TODO: add description
     *
     */
    add(entityToAdd, validationFunction = this.checkModel) {
        try {
            if (!validationFunction(entityToAdd))
                throw "your object is not valid";
            this.db.push(entityToAdd.path, entityToAdd);
        } catch (exception) {
            throw exception;
        }
    }
    /** TODO: add description
     *
     */
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
    /** TODO: add description
     *
     */
    delete(path) {
        this.db.delete(path);
    }
    /** TODO: add description
     *
     */
    get(path) {
        try {
            return this.db.getData(path);
        } catch (error) {
            throw "path is not valid";
        }
    }
};
