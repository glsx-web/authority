<!-- departmentManagement -->
<template>
    <gl-row :gutter="100">
    <gl-col :span='8'>
      <left-manager :title='"部门列表"' v-model="department" :nodeClick='nodeClick'></left-manager>
    </gl-col>
    <gl-col :span='16'>
      <right-form :form='form' v-model="department"></right-form>
    </gl-col>
  </gl-row>
</template>

<script>
import { LeftManager, RightForm } from '@/components/index'
export default {
  name: 'department',
  data() {
    return {
      department: {
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
          index: ''
        }
      },
      form: [
        { label: '部门名称', value: 'name' },
        { label: '上级部门', value: 'upDepartment', disabled: true },
        { label: '排序', value: 'index' }
      ]
    }
  },
  components: {
    LeftManager,
    RightForm
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
      this.department.form.name = data[props.label]
      this.department.form.upDepartment = node.level === 1 ? '广联赛讯' : node.parent.data[props.label]
      this.department.form.index = node.data.id
    }
  }
}
</script>
<style scoped>
</style>
