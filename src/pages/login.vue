<template>
    <div class="container">
      <mu-text-field v-model="val" label="Access Token" :errorText="login_error" labelFloat/>
      <mu-raised-button @click="login()" label="登录" class="demo-raised-button" primary/>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/css/common.styl"
  .container
    display flex
    width 100%
    height pxTorem(480)
    flex-direction column
    justify-content center
    align-items center
    .mu-text-field
      width pxTorem(278)
      min-height pxTorem(72)
    .mu-raised-button
      width pxTorem(278)
</style>

<script>
  import { mapGetters } from 'vuex'
  export default{
    data () {
      return {
        val: ''
      }
    },
    computed: {
      ...mapGetters([
        'login_error',
        'userData'
      ])
    },
    methods: {
      login () {
        this.$store.dispatch('getUserData', this.val)
        setTimeout(() => {
          if (this.login_error === '') {
            localStorage.setItem('accesstoken', this.val)
            localStorage.setItem('loginName', this.userData.loginname)
            this.$router.push({path: '/mine'})
          }
        }, 1000)
      }
    }
  }
</script>
