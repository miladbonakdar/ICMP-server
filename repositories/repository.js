module.exports = class repository {
    constructor(db) {
        if (!db) throw "db is not valid";
        this.db = db;
    }
    add(entityToAdd, validationFunction = this.checkModel) {
        try {
            validationFunction(entityToAdd);
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
            !entityToAdd.createdOn
        )
            throw "entity is not valid for add";
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
