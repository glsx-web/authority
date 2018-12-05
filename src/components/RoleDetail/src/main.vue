<!-- RoleDetail -->
<template>
  <gl-dialog title="角色列表" :visible.sync="detailVisible" :before-close="handleDetailCancel">
    <gl-form label-width="105px">
      <gl-form-item label="角色名称：">
        <span style="line-height:40px;">{{roleParam.roleName}}</span>
      </gl-form-item>
      <gl-form-item label="角色描述：">
        <div style="padding-top:10px;">
          <span style="word-wrap: break-word;">{{roleParam.description}}</span>
        </div>
      </gl-form-item>
      <gl-form-item label="菜单选项：">
        <div style="padding-top:10px;">
          <tree ref='tree' :propsData="roleMenuTree" :defaultExpandAll="defaultExpandAll" style="height:160px;overflow-y: auto;"></tree>
        </div>
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