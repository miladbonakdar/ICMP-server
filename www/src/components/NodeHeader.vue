<template>
  <div>
    <div class="row" style="margin-right: 12px">
      <div class="col">
        <div style="float: right;">
          <img
            v-if="access.modifyNode"
            @click.stop="editNode()"
            v-b-tooltip.hover
            title="Edit Node"
            src="../assets/edit.svg"
            class="icon"
          />
          <img
            v-if="access.modifyNode"
            @click.stop="showModal()"
            v-b-tooltip.hover
            title="Delete Node"
            src="../assets/delete.svg"
            class="icon"
          />
        </div>
      </div>
    </div>
    <b-modal
      id="deleteNodeModal"
      ref="modal"
      title="Delete Node"
      @ok="handleOk"
    >Are you sure you want to delete this node?</b-modal>
  </div>
</template>

<script>
import routesName from "../routesName";
import * as types from "../store/types";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AreaDetail",
  props: {
    node: {
      type: Object,
      required: true
    },
    area: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteNode: types.DELETE_NODE
    }),
    editNode() {
      this.$router.push({
        name: routesName.NODE,
        params: { id: this.node.id }
      });
    },
    handleOk(evt) {
      this.$gate.node
        .delete(this.node.id)
        .then(res => {
          console.log(res);
          let payload = { areaId: this.area.id, nodeId: this.node.id };
          this.deleteNode(payload);
          this.$toasted.success("Node deleted successfully", {
            duration: 5000
          });
        })
        .catch(error => {
          this.$toasted.error("Error in deleting node", {
            duration: 5000
          });
        });
    },
    showModal() {
      console.log("id: " + this.node.id);
      this.$refs.modal.show();
    }
  },
  computed: {
    ...mapGetters({
      access: types.ACCESS
    }),
    expandIconClass() {
      if (this.node.isExpand) return "oi oi-chevron-top";
      else return "oi oi-chevron-bottom";
    },
    expandIconTooltipTitle() {
      if (this.node.isExpand) return "Hide Node Detail";
      else return "Show Node Detail";
    },
    nodeStatus() {
      if (this.node.alive) return "Up";
      else return "Down";
    },
    nodeStatusVariant() {
      if (this.node.alive) return "success";
      else return "danger";
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
.node-status {
  font-weight: bold;
  margin-top: 7px;
  margin-bottom: 0;
  font-size: medium;
}

.status-badge {
  font-size: x-small;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 10px;
}

.icon {
  width: 15px;
  height: 15px;
  margin: 3px 5px 0;
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