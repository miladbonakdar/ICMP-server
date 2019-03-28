<template>
    <div>
        <h2>Login</h2>
        <hr>
        <b-form @submit="onSubmit" v-if="show">
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
        </b-form>
    </div>
</template>

<script>
    import routsName from "../routsName";

    export default {
        metaInfo: {
            title: "Login - ICMP Server"
        },
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
                // alert(JSON.stringify(this.form));
            }
        }
    }
</script>

<style scoped>

</style>