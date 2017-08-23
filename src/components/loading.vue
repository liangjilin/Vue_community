<template>
    <div class="loading">
      <img src="../assets/img/loading_green.gif" alt="">
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/css/common.styl"
  .loading
    display flex
    align-items center
    justify-content center
    width 100%
    height pxTorem(507)
    position absolute
    top 0
    left 0
    background-color #fff
    img
      width pxTorem(50)
      height pxTorem(50)
</style>

<script>
  export default{
    data () {
      return {}
    }
  }
</script>
