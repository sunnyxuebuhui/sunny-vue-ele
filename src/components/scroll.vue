<template>
  <div ref="wrapper" class="better-scroll-wrapper">
    <div class="scroll-content">
      <div ref="listWrapper">
        <slot></slot>
      </div>
      <div class="pull-up-tip" v-if="pullUpLoad">
        <div class="before-trigger" v-if="!isPullUpLoad">
          <span>没有更多数据</span>
        </div>
        <div class="after-trigger" v-else>
          <spinner type="ios-small"/>&nbsp;加载更多...
        </div>
      </div>
    </div>
    <div class="refresh-tip" :style="pullDownStyle" v-if="pullDownRefresh">
      <div class="before-trigger" v-if="beforePullDown">
        <bubble :y="bubbleY"/>
      </div>
      <div class="after-trigger" v-else>
        <div v-if="isPullingDown" class="loading">
          <spinner type="ios-small"/>
        </div>
        <!--<div v-else><span>{{refreshTxt}}</span></div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'scroll',
    created () {
      this.pullDownInitTop = -50
    },
    data () {
      return {
        beforePullDown: true,
        pullUpDirty: true,
        pullDownStyle: '',
        isPullingDown: false,
        isRebounding: false,
        isPullUpLoad: false,
        bubbleY: 0
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullDownRefresh: {
        type: null,
        default: false
      },
      pullUpLoad: {
        type: null,
        default: false
      },
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad
        });
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            this.$emit('scroll', pos)
          })
        }
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
      },
      _initPullDownRefresh () {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false;
          this.isPullingDown = true;
          this.$emit('pullingDown');
        });
        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop);
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0
          }
          // 是否反弹
          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', (pos) => {
          this.isPullUpLoad = true;
          this.$emit('pullingUp')
        })

      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`;
          this.beforePullDown = true;
          this.isRebounding = false;
          this.refresh()
        }, this.scroll.options.bounceTime)
      },
      _reboundPullDown () {
        const {stopTime = 600} = this.pullDownRefresh;
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true;
            this.scroll.finishPullDown();
            resolve()
          }, stopTime)
        })
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      // 通知组件数据更新完成
      forceUpdate (dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false;
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false;
          this.scroll.finishPullUp();
          this.pullUpDirty = dirty;
          this.refresh()
        } else {
          this.refresh()
        }
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/scss" scoped type="text/scss">
  .better-scroll-wrapper
    position absolute
    right 0
    left 0
    top 0
    bottom 0
    .refresh-tip
      width:100%
      position absolute
      left 0
      top -50px
      display flex
      justify-content center
      align-items center
      transition all
      font-size 12px
    .pull-up-tip
      display flex
      justify-content center
      align-items center
      transition all
      font-size 12px
      padding 10px 0

</style>
