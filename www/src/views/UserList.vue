<template>
  <div>
    <h3 class="text-bold">Users List</h3>
    <hr />
    <b-table striped hover :items="users" :fields="fields">
      <template v-slot:cell(fullName)="row">{{row.item.name + " " + row.item.lastname}}</template>
      <template v-slot:cell(rollName)="row">{{row.item.roll.rollName}}</template>
      <template v-slot:cell(access)="row">
        <b-button
          size="sm"
          variant="info"
          @click="modalShow = !modalShow; selectedAccess = row.item.roll.access"
        >Show</b-button>
      </template>
      <template  v-slot:cell(actions)="row">
        <div>
          <div class="row" style="max-heigth:30px">
            <div class="col">
              <div>
                <router-link
                  v-if="access.modifyUser"
                  :to="{name: routesName.MODIFY_USER, params: {id: row.item.id}}"
                  active-class="active"
                  exact
                >
                  <a v-b-tooltip.hover title="Edit User">
                    <img src="../assets/edit.svg" class="icon" />
                  </a>
                </router-link>

                <img
                  v-if="access.modifyUser"
                  @click.stop="selectedUserId =row.item.id;showModal();"
                  v-b-tooltip.hover
                  title="Delete User"
                  src="../assets/delete.svg"
                  class="icon"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-table>

    <router-link
      :to="{name: routesName.MODIFY_USER, params: {id: 'new'}}"
      active-class="active"
      exact
    >
      <b-button variant="success" size="sm" v-if="access.modifyUser">
        New User
        <span class="oi oi-plus plus-icon"></span>
      </b-button>
    </router-link>
    <hr />
    <div class="row">
      <div class="col">
        <b-card header="Sys Admin Access">
          <pre>{{userTypes[0] || {} }}</pre>
        </b-card>
      </div>
      <div class="col">
        <b-card header="Admin Access">
          <pre>{{userTypes[1] || {} }}</pre>
        </b-card>
      </div>
      <div class="col">
        <b-card header="Monitor Access">
          <pre>{{userTypes[2] || {} }}</pre>
        </b-card>
      </div>
    </div>
    <b-modal v-model="modalShow" title="user access">
      <pre class="m-0">{{ selectedAccess }}</pre>
    </b-modal>
    <b-modal
      id="deleteUserModal"
      ref="modal"
      title="Delete User"
      @ok="deleteUser"
    >Are you sure you want to delete this user?</b-modal>
  </div>
</template>

<script>
import routesName from "../routesName";
import * as types from "../store/types";
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
      selectedUserId: null,
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
    getUserList() {
      this.$gate.user.getAll().then(res => {
        if (res.ok) {
          this.users = res.body.data;
        } else console.error(res);
      });
    },
    goToUserPage() {
      this.$router.push({ path: `/user/modify/new` });
    },
    showModal() {
      this.$refs.modal.show();
    },
    deleteUser() {
      this.$gate.user.delete(this.selectedUserId).then(res => {
        if (res.ok) {
          this.$toasted.success("User deleted successfully", {
            duration: 5000
          });
          this.getUserList();
        } else
          this.$toasted.error(res.data.message, {
            duration: 5000
          });
      });
    },
    goToDashboard() {
      this.$router.push({ name: routesName.DASHBOARD });
    }
  },
  created() {
    this.getUserList();
    this.$gate.user.getUserTypes().then(res => {
      if (res.ok) {
        this.userTypes = res.body.data;
      } else console.error(res);
    });
  },
  computed: {
    ...mapGetters({
      access: types.ACCESS
    })
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