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
import { getInfo } from '@/api/user'
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
        data: [],
        column: [{
          label: '序号',
          prop: 'id'
        }, {
          label: '角色名字',
          prop: 'rolename'
        }, {
          label: '所属部门',
          prop: 'department'
        }, {
          label: '状态',
          prop: 'state'
        }, {
          label: '创建时间',
          prop: 'createtime'
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
  mounted() {
    getInfo.req('/roleList').then(res => {
      this.roleData.data = res.roleData
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
    confirmDeleteOrNot(index, rows) {
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
