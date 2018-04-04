<template>
  <login @event="get"></login>
</template>
<script>
  import login from '../components/login';
  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }
  export default {
    data:function(){
      return {}
    } ,
    components: {
      login
    },
    methods: {
      get: function (fun) {
//        alert(JSON.stringify(fun));
        console.log(fun);
        this.handleSubmit(fun);
      },
      handleSubmit: function (name) {
        var vm = this;
        var url = this.$store.state.serverHost + 'uc/api/user/login';
        this.$http.get(url, {
          params: {
            mobile: name.phoneNumber,
            code: name.phoneCode,
            type: 'mobile'
          }
        })
          .then(function (response) {
            console.log(response);
            vm.$store.commit('updateToken', response.data.rows[0].access_token);
            vm.$store.commit('updateUid', response.data.rows[0].userid);
            vm.checkManager();
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      checkManager: function () {
        var vm = this;
        var url = vm.$store.state.serverHost + 'cmy/api/sCommunitymanager/checkManager';
        this.$http.get(url, {
            headers: {
              'token': this.$store.state.userInfo.access_token
            }
          })
          .then(function (response) {
            console.log(response);
                  debugger;
            if (response.data.newPrimaryKeys.resultStr == 0) {
              vm.$router.push('/register');
//              vm.$store.state.headpicurl = response.data.newPrimaryKeys.headpicurl;
              vm.$store.commit('updateheadpicurl', response.data.newPrimaryKeys.headpicurl);
              vm.$store.commit('updateUserName', response.data.newPrimaryKeys.name);
              if (!vm.$store.state.communityDetail) {
                vm.$store.state.communityDetail = {};
              }
            } else if (response.data.newPrimaryKeys.resultStr == 1) {
              vm.$router.push('/');
              vm.$Notice.info({
                desc: '正在审核!'
              });
            } else {
              //vm.$store.state.userInfo.streetorcommunity = response.data.newPrimaryKeys.streetorcommunity;
              //vm.$store.state.userInfo.streetorcommunityid = response.data.newPrimaryKeys.streetorcommunityid;
              vm.$store.commit('updateCommunity', response.data.newPrimaryKeys.streetorcommunity);
              vm.$store.commit('updateCommunityid', response.data.newPrimaryKeys.streetorcommunityid);
              vm.$store.commit('updateheadpicurl', response.data.newPrimaryKeys.headpicurl);
              vm.$store.commit('updateCityCode', response.data.newPrimaryKeys.code);
              vm.$store.commit('updateCityLatLng', response.data.newPrimaryKeys.gps);
              vm.$store.commit('updateIsAdmin', response.data.newPrimaryKeys.isManager);
              vm.$store.commit('updateUserName', response.data.newPrimaryKeys.name);
              //vm.$store.state.headpicurl = response.data.newPrimaryKeys.headpicurl;
              vm.getInitId();
            }
          })
          .catch(function (error) {
            vm.$Notice.error({
              desc: error
            });
            vm.loading = false;
            console.log(error);
            vm.$router.push('/');
          });
      },
      getInitId: function () {
        var vm = this;
        var url = vm.$store.state.serverHost + 'wx/api/wx/get';
        this.$http.post(url, this.qs.stringify({
            communityid: vm.$store.state.userInfo.streetorcommunityid,
            communitytype: this.$store.state.userInfo.streetorcommunity
          }), {
            headers: {
              'token': this.$store.state.userInfo.access_token
            }
          })
          .then(function (response) {
            console.log(response);
            if (response.data.rows.length == 0) {
              //vm.$store.state.communityDetail.initid = '';
              vm.$store.commit('updateinitid', '');
            } else {
              vm.$store.commit('updateinitid', response.data.rows[0].initid);
            }
            if (vm.$store.state.communityDetail.initid) {
              vm.$router.push('/articleList');
            } else {
              vm.$router.push('/settings');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    created: function () {
      var vm = this;
      //在登陆页面时清除localStorage
      localStorage.removeItem('initid');
      localStorage.removeItem('streetorcommunity');
      localStorage.removeItem('streetorcommunityid');
      localStorage.removeItem('token');
      localStorage.removeItem('uid');
      localStorage.removeItem('headpicurl');
      localStorage.removeItem('userName');
      localStorage.removeItem('isAdmin');
//      localStorage.removeItem('sendItems');
      var code = getQueryString('code');
      if (code) {
        var url = this.$store.state.serverHost + 'cmy/cmy/sCommunitymanager/loginByQRcode';
        this.$http.get(url, {
            params: {
              code: code
            }
          })
          .then(function (response) {
            if(!vm.$store.state.userInfo) {
              vm.$store.state.userInfo = {};
            };
            vm.$store.commit('updateToken', response.data.rows[0].access_token);
            vm.$store.commit('updateUid', response.data.rows[0].userid);
            vm.checkManager();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      document.onmouseup = function () {
        document.onmousemove = null;
        if (vm.ii >= 213) {
          vm.ii = 213;
        } else {
          vm.ii = 0;
        }
      };
    }
  }
</script>
<style scoped>

</style>
