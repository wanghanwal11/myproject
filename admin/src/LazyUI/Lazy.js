import lazy from './config'
import LazyLayout from './src/components/LazyLayout'
import LazyBox from './src/components/LazyBox'
import LazyScript from './src/components/LazyScript'
import LazyTopbar from './src/components/LazyTopbar'
import LazyKeep from './src/components/LazyKeep'
import LazyHtmlEditor from './src/components/LazyHtmlEditor'
import LazyHtmlEditor1 from './src/components/LazyHtmlEditor1'
import LazyPhone from './src/components/LazyPhone'
import LazyInput from './src/components/LazyInput'
import axios from 'axios'
import LoadingBar from 'iview/src/components/loading-bar'

const allView = {
  LazyLayout,
  LazyBox,
  LazyScript,
  LazyTopbar,
  LazyKeep,
  LazyHtmlEditor,
  LazyHtmlEditor1,
  LazyPhone,
  LoadingBar,
  LazyInput
}
var  Lazy = {};

Lazy.install = function (Vue, options) {
  var urlList = {};
  Object.keys(allView).forEach((key) => {
    Vue.component(key, allView[key]);
  });
  //
  Vue.prototype.$Loading = LoadingBar;
  Vue.prototype.$http = axios;

  axios.interceptors.request.use(function(config){
    //LoadingBar.start();
    return config
  },function(err){
    return Promise.reject(err)
  });
  axios.interceptors.response.use(function(response){
   //LoadingBar.finish();
    return response
  },function(err){
    return Promise.reject(err)
  });

  Vue.prototype.$lazy = lazy;
  Vue.prototype.$eventHub = new Vue();
  //
  Vue.prototype.$get = (url, ...obj)=>ajax('get', url, ...obj)
  Vue.prototype.$post = (url, ...obj)=>ajax('post', url, ...obj)

  function ajax(_type, url, ...obj) {
    if(urlList[url] === true)return;
    urlList[url] = true;
    var loadingBol = true;
    if(obj.length > 0) {
      const _type = lazy.typeof(obj[obj.length-1])
      if(_type == null || _type == 'number' || _type == 'string') {
        loadingBol = false;
      }
    }
    loadingBol && loadStart();
    if(lazy.typeof(obj[0]) == 'object') {
      axios[_type](url,{params:obj[0]}).then(function(res) {
        loadingBol && loadFinish(url);
        successFun(res.data, function(_data) {
          obj[1] && obj[1](_data);
        },function(res) {
          obj[2] && obj[2](res);
          console.log(url,res);
        });
      }).catch(function(err) {
        loadingBol && loadFinish(url);
        obj[2] && obj[2](err);
        console.log(url,err);
      });
    }else {
      axios.get(url,{}).then(function(res) {
        loadingBol && loadFinish(url);
        successFun(res.data, function(_data) {
          obj[0] && obj[0](_data);
        },function(res) {
          obj[1] && obj[1](res);
          console.log(url,res);
        });
      }).catch(function(err) {
        loadingBol && loadFinish(url);
        obj[1] && obj[1](err);
        console.log(url,err);
      });
    }
  }
  function successFun(str, fun1, fun2) {
      try {
        var json = str;
        if(lazy.typeof(str)=='string') {
          json = JSON.parse(str);
        }
        if(json.isSucceed === true) {
          fun1(json);
        }else {
          fun2(json.message);
        }
      }catch (e) {
        fun2(e);
      }
  }
  function loadStart() {
    Vue.prototype.$Loading.start();
  }
  function loadFinish(url) {
    urlList[url] = false;
    Vue.prototype.$Loading.finish();
  }
}
export default Lazy
