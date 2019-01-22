<template>
    <div>
        <h2>Edit Area</h2>
        <hr>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group id="exampleInputGroup1"
                          label="Area Name:"
                          label-for="areaNameInput">
                <b-form-input id="areaNameInput"
                              type="text"
                              v-model="form.areaName"
                              required
                              placeholder="Enter area name">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button @click="onCancel" variant="outline-secondary">Cancel</b-button>
        </b-form>
    </div>
</template>

<script>
    import AreaData from "../Areas.json";
    import routsName from "../routsName";

    export default {
        metaInfo: {
            title: "Edit Area - ICMP Server"
        },
        data() {
            return {
                area: AreaData[0],
                form: {
                    areaName: AreaData[0].name
                },
                show: true
            };
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.form));
            },
            onCancel(evt) {
                evt.preventDefault();
                this.$router.push({name: routsName.DASHBOARD})
            }
        }
    };
</script>

<style scoped>

</style>