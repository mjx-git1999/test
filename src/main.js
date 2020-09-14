// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//全局引入
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

//按需引入
import {Tabbar,TabbarItem,Cell,CellGroup,Stepper,PullRefresh,Tab,Tabs,Button,Row,Col,Swipe,SwipeItem,Lazyload,List,Field,NavBar} from 'vant'
Vue.use(Tabbar).use(TabbarItem).use(Stepper).use(Cell).use(CellGroup).use(PullRefresh).use(Tab).use(Tabs).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
