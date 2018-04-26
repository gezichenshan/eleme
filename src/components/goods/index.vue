<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
        :key="index"
        v-for="(item, index) in goods"
        class="menu-item"
        :class="{'menu-item-selected'
        :index===currentIndex}"
        @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li :key="index" v-for="(item, index) in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li :key="index" v-for="(food, index) in item.foods" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :addToCart="addToCart"/>
                </div>
              </div>
              <div></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :selectedFood="selectedFood"/>
  </div>
</template>

<script>
import { goods } from '../../api'
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart'
import cartcontrol from '@/components/cartcontrol'
export default {
  components: { shopcart, cartcontrol },
  props: {
    seller: {
      type: Object,
    },
  },
  data() {
    return {
      goods: [],
      offsetY: 0,
      itemsHeightArr: [],
      selectedFood: [],
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    goods()
      .then(res => {
        this.goods = res.data.data
        this.$nextTick(function() {
          this._initScroll()
          let goodsHtmlArr = document.getElementsByClassName('food-list-hook')
          let height = 0
          this.itemsHeightArr.push(height)
          for (let i = 0; i < goodsHtmlArr.length; i++) {
            let item = goodsHtmlArr[i]
            height += item.clientHeight
            this.itemsHeightArr.push(height)
          }
        })
      })
      .catch(() => {})
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.itemsHeightArr.length; i++) {
        let height1 = this.itemsHeightArr[i]
        let height2 = this.itemsHeightArr[i + 1]
        if (!height2 || (this.offsetY >= height1 && this.offsetY < height2)) {
          return i
        }
      }
      return 0
    },
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true,
      })
      this.foods = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3,
      })
      this.foods.on('scroll', pos => {
        this.offsetY = Math.abs(pos.y)
      })
    },
    selectMenu(index) {
      let scrollHeight = this.itemsHeightArr[index]
      this.foods.scrollTo(0, -scrollHeight, 500)
    },
    addToCart(food) {
      this.selectedFood.push(food)
    },
    deleteFromCart(food) {
      this.selectedFood.push(food)
    },
  },
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixin.styl';

h1 {
  margin: 0;
}

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item-selected {
      position: relative;
      background: #fff;
      font-weight: 700;
      margin-top: -1px;
      z-index: 10;

      .text {
        color: #000;
        border-none();
      }
    }

    .menu-item {
      display: table;
      width: 56px;
      height: 54px;
      line-height: 14px;
      padding: 0 12px;

      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: top;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;

        &.decrease {
          bg-img('decrease_3');
        }

        &.discount {
          bg-img('discount_3');
        }

        &.guarantee {
          bg-img('guarantee_3');
        }

        &.invoice {
          bg-img('invoice_3');
        }

        &.special {
          bg-img('special_3');
        }
      }
    }

    .text {
      display: table-cell;
      width: 56px;
      vertical-align: middle;
      border-1px(rgba(7, 17, 27, 0.1));
      font-size: 12px;
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 18px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          line-height: 10px;

          &.count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }

  ul, li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
</style>
