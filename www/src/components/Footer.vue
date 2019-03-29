<template>
  <div id="footer">
    <b-row>
      <img id="bw-logo" src="../assets/ping-pong-bw.png">
      <p style="font-weight:600">ICMP Server</p>
      <b-row style="position: absolute; right: 20px;">
        <p align="center">
          Made with
          <span class="heart">❤</span> Please like us on
        </p>
        <a href="https://github.com/miladbonakdar/ICMP-server">
          <img src="../assets/github-logo.svg">
        </a>
        <p>v{{version}}</p>
      </b-row>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      version: null
    };
  },
  created() {
    this.$gate.public.info().then(res => {
      this.version = res.data.data.siteVersion;
    });

    this.$gate.public.getTimes().then(res => {
      console.log(res);
    });
  }
};
</script>

<style scoped>
#footer {
  height: 25px;
  /*background-color: #ea8685;*/
  background-color: #00d2d3;
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 0 20px 0;
}
a img {
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
}
.heart {
  color: #e25555;
}
p {
  padding: 0 10px 0;
  color: white;
}
#bw-logo {
  height: 17px;
  margin-top: 4px;
  margin-left: 3px;
}
</style>