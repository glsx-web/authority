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
        <gl-button size="small" @click="createUser()">新增用户</gl-button>
        <gl-button size="small" @click="toggleRowSelection">删除选中</gl-button>
        <user-create :dialogFormVisible="dialogFormVisible" :userManageForm="userManageForm" @userFormData="handleUserFormData"></user-create>
      </div>
      <div class="m-b8">
        <gl-table :table="userData" ref="multipleTable"></gl-table>
        <gl-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10,20,30,40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </gl-pagination>
        <user-detail :userDetailVisible="userDetailVisible" :userDetailTitle="userDetailTitle" @userDetailClose="handleUserDetailClose" :apiParam="apiParam" :columnParam="columnParam" :consoleParam="consoleParam" :flagRoleOrUser="flagRoleOrUser"></user-detail>
      </div>
    </div>
  </div>
</template>

<script>
var consoleState = '禁用'
import { UserCreate, UserDetail } from '@/components/index'
// 接口
import { findAll, updateUser, getRoleList, batcheDelUser, operatUser, findDepartTree } from '@/api/api'
import { userForm, userDetailColumn } from '@/common/userConst'
export default {
  name: 'user',
  components: {
    UserCreate,
    UserDetail,
    updateUser,
    userForm
  },
  data() {
    return {
      userName: '',
      toggle: [],
      state: '0',
      departList: [],
      dialogFormVisible: false,
      userManageForm: this.$deep_clone(userForm),
      userDetailVisible: false,
      userDetailTitle: '用户详情',
      // 分页所需参数-start
      total: 10,
      pageNum: 1,
      pageSize: 10,
      // 分页所需参数-end
      columnParam: [],
      consoleParam: [],
      apiParam: Number,
      flagRoleOrUser: Boolean,
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
          prop: 'isadmin',
          formatter: (cellValue) => {
            return +cellValue.isadmin < 1 ? '否' : '是'
          }
        }, {
          label: '手机号码',
          prop: 'mobile'
        }, {
          label: '状态',
          prop: 'state',
          formatter: (cellValue) => {
            return +cellValue.state < 1 ? '禁止' : '启动'
          }
        }, {
          label: '创建时间',
          prop: 'createTime'
        }],
        number: {
          label: '序号',
          index: (index) => {
            ++index
            return index < 10 && index > 0 ? '0' + index : index
          }
        },
        console: {
          label: '操作',
          prop: 'operation',
          button: [{
            label: '编辑',
            type: 'text',
            callback: (index, rows) => {
              console.log(rows[index])
              this.createUser(rows[index])
            }
          }, {
            label: '详细',
            type: 'text',
            callback: (index, rows) => {
              this.handleGetUserDetail(index, rows)
            }
          }, {
            label: '禁用',
            type: 'text',
            formatter(cellValue) {
            },
            callback: (index, rows) => {
              // rows[index].state = '0'
              console.log(rows[index].state)
              this.$set(rows[index], 'state', '1')
              console.log(rows[index].state)
              // this.state = '1'
              // console.log(this.updateState())
              // this.updateState()
              // console.log(consoleState)
              // this.$alert(rows[index])
            }
          }, {
            label: '删除',
            type: 'text',
            callback: (index, rows) => {
              this.confirmDeleteOrNot(index, rows)
            }
          }]
        },
        selection: {},
        multipleSelection: []
      }
    }
  },
  mounted() {
    this.findUserList()
    this.getRoleOptions()
    findDepartTree.req().then(res => {
      this.departList = res
    })
  },
  watch: {
    userName(val) {
      !val && this.findUserList()
    }
  },
  methods: {
    // 获取所需字段
    getParams() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        keyWork: this.userName
      }
    },
    // 接口请求-start
    findUserList() {
      const params = this.getParams()
      findAll.req(params).then(res => {
        this.total = res.total
        this.userData.data = res.list
        console.log(this.userData.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 接口请求-end
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
    // 获取所有角色选项
    getRoleOptions() {
      getRoleList.req().then(res => {
        userForm.roleList = res.list
      })
    },
    // 新增更新用户接口请求
    updateUser_Post(params) {
      if (params) {
        updateUser.req(params).then(res => {
          console.log(res)
        }).catch(res => {
          console.log(res)
          // this.message(message, 'error')
        })
      }
    },
    // 删除用户接口
    batcheDel(params) {
      if (params) {
        batcheDelUser.req({ ids: params }).then(res => {
          this.findUserList()
        })
      } else {
        console.log('无数据！')
      }
    },
    // 删除、禁用、启用接口
    operatUser(params) {
      if (params) {
        operatUser.req(params).then(res => {
          this.findUserList()
        })
      } else {
        console.log('无数据！')
      }
    },
    // 接受子组件传递的值
    handleUserFormData(isflag, params) {
      this.dialogFormVisible = !this.dialogFormVisible
      this.userManageForm = {}
      !params && this.message('取消操作')
      params && !isflag && this.updateUser_Post(params) && this.message('已经添加用户！', 'success')
      params && isflag && this.updateUser_Post(params) && this.message('已经成功修改数据！', 'success')
    },
    // 新增按钮
    createUser(userManageForm) {
      this.userManageForm = {}
      if (userManageForm) {
        userManageForm.password = ''
        userManageForm.roleList = this.$deep_clone(userForm.roleList)
        // userManageForm.options = userForm.options
        userManageForm.state = userManageForm.state + ''
        userManageForm.isadmin = userManageForm.isadmin + ''
        this.departList.forEach(item => {
          if (item.id === userManageForm.departId) {
            userManageForm.departName = item.text
          }
        })
        Promise.all([findAll, getRoleList]).then((result) => {
          // error
          console.log(typeof (userManageForm.roles))
          if (userManageForm.roles && typeof (userManageForm.roles) === 'string') {
            console.log(userManageForm.roles)
            userManageForm.roles = (userManageForm.roles + '').split(',').map(role => +role)
          } else {
            userManageForm.roles = []
          }
          console.log(userManageForm.roles)
          // arr.forEach(index => {
          //   userManageForm.roleList.forEach(item => {
          //     if (+item.id === +index) {
          //       item.isSelect = true
          //       return false
          //     }
          //   })
          // })
          // userManageForm.roleList = [{ id: 1, roleName: 'aaa' }]
          this.userManageForm = this.$deep_clone(userManageForm)
        })
      } else {
        this.userManageForm = this.$deep_clone(userForm)
      }
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 编辑按钮
    editUser(row) {
    },
    // 获取选中的行
    handleSelectionChange(val, row) {
      this.toggle = val
    },
    // 删除选中的行
    toggleRowSelection() {
      const ids = []
      if (this.toggle) {
        this.toggle.forEach(row => {
          ids.push(row.id + '')
        })
        this.$confirm('确定要删除这条数据？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.batcheDel(ids.join(','))
        }).catch(() => {
          this.message('取消删除')
        })
      } else {
        this.message('', '操作失败')
      }
    },
    finduserName() {
      // this.userName = ''
      this.findUserList()
    },
    // 调取接口相关函数
    handleSizeChange(val) {
      this.pageSize = val
      this.findUserList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.findUserList()
    },
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除角色，根据返回的code值来判断是否删除成功(已有拦截器)
        this.operatUser({ id: rows[index].id, state: 2 })
      }).catch(() => {
        this.message('取消删除')
      })
    },
    userDetailDialogVisible() {
      this.userDetailVisible = !this.userDetailVisible
    },
    handleGetUserDetail(index, rows) {
      this.columnParam = userDetailColumn
      this.consoleParam = []
      this.flagRoleOrUser = false
      this.apiParam = rows[index]
      this.userDetailDialogVisible()
    },
    handleUserDetailClose() {
      this.userDetailDialogVisible()
      this.apiParam = Number
    },
    // 修改启用禁用
    updateState() {
      if (this.state === '0') {
        consoleState = '禁用'
        return consoleState
      } else {
        consoleState = '启用'
        return consoleState
      }
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
