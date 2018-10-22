<template>
  <div class="city_wrapper">
    <div class="input_wrapper">
      <div class="input_flex">
        <i class="iconfont icon-fanhui" @click="$router.go(-1)"></i>
        <p>
          <input type="text" v-model="inputVal" placeholder="请搜索城市名">
          <i class="iconfont icon-sousuo"></i>
        </p>
        <i class="iconfont icon-tubiao-" @click="toCityDetail"></i>
      </div>
    </div>
    <list-view :data="cityListArr" :hotcity="hotcity" :cityList="cityList"></list-view>
  </div>
</template>

<script>
  import ListView from './listView'
  import {cityGuess, hotcity, groupcity} from '../../service/getData'

  export default {
    components: {
      ListView
    },
    data() {
      return {
        inputVal: '', // 搜索值
        guessCity: '',   //当前城市
        guessCityid: '', //当前城市id
        hotcity: [],     //热门城市列表
        groupcity: {},   //所有城市列表
        cityList: {},
        cityListArr: []
      }
    },
    mounted() {
      this._initData()
    },
    methods: {
      toCityDetail( ) {
        this.$router.push({
          name: 'cityDetail'
        })
      },
      _initData() {
        // 获取当前城市
        cityGuess().then(res => {
          this.guessCity = res.name;
          this.guessCityid = res.id;
        })

        //获取热门城市
        hotcity().then(res => {
          this.hotcity = res;
          console.log(res)
        })

        //获取所有城市
        groupcity().then(res => {
          this.cityListArr = Object.values(res)
          this.cityList = this.normalizeCityList(res)
        })
      },
      normalizeCityList(map) {
        if (!map) return {}
        let sortobj = {
          '热': this.hotcity
        };
        for (let i = 65; i <= 90; i++) {
          if (map[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = map[String.fromCharCode(i)];
          }
        }
        console.log(1,sortobj)
        return sortobj
      },
      searchCityList() {
        let inputVal = this.inputVal
        let reg = new RegExp(`^${inputVal}`, 'i');
        let rsArr = []
        this.cityListArr.map(item => {
          item.map(val => {
            if (reg.test(val.name) || reg.test(val.pinyin) || reg.test(val.id)) {
              rsArr.push(val)
            }
          })
        })
        console.log(rsArr)
      }
    },
    watch: {
      inputVal(newValue, oldValue) {
        if (newValue != '') {
          this.searchCityList()
        }
      }
    },
  }
</script>

<style scoped lang="stylus">
  .city_wrapper
    position fixed
    top .55rem
    bottom 0
    width 100%
    height 100%
    overflow hidden
    .input_wrapper
      position fixed
      top 0
      left 0
      z-index 999
      width 100%
      height .5rem
      .input_flex
        display flex
        padding 0 .1rem
        width 100%
        height .5rem
        align-items center
        box-sizing border-box
        background-color #fff
        >i 
          flex 0 0 10%
          font-size .22rem
        >p
          position relative
          flex 1
          input
            width 100%
            height .36rem
            background-color #f5f5f5
            border none
            border-radius .1rem
            text-indent 2.5em
          i
            position absolute
            left .15rem
            top 50%
            transform translateY(-50%)
</style>