const Area = require("./mongoModels/area.model");
module.exports = class AreaRepository {
    async getAreas() {
        return (await Area.find()) || [];
    }

    async saveAreas(areas) {
        for (const area of areas) {
            await area.save();
        }
    }

    async addArea(requestBody) {
        let newArea = new Area(requestBody);
        await newArea.save();
        return newArea;
    }

    async updateArea(requestBody) {
        let area = new Area(requestBody);
        await newArea.save();
        return newArea;
    }

    async deleteArea(id) {
        const area = await Area.findById(id);
        return await area.remove();
    }

    async getAreaById(id) {
        const area = await Area.findById(id);
        return area;
    }
};
