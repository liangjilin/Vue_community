import api from '../../fetch/api'
import * as types from '../types'
const state = {
  tabsName: 'all',
  topics_list_state: []
}

const getters = {
  tabs_Name: state => state.tabsName,
  topics_list: state => state.topics_list_state
}

const actions = {
  getTopicsList ({commit}, tabs) {
    api.topicsList(tabs).then(res => {
      commit(types.GET_TOPICS_LIST, res)
    })
  }
}

const mutations = {
  changeTabsName (state, name) {
    state.tabsName = name
  },
  [types.GET_TOPICS_LIST] (state, res) {
    state.topics_list_state = res.data
    console.log(state.topics_list_state)
  }
}

export default{
  state,
  getters,
  actions,
  mutations
}
