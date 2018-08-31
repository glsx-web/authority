<template>
  <div id="app" class="outsider">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped>
.outsider{
  background-color: #FFF;
  padding: 20px 0px 40px 0px;
  /* margin: 20px 20px; */
}
</style>
