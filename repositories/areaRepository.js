const database = require("./db");
const repository = require("./repository");
const ItemBase = require("../models/itemBase");
const AreaModel = require("../models/areaModel");
module.exports = class areaRepository extends repository {
    constructor(db = database.getMainDb()) {
        super(db);
    }
    /**
     * 
     */
    getAreas() {
        let areas = this.redis.get(this.redis.statics.getAreasObjectKey);
        if (areas) return areas;
        let baseItem = this.get("/");
        baseItem.areas = baseItem.areas || [];
        this.updateRedis(baseItem.areas, this.redis.statics.getAreasObjectKey);
        return baseItem.areas;
    }
    /**
     * 
     */
    getConvertedAreas() {
        return this.get("/").areas;
    }
    /**
     * 
     */
    saveAreas(areas) {
        let base = new ItemBase({ areas: areas });
        this.add(base, areas => {
            if (!areas.path) return false;
            return true;
        });
        this.updateRedis(areas, this.redis.statics.getAreasObjectKey);
    }
    /**
     * 
     */
    addArea(requestBody) {
        let baseItem = this.get("/");
        let newArea = new AreaModel(requestBody);
        newArea.parent = "/";
        newArea.path = `/areas[${baseItem.areas.length + 1}]`;
        baseItem.areas.push(newArea);
        this.db.push(newArea.path, newArea);
        return newArea;
    }
    /**
     * 
     */
    updateArea(requestBody) {
        try {
            let newArea = new AreaModel(requestBody);
            this.get(newArea.path); //just to check if it is valid
            this.add(newArea);
            return newArea;
        } catch (error) {
            throw error;
        }
    }
    /**
     * 
     */
    deleteArea(id) {
        let baseItem = this.get("/");
        let areaToDelete = baseItem.areas.findIndex(area => area.id == id);
        if (areaToUpdate < 0) throw "404 ,the area is not valid to delete";
        this.db.delete(areaToDelete.path);
        return;
    }
    /**
     * 
     */
    getAreaById(id) {
        let baseItem = this.get("/");
        let area = baseItem.areas.filter(area => area.id == id)[0];
        if (!area) throw "404 ,the area was not found";
        return area;
    }
    /**
     * 
     */
    getAreaByIndex(index) {
        let baseItem = this.get("/");
        if (!baseItem.areas[index]) throw "404 ,the area was not found";
        return baseItem.areas[index];
    }
};
