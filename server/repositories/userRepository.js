const User = require('./mongoModels/user.model');
const bcrypt = require('bcryptjs');
const sysAdminAccess = require('../utils/userAcessChecker').sysAdminAccess();
const { sysAdminEmail, sysAdminPassword, sysAdminUsername } = require('../app.config').get();

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
        if (userObj.password && userObj.password.length <= 20)
            userObj.password = await bcrypt.hash(userObj.password, await bcrypt.genSalt(4));
        else delete userObj.password;
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
        if (!sysAdmin)
            return await this.create({
                name: 'milad',
                lastname: 'bonakdar',
                username: sysAdminUsername,
                password: sysAdminPassword,
                email: sysAdminEmail,
                roll: sysAdminAccess,
                createdOn: new Date(),
                updatedOn: new Date()
            });
    }
};
