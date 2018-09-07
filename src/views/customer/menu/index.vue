<template>
  <div>
    <tree :data='res' :title="'菜单列表'" :props='props' consoleItem></tree>
  </div>
</template>

<script>
export default {
  name: 'menuMG',
  data() {
    return {
      res: this.$get_session_config(),
      props: {
        label: 'title'
      }
    }
  }
}
</script>
<style scoped>
</style>
