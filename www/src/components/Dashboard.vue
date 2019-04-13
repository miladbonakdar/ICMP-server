<template>
  <div role="tablist">
    <h2 class="text-bold">Dashboard</h2>
    <hr>
    <b-container id="generalInfo">
      <b-row>
        <b-col>
          <h5>Last update: {{ lastUpdate | moment("from") }}</h5>
        </b-col>
        <b-col>
          <h5 style="text-align: center;">Next update: {{ nextUpdate | moment("from") }}</h5>
        </b-col>
        <b-col>
          <b-row id="ping-now">
            <b-button @click="getPing" size="sm" v-b-tooltip.hover title="Ping Now">
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
        <div class="container-fluid">
          <area-detail :area="area" v-b-toggle="'accordion' + area.id"></area-detail>
        </div>
      </b-card-header>

      <b-collapse
        v-model="areas[index].isExpand"
        :id="'accordion' + area.id"
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body>
          <b-card
            no-body
            class="mb-1 node-custom-card border-danger"
            v-for="(node, nodeIndex) in area.nodes"
            :key="node.id"
          >
            <b-card-header header-tag="header" class="p-1 card-header" role="tab">
              <div class="container-fluid" v-b-toggle="'node-accordion' + node.id">
                <node-header :area="area" :node="node" :index="nodeIndex"></node-header>
              </div>
            </b-card-header>
            <b-collapse
              v-model="areas[index].nodes[nodeIndex].isExpand"
              :id="'node-accordion' + node.id"
              accordion="my-node-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <node-detail :node="node"></node-detail>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-button @click="goToNodePage()" style="color: white;" variant="warning" size="sm">
            New Node
            <span class="oi oi-plus plus-icon"></span>
          </b-button>
        </b-card-body>
      </b-collapse>
    </b-card>
    <div class="row">
      <div class="col">
        <b-button @click="goToAreaPage()" variant="success" size="sm">
          New Area
          <span class="oi oi-plus plus-icon"></span>
        </b-button>
      </div>
      <div class="col">
        <b-button @click="exportCsv()" style="color:white;" size="sm">
          Export csv
          <span class="oi oi-data-transfer-download"></span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import AreaDetail from "./AreaDetail.vue";
import NodeHeader from "./NodeHeader.vue";
import NodeDetail from "./NodeDetail.vue";
import routsName from "../routsName";
import * as types from "../store/types";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  metaInfo: {
    title: "Dashboard - ICMP Server"
  },
  data() {
    return {
      lastUpdate: null,
      nextUpdate: null,
      nodesCollapseState: [],
      areasCollapseState: []
    };
  },
  computed: {
    areas() {
      return this.$store.state.areas.areas;
    }
  },
  methods: {
    ...mapActions({
      toggleAreaIsExpand: types.TOGGLE_AREA_IS_EXPAND,
      setArea: types.SET_AREAS
    }),
    goToAreaPage() {
      this.$router.push({ name: routsName.AREA, params: { id: "new" } });
    },
    goToNodePage() {
      this.$router.push({ name: routsName.NODE, params: { id: "new" } });
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
          this.setArea(res.data.data);
          this.areasCollapseState = this.getAreasCollapseState();
          this.nodesCollapseState = this.getNodesCollapseState();
        })
        .catch(error => {});
      this.$gate.public.getTimes().then(res => {
        console.log(res);
        this.lastUpdate = new Date(res.data.data.lastExecute);
        this.nextUpdate = new Date(res.data.data.nextExecute);
      });
    },
    exportCsv() {
      this.$gate.node.export("csv").then(res => {
        console.log(res.data);

        let csv = res.data;
        if (csv == null) return;
        let filename =  "export.csv";
        if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        let data = encodeURI(csv);
        
        let link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
      }).catch(error => {
        console.log(error);
      })
    }
  },
  components: {
    AreaDetail,
    NodeHeader,
    NodeDetail
  },
  created: function() {
    this.updateDashboard();
  },
  watch: {
    areas(newValue, oldValue) {
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