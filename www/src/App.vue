<template>
    <div>
        <app-header></app-header>
        <div class="container-fluid">
            <div class="row">
                <div id="app" class="col-sm-8">
                    <router-view></router-view>
                </div>
            </div>
            <hr>
            <app-footer></app-footer>
        </div>
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
#app{
    float: none;
    margin: 10px auto;
}
</style>
