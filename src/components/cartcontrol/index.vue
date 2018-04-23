<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0"></div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add">
      <i class="icon-add_circle" @click="addCart"></i>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
    addCart() {},
  },
  created() {
    console.log(this.food)
  },
}
</script>
<style lang="stylus">
.cartcontrol {
  font-size: 0;
  line-height: 24px;
  font-size: 24px;

  .cart-decrease, .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }

  .cart-count {
    display: inline-block;
  }

  .cart-add {
    display: inline-block;
  }
}
</style>


