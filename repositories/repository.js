module.exports = class Repository {
    /** TODO: add description
     *
     */
    constructor(db) {
        if (!db) throw new Error("db is not valid");
        this.db = db;
    }

    /** TODO: add description
     *
     */
    add(entityToAdd, validationFunction = this.checkModel) {
        try {
            if (!validationFunction(entityToAdd))
                throw new Error("your object is not valid");
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
            // FIXME: if the path is '/' and it throws error here we should save empty object on the database
            throw new Error("path is not valid");
        }
    }
};
