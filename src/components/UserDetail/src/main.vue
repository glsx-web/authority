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
    dataParam: Object,
    columnParam: Object
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
        column: [{
          label: '序号',
          prop: 'id'
        }, {
          label: '账号',
          prop: 'username'
        }, {
          label: '用户名称',
          prop: 'realname'
        }, {
          label: '状态',
          prop: 'state'
        }],
        console: {
          label: '操作',
          prop: 'option',
          button: [{
            label: '删除',
            type: 'text',
            callback: (index, rows) => {
              this.$alert(rows[index])
            }
          }]
        }
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