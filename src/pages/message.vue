<template>
    <div class="container">
      <mu-tabs class="tabs" :value="msg" @change="handleTabChange">
        <mu-tab value="Unread" title="未读消息" />
        <mu-tab value="Read" title="过往消息" />
      </mu-tabs>
      <div class="content-msg" v-if="msg === 'Unread'">
        无消息
      </div>
      <div class="content-msg" v-if="msg === 'Read'">
        有消息
      </div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/css/common.styl"
  .container
    margin-top pxTorem(104)
    .tabs
      .mu-tab-link
        &:first-child
          &:after
            content ''
            width 1px
            height pxTorem(20)
            background-color #e2e2e2
            position absolute
            right -1px
</style>
<script>
  export default{
    data () {
      return {
        msg: 'Unread'
      }
    },
    methods: {
      handleTabChange (val) {
        this.msg = val
      }
    }
  }
</script>
