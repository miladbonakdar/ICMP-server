const database = require("./db");
const repository = require("./repository");
const itemBase = require("./models/itemBase");
module.exports = class areaRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    getAreas() {
        let areas = this.redis.get(this.redis.statics.getAreasObjectKey);
        if (areas) return areas;
        let baseItem = this.get("/");
        baseItem.areas = baseItem.areas || [];
        this.updateRedis(baseItem.areas, this.redis.statics.getAreasObjectKey);
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
        this.updateRedis(areas, this.redis.statics.getAreasObjectKey);
    }
};
