import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/'
import Ratings from '@/components/ratings/'
import Seller from '@/components/seller/'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'link-active-class',
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: Goods,
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings,
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller,
    },
  ],
})
