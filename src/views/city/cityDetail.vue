<template>
  <div class="city_wrapper">
    <head-top :headTitle="headTitle" :isShowSearch="false">
      <span class="change_city" slot="changecity">切换城市</span>
    </head-top>
    <div class="input_wrapper">
      <input type="text" placeholder="输入学校、商务楼、地址" v-model='inputVaule'>
      <span class="btn" @click="submit">提交</span>
    </div>
    <div class="place_list">
      <scroll ref='scrollList' :data="placelist">
        <p class="his_title" v-show="isShowHis && placeHistory.length > 0">历史记录</p>
        <ul class="his_place_list" v-show="isShowHis">
          <li v-for="(item, index) in placeHistory" :key="index" @click="onSelectHis(item)">
            <p class="name">{{item.name}}</p>
            <p class="address">{{item.address}}</p>
          </li>
        </ul>
        <p class="clear" v-if="isShowHis && placeHistory.length > 0" @click="clearHistory">清除所有</p>
        <ul class="search_place_list" v-show="isShowList">
          <li v-for="(item, index) in placelist" :key="index" @click="onSelectPlace(item)">
            <p class="name">{{item.name}}</p>
            <p class="address">{{item.address}}</p>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
  import HeadTop from '../../components/head.vue'
  import {currentcity, searchplace} from '../../service/getData'
  import {getStore, setStore, removeStore} from '../../config/mUtils'

  export default {
    components: {
      HeadTop
    },
    data() {
      return {
        headTitle: '上海',
        inputVaule: '', // 搜索地址
        cityid: '1', // 当前城市id
        cityname: '', // 当前城市名字
        placelist: [], // 搜索城市列表
        placeHistory: [], // 历史搜索记录
        selectedPlaceList: [], // 选中的地址
        isShowHis: true,
        isShowList: false
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      //发送搜索信息inputVaule
      submit() {
        // 输入值不为空时才发送信息
        if (this.inputVaule) {
          searchplace(this.cityid, this.inputVaule).then(res => {
            this.placelist = res;
            this.isShowHis = false
            this.isShowList = true
          })
        }
      },
      initData(){
        //获取搜索历史记录
        if (getStore('placeHistory')) {
          this.placeHistory = JSON.parse(getStore('placeHistory'))
        } else {
          this.placeHistory = []
        }
      },
      onSelectPlace(item) {
        this.setHisPlaceList(item)
      },
      setHisPlaceList(obj) {
        let history = getStore('placeHistory')
        let geohash = obj.geohash
        if (history) {
          let hisList = JSON.parse(history)
          let falg = false
          falg = hisList.some(item => item.geohash === geohash)
          if (!falg) {
            hisList.forEach(element => {
              this.selectedPlaceList.unshift(element)
            })
            this.selectedPlaceList.unshift(obj)
          } 
        } else {
          this.selectedPlaceList.unshift(obj)
        }
        
        setStore('placeHistory', this.selectedPlaceList)
        this.selectedPlaceList = []
        this.placeHistory = JSON.parse(getStore('placeHistory'))

        this.$router.push({
          name: 'home'
        })
      },
      onSelectHis(item) {
        this.$router.push({
          name: 'home'
        })
      },
      clearHistory() {
        removeStore('placeHistory')
        this.placeHistory.splice(0)
      },
      refresh() {
        let scrolls = this.$refs.scrollList
        setTimeout(() => {
          scrolls.refresh()
        }, 20)
      }
    },
    watch: {
      inputVaule(newVal) {
        if (!newVal) {
          this.isShowHis = true
          this.isShowList = false
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  .city_wrapper
    padding-top .44rem
    width 100%
    height 100%
    .change_city
      position absolute
      right .1rem
      top 50%
      transform translateY(-50%)
      font-size .14rem
    .input_wrapper
      position relative
      margin-bottom .2rem
      padding 0 .2rem
      width 100%
      height 1.4rem
      box-sizing border-box
      background-color #fff
      input
        position absolute
        top 30%
        left 50%
        transform translate(-50%, -50%)
        width 90%
        height .4rem
        background-color #f7f7f7
        text-indent 1em
        border none
      .btn
        position absolute
        top 60%
        left 50%
        transform translate(-50%, 0%)
        width 90%
        height .4rem
        line-height .4rem
        text-align center
        color #fff
        font-size .18rem
        border-radius .06rem
        background-color #008de1
    .place_list
      position relative
      padding 0 .1rem
      width 100%
      height calc(100% - 1.84rem)
      overflow hidden
      font-size .14rem
      box-sizing border-box
      background-color #fff
      .his_title
        padding .1rem 0 .1rem .1rem
        font-size .16rem
        color #333
        font-weight 700
        text-align left
        border-bottom 1px solid #eee
      .clear
        padding .1rem 0 .1rem .1rem
        font-size .16rem
      .search_place_list, .his_place_list
        li
          display flex
          flex-direction column
          justify-content flex-start
          text-align left 
          padding .1rem .1rem
          width 100%
          border-bottom 1px solid #eee
          .name
            color #333
            font-size .16rem
          .address
            color #999
            font-size .12rem
</style>