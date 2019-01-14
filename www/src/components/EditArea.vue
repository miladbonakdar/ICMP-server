<template>
    <div>
        <h2>Edit Area</h2>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        name: "Area",
        props: {
            area: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                form: {
                    areaName: area.name
                },
                show: true
            };
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.form));
            },
            onReset(evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.areaName = area.name;
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => {  
                    this.show = true;
                });
            }
        }
    };
</script>

<style scoped>

</style>