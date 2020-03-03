<template>
  <video
    @click="toggle"
    src="../assets/ad/xxm.mp4"
    id="advertisement"
    loop></video>
</template>

<script>
  export default {
    name: "Advisement",
    methods: {
      toggle() {
        this.$router.push('/homepage')
      }
    }
  }
</script>

<style scoped>

</style>
