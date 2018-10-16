<template>
  <div class="footer_wrapper">
    <ul>
      <li v-for="(item, index) in footerList" :class="{active: index === curIndex}" :key="index" @click="goDetail(index + 1)">
        <i class="iconfont" :class="item.class"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        curIndex: 0,
        footerList: [
          {class: 'icon-changyonglogo40', name: '外卖'},
          {class: 'icon-sousuo1', name: '搜索'},
          {class: 'icon-dingdan', name: '订单'},
          {class: 'icon-wode', name: '我的'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus">
  .footer_wrapper
    position fixed
    bottom 0
    left 0
    width 100%
    height .44rem
    font-size .16rem
    border-top 1px solid #eee
    background-color #fff
    box-shadow 0px -1px 3px #eee
    ul 
      display flex
      align-items center
      justify-content center
      width 100%
      height .44rem
      li
        display flex
        align-items center
        justify-content center
        flex-direction column
        flex 1
        height .44rem
        i 
          font-size .2rem
        i.icon-changyonglogo40
          transform scale(1.4)
        i.icon-dingdan
          transform scale(.8)
        span 
          font-size .14rem
      .active
        color #008de1
</style>