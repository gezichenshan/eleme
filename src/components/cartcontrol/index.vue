<template>

<!-- eslint-disable -->

  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click="deleteItem">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add" @click="add">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: ['food', 'addToCart', 'deleteFromCart'],
  methods: {
    add(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cartAdd', event.target)
    },
    deleteItem() {
      if (this.food.count) {
        this.food.count--
      }
    },
  },
}
</script>
<style lang="stylus">
.move-enter {
  opacity: 1;
  transition: all 0.4s linear;
  transform: rotate(0deg) translateX(50px) rotate(180deg);
}

.move-leave-active {
  opacity: 1;
  transition: all 0.4s linear;
  transform: rotate(0deg) translateX(30px) rotate(180deg);
}

.cartcontrol {
  font-size: 0;
  line-height: 24px;
  font-size: 24px;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    transition: all 0.4s linear;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }

  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
