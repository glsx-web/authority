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
        <gl-button type="danger" v-show='value.del' @click="dialog = true ">删除</gl-button>
        <gl-button @click='value.showDetails = false' style="float:right">取消</gl-button>
      </gl-form-item>
    </gl-form>
    <gl-dialog
        title="提示"
        :visible.sync="dialog"
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
import { delDepartment, delMenu, editMenu } from '@/api/api'
export default {
  name: 'rightForm',
  data() {
    return {
      dialog: false
    }
  },
  props: {
    value: null,
    form: {
      type: Array,
      default: () => []
    },
    isDepart: Boolean
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    // 删除
    delData() {
      delete this.value.form['name']
      console.log(this.value.form)
      this.isDepart
        ? delDepartment.req(this.value.form).then(res => {
          this.$notify({
            title: '删除成功',
            type: 'success'
          })
          this.dialog = false
          this.value.showDetails = false
        }).catch(err => {
          console.log(err)
        })
        : delMenu.req(this.value.form).then(res => {
          console.log(res)
          this.$notify({
            title: '删除成功',
            type: 'success'
          })
          this.dialog = false
          this.value.showDetails = false
        }).catch(err => {
          console.log(err)
        })
    },
    cancel() {
      this.dialog = false
      this.$notify({
        title: '已取消',
        type: 'info'
      })
    },
    // 保存修改
    submit() {
      delete this.value.form['name']
      if (this.value.form[this.form[0].value] !== '' && this.value.form[this.form[0].value] !== null) {
        // 添加同级
        if (this.value.sublings) {
          console.log(1)
        // 添加子级
        } else if (this.value.children) {
          console.log(2)
        // 修改
        } else {
          editMenu.req(this.value.form).then(res => {
            console.log(res)
            this.$notify({
              title: '操作成功',
              type: 'success'
            })
          }).catch(err => {
            console.log(err)
          })
        }
        this.value.showDetails = false
      } else {
        this.$refs.urlName[0].$el.classList.add('err')
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