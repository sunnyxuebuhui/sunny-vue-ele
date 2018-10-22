<template>
  <div class="head">
    <header class="head_wrapper">
      <span class="icon" v-if="isShowSearch">
        <i class="iconfont" :class="[isSearch ? 'icon-sousuo' : 'icon-changyonglogo40']"></i>
      </span>
      <section class="head_goback icon" v-else @click="$router.go(-1)">
        <i class="iconfont icon-fanhui"></i>
      </section>
      <section class="head_center ell" @click="centerClick">
        <span>{{headTitle}}</span>
      </section>
      <section class="head_login" v-if="signinUp"  @click="getUserInfo">
        <i class="iconfont icon-wode" v-if="userInfo"></i>
        <span v-else>登录|注册</span>
      </section>
      <slot name="edit"></slot>
      <slot name="msite-title"></slot>
      <slot name="changecity"></slot>
      <slot name="changeLogin"></slot>
    </header>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    props: {
      isShowSearch: {
        type: Boolean,
        default: true
      },
      userInfo: {
        type: Boolean,
        default: false
      },
      isSearch: {
        type: Boolean,
        default: true
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
      centerClick() {
        this.$emit('centerClick')
      },
      ...mapActions([
        // 'getUserInfo'
      ]),
    },
  }
</script>

<style scoped lang="stylus">
  .icon-fanhui
    font-size .24rem

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
        padding 0 20% 0 20%
        flex 0 0 100%
        box-sizing border-box
        font-size .2rem
</style>