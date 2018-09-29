<!-- createRoleComponent -->
<template>
  <gl-dialog :title="title" :visible.sync="createVisible" :before-close="handleCreateCancel">
    <gl-form :model="createRuleForm" :rules="createRules" ref="createRuleForm" label-width="105px">
      <gl-form-item label="角色名称：" prop="roleName">
        <gl-input v-model="createRuleForm.roleName" clearable></gl-input>
      </gl-form-item>
      <gl-form-item label="角色描述：" prop="description">
        <gl-input v-model="createRuleForm.description" type="textarea" :rows="3" clearable></gl-input>
      </gl-form-item>
      <gl-form-item>
        <span :class="numberErr? 'err': false" style="position:absolute; right:35px; top:-20px;">{{createRuleForm.description.length}}</span>
        <span style="position:absolute; right:5px; top:-20px;">/200</span>
      </gl-form-item>
      <gl-form-item label="所属部门：" prop="departName">
        <gl-select placeholder="请选择" v-model="createRuleForm.departName">
          <gl-option style="height:160px">
            <!-- <gl-input-tree :data=''></gl-input-tree> -->
            <tree ref='tree' :isDepart="isDepart" v-model="createRuleForm.departName" :defaultExpandAll="defaultExpandAll" @node-click='clickDepart' style="height:160px"></tree>
          </gl-option>
        </gl-select>
      </gl-form-item>
      <gl-form-item label="菜单选项：" prop="rights">
        <tree ref='tree' v-model="createRuleForm.rights" :show-checkbox="show_checkbox" :defaultExpandAll="defaultExpandAll" :defaultCheckedKeys="createRuleForm.rights" @input="getMenuOption" style="height:160px" :key="key"></tree>
      </gl-form-item>
    </gl-form>
    <div slot="footer" class="dialog-footer">
      <gl-button type="primary" @click="handleCreateSubmit('createRuleForm')">提交</gl-button>
      <gl-button @click="handleCreateCancel">取消</gl-button>
    </div>
  </gl-dialog>
</template>

<script>
// import { roleCreateStructure } from '@/common/commonConst'
export default {
  name: 'RoleCreate',
  props: {
    createVisible: Boolean,
    createRuleForm: Object,
    flagCOrE: [Boolean, Array, Function]
  },
  watch: {
    createVisible(val) {
      !val && this.$refs['createRuleForm'].resetFields()
      val && (this.key = Date.now())
    },
    flagCOrE(val) {
      this.title = val ? '新建角色' : '角色列表'
    },
    'createRuleForm.description.length'(val) {
      this.numberErr = val > 200 ? 1 : 0
    }
  },
  data() {
    return {
      isDepart: true,
      show_checkbox: true,
      defaultExpandAll: true,
      departName: [],
      numberErr: false,
      title: '',
      key1: Date.now(),
      createRules: {
        roleName: [
          { required: true, message: '请输入角色名称！', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述！', trigger: 'blur' },
          { max: 200, message: '字数限制在200以内！', trigger: 'blur' }
        ],
        departName: [
          { required: true, message: '请输入所属部门！', trigger: 'change' }
        ],
        rights: [
          { required: true, message: '请选择菜单选项！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // tree-strat
    getMenuOption(params) {
      this.createRuleForm.rights = params.treeData.checkedKeys
      // this.createRuleForm.rights = params.treeData.checkedKeys.concat(params.treeData.halfCheckedKeys)
    },
    clickDepart(data, treeData, vue, props) {
      if (data.parent !== '#' || !data.children) {
        this.createRuleForm.departId = data.id
        this.createRuleForm.departPath = data.type
        this.getDepartName(treeData)
        this.createRuleForm.departName = this.departName.join(' - ')
        this.departName = []
      }
    },
    getDepartName(params) {
      this.departName.unshift(params.data.text)
      if (params.data.parent !== '#') {
        this.getDepartName(params.parent)
      } else {
        return true
      }
    },
    // tree-end
    getParams() {
      return this.$deep_clone(this.createRuleForm)
    },
    handleCreateSubmit(formName) {
      const editData = this.getParams()
      // console.log(editData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('------------------------------')
          // for (const key in editData) {
          //   console.log(editData[key], typeof editData[key], key)
          // }
          // console.log('------------------------------')
          this.$emit('createClose', editData)
        } else {
          return false
        }
      })
    },
    handleCreateCancel() {
      this.$emit('createClose', false)
    }
  }
}
</script>
<style scoped>
.err {
    color: red;
}
</style>
