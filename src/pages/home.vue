<template>
    <div class="home-content" ref="myElement">
      <v-tabs></v-tabs>
      <ul class="list">
        <router-link tag="li" :to="{path: 'detail', query: {id: item.id, title: item.title}}" v-for="item in topics_list" :key="item.id">
          <!--<router-link to="" tag="img" src="../assets/img/vue.png"></router-link>-->
          <img :src="item.author.avatar_url" alt="">
          <div class="li-rt">
            <div class="title">
              <span v-if="item.top">置顶</span>
              <span v-else-if="item.good">精华</span>
              <span v-else-if="item.tab === 'share'" :style="bgColor">分享</span>
              <span v-else-if="item.tab === 'ask'" :style="bgColor">问答</span>
              <span v-else-if="item.tab === 'job'" :style="bgColor">招聘</span>
              <h3>{{item.title}}</h3>
            </div>
            <div class="time">
              <span>{{item.reply_count}} / {{item.visit_count}}</span>
              <span>{{item.last_reply_at | timeAgo}}</span>
            </div>
          </div>
        </router-link>
        <!--<p class="nomore" v-show="nomore">没有更多了。。。</p>-->
        <v-loading v-if="loadingFlag"></v-loading>
      </ul>
      <mu-infinite-scroll :loadingText="loadingText" :scroller="scroller" :loading="load" @load="loadMore" />
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/css/common.styl"
  .home-content
    flex 1
    overflow-x hidden
    overflow-y auto
    margin pxTorem(104) 0 pxTorem(56)
    &::-webkit-scrollbar                //       去除滚动条样式
      width 0
    &::-webkit-scrollbar:horizontal
      height 0
    .list
      position relative
      li
        display flex
        padding pxTorem(12)
        position relative
        &:after
          content ''
          width 96%
          height 1px
          background-color #dcdcdc
          position absolute
          right 0
          bottom 0
        img
          width pxTorem(50)
          height pxTorem(50)
          margin-right pxTorem(12)
        .li-rt
          flex 1
          display flex
          flex-direction column
          justify-content space-between
          .title
            span
              background-color #369219
              color #fff
              padding pxTorem(2)
              border-radius pxTorem(3)
            h3
              display inline
              font-weight 600
          .time
            display flex
            justify-content space-between
            color #999
      .nomore
        text-align center
        padding pxTorem(10) 0
</style>
<script>
  import timeago from 'timeago.js'
  import { mapGetters } from 'vuex'
  import tabs from '../components/tabs.vue'
  import loading from '../components/loading.vue'
  export default{
    data () {
      return {
        bgColor: {
          backgroundColor: '#999'
        },
        loadingFlag: true,
        scroller: null,
        scrollValue: null,
        page: 1,
        loadingText: '加载中...'
      }
    },
    components: {
      'vTabs': tabs,
      'vLoading': loading
    },
    computed: {
      ...mapGetters([
        'topics_list',
        'tabs_Name',
        'load'
      ])
    },
    watch: {
      tabs_Name () {        //      监听tabs，切换时重新请求响应的数据
        this.page = 1
        this.loadingFlag = true
        this.$store.dispatch('getTopicsList', {tab: this.tabs_Name, page: 1})
        setTimeout(() => {
          this.loadingFlag = false
        }, 1000)
      }
    },
    created () {
      this.$store.dispatch('getTopicsList', {tab: this.tabs_Name, page: 1})
      setTimeout(() => {
        this.loadingFlag = false
      }, 1000)
    },
    mounted () {
      this.$nextTick(() => {
        this.$refs.myElement.addEventListener('scroll', this.getScroll)
        this.scroller = this.$el
      })
    },
    updated () {
      this.$nextTick(() => {
        this.scrollValue = 200
      })
    },
    methods: {
      getScroll () {
        this.scrollValue = this.$refs.myElement.scrollTop
      },
      loadMore () {
        this.$store.dispatch('loading', true)
        this.page += 1
        setTimeout(() => {
          this.$store.dispatch('getTopicsList', {tab: this.tabs_Name, page: this.page})
        }, 1000)
      }
    },
    filters: {
      timeAgo (val) {
        let time = new Date(val)
        let thisTime = timeago()
        return thisTime.format(time, 'zh_CN')  //  将UTC时间转换格式---> 几天前,几小时前...
      }
    }
  }
</script>
