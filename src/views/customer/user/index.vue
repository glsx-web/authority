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
        <gl-button size="small" @click="delteSelected(index[rows])">删除选中</gl-button>
        <!-- <user-form :dialogFormVisible="dialogFormVisible" :editUser="editUser" @userFormData="handleUserFormData"></user-form> -->
      </div>
      <div class="m-b8">
        <gl-table :table="userData" ref="multipleTable"></gl-table>
        <gl-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10,20,30,40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </gl-pagination>
        <!-- <user-detail :userDetailVisible="userDetailVisible" :userDetailTitle="userDetailTitle" @userDetailClose="handleUserDetailClose" :resParam="[]" :columnParam="columnParam" :consoleParam="consoleParam"></user-detail> -->
        <user-detail :userDetailVisible="userDetailVisible" :userDetailTitle="userDetailTitle" @userDetailClose="handleUserDetailClose" :apiParam="apiParam" :columnParam="columnParam" :consoleParam="consoleParam" :flagRoleOrUser="flagRoleOrUser"></user-detail>
      </div>
    </div>
  </div>
</template>

<script>
import { UserForm, UserDetail } from '@/components/index'
// 接口
import { findAll } from '@/api/api'
import { userDetailColumn } from '@/common/commonConst'
export default {
  name: 'user',
  components: {
    UserForm,
    UserDetail
  },
  data() {
    return {
      userName: '',
      dialogFormVisible: false,
      editUser: {},
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
              this.handleGetUserDetail(index, rows)
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
              this.$alert(rows[index])
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
  },
  methods: {
    // 获取所需字段
    getParams() {
      return {
        // pageSize: this.pageSize,
        // pageNum: this.pageNum,
        username: this.userName
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
      this.multipleSelection = val
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
    delteSelected(index, rows) {
      console.log(rows)
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
    handleGetUserDetail(index, rows) {
      this.columnParam = userDetailColumn
      this.consoleParam = []
      this.flagRoleOrUser = false
      this.apiParam = rows[index].id
      this.userDetailDialogVisible()
    },
    handleUserDetailClose() {
      this.userDetailDialogVisible()
      this.apiParam = Number
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
