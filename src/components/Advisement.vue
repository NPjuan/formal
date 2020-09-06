<template>
  <video
    @click="toggle"
    src="../assets/ad/movie.mp4"
    id="advertisement"
    autoplay
    loop/>
</template>

<script>
  export default {
    name: "Advisement",
    methods: {
      toggle() {
        this.$router.push('/homepage')
      }
    },
    beforeCreate() {
      this.$bus.reset()
    }
  }
</script>

<style scoped>

</style>
