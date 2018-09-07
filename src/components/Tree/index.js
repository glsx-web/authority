import Tree from './src/main'
Tree.install = Vue => Vue.components(Tree.name, Tree)
export default Tree
