import Vue from 'vue'
import Vuex from 'vuex'
import { mapState } from 'vuex'
import user from './user'
import sideBar from './sideBar'
import nav from './nav'
import volunteer from './volunteer'
import article from './article'
import userInfo from './userInfo'
import message from './message'

Vue.use(Vuex)
var host = window.location.origin + "/";
    //host = "http://192.168.0.10/";
export default new Vuex.Store({
  state: {
    host: "http://localhost:8080/",
    serverHost: host,
    aliHost: "http://shequ.vitoyun.cn/",
    loading2: false,
    loadWX: false,
    pageTitle: "",
    headpicurl: "",
    communityDetail: {
      initid: ''
    }
  },
  mutations:{
    increment (state, title) {
      // 变更状态
      state.pageTitle = title
    },
    updateheadpicurl (state,url) {
      state.headpicurl = url;
      localStorage.headpicurl = url;
    },
    updateinitid (state,initid) {
      state.communityDetail.initid = initid;
      localStorage.initid = initid;
    }
  },
  computed: {
    headpicurl (state) {
      if(state.headpicurl == ''){
        state.headpicurl = localStorage.headpicurl;
      }
      return state.headpicurl;
    }
  },
  modules: {
    user: user,
    sideBar: sideBar,
    nav: nav,
    volunteer: volunteer,
    article:article,
    userInfo: userInfo,
    message: message
  },
  strict: process.env.NODE_ENV !== 'production'
})
