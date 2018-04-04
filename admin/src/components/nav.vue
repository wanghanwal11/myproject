/**
* Created by bk on 2017/3/28.
*/
<template>
    <div class="nav">
        <!--<div class="title"><img src="../assets/images/wenzi.png" alt=""></div>-->
        <div class="logo" style="position:relative;">
            <div class="logoIcon" @click="routeTo('commInfo')">
                <img v-if="this.$store.state.nav.photo" :src="this.$store.state.nav.photo" alt=""/>
                <img v-else src="../assets/images/logos.png" alt=""/>
            </div>
            <div class="logoFont" @click="routeTo('communityInfo')">
                {{this.$store.state.nav.systemName}}
            </div>
            <div class="businessType">

                <span class="sq" @click="routeTo('CitizenList')">
                    <Tooltip content="居民" placement="top">
                        <!-- <img style="width: 20px;height: 22px;" src="../assets/images/ren.png" > -->
                        <div style="height:22px;" @click="getNum">
                            <span class="iconbox"></span>
                            <img src="../assets/images/dian.png" alt="" class="dian" v-if="isTrue">
                        </div>
                        <div class="count">{{ citizen }}</div>
                    </Tooltip>
                </span>
                <div class="borderLeft"></div>
                <span class="sq" @click="routeTo('EnterpriseLists')">
                    <Tooltip content="服务提供者" placement="top">
                        <!-- <img style="width: 18px;height: 25px;" src="../assets/images/lou.png" > -->
                        <div style="height:22px;">
                            <span class="iconlou"></span>
                        </div>
                        <div class="count">{{ provide }}</div>
                    </Tooltip>
                </span>
                <div class="borderLeft"></div>
                <span class="sq " @click="routeTo('PeopleList')">
                    <Tooltip content="社工" placement="top">
                     <!--    <img style="width: 30px;height: 24px;" src="../assets/images/worker.png" > -->
                            <div style="height:22px;">
                                <span class="iconworker"></span>
                            </div>
                            <div class="count">{{ worker }}</div>
                    </Tooltip>
                </span>

            </div>
        </div>
        <div class="menuBox">
            <div class="menu" @click="routeTo('conversations')" style="position:relative">
                <img style="margin-top: 13px;margin-right: 16px;" src="../assets/images/con-icon.png" >消息
                <span v-show="this.$store.state.userInfo.isMsg" style="display:block;width:20px;height:17px;background-color:#ed3f14;border-radius:40%;position:absolute;top:14px;left:80px"></span>
            </div>
			<div class="menu" @click="routeTo('articleList')">
                <img style="margin-top: 13px;margin-right: 20px;" src="../assets/images/article-icon.png" >图文
                <svg class="icon-add" aria-hidden="true" style="margin-top:13px;margin-right:10px;" @click="routeTo('kong2')">
                    <use xlink:href="#icon-tianjia1"></use>
                </svg>
            </div>
            <div class="menu" @click="routeTo('activityCount')">
                <img style="margin-top: 13px;margin-right: 18px;" src="../assets/images/activity-icon.png" >活动
                <svg class="icon-add" aria-hidden="true" style="margin-top:13px;margin-right:10px;"  @click="routeTo('huodongbj')">
                    <use xlink:href="#icon-tianjia1"></use>
                </svg>
            </div>
            <div class="menu" @click="routeTo('orderListM')">
                <img style="margin-top: 13px;margin-right: 17px;" src="../assets/images/order-icon.png" >订单
                <Badge :count="this.$store.state.nav.orderNumOfReSend" overflow-count="99"></Badge>
                <svg class="icon-add" aria-hidden="true" style="margin-top:13px;margin-right:10px;" @click="routeTo('entryOrder')">
                    <use xlink:href="#icon-tianjia1"></use>
                </svg>
            </div>
          <div class="menu" @click="routeTo('toupiaolb')">
            <img style="margin-top: 13px;margin-right: 17px;" src="../assets/images/toupiao.png" >投票
            <svg class="icon-add" aria-hidden="true" style="margin-top:13px;margin-right:10px;" @click="routeTo('toupiaotj')">
              <use xlink:href="#icon-tianjia1"></use>
            </svg>
          </div>
            <!--<div class="menu" @click="routeTo('appealInfo')">-->
                <!--<img style="margin-top: 13px;margin-right: 20px;" src="../assets/images/appeal.png" >诉求-->
                <!--&lt;!&ndash; <svg class="icon-add" aria-hidden="true" style="margin-top:13px;margin-right:10px;" @click="routeTo('entryOrder')">-->
                    <!--<use xlink:href="#icon-tianjia1"></use>-->
                <!--</svg> &ndash;&gt;-->
            <!--</div>-->
          <!--<div class="menu" @click="routeTo('noticmodal')">-->
            <!--<img style="margin-top: 13px;margin-right: 20px;" src="../assets/images/tuisong.png" >推送-->
          <!--</div>-->
        </div>

        <!--<div class="nav-footer">-->
			<!--<div class="manage"  :class="{nowIcon: 1 == footNavNum}"  @click="footRouteTo('knowledgeBase',1)">-->
                <!--<svg class="manage-icon" aria-hidden="true">-->
                    <!--<use xlink:href="#icon-zhishikuguanli-"></use>-->
                <!--</svg>-->
            <!--</div>-->
            <!--<div class="manage" :class="{nowIcon: 2 == footNavNum}"  @click="footRouteTo('development',2)">-->
                <!--<svg class="manage-icon" aria-hidden="true">-->
                    <!--<use xlink:href="#icon-ziyuanku"></use>-->
                <!--</svg>-->
            <!--</div>-->
            <!--<div class="manage"  :class="{nowIcon: 3 == footNavNum}"  @click="footRouteTo('library',3)">-->
                <!--<svg class="manage-icon" aria-hidden="true">-->
                    <!--<use xlink:href="#icon-zhishiku01"></use>-->
                <!--</svg>-->
            <!--</div>-->
        <!--</div>-->
        <div class="nav-footer-new">
            <div class="nav-footer-new-content">
                 <!--<Poptip  trigger="hover" placement="top-start" style="cursor:pointer;float:left;">-->
                    <!--<img v-if="this.$store.state.headpicurl" :src="this.$store.state.headpicurl">-->
                    <!--<img v-else src="../assets/images/moren.png">-->
                     <!--<div slot="content">-->
                         <!--<div @click="back">退出</div>-->
                     <!--</div>-->
                 <!--</Poptip>-->
                <!--<span>{{this.$store.state.nav.userName}}</span>-->
                <Dropdown placement="top-start" @on-click="selectItem">
                    <div style="width: 220px">
                        <img v-if="this.$store.state.headpicurl" :src="this.$store.state.headpicurl">
                        <img v-else src="../assets/images/moren.png">
                        <span>{{this.$store.state.nav.userName}}</span>
                    </div>
                    <DropdownMenu slot="list">
                        <DropdownItem name="0" style="text-align: center">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>

<script type="es6">
    import cPhone from '../assets/images/TDLOGO.png'
    import Tooltip from 'iview/src/components/tooltip'
    import Badge from 'iview/src/components/badge'
    import Poptip from 'iview/src/components/poptip'
    import Dropdown from 'iview/src/components/dropdown'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
    var vm;
    export default {
        name: 'hello',
        data () {
            return {
                cPhoto: this.$store.state.nav.photo,
                systemName: '鞍山市云平台',
                footNavNum: 0,
                citizen: 0,
                provide: 0,
                worker: 0,
                invokeIdCnt: 0,
                OrderNumOfReSend: 0,
                isTrue: false
            }
        },
        components:{
            Tooltip,
            Badge,
            Poptip,
            Dropdown,
            DropdownMenu,
            DropdownItem
        },
        stompClient:{
            monitorIntervalTime: 100,
            stompReconnect: true,
            timeout(orgCmd) {
            //...
            }
        },
        methods: {
            // open () {
            //     var self = this;
            //     window.noticePush = function (id) {
            //         self.$router.push({
            //             name:"EntryOrder",
            //             query:{
            //                 orderId:id
            //             }
            //         });
            //     }
            // },
            routeTo(routeName) {
                event.stopPropagation(); //阻止冒泡
                this.$router.push(routeName);
                this.footNavNum = 0;
            },
            footRouteTo(routeName, num) {
                this.$router.push(routeName);
                this.footNavNum = num;
            },
            // onConnected(frame){
            //     console.log('Connected: ' + frame);
            // //...
            //     debugger;
            //     //var webSocketUrl = '/queue/notifications-' + this.$store.state.userInfo.access_token;
            //     //this.$stompClient.subscribe(webSocketUrl + localStorage.uid, this.responseCallback, this.onFailed);
            //     //this.$stompClient.subscribe('/queue/notifications-' + localStorage.uid , function(frame) {
            //     //    debugger;
            //     //    //console.log("responseCallback msg=>" + frame.body);
            //     //    this.$Notice.open({
            //     //        title: '企业拒绝接单',
            //     //        desc: '<a href="/ServiceOrder?orderid="' + frame.body + '>重新派单</a>',
            //     //        duration: 0
            //     //    });
            //     //}, this.onFailed);
            //     //this.$stompClient.subscribe('/queue/subscribemessage-' + localStorage.initid , function(frame) {
            //     //    debugger;
            //     //    //console.log("responseCallback msg=>" + frame.body);
            //     //    this.$Notice.open({
            //     //        title: '企业拒绝接单',
            //     //        desc: '<a href="/ServiceOrder?orderid="' + frame.body + '>重新派单</a>',
            //     //        duration: 0
            //     //    });
            //     //}, this.onFailed);
            //     //推送过来的市民的消息(暂时不用)
            //     this.$stompClient.subscribe('/queue/Subscribe-' + localStorage.initid , function(frame) {
            //        debugger;
            //        //console.log("responseCallback msg=>" + frame.body);
            //        vm.citizen = vm.citizen + parseInt(frame.body);
            //     }, this.onFailed);
            //     // this.send();
            // },
            // onFailed(frame){
            //     debugger;
            //     console.log('Failed: ' + frame);
            // //...
            // },
            // connectSrv(){
            //     var headers = {
            //         //"login": 'guest',
            //         //"passcode": 'guest',
            //         // additional header
            //         //...
            //     };
            //     //不能使用域名，直接用外网ip
            //     this.connetWM('http://101.200.52.9:8097/endpointOrder',headers, function (frame) {
            //         vm.$stompClient.subscribe('/queue/notifications-' + localStorage.uid , function(frame) {
            //             debugger;
            //             console.log("responseCallback msg=>" + frame.body);
            //             //vm.$Notice.open({
            //             //    title: '企业拒绝接单',
            //             //    desc: '<a href="/ServiceOrder?orderid=' + frame.body + '">重新派单</a>',
            //             //    duration: 0
            //             //});
            //             vm.$Notice.open({
            //                 title: '企业拒绝接单',
            //                 desc: '<a href="javascript:void(0)" onclick="noticePush(' + frame.body + ')">重新派单</a>',
            //                 duration: 0,
            //                 name: frame.body,
            //                 onClose: function() {

            //                 }
            //             });
            //             //vm.$Notice.close("3496943345042432");
            //             var num = vm.$store.state.nav.orderNumOfReSend + 1;
            //             vm.$store.commit('updateOrderNumOfReSend', num);
            //         }, vm.onFailed);
            //     }, this.onFailed);
            //     //推送过来的市民的消息(暂时不用)
            //     // this.connetWM(this.$lazy.url.host + ':8092/endpointWechat',headers, this.onConnected, this.onFailed);
            //     //this.connetWM(this.$lazy.url.host + ':8097/endpointWisely',headers, this.onConnected, this.onFailed);
            // },
            // getInvokeId(){
            //     let hex = (this.invokeIdCnt++ ).toString(16);
            //     var zero = '0000';
            //     var tmp  = 4-hex.length;
            //     return zero.substr(0,tmp) + hex;
            // },
            // send(){
            //     let destination = '/app/welcomeresponse';
            //     let invokeId = this.getInvokeId();
            // //...
            //     let body = {};
            //     this.sendWM(destination, JSON.stringify({ 'name': '1' }), invokeId, this.responseCallback, 3000);
            // },
            // responseCallback(frame){
            //     debugger;
            //     console.log("responseCallback msg=>" + frame.body);
            //     //let invokeId = frame.body.substr(invokeIdIndex, 4);
            //     //this.removeStompMonitor(invokeId);
            //     //this.disconnect();
            // },
            // disconnect(){
            //     this.disconnetWM();
            // },
            getOrderNumOfReSend () {
                debugger;
                var url = this.$lazy.url.host + this.$lazy.url.OrderNumOfReSend;
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            //vm.OrderNumOfReSend = response.data.newPrimaryKeys.num;
                            vm.$store.commit('updateOrderNumOfReSend', response.data.newPrimaryKeys.num);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            back(){
                this.$router.push('/');
            },
            selectItem(num) {
                if(num === '0'){
                    this.$router.push('/');
                }
            },

            getNum(){
                debugger
                this.isTrue = false;
               var urlWechatUserNum = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getWechatUserNum';
                this.$http.get(urlWechatUserNum, {
                    params: {
                        communityid: vm.$store.state.userInfo.streetorcommunityid,
                        communitytype: vm.$store.state.userInfo.streetorcommunity
                    }
                })
                .then(function (res) {
                    vm.citizen = res.data;
                    //vm.$store.commit('updatenum', res.data);

                }) 
            }

        },
        created: function () {
           vm = this;
            // this.open(); // 调用该方法的目的是为了加上全局的noticePush方法
            // this.connectSrv();
            this.$store.commit('updatePath', cPhone);
            //var url = vm.$store.state.serverHost + 'cmy/cmy/sCommunityinfo/get';
            var url = vm.$store.state.serverHost + 'cmy/cmy/sCommunityinfo/list';
            this.$http.get(url, {
                params: {
                    streetorcommunityid: this.$store.state.userInfo.streetorcommunityid,
                    streetorcommunity: this.$store.state.userInfo.streetorcommunity
                }
            })
                    .then(function (response) {
                        console.log(response);
                        var data = response.data.rows[0];
                        var path = data.photopath;
                        vm.$store.commit('updatePath', path);
                        vm.$store.commit('updateSystemName', data.streetorcommunityname);
                        //vm.$store.state.nav.photo = data.photopath;
                        //vm.$store.state.nav.systemName = data.streetorcommunityname;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            var urlUserNum = vm.$store.state.serverHost + 'uc/uc/tuser/getTUsreNum';
            this.$http.get(urlUserNum, {
                params: {
                    communityid: vm.$store.state.userInfo.streetorcommunityid,
                    communitytype: vm.$store.state.userInfo.streetorcommunity
                }
            })
                    .then(function (res) {
                        vm.worker = res.data;
                    })
            var urlProviderNum = vm.$store.state.serverHost + 'support/sup/Supserviceprovider/getProviderNum';
            this.$http.get(urlProviderNum, {
                params: {
                    communityid: vm.$store.state.userInfo.streetorcommunityid,
                    communitytype: vm.$store.state.userInfo.streetorcommunity
                }
            })
                    .then(function (res) {
                        vm.provide = res.data;
                    })
            var urlWechatUserNum = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getWechatUserNum';
            this.$http.get(urlWechatUserNum, {
                params: {
                    communityid: vm.$store.state.userInfo.streetorcommunityid,
                    communitytype: vm.$store.state.userInfo.streetorcommunity
                }
            })
                .then(function (res) {
                    vm.citizen = res.data;
                    //vm.$store.commit('updatenum', res.data);

                })
            this.getOrderNumOfReSend();

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .title{
        height:45px;
        background: #306dd2;
        line-height: 50px;
        text-align:center;
    }

    .nav{
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        width: 220px;
        border-radius: 0px;
        z-index: 2;
        box-shadow: 0px 1px 1px 0px rgb( 60, 102, 165 );
        background: #3c7ce6;
    }
    .logo {
        width: 220px;
        padding-top: 40px;
    }
    .logoIcon {
        width: 90px;
        height: 90px;
        margin: 0px auto;
        border-radius: 50%;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        background-image:url(../assets/images/jianbian.png);
    }
    .logoIcon img{
    	width: 84px;
        height: 84px;
        border-radius:50%;
        position: absolute;
        left:3%;
        top:3%
    }
    .logoFont{
        margin-top: 17px;
        text-align: center;
        color: #FFF;
        letter-spacing: 2px;
        font-size: 16px;
        font-family: "Microsoft YaHei";
        cursor: pointer;
        padding:0 10px;
    }
    .logoFontE{
        text-align: center;
        color: #FFF;
        font-size: 14px;
        opacity: 0.5;
    }
    .nav .ivu-menu{
        width: 310px;
        padding: 5px 0px;
        background-color: #3b7ae4;
    }
    .ivu-icon-white{
        width: 20px;
        height: 20px;
        margin-right: 20px;
        color: #FFF;
    }
    .ivu-menu-item {
        padding-left: 20px;
        text-align: left;
        font-size: 18px;
        color: rgb( 244, 247, 254 );

    }
    .sq{
    	cursor: pointer;
    }
    .menuBox{
    	margin-top: 40px;
    }
    .menu {
    	width: 180px;
    	height: 44px;
    	line-height: 44px;
    	margin: 14px auto 0;
        padding-left: 14px;
        text-align: left;
        font-size: 14px;
        color: #bbd2ff;
        background:rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        cursor: pointer;
        border:1px solid #3c7ce6;
    }
    .menu:hover{
        border:1px solid #6396eb;
    }
    .menu img{
    	vertical-align: top;
    }
    .add{
    	width: 20px;
    	height: 20px;
    	float: right;
    	margin-top: 20px;
    	margin-right: 20px;
    	background: #3971dd;
    	cursor: pointer;
    }
    .add img{
    	margin-top: 0px;
    }
    .wBadge{
        margin-left: 50px;
        width: 20px;
        height: 20px;
    }
    .nav-footer {
    	width: 100%;
        position: absolute;
        bottom: 0px;
        text-align: center;
        color: #6c94fe;
    }


    .businessType {
        position: relative;
        margin-top: 36px;
        color: #fff;
        text-align: center;
        height:50px;
    }
    .businessType > span {
        display: inline-block;
        width: 30%;
        height: 50px;
    }
    .borderLeft{
        position: absolute;
        display: inline-block;
    	border-left: 1px solid #6094ea;
        height: 40%;
        top: 10px;
    }
    .count{
        font-size: 12px;
    }
    .icon-zitigui-xianxing:before {
        font-family: iconfont;
        font-size: 20px;
    }
    .manage{
    	width: 33.33%;
    	height: 48px;
    	//border-top: 4px solid #407fe8;
    	background: #407fe8;
    	float: left;
    	cursor: pointer;
    }
    .manage-icon{
    	width: 24px;
        height: 28px;
        margin: 12px auto;
        fill: #88a8ff;
    }
    .nowIcon{
    	//border-top: 4px solid #3a70cb;
    	background: #4889f6;
    }
    .nav-footer > span {
        display: inline-block;
        width: 30%;
        height: 60px;
    }
    .icon-add{
        width: 18px;
        height: 18px;
        margin: 5px 5px 0 0;
        float: right;
        fill: #bbd2ff;
    }
    .iconbox{
        background-image: url(../assets/images/ren.png);
        width:20px;
        height:22px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
    }
    .iconbox:hover{
        background-image: url(../assets/images/rens.png);
        width:20px;
        height:22px;
        display: inline-block;
    }
    .iconlou{
        background-image: url(../assets/images/lou.png);
        width:20px;
        height:22px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
    }
    .iconlou:hover{
        background-image: url(../assets/images/lous.png);
        width:24px;
        height:22px;
        display: inline-block;
    }
    .iconworker{
        background-image: url(../assets/images/worker.png);
        width:24px;
        height:22px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
    }
    .iconworker:hover{
        background-image: url(../assets/images/workers.png);
        width:26px;
        height:22px;
        display: inline-block;
    }
    .nav-footer-new {
        width: 100%;
        height: 50px;
        line-height: 50px;
        position: absolute;
        bottom: 0;
        /*left: 50%;*/
        /*transform: translateX(-50%);*/
        background-color: #306dd2;;
    }
    .nav-footer-new-content {
        width: 180px;
        margin: 10px auto;
    }
    .nav-footer-new img {
        width: 30px;
        height: 30px;
        float: left;
        margin-right:10px;
    }
    .nav-footer-new-content span{
        float: left;
        height:30px;
        line-height: 30px;
        color:#fff;
        font-size:14px;
    }
    .dian{
        display:block;
        position:absolute;
        right:-7px;
        top:-5px;
    }
</style>
