<template>
    <div>
      <clock @timeout="timeout"></clock>
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

</style>
