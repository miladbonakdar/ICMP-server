<template>
  <div>
    <h3 class="text-bold">{{getTitle}}</h3>
    <hr>
    <b-form @submit="onSubmit" v-if="show">
      <b-row>
        <b-col>
          <b-form-group id="areaSelectGroup" label="Area:" label-for="areaSelect">
            <b-form-select
              :disabled="editMode"
              id="areaSelect"
              type="text"
              v-model="form.areaId"
              :options="areaOptions || []"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="deviceTypeSelectGroup" label="Device Type:" label-for="deviceType">
            <b-form-select
              id="deviceType"
              type="text"
              v-model="form.deviceType"
              :options="deviceTypes || []"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="deviceModelGroup" label="Device Model:" label-for="deviceModel">
            <b-form-select
              id="deviceModel"
              type="text"
              v-model="form.deviceModel"
              :options="deviceModels || []"
              required
            ></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group id="nodeNameInputGroup" label="Name:" label-for="nodeNameInput">
        <b-form-input
          id="nodeNameInput"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter Node Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="nodeNumber" label="number:" label-for="number">
        <b-form-input
          id="number"
          type="number"
          v-model="form.number"
          required
          placeholder="Enter Node number"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="nodeNameInputGroup" label="Ip address:" label-for="hostNameInput">
        <b-form-input
          id="hostNameInput"
          type="text"
          v-model="form.hostName"
          required
          placeholder="Enter Host Name"
        ></b-form-input>
      </b-form-group>
      <b-row>
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
      areas: null,
      editMode: false,
      form: {
        areaId: null,
        name: null,
        hostName: null
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.editMode) {
        this.$gate.node
          .update(this.form)
          .then(res => {
            console.log(res);
            this.goToDashboard();
            this.$toasted.success("Node updated successfully", {
              duration: 5000
            });
          })
          .catch(error => {
            this.$toasted.error("Error in updating node");
          });
      } else {
        this.$gate.node
          .create(this.form)
          .then(res => {
            console.log(res);
            this.goToDashboard();
            this.$toasted.success("Node created successfully", {
              duration: 5000
            });
          })
          .catch(error => {
            this.$toasted.error("Error in creating node", {
              duration: 5000
            });
          });
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.goToDashboard();
    },
    goToDashboard() {
      this.$router.replace({ name: routesName.DASHBOARD });
    },
    setArea(areaId) {
      this.$gate.area.getAll().then(res => {
        this.areas = res.data.data;
        if (areaId) {
          this.areas.forEach(element => {
            if (element.id === areaId) {
              this.form.areaId = element.id;
            }
          });
        } else this.form.areaId = this.areas[0] ? this.areas[0].id : null;
      });
    }
  },
  computed: {
    areaOptions() {
      let options = [];
      if (!this.areas) return null;
      for (let i = 0; i < this.areas.length; i++) {
        options.push({
          text: this.areas[i].name,
          value: this.areas[i].id
        });
      }
      return options;
    },
    getTitle() {
      if (this.editMode) {
        return "Edit Node";
      } else {
        return "Add Node";
      }
    },
    ...mapGetters({
      deviceTypes: "deviceTypes",
      deviceModels: "deviceModels"
    })
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
            this.setArea(this.form.areaId);
            console.log(res);
          } else console.err(res);
        })
        .catch(err => {});
    } else {
      this.setArea();
      this.form.deviceModel = this.deviceModels[0];
      this.form.deviceType = this.deviceTypes[0];
    }
  }
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
</style>