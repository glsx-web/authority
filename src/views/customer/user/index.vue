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
        <user-edit :dialogFormVisible="dialogFormVisible" @userForm="handleUserForm"></user-edit>
      </div>
      <div class="m-b8">
        <gl-table :table="userData" ref="multipleTable" :pagination="pagination"></gl-table>
      </div>
    </div>
  </div>
</template>

<script>
import userEdit from '@/components/UserManagement'
export default {
  name: 'user',
  components: {
    userEdit
  },
  data() {
    return {
      userName: '',
      dialogFormVisible: false,
      userData: {
        border: true,
        align: 'center',
        height: 500,
        data: [{
          userId: '1000',
          userName: 'admin',
          actualName: '超级管理员',
          isAdministrator: '是',
          phoneNumber: '13760178357',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1001',
          userName: 'xusm',
          actualName: '徐少敏',
          isAdministrator: '否',
          phoneNumber: '18666296430',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1002',
          userName: 'liuhq',
          actualName: '刘华全',
          isAdministrator: '否',
          phoneNumber: '13480614473',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1003',
          userName: 'yangph',
          actualName: '杨培弘',
          isAdministrator: '否',
          phoneNumber: '13760178357',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1006',
          userName: 'moxq',
          actualName: '莫显强',
          isAdministrator: '否',
          phoneNumber: '15914085672',
          status: '禁用',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1007',
          userName: 'chenxue',
          actualName: '陈雪',
          isAdministrator: '否',
          phoneNumber: '13590251811',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1008',
          userName: 'zhangqi',
          actualName: '张琪',
          isAdministrator: '否',
          phoneNumber: '15889639514',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1009',
          userName: 'hugm',
          actualName: '胡庚美',
          isAdministrator: '否',
          phoneNumber: '13632791593',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1010',
          userName: 'lisk',
          actualName: '李水魁',
          isAdministrator: '否',
          phoneNumber: '15999572761',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1012',
          userName: 'fanhua',
          actualName: '范华',
          isAdministrator: '否',
          phoneNumber: '13798463989',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1013',
          userName: 'yangqw',
          actualName: 'yangqw',
          isAdministrator: '否',
          phoneNumber: '13590251811',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1014',
          userName: 'mj',
          actualName: '马俊',
          isAdministrator: '否',
          phoneNumber: '13590251811',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1015',
          userName: 'liujing',
          actualName: '刘静',
          isAdministrator: '否',
          phoneNumber: '13926572965',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          userId: '1016',
          userName: 'wuwt',
          actualName: '吴万添',
          isAdministrator: '否',
          phoneNumber: '18616756337',
          status: '开启',
          createTime: '2018-08-12 13:00:00'
        }],
        column: [{
          label: '用户序号',
          prop: 'userId'
          // width: '100'
        }, {
          label: '用户名',
          prop: 'userName'
          // width: '100'
        }, {
          label: '真实姓名',
          prop: 'actualName'
          // width: '100'
        }, {
          label: '管理员',
          prop: 'isAdministrator'
          // width: '100'
        }, {
          label: '手机号码',
          prop: 'phoneNumber'
          // width: '150'
        }, {
          label: '状态',
          prop: 'status'
          // width: '100'
        }, {
          label: '创建时间',
          prop: 'createTime'
          // width: '200'
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
              // this.$alert(rows[index])
              this.dialogFormVisible = true
              // console.log(this.dialogFormVisible)
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
  methods: {
    // 接受子组件传递的值
    handleUserForm(data) {
      this.dialogFormVisible = false
    },
    // 新增按钮
    createUser() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 新增事件
    // userDataCreate(data) {
    //   const newData = { id: '1038', userName: data.userName, actualName: data.actualName, isAdministrator: data.administrator, phoneNumber: data.phoneNumber, }
    // },
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
