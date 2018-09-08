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
        <gl-button size="small" @click="delteSelected">删除选中</gl-button>
        <user-form :dialogFormVisible="dialogFormVisible" :editUser="editUser" @userFormData="handleUserFormData"></user-form>
      </div>
      <div class="m-b8">
        <gl-table :table="userData" ref="multipleTable" :pagination="pagination"></gl-table>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserCreate'
import { getInfo } from '@/api/user'
export default {
  name: 'user',
  components: {
    UserForm
  },
  data() {
    return {
      userName: '',
      dialogFormVisible: false,
      editUser: {},
      userData: {
        border: true,
        align: 'center',
        height: 500,
        data: [],
        column: [{
          label: '用户序号',
          prop: 'userId'
        }, {
          label: '用户名',
          prop: 'userName'
        }, {
          label: '真实姓名',
          prop: 'actualName'
        }, {
          label: '管理员',
          prop: 'isAdministrator'
        }, {
          label: '手机号码',
          prop: 'phoneNumber'
        }, {
          label: '状态',
          prop: 'status'
        }, {
          label: '创建时间',
          prop: 'userCreateTime'
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
              this.$alert(rows[index])
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
    getInfo.req('/userList').then(res => {
      this.userData.data = res.userData
      console.log(this.userData.data)
    })
  },
  methods: {
    // 接受子组件传递的值
    handleUserFormData(params) {
      this.dialogFormVisible = false
      params && this.userDataCreate(params)
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
      const newData = { userId: '100' + this.userData.data.length, userName: params.userName, actualName: params.actualName, isAdministrator: params.isAdministrator, phoneNumber: params.phoneNumber, status: params.status, userCreateTime: this.dateFormat() }
      this.userData.data.push(newData)
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
      this.userName = ''
    },
    delteSelected() {
    },
    confirmDeleteOrNot(index, rows) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonTest: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userData.data.splice(index, 1)
        rows.splice(index, 1)
        this.message('success', '删除成功')
      }).catch(() => {
        this.message('', '取消删除')
      })
    },
    changeShowNumber(command) {
      this.showNumber = command
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
