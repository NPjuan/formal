<template>
  <div style="position: absolute;width: 100%;height: 100%" @click="toggle">
<!--    <video-->
<!--            @click="toggle"-->
<!--            :src="advisementSrc"-->
<!--            id="advertisement"-->
<!--            autoplay-->
<!--            loop/>-->
  </div>
</template>

<script>
  export default {
    name: "Advisement",
    data() {
      return {
        advisementSrc: 'http:47.115.60.70:8080/picture/movie.53dd3b7.mp4'
      }
    },
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
