const User = require('./mongoModels/user.model');
module.exports = class AreaRepository {
    async getAll() {
        return (await User.find()) || [];
    }

    async create(requestBody) {
        let user = new User(requestBody);
        await user.save();
        return user;
    }

    async update(userObj) {
        userObj.updatedOn = new Date();
        await User.update({_id  : userObj.id}, {$set: userObj}).exec();
        return userObj;
    }

    async delete(id) {
        const user = await User.findById(id);
        return await user.remove();
    }

    async getById(id) {
        const user = await User.findById(id);
        return user;
    }
};
