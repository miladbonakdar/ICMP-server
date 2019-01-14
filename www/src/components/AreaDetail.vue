<template>
    <div>
        <span style="position: absolute; right: 10px; top: 15px;" class="oi oi-chevron-bottom"></span>
        <div class="row">
            <div class="col">
                <h4>{{area.name}}</h4>
            </div>
            <p class="col server-down">
                Total Down : {{area.totalDown}}
            </p>
            <div class="col">
                <p class="server-up">
                    Total Up : {{area.totalUp}}
                </p>
            </div>
            <div class="col">
                <img @click.stop="editArea(index)" rel="tooltip" title="Edit Area" src="../assets/edit.svg"
                     class="icon">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AreaDetail",
        props: {
            area: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            }
        },
        methods: {
            editArea() {
                alert("hello");
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