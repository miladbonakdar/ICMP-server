const userStatics = require('../statics/user_statics');
const UserRepository = require('../../repositories/userRepository');
const response = require('../utils/response');
const checkAsync = require('../utils/checkApifunctions').checkAsync;
const userAuth = require('../utils/userAuth');

module.exports = {
    controllerName: 'user',
    inject: (req, res, next) => {
        req.userRepository = new UserRepository();
        next();
    },

    [userStatics.create.name]: checkAsync(async (req, res) => {
        let user = await req.userRepository.create(req.body);
        response.success(res, user, 'user created successfuly');
    }),

    [userStatics.getAll.name]: checkAsync(async (req, res) => {
        let users = await req.userRepository.getAll();
        response.success(res, users);
    }),

    [userStatics.update.name]: checkAsync(async (req, res) => {
        let user = await req.userRepository.update(req.body);
        response.success(res, user, 'user updated successfuly');
    }),

    [userStatics.delete.name]: checkAsync(async (req, res) => {
        await req.userRepository.delete(req.params.id);
        response.success(res, {}, 'user deleted successfuly');
    }),

    [userStatics.get.name]: checkAsync(async (req, res) => {
        let user = await req.userRepository.getById(req.params.id);
        response.success(res, user);
    }),

    [userStatics.login.name]: checkAsync(async (req, res) => {
        userAuth(req, res);
    })
};
