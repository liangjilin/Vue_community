//     axios配置
import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000     //    响应时间
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'              //    配置请求头
axios.defaults.headers = {'X-Requested-With': 'XMLHttpRequest'}
axios.defaults.baseURL = 'https://www.vue-js.com/api/v1'   //  配置接口地址

//  POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
  //   在发送请求之前做某件事
  if (config.method === 'get') {
    config.data = qs.stringify(config.data)
  }
  return config
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error)
})

//  返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  // 对响应数据做些事
  if (res.statusText !== 'OK') {
    return Promise.reject(res)
  }
  return res
}, (error) => {
  console.log('网络异常')
  return Promise.reject(error)
})
// 返回一个Promise(发送post请求)
export function fetch (url, params, method) {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default{
  topicsList (tabName, page) {
    return fetch('/topics?tab=' + tabName, {page: page}, 'get')
  },
  login (token) {
    return fetch('/accesstoken', {accesstoken: token}, 'post')
  },
  user (name) {
    return fetch('/user/' + name, {}, 'get')
  }
  // publish (token, title, tab, content) {
  //   return fetch('/topics', {accesstoken: token, title: title, tab: tab, content: content}, 'post')          传参数的时候报title为空，不知道为什么，所以直接在页面请求
  // }
}
