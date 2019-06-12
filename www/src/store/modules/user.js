import * as types from "../types";

const state = {
    user: null,
    loginEnabled: false
};

const setLoginEnabled = state => {
    state.loginEnabled = localStorage.getItem("loginEnabled") == "true";
};

const minAccess = {
    dashboardPage: true,
    export: false,
    logPage: false,
    modifyArea: false,
    modifyNode: false,
    modifyUser: false,
    ping: false,
    settingPage: false,
    userPage: false
};

const maxAccess = {
    dashboardPage: true,
    export: true,
    logPage: true,
    modifyArea: true,
    modifyNode: true,
    modifyUser: true,
    ping: true,
    settingPage: true,
    userPage: true
};

const fakeUser = {
    roll: {
        access: maxAccess
    }
};

const getters = {
    [types.USER]: state => {
        if (!state.user) {
            setLoginEnabled(state);
            if (state.loginEnabled === false) return fakeUser;
            const user = localStorage.getItem("user");
            if (!user) state.user = null;
            state.user = JSON.parse(user);
        }
        return state.user;
    },
    [types.ACCESS]: state => {
        if (state.loginEnabled === false) return maxAccess;
        if (state.user && state.user.id) return state.user.roll.access;
        else return minAccess;
    }
};

const mutations = {
    [types.MUTATE_SET_USER]: (state, _user) => {
        state.user = _user;
    }
};

const actions = {
    [types.SET_USER]: ({ commit }, user) => {
        commit(types.MUTATE_SET_USER, user);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
