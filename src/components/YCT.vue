<template>
  <div class="main">
    <div class="pre">
      <clock
        @timeout="preTimeout"
        class="pre-time">
      </clock>
      <p></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "YCT",
    data() {
      return {

      }
    },
    methods: {
      preTimeout() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
.main{
  position: relative;
  width: 100%;
  height: 100%;
}
  .pre{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 34%;
    height: 32%;
    transform: translate(-50%, -50%);
    background-image: url("../assets/yct_1.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .pre-time{
    position: absolute;
    top:20%;
    left: 10%;
  }
</style>
