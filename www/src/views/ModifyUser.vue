<template>
  <div>
    <h3 class="text-bold">{{getTitle}}</h3>
    <hr />
    <b-form @submit="onSubmit">
      <div class="row">
        <div class="col col-6">
          <b-form-group id="nodeNameInputGroup" label="Name :" label-for="nodeNameInput">
            <b-form-input
              id="nodeNameInput"
              type="text"
              v-model="form.name"
              required
              placeholder="Enter First Name"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col col-6">
          <b-form-group id="lastnameInputGroup" label="Lastname :" label-for="lastnameInput">
            <b-form-input
              id="lastnameInput"
              type="text"
              v-model="form.lastname"
              required
              placeholder="Enter Lastname"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col col-6">
          <b-form-group id="usernameGroup" label="Username :" label-for="usernameInput">
            <b-form-input
              id="usernameInput"
              type="text"
              v-model="form.username"
              required
              placeholder="Enter Username"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col col-6">
          <b-form-group id="passwordInputGroup" label="Passw0rd :" label-for="passwordInput">
            <b-form-input
              id="passwordInput"
              type="password"
              v-model="form.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col col-6">
          <b-form-group id="areaSelectGroup" label="User Type:" label-for="userTypeSelected">
            <b-form-select
              :disabled="editMode"
              id="userTypeSelected"
              type="text"
              v-model="form.roll"
              :options="userTypeOptions || []"
              required
            ></b-form-select>
          </b-form-group>
        </div>

        <div class="col col-6">
          <b-form-group id="userEmail" label="Email :" label-for="userEmailInput">
            <b-form-input
              id="userEmailInput"
              type="email"
              v-model="form.email"
              required
              placeholder="Enter Email"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col col-4">
          <b-form-checkbox
            v-model="form.roll.access.dashboardPage"
            :disabled="ifAccessListDisabled"
            name="check-button"
            switch
          >Access Dashboard Page</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.settingPage"
            name="check-button"
            switch
          >Access Setting Page</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.logPage"
            name="check-button"
            switch
          >Access Log Page</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.userPage"
            name="check-button"
            switch
          >Access User Pages</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.modifyArea"
            name="check-button"
            switch
          >Access Area Management</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.modifyNode"
            name="check-button"
            switch
          >Access Node Management</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.modifyUser"
            name="check-button"
            switch
          >Access User Management</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.ping"
            name="check-button"
            switch
          >Access Ping Devices (command)</b-form-checkbox>
        </div>
        <div class="col col-4">
          <b-form-checkbox
            :disabled="ifAccessListDisabled"
            v-model="form.roll.access.export"
            name="check-button"
            switch
          >Access Export Data</b-form-checkbox>
        </div>
      </div>
      <b-row style="margin-top:20px;">
        <b-col cols="2">
          <b-button type="submit" block variant="primary">Submit</b-button>
        </b-col>
        <b-col cols="2" offset="8">
          <b-button @click="onCancel" block variant="outline-secondary">Cancel</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import routesName from "../routesName";
import { mapGetters } from "vuex";

export default {
  metaInfo: {
    title: "User - ICMP Server"
  },
  data() {
    return {
      userTypes: null,
      editMode: false,
      defaultCustom: {
        rollName: "custom",
        access: {
          dashboardPage: true,
          settingPage: false,
          logPage: false,
          userPage: false,
          modifyArea: false,
          modifyNode: false,
          modifyUser: false,
          ping: false,
          export: false
        }
      },
      form: {
        roll: {
          rollName: null,
          access: {
            dashboardPage: true,
            settingPage: true,
            logPage: true,
            userPage: true,
            modifyArea: true,
            modifyNode: true,
            modifyUser: true,
            ping: true,
            export: true
          }
        },
        name: null,
        lastname: null,
        email: null,
        username: null
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.editMode) {
        this.$gate.user
          .update(this.form)
          .then(res => {
            console.log(res);
            if (res.ok) {
              this.goToUser();
              this.$toasted.success("user updated successfully", {
                duration: 5000
              });
            } else
              this.$toasted.error("user updated successfully", {
                duration: 5000
              });
          })
          .catch(error => {
            this.$toasted.error("Error in updating user");
          });
      } else {
        this.$gate.user
          .create(this.form)
          .then(res => {
            console.log(res);
            if (res.ok) {
              this.goToUser();
              this.$toasted.success("User created successfully", {
                duration: 5000
              });
            } else
              this.$toasted.error("error in creating new user", {
                duration: 5000
              });
          })
          .catch(error => {
            this.$toasted.error("Error in creating user", {
              duration: 5000
            });
          });
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.goToUser();
    },
    goToUser() {
      this.$router.push({ name: routesName.USER_LIST });
    },
    setUserType(roll) {
      this.$gate.user.getUserTypes().then(res => {
        if (res.ok) {
          this.userTypes = res.data.data;
          if (!roll || (roll && roll.rollName !== "custom"))
            this.userTypes.push(this.defaultCustom);
          else if (roll) this.userTypes.push(roll);
          if (roll && roll.rollName) {
            this.userTypes.forEach(element => {
              if (element.rollName === roll.rollName) {
                this.form.roll = element;
              }
            });
          } else this.form.roll = this.userTypes[0];
        }
      });
    }
  },
  computed: {
    userTypeOptions() {
      let options = [];
      if (!this.userTypes) return null;
      for (let i = 0; i < this.userTypes.length; i++) {
        options.push({
          text: this.userTypes[i].rollName,
          value: this.userTypes[i]
        });
      }
      return options;
    },
    getTitle() {
      return this.editMode ? "Edit User" : "Add User";
    },
    ifAccessListDisabled() {
      return this.form.roll.rollName !== "custom";
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id !== "new") {
      this.editMode = true;
      this.$gate.user
        .get(id)
        .then(res => {
          if (res.ok) {
            this.form = res.body.data;
            this.setUserType(this.form.roll);
            this.form.password =
              "fakepassfakepassfakefuckingpassfakepassfuckoff";
          } else console.error(res);
        })
        .catch(err => {});
    } else this.setUserType();
  }
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
</style>