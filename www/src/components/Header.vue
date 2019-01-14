<template>
    <div>
        <b-navbar toggleable="md" type="dark" class="header">

            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-navbar-brand href="#">ICMP SERVER</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse">

                <b-navbar-nav style="margin-left: 30px">
                    <b-nav-item>
                        <router-link to="/dashboard" active-class="active" exact><a>Dashboard</a></router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/area" active-class="active" exact><a>Area</a></router-link>
                    </b-nav-item>
                    <b-nav-item>
                        <router-link to="/setting" active-class="active" exact><a>Setting</a></router-link>
                    </b-nav-item>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "Header"
    };
</script>

<style scoped>
    .router-link-exact-active {
        color: white;
        cursor: pointer;
        text-decoration: none;
    }
    a{
        color: #bbbbbb;
        text-decoration: none;
    }
    a:hover{
        color: lightgrey;
    }
    .header{
        background-color: #563D7C;
    }
</style>