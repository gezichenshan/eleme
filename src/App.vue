<template>
  <div id="app">
    <Header/>
    <div class="tab">
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
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/v-header'
export default {
  name: 'App',
  components: { Header },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl';

#app {
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    // border-bottom: 1px solid rgba(7, 12, 27, 0.1);
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
