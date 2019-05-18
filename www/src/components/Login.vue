<template>
  <div>
    <h2>Login</h2>
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
    onSubmit(evt) {
      this.$gate.user.login(this.form).then(res => {
        if (res.status == 200 && res.data.success) {
          // eslint-disable-next-line no-debugger
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
          localStorage.setItem("logedOn", JSON.stringify(new Date()));
          this.$router.push("dashboard");
        }
      });
    }
  },
  created: function() {
    let token = localStorage.getItem("token");
    if (token) this.$router.push("dashboard");

    this.$gate.public.info().then(res => {
      if (
        res.status == 200 &&
        res.data.success &&
        !res.data.data.loginEnabled
      ) {
        this.$router.push("dashboard");
      }
    });
  }
};
</script>

<style scoped>
</style>