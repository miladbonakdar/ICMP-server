<template>
  <div>
    <h3 class="text-bold">{{getTitle}}</h3>
    <hr>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="exampleInputGroup1" label="Area Name:" label-for="areaNameInput">
        <b-form-input
          id="areaNameInput"
          type="text"
          v-model="form.name"
          required
          placeholder="Enter area name"
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
import routsName from "../routsName";

export default {
  metaInfo: {
    title: "Area - ICMP Server"
  },
  data() {
    return {
      editMode: false,
      form: {
        name
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.editMode) {
        this.$gate.area
          .update(this.form)
          .then(res => {
            this.goToDashboard();
            this.$toasted.success("Area updated successfully", {
              duration: 5000
            });
          })
          .catch(error => {
            this.$toasted.error("Error in updating area", {
              duration: 5000
            });
          });
      } else {
        this.$gate.area
          .create(this.form)
          .then(res => {
            this.goToDashboard();
            this.$toasted.success("Area created successfully", {
              duration: 5000
            });
          })
          .catch(error => {
            this.$toasted.error("Error in creating area", {
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
    }
  },
  computed: {
    getTitle() {
      if (this.editMode) {
        return "Edit Area";
      } else {
        return "Add Area";
      }
    }
  },
  created() {
    let id = this.$route.params.id;
    if (id !== "new") {
      this.editMode = true;
      this.$gate.area
        .get(id)
        .then(res => {
          console.log(res);
          this.form = res.data.data;
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}
</style>