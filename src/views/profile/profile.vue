<template>
  <div class="profile_wrapper">
    <head-top :headTitle="headTitle" :isShowSearch="isShowSearch"  :signinUp="isSinginUp"></head-top>
    <div class="content">
      <div class="user_img">
        <div class="img_left">
          <i class="iconfont icon-yonghufangkeshu"></i>
        </div>
        <div class="text_right">
          <p class="text" v-if="!isSinginUp">登录/注册</p>
          <p class="text" v-else>账号</p>
          <p class="mobile">
            <i class="iconfont icon-shoujihao"></i>
            <span>暂无绑定手机号</span>
          </p>
        </div>
      </div>
    </div>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
  import HeadTop from '../../components/head.vue'
  import FooterGuide from '../../components/footer.vue'

  export default {
    components: {
      HeadTop,
      FooterGuide
    },
    data() {
      return {
        headTitle: '我的',
        isSinginUp: false,
        isShowSearch: false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .profile_wrapper
    width 100%
    height 100%
    .content
      margin-top .44rem
      .user_img
        display flex
        padding 0 .2rem
        align-items center
        width 100%
        height .88rem
        color #fff
        background-color #008de1
        box-sizing border-box
        .img_left
          flex 0 0 20%
          i
            font-size .5rem
        .text_right
          padding-left .1rem
          text-align left
          flex 0 0 80%
          .text
            font-size .18rem
            font-weight 700
          .mobile
            display flex
            align-items center
            text-align left
            i
              font-size .25rem
</style>