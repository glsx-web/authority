<!-- -->
<template>
  <div>
      <gl-dialog :title="userDetailTitle" :visible.sync="userDetailVisible" :before-close="handleClose">
          <gl-table :table="tableParam"></gl-table>
      </gl-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    userDetailTitle: String,
    userDetailVisible: Boolean,
    // dataParam: Object,
    columnParam: Array,
    consoleParam: [Array, Object]
  },
  watch: {
    columnParam(val) {
      this.tableParam.column = this.$deep_clone(val)
    },
    consoleParam(val) {
      this.tableParam.console = this.$deep_clone(val)
    }
  },
  data() {
    return {
      tableParam: {
        border: true,
        data: [{
          id: '1006',
          username: 'text11',
          realname: '陈婉清',
          state: '启动'
        }],
        column: [],
        console: []
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('userDetailClose')
    }
  }
}
</script>
<style scoped>
</style>