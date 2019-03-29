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
        let baseItem = this.get("/");
        baseItem.areas = baseItem.areas || [];
        return baseItem.areas;
    }

    /** TODO: add description
     *
     */
    getConvertedAreas() {
        return this.get("/").areas || [];
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
        requestBody.path = `/areas[${baseItem.areas.length}]`;
        let newArea = new AreaModel(requestBody);
        newArea.parent = "/";
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
        if (!areaToDelete) throw new Error("404 ,the area is not valid to delete");
        this.db.delete(areaToDelete.path);
        this.updateAllAreaPath();
        return;
    }

    updateAllAreaPath() {
        let baseItem = this.get("/");
        if (!baseItem.areas) return;
        for (let i = 0; i < baseItem.areas.length; i++) {
            const newPath = `/areas[${i}]`;
            baseItem.areas[i].path = newPath;
            if (!baseItem.areas[i].nodes) continue;
            for (let j = 0; j < baseItem.areas[i].nodes.length; j++) {
                const newNodePath = `/areas[${i}]/nodes[${j}]`;
                baseItem.areas[i].nodes[j].parent = newPath;
                baseItem.areas[i].nodes[j].path = newNodePath;
            }
        }
        this.db.push("/", baseItem);
    }

    /** TODO: add description
     *
     */
    getAreaById(id) {
        let baseItem = this.get("/");
        let area = baseItem.areas.filter(area => area.id == id)[0];
        if (!area) throw new Error("404 ,the area was not found");
        return area;
    }

    /** TODO: add description
     *
     */
    getAreaByIndex(index) {
        let baseItem = this.get("/");
        if (!baseItem.areas[index]) throw new Error("404 ,the area was not found");
        return baseItem.areas[index];
    }
};
