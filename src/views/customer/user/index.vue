<!-- userManagement -->
<template>
  <div>
    <div class="default m-b20">
      <gl-input class="search-w250" placeholder="请输入用户名或姓名" v-model="userName" clearable></gl-input>
      <gl-button type="primary" @click="finduserName">搜索</gl-button>
    </div>
    <hr>
    <div class="default p-t15">
      <div class="control-tabledata-button">
        <gl-button size="small" @click="createUser(editUser={})">新增用户</gl-button>
        <gl-button size="small" @click="toggleSelection(this.toggle)">删除选中</gl-button>
        <user-create :dialogFormVisible="dialogFormVisible" :editUser="editUser" @userFormData="handleUserFormData"></user-create>
      </div>
      <div class="m-b8">
        <gl-table :table="userData" ref="multipleTable" :pagination="pagination"></gl-table>
        <user-detail :userDetailVisible="userDetailVisible" :userDetailTitle="userDetailTitle" @userDetailClose="handleUserDetailClose" :dataParam="[]" :columnParam="columnParam" :consoleParam="consoleParam"></user-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCreate, UserDetail } from '@/components/index'
import { getUser } from '@/api/userApi'
import { userDetailColumn } from '@/common/common'
export default {
  name: 'user',
  components: {
    UserCreate,
    UserDetail
  },
  data() {
    return {
      userName: '',
      toggle: {},
      dialogFormVisible: false,
      editUser: {},
      userDetailVisible: false,
      userDetailTitle: '用户详情',
      columnParam: [],
      consoleParam: [],
      userData: {
        select: this.handleSelectionChange,
        border: true,
        align: 'center',
        height: 500,
        data: [],
        column: [{
          label: '用户序号',
          prop: 'id'
        }, {
          label: '用户名',
          prop: 'username'
        }, {
          label: '真实姓名',
          prop: 'realname'
        }, {
          label: '管理员',
          prop: 'isadmin'
        }, {
          label: '手机号码',
          prop: 'mobile'
        }, {
          label: '状态',
          prop: 'state'
        }, {
          label: '创建时间',
          prop: 'createTime'
        }],
        // number: {
        //   label: '序号',
        //   index: (index) => {
        //     ++index
        //     return index < 10 && index > 0 ? '0' + index : index
        //   }
        // },
        console: {
          label: '操作',
          prop: 'operation',
          button: [{
            label: '编辑',
            type: 'text',
            callback: (index, rows) => {
              this.createUser(rows[index])
            }
          }, {
            label: '详细',
            type: 'text',
            callback: (index, rows) => {
              this.$alert(rows[index])
            }
          }, {
            label: '删除',
            type: 'text',
            callback: (index, rows) => {
              this.confirmDeleteOrNot(index, rows)
            }
          }, {
            label: '用户',
            type: 'text',
            callback: (index, rows) => {
              this.handleGetUserDetail()
              // this.$alert(rows[index])
            }
          }]
        },
        selection: {},
        multipleSelection: []
      },
      pagination: {
        show: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        style: {
          marginTop: '20px'
        }
      }
    }
  },
  mounted() {
    getUser.req().then(res => {
      this.userData.data = res.userData
      console.log(res.userData)
    })
  },
  methods: {
    message(message, type) {
      type && this.$message({
        showClose: true,
        type: type,
        message: message
      })
      !type && this.$message({
        showClose: true,
        message: message
      })
    },
    // 接受子组件传递的值
    handleUserFormData(isflag, params) {
      this.dialogFormVisible = !this.dialogFormVisible
      !params && this.message('取消操作')
      params && !isflag && this.userDataCreate(params)
      params && isflag && this.message('已经成功修改数据！', 'success')
    },
    // 新增按钮
    createUser(editUser) {
      console.log(editUser)
      this.editUser = editUser
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 新增事件
    userDataCreate(params) {
      // this.dateFormat()
      params.id = '100' + this.userData.data.length
      params.createTime = this.dateFormat()
      const newData = params
      //  { id: '100' + this.userData.data.length, username: params.username, realname: params.realname, isadmin: params.isadmin, mobile: params.mobile, state: params.state, createTime: this.dateFormat() }
      this.userData.data.push(newData)
      this.message('创建用户成功！', 'success')
    },
    dateFormat() {
      const zeroize = function(value) {
        if (value < 10) {
          value = '0' + value
          return value
        } else {
          return value
        }
      }
      const currentTime = new Date()
      const year = currentTime.getFullYear()
      const month = zeroize(currentTime.getMonth() + 1)
      const day = zeroize(currentTime.getDate())
      const h = zeroize(currentTime.getHours())
      const m = zeroize(currentTime.getHours())
      const s = zeroize(currentTime.getSeconds())
      const createTime = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s
      console.log(createTime)
      return createTime
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val
      alert(val)
      this.toggle = val
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    finduserName() {
      this.userName = ''
    },
    delteSelected(val) {
      console.log(val)
    },
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonTest: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.userData.data.splice(index, 1)
        rows.splice(index, 1)
        this.message('success', '删除成功')
      }).catch(() => {
        this.message('', '取消删除')
      })
    },
    changeShowNumber(command) {
      this.showNumber = command
    },
    userDetailDialogVisible() {
      this.userDetailVisible = !this.userDetailVisible
    },
    handleGetUserDetail() {
      this.columnParam = userDetailColumn
      this.consoleParam = []
      this.userDetailDialogVisible()
    },
    handleUserDetailClose() {
      this.userDetailDialogVisible()
    }
  }
}
</script>
<style scoped>
.search-w250 {
    width: 250px;
}
.m-b8 {
    margin-bottom: 8px;
}
</style>
