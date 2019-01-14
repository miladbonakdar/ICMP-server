<template>
    <div>
        <app-header></app-header>
        <div id="container" class="container-fluid">
            <div class="row">
                <div id="app" class="col-sm-8">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import Header from "./components/Header.vue";
    import Footer from "./components/Footer.vue";

    export default {
        name: "app",
        components: {
            appHeader: Header,
            appFooter: Footer
        }
    };
</script>

<style scoped>
    #app {
        float: none;
        margin: 10px auto;
    }
    #container{
        margin-bottom: 40px;
    }
</style>
