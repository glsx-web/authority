<!-- userManagement -->
<template>
  <div>
    <div class="default m-b20">
      <gl-input class="search-w250" @keyup.enter.native="finduserName" placeholder="请输入用户名或姓名" v-model="userName" clearable></gl-input>
      <gl-button type="primary" @keyup.enter="finduserName" @click="finduserName">搜索</gl-button>
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
        <gl-table :table="userData" v-loading="laodingTable" gl-loading-text="拼命加载中" ref="multipleTable"></gl-table>
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
    userForm
  },
  data() {
    return {
      userName: '',
      toggle: [],
      isEdit: true,
      departList: [],
      row: {},
      dialogFormVisible: false,
      userManageForm: this.$deep_clone(userForm),
      userDetailVisible: false,
      loading: false,
      laodingTable: false,
      tipParams: '',
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
            callback: (index) => {
              this.editUser(index)
            }
          }, {
            label: '详细',
            type: 'text',
            callback: (index, rows) => {
              this.handleGetUserDetail(index)
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
                this.laodingTable = true
                if (rows[index].state < 1) {
                  this.operatUser({ id: rows[index].id, state: 1 }, rows, index)
                } else {
                  this.operatUser({ id: rows[index].id, state: 0 }, rows, index)
                }
              }).catch(() => {})
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
  created() {
    document.onkeydown = e => {
      if (e.keyCode === 13) {
        this.finduserName()
      }
    }
  },
  mounted() {
    this.findUserList()
  },
  watch: {
    userName(val) {
      if (!val) {
        this.laodingTable = true
        this.findUserList()
      }
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
        this.laodingTable = false
        this.tipParams = ''
      }).catch(err => {
        this.tipParams = ''
        this.laodingTable = false
        notice.errorTips(err)
      })
    },
    // 获取所有角色选项
    // getRoleOptions() {
    //   getRoleList.req().then(res => {
    //     userForm.roleList = res.list
    //   })
    // },
    // 获取部门树
    // getdepartData() {
    //   findDepartTree.req().then(res => {
    //     this.departList = res
    //     userForm.departList = fn(res, '#')
    //   })
    // },
    // 新增更新用户接口请求
    updateUser_Post(params) {
      this.loading = true
      updateUser.req(params).then(res => {
        this.emptyForm()
        this.laodingTable = true
        notice.okTips('操作成功')
        this.findUserList()
      }).catch(message => {
        // notice.errorTips(message)
        this.loading = false
      })
    },
    // 删除用户接口
    batcheDel(params) {
      this.laodingTable = true
      batcheDelUser.req({ ids: params }).then(res => {
        notice.okTips('删除成功')
        this.findUserList()
      }).catch(err => {
        this.laodingTable = false
        notice.errorTips(err)
      })
    },
    // 删除、禁用、启用接口f
    operatUser(params, rows, index) {
      operatUser.req(params).then(res => {
        switch (params.state) {
          case 0:
            this.$set(rows[index], 'state', '0')
            this.laodingTable = false
            notice.okTips(rows[index].username + '用户状态已禁用')
            break
          case 1:
            this.$set(rows[index], 'state', '1')
            this.laodingTable = false
            notice.okTips(rows[index].username + '用户状态已启动')
            break
          case 2:
            notice.okTips('删除成功')
            this.findUserList()
            break
        }
      }).catch(err => {
        this.laodingTable = false
        notice.errorTips(err)
      })
    },
    emptyForm() {
      this.loading = false
      this.handleUserFormVisible()
      clearTimeout(timer)
      var timer = setTimeout(() => {
        this.userManageForm = this.$deep_clone(userForm)
      }, 200)
    },
    // 接受子组件传递的值
    handleUserFormData(isEdit, params) {
      params && this.updateUser_Post(params)
      !params && this.emptyForm()
    },
    // 新增按钮
    createUser() {
      Promise.all([getRoleList.req(), findDepartTree.req()]).then(result => {
        userForm.departList = fn(result[1], '#')
        userForm.roleList = result[0].list
        this.userManageForm = this.$deep_clone(userForm)
      })
      this.handleUserFormVisible()
      this.isEdit = false
    },
    // 编辑按钮
    editUser(index) {
      const params = this.getParams()
      delete params.keyWork
      Promise.all([findAll.req(params), getRoleList.req(), findDepartTree.req()]).then(result => {
        this.row = result[0].list[index]
        this.row.password = null
        this.row.oldUserName = this.row.username
        this.row.roleList = this.$deep_clone(result[1].list)
        this.departList = result[2]
        userForm.departList = fn(result[2], '#')
        this.row.departList = this.$deep_clone(userForm.departList)
        this.departList.forEach(item => {
          if (item.id === this.row.departId) {
            this.row.departName = item.text
          }
        })
        if (this.row.roles && typeof (this.row.roles) === 'string') {
          this.row.roles = (this.row.roles + '').split(',').map(role => +role)
        } else if (this.row.roles && typeof (this.row.roles) === 'object') {
          this.row.roles
        } else {
          this.row.roles = []
        }
        this.userManageForm = this.$deep_clone(this.row)
      })
      this.handleUserFormVisible()
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
        ids.length
          ? this.$confirm('确定要删除这条数据？', '', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.batcheDel(ids.join(','))
          }).catch(err => {
            console.log(err)
          })
          : notice.warningTips('请选中你需要删除的用户')
      }
    },
    // 搜索
    finduserName() {
      this.laodingTable = true
      this.findUserList()
    },
    // 调取接口相关函数  分页
    handleSizeChange(val) {
      this.pageSize = val
      this.laodingTable = true
      this.findUserList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.laodingTable = true
      this.findUserList()
    },
    // 单行删除
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.laodingTable = true
        this.operatUser({ id: rows[index].id, state: 2 })
      }).catch(() => {
      })
    },
    findRolesName(params) {
      if (!params) return null
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
    handleGetUserDetail(index) {
      this.columnParam = userDetailColumn
      this.consoleParam = []
      this.flagRoleOrUser = false
      const params = this.getParams()
      delete params.keyWork
      Promise.all([findAll.req(params), getRoleList.req()]).then(result => {
        this.apiParam = this.$deep_clone(result[0].list[index])
        const params = this.apiParam.roles
        if (!params) {
          this.apiParam.roles = null
        } else {
          const nameArray = []
          const userRoles = (typeof (params) === 'string') ? params.split(',') : params
          userRoles.forEach(userItem => {
            result[1].list.forEach(item => {
              if (+userItem === item.id) {
                nameArray.push(item.roleName)
              }
            })
          })
          this.apiParam.roles = nameArray.join(',')
        }
        this.userDetailVisible = !this.userDetailVisible
      })
    },
    handleUserDetailClose() {
      this.userDetailVisible = !this.userDetailVisible
      this.apiParam = Object
    },
    handleUserFormVisible() {
      this.dialogFormVisible = !this.dialogFormVisible
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
