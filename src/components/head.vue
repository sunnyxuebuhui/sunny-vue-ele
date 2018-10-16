<template>
  <div class="head">
    <header class="head_wrapper">
      <span class="icon">
        <i class="iconfont" :class="[isSearch ? 'icon-sousuo' : 'icon-changyonglogo40']"></i>
      </span>
      <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </section>
      <section class="head_center ell">
        <span>{{headTitle}}</span>
      </section>
      <section class="head_login"  @click="getUserInfo">
        <i class="iconfont icon-wode" v-if="userInfo"></i>
        <span v-else>登录|注册</span>
      </section>
    </header>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    props: {
      isSearch: {
        type: Boolean,
        default: true
      },
      goBack: {
        type: Boolean,
        default: false
      },
      signinUp: {
        type: Boolean,
        default: false
      },
      headTitle: {
        type: String,
        default: '请选择地址'
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      // 获取用户信息
      // this.getUserInfo()
    },
    methods: {
      getUserInfo() {

      },
      ...mapActions([
        // 'getUserInfo'
      ]),
    },
  }
</script>

<style scoped lang="stylus">
  .head
    position fixed
    top 0
    left 0
    z-index 99
    width 100%
    .head_wrapper
      position relative
      display flex
      padding 0 .2rem
      width 100%
      height .44rem
      align-items center
      color #fff
      font-size .2rem
      box-sizing border-box
      background-color #008de1
      >.icon
        position absolute
        left .2rem
        top 50%
        transform translateY(-50%)
        text-align left
        .icon-sousuo
          font-size .26rem
      .head_login
        position absolute
        right .2rem
        top 50%
        transform translateY(-50%)
        font-size .15rem
      .head_center
        padding 0 20% 0 10%
        flex 0 0 100%
        box-sizing border-box
        font-size .2rem
</style>