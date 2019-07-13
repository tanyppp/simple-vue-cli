<template>
  <div class='App'>
    <div>Hello App</div>
    <img src="./images/logo.png">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import './scss/index.scss';
.App {
  color: $red;
  font-size: 32px;
  img {
    animation: run 3s ease-in-out both;
  }
  @keyframes run {
    from {
      transform: translate(0)
    }
    to {
      transform: translate(100px)
    }
  }
}
</style>
