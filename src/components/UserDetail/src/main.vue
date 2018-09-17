<!-- -->
<template>
  <div>
    <gl-dialog :title="userDetailTitle" :visible.sync="userDetailVisible" :before-close="handleClose">
      <gl-table :table="tableParam"></gl-table>
      <gl-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[1,2,3,4]" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </gl-pagination>
    </gl-dialog>
  </div>
</template>

<script>
import { selectUserRoleByRoleId } from '@/api/api'
export default {
  name: 'UserDetail',
  props: {
    userDetailTitle: String,
    userDetailVisible: Boolean,
    resParam: [Array, Object],
    columnParam: Array,
    consoleParam: [Array, Object]
  },
  watch: {
    columnParam(val) {
      this.tableParam.column = val
    },
    consoleParam(val) {
      this.tableParam.console = val
    },
    apiParams(val) {
      // this.tableParam.data = val.list
      // this.total = val.total
      this.id = val
      console.log(this.id)
      this.selectUser()
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 10,
      id: Number,
      tableParam: {
        border: true,
        // role-data
        // data: [{
        //   userId: '1006',
        //   username: 'text11',
        //   realname: '陈婉清',
        //   state: '启动'
        // }],
        data: [],
        column: [],
        console: []
      }
    }
  },
  methods: {
    getParams() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        roleId: this.id
      }
    },
    // 获取角色的相关用户详细信息
    selectUser() {
      const params = this.getParams()
      // const params = {
      //   pageSize: this.pageSize,
      //   pageNum: this.pageNum,
      //   roleName: this.roleName
      // roleId: roleId
      // }
      // console.log(params)
      selectUserRoleByRoleId.req(params).then(res => {
        console.log(res)
        this.total = res.total
        this.resParam = res.list
      }).catch(err => {
        console.log(err)
      })
    },
    handleClose() {
      this.$emit('userDetailClose')
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.selectUser()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.selectUser()
    }
  }
}
</script>
<style scoped>
</style>