import * as types from "../types";

const state = {
    user: null
};

const getters = {
    [types.USER]: state => {
        if(!state.user){
            const user = localStorage.getItem("user");
            if(!user) state.user = null ;
            state.user = JSON.parse(user);
        } 
        return state.user;
    },
    [types.ACCESS]: state => {
        if (state.user && state.user.id) {
            return state.user.roll.access;
        } else {
            return {
                dashboardPage: false,
                export: false,
                logPage: false,
                modifyArea: false,
                modifyNode: false,
                modifyUser: false,
                ping: false,
                settingPage: false,
                userPage: false
            };
        }
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
