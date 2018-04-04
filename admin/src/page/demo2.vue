<template>
  <login @event="get"></login>
</template>
<script>
  import login from '../components/login'
  export default {
    data: {},
    components: {
      login
    },
    methods: {
      get: function (fun) {
//        alert(JSON.stringify(fun));
        this.handleSubmit(name);
      },
      handleSubmit: function (name) {
        var vm = this;
        var url = this.$store.state.serverHost + 'uc/uc/tuser/testLogin';
        this.$http.get(url)
          .then(function (response) {
            console.log(response);
            vm.$store.commit('updateToken', response.data.rows[0].access_token);
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
            if (response.data.newPrimaryKeys.resultStr == 0) {
              vm.$router.push('/register');
              vm.$store.state.headpicurl = response.data.newPrimaryKeys.headpicurl;
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
              vm.$store.commit('updateheadpicurl', '');
            } else {
              vm.$store.commit('updateinitid', response.data.rows[0].initid);
            }
            if (vm.$store.state.communityDetail.initid) {
              vm.$router.push('/list');
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

    }
  }
</script>
<style scoped>

</style>
