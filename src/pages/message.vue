<template>
    <div class="container">
      <mu-tabs class="tabs" :value="msg" @change="handleTabChange">
        <mu-tab value="Unread" title="未读消息" />
        <mu-tab value="Read" title="过往消息" />
        <span v-if="count" class="count">（{{count}}）</span>
      </mu-tabs>
      <div class="content-msg" v-if="msg === 'Unread'">
        <!-- 未读消息列表 -->
        <ul v-if="token" class="lists">
          <router-link :to="{path:'/detail', query: {id: item.topic.id, title: item.topic.title}}" tag="li" class="list" v-for="item in unRead_messages" :key="item.id">
            <div class="user">
              <img :src="item.author.avatar_url" alt="user">
              <span>{{item.author.loginname}}</span>
            </div>
            <div class="content-msg">
              <h3 v-html="markdownChange(item.reply.content)"></h3>
              <p>来自：《{{item.topic.title}}》</p>
            </div>
            <div class="timer">
              <span>{{item.reply.create_at | timeAgo}}</span>
            </div>
          </router-link>
          <li v-if="!unRead_messages.length">暂无消息</li>
        </ul>
      </div>
      <div class="content-msg" v-if="msg === 'Read'">
        <!-- 已读消息列表 -->
        <ul v-if="token" class="lists">
          <router-link :to="{path:'/detail', query: {id: item.topic.id, title: item.topic.title}}" tag="li" class="list" v-for="item in read_messages" :key="item.id">
            <div class="user">
              <img :src="item.author.avatar_url" alt="user">
              <span>{{item.author.loginname}}</span>
            </div>
            <div class="content-msg">
              <h3 v-if="item.reply.content" v-html="markdownChange(item.reply.content)"></h3>
              <h3 v-if="!item.reply.content">此内容已被作者删除</h3>
              <p>来自：《{{item.topic.title}}》</p>
            </div>
            <div v-if="item.reply.content" class="timer">
              <span>{{item.reply.create_at | timeAgo}}</span>
            </div>
          </router-link>
          <li v-if="!read_messages.length">暂无消息</li>
        </ul>
      </div>
      <mu-raised-button class="btn" v-if="count" v-show="msg === 'Unread'" @click="mark_all" label="标记全部已读" icon="done_all" primary/>
      <mu-dialog :open="!token" title="请先登录">
        <mu-flat-button slot="actions" primary to="/" label="取消" />
        <mu-flat-button slot="actions" primary to="/login" label="确定" />
      </mu-dialog>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../assets/css/common.styl"
  .container
    width 100%
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
      .count
        display block
        position absolute
        font-size 12px
        left 33%
        top pxTorem(16)
        color #ff0000
    .content-msg
      .lists
        .list
          display flex
          justify-content space-between
          background-color #f6f6f6
          padding pxTorem(10)
          margin-bottom pxTorem(10)
          .user
            img
              display block
              width pxTorem(50)
              height pxTorem(50)
              border-radius 50%
            span
              text-align center
              max-width 100%
              word-wrap break-word
              word-break normal
          .content-msg
            width pxTorem(180)
            h3
              width 100%
              font-weight 600
              margin-bottom pxTorem(3)
            p
              color #999
              font-size 12px
          .timer
            span
              color #009688
</style>
<script>
  import axios from 'axios'
  import timeago from 'timeago.js'
  import marked from 'marked'
  export default{
    data () {
      return {
        msg: 'Unread',
        token: '',
        count: null,
        unRead_messages: [],
        read_messages: []
      }
    },
    created () {
      this.token = localStorage.getItem('accesstoken')
      if (this.token) {
        this.getData()
      }
    },
    filters: {
      timeAgo (val) {
        let time = new Date(val)
        let thisTime = timeago()
        return thisTime.format(time, 'zh_CN')  //  将UTC时间转换格式---> 几天前,几小时前...
      }
    },
    methods: {
      handleTabChange (val) {
        this.msg = val
      },
      getData () {
        let url = 'https://www.vue-js.com/api/v1/messages?accesstoken=' + this.token
        axios.get(url).then((res) => {
          //  获取已读和未读消息
//          console.log(res.data.data)
          this.unRead_messages = res.data.data.hasnot_read_messages
          this.read_messages = res.data.data.has_read_messages
        })
        axios.get('https://www.vue-js.com/api/v1/message/count?accesstoken=' + this.token).then((res) => {
          //  获取未读消息数量
          this.count = res.data.data
        })
      },
      markdownChange (val) {
        return marked(val)
      },
      mark_all () {
        axios.post('https://www.vue-js.com/api/v1/message/mark_all', {
          accesstoken: this.token
        }).then(() => {
          this.getData()
        })
      }
    }
  }
</script>
