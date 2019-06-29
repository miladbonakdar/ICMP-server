<template>
  <div>
    <div class="row" style="margin-right: 12px">
      <div class="col">
        <h4>{{nodeLog.nodeName}}</h4>
      </div>
      <p class="col node-status">
        Status :
        <b-badge pill class="node-status status-badge" :variant="nodeStatusVariant">{{nodeStatus}}</b-badge>
      </p>
      <div class="col">
        <div style="float: right;">
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
  </div>
</template>

<script>
import routesName from "../routesName";
import * as types from "../store/types";
import { mapActions } from "vuex";

export default {
  name: "LogNodeHeader",
  props: {
    nodeLog: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteNode: types.DELETE_NODE
    })
  },
  computed: {
    expandIconClass() {
      if (this.nodeLog.isExpand) return "oi oi-chevron-top";
      else return "oi oi-chevron-bottom";
    },
    expandIconTooltipTitle() {
      if (this.nodeLog.isExpand) return "Hide Node Log Detail";
      else return "Show Node Log Detail";
    },
    nodeStatus() {
      if (this.nodeLog.isAlive) return "Up";
      else return "Down";
    },
    nodeStatusVariant() {
      if (this.nodeLog.isAlive) return "success";
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