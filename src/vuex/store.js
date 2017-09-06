import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import login from './modules/login'
import publish from './modules/publish'
import detail from './modules/detail'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    login,
    publish,
    detail
  }
})
