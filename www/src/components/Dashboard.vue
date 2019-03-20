<template>
  <div role="tablist">
    <h2>Dashboard</h2>
    <hr>
    <b-container id="generalInfo">
      <b-row>
        <b-col>
          <h5>Last update: {{ [2007, 0, 29] | moment("from") }}</h5>
        </b-col>
        <b-col>
          <h5>Next update: {{ [2027, 0, 29] | moment("from") }}</h5>
        </b-col>
        <b-col>
          <b-row>
            <b-row id="ping-now" @click="getPing"
                            v-b-tooltip.hover title="Ping Now" >
              <h5>Ping Now</h5>
              <img class="icon"src="../assets/refresh.svg">
            </b-row>
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
                <node-header :node="node" :index="nodeIndex"></node-header>
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
          <b-button @click="goToNodePage()" style="color: white;" variant="warning">
            New Node
            <span class="oi oi-plus plus-icon"></span>
          </b-button>
        </b-card-body>
      </b-collapse>
    </b-card>
    <b-button @click="goToAreaPage()" variant="success">
      New Area
      <span class="oi oi-plus plus-icon"></span>
    </b-button>
  </div>
</template>

<script>
import AreaDetail from "./AreaDetail.vue";
import NodeHeader from "./NodeHeader.vue";
import NodeDetail from "./NodeDetail.vue";
import routsName from "../routsName";
import * as types from "../store/types";
import { mapGetters, mapActions } from "vuex";

export default {
  metaInfo: {
    title: "Dashboard - ICMP Server"
  },
  data() {
    return {
      lastUpdate: "08:50",
      nextUpdate: "15:55",
      nodesCollapseState: [],
      areasCollapseState: []
    };
  },
  computed: {
    ...mapGetters({
      areas: types.AREAS
    })
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
    getPing(){
      this.$gate.public.ping().then(res =>{
        console.log(res);
      });
    }
  },
  components: {
    AreaDetail,
    NodeHeader,
    NodeDetail
  },
  created: function() {
    this.$gate.area
      .getAll()
      .then(res => {
        console.log(res);
        this.setArea(res.data.data);
        let myToast = this.$toasted.global.my_app_error();
        this.areasCollapseState = this.getAreasCollapseState();
        this.nodesCollapseState = this.getNodesCollapseState();
      })
      .catch(error => {});
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
}

.card-header {
  background-color: white;
  border-width: 0;
}

.card-header:hover {
  background-color: #f6f6f6;
}

#generalInfo h5 {
  font-weight: 400;
}
</style>