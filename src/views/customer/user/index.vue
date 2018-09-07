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
        <gl-button size="small" @click="createUser">新增用户</gl-button>
        <gl-button size="small" @click="delteSelected">删除选中</gl-button>
        <user-form :dialogFormVisible="dialogFormVisible" @userFormData="handleUserForm"></user-form>
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
              this.dialogFormVisible = true
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
    })
  },
  methods: {
    // 接受子组件传递的值
    handleUserForm(params) {
      this.dialogFormVisible = false
      // this.userDataCreate(data)
      console.log(params)
    },
    // 新增按钮
    createUser() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 新增事件
    userDataCreate(data) {
      console.log(data)
      // const newData = { userId: '10' + data.length, userName: data.userName, actualName: data.actualName, isAdministrator: data.isAdministrator, phoneNumber: data.phoneNumber, status: data.status, }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    finduserName() {
      this.userName = ''
    },
    message(type, message) {
      this.$message({
        showClose: true,
        type: type,
        message: message
      })
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
.m-b8{
  margin-bottom: 8px;
}
</style>
