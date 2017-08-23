<template>
  <div id="app">
    <v-header :title="title">
      <img v-if="title === 'Vue.js中文社区'" slot="logo" class="logo" src="./assets/img/vue.png">
    </v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import './assets/css/reset.css'
  import './assets/css/font-face.css'
  import './assets/css/font-icon.css'
  import header from './components/header.vue'
  import footer from './components/footer.vue'
  export default {
    name: 'app',
    components: {
      'vHeader': header,
      'vFooter': footer
    },
    computed: {
      title () {
        switch (this.$route.path.split('/')[1]) {
          case '':
            return 'Vue.js中文社区'
          case 'home':
            return 'Vue.js中文社区'
          case 'publish':
            return '发布话题'
          case 'message':
            return '消息'
          case 'mine':
            return '我的'
          case 'login':
            return '登录'
        }
      }
    }
  }
</script>

<style>
</style>
