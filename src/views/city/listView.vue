<template>
  <div class="wrapper">
    <scroll @scroll="scroll"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            :data="data"
            class="listview"
            ref="listview">
      <ul>
        <li v-for="(group, key) of cityList" :key="key" class="list-group" ref="listGroup">
          <h2 class="list-group-title" v-if="key == '热'">热门城市</h2>
          <h2 class="list-group-title" v-else>{{key}}</h2>
          <uL >
            <li @click="selectItem(item)" :class="{'hot_city': key == '热'}" v-for="(item, index) in group" :key="index" class="list-group-item">
              <span class="name">{{item.name}}</span>
            </li>
          </uL>
        </li>
      </ul>
      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <div class="fixed-title">{{fixedTitle}} </div>
      </div>
      <div v-show="!data.length" class="loading-container">
        <!-- <loading></loading> -->
      </div>
    </scroll>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item"
            :class="{'current':currentIndex===index}">{{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../components/scroll'
  import {getData} from '../../config/dom'

  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18

  export default {
    components: {
      Scroll,
    },
    props: {
      data: {
        type: Array,
        default: () => []
      },
      cityList: {
        type: Object,
        default: () => {}
      },
      hotcity: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      shortcutList() {
        let arr = Object.keys(this.cityList)
        return arr
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    },
    methods: {
      selectItem(item) {
        this.$emit('select', item)
      },
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex

        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this._scrollTo(anchorIndex)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        this.scrollY = this.$refs.listview.scroll.y
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .wrapper
    position relative
    width: 100%
    height: 100%
    overflow: hidden
    .list-shortcut
        position: absolute
        z-index: 30
        right: 0
        top: 46%
        transform: translateY(-50%)
        width: 20px
        padding: 20px 0
        border-radius: 10px
        text-align: center
        font-family: Helvetica
        .item
          display inline-block
          width .16rem
          height .16rem
          line-height .16rem
          border-radius .08rem
          text-align center
          color: #333
          font-size: .1rem
          &.current
            color: #fff
            background-color #008de1
    .listview
      position: relative
      width: 100%
      height: 100%
      overflow: hidden
      background: #fff
      .list-group:first-child
        padding-bottom 0
      .list-group
        padding-bottom: 30px
        .list-group-title
          padding-top .2rem
          padding-left .3rem
          height: 30px
          line-height: 30px
          font-size: .16rem
          color: #333
          text-align left
          background: #fff
        .list-group-item
          display: flex
          align-items: center
          text-align left
          padding: .2rem 0 0 .2rem
          .avatar
            width: 50px
            height: 50px
            border-radius: 50%
          .name
            color: #333
            font-size: .16rem
        .hot_city
          padding-bottom 0
          margin .1rem 0
          display: inline-block
          width 25%
          text-align center
          color #333
          padding 0
          span 
            display inline-block
            width 80%
            padding .1rem .12rem
            background-color #eff6fb
            box-sizing border-box
      .list-fixed
        position: absolute
        top: 0
        left: 0
        width: 100%
        .fixed-title
          height: 30px
          line-height: 30px
          padding-left: 20px
          font-size: .1rem
          color: #333
          background: #fff
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
