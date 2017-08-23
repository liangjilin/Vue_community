<template>
  <mu-tabs class="tabs" :value="activeTab" @change="handleTabChange">
    <mu-tab value="all" title="全部" />
    <mu-tab value="good" title="精华" />
    <mu-tab value="weex" title="weex" />
    <mu-tab value="share" title="分享" />
    <mu-tab value="ask" title="问答" />
    <mu-tab value="job" title="招聘" />
  </mu-tabs>
</template>
<style lang="stylus" rel="stylesheet/stylus">

</style>
<script>
  export default{
    data () {
      return {}
    },
    computed: {
      activeTab () {
        return this.$store.getters.tabs_Name
      }
    },
    methods: {
      handleTabChange (val) {
        this.$store.commit('changeTabsName', val)
      }
    }
  }
</script>
