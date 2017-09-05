import api from '../../fetch/api'
import * as types from '../types'

const state = {
  userData_state: [],           //  登录验证
  login_error_state: '',      //  登录提醒
  userDetail_state: []       //  用户详情
}

const getters = {
  userData: state => state.userData_state,
  login_error: state => state.login_error_state,
  userDetail: state => state.userDetail_state
}

const actions = {
  getUserData ({commit}, token) {
    api.login(token).then(res => {
      state.login_error_state = ''
      commit(types.GET_USER_DATA, res)
    }).catch(() => {
      state.login_error_state = 'accesstoken错误，请重新输入'
    })
  },
  getUserDetail ({commit}, name) {
    api.user(name).then(res => {
      commit(types.GET_USER_DETAIL, res)
    })
  }
}

const mutations = {
  [types.GET_USER_DATA] (state, res) {
    state.userData_state = res
    // console.log(state.userData_state)
  },
  [types.GET_USER_DETAIL] (state, res) {
    state.userDetail_state = res.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
