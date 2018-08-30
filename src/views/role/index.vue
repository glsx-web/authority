<!-- roleManagement -->
<template>
  <div>
    <gl-input placeholder="请输入角色名称" v-model="roleName" clearable>
    </gl-input>
  </div>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      roleName: ''
    }
  }
}
</script>
<style scoped>
gl-input__innner{
    width: 30%;
}
</style>
