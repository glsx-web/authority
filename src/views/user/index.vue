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
      </div>
      <div class="m-b8">
        <gl-table :table="userData"></gl-table>
      </div>
      <div>
        <label>显示
          <gl-dropdown split-button size="small" class="m-rl8" @command="changeShowNumber">
            {{showNumber}}
            <gl-dropdown-menu slot="dropdown" class="w-75">
              <gl-dropdown-item command="10">10</gl-dropdown-item>
              <gl-dropdown-item command="20">20</gl-dropdown-item>
              <gl-dropdown-item command="30">30</gl-dropdown-item>
              <gl-dropdown-item command="40">40</gl-dropdown-item>
            </gl-dropdown-menu>
          </gl-dropdown>条
        </label>
        <label>,&nbsp;共&nbsp;{{total}}&nbsp;条</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      userName: '',
      showNumber: 10,
      showNumberList: [],
      total: 0,
      userData: {
        border: true,
        data: [{
          id: '1032',
          name: '好车主',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1033',
          name: '运营平台',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1034',
          name: '精品车主',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1035',
          name: '云商分润',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1036',
          name: '营销系统',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }],
        column: [{
          label: '序号',
          prop: 'id'
        }, {
          label: '角色名字',
          prop: 'name'
        }, {
          label: '所属部门',
          prop: 'department'
        }, {
          label: '状态',
          prop: 'state'
        }, {
          label: '创建时间',
          prop: 'createTime'
        }],
        console: {
          label: '操作',
          prop: 'operation',
          button: [{
            label: '编辑',
            type: 'text',
            callback: (index, rows) => {
              this.$alert(rows[index])
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
              this.confirmDeleteOrNot(index)
            }
          }, {
            label: '用户',
            type: 'text',
            callback: (index, rows) => {
              this.$alert(rows[index])
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.total = this.userData.data.length
  },
  methods: {
    finduserName () {
      this.userName = ''
    },
    message (type, message) {
      this.$message({
        showClose: true,
        type: type,
        message: message
      })
    },
    createUser () {
    },
    delteSelected () {
    },
    confirmDeleteOrNot (index) {
      this.$confirm('确定要删除这条数据？', '', {
        confirmButtonTest: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.userData.data.splice(index, 1)
        this.message('success', '删除成功')
      }).catch(() => {
        this.message('', '取消删除')
      })
    },
    changeShowNumber (command) {
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
