<template>
    <div class="detail">
      <div class="detail_header">
        <h3>
          <span class="tag" v-if="data.top">置顶</span>
          <span class="tag" v-else-if="data.good">精华</span>
          {{data.title}}
        </h3>
        <mu-checkbox v-if="token" v-model="collect" :label="collect_txt" class="checkbox" uncheckIcon="favorite_border" checkedIcon="favorite" />
        <div class="label">
          <span>发布于 {{data.create_at | timeAgo}}</span>
          <span>作者 {{data.author.loginname}}</span>
          <span>{{data.visit_count}} 次浏览</span>
          <span>来自 {{data.tab | tab}}</span>
        </div>
      </div>
      <article class="md_content" v-html="data.content"></article>
      <ul v-if="data.replies.length" class="replies">
        <li><span>{{data.replies.length}}</span> 条回复</li>
        <li class="reply" v-for="(list,index) in data.replies" :key="list.id">
          <section class="msg">
            <div class="author">
              <router-link to="" :src="list.author.avatar_url" tag="img" alt="user"></router-link>
              <span class="name">{{list.author.loginname}}</span>
              <span class="timer">{{index+1}}楼 • {{list.create_at | timeAgo}}</span>
            </div>
            <!-- 未登录状态下点赞 -->
            <div @click="openDialog" v-if="list.ups.length && !token" class="ups">
              <mu-icon value="thumb_up" :size="16" />
              <span>{{list.ups.length}}</span>
            </div>
            <!-- 登录状态下点赞 -->
            <div @click="openDialog" v-if="token" class="ups">
              <mu-icon @click="like(index)" value="thumb_up" :size="16" />
              <span>{{list.ups.length}}</span>
              <mu-icon @click="changeReply(index)" class="textsms" value="textsms" :size="16" />
            </div>
          </section>
          <p class="reContent" v-html="list.content"></p>
          <div v-if="token" class="reply_show" v-show="list.reply_show">
            <textarea v-model="single_reply" class="reply" placeholder="请输入回复内容..." rows="5"></textarea>
            <mu-raised-button @click="single_reply_content(index)" label="回复" class="demo-raised-button" primary/>
            <mu-raised-button @click="exit_single_reply_content(index)" label="取消" class="demo-raised-button" primary/>
          </div>
        </li>
      </ul>
      <ul v-if="token" class="replies">
        <li>添加回复</li>
        <li>
          <textarea v-model="reply" class="reply" placeholder="请输入回复内容..." rows="5"></textarea>
          <mu-raised-button @click="reply_content" label="回复" class="demo-raised-button" primary/>
        </li>
      </ul>
      <!-- 弹出提示框 -->
      <mu-dialog v-if="!token" :open="dialog" title="提示：" @close="closeDialog">
        请先登录，登录后即可点赞。
        <mu-flat-button class="detailBtn" slot="actions" @click="closeDialog" primary label="取消" />
        <mu-flat-button class="detailBtn" to="/login" slot="actions" @click="closeDialog" primary label="确定" />
      </mu-dialog>
      <mu-dialog :open="isReply" title="提示：" @close="closeDialog">
        {{tips}}
        <mu-flat-button slot="actions" @click="closeDialog" primary label="确定" />
      </mu-dialog>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/css/common.styl"
  .detail
    margin-top pxTorem(56)
    overflow-x hidden
    .detail_header
      padding pxTorem(12)
      h3
        margin 0
        margin-top .5rem
        font-weight 600
        font-size 20px
        .tag
          background-color #369219
          border-radius 0.08rem
          color #fff
          padding pxTorem(5)
      .checkbox
        margin-top pxTorem(10)
        .mu-checkbox-icon
          margin-right pxTorem(5)
        .mu-checkbox-label
          color #009688
      .label
        span
          font-size 12px
          color #999
          padding 0 pxTorem(3)
          &:before
            content '\2022'
            padding pxTorem(2)
    .md_content
      padding pxTorem(12)
      margin-bottom pxTorem(30)
      margin-top pxTorem(15)
      padding-top pxTorem(10)
      border-top 1px solid #ccc
    .replies
      li
        padding pxTorem(10)
        &:first-child
          background-color #f6f6f6
          span
            color #009688
        &.reply
          width 100%
          border-top 1px solid #eee
          .msg
            display flex
            align-items baseline
            justify-content space-between
            padding-bottom pxTorem(10)
            .author
              img
                width pxTorem(37.5)
                height pxTorem(37.5)
                vertical-align top
              .name
                font-weight 600
                color #666
              .timer
                color #079e90
            .ups
              display flex
              align-items center
              color #009688
              span
                margin-left pxTorem(3)
              .textsms
                margin-left pxTorem(10)
          .reContent
            margin-bottom pxTorem(10)
        textarea
          width 100%
</style>

<script>
  import timeago from 'timeago.js'
  import axios from 'axios'
  import Vue from 'vue'
  export default{
    data () {
      return {
        title: '',
        id: '',
        token: '',
        data: {
          author: {},
          replies: {}
        },
        collect: false,
        collect_txt: '收藏主题',
        loginname: '',
        reply: '',
        single_reply: '',
        isReply: false,
        dialog: false,
        tips: ''
      }
    },
    computed: {
      atitle () {
        return this.$store.state.detail.title
      }
    },
    created () {
      this.id = this.$route.query.id
      this.title = this.$route.query.title
      this.token = localStorage.getItem('accesstoken')
      this.loginname = localStorage.getItem('loginName')
      this.$store.dispatch('changeTitle', this.title)
      this.getData()
    },
    methods: {
      getData () {
        // 主题详情
        let url = 'https://www.vue-js.com/api/v1/topic/' + this.id
        axios.get(url).then((res) => {
          console.log(res)
          this.data = res.data.data
          //  每一项回复，添加标记
          this.data.replies.map((item) => {
            item.reply_show = false
          })
        })
        if (this.token) {
          this.isCollected()
        }
      },
      isCollected () {
        //  收藏
        axios.get('https://www.vue-js.com/api/v1/user/' + this.loginname)
          .then((res) => {
            // 获取收藏主题数组
            let arr = res.data.data.collect_topics
            //  本页主题id
            let collectId = this.data.id
            //  find 本页主题是否在已收藏列表
            arr.find((item) => {
              if (item.id === collectId) {
                this.collect = true
                this.collect_txt = '收藏主题'
              }
            })
          })
      },
      reply_content () {
        // 添加评论
        let id = this.$route.query.id
        let that = this
        axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies', {
          accesstoken: that.token,
          content: that.reply
        }).then((response) => {
          that.tips = '回复成功！'
          that.isReply = true
          setTimeout(() => {
            that.isReply = false
          }, 1500)
          that.getData()
          that.reply = ''
        }).catch(() => {
          that.tips = '请输入回复内容...'
          that.isReply = true
          setTimeout(() => {
            that.isReply = false
          }, 1500)
        })
      },
      like (index) {
        // 点赞
        let replyId = this.data.replies[index].id
        axios.post('https://www.vue-js.com/api/v1/reply/' + replyId + '/ups', {
          accesstoken: this.token
        }).then(() => {
          this.getData()
        })
      },
      changeReply (index) {
        // 点击对评论进行回复
        let arr = this.data.replies
        arr.map((item, i) => {
          index === i ? Vue.set(item, 'reply_show', true) : Vue.set(item, 'reply_show', false)
        })
        this.single_reply = '@' + this.data.replies[index].author.loginname + ' '
      },
      single_reply_content (index) {
        // 对评论的回复
        let id = this.$route.query.id
        let that = this
        axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies', {
          accesstoken: that.accesstoken,
          content: that.single_reply,
          reply_id: that.data.replies[index].id
        })
          .then(() => {
            that.tips = '回复成功！'
            that.isReply = true
            setTimeout(() => {
              that.isReply = false
            }, 1500)
            that.getData()
            that.single_reply = ''
          })
          .catch(() => {
            that.tips = '请输入回复内容...'
            that.isReply = true
            setTimeout(() => {
              that.isReply = false
            }, 1500)
          })
      },
      exit_single_reply_content (index) {
        //  取消对评论的回复，清空内容
        this.single_reply = ''
        let arr = this.data.replies
        arr[index].reply_show = false
        Vue.set(arr, index, arr[index])
      },
      openDialog () {
        this.dialog = true
      },
      closeDialog () {
        this.dialog = false
        this.isReply = false
      }
    },
    filters: {
      timeAgo (val) {
        let time = new Date(val)
        let thisTime = timeago()
        return thisTime.format(time, 'zh_CN')  //  将UTC时间转换格式---> 几天前,几小时前...
      },
      tab (val) {
        if (val === 'share') {
          return '分享'
        } else if (val === 'ask') {
          return '问答'
        } else if (val === 'job') {
          return '招聘'
        }
      }
    }
  }
</script>
