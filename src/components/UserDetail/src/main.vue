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
    // dataParam: Array,
    columnParam: Array,
    consoleParam: [Array, Object]
  },
  watch: {
    columnParam(val) {
      this.tableParam.column = val
    },
    consoleParam(val) {
      this.tableParam.console = val
    }
  },
  data() {
    return {
      tableParam: {
        border: true,
        // role-data
        // data: [{
        //   id: '1006',
        //   username: 'text11',
        //   realname: '陈婉清',
        //   state: '启动'
        // }],
        data: [{
          username: 'abc',
          realname: '陈婉清',
          isadmin: '否',
          mobile: '13033333333',
          email: 'abc@didihu.com',
          roles: '好车主',
          state: '开启'
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