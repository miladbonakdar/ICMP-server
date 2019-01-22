const database = require("./db");
const Repository = require("./repository");
const ItemBase = require("../models/itemBase");
const AreaModel = require("../models/areaModel");
module.exports = class AreaRepository extends Repository {
    /** TODO: add description
     *
     */
    constructor(db = database.getMainDb()) {
        super(db);
    }

    /** TODO: add description
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

    /** TODO: add description
     *
     */
    getConvertedAreas() {
        return this.get("/").areas;
    }

    /** TODO: add description
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

    /** TODO: add description
     *
     */
    addArea(requestBody) {
        let baseItem = new ItemBase(this.get("/"));
        if (!baseItem.areas) {
            baseItem.areas = [];
            this.add(baseItem);
        }
        let newArea = new AreaModel(requestBody);
        newArea.parent = "/";
        newArea.path = `/areas[${baseItem.areas.length}]`;
        this.add(newArea);
        return newArea;
    }

    /** TODO: add description
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

    /** TODO: add description
     *
     */
    deleteArea(id) {
        let baseItem = this.get("/");
        let areaToDelete = baseItem.areas.filter(area => area.id == id)[0];
        if (!areaToDelete) throw "404 ,the areas is not valid to delete";
        this.db.delete(areaToDelete.path);
        return;
    }

    /** TODO: add description
     *
     */
    getAreaById(id) {
        let baseItem = this.get("/");
        let area = baseItem.areas.filter(area => area.id == id)[0];
        if (!area) throw "404 ,the areas was not found";
        return area;
    }

    /** TODO: add description
     *
     */
    getAreaByIndex(index) {
        let baseItem = this.get("/");
        if (!baseItem.areas[index]) throw "404 ,the areas was not found";
        return baseItem.areas[index];
    }
};
