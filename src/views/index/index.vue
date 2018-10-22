<template>
  <div class="wrapper">
    <head-top :headTitle="headTitle" @centerClick="centerClick" :signinUp="true"></head-top>
    <section class="content_wrapper">
      <scroll :data="foodTypes" ref="scrollFood">
        <ul class="food_list">
          <li v-for="(item, index) in foodTypes" :key="index">
            <img :src='`${imgBaseUrl}${item.image_url}`' alt="">
            <p>{{item.title}}</p>
          </li> 
        </ul>
        <shop-list @shopListLoaded="shopListLoaded"></shop-list>
      </scroll>
    </section>
    <footer-guide></footer-guide>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import HeadTop from '../../components/head.vue'
  import FooterGuide from '../../components/footer.vue'
  import ShopList from './shopList'
  import {msiteAddress, msiteFoodTypes, cityGuess} from '../../service/getData'

  export default {
    components: {
      HeadTop,
      FooterGuide,
      ShopList
    },
    data() {
      return {
        headTitle: '请选择地址...', // 标题
        geohash: '', // city页面传递过来的地址geohash
        hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
        foodTypes: [], // 食品分类列表
        imgBaseUrl: 'https://fuss10.elemecdn.com' //图片域名地址
      }
    },
    async beforeMount() {
      const address = await cityGuess();
      if (!this.$route.query.geohash) {
			  const address = await cityGuess()
        this.geohash = `${address.latitude},${address.longitude}`
      } else {
        this.geohash = this.$route.query.geohash
      }

      //保存geohash 到vuex
		  this.SAVE_GEOHASH(this.geohash)
    	//获取位置信息
      let res = await msiteAddress(this.geohash)
    	this.headTitle = res.name
    	// 记录当前经度纬度
    	this.RECORD_ADDRESS(res)

    	this.hasGetData = true
    },
    mounted() {
      this._initGetFoodList()
    },
    methods: {
      centerClick() {
        this.$router.push({
          name: 'city'
        })
      },
      shopListLoaded() {
        let scrolls = this.$refs.scrollFood
        setTimeout(() => {
          scrolls.refresh()
        }, 20)
      },
      _initGetFoodList() {
        //获取导航食品类型列表
       	msiteFoodTypes(this.geohash).then(res => {
       	  if (res.length >= 8) {
            this.foodTypes = res.slice(0, 8)
          } else {
            this.foodTypes = res
          }
        }).then(() => {
        
        })
      },
      ...mapMutations([
        'SAVE_GEOHASH',
        'RECORD_ADDRESS'
    	]),
    },
  }
</script>

<style scoped lang="stylus">
  .wrapper
    margin-top .44rem
    width 100%
    height 100%
    .content_wrapper
      position relative
      width 100%
      height calc(100% - .88rem)
      overflow hidden
      box-sizing border-box
      .food_list
        margin-bottom .2rem
        display flex
        flex-wrap wrap
        width 100%
        border-bottom 1px solid #eee
        background-color #fff
        li 
          display flex
          padding .15rem 0
          justify-content center
          align-items center
          flex 0 0 25%
          flex-direction column
          img 
            width .4rem
            height .4rem
          p
            margin-top .1rem
            font-size .14rem


</style>