<template>
  <div>
    <p>
      <strong>AreaName:</strong>
      {{node.areaName}}
    </p>
    <p>
      <strong>HostName:</strong>
      {{node.hostName}}
    </p>
  </div>
</template>

<script>
export default {
  name: "NodeDetail",
  props: {
    node: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>