<template>
  <div class="tree" :style="treeStyle">
     <gl-tree
      ref='tree'
      highlight-current
      :data='data'
      :show-checkbox='showCheckbox'
      node-key='id'
      :props='props'
      :default-expand-all='defaultExpandAll'
      @check='check'
      @node-click='nodeClick'
    ></gl-tree>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  data() {
    return {
      data: this.$get_session_config().resources || this.$get_session_config(),
      props: {
        label: 'title'
      }
    }
  },
  props: {
    showCheckbox: Boolean,
    value: null,
    defaultExpandAll: Boolean,
    treeStyle: null
  },
  methods: {
    nodeClick(data, treeData, vue) {
      this.$emit('node-click', data, treeData, vue, this.props)
    },
    check(data, treeData) {
      this.$emit('input', { data, treeData })
    }
  }
}
</script>
<style scoped>
  .tree{
    height: 550px;
    overflow-y: scroll;
  }
</style>
