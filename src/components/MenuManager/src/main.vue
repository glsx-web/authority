<template>
  <gl-row :gutter="150">
    <gl-col :span='8'>
       <div class="menu-box box">
        <div class="title" v-html="title"></div>
        <div class="console-btn">
            <div><gl-button @click="openAll(openOrClose)">{{openOrClose ? '全部展开' : '全部收起'}}</gl-button></div>
            <div><gl-button @click="pushSublings" type='primary' :disabled="push">添加同级菜单</gl-button></div>
            <div><gl-button @click="pushChildren" type='primary' :disabled="push">添加子菜单</gl-button></div>
        </div>
        <tree
          ref='tree'
          @node-click='nodeClick'
        ></tree>
      </div>
    </gl-col>
    <gl-col :span='16' v-show="showDetails">
      <div class="details box">
        <div class="title">详情</div>
        <gl-form :model='form' class="content" label-width="150px">
          <gl-form-item label="名称" >
            <gl-input  v-model="form.name" ref="name"></gl-input>
          </gl-form-item>
          <gl-form-item label="主机自定义名称">
            <gl-input  v-model="form.newName"></gl-input>
          </gl-form-item>
          <gl-form-item label="打开模式">
            <gl-select v-model="form.open" style="width:100%">
              <gl-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </gl-option>
            </gl-select>
          </gl-form-item>
          <gl-form-item label="功能类型">
            <gl-select v-model="form.type" style="width:100%" placeholder="请选择功能类型">
              <gl-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </gl-option>
            </gl-select>
          </gl-form-item>
          <gl-form-item label="上级菜单">
            <gl-input  v-model="form.upMenu" disabled></gl-input>
          </gl-form-item>
          <gl-form-item label="菜单路径">
            <gl-input  v-model="form.url" disabled></gl-input>
          </gl-form-item>
          <gl-form-item label="路由">
            <gl-input  v-model="form.router"></gl-input>
          </gl-form-item>
          <gl-form-item label="基础路径">
            <gl-input  v-model="form.defaultUrl"></gl-input>
          </gl-form-item>
          <gl-form-item label="排序">
            <gl-input  v-model="form.index"></gl-input>
          </gl-form-item>
          <gl-form-item label="是否隐藏">
            <gl-switch v-model="form.Show"></gl-switch>
          </gl-form-item>
          <gl-form-item label="创建时间">
            <gl-input  v-model="form.createTime" disabled></gl-input>
          </gl-form-item>
          <gl-form-item label="修改时间">
            <gl-input  v-model="form.changeTime" disabled></gl-input>
          </gl-form-item>
          <gl-form-item>
            <gl-button type="primary" @click="submit">{{btnTxt}}</gl-button>
            <gl-button type="danger" v-show='del' @click="delData">删除</gl-button>
            <gl-button @click="showDetails = false" style="float:right">取消</gl-button>
          </gl-form-item>
        </gl-form>
      </div>
    </gl-col>
  </gl-row>
</template>

<script>
var timeTip = '系统自动生成(格式yyyy-MM-dd HH:mm:ss)'
export default {
  name: 'MenuManager',
  data() {
    return {
      data: [],
      props: null,
      openOrClose: true,
      node: null,
      btnTxt: '修改',
      allNode: null,
      push: true,
      del: true,
      showDetails: false,
      _children: false,
      _sublings: false,
      form: {
        name: '',
        newName: '',
        open: '新系统',
        type: '',
        upMenu: '',
        url: '',
        router: '',
        defaultUrl: '',
        index: '',
        Show: true,
        createTime: null,
        changeTime: null
      },
      options: [
        {
          value: '选项1',
          label: '本系统'
        },
        {
          value: '选项2',
          label: '新系统'
        }
      ],
      options2: [
        {
          value: '选项1',
          label: '菜单路由'
        },
        {
          value: '选项2',
          label: '菜单'
        },
        {
          value: '选项3',
          label: '按钮'
        }
      ]
    }
  },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  },
  watch: {
    'form.name'(val) {
      if (val !== '') this.$refs.name.$el.classList.remove('err')
    }
  },
  methods: {
    nodeClick(data, node, that, props) {
      if (node.level === 1) this.data = node.parent.data
      this.btnTxt = '修改'
      this.node = node
      this.allNode = data
      this.props = props
      this._sublings = false
      this._children = false
      this.del = true
      this.push = false
      this.showDetails = true
      this.form.name = data.label || data[props.label]
      this.form.upMenu = node.level === 1 ? '顶级菜单' : node.parent.data.label || node.parent.data[props.label]
      this.form.defaultUrl = data.path
      this.form.index = node.data.id
      this.form.createTime = data.createTime
      this.form.changeTime = data.changeTime
    },
    // 展开与关闭
    openAll(val) {
      this.searchChildren(this.$refs.tree.$children[0].$children[0].store._getAllNodes(), val)
      this.openOrClose = !this.openOrClose
    },
    searchChildren(data, val) {
      data.forEach(el => {
        el.expanded = val
        if (el.childNodes) {
          this.searchChildren(el.childNodes, val)
        }
      })
    },
    // 添加同级菜单
    pushSublings() {
      this.btnTxt = '保存'
      this._sublings = true
      this._children = false
      this.del = false
      this.showDetails = true
      for (const key in this.form) {
        this.form[key] = null
      }
      this.form.createTime = timeTip
      this.form.changeTime = timeTip
    },
    // 添加子菜单
    pushChildren() {
      this.btnTxt = '保存'
      this._children = true
      this._sublings = false
      this.del = false
      this.showDetails = true
      for (const key in this.form) {
        this.form[key] = null
      }
      this.form.createTime = timeTip
      this.form.changeTime = timeTip
    },
    // 删除
    delData() {
      for (let index = 0; index < this.node.parent.childNodes.length; index++) {
        if (this.node.parent.childNodes[index] === this.node) this.node.level === 1 ? this.node.parent.data.splice(index, 1) : this.node.parent.data.children.splice(index, 1)
      }
      this.$notify({
        title: '删除成功',
        type: 'success'
      })
      this.$set_session_config(this.data)
      this.showDetails = false
    },
    // 保存修改
    submit() {
      if (this.form.name !== '' && this.form.name !== null) {
        let arr = {}
        // 添加同级
        if (this._sublings) {
          arr = {
            id: this.form.index,
            level: this.node.level,
            createTime: new Date().format('yyyy-MM-dd HH:mm:ss')
          }
          arr[this.props.label] = this.form.name
          if (this.node.level === 1) {
            this.data.push(arr)
          } else {
            if (this.node.parent.data.children === undefined) this.$set(this.node.parent.data, 'children', [])
            this.node.parent.data.children.push(arr)
          }
        } else if (this._children) { // 添加子级
          arr = {
            id: this.form.index,
            level: this.node.level + 1,
            createTime: new Date().format('yyyy-MM-dd HH:mm:ss')
          }
          arr[this.props.label] = this.form.name
          if (this.allNode.children === undefined) this.$set(this.allNode, 'children', [])
          this.allNode.children.push(arr)
        } else { // 修改
          this.node.data.id = this.form.index
          this.node.data[this.props.label] = this.form.name
          if (this.node.data.changeTime === undefined) this.$set(this.node.data, 'changeTime', '')
          this.node.data.changeTime = new Date().format('yyyy-MM-dd HH:mm:ss')
        }
        this.showDetails = false
        this.$notify({
          title: '操作成功',
          type: 'success'
        })
        this.$set_session_config(this.data)
      } else {
        this.$refs.name.$el.classList.add('err')
      }
    }
  }
}
</script>
<style scoped>
  .content{
    padding: 15px;
  }
  .box{
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .title{
    color: #333;
    background-color: #f5f5f5;
    border-color: #ddd;
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
  .console-btn{
    padding: 15px;
    display: flex;
    flex-wrap:wrap;
    width: 100%;
    box-sizing: border-box;

  }
  .console-btn div{
    flex: 1;
    height: 40px;
    margin-bottom: 10px;
  }
  .err::after{
    content: '请填写列表名称';
    display: block;
    color: red;
  }
</style>
