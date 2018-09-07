import CreateUser from './src/main'

/* istanbul ignore next */
CreateUser.install = function(Vue) {
  Vue.component(CreateUser.name, CreateUser)
}
export default CreateUser
