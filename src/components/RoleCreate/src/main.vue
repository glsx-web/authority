<!-- createRoleComponent -->
<template>
  <gl-dialog title="新增角色" :visible.sync="createVisible" :before-close="handleCreateCancel">
    <gl-form :model="createRuleForm" :rules="createRules" ref="createRuleForm" label-width="105px">
      <gl-form-item label="角色名称：" prop="roleName">
        <gl-input v-model="createRuleForm.roleName" clearable></gl-input>
      </gl-form-item>
      <gl-form-item label="角色描述：" prop="roleDescript">
        <gl-input v-model="createRuleForm.roleDescript" type="textarea" :rows="3" clearable></gl-input>
      </gl-form-item>
      <gl-form-item>
        <span style="position:absolute; right:35px; top:-20px;">{{createRuleForm.roleDescript.length}}</span>
        <span style="position:absolute; right:5px; top:-20px;">/200</span>
      </gl-form-item>
      <gl-form-item label="所属部门：" prop="department">
        <gl-select v-model="createRuleForm.department" placeholder="请选择">
          <gl-option label="运营平台" value="运营平台"></gl-option>
        </gl-select>
      </gl-form-item>
      <gl-form-item label="菜单选项："></gl-form-item>
    </gl-form>
    <div slot="footer" class="dialog-footer">
      <gl-button type="primary" @click="handleCreateSubmit('createRuleForm')">提交</gl-button>
      <gl-button @click="handleCreateCancel">取消</gl-button>
    </div>
  </gl-dialog>
</template>

<script>
import { roleCreateStructure } from '@/common/roleCommon'
export default {
  name: 'RoleCreate',
  props: {
    createVisible: Boolean,
    editParam: Object
  },
  watch: {
    createVisible(val) {
      !val && this.$refs['createRuleForm'].resetFields()
    },
    editParam(val) {
      if (val !== this.createRuleForm) {
        this.createRuleForm = this.$deep_clone(val)
      }
    }
  },
  data() {
    return {
      createRuleForm: roleCreateStructure,
      createRules: {
        roleName: [
          { required: true, message: '请输入角色名称！', trigger: 'blur' }
        ],
        roleDescript: [
          { required: true, message: '请输入角色描述！', trigger: 'blur' },
          { max: 200, message: '字数限制在200以内！', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请输入所属部门！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleCreateSubmit(formName) {
      const editData = this.$deep_clone(this.createRuleForm)
      // eidt:true;create:false
      const flagEOrC = editData.roleId
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('createClose', flagEOrC, editData)
        } else {
          return false
        }
      })
    },
    handleCreateCancel() {
      this.$emit('createClose')
    }
  }
}
</script>
<style scoped>
</style>
