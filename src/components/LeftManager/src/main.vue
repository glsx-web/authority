<template>
  <div class="menu-box box">
    <div class="title">{{title}}</div>
    <div class="console-btn">
        <div><gl-button @click="openAll(openOrClose)">{{openOrClose ? '全部展开' : '全部收起'}}</gl-button></div>
        <div><gl-button @click="pushSublings" type='primary' :disabled="value.push">添加同级菜单</gl-button></div>
        <div><gl-button @click="pushChildren" type='primary' :disabled="value.push">添加子菜单</gl-button></div>
    </div>
    <tree
      ref='tree'
      @node-click='nodeClick'
    ></tree>
  </div>
</template>

<script type='text/ecmascript-6'>
const timeTip = '系统自动生成(格式yyyy-MM-dd HH:mm:ss)'
export default {
  name: 'leftManager',
  data() {
    return {
      openOrClose: true
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
    }
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
      this.value.btnTxt = '保存'
      this.value.del = false
      for (const key in this.value.form) {
        this.value.form[key] = null
      }
      if (this.value.form.createTime !== undefined) {
        this.value.form.createTime = timeTip
        this.value.form.changeTime = timeTip
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