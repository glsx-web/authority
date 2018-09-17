<!-- -->
<template>
  <div>
    <gl-dialog :title="userDetailTitle" :visible.sync="userDetailVisible" :before-close="handleClose">
      <gl-table :table="tableParam"></gl-table>
      <gl-pagination background v-show="flagRoleOrUser" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
      </gl-pagination>
    </gl-dialog>
  </div>
</template>

<script>
import { selectUserRoleByRoleId, getWithRoles } from '@/api/api'
export default {
  name: 'UserDetail',
  props: {
    userDetailTitle: String,
    userDetailVisible: Boolean,
    apiParam: [Number, Function],
    flagRoleOrUser: [Boolean, Function],
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
    flagRoleOrUser(val) {
      this.flag = val
    },
    apiParam(val) {
      this.id = val
      this.callApi()
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 10,
      id: Number,
      flag: Number,
      tableParam: {
        border: true,
        data: [],
        column: [],
        console: []
      }
    }
  },
  methods: {
    getRoleParams() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        roleId: this.id
      }
    },
    getUserParams() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        userId: this.id
      }
    },
    // 获取角色的相关用户详细信息
    selectUser() {
      const params = this.getRoleParams()
      selectUserRoleByRoleId.req(params).then(res => {
        this.total = res.total
        this.tableParam.data = res.list
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取用户详情，包括角色
    getUserRoles() {
      const params = this.getUserParams()
      getWithRoles.req(params).then(res => {
        this.total = 1
        this.tableParam.data = [res]
      }).catch(err => {
        console.log(err)
      })
    },
    objectToArray() {

    },
    callApi() {
      // console.log(this.flag)
      this.flag && this.selectUser()
      !this.flag && this.getUserRoles()
    },
    handleClose() {
      this.$emit('userDetailClose')
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.callApi()
    }
  }
}
</script>
<style scoped>
</style>