<template>
    <div>
        <h2>Setting</h2>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form inline >
                <div class="custom-control custom-checkbox mb-4 mr-sm-4 mb-sm-0">
                    <input type="checkbox" class="custom-control-input" v-model="form.isRedisEnabled"
                           id="enableRedisCheckbox"
                           checked>
                    <label class="custom-control-label" for="enableRedisCheckbox">isRedisEnabled</label>
                </div>
                <div class="custom-control custom-checkbox mb-4 mr-sm-4 mb-sm-0">
                    <input type="checkbox" class="custom-control-input" v-model="form.isLoginEnabled"
                           id="enableLoginCheckbox"
                           checked>
                    <label class="custom-control-label" for="enableLoginCheckbox">isLoginEnabled</label>
                </div>
                <div class="custom-control custom-checkbox mb-4 mr-sm-4 mb-sm-0">
                    <input type="checkbox" class="custom-control-input" v-model="form.isCsvExportEnabled"
                           id="csvExportCheckbox"
                           checked>
                    <label class="custom-control-label" for="csvExportCheckbox">isCsvExportEnabled</label>
                </div>
            </b-form>
            <div style="margin-top: 12px;" class="row">
                <b-form-group id="csvExportHourInputGroup"
                              label="Time four csv export:"
                              class="col-sm-4"
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
                              class="col-sm-4"
                              label-for="exampleInput2">
                    <b-form-input id="pingMinuteInput"
                                  type="number"
                                  v-model="form.pingHostsEvery"
                                  required
                                  placeholder="Enter ping interval(minute)">
                    </b-form-input>
                </b-form-group>
            </div>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    import SettingData from "../Setting.json";

    export default {
        data() {
            return {
                form: {
                    isRedisEnabled: SettingData.isRedisEnabled,
                    exportCsvFileAtHour: SettingData.exportCsvFileAtHour,
                    exportCsvFileAtMinute: SettingData.exportCsvFileAtMinute,
                    isLoginEnabled: SettingData.isLoginEnabled,
                    isCsvExportEnabled: SettingData.isCsvExportEnabled,
                    pingHostsEvery: SettingData.pingHostsEvery
                },
                csvExportTime: (
                    (SettingData.exportCsvFileAtHour < 10 ? "0" + SettingData.exportCsvFileAtHour:SettingData.exportCsvFileAtHour) +
                    ":" +
                    (SettingData.exportCsvFileAtMinute < 10 ?"0" + SettingData.exportCsvFileAtMinute:SettingData.exportCsvFileAtMinute)
                )
                ,
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
                this.form.isRedisEnabled = false;
                this.form.isCsvExportEnabled = false;
                this.form.isLoginEnabled = false;
                this.form.csvExportTime = null;
                this.form.pingHostsEvery = null;
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            }
        },
        watch: {
            csvExportTime(val) {
                let time = val.split(":");
                this.form.exportCsvFileAtHour = time[0];
                this.form.exportCsvFileAtMinute = time[1];
            }
        }
    };
</script>

<style scoped>

</style>