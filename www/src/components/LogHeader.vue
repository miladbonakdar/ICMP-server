<template>
  <div style="border-width: 0 ">
    <div class="row" style="margin-right: 12px;">
      <div class="col">
        <h4>{{log.createdOn | moment("MMMM Do YYYY")}}</h4>
      </div>
      <div class="col">
        <p class="server-down text-danger">Total Down : {{log.totalDown}}</p>
      </div>
      <div class="col">
        <p class="server-up text-success">Total Up : {{log.totalUp}}</p>
      </div>
      <div class="col">
        <div style="float: right">
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
import * as types from "../store/types";
import { mapActions } from "vuex";

export default {
  name: "LogHeader",
  props: {
    log: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      deleteArea: types.DELETE_AREA
    })
  },
  computed: {
    expandIconClass() {
      if (this.log.isExpand) return "oi oi-chevron-top";
      else return "oi oi-chevron-bottom";
    },
    expandIconTooltipTitle() {
      if (this.log.isExpand) return "Hide Log Detail";
      else return "Show Log Detail";
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