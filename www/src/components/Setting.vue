<template>
    <div>
        <h2>Setting</h2>
        <hr>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group id="csvExportHourInputGroup"
                          label="Time four csv export:"
                          label-for="csvExportHourInput">
                <b-form-input id="csvExportHourInput"
                              type="time"
                              v-model="csvExportTime"
                              required
                              placeholder="Enter hour for csv export">
                </b-form-input>
            </b-form-group>
            <b-form-group id="csvExportMinuteInputGroup"
                          label="Ping interval(minute):"
                          label-for="exampleInput2">
                <b-form-input id="pingMinuteInput"
                              type="number"
                              v-model="form.pingHostsEvery"
                              required
                              placeholder="Enter ping interval(minute)">
                </b-form-input>
            </b-form-group>
            <b-form-group>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" v-model="form.isRedisEnabled"
                           id="enableRedisCheckbox"
                           checked>
                    <label class="custom-control-label" for="enableRedisCheckbox">isRedisEnabled</label>
                </div>
            </b-form-group>
            <b-form-group>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" v-model="form.isLoginEnabled"
                           id="enableLoginCheckbox"
                           checked>
                    <label class="custom-control-label" for="enableLoginCheckbox">isLoginEnabled</label>
                </div>
            </b-form-group>
            <b-form-group>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" v-model="form.isCsvExportEnabled"
                           id="csvExportCheckbox"
                           checked>
                    <label class="custom-control-label" for="csvExportCheckbox">isCsvExportEnabled</label>
                </div>
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
            title: "Setting - ICMP Server"
        },
        data() {
            return {
                form: {
                    isRedisEnabled: null,
                    exportCsvFileAtHour: null,
                    exportCsvFileAtMinute: null,
                    isLoginEnabled: null,
                    isCsvExportEnabled: null,
                    pingHostsEvery: null
                },
                csvExportTime: null,
                show: true
            };
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.$gate.setting.update(this.form).then(res =>{
                    this.$toasted.global.success({
                        message: "Setting updated successfully"
                   });
                   this.goToDashboard();
                }).catch(error => {
                    this.$toasted.global.error({
                        message: "Error in updating setting"
                   });
                });
            },
            onCancel(evt) {
                evt.preventDefault();
                this.$router.push({name: routsName.DASHBOARD})
            },
            setCsvExpoetTime(setting){
                this.csvExportTime = (
                    (setting.exportCsvFileAtHour.length === 1 ? "0" + setting.exportCsvFileAtHour:setting.exportCsvFileAtHour) +
                    ":" +
                    (setting.exportCsvFileAtMinute.length === 1 ?"0" + setting.exportCsvFileAtMinute:setting.exportCsvFileAtMinute)
                )
            },
            goToDashboard(){
                this.$router.push({name: routsName.DASHBOARD});
            }
        },
        watch: {
            csvExportTime(val) {
                let time = val.split(":");
                this.form.exportCsvFileAtHour = time[0];
                this.form.exportCsvFileAtMinute = time[1];
            }
        },
        created() {
            this.$gate.setting.get().then(res => {
                    this.form = res.data.data;
                    this.setCsvExpoetTime(res.data.data)
            });
        }
    };
</script>

<style scoped>

</style>