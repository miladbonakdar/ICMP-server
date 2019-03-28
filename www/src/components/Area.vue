<template>
    <div>
        <h2>{{getTitle}}</h2>
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
            title: "Area - ICMP Server"
        },
        data() {
            return {
                editMode: false,
                form: {
                    name
                },
                show: true
            };
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                if(this.editMode){
                    this.$gate.area.update(this.form).then((res)=>{
                        this.goToDashboard();
                        this.$toasted.global.success({
                            message: "Area updated successfully"
                        })
                    }).catch(error => {
                        this.$toasted.global.error({
                                message: "Error in updating area"
                            });
                    });;
                }else{
                    this.$gate.area.create(this.form).then((res)=>{
                        this.goToDashboard();
                        this.$toasted.global.success({
                            message: "Area created successfully"
                        })
                    }).catch(error => {
                        this.$toasted.global.error({
                            message: "Error in creating area"
                        });
                    });;
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
            getTitle() {
                if(this.editMode){
                    return "Edit Area";
                }else{
                    return "Add Area";
                }
            }
        },
        created() {
            let id = this.$route.params.id;
            if(id !== "new"){
                this.editMode = true;
                this.$gate.area.get(id).then((res) => {
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