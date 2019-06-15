<template>
  <div role="tablist">
    <h3 class="text-bold">Logs</h3>
    <hr>
    <b-container id="generalInfo">
      <b-row>
        <!-- https://www.npmjs.com/package/vuejs-datepicker -->
        <b-col cols="4">
          <datepicker
            v-model="from"
            input-class="form-control"
            placeholder="From date?"
            v-bind:clear-button="true"
            @selected="fromDateChanged"
          ></datepicker>
        </b-col>
        <b-col cols="4">
          <datepicker
            v-model="to"
            input-class="form-control"
            placeholder="To date?"
            v-bind:clear-button="true"
            @selected="toDateChanged"
          ></datepicker>
        </b-col>
        <b-col cols="2">
          <b-button @click="getToday" block variant="success">Today</b-button>
        </b-col>
        <b-col cols="2">
          <b-button @click="getYesterday" block variant="info">Yesterday</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-card
      id="main-card"
      no-body
      class="mb-1 log-custom-card border-success"
      v-for="(log, index) in logs"
      :key="log.id"
    >
      <b-card-header header-tag="header" class="p-1 card-header" role="tab">
        <div class="container-fluid">
          <log-header :log="log" v-b-toggle="'accordion' + log.id"></log-header>
        </div>
      </b-card-header>

      <b-collapse
        v-model="logs[index].isExpand"
        :id="'accordion' + log.id"
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <p>
            <strong>Total Devices:</strong>
            {{log.totalDevices}}
          </p>
          <p>
            <strong>Total Areas:</strong>
            {{log.totalAreas}}
          </p>
          <p>
            <strong>Date:</strong>
            {{log.createdOn | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}
          </p>
          <b-table striped hover :items="log.logs" :fields="fields">
            <template slot="isAlive" slot-scope="row">
              <p class="col node-status">
                <b-badge
                  pill
                  class="node-status status-badge"
                  :variant="nodeStatusVariant(row)"
                >{{nodeStatus(row)}}</b-badge>
              </p>
            </template>
            <template slot="actions" slot-scope="row">
              <node-header :area="area" :node="row.item"></node-header>
            </template>
            <template slot="createdOn" slot-scope="row">{{row.value | moment("DD MMMM YYYY")}}</template>
          </b-table>
          <b-card
            no-body
            class="mb-1 node-custom-card border-danger"
            v-for="(node, nodeIndex) in log.logs"
            :key="node.id + log.id + index + nodeIndex"
          >
            <b-card-header header-tag="header" class="p-1 card-header" role="tab">
              <div
                class="container-fluid"
                v-b-toggle="'node-accordion' + node.id + log.id + index + nodeIndex"
              >
                <log-node-header :nodeLog="node" :index="nodeIndex"></log-node-header>
              </div>
            </b-card-header>
            <b-collapse
              v-model="logs[index].logs[nodeIndex].isExpand"
              :id="'node-accordion' + node.id + log.id + index + nodeIndex"
              accordion="my-node-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <log-node-detail :node="node"></log-node-detail>
              </b-card-body>
            </b-collapse>
          </b-card>
        </b-card-body>
      </b-collapse>
    </b-card>
    <div class="row">
      <div class="col"></div>
      <div class="col"></div>
    </div>

    <div class="mt-3">
      <b-pagination
        v-model="pageNumber"
        :total-rows="totalCount"
        :per-page="pageSize"
        aria-controls="main-card"
        size="sm"
        align="center"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import LogHeader from "./LogHeader.vue";
import LogNodeHeader from "./LogNodeHeader.vue";
import LogNodeDetail from "./LogNodeDetail.vue";
import routsName from "../routsName";
import * as types from "../store/types";
import { mapGetters, mapState, mapActions } from "vuex";
import { debug, debuglog } from "util";
import Datepicker from "vuejs-datepicker";

export default {
  metaInfo: {
    title: "Logs - ICMP Server"
  },
  data() {
    return {
      to: null,
      from: null,
      pageNumber: 1,
      totalCount: 0,
      pageSize: 48,
      nodesCollapseState: [],
      areasCollapseState: [],
      fields: [
        {
          key: "nodeName",
          label: "Name",
          sortable: true
        },
        {
          key: "areaName",
          label: "Area Name",
          sortable: true
        },
        {
          key: "isAlive",
          label: "Status",
          sortable: true
        },
        { key: "hostName", label: "ip", sortable: true },
        {
          key: "number",
          label: "Number",
          sortable: true
        },
        {
          key: "deviceType",
          label: "Device Type",
          sortable: true
        },
        {
          key: "deviceModel",
          label: "Device Model",
          sortable: true
        },
        {
          key: "createdOn",
          label: "Created On",
          sortable: true
        }
      ]
    };
  },
  computed: {
    logs() {
      return this.$store.state.logs.logs;
    }
  },
  methods: {
    ...mapActions({
      setLogs: types.SET_LOGS
    }),
    goToAreaPage() {
      this.$router.replace({ name: routsName.AREA, params: { id: "new" } });
    },
    goToNodePage() {
      this.$router.replace({ name: routsName.NODE, params: { id: "new" } });
    },
    getNodesCollapseState() {
      let collapseState = [];
      for (let i = 0; i < this.logs.length; i++) {
        collapseState[i] = [];
        for (let j = 0; j < this.logs[i].logs; j++) {
          collapseState[i][j] = false;
        }
      }
      return collapseState;
    },
    getAreasCollapseState() {
      let collapseState = [];
      for (let i = 0; i < this.logs.length; i++) {
        collapseState[i] = false;
      }
      return collapseState;
    },
    updateLogs(query = {}) {
      this.$gate.log
        .getPage({
          pageNumber: this.pageNumber,
          pageSize: this.pageSize,
          query: query
        })
        .then(res => {
          this.setLogs(res.data.data);
          this.areasCollapseState = this.getAreasCollapseState();
          this.nodesCollapseState = this.getNodesCollapseState();
        })
        .catch(error => {});
    },
    getCount(callback) {
      this.$gate.log
        .count()
        .then(res => {
          this.totalCount = res.data.data;
          callback();
        })
        .catch(error => {});
    },
    nodeStatus(node) {
      if (node.value) return "Up";
      else return "Down";
    },
    nodeStatusVariant(node) {
      if (node.value) return "success";
      else return "danger";
    },
    toDateChanged(date) {
      this.getLogsByDate(this.from, date);
    },
    fromDateChanged(date) {
      this.getLogsByDate(date, this.to);
    },
    getYesterday() {
      let today = new Date();
      this.from = new Date(today.setDate(today.getDate() - 1));
      this.to = new Date();
      this.getLogsByDate(this.from, this.to);
    },
    getToday() {
      let today = new Date();
      this.from = new Date();
      this.to = new Date(today.setDate(today.getDate() + 1));
      this.getLogsByDate(this.from, this.to);
    },
    getLogsByDate(from, to) {
      let _from = from
        ? new Date(from.getFullYear(), from.getMonth(), from.getDate())
        : null;
      let _to = to
        ? new Date(to.getFullYear(), to.getMonth(), to.getDate())
        : null;
      this.updateLogs({ from: _from, to: _to });
    }
  },
  components: {
    LogHeader,
    LogNodeHeader,
    LogNodeDetail,
    Datepicker
  },
  created: function() {
    this.getCount(() => this.updateLogs());
  },
  watch: {
    pageNumber(val) {
      this.updateLogs();
    },
    logs(newValue, oldValue) {
      this.$forceUpdate();
      this.nodesCollapseState = this.getNodesCollapseState();
      this.areasCollapseState = this.getAreasCollapseState();
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 10px;
}

#generalInfo {
  margin-bottom: 15px;
  padding: 10px;
}

#ping-now {
  margin: 0 auto;
  cursor: pointer;
  justify-content: flex-end;
  margin-right: 34px;
}

.plus-icon {
  margin-left: 10px;
}

.icon {
  width: 20px;
  height: 20px;
  margin-top: 3px;
  margin-left: 5px;
  margin-bottom: 0;
  cursor: pointer;
}

.area-custom-card {
  border-width: 0 0 0 5px;
  margin-bottom: 20px !important;
}

.node-custom-card {
  border-width: 0 0 0 5px;
  margin-bottom: 20px !important;
}

.card-header {
  background-color: white;
  border-width: 0;
}

.card-header:hover {
  background-color: #f6f6f6;
}

.text-bold {
  font-weight: 600;
}

#generalInfo h5 {
  font-weight: 400;
}
</style>