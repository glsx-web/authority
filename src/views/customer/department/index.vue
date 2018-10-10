<!-- departmentManagement -->
<template>
  <gl-row :gutter="50" :style="{ height: height }" class="mentBox">
    <gl-col :span='8'>
      <left-manager :title='"部门列表"' isDepart v-model="department" :nodeClick='nodeClick'></left-manager>
    </gl-col>
    <gl-col :span='16'>
      <right-form :form='form' isDepart v-model="department"></right-form>
    </gl-col>
  </gl-row>
</template>

<script>
import { LeftManager, RightForm } from '@/components/index'
import { getDepartTreeNode } from '@/api/api'
export default {
  name: 'department',
  data() {
    return {
      height: 0,
      department: {
        updateTree: false,
        sublings: false,
        children: false,
        node: null,
        props: null,
        allNode: null,
        del: false,
        push: true,
        showDetails: false,
        btnTxt: '修改',
        data: [],
        form: {
          name: '',
          upDepartment: '',
          iorder: ''
        }
      },
      form: [
        { label: '部门名称', value: 'name' },
        { label: '上级部门', value: 'upDepartment', disabled: true },
        { label: '排序', value: 'iorder' }
      ]
    }
  },
  components: {
    LeftManager,
    RightForm
  },
  mounted() {
    this.height = this.$client_height() + 'px'
  },
  methods: {
    nodeClick(data, node, that, props) {
      this.department.showDetails = true
      if (node.level === 1) this.department.data = node.parent.data
      this.department.btnTxt = '修改'
      this.department.node = node
      this.department.allNode = data
      this.department.props = props
      this.department.sublings = false
      this.department.children = false
      this.department.del = true
      this.department.push = false
      this.department.form.upDepartment = node.level === 1 ? '广联赛讯' : node.parent.data[props.label]
      getDepartTreeNode.req({ id: data.id }).then(res => {
        this.department.form.id = res.id
        this.department.form.name = res.name
        this.department.form.iorder = res.iorder
        this.department.form.parentId = res.parentId
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
</style>
