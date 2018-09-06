<!-- roleManagement -->
<template>
  <div>
    <div class="default m-b20">
      <gl-input class="search-w250" placeholder="请输入角色名称" v-model="roleName" clearable></gl-input>
      <gl-button type="primary" @click="handleFindRoleName">搜索</gl-button>
    </div>
    <hr>
    <div class="default p-t15">
      <gl-button class="control-tabledata-button" size="small" @click="handleCreateRole">创建</gl-button>
      <role-create-dialog :createDialogVisible="createDialogVisible" @createDialogClose="handleCreateDialogClose"></role-create-dialog>
      <div class="m-b8">
        <gl-table :table="roleData" :pagination="pagination"></gl-table>
      </div>
    </div>
  </div>
</template>

<script>
import { RoleCreateDialog } from '@/components/index'
export default {
  name: 'role',
  components: {
    RoleCreateDialog
  },
  data() {
    return {
      roleName: '',
      createDialogVisible: false,
      roleData: {
        border: true,
        height: 500,
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
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
          department: '研发中心-网络软件部',
          state: '开启',
          createTime: '2018-08-12 13:00:00'
        }, {
          id: '1037',
          name: 'test',
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
              this.confirmDeleteOrNot(index, rows)
            }
          }, {
            label: '用户',
            type: 'text',
            callback: (index, rows) => {
              this.$alert(rows[index])
            }
          }]
        }
      },
      pagination: {
        show: true,
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
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
    confirmDeleteOrNot(index, rows) {
      alert('?????')
      this.$confirm('确定要删除这条数据？', '11', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.roleData.data.splice(index, 1)
        rows.splice(index, 1)
        this.message('删除成功', 'success')
      }).catch(() => {
        this.message('取消删除')
      })
    },
    dateFormat() {
      const currentTime = new Date()
      const date = currentTime.toLocaleDateString().split('/').forEach((item) => { console.log(item) })
      console.log(date)
    },
    roleDataEdit(data) {
      this.dateFormat()
      const newData = { id: '1038', name: data.name, department: data.department, state: '开启', createTime: '' }
      this.roleData.data.push(newData)
    },
    handleFindRoleName() {
      this.roleName = ''
    },
    handleCreateRole() {
      this.createDialogVisible = !this.createDialogVisible
    },
    handleCreateDialogClose(data) {
      this.createDialogVisible = false
      data && this.roleDataEdit(data)
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
