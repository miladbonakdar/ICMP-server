import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import VueMoment from "vue-moment";
import App from "./App.vue";
import { routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Loading from "./components/Loading.vue";
import { store } from "./store/store";
import VueCrud from "./vueCrud";
import CrudlyConfig from "./crudlyConfig";
import Toasted from "vue-toasted";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(VueMoment);
Vue.use(VueCrud, CrudlyConfig);
Vue.use(Toasted);

Vue.component("app-loading", Loading);

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    window.currentRoute = to.name;
    window.lastRoute = from.name;
    next();
});

Vue.filter("highlight", function(words, query, color) {
    if(typeof words == "object")
        words = JSON.stringify(words);
    return words.replace(query, '<span class="highlighted" style="color:' + color + '">' + query + "</span>");
});

Vue.filter("test", function(words) {
    return words + "test";
});


new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
});
