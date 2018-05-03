<template>
  <div id="app">
    <Header :seller="seller"/>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{ name: 'goods'}">
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ name: 'ratings'}">
          评论
        </router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{ name: 'seller'}">
          商家
        </router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/v-header'
import { seller } from '@/api/index'
export default {
  name: 'App',
  components: { Header },
  data() {
    return {
      seller: {},
    }
  },
  created() {
    seller()
      .then(res => {
        this.seller = res.data.data
      })
      .catch(error => {
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin.styl';
@import 'common/stylus/base.styl';

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px(rgba(7, 12, 27, 0.1));

    .tab-item {
      flex: 1;
      text-align: center;

      $ > a {
        display: block;
        font-size: 14px;
        color: rgba(77, 85, 93, 1);
      }
    }
  }
}

a {
  text-decoration: none;
}

.link-active-class {
  color: #f00;
}
</style>
