<template>
  <div>
    <h2 class="text-bold">{{getTitle}}</h2>
    <hr>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="areaSelectGroup" label="Select Area:" label-for="areaSelect">
        <b-form-select
          :disabled="editMode"
          id="areaSelect"
          type="text"
          v-model="form.areaId"
          :options="areaOptions || []"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="nodeNameInputGroup" label="Node Name:" label-for="nodeNameInput">
        <b-form-input
          id="nodeNameInput"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter Node Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="nodeNameInputGroup" label="Host Name:" label-for="hostNameInput">
        <b-form-input
          id="hostNameInput"
          type="text"
          v-model="form.hostName"
          required
          placeholder="Enter Host Name"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button @click="onCancel" variant="outline-secondary">Cancel</b-button>
    </b-form>
  </div>
</template>

<script>
import routsName from "../routsName";
import { debug, debuglog } from "util";

export default {
  metaInfo: {
    title: "Edit Node - ICMP Server"
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
      this.$router.replace({ name: routsName.DASHBOARD });
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
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id !== "new") {
      this.editMode = true;
      this.$gate.node
        .get(id)
        .then(res => {
          this.form = res.data.data;
          this.setArea(this.form.areaId);
        })
        .catch(err => {});
    } else this.setArea();
  }
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
</style>