<template>
    <div>
        <h2>{{getTitle}}</h2>
        <hr>
        <b-form @submit="onSubmit" v-if="show">
            <b-form-group id="areaSelectGroup"
                          label="Select Area:"
                          label-for="areaSelect">
                <b-form-select id="areaSelect"
                               type="text"
                               v-model="form.parent"
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
                              v-model="form.name"
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
                              v-model="form.ip"
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
    import routsName from "../routsName";

    export default {
        metaInfo: {
            title: "Edit Node - ICMP Server"
        },
        data() {
            return {
                area: null,
                editMode: false,
                form: {
                    parent: null,
                    name: null,
                    hostName: null,
                    ip: null,
                },
                show: true
            };
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                if(this.editMode){
                    this.$gate.node.update(this.form).then((res)=>{
                        console.log(res);
                        this.goToDashboard();
                    });
                }else{
                    this.$gate.node.create(this.form).then((res)=>{
                        console.log(res);
                        this.goToDashboard();
                    }).catch(error => console.log(error));
                }
            },
            onCancel(evt) {
                evt.preventDefault();
                this.goToDashboard();
            },
            goToDashboard(){
                this.$router.push({name: routsName.DASHBOARD});
            }
        },
        computed: {
            areaOptions() {
                let options = [];
                if(!this.area) return null;
                for (let i = 0; i < this.area.length; i++) {
                    options.push(
                        {
                            text: this.area[i].name,
                            value: this.area[i].path
                        }
                    );
                }
                return options;
            },
            getTitle() {
                if(this.editMode){
                    return "Edit Node";
                }else{
                    return "Add Node";
                }
            }
        },
        created() {
            this.$gate.area.getAll().then(res => this.area = res.data.data);
            let id = this.$route.params.id;
            if(id !== "new"){
                this.editMode = true;
                this.$gate.node.get(id).then((res) => {
                    console.log(res);
                    this.form = res.data.data;
                }).catch((err) => {
                    
                });
            }
        }
    };
</script>

<style scoped>

</style>