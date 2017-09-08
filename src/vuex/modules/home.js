import api from '../../fetch/api'
import * as types from '../types'
const state = {
  tabsName: 'all',
  topics_list_state: [],
  loading: false
}

const getters = {
  tabs_Name: state => state.tabsName,
  topics_list: state => state.topics_list_state,
  load: state => state.loading
}

const actions = {
  getTopicsList ({commit}, data) {
    api.topicsList(data.tab, data.page).then(res => {
      if (data.page === 1) {
        commit(types.GET_TOPICS_LIST, res)
      }
      if (data.page !== 1 && res.data.length !== 0) {
        commit('concatData', res.data)
        commit('changeLoading', false)
      }
    })
  },
  loading ({commit}, value) {
    commit('changeLoading', value)
  }
}

const mutations = {
  changeTabsName (state, name) {
    state.tabsName = name
  },
  changeLoading (state, name) {
    state.loading = name
  },
  concatData (state, value) {
    state.topics_list_state = state.topics_list_state.concat(value)
  },
  [types.GET_TOPICS_LIST] (state, res) {
    state.topics_list_state = res.data
    // console.log(state.topics_list_state)
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
