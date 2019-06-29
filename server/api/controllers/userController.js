const userStatics = require('../statics/user_statics');
const UserRepository = require('../../repositories/userRepository');
const checkAsync = require('../utils/checkApifunctions').checkAsync;
const userAuth = require('../utils/userAuth');
const { userTypes } = require('../../utils/userAcessChecker');

module.exports = {
    controllerName: 'user',
    inject: (req, res, next) => {
        req.userRepository = new UserRepository();
        next();
    },

    [userStatics.create.name]: checkAsync(async (req, res) => {
        let user = await req.userRepository.create(req.body);
        res.success(user, 'user created successfuly');
    }),

    [userStatics.getAll.name]: checkAsync(async (req, res) => {
        let users = await req.userRepository.getAll();
        res.success(users);
    }),

    [userStatics.update.name]: checkAsync(async (req, res) => {
        let user = await req.userRepository.update(req.body);
        res.success(user, 'user updated successfuly');
    }),

    [userStatics.delete.name]: checkAsync(async (req, res) => {
        await req.userRepository.delete(req.params.id);
        res.success({}, 'user deleted successfuly');
    }),

    [userStatics.get.name]: checkAsync(async (req, res) => {
        let user = await req.userRepository.getById(req.params.id);
        res.success(user);
    }),

    [userStatics.login.name]: checkAsync(async (req, res) => {
        userAuth(req, res);
    }),

    [userStatics.getUserTypes.name]: checkAsync(async (req, res) => {
        res.success(userTypes(req.user));
    })
};
