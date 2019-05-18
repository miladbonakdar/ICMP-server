const User = require('./mongoModels/user.model');
const bcrypt = require('bcryptjs');
const sysAdminAccess = require('../utils/userAcessChecker').sysAdminAccess();
module.exports = class AreaRepository {
    async getAll() {
        return (await User.find().select('-password')) || [];
    }

    async create(requestBody) {
        requestBody.password = await bcrypt.hash(requestBody.password, await bcrypt.genSalt(4));
        let user = new User(requestBody);
        await user.save();
        return user;
    }

    async update(userObj) {
        userObj.updatedOn = new Date();
        await User.update({ _id: userObj.id }, { $set: userObj }).exec();
        return userObj;
    }

    async delete(id) {
        const user = await User.findById(id);
        return await user.remove();
    }

    async getById(id) {
        const user = await User.findById(id).select('-password');
        return user;
    }

    async ensureAdminExist() {
        const sysAdmin = await User.findOne({ 'roll.rollName': 'sysAdmin' });
        debugger;
        if (!sysAdmin)
            return await this.create({
                name: 'milad',
                lastname: 'bonakdar',
                username: 'miladbonak',
                password: 'Xx 123456',
                email: 'miladbonak@gmail.com',
                roll: sysAdminAccess,
                createdOn: new Date(),
                updatedOn: new Date()
            });
    }
};
