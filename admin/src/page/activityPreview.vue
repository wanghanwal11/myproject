/**
* Created by bk on 2017/5/17.
*/
<template>
    <div class="activePreview">
       <!--  <LazyTopbar :data="json"  style="position:fixed;top:45px;left:0;right:0;z-index:1;padding-left:235px;"></LazyTopbar> -->
        <!--<div class="collectBtn" @click="collectArticle">收藏</div>-->
        <div class="infoBox">
            <div class="title">
                <h1>{{ infoTitle }}</h1>
                <div class="time">
                    <span>{{ time }}</span>
                </div>
               <!--  <p class="jianjie">{{ summary }}</p> -->
            </div>
            <div v-if="infoPic" class="picBox" :style="{backgroundImage:'url('+infoPic+')'}"></div>
            <div class="footer articlePreview">
                <p v-html="content"></p>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    var vm;
    export default {
        name: 'activePreview',
        data (){
            return {
                infoPic : "",
                infoTitle : "",
                starttime : "",
                contact : "",
                content:"",
                summary : ""
            }
        },
        components: {

        },

        created: function(){
            vm = this;
            this.id = this.$router.history.current.query.routeParams;
            debugger;
            console.log(this.id);
            vm.searchActivityInfo();
        },

        methods:{
            searchActivityInfo(){
              var url = this.$store.state.serverHost + this.$lazy.url.activityInfo;
              this.$http.get(url, {
                    params: {
                      id : this.id,
                    }
                })
                .then(function (response) {
                    debugger
                    console.log(response);
                    vm.infoPic = response.data.rows[0].cover;
                    vm.infoTitle = response.data.rows[0].title;
                    vm.starttime = response.data.rows[0].starttime;
                    vm.contact = response.data.rows[0].contact;
                    vm.content = response.data.rows[0].content;
                    vm.summary = response.data.rows[0].summary.replace(/<[^>]+>/g,"");
                })
                .catch(function (error) {
                  console.log(error)
                })
            }
        }
    }

</script>
<style scoped>
    .infoBox{
        width:760px;
        height:auto;
        margin:0 auto;
        padding-top:65px;
    }
    .time{
        font-size: 16px;
        padding-top:20px;
        color:#999999;
    }
    .jianjie{
        padding-top:41px;
        font-size:20px;
    }
    .footer{
        margin-top:50px;
    }

    .picBox{
        width:760px;
        height:422px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-top:50px;
    }

</style>
