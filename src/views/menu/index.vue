<!-- menuManagement -->
<template>
  <div>menuManagement
    <hr>
    {{session}}
    </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      session:this.$get_session_config()
    }
  }
}
</script>
<style scoped>
</style>
