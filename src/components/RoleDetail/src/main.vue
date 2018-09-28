<!-- RoleDetail -->
<template>
  <gl-dialog title="角色列表" :visible.sync="detailVisible" :before-close="handleDetailCancel">
    <gl-form label-width="105px">
      <gl-form-item label="角色名称：">
        <span>{{roleParam.roleName}}</span>
      </gl-form-item>
      <gl-form-item label="角色描述：">
        <span style="word-wrap: break-word;">{{roleParam.description}}</span>
      </gl-form-item>
      <gl-form-item label="菜单选项：">
        <tree ref='tree' :propsData="roleMenuTree" :defaultExpandAll="defaultExpandAll" style="height:160px"></tree>
      </gl-form-item>
    </gl-form>
  </gl-dialog>
</template>

<script>
export default {
  name: 'RoleDetail',
  props: {
    detailVisible: Boolean,
    roleParam: Object,
    roleMenuTree: Array
  },
  data() {
    return {
      defaultExpandAll: true
    }
  },
  methods: {
    handleDetailCancel() {
      this.$emit('detailClose')
    }
  }
}

</script>
<style scoped>
</style>