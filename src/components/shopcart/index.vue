<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount > 0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
          </div>
          <div class="num" v-if="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalCount > 0}">
          ¥{{totalPrice}}元
        </div>
        <div class="desc">另需配送费 ¥ {{deliveryPrice}} 元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <!-- <div :key="index" v-for="(ball,index) in balls" v-show="ball.show" class="ball">
        <transition name="drop">
          <div class="inner"></div>
        </transition>
      </div> -->
      <div class="ball-container">
        <transition
          name="drop"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
        >
          <div class="ball" ref="droppingBall" v-show="ballShow">
            <div class="inner"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['selectedFood', 'deliveryPrice', 'minPrice'],
  data() {
    return {
      ballShow: false,
      balls: [
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
        {
          show: false,
        },
      ],
      dropballs: [],
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectedFood.forEach(item => {
        total += item.price * item.count
      })
      return total
    },
    totalCount() {
      let total = 0
      this.selectedFood.forEach(item => {
        total += item.count
      })
      return total
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
  },
  methods: {
    beforeEnter(el) {
      console.log(el)
    },
    enter: function(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0,0,0)`
        el.style.transform = `translate3d(0,0,0)`
      })
    },
    afterEnter(el) {
      this.ballShow = false
    },
    drop(el) {
      let rect = el.getBoundingClientRect()
      let x = rect.left - 32
      let y = -(window.innerHeight - rect.top - 22)
      let droppingBall = this.$refs.droppingBall
      this.ballShow = true
      // droppingBall.style.display = ''
      droppingBall.style.webkitTransform = `translate3d(${x}px,${y}px,0)`
      droppingBall.style.transform = `translate3d(${x}px,${y}px,0)`

      // this.balls.forEach(ball => {
      //   if (!ball.show) {
      //     ball.show = true
      //     ball.el = el
      //     this.dropballs.push(ball)
      //   }
      // })
    },
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;

  .content {
    display: flex;
    background: #141d27;
    font-size: 0;

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;

          &.highlight {
            background: rgb(0, 160, 220);
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;

            &.highlight {
              color: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        background: #2b333b;

        &.not-enough {
          background: #2b333b;
        }

        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s;
      }
    }
  }

  .drop-enter-active {
    transition: all 0.4s cubic-bezier(0, 0, 0.58, 1);
  }
}
</style>
