<template>
    <div class="container">
      <mu-select-field v-model="list" :labelFocusClass="['label-foucs']" label="选择板块:">
        <mu-menu-item v-for="(text,index) in lists" :key="index" :value="index" :title="text" />
      </mu-select-field>
      <mu-text-field v-model="title" class="text" label="标题" hintText="标题字数 10字以上" />
      <mu-text-field v-model="content" class="content" hintText="文章支持 Markdown 语法, 请注意标记代码" multiLine :rows="5" :underlineShow="false" />
      <mu-raised-button @click="setTopics" label="发布话题" class="btn-submit" icon="near_me" primary/>
      <mu-dialog :open="!token" title="请先登录">
        <mu-flat-button slot="actions" primary to="/" label="取消" />
        <mu-flat-button slot="actions" primary to="/login" label="确定" />
      </mu-dialog>
      <mu-dialog :open="publishValue" :title=tips>
        <mu-flat-button slot="actions" primary @click="closeDialog" label="确定" />
      </mu-dialog>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../assets/css/common.styl"
  .mu-dialog-wrapper
    .mu-dialog
      .mu-dialog-title
        justify-content center
        font-size 20px
        padding pxTorem(24) pxTorem(24) pxTorem(20)
        line-height pxTorem(32)
      .mu-dialog-body
        padding 0
      .mu-dialog-actions
        min-height pxTorem(48)
        padding pxTorem(8)
        justify-content center
        .mu-flat-button
          width 50%
          height pxTorem(36)
          line-height pxTorem(36)
          color #009688
          &:first-child
            background-color #f0f0f0
          &:nth-child(2)
            background-color #009688
            .mu-flat-button-label
              color #fff
</style>
<script>
//  import { mapGetters } from 'vuex'
  import axios from 'axios'
  export default{
    data () {
      return {
        token: '',
        list: 0,
        lists: ['分享', '问答', '招聘'],
        title: '',
        content: '',
        publishValue: false,
        tips: ''
      }
    },
    created () {
      this.token = localStorage.getItem('accesstoken')
    },
//    computed: {
//      ...mapGetters([
//        'publishResult',
//        'tips'
//      ])
//    },
    methods: {
      setTopics () {
        if (this.list === 0) {
          this.tab = 'share'
        } else if (this.list === 1) {
          this.tab = 'ask'
        } else if (this.list === 2) {
          this.tab = 'job'
        }
//        this.$store.dispatch('setTopice',        传参数的时候报title为空，不知道为什么，所以直接在页面请求
//          {
//            token: this.token,
//            title: this.title,
//            tab: this.tab,
//            content: this.content
//          }
//        )
        axios.post('https://www.vue-js.com/api/v1/topics', {
          accesstoken: this.token,
          title: this.title,
          tab: this.tab,
          content: this.content
        }).then((res) => {
          this.title = ''
          this.content = ''
          this.tips = '发表成功！'
          this.publishValue = true
          setTimeout(() => {
            this.publishValue = false
          }, 1500)
        }).catch(() => {
          this.tips = '发表失败！'
          this.publishValue = true
        })
      },
      closeDialog () {
        this.title = ''
        this.tab = ''
        this.content = ''
//        this.$store.dispatch('closeDialog')
      }
    }
  }
</script>
