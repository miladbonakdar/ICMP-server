<template>
  <div>
    <b-navbar toggleable="md" type="dark" class="header">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <img id="logo" v-b-tooltip.hover title="Edit Node" src="../assets/ping-pong.svg">
      <b-navbar-brand href="#" class="text-bold">ICMP SERVER</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse" v-if="$route.name != 'login'">
        <b-navbar-nav style="margin-left: 30px">
          <b-nav-item>
            <router-link :to="{name: routsName.DASHBOARD}" active-class="active" exact>
              <a>Dashboard</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{name: routsName.AREA, params: {id: 'new'}}" active-class="active">
              <a>Area</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              :to="{name: routsName.NODE, params: {id: 'new'}}"
              active-class="active"
              exact
            >
              <a>Node</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{name: routsName.LOG}" active-class="active" exact>
              <a>Log</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link :to="{name: routsName.SETTING}" active-class="active" exact>
              <a>Setting</a>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <a @click="logOut" id="exit">Exit</a>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import routsName from "../routsName";
export default {
  name: "Header",
  data() {
    return {
      routsName
    };
  },
  methods: {
    loadLinks() {
      this.show = window.currentRoute != "login";
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("logedOn");
      this.$router.push("login");
    }
  }
};
</script>

<style scoped>
.router-link-exact-active {
  color: white;
  cursor: pointer;
  text-decoration: none;
}
a,
#exit {
  color: rgba(211, 211, 211, 0.61);
  text-decoration: none;
}
a:hover,
#exit:hover {
  color: white;
  text-decoration: none;
  font-weight: 600;
}
.header {
  background-color: #01a3a4;
  /*background-color: #e66767;*/
}

.text-bold {
  font-weight: 600;
}

#logo {
  height: 27px;
  margin-right: 12px;
}
</style>