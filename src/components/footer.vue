<template>
  <mu-paper class="footer">
    <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
      <mu-bottom-nav-item to="/" value="首页" title="首页" icon="home" />
      <mu-bottom-nav-item to="/publish" value="发布" title="发布" icon="subject" />
      <mu-bottom-nav-item to="/message" value="消息" title="消息" icon="message" />
      <mu-bottom-nav-item :to="mine_path" value="我的" title="我的" icon="person" />
    </mu-bottom-nav>
  </mu-paper>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/css/common.styl"
  .footer
    width 100%
    position absolute
    bottom 0
    left 0
    z-index 1000
    .mu-bottom-nav
      height pxTorem(56)
      background-color #fff
      .mu-buttom-item
        color #757575
        padding pxTorem(8) pxTorem(12) pxTorem(10)
        min-width pxTorem(56)
        max-width pxTorem(168)
        .mu-buttom-item-wrapper
          .mu-bottom-item-icon
            width pxTorem(24)
        &.mu-bottom-item-active
          min-width pxTorem(96)
          max-width pxTorem(168)
          padding-top pxTorem(6)
          padding-bottom pxTorem(5)
          padding-right pxTorem(12)
          padding-left pxTorem(12)
          .mu-bottom-item-icon,.mu-bottom-item-text
            color #009688
</style>

<script>
  export default{
    data () {
      return {
        bottomNav: '首页',
        mine_path: '/mine'
      }
    },
    created () {
      this.toPath()
    },
    watch: {
      '$route': 'toPath'
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      },
      toPath () {
        let toKen = localStorage.getItem('accesstoken')    //   判断是否有登录的token，如果没有就到登录页面，如果有则到我的页面
        if (toKen) {
          this.mine_path = '/mine'
        } else {
          this.mine_path = '/login'
        }
        if (this.$route.path.split('/')[1] === 'login') {         //     publish页面中--点击确定跳转到login页面，响应的要到我的导航栏去
          this.bottomNav = '我的'
        }
        if (this.$route.path.split('/')[1] === '') {        //     publish页面中--点击取消跳转到home页面，响应的要到首页home导航栏去
          this.bottomNav = '首页'
        }
        if (this.$route.path.split('/')[1] === 'mine') {        //   我的点击主题或者回复跳到detail页面后，返回，触发我的选项卡高亮
          this.bottomNav = '我的'
        }
        if (this.$route.path.split('/')[1] === 'message') {        //   我的点击主题或者回复跳到detail页面后，返回，触发我的选项卡高亮
          this.bottomNav = '消息'
        }
      }
    }
  }
</script>
