<template>
    <div>
        <h2>Add Area</h2>
        <hr>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group id="exampleInputGroup1"
                          label="Area Name:"
                          label-for="areaNameInput">
                <b-form-input id="areaNameInput"
                              type="text"
                              v-model="form.name"
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
    import routsName from "../routsName";
    export default {
        metaInfo: {
            title: "Add Area - ICMP Server"
        },
        data() {
            return {
                form: {
                    name: ""
                },
                show: true
            };
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.$gate.area.create(this.form).then((res)=>{
                    console.log(res);
                })
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