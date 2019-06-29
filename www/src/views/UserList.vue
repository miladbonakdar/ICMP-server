<template>
  <div>
    <h3 class="text-bold">Users List</h3>
    <hr>
    <b-table striped hover :items="users" :fields="fields">
      <template slot="fullName" slot-scope="row">{{row.item.name + " " + row.item.lastname}}</template>
      <template slot="rollName" slot-scope="row">{{row.item.roll.rollName}}</template>
      <template slot="access" slot-scope="row">
        <b-button
          size="sm"
          variant="info"
          @click="modalShow = !modalShow; selectedAccess = row.item.roll.access"
        >Show</b-button>
      </template>
      <template slot="actions" slot-scope="row">
        <div>
          <div class="row" style="max-heigth:30px">
            <div class="col">
              <div>
                <router-link
                  :to="{name: routesName.MODIFY_USER, params: {id: row.item.id}}"
                  active-class="active"
                  exact
                >
                  <a v-b-tooltip.hover title="Edit User">
                    <img src="../assets/edit.svg" class="icon">
                  </a>
                </router-link>

                <img
                  @click.stop="deleteUser(row.item.id)"
                  v-b-tooltip.hover
                  title="Delete User"
                  src="../assets/delete.svg"
                  class="icon"
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-table>
    <hr>
    <div class="row">
      <div class="col">
        <b-card header="Sys admin" title="Access">
          <pre>{{userTypes[0] || {} }}</pre>
        </b-card>
      </div>
      <div class="col">
        <b-card header="admin" title="Access">
          <pre>{{userTypes[1] || {} }}</pre>
        </b-card>
      </div>
      <div class="col">
        <b-card header="monitor" title="Access">
          <pre>{{userTypes[2] || {} }}</pre>
        </b-card>
      </div>
    </div>
    <b-modal v-model="modalShow" title="user access">
      <pre class="m-0">{{ selectedAccess }}</pre>
    </b-modal>
  </div>
</template>

<script>
import routesName from "../routesName";
import { mapGetters } from "vuex";

export default {
  metaInfo: {
    title: "Users List - ICMP Server"
  },
  data() {
    return {
      routesName,
      selectedAccess: {},
      modalShow: false,
      users: [],
      userTypes: [],
      fields: [
        {
          key: "username",
          label: "Username",
          sortable: true
        },
        {
          key: "fullName",
          label: "Fullname",
          sortable: true
        },
        { key: "email", label: "Email", sortable: true },
        {
          key: "rollName",
          label: "Roll type",
          sortable: true
        },
        {
          key: "access",
          label: "Access"
        },
        { key: "actions", label: "Actions", class: "text-center" }
      ]
    };
  },
  methods: {
    newUser() {},
    editUser(userId) {
      this.$router.replace({ path: `/user/modify/${userId}` });
    },
    deleteUser(userId) {
      console.log(userId);
    },
    goToDashboard() {
      this.$router.replace({ name: routesName.DASHBOARD });
    }
  },
  created() {
    this.$gate.user.getAll().then(res => {
      if (res.ok) {
        this.users = res.body.data;
      } else console.error(res);
    });
    this.$gate.user.getUserTypes().then(res => {
      if (res.ok) {
        this.userTypes = res.body.data;
      } else console.error(res);
    });
  }
};
</script>

<style scoped>
.icon {
  width: 18px;
  height: 18px;
  margin-top: 3px;
  margin-left: 5px;
  margin-bottom: 0;
  cursor: pointer;
}
</style>