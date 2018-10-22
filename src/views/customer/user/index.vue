<!-- userManagement -->
<template>
  <div>
    <div class="default m-b20">
      <gl-input class="search-w250" placeholder="请输入用户名或姓名" v-model="userName" clearable></gl-input>
      <gl-button type="primary" @click="finduserName">搜索</gl-button>
    </div>
    <div class="default p-t15">
      <div class="control-tabledata-button">
        <gl-button size="small" @click="createUser()">新增用户</gl-button>
        <gl-button size="small" @click="toggleRowSelection">删除选中</gl-button>
        <user-create 
          :dialogFormVisible="dialogFormVisible" 
          :userManageForm="userManageForm" 
          :isEdit="isEdit" 
          :loading="loading"
          @userFormData="handleUserFormData">
        </user-create>
      </div>
      <div class="m-b8">
        <gl-table :table="userData" ref="multipleTable"></gl-table>
        <gl-pagination background
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="pageNum" 
          :page-sizes="[10,20,30,40]" 
          :page-size="pageSize" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="total">
        </gl-pagination>
        <user-detail 
          :userDetailVisible="userDetailVisible" 
          :userDetailTitle="userDetailTitle" 
          @userDetailClose="handleUserDetailClose" 
          :apiParam="apiParam" 
          :columnParam="columnParam" 
          :consoleParam="consoleParam" 
          :flagRoleOrUser="flagRoleOrUser">
        </user-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { UserCreate, UserDetail } from '@/components/index'
// 接口
import { findAll, updateUser, getRoleList, batcheDelUser, operatUser, findDepartTree } from '@/api/api'
import { userForm, userDetailColumn, fn } from '@/common/commonConst'
import notice from '@/common/notice'
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
      isEdit: true,
      departList: [],
      dialogFormVisible: false,
      userManageForm: this.$deep_clone(userForm),
      userDetailVisible: false,
      loading: false,
      userDetailTitle: '用户详情',
      // 分页所需参数-start
      total: 10,
      pageNum: 1,
      pageSize: 10,
      // 分页所需参数-end
      columnParam: [],
      consoleParam: [],
      apiParam: Object,
      flagRoleOrUser: Boolean,
      userData: {
        select: this.handleSelectionChange,
        border: true,
        align: 'center',
        height: parseInt(this.$client_height() - 140),
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
            return +cellValue.state < 1 ? '禁用' : '启动'
          }
        }, {
          label: '创建时间',
          prop: 'createTime',
          formatter: (cellValue) => {
            if (cellValue.createTime) {
              return new Date(cellValue.createTime).format('yyyy-MM-dd HH:mm:ss')
            }
          }
        }],
        number: {
          label: '序号',
          width: '50px',
          index: (index) => {
            ++index
            return index < 10 && index > 0 ? '0' + index : index
          }
        },
        console: {
          show: true,
          label: '操作',
          prop: 'operation',
          button: [{
            label: '编辑',
            type: 'text',
            callback: (index, rows) => {
              this.editUser(rows[index])
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
            formatter(row) {
              return row.state < 1 ? '启动' : '禁用'
            },
            callback: (index, rows) => {
              this.$confirm('确定要修改这条数据？', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                if (rows[index].state < 1) {
                  this.$set(rows[index], 'state', '1')
                  this.operatUser({ id: rows[index].id, state: 1 })
                } else {
                  this.$set(rows[index], 'state', '0')
                  this.operatUser({ id: rows[index].id, state: 0 })
                }
                notice.okTips('修改成功')
              }).catch(() => {
                notice.errorTips('修改失败')
              })
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
    this.getdepartData()
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
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取所有角色选项
    getRoleOptions() {
      getRoleList.req().then(res => {
        userForm.roleList = res.list
      })
    },
    // 获取部门树
    getdepartData() {
      findDepartTree.req().then(res => {
        this.departList = res
        userForm.departList = fn(res, '#')
      })
    },
    // 新增更新用户接口请求
    updateUser_Post(params) {
      updateUser.req(params).then(res => {
        notice.okTips('操作成功')
        this.emptyForm()
        this.loading = false
        this.findUserList()
      }).catch(message => {
        notice.errorTips(message)
        this.loading = false
      })
    },
    // 删除用户接口
    batcheDel(params) {
      batcheDelUser.req({ ids: params }).then(res => {
        this.findUserList()
      })
    },
    // 删除、禁用、启用接口f
    operatUser(params) {
      operatUser.req(params).then(res => {
        (params.state === 2) && this.findUserList()
      })
    },
    emptyForm() {
      this.dialogFormVisible = !this.dialogFormVisible
      clearTimeout(timer)
      var timer = setTimeout(() => {
        this.userManageForm = this.$deep_clone(userForm)
      }, 200)
    },
    // 接受子组件传递的值
    handleUserFormData(isEdit, params) {
      this.loading = true
      params && this.updateUser_Post(params)
      !params && this.emptyForm()
    },
    // 新增按钮
    createUser() {
      this.loading = false
      this.userManageForm = this.$deep_clone(userForm)
      this.dialogFormVisible = !this.dialogFormVisible
      this.isEdit = false
    },
    // 编辑按钮
    editUser(row) {
      this.loading = false
      row.password = ''
      row.roleList = this.$deep_clone(userForm.roleList)
      row.departList = this.$deep_clone(userForm.departList)
      row.state = row.state + ''
      row.isadmin = row.isadmin + ''
      this.departList.forEach(item => {
        if (item.id === row.departId) {
          row.departName = item.text
        }
      })
      Promise.all([findAll, getRoleList]).then((result) => {
        if (row.roles && typeof (row.roles) === 'string') {
          row.roles = (row.roles + '').split(',').map(role => +role)
        } else if (row.roles && typeof (row.roles) === 'object') {
          row.roles
        } else {
          row.roles = []
        }
        this.userManageForm = this.$deep_clone(row)
      })
      this.dialogFormVisible = !this.dialogFormVisible
      this.isEdit = true
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
          notice.okTips('删除成功')
        }).catch(err => {
          notice.errorTips(err)
          // console.log('error')
        })
      }
    },
    // 搜索
    finduserName() {
      this.findUserList()
    },
    // 调取接口相关函数  分页
    handleSizeChange(val) {
      this.pageSize = val
      this.findUserList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.findUserList()
    },
    // 单行删除
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operatUser({ id: rows[index].id, state: 2 })
        notice.okTips('成功删除该用户')
      }).catch(() => {
      })
    },
    findRolesName(params) {
      var nameArray = []
      const userRoles = params.split(',')
      userRoles.forEach(userItem => {
        userForm.roleList.forEach(item => {
          if (+userItem === item.id) {
            nameArray.push(item.roleName)
          }
        })
      })
      return nameArray.join(',')
    },
    // 详细操作
    handleGetUserDetail(index, rows) {
      this.columnParam = userDetailColumn
      this.consoleParam = []
      this.flagRoleOrUser = false
      this.apiParam = this.$deep_clone(rows[index])
      this.apiParam.roles = this.findRolesName(this.apiParam.roles)
      this.userDetailVisible = !this.userDetailVisible
    },
    handleUserDetailClose() {
      this.userDetailVisible = !this.userDetailVisible
      this.apiParam = Object
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
