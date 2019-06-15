import Vue from "vue";
import Vuex from "vuex";
import areas from "./modules/areas";
import logs from "./modules/logs";
import user from "./modules/user";
import statics from "./modules/statics";
import showLoading from "./modules/showLoading";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        areas,
        logs,
        showLoading,
        user,
        statics
    }
});
