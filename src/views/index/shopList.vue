<template>
  <ul>
    <li v-for="(item, index) in shopList" :key="index">
      <div class="left_img">
        <img :src="`${imgBaseUrl}${item.image_path}`" alt="">
      </div>
      <div class="right_text">
        <div class="title">
          <p class="t_left">
            <span class="brand" v-if="item.is_premium">品牌</span>
            {{item.name}}
          </p>
          <p class="t_right">
            <span v-for="(v, i) in  item.supports" :key="i">{{v.icon_name}}</span>
          </p>
        </div>
        <div class="rate">
          <p class="r_left"><star :rating="item.rating"></star><span class="rating_num">{{item.rating}}</span><span class="sale_num">月售{{item.recent_order_num}}单</span></p>
          <p class="r_right">
            <span class="delivery_mode" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span><span class="time" v-if="checkPunctual(item.supports)">准时达</span>
          </p>
        </div>
        <div class="fee_distance">
          <p class="fee">
            <span>¥{{item.float_minimum_order_amount}}起送</span>&nbsp;/&nbsp;{{item.piecewise_agent_fee.tips}}
          </p>
          <p class="distance">
            <span class="dis_num">{{item.distance}}&nbsp;/&nbsp;</span><span class="time">{{item.order_lead_time}}</span>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import Star from '../../components/star'
  import {mapState} from 'vuex'
  import {shopList} from '../../service/getData'
  import {imgBaseUrl} from '../../config/env'

  export default {
    components: {
      Star
    },
    props: {
      restaurantCategoryId: {
        type: String,
        default: null 
      }
    },
    data() {
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopList:[], // 店铺列表数据
        imgBaseUrl,
      }
    },
    mounted() {     
      this._initData()
    },
    methods: {
      async _initData() {
        //获取数据
        if (this.latitude && this.longitude) {
          this.shopList = await shopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId)
          console.log(this.shopList)
        } 
      },
      // 检验数组是否有准时标志
      checkPunctual(arr) {
        let flag = false
        if (arr instanceof Array && arr.length) {
          flag = arr.some(item => item.name === '准时达')
        } 
        return flag
      }
    },
    computed: {
      ...mapState([
        'latitude',
        'longitude'
      ]),
    },
    watch: {
      latitude() {
        this._initData()
      },
      shopList(){
        this.$emit('shopListLoaded');
      }
    }
  }
</script>

<style scoped lang="stylus">
    ul 
      width 100%
      height 100%
      background-color #fff
      border-top 1px solid #eee
      li:last-child
        border none
      li 
        display flex
        padding  .18rem .1rem
        width 100%
        box-sizing border-box
        font-size .14rem
        border-bottom 1px solid #eee
        .left_img
          flex 0 0 .64rem
          img
            width .64rem
            height .64rem
        .right_text
          display flex
          flex-direction column
          justify-content center
          padding-left .1rem
          flex 1
          width 100%
          box-sizing border-box
          .title 
            display flex
            justify-content space-between
            align-items center
            .t_left
              font-size .14rem
              color #333
              font-weight 700
              .brand
                display inline-block
                width .3rem
                height .15rem
                line-height .17rem
                font-size .11rem
                text-align center
                color #000
                font-weight normal
                background-color #ffd930
            .t_right
              span 
                font-size .1rem
                color #999
                border 1px solid #f1f1f1
                border-radius .03rem
          .rate
            display flex
            padding .05rem 0
            justify-content space-between
            align-items center
            .r_left
              display flex
              align-items center
              width 70%
              .sale_num
                display inline-block
                font-size .1rem
                color #666
                transform scale(.8)
              .rating_num
                margin-left .07rem
                color #ff9a0d
                font-size .1rem
                transform scale(.8)
            .r_right
              .delivery_mode
                margin-right -.07rem
                display inline-block
                color #fff
                font-size .1rem
                background-color #008de1
                transform scale(.8)
                border 1px solid #008de1
              .time
                display inline-block
                color #008de1
                font-size .1rem
                border 1px solid #008de1
                transform scale(.8)
          .fee_distance
            display flex
            justify-content space-between
            align-items center
            font-size .1rem
            .fee
              color #666
              font-size .08rem
              transform scale(.9)
            .distance
              color #999
              font-size .08rem
              transform scale(.9)
              .time
                color #008de1
</style>