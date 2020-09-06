<template>
    <div style="position: relative;width: 100%;height: 100%" @click.self="timeout">
      <clock @timeout="timeout" class="clock" :count="180"></clock>
    </div>
</template>

<script>
  export default {
    name: "Instructions",
    methods: {
      timeout() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .clock{
    position: absolute;
    left: 10%;
    top: 15%;
  }
</style>
