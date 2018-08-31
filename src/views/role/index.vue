<!-- roleManagement -->
<template>
  <div>
    <div class="default-style role-header">
      <gl-input class="role-input" placeholder="请输入角色名称" v-model="roleName" clearable></gl-input>
      <gl-button type="primary" @click="findRoleName">搜索</gl-button>
    </div>
    <hr style="height:1px;border:0px;background-color:#e7eaec">
    <div class="default-style">
      <gl-button class="create-button" size="small" @click="createRole">创建</gl-button>
      <div class="dataTables-scroll">
        <gl-table :table="roleData"></gl-table>
      </div>
      <div>
        <label>显示
        <gl-dropdown>{{showNumber}}</gl-dropdown>条
        </label>
        <label>,&nbsp;共&nbsp;{{total}}&nbsp;条</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      roleName: '',
      showNumber: 10,
      showNumberList: [],
      total: 0,
      roleData: {
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
        }, {
          label: '操作',
          prop: 'operation'
        }]
      }
    }
  },
  mounted () {
    this.total = this.roleData.data.length
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
    position: relative;
    padding: 0px 25px;
}
.role-header {
    margin-bottom: 20px;
}
.dataTables-scroll{
  margin-bottom: 8px;
}
.role-input {
    width: 250px;
}
.create-button {
    position: absolute;
    right: 25px;
    top: -56px;
}
</style>
