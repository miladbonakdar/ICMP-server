<template>
  <div>
    <h3>Login</h3>
    <hr>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="usernameInputGroup" label="Your Username:" label-for="Username">
        <b-form-input
          id="usernameInput"
          type="text"
          v-model="form.username"
          required
          placeholder="Enter Username"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="PasswordInputGroup" label="Your Password:" label-for="Password">
        <b-form-input
          id="passwordInput"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter Password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import routsName from "../routsName";
import { mapActions } from "vuex";
import * as types from "../store/types";

export default {
  metaInfo: {
    title: "Login - ICMP Server"
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    ...mapActions({
      setUser: types.SET_USER
    }),
    onSubmit(evt) {
      this.$gate.user.login(this.form).then(res => {
        if (res.status == 200 && res.data.success) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          localStorage.setItem("logedOn", JSON.stringify(new Date()));
          localStorage.setItem("loginEnabled", true);
          this.setUser(res.data.data.user);
          this.$router.replace({ name: 'dashboard' });
        }
      });
    }
  },
  created: function() {
    let token = localStorage.getItem("token");
    if (token) this.$router.replace({ name: 'dashboard' });

    this.$gate.public.info().then(res => {
      if (
        res.status == 200 &&
        res.data.success &&
        !res.data.data.loginEnabled
      ) {
          localStorage.setItem("loginEnabled", false);
        this.$router.replace({ name: 'dashboard' });
      }
    });
  }
};
</script>

<style scoped>
</style>