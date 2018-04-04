import Vue from 'vue'
import App from './App'
import router from './router'
//iview
//import iView from 'iview';
//Vue.use(iView);
import 'iview/dist/styles/iview.css';
import Notice from 'iview/src/components/notice'
import Message from 'iview/src/components/message'

Vue.prototype.$Notice = Notice;
Vue.prototype.$Message = Message;

//
import Lazy from '@/LazyUI/Lazy';
import '@/LazyUI/admin.css'
Vue.use(Lazy);
//
import 'sass/common.sass';
import store from './store'

//
import VueStomp from "vue-stomp";
Vue.use(VueStomp, "/endpointWisely");

//import VueSocketio from 'vue-socket.io';
//import socketio from 'socket.io-client';
//Vue.use(VueSocketio,'http://192.168.0.57:9092');

import LoadingBar from 'iview/src/components/loading-bar'

//高德
// import AMap from 'vue-amap';
// Vue.use(AMap);
// AMap.initAMapApiLoader({
//   key: '238db1d2556b07c109516eb720e08f47',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
// });

Vue.prototype.qs = require('qs');
Vue.config.productionTip = false

//开启debug模式
Vue.config.debug = true;
Vue.config.devtools = true


//路由过滤器
router.beforeEach(({meta, path}, from, next) => {
  if(meta.title){
    store.commit('increment', meta.title)
  }
  LoadingBar.start();
  if(meta.auth){
    debugger;
    if(localStorage.token && localStorage.streetorcommunityid && localStorage.streetorcommunity){
      next();
    }else{
      next({path:"/NewLogin"});
    }
  }else{
    next();
  }
  //next();
})

router.afterEach((to, from, next) => {
    LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
