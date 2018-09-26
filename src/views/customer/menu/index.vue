<template>
  <gl-row :gutter="100">
    <gl-col :span='8'>
      <left-manager :title='"菜单列表"' v-model="menuMG" :node-click='nodeClick'></left-manager>
    </gl-col>
    <gl-col :span='16'>
      <right-form :form='form' v-model="menuMG"></right-form>
    </gl-col>
  </gl-row>
</template>

<script>
import { LeftManager, RightForm } from '@/components/index'
import { findMenuById } from '@/api/api'
export default {
  name: 'menuMG',
  data() {
    return {
      menuMG: {
        sublings: false,
        children: false,
        del: false,
        push: true,
        showDetails: false,
        btnTxt: '修改',
        node: null,
        props: null,
        allNode: null,
        data: [],
        form: {
          id: 0,
          urlName: '',
          hostName: '',
          openStyle: '新系统',
          menuType: '',
          name: '',
          path: '',
          url: '',
          baseUrl: '',
          iorder: null,
          isHidden: 0,
          createTime: null,
          updateTime: null,
          grade: 0,
          iconUrl: '',
          lastOperatorId: 0,
          lastOperatorName: '',
          parentId: 0,
          state: 0,
          title: ''
        }
      },
      form: [
        { label: '名称', value: 'urlName' },
        { label: '主机自定义名称', value: 'hostName' },
        {
          label: '打开模式',
          value: 'openStyle',
          type: 'select',
          options: [
            {
              value: 0,
              label: '本系统'
            },
            {
              value: 1,
              label: '新系统'
            }
          ]
        },
        {
          label: '功能类型',
          value: 'menuType',
          type: 'select',
          options: [
            {
              value: 0,
              label: '菜单路由'
            },
            {
              value: 1,
              label: '菜单'
            },
            {
              value: 2,
              label: '按钮'
            }
          ]
        },
        { label: '上级菜单', value: 'name', disabled: true },
        { label: '菜单路径', value: 'path', disabled: true },
        { label: '路由', value: 'url' },
        { label: '基础路径', value: 'baseUrl' },
        { label: '排序', value: 'iorder' },
        { label: '是否隐藏', value: 'isHidden', type: 'switch' },
        { label: '创建时间', value: 'createTime', disabled: true },
        { label: '修改时间', value: 'updateTime', disabled: true }
      ]
    }
  },
  components: {
    LeftManager,
    RightForm
  },
  methods: {
    nodeClick(data, node, that, props) {
      this.menuMG.showDetails = true
      if (node.level === 1) this.menuMG.data = node.parent.data
      this.menuMG.btnTxt = '修改'
      this.menuMG.node = node
      this.menuMG.allNode = data
      this.menuMG.props = props
      this.menuMG.sublings = false
      this.menuMG.children = false
      this.menuMG.del = true
      this.menuMG.push = false
      findMenuById.req({ id: data.id }).then(res => {
        // for (const key in res) {
        //   console.log(res[key], typeof res[key], key)
        // }
        // console.log(this.menuMG.allNode, this.menuMG.node)
        for (const key in this.menuMG.form) {
          if (key === 'isHidden') {
            this.menuMG.form[key] = res[key] === 0
          } else if (key === 'createTime' || key === 'updateTime') {
            this.menuMG.form[key] = new Date(res[key]).format('yyyy-MM-dd HH:mm:ss')
          } else if (key === 'name') {
            this.menuMG.form[key] = node.level === 1 ? '顶级菜单' : node.parent.data[props.label]
          } else {
            this.menuMG.form[key] = res[key]
          }
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>