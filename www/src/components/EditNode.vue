<template>
    <div>
        <h2>Edit Node</h2>
        <hr>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group id="areaSelectGroup"
                          label="Select Area:"
                          label-for="areaSelect">
                <b-form-select id="areaSelect"
                               type="text"
                               v-model="form.selectedArea"
                               :options="areaOptions"
                               required
                               placeholder="Enter Username">
                    <template slot="first">
                        <!-- this slot appears above the options from 'options' prop -->
                        <option :value="null" disabled>-- Please select an area --</option>
                    </template>
                </b-form-select>
            </b-form-group>
            <b-form-group id="nodeNameInputGroup"
                          label="Node Name:"
                          label-for="nodeNameInput">
                <b-form-input id="nodeNameInput"
                              type="text"
                              v-model="form.nodeName"
                              required
                              placeholder="Enter Node Name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="nodeNameInputGroup"
                          label="Host Name:"
                          label-for="hostNameInput">
                <b-form-input id="hostNameInput"
                              type="text"
                              v-model="form.hostName"
                              required
                              placeholder="Enter Host Name">
                </b-form-input>
            </b-form-group>
            <b-form-group id="ipAddressInputGroup"
                          label="IP Address:"
                          label-for="ipAddressInput">
                <b-form-input id="ipAddressInput"
                              type="text"
                              v-model="form.ipAddress"
                              required
                              placeholder="Enter IP Address">
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
            title: "Edit Node - ICMP Server"
        },
        data() {
            return {
                form: {
                    selectedArea: AreaData[0].id,
                    nodeName: AreaData[1].nodes[0].name,
                    hostName: AreaData[1].nodes[0].hostName,
                    ipAddress: AreaData[1].nodes[0].ip
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
        },
        computed: {
            areaOptions() {
                let options = [];
                for (let i = 0; i < AreaData.length; i++) {
                    options.push(
                        {
                            text: AreaData[i].name,
                            value: AreaData[i].id
                        }
                    );
                }
                return options;
            }
        }
    };
</script>

<style scoped>

</style>