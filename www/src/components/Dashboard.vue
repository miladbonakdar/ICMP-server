<template>
    <div role="tablist">
        <h2>Dashboard</h2>
        <b-card no-body class="mb-1" v-for="(area, index) in areaTest" :key="area.id">
            <b-card-header style="background-color: white" header-tag="header" class="p-1" role="tab">
                <div class="container-fluid" v-b-toggle="'accordion' + area.id">
                    <area-detail :area="area" :index="index" :isExpand="areasCollapseState[index]"></area-detail>
                </div>
            </b-card-header>

            <b-collapse v-model="areasCollapseState[index]" :id="'accordion' + area.id" accordion="my-accordion"
                        role="tabpanel">
                <b-card-body>
                    <b-card no-body class="mb-1" v-for="(node, nodeIndex) in area.nodes" :key="node.id">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <div v-b-toggle="'node-accordion' + node.id">
                                <node-header
                                        :node="node"
                                        :index="nodeIndex"
                                        :isExpand="nodesCollapseState[index][nodeIndex]"
                                ></node-header>
                            </div>
                        </b-card-header>
                        <b-collapse
                                v-model="nodesCollapseState[index][nodeIndex]"
                                :id="'node-accordion' + node.id"
                                accordion="my-node-accordion"
                                role="tabpanel">
                            <b-card-body>
                                <node-detail :node="node"></node-detail>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-button @click="goToNodePage()" block variant="success">
                        Add New Node
                    </b-button>
                </b-card-body>
            </b-collapse>
        </b-card>
        <b-button @click="goToAreaPage()" block variant="success">
            Add New Area
        </b-button>

    </div>
</template>

<script>
    import AreaData from "../Areas.json";
    import AreaDetail from "./AreaDetail.vue";
    import NodeHeader from "./NodeHeader.vue";
    import NodeDetail from "./NodeDetail.vue";
    import routsName from "../routsName";

    export default {
        data() {
            return {
                areaTest: AreaData,
                nodesCollapseState: this.getNodesCollapseState(),
                areasCollapseState: this.getAreasCollapseState()
            };
        },
        methods: {
            goToAreaPage() {
                this.$router.push({name: routsName.addArea()});
            },
            goToNodePage() {
                this.$router.push({name: routsName.addNode()});
            },
            getNodesCollapseState: function () {
                let collapseState = [];
                for (let i = 0; i < AreaData.length; i++) {
                    collapseState[i] = [];
                    for (let j = 0; j < AreaData[i].nodes; j++) {
                        collapseState[i][j] = false;
                    }
                }
                return collapseState;
            },
            getAreasCollapseState: function () {
                let collapseState = [];
                for (let i = 0; i < AreaData.length; i++) {
                    collapseState[i] = false;
                }
                return collapseState;
            }
        },
        computed: {},
        components: {
            AreaDetail,
            NodeHeader,
            NodeDetail
        }
    };
</script>

<style scoped>
    h2{
        margin-bottom: 10px;
    }
</style>