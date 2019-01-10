import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import {routes} from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Loading from "./components/Loading.vue";

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.component("app-loading", Loading);

const router = new VueRouter({
    routes
});

new Vue({
    el: "#app",
    router,
    render: h => h(App)
});
