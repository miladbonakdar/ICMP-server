<template>
    <div>
        <span style="position: absolute; right: 10px; top: 15px; color: gray;" :class="getExpandIconClass"></span>
        <div class="row" style="margin-right: 12px">
            <div class="col">
                <h4>{{node.name}}</h4>
            </div>
            <p class="col server-down">
                Down : {{node.down}}
            </p>
            <p class="col server-up">
                Up : {{node.up}}
            </p>
            <div class="col">
                <img @click.stop="editNode()" v-b-tooltip.hover title="Edit Node" src="../assets/edit.svg"
                     class="icon">
            </div>
            <div class="col">
                <img @click.stop="deleteNode()" v-b-tooltip.hover title="Delete Node" src="../assets/delete.svg"
                     class="icon">
            </div>
        </div>
    </div>
</template>

<script>
    import routsName from "../routsName";

    export default {
        name: "AreaDetail",
        props: {
            node: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
            isExpand: {
                required: true
            }
        },
        methods: {
            editNode() {
                this.$router.push({name: routsName.editNode(), params: {id: this.node.id}});
            },
            deleteNode() {

            }
        },
        computed: {
            getExpandIconClass(){
                if(this.isExpand)
                    return "oi oi-chevron-top";
                else
                    return"oi oi-chevron-bottom";
            }
        }
    };
</script>

<style scoped>
    .server-up {
        color: green;
        font-weight: bold;
        margin-top: 7px;
        margin-bottom: 0;
    }
    .server-down {
        color: red;
        font-weight: bold;
        margin-top: 7px;
        margin-bottom: 0;
    }
    .icon {
        width: 20px;
        height: 20px;
        margin-top: 7px;
        margin-bottom: 0;
    }
</style>