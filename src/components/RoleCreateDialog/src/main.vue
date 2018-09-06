<!-- createRoleComponent -->
<template>
  <gl-dialog title="新增角色" :visible.sync="createDialogVisible" :before-close="handleCreateCancel">
    <gl-form :model="createRuleForm" :rules="createRules" ref="createRuleForm" label-width="105px">
      <gl-form-item label="角色名称：" prop="name">
        <gl-input v-model="createRuleForm.name" clearable></gl-input>
      </gl-form-item>
      <gl-form-item label="角色描述：" prop="descript">
        <gl-input v-model="createRuleForm.descript" type="textarea" clearable></gl-input>
      </gl-form-item>
      <gl-form-item label="所属部门：" prop="department">
        <gl-select v-model="createRuleForm.department" placeholder="请选择">
          <gl-option label="运营平台" value="运营平台"></gl-option>
        </gl-select>
      </gl-form-item>
      <gl-form-item label="菜单选项："></gl-form-item>
      <gl-form-item>
        <gl-button type="primary" @click="handleCreateSubmit('createRuleForm')">提交</gl-button>
        <gl-button @click="handleCreateCancel">取消</gl-button>
      </gl-form-item>
    </gl-form>
  </gl-dialog>
</template>

<script>
export default {
  name: 'RoleCreateDialog',
  props: {
    createDialogVisible: {
      type: Boolean
    }
  },
  watch: {
    createDialogVisible(val) {
      !val && this.$refs['createRuleForm'].resetFields()
    }
  },
  data() {
    return {
      createRuleForm: {
        name: '',
        descript: '',
        department: '',
        menuOption: ''
      },
      createRules: {
        name: [
          { required: true, message: '请输入角色名称！', trigger: 'blur' }
        ],
        descript: [
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
    handleCreateSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('createDialogClose', this.createRuleForm)
          this.message('创建角色成功', 'success')
        } else {
          return false
        }
      })
    },
    handleCreateCancel() {
      this.$emit('createDialogClose')
      this.message('取消创建角色')
    }
  }
}
</script>
<style scoped>
</style>
