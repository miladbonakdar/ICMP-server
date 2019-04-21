const Area = require("./mongoModels/area.model");
module.exports = class AreaRepository {
    async getAll() {
        return (await Area.find()) || [];
    }

    async updateAreas(areas) {
        for (const area of areas) {
            await area.save();
        }
    }

    async create(requestBody) {
        let newArea = new Area(requestBody);
        await newArea.save();
        return newArea;
    }

    async update(requestBody) {
        requestBody.updatedOn = new Date();
        await Area.update({_id  : requestBody.id}, {$set: requestBody}).exec();
        return requestBody;
    }

    async delete(id) {
        const area = await Area.findById(id);
        return await area.remove();
    }

    async getById(id) {
        const area = await Area.findById(id);
        return area;
    }
};
