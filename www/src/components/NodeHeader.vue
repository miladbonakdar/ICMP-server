<template>
    <div>
        <div class="row" style="margin-right: 12px">
            <div class="col">
                <h4>{{node.name}}</h4>
            </div>
            <p class="col node-status">
                Status : <b-badge pill class="node-status" :variant="nodeStatusVariant">{{nodeStatus}}</b-badge>
            </p>
            <div class="col">
                <div style="float: right;">
                    <img
                            @click.stop="editNode()"
                            v-b-tooltip.hover title="Edit Node"
                            src="../assets/edit.svg"
                            class="icon">
                    <img
                            @click.stop="deleteNode()"
                            v-b-tooltip.hover title="Delete Node"
                            src="../assets/delete.svg"
                            class="icon">
                    <span
                            id="expand-icon"
                            v-b-tooltip.hover :title="expandIconTooltipTitle"
                            :class="expandIconClass"
                    ></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import routsName from "../routsName";
    import * as types from "../store/types";

    export default {
        name: "AreaDetail",
        props: {
            node: {
                type: Object,
                required: true
            }
        },
        methods: {
            editNode() {
                this.$router.push({name: routsName.NODE, params: {id: this.node.id}});
            },
            deleteNode() {

            }
        },
        computed: {
            expandIconClass(){
                if(this.node.isExpand)
                    return "oi oi-chevron-top";
                else
                    return"oi oi-chevron-bottom";
            },
            expandIconTooltipTitle(){
                if(this.node.isExpand)
                    return "Hide Node Detail";
                else
                    return "Show Node Detail";
            },
            nodeStatus(){
                if(this.node.alive)
                    return "Up";
                else
                    return "Down";
            },
            nodeStatusVariant(){
                if(this.node.alive)
                    return "success";
                else
                    return "danger";
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
        font-size: medium
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