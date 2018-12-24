module.exports = class repository {
    constructor(db) {
        if (!db) throw "db is not valid";
        this.db = db;
    }
    add = (entityToAdd, validationFunction = checkModel) => {
        try {
            validationFunction(entityToAdd);
            this.db.push(entityToAdd.path, entityToAdd);
        } catch (exception) {
            throw exception;
        }
    };
    delete = path => {
        this.db.delete(path);
    };
    get = path => {
        try {
            return this.db.getData(path);
        } catch (error) {
            throw "path is not valid";
        }
    };
};
