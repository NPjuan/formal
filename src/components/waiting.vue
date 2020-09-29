<template>
  <div class="container">
    <p>请等待</p>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-loading"></use>
    </svg>
  </div>
</template>

<script>
  export default {
    name: "waiting"
  }
</script>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  p{
    font-size: 3.5rem;
    color: #00f5ff;
    letter-spacing: 1rem;
    padding-bottom: 4rem;
  }
  .icon {
    width: 6rem; height: 6rem;
    vertical-align: -1rem;
    fill: #00f5ff;
    overflow: hidden;
    animation: rotate 3s linear infinite;
  }
  @keyframes rotate {
    0%{
      transform: rotate(0);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
