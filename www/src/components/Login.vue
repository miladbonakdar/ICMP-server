<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="usernameInputGroup"
                          label="Your Username:"
                          label-for="Username">
                <b-form-input id="usernameInput"
                              type="text"
                              v-model="form.username"
                              required
                              placeholder="Enter Username">
                </b-form-input>
            </b-form-group>
            <b-form-group id="PasswordInputGroup"
                          label="Your Password:"
                          label-for="Password">
                <b-form-input id="passwordInput"
                              type="password"
                              v-model="form.password"
                              required
                              placeholder="Enter Password">
                </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    username: '',
                    password: ''
                },
                show: true
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                alert(JSON.stringify(this.form));
            },
            onReset (evt) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.username = '';
                this.form.password = '';
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick(() => { this.show = true });
            }
        }
    }
</script>

<style scoped>

</style>