<template>
  <div id="app">
    <v-header :title="title">
      <img v-if="title === 'Vue.js中文社区'" slot="logo" class="logo" src="./assets/img/vue.png">
      <mu-icon-button @click="$router.go(-1)" class="back-btn" v-if="title === deTitle" icon="arrow_back" slot="backBtn"></mu-icon-button>
    </v-header>
    <router-view></router-view>
    <v-footer v-if="title !== deTitle"></v-footer>
  </div>
</template>

<script>
  import './assets/css/reset.css'
  import './assets/css/font-face.css'
  import './assets/css/font-icon.css'
  import header from './components/header.vue'
  import footer from './components/footer.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        detailTitle: ''
      }
    },
    components: {
      'vHeader': header,
      'vFooter': footer
    },
    computed: {
      ...mapGetters([                  //       详情的标题
        'deTitle'
      ]),
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
          case 'detail':
            return this.deTitle
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    display flex
    height 100vh
  .back-btn
    position absolute
    top 0
    left 0
</style>
