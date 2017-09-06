/**
 * Created by Ausu on 2017/9/5.
 */
const state = {
  title: ''
}
const getters = {
  deTitle: (state) => state.title
}
const actions = {
  changeTitle: ({commit}, value) => {
    commit('titleFun', value)
  }
}
const mutations = {
  titleFun (state, val) {
    state.title = val
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
