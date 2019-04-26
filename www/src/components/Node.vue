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

export default {
  metaInfo: {
    title: "Edit Node - ICMP Server"
  },
  data() {
    return {
      area: null,
      editMode: false,
      form: {
        areaId: null,
        name: null,
        hostName: null
      },
      show: true
    };
  },
  props: {
    areaId: {
      type: String
    }
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
            this.$toasted.global.success({
              message: "Node updated successfully"
            });
          })
          .catch(error => {
            this.$toasted.global.error({
              message: "Error in updating node"
            });
          });
      } else {
        this.$gate.node
          .create(this.form)
          .then(res => {
            console.log(res);
            this.goToDashboard();
            this.$toasted.global.success({
              message: "Node created successfully"
            });
          })
          .catch(error => {
            this.$toasted.global.error({
              message: "Error in creating node"
            });
          });
      }
    },
    onCancel(evt) {
      evt.preventDefault();
      this.goToDashboard();
    },
    goToDashboard() {
      this.$router.push({ name: routsName.DASHBOARD });
    }
  },
  computed: {
    areaOptions() {
      let options = [];
      if (!this.area) return null;
      for (let i = 0; i < this.area.length; i++) {
        options.push({
          text: this.area[i].name,
          value: this.area[i].id
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
    this.form.areaId = this.areaId;
    if (id !== "new") {
      this.editMode = true;
      this.$gate.node
        .get(this.areaId, id)
        .then(res => {
          console.log(res);
          this.form = res.data.data;
        })
        .catch(err => {});
    }
    this.$gate.area.getAll().then(res => {
      this.area = res.data.data;
      if (this.areaId) {
        this.area.forEach(element => {
          if (element.id === this.areaId) {
            this.form.parent = element.path;
          }
        });
      }
    });
  }
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
</style>