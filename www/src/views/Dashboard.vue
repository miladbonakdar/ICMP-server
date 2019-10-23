<template>
  <div role="tablist">
    <h3 class="text-bold">Dashboard</h3>
    <hr />
    <b-container id="generalInfo">
      <b-row>
        <b-col>
          <h5>Last update: {{ lastUpdate | moment("from") }}</h5>
        </b-col>
        <b-col>
          <h5>Next update: {{ nextUpdate | moment("from") }}</h5>
        </b-col>
        <b-col style="padding-right:0px">
          <b-row id="ping-now">
            <b-button
              @click="getPing"
              size="sm"
              v-b-tooltip.hover
              title="Ping Now"
              v-if="access.ping"
            >
              Ping now
              <span class="oi oi-reload plus-icon"></span>
            </b-button>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <b-card
      no-body
      class="mb-1 area-custom-card border-success"
      v-for="(area, index) in areas"
      :key="area.id"
    >
      <b-card-header header-tag="header" class="p-1 card-header" role="tab">
        <div class="container-fluid" style="padding-right:0px;">
          <area-detail style="padding-right:0px;" :area="area" v-b-toggle="'accordion' + area.id"></area-detail>
        </div>
      </b-card-header>

      <b-collapse
        v-model="areas[index].isExpand"
        :id="'accordion' + area.id"
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-table striped hover :items="area.nodes" :fields="fields" small>
            <template v-slot:cell(alive)="row">
              <b-badge :variant="row.value ? 'success' : 'danger'">{{row.value ? 'Up' : 'Down'}}</b-badge>
            </template>
            <template v-slot:cell(deviceType)="row">
              <b-badge variant="info">{{row.value}}</b-badge>
            </template>
            <template v-slot:cell(deviceModel)="row">
              <b-badge variant="primary">{{row.value}}</b-badge>
            </template>
            <template v-slot:cell(createdOn)="row">
              <b-badge>{{row.value | moment("from")}}</b-badge>
              {{row.value | moment("DD MMMM YYYY")}}
            </template>
            <template v-slot:cell(actions)="row">
              <node-header :area="area" :node="row.item"></node-header>
            </template>
          </b-table>
          <b-button
            v-if="access.modifyNode"
            @click="goToNodePage(area.id)"
            style="color: white;"
            variant="warning"
            size="sm"
          >
            New Node
            <span class="oi oi-plus plus-icon"></span>
          </b-button>
        </b-card-body>
      </b-collapse>
    </b-card>
    <div class="row">
      <div class="col">
        <b-button v-if="access.modifyArea" @click="goToAreaPage()" variant="success" size="sm">
          New Area
          <span class="oi oi-plus plus-icon"></span>
        </b-button>
      </div>
      <div
        class="col"
        style="    display: flex;
    flex-direction: row-reverse;padding-right:10px"
      >
        <b-button v-if="access.export" @click="exportCsv()" style="color:white;" size="sm">
          Export csv
          <span class="oi oi-data-transfer-download plus-icon"></span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import AreaDetail from "../components/AreaDetail.vue";
import NodeHeader from "../components/NodeHeader.vue";
// import NodeDetail from "../components/NodeDetail.vue";
import routesName from "../routesName";
import * as types from "../store/types";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { debug } from "util";

export default {
  metaInfo: {
    title: "Dashboard - ICMP Server"
  },
  data() {
    return {
      lastUpdate: null,
      nextUpdate: null,
      nodesCollapseState: [],
      areasCollapseState: [],
      fields: [
        {
          key: "name",
          label: "Name",
          sortable: true
        },
        {
          key: "alive",
          label: "Status",
          sortable: true
        },
        { key: "hostName", label: "Ip", sortable: true },
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
        },
        { key: "actions", label: "Actions", class: "text-center" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      access: types.ACCESS,
      areas: types.AREAS
    })
  },
  methods: {
    ...mapActions({
      toggleAreaIsExpand: types.TOGGLE_AREA_IS_EXPAND,
      setArea: types.SET_AREAS
    }),
    goToAreaPage() {
      this.$router.push({ name: routesName.AREA, params: { id: "new" } });
    },
    goToNodePage(areaId) {
      this.$router.push({
        name: routesName.NODE,
        params: { id: "new", areaId: areaId }
      });
    },
    getNodesCollapseState() {
      let collapseState = [];
      for (let i = 0; i < this.areas.length; i++) {
        collapseState[i] = [];
        for (let j = 0; j < this.areas[i].nodes; j++) {
          collapseState[i][j] = false;
        }
      }
      return collapseState;
    },
    getAreasCollapseState() {
      let collapseState = [];
      for (let i = 0; i < this.areas.length; i++) {
        collapseState[i] = false;
      }
      return collapseState;
    },
    getPing() {
      this.$gate.public.ping().then(res => {
        this.updateDashboard();
      });
    },
    updateDashboard() {
      this.$gate.area
        .getAll()
        .then(res => {
          console.log(res.data.data);
          this.setArea(res.data.data);
          this.areasCollapseState = this.getAreasCollapseState();
          this.nodesCollapseState = this.getNodesCollapseState();
        })
        .catch(error => {});
      this.$gate.public.getTimes().then(res => {
        if (res.data && res.data.success) {
          this.lastUpdate = new Date(res.data.data.lastExecute);
          this.nextUpdate = new Date(res.data.data.nextExecute);
        }
      });
    },
    exportCsv() {
      this.$gate.node
        .export("csv")
        .then(res => {
          let csv = res.data;
          if (csv == null) return;
          let filename = "export.csv";
          if (!csv.match(/^data:text\/csv/i)) {
            csv = "data:text/csv;charset=utf-8," + csv;
          }
          let data = encodeURI(csv);

          let link = document.createElement("a");
          link.setAttribute("href", data);
          link.setAttribute("download", filename);
          link.click();
        })
        .catch(error => {});
    }
  },
  components: {
    AreaDetail,
    NodeHeader
    // NodeDetail
  },
  created: function() {
    this.updateDashboard();
  },
  watch: {
    areas() {
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
  margin-right: 0px;
}

.plus-icon {
  margin-left: 10px;
}

.icon {
  width: 18px;
  height: 18px;
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

.node-status {
  font-weight: bold;
  margin-bottom: 0;
  font-size: medium;
}

#generalInfo h5 {
  font-weight: 400;
}
</style>