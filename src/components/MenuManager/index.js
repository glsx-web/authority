import MenuManager from './src/main'
MenuManager.install = Vue => Vue.components(MenuManager.name, MenuManager)
export default MenuManager
