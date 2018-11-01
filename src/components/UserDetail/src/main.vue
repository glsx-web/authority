<!-- -->
<template>
  <div>
    <gl-dialog :title="userDetailTitle" :visible.sync="userDetailVisible" :before-close="handleClose">
      <gl-table :table="tableParam" v-loading="roleLoadingParams.loading" gl-loading-text="拼命加载中"></gl-table>
      <gl-pagination 
          background 
          v-show="flagRoleOrUser" 
          @current-change="handleCurrentChange" 
          :current-page="pageNum" 
          :page-size="pageSize" 
          layout="total, prev, pager, next" 
          :total="total">
      </gl-pagination>
    </gl-dialog>
  </div>
</template>

<script>
import { selectUserRoleByRoleId } from '@/api/api'
import notice from '@/common/notice'

export default {
  name: 'UserDetail',
  props: {
    userDetailTitle: String,
    userDetailVisible: Boolean,
    apiParam: [Object, Function],
    flagRoleOrUser: [Boolean, Function],
    columnParam: Array
  },
  watch: {
    columnParam(val) {
      this.tableParam.column = val
      this.flagRoleOrUser && (this.tableParam.console = this.userRoleDetailConsole)
    },
    apiParam(val) {
      this.id = val.id
      this.id && this.callApi()
    },
    'roleLoadingParams.freshList'(val) {
      val && this.callApi()
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 5,
      id: Number,
      roleLoadingParams: { loading: false, freshList: false },
      userRoleDetailConsole: {
        show: true,
        label: '操作',
        prop: 'option',
        button: [{
          label: '删除',
          type: 'text',
          callback: (index, rows) => {
            notice.confirmTips('确定要删除该用户吗？', 'userRoleDetail', index, rows, this.roleLoadingParams)
          }
        }]
      },
      tableParam: {
        border: true,
        align: 'center',
        data: [],
        column: [],
        console: {}
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
    // 获取角色的相关用户详细信息
    selectUser() {
      const params = this.getRoleParams()
      selectUserRoleByRoleId.req(params).then(res => {
        this.total = res.total
        this.tableParam.data = res.list
        this.roleLoadingParams.loading = false
      }).catch(err => {
        this.roleLoadingParams.loading = false
        notice.errorTips(err)
      })
    },
    callApi() {
      this.flagRoleOrUser && (this.roleLoadingParams.loading = true)
      this.flagRoleOrUser ? this.selectUser() : (this.tableParam.data = [this.apiParam])
      this.roleLoadingParams.freshList = false
    },
    handleClose() {
      this.$emit('userDetailClose')
      clearTimeout(timer)
      var timer = setTimeout(() => {
        this.pageNum = 1
      }, 200)
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