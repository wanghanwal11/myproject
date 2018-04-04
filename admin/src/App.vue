<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    import { mapState } from 'vuex'
    export default {
        name: 'app',
        data () {
          return {

          }
        },
        computed: mapState({
            streetorcommunityid (state) {
                debugger;
                if(state.userInfo.streetorcommunityid == 0) {
                    //state.userInfo.streetorcommunityid = localStorage.streetorcommunityid;
                    //state.userInfo.streetorcommunity = localStorage.streetorcommunity;
                    //state.userInfo.access_token = localStorage.token;
                    this.$store.commit('updateCommunity',localStorage.streetorcommunity);
                    this.$store.commit('updateCommunityid',localStorage.streetorcommunityid);
                    this.$store.commit('updateheadpicurl',localStorage.headpicurl);
                    this.$store.commit('updateToken',localStorage.token);
                    this.$store.commit('updateUid',localStorage.uid);
                    this.$store.commit('updateinitid',localStorage.initid);
                  this.$store.commit('updateCityCode', localStorage.cityCode);
                  this.$store.commit('updateCityLatLng', localStorage.cityLatLng);
                  this.$store.commit('updateIsAdmin', localStorage.isAdmin);
                    this.$store.commit('updateUserName', localStorage.userName);
                }
                return state.userInfo.streetorcommunityid;
            }
        }),
        created: function () {
            this.$Notice.config({
                top: 70,
                duration: 3
            });
            this.$Message.config({
                duration: 3
            });
            console.log(this.streetorcommunityid);
        }
    }
</script>


<style lang="scss">
    @import "sass/custom.scss";

    #app {
        width: 100%;
        height: 100%;
        font-family: "微软雅黑";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
