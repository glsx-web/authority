<template>
  <div class="menu-box box">
    <div class="title">{{title}}</div>
    <div ref="topInfo" class="console-btn">
        <div><gl-button @click="openAll(openOrClose)">{{openOrClose ? '全部展开' : '全部收起'}}</gl-button></div>
        <div><gl-button @click="pushSublings" type='primary' :disabled="value.push">添加同级菜单</gl-button></div>
        <div><gl-button @click="pushChildren" type='primary' :disabled="value.push">添加子菜单</gl-button></div>
    </div>
    <gl-scroll :height='parseInt(this.$client_height() - this.height - 108)'>
    <tree
      ref='tree'
      @node-click='nodeClick'
      :isDepart='isDepart'
      :updateTree="value.updateTree"
    ></tree>
    </gl-scroll>
  </div>
</template>

<script type='text/ecmascript-6'>
const timeTip = '系统自动生成(格式yyyy-MM-dd HH:mm:ss)'
export default {
  name: 'leftManager',
  data() {
    return {
      openOrClose: true,
      height: ''
    }
  },
  props: {
    value: null,
    title: {
      type: String,
      default: '标题'
    },
    nodeClick: {
      type: Function,
      default: () => {
        return null
      }
    },
    isDepart: Boolean,
    eventBus: Object
  },
  mounted() {
    console.log()
    this.height = this.$refs.topInfo.offsetHeight
  },
  methods: {
    // 展开与关闭
    openAll(val) {
      this.searchChildren(this.$refs.tree.$children[0].$children[0].store._getAllNodes(), val)
      this.openOrClose = !this.openOrClose
    },
    searchChildren(data, val) {
      data.forEach(el => {
        this.$set(el, 'expanded', val)
        if (el.childNodes) {
          this.searchChildren(el.childNodes, val)
        }
      })
    },
    // 添加同级菜单
    pushSublings() {
      this.value.sublings = true
      this.clearFrom()
    },
    // 添加子菜单
    pushChildren() {
      this.value.children = true
      this.clearFrom()
    },
    clearFrom() {
      // console.log(this.value.form)
      this.value.showDetails = true
      this.value.btnTxt = '保存'
      this.value.del = false
      this.eventBus.$emit('update', this.$deep_clone(this.value.form))
      for (const key in this.value.form) {
        this.value.form[key] = null
      }
      if (this.value.form.createTime !== undefined) {
        this.value.form.createTime = timeTip
        this.value.form.updateTime = timeTip
      }
    }
  }
}
</script>

<style scoped>
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
    text-align: center;
  }
  .console-btn div button{
    width: 126px;
    box-sizing: border-box
  }
</style>