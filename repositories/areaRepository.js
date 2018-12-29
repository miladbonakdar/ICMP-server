const database = require("./db");
const repository = require("./repository");
const itemBase = require("./models/itemBase");
const _ = require("lodash");
module.exports = class areaRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    getAreas() {
        let baseItem = this.get("/");
        baseItem.areas = baseItem.areas || [];
        return baseItem.areas;
    }
    getConvertedAreas() {
        return this.get("/").areas;
    }
    saveAreas(areas) {
        let base = new itemBase({ areas: areas });
        this.add(base, areas => {
            if (!areas.path) return false;
            return true;
        });
    }
};
