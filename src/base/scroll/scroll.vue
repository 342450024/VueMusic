<template>
  <div ref="wrapper" class="wrapper">




    <!-- 因为一些页面布局原因不得已这么做 -->
    <!-- 需要用到刷新 -->
    <div v-if='pullDownRefresh'>
    <p class="icon_loading" v-if='pullDownRefresh' ref='img'><img :src="pullDown_icon" height="25" width="25" /></p>
    <slot></slot>
    </div>
    <!-- 不需要用到刷新 -->
    <slot v-else='!pullDownRefresh'></slot>

  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import img_loading from './loading.gif'
  import img_down from './down.png'
  import {prefixStyle} from 'common/js/dom'
  const transform = prefixStyle('transform')
  const transitionDuration = prefixStyle('transitionDuration')
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      pulldown: {
      type: Boolean,
      default: false
      },
      pullDownRefresh: {
      type: Object,
      default: null
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    data(){
    return{
      pullDown_icon:img_down
    }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullDownRefresh:this.pullDownRefresh
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }
        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('scroll', (pos) => {
            if(pos.y > 40){
            this.$refs.img.style[transform] = 'rotate(180deg)'
            this.$refs.img.style[transitionDuration] =  `300ms`
            }else{
            this.$refs.img.style[transform] = 'rotate(0deg)'
            if(this.pullDown_icon == img_loading){
            this.$refs.img.style[transitionDuration] =  `0ms`
            }

            }
          })
          //这个事件可以触发 下拉刷新的停留时间
          this.scroll.on('pullingDown', (pos) => {
           this.pullDown_icon = img_loading;
           this.$emit('onpulldown')
          })

        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullDown(){
        this.scroll && this.scroll.finishPullDown()
        this.pullDown_icon = img_down;
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.icon_loading{
  position:absolute;
  width:100%;
  top:-25px;
  text-align:center;
}
</style>
