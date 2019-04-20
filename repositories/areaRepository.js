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
        requestBody.updatedOn = new Date();
        await Area.update({_id  : requestBody.id}, {$set: requestBody}).exec();
        return requestBody;
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
