<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <app-header></app-header>

            </div>
        </div>
    </div>
</template>

<script>
    import Header from "./components/Header.vue";
    export default {
        name: "app",
        components: {
            appHeader: Header,
        }
    };
</script>

<style>

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
