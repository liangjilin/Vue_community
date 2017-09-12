<template>
  <mu-appbar :title=title>
    <mu-icon-button icon="back" slot="left">
      <slot name="logo"></slot>
      <slot name="backBtn"></slot>
    </mu-icon-button>
    <mu-icon-menu icon="more_vert" slot="right" v-if="title === 'Vue.js中文社区'">
      <a>
        <mu-menu-item title="关于"/>
      </a>
    </mu-icon-menu>
    <mu-icon-menu icon="more_vert" slot="right" v-if="title === '我的'">
      <a>
        <mu-menu-item title="退出登录" @click="logOut()"/>
      </a>
    </mu-icon-menu>
  </mu-appbar>
</template>

<script>
export default {
  props: {
    title: String
  },
  data () {
    return {}
  },
  methods: {
    logOut () {
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('loginName')
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/css/common.styl"
  .mu-appbar
    position fixed
    top 0
    left 0
    height pxTorem(56)
    padding 0 pxTorem(8)
    .mu-icon-button
      width pxTorem(48)
      height pxTorem(48)
      padding pxTorem(12)
    .mu-appbar-title
      line-height pxTorem(56)
    .right
      width 1.28rem
  .mu-appbar
    background-color #39716a!important
    .mu-appbar-title
      text-align center
  .mu-popover
    .mu-menu-item-wrapper
      height pxTorem(32)
      .mu-menu-item-title
        width 100%
        text-align center
        line-height pxTorem(32)
</style>
