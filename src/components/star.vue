<template>
  <div class="star_wrappetr">
    <section class="star_gray">
      <i class="iconfont icon-xingxing" v-for="i in 5" :key="i"></i>
    </section>
    <section class="star_yellow" :style="'width:' + rating*100/5 + '%'">
      <i class="iconfont icon-xingxing" v-for="i in 5" :key="i"></i>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      rating: {
        type: Number,
        default: null
      }
    }
  }
</script>

<style scoped lang="stylus">
  .star_wrappetr
    position relative
    .star_gray
      width 100%
      color #ccc
      i
        font-size .1rem
    .star_yellow
      position absolute
      z-index 2
      left 0
      top 0
      overflow hidden
      color #ff9a0d
      i
        font-size .1rem
</style>