<template>
    <div id="footer">
        <b-row>
            <b-col>
                <p align="center"><a href="https://github.com/miladbonakdar/ICMP-server">Github</a></p>
            </b-col>
            <b-col>
                <p align="center">Made with <span class="heart">❤</span> in Iran</p>
            </b-col>
            <b-col>
                <p align="center">v 1.0.0</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    };
</script>

<style scoped>
    #footer{
        background-color: #563D7C;
        position: fixed;
        width: 100%;
        bottom: 0;
    }
    a{
        color: white;
        text-decoration: none;
    }
    .heart{
        color:#e25555;
    }
    p{
        color: white;
        margin-top: 5px;
    }
</style>