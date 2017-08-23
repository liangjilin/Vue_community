<template>
    <div class="home-content">
      <v-tabs></v-tabs>
      <v-list></v-list>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
<script>
  import tabs from '../components/tabs.vue'
  import list from '../components/list.vue'

  export default{
    data () {
      return {}
    },
    components: {
      'vTabs': tabs,
      'vList': list
    }
  }
</script>
