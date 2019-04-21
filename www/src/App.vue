<template>
  <div>
    <app-header></app-header>
    <div id="container" class="container-fluid">
      <div class="row">
        <div id="app" class="col-sm-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
    <app-loading v-if="showLoading"></app-loading>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import * as types from "./store/types";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      setArea: types.SET_AREAS
    })
  },
  components: {
    appHeader: Header,
    appFooter: Footer
  },
  computed: {
    ...mapGetters({
      showLoading: types.SHOW_LOADING
    })
  }
};
</script>

<style scoped>
#app {
  float: none;
  margin: 10px auto;
}
#container {
  margin-bottom: 40px;
  margin-top: 25px;
}
</style>
