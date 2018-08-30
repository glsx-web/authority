<!-- roleManagement -->
<template>
  <div>
    <div class="default-style role-header">
      <gl-input class="role-input" placeholder="请输入角色名称" v-model="roleName" clearable></gl-input>
      <gl-button type="primary" @click="findRoleName">搜索</gl-button>
      <gl-button class="create-button" size="small" @click="createRole">创建</gl-button>
    </div>
    <hr style="height:1px;border:0px;background-color:#e7eaec">
    <div class="default-style">
      <gl-table :table="roleData"></gl-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      roleName: '',
      roleData: {
        data: [{
          id: '1032',
          name: '好车主',
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
        }]
      }
    }
  },
  methods: {
    findRoleName () {
      this.roleName = ''
    },
    createRole () {
      this.$alert('创建成功', '创建角色', {
        confirmButtonTest: '确定',
        callback: action => {
          this.$message({
            showClose: true,
            type: 'success',
            message: 'action: 创建成功'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.default-style {
    padding: 0px 25px;
}
.role-header {
    position: relative;
    margin-bottom: 20px;
}
.role-input {
    width: 40%;
    margin-right: 5px;
}
.create-button {
    position: absolute;
    right: 25px;
    bottom: 0px;
}
</style>
