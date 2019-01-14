<template>
    <div>
        <span style="position: absolute; right: 10px; top: 15px;" class="oi oi-chevron-bottom"></span>
        <div class="row">
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
                <img @click.stop="editNode(index)" rel="tooltip" title="Edit Node" src="../assets/edit.svg"
                     class="icon">
            </div>
            <div class="col">
                <img @click.stop="deleteNode(index)" rel="tooltip" title="Delete Node" src="../assets/delete.svg"
                     class="icon">
            </div>
        </div>
    </div>
</template>

<script>
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
            }
        },
        methods: {
            editNode() {
                alert("hello");
            },
            deleteNode() {

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