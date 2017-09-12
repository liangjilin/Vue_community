<template>
    <div class="container">
      <div class="mine">
        <div v-if="userDetail">
          <img :src="userDetail.avatar_url" alt="">
          <div class="userInfo">
            <h3 class="userName">{{userDetail.loginname}}</h3>
            <p class="integral">积分：95</p>
            <p class="introduce">“这家伙很懒，什么个性签名都没有留下。”</p>
          </div>
        </div>
      </div>
      <div class="bgDiv"></div>
      <mu-list class="mine-list" v-if="userDetail.recent_topics">
        <mu-list-item :title="'最近主题(' + userDetail.recent_topics.length + ')'" inset toggleNested :open="false">
          <mu-icon class="icon" slot="left" value="insert_drive_file" />
          <mu-list-item v-for="item in userDetail.recent_topics" :to="{path:'/detail',query:{id:item.id, title: item.title}}" :key="item.id" :title="item.title" slot="nested">
            <mu-icon class="icon" slot="left" value="insert_comment" />
          </mu-list-item>
        </mu-list-item>
        <mu-list-item :title="'最近回复(' + userDetail.recent_replies.length + ')'" inset toggleNested :open="false">
          <mu-icon class="icon" slot="left" value="drafts" />
          <mu-list-item v-for="item in userDetail.recent_replies" :to="{path:'/detail',query:{id:item.id, title: item.title}}" :key="item.id" :title="item.title" slot="nested">
            <mu-icon class="icon" slot="left" value="insert_comment" />
          </mu-list-item>
        </mu-list-item>
        <mu-list-item :title="'收藏主题(' + userDetail.collect_topics.length + ')'" inset toggleNested :open="false">
          <mu-icon class="icon" slot="left" value="folder" />
          <mu-list-item v-for="item in userDetail.collect_topics" :to="{path:'/detail',query:{id:item.id, title: item.title}}" :key="item.id" :title="item.title" slot="nested">
            <mu-icon class="icon" slot="left" value="insert_comment" />
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/css/common.styl"
  .container
    padding 0
    .mine
      display flex
      align-items center
      width 100%
      height pxTorem(200)
      background url("../assets/img/mineBg.jpg") no-repeat
      background-size cover
      overflow hidden
      font-size 0
      img
        display inline-block
        width pxTorem(70)
        height pxTorem(70)
        border-radius 50%
        border 2px solid #ffffff
        margin 0 pxTorem(25)
        vertical-align top
      .userInfo
        width pxTorem(255)
        display inline-block
        color #fff
        font-size 14px
        .integral
          border-bottom 1px solid #fff
          padding-bottom pxTorem(5)
          margin-bottom pxTorem(5)
    .bgDiv
      height pxTorem(10)
      background-color #cecece
</style>
<script>
  import { mapGetters } from 'vuex'
  export default{
    data () {
      return {
        loginname: ''
      }
    },
    computed: {
      ...mapGetters([
        'userDetail'
      ])
    },
    created () {
      this.loginname = localStorage.getItem('loginName')
      this.$store.dispatch('getUserDetail', this.loginname)
    }
  }
</script>
