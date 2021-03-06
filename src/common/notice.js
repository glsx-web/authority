import Vue from 'vue'
import {
  deleteUserRoleById
} from '@/api/api'

export default new Vue({
  methods: {
    confirmTips(conMessage, source, index, rows, roleLoadingParams) {
      this.$confirm(conMessage, '', {
        conirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (source === 'userRoleDetail') {
          roleLoadingParams.loading = true
          this.deleteUserRole(index, rows, roleLoadingParams)
        }
      }).catch(() => {})
    },
    deleteUserRole(index, rows, roleLoadingParams) {
      const data = rows[index]
      const params = {
        roleId: data.roleId,
        userId: data.userId
      }
      deleteUserRoleById.req(params).then(() => {
        this.okTips(`删除成功`)
        roleLoadingParams.freshList = true
      }).catch(err => {
        roleLoadingParams.loading = false
        this.errorTips(err)
      })
    },
    warningTips(message) {
      this.$notify({
        type: 'warning',
        title: message
      })
    },
    okTips(message) {
      this.$notify({
        type: 'success',
        title: message
      })
    },
    errorTips(message) {
      this.$notify({
        type: 'error',
        title: message
      })
    }
  }
})
