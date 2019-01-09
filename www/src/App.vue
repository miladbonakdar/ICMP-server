<template>
    <div>
        <app-header></app-header>
        <hr>
        <router-view></router-view>
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

    h1, h2 {
        font-weight: bold;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
