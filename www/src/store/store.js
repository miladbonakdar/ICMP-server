import Vue from "vue";
import Vuex from "vuex";
import areas from "./modules/areas";
import showLoading from "./modules/showLoading";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        areas,
        showLoading
    }
});