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
      <role-create :createVisible="createVisible" @createClose="handleCreateClose"></role-create>
      <div class="m-b8">
        <gl-table :table="roleData" :pagination="pagination"></gl-table>
      </div>
    </div>
  </div>
</template>

<script>
import { RoleCreate } from '@/components/index'
import { getInfo } from '@/api/user'
export default {
  name: 'role',
  components: {
    RoleCreate
  },
  data() {
    return {
      roleName: '',
      createVisible: false,
      roleData: {
        border: true,
        height: 400,
        data: [],
        column: [{
          label: '序号',
          prop: 'roleId'
        }, {
          label: '角色名字',
          prop: 'roleName'
        }, {
          label: '所属部门',
          prop: 'department'
        }, {
          label: '状态',
          prop: 'roleStatus'
        }, {
          label: '创建时间',
          prop: 'roleCreateTime'
        }],
        console: {
          label: '操作',
          prop: 'roleOptions',
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
      this.$confirm('确定要删除这条数据？', '', {
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
      const newData = { roleId: '1038', roleName: data.roleName, department: data.department, roleStatus: '开启', roleCreateTime: '' }
      this.roleData.data.push(newData)
    },
    handleFindRoleName() {
      this.roleName = ''
    },
    handleCreateRole() {
      this.createVisible = !this.createVisible
    },
    handleCreateClose(data) {
      this.createVisible = false
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
