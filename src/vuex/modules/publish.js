/**
 * Created by Ausu on 2017/9/4.
 */
// import api from '../../fetch/api'
// import * as types from '../types'

const state = {
  // resultValue: false,
  // tips: ''
}
const getters = {
  // publishResult: state => state.resultValue,
  // tips: state => state.tips
}
const actions = {
  // setTopice ({commit}, data) {
  //   api.publish(data.token, data.title, data.tab, data.content).then(res => {               传参数的时候报title为空，不知道为什么，所以直接在页面请求
  //     console.log(res.success)
  //     commit(types.PUBLISH_TOPICS, res.success)
  //   }).catch(() => {
  //     state.resultValue = true
  //     state.tips = '发布失败'
  //   })
}
  // closeDialog () {
  //   state.resultValue = false
  // }
// }
const mutations = {
  // [types.PUBLISH_TOPICS] (state, value) {
  //   state.resultValue = value
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
