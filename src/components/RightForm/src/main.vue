<template>
  <div class="details box" v-show="value.showDetails">
    <div class="title">详情</div>
    <gl-form :model='value.form' class="content" label-width="120px" size="mini">
      <gl-form-item v-for="(i, index) in form" :key="index" :label='i.label'>
        <gl-select 
          v-if="i.type === 'select'"  
          v-model="value.form[i.value]"
          style="width:100%"
          :placeholder="i.placeholder"
          :disabled="i.disabled">
          <gl-option
            v-for="item in i.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </gl-option>
        </gl-select>
        <gl-switch 
          v-else-if="i.type === 'switch'" 
          v-model="value.form[i.value]" 
          :disabled="i.disabled">
        </gl-switch>
        <gl-input
          :ref='i.value'
          v-else 
          v-model="value.form[i.value]" 
          :disabled="i.disabled">
        </gl-input>
      </gl-form-item>
      <gl-form-item>
        <gl-button type="primary" @click="submit">{{value.btnTxt}}</gl-button>
        <gl-button type="danger" v-show='value.del' @click="centerDialogVisible = true ">删除</gl-button>
        <gl-button @click='value.showDetails = false' style="float:right">取消</gl-button>
      </gl-form-item>
    </gl-form>
    <gl-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div style="text-align:center">确定是否要删除</div>
        <span slot="footer">
            <gl-button @click="cancel">取 消</gl-button>
            <gl-button type="primary" @click="delData">确 定</gl-button>
        </span>
    </gl-dialog>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  name: 'rightForm',
  data() {
    return {
      centerDialogVisible: false
    }
  },
  props: {
    value: null,
    form: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    'value.form.name'(val) {
      if (val !== '') this.$refs.name[0].$el.classList.remove('err')
    }
  },
  methods: {
    // 删除
    delData() {
      for (let index = 0; index < this.value.node.parent.childNodes.length; index++) {
        if (this.value.node.parent.childNodes[index] === this.value.node) this.value.node.level === 1 ? this.value.node.parent.data.splice(index, 1) : this.value.node.parent.data.children.splice(index, 1)
      }
      this.$notify({
        title: '删除成功',
        type: 'success'
      })
      this.centerDialogVisible = false
      this.$set_session_config(this.value.data)
      this.value.showDetails = false
    },
    cancel() {
      this.centerDialogVisible = false
      this.$notify({
        title: '已取消',
        type: 'info'
      })
    },
    // 保存修改
    submit() {
      if (this.value.form.name !== '' && this.value.form.name !== null) {
        let arr = {}
        // 添加同级
        if (this.value.sublings) {
          arr = {
            id: this.value.form.index,
            level: this.value.node.level,
            createTime: new Date().format('yyyy-MM-dd HH:mm:ss')
          }
          arr[this.value.props.label] = this.value.form.name
          if (this.value.node.level === 1) {
            this.value.data.push(arr)
          } else {
            if (this.value.node.parent.data.children === undefined) this.$set(this.value.node.parent.data, 'children', [])
            this.value.node.parent.data.children.push(arr)
          }
        // 添加子级
        } else if (this.value.children) {
          arr = {
            id: this.value.form.index,
            level: this.value.node.level + 1,
            createTime: new Date().format('yyyy-MM-dd HH:mm:ss')
          }
          arr[this.value.props.label] = this.value.form.name
          if (this.value.allNode.children === undefined) this.$set(this.value.allNode, 'children', [])
          this.value.allNode.children.push(arr)
        // 修改
        } else {
          this.value.node.data.id = this.value.form.index
          this.value.node.data[this.value.props.label] = this.value.form.name
          if (this.value.node.data.changeTime === undefined) this.$set(this.value.node.data, 'changeTime', '')
          this.value.node.data.changeTime = new Date().format('yyyy-MM-dd HH:mm:ss')
        }
        this.value.showDetails = false
        this.$notify({
          title: '操作成功',
          type: 'success'
        })
        this.$set_session_config(this.value.data)
      } else {
        this.$refs.name[0].$el.classList.add('err')
      }
    }
  }
}
</script>

<style scoped>
  .content{
    padding: 15px;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
  .err::after{
    content: '请填写列表名称';
    display: block;
    color: red;
  }
</style>