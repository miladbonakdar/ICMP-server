<template>
  <div style="border-width: 0 ">
    <div class="row">
      <div class="col">
        <h4>{{area.name}}</h4>
      </div>
      <div class="col">
        <p class="server-down text-danger">Total Down : {{area.totalDown}}</p>
      </div>
      <div class="col">
        <p class="server-up text-success">Total Up : {{area.totalUp}}</p>
      </div>
      <div class="col">
        <div style="float: right">
          <img
          v-if="access.modifyArea"
            @click.stop="editArea()"
            class="icon"
            v-b-tooltip.hover
            title="Edit Area"
            src="../assets/edit.svg"
          >
          <img
          v-if="access.modifyArea"
            @click.stop="showModal()"
            class="icon"
            v-b-tooltip.hover
            title="Delete Area"
            src="../assets/delete.svg"
          >
          <span
            id="expand-icon"
            style="font-size: small;"
            v-b-tooltip.hover
            :title="expandIconTooltipTitle"
            :class="expandIconClass"
          ></span>
        </div>
      </div>
    </div>

    <b-modal
      id="deleteAreaModal"
      ref="modal"
      title="Delete Area"
      @ok="handleOk"
    >Are you sure you want to delete this area?</b-modal>
  </div>
</template>

<script>
import routsName from "../routsName";
import * as types from "../store/types";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AreaDetail",
  props: {
    area: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteArea: types.DELETE_AREA
    }),
    editArea() {
      this.$router.replace({
        name: routsName.AREA,
        params: { id: this.area.id }
      });
    },
    handleOk(evt) {
      this.$gate.area
        .delete(this.area.id)
        .then(res => {
          console.log(res);
          this.deleteArea(this.area.id);
          this.$toasted.global.success({
            message: "Area deleted successfully"
          });
        })
        .catch(error => {
          this.$toasted.global.error({
            message: "Error in deleting area"
          });
        });
    },
    showModal() {
      this.$refs.modal.show();
    }
  },
  computed: {
    ...mapGetters({
      access: types.ACCESS
    }),
    expandIconClass() {
      if (this.area.isExpand) return "oi oi-chevron-top";
      else return "oi oi-chevron-bottom";
    },
    expandIconTooltipTitle() {
      if (this.area.isExpand) return "Hide Area Detail";
      else return "Show Area Detail";
    }
  }
};
</script>

<style scoped>
.server-up {
  font-weight: bold;
  margin-top: 7px;
  margin-bottom: 0;
}

.server-down {
  font-weight: bold;
  margin-top: 7px;
  margin-bottom: 0;
}

.icon {
  width: 20px;
  height: 20px;
  margin: 7px 10px 0;
  cursor: pointer;
}

#expand-icon {
  top: 7px;
  margin-left: 10px;
  margin-bottom: 0;
  color: gray;
  cursor: pointer;
}
</style>