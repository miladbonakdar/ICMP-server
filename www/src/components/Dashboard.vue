<template>
    <div role="tablist">
        <b-card no-body class="mb-1" v-for="(area, index) in areaTest" :key="area.id">
            <b-card-header style="background-color: white" header-tag="header" class="p-1" role="tab">
                <div class="container-fluid" v-b-toggle="'accordion' + area.id">
                    <area-detail :area="area" :index="index"></area-detail>
                </div>
            </b-card-header>

            <b-collapse :id="'accordion' + area.id" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                    <b-card no-body class="mb-1" v-for="(node, nodeIndex) in area.nodes" :key="node.id">
                        <b-card-header header-tag="header" class="p-1" role="tab">
                            <div v-b-toggle="'node-accordion' + node.id">
                                <node-header :node="node" :index="nodeIndex"></node-header>
                            </div>
                        </b-card-header>
                        <b-collapse :id="'node-accordion' + node.id" accordion="my-node-accordion" role="tabpanel">
                            <b-card-body>
                                <node-detail :node="node"></node-detail>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import AreaData from "../Areas.json";
    import AreaDetail from "./AreaDetail.vue";
    import NodeHeader from "./NodeHeader.vue";
    import NodeDetail from "./NodeDetail.vue";

    export default {
        data() {
            return {
                areaTest: AreaData,
                areas: [
                    {
                        areaName: "tehran",
                        nodes: [
                            {name: "gohessag", host: "ggg.cccc"},
                            {name: "node2", host: "ggg.cccc"},
                            {name: "node3", host: "ggg.cccc"},
                            {name: "node4", host: "ggg.cccc"},
                            {name: "node5", host: "ggg.cccc"},
                            {name: "node6", host: "ggg.cccc"}
                        ]
                    },
                    {
                        areaName: "Qazvin",
                        nodes: [
                            {name: "gohessag", host: "ggg.cccc"},
                            {name: "node2", host: "ggg.cccc"},
                            {name: "node3", host: "ggg.cccc"},
                            {name: "node4", host: "ggg.cccc"},
                            {name: "node5", host: "ggg.cccc"},
                            {name: "node6", host: "ggg.cccc"}
                        ]
                    }
                ]
            };
        },
        methods: {
            editArea(index) {
                alert(this.areaTest[0].name);
            }
        },
        components: {
            AreaDetail,
            NodeHeader,
            NodeDetail
        }
    };
</script>

<style scoped>

</style>