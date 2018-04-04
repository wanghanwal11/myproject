/**
* Created by bk on 2017/3/28.
*/
<template>
    <div>
        <!--<my-head></my-head>-->
        <div class="wrap" >
            <transition name="slide-fade">
                 <LazyKeep></LazyKeep>
            </transition>
        </div>
        <my-nav></my-nav>
        <!--<my-sideBar></my-sideBar>-->
    </div>
</template>

<script type="es6">
    var vm;
    var stompClient = null;
    var flag = false;
    import myHead from '../components/header'
    import myNav from '../components/nav'
    import '../../static/js/sockjs.js'
    import '../../static/js/stomp.js'

    export default {
        name: 'admin',
        components: {
            myHead,
            myNav
        },
        data(){
            return {
                flag : false,
                index: -1,
                subscribeArray: [],
                chatdata: ""
            }
        },
        // watch: {
        //     sessionList() {
        //         //重新链接webSocket
        //         if (stompClient != null) {  
        //             stompClient.disconnect();  
        //         }  
        //         this.initWebSocket();
        //     },
        // },
        created: function() {
            vm = this;
            this.getSessionList();
            this.open(); // 调用该方法的目的是为了加上全局的noticePush方法
            debugger
            
        },
        methods:{
            open () {
                var self = this;
                window.noticePush = function (id) {
                    self.$router.push({
                        name:"EntryOrder",
                        query:{
                            orderId:id
                        }
                    });
                }
            },
            getSessionList(){
                var url = this.$store.state.serverHost + 'wx/WeixinConversation/WeixinConversation/getConversation';
                this.$http.get(url,{
                    params:{
                        communityid : this.$store.state.userInfo.streetorcommunityid,
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                        page : this.page,
                        rows : 12,
                        isclosed : 1
                    }
                })
                .then(function(response){
                    if(response.data.newPrimaryKeys.linkman.length>0){
                        vm.allpage++;
                    }
                    vm.$store.commit('updateSessionList', response.data.newPrimaryKeys.linkman);
                    vm.initWebSocket();
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            initWebSocket(){
                var vm = this; 
                var sockStr = this.$lazy.url.host + ":8092/endpointWechat";
                var sock = new SockJS(sockStr);  
                //http://101.200.181.121:8092/endpointWechat
                //var sock = new SockJS( "http://192.168.0.10:8089/endpointWechat" );     
                stompClient = Stomp.over(sock);
                stompClient.connect({}, function (frame) {
                    stompClient.subscribe('/queue/conversations-' +vm.$store.state.userInfo.streetorcommunityid + vm.$store.state.userInfo.streetorcommunity ,function (response) {
                        debugger
                        console.log(JSON.parse(response.body));
                        var pushId = JSON.parse(response.body).id;
                        for(var i=0; i<vm.$store.state.message.sessionList.length; i++){
                            if(vm.$store.state.message.sessionList[i].id == pushId){
                                vm.flag = true; //找到当前这个人
                                vm.index = i;
                            }
                        }
                        if(vm.flag == false){   //没有找到这个人,将本人追加到列表中去。
                            debugger;
                             vm.$store.state.message.sessionList.unshift(JSON.parse(response.body));
                             vm.everywords(0);
                        }else{
                            //vm.$set(vm.$store.state.message.sessionList,vm.index,JSON.parse(response.body));
                            vm.flag = false;
                            if(vm.index == 0){ //当前人在第一的位置，就设置让其最后一句话显示。
                                vm.$set(vm.$store.state.message.sessionList,vm.index,JSON.parse(response.body));
                            }else{
                                //否则的话，就删除当前这个人，然后追加到列表的第一位置处。
                                // vm.subscribeArray[0].unsubscribe();
                                debugger;
                                vm.subscribeArray[vm.index].unsubscribe();
                                vm.$store.state.message.sessionList.splice(vm.index,1);
                                vm.$store.state.message.sessionList.unshift(JSON.parse(response.body));
                                vm.everywords(0);
                                //vm.$store.state.message.sessionList.push(JSON.parse(response.body));
                                // var subscribe0 = vm.everywords(0);
                                // var subscribe1 = vm.everywords(vm.index);
                                // vm.subscribeArray[0] = subscribe0;
                                // vm.subscribeArray[vm.index] = subscribe1;       
                            }
                            vm.index = -1;
                        }
                        if(vm.$router.currentRoute.fullPath != '/conversations'){
                            vm.$store.commit('updateIsMsg', true);
                        }else{
                            vm.$store.commit('updateIsMsg', false);
                        }
                    });

                    //点击后监听粉丝推送过来的消息(列表与聊天区域同时监听推送过来的消息) 
                    for(var i=0; i<vm.$store.state.message.sessionList.length; i++){
                        (function(index){   
                            vm.everywords(index);
                        })(i);
                    }

                    //订单推送
                    stompClient.subscribe('/queue/notifications-' + localStorage.uid , function (response) { 
                         vm.$Notice.open({
                            title: '企业拒绝接单',
                            desc: '<a href="javascript:void(0)" onclick="noticePush(' + response.body + ')">重新派单</a>',
                            duration: 0,
                            name: frame.body,
                            onClose: function() {

                            }
                        });
                        var num = vm.$store.state.nav.orderNumOfReSend + 1;
                        vm.$store.commit('updateOrderNumOfReSend', num);                     
                    });

                    //居民数推送
                    stompClient.subscribe('/queue/Subscribe-' + +vm.$store.state.userInfo.streetorcommunityid + vm.$store.state.userInfo.streetorcommunity , function (response) {
                         console.log(response);
                         //var nums = vm.$store.state.nav.citizen + 1;
                         //vm.$store.commit('updatenum', nums);
                         this.$lazy.data.isTrue = true;                     
                    });
                })
            },
            everywords (index) {
                var subscribe = stompClient.subscribe('/queue/everywords-' + vm.$store.state.message.sessionList[index].id ,function (response) {
                    debugger
                    console.log(JSON.parse(response.body))
                    if(JSON.parse(response.body).everyword.type != 0){
                        vm.$store.state.message.chatArr.unshift(JSON.parse(response.body).everyword); 
                    }
                    vm.$set(vm.$store.state.message.sessionList,index,JSON.parse(response.body).conversation);

                    if(vm.$router.currentRoute.fullPath != '/conversations'){
                        vm.$store.commit('updateIsMsg', true);
                    }else{
                        vm.$store.commit('updateIsMsg', false);
                    }
                });
                if(index == 0){
                    debugger;
                    this.subscribeArray.unshift(subscribe);
                } else {
                    this.subscribeArray[index] = subscribe;
                }
                return subscribe;
            }
        }
    }
</script>

<style scoped>
    .wrap {
        position: absolute;
        left: 220px;
        top: 45px;
        right: 0px;
        bottom: 0px;
    }
</style>

 