import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import VueMoment from "vue-moment";
import App from "./App.vue";
import {routes} from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Loading from "./components/Loading.vue";
import {store} from "./store/store";
import VueCrud from "./vueCrud";
import CrudlyConfig from "./crudlyConfig";
import Toasted from "vue-toasted";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(VueMoment);
Vue.use(VueCrud, CrudlyConfig);
Vue.use(Toasted);

Vue.toasted.register("my_app_error", "Oops.. Something Went Wrong..", {
    type : "error",
    icon : "error_outline"
})

Vue.component("app-loading", Loading);

const router = new VueRouter({
    routes
});

new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
});
