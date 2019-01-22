import * as types from "../types";

const state = {
    showLoading: false
};

const getters = {
    [types.SHOW_LOADING]: state => {
        return state.showLoading;
    }
};

const mutations = {
    [types.MUTATE_UPDATE_SHOW_LOADING]: (state, payload) => {
        state.showLoading = payload;
    }
};

const actions = {
    [types.UPDATE_SHOW_LOADING]: ({ commit }, payload) => {
        commit(types.MUTATE_UPDATE_SHOW_LOADING, payload);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};