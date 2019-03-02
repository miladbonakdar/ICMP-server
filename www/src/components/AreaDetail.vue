<template>
    <div style="border-width: 0 ">
        <div class="row" style="margin-right: 12px;">
            <div class="col">
                <h4>{{area.name}}</h4>
            </div>
            <div class="col">
                <p class="server-down text-danger">
                    Total Down : {{area.totalDown}}
                </p>
            </div>
            <div class="col">
                <p class="server-up text-success">
                    Total Up : {{area.totalUp}}
                </p>
            </div>
            <div class="col">
                <div style="float: right">
                    <img
                            @click.stop="editArea()"
                            class="icon"
                            v-b-tooltip.hover title="Edit Area"
                            src="../assets/edit.svg">
                    <img
                            @click.stop="deleteArea()"
                            class="icon"
                            v-b-tooltip.hover title="Delete Area"
                            src="../assets/delete.svg">
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

    export default {
        name: "AreaDetail",
        props: {
            area: {
                type: Object,
                required: true
            }
        },
        methods: {
            editArea() {
                this.$router.push({name: routsName.AREA, params: {id: this.area.id}});
            },
            deleteArea() {
                
            }
        },
        computed: {
            expandIconClass() {
                if (this.area.isExpand)
                    return "oi oi-chevron-top";
                else
                    return "oi oi-chevron-bottom";
            },
            expandIconTooltipTitle(){
                if(this.area.isExpand)
                    return "Hide Area Detail";
                else
                    return "Show Area Detail";
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