/**
* Created by bk on 2017/11/07.
*/
<template>
    <LazyLayout>
        <LazyBox class="conversations">
            <LazyLayout style="min-width:1086px;min-height:537px;">
                <LazyLayout class="peopleList" orient="v">
                    <div class="search">
                        <Input size="large" placeholder="自动搜索" @on-enter="searchPeople" v-model="value"></Input>
                        <svg class="photoMask-icon" aria-hidden="true" v-if="isSearchIcon" @click="searchPeople">
                            <use xlink:href="#icon-fangdajing"></use>
                        </svg>
                        <div class="deleteBox" v-if="isDeleteIcon" @click="deleteBox">
                            <svg class="title-icons" aria-hidden="true" style="margin-left:4px;">
                                <use xlink:href="#icon-guanbi-copy"></use>
                            </svg>  
                       </div>
                    </div>
                    <LazyBox>
                        <div class="searchBox" v-if="isSearchBox" @scroll="scrollSearchBox">
                            <div ref="p0">
                                <div v-show="peopleArr[0].length != 0">
                                    <div class="searchDiv"  v-for="item in peopleArr[0]" @click="savePeople(item.initid,item.openid,item.username,item.realname,item.headpicture,item.sex,item.id)" >
                                        <dl>
                                            <dt><img :src="item.headpicture" alt=""></dt>
                                            <dd>{{ item.realname ? item.realname : item.username }}</dd>
                                        </dl> 
                                    </div>
                                </div>
                                <div v-show>没有相关人员</div>
                            </div>
                            
                            <div ref="p1">
                                <div v-show="peopleArr[1].length != 0">
                                    <div class="searchDiv"  v-for="item in peopleArr[1]" @click="savegroup(item.stategroup,item.peoplestate)">
                                        <dl>
                                            <dt><img src="../assets/images/qun.png" alt=""></dt>
                                            <dd>{{ item.peoplestate }}</dd>
                                        </dl> 
                                    </div>
                                </div>
                                <div v-show>没有相关群组</div>
                            </div>
                            <!-- <div v-show="peopleArr[0].length == 0">
                                <dl>
                                    <dd>没有相关人员</dd>
                                </dl>
                            </div> 
                            <div v-show="peopleArr[1].length == 0 ">
                                <dl>
                                    <dd>没有相关人员</dd>
                                </dl>
                            </div>  -->
                        </div>
                        <div class="peopleBox" @scroll="scrollSessionList">
                            <div :class="{'users': true}" ref="users">
                                <dl v-for="(item,index) in sessionList" :class="{'bg' : bgindex == index}" @click="getMessage(item.headpicture,item.username,item.realname,item.sex,item.swchecked,item.id,item.openid,item.initid,index,item.iskefu,$event,item.stategroup,item)" @mouseenter="enter(index)"  @mouseleave="leave(index)">
                                    <dt v-if="item.headpicture">
                                        <img :src="item.headpicture" alt="" v-if="item.isonline">
                                        <img :src="item.headpicture" alt="" v-else class="gray">
                                    </dt>
                                    <dt v-else>
                                        <img src="../assets/images/qun.png" alt="">  
                                    </dt>
                                    <dd>
                                        <p v-if="item.realname ? item.realname : item.username">
                                            {{ item.realname ? item.realname : item.username }}
                                            <span>{{$lazy.FormatDate(parseInt(item.lastupdatetime),'MM-dd   HH:mm')}}</span>
                                        </p>
                                        <p v-else>
                                            <span>{{$lazy.FormatDate(parseInt(item.lastupdatetime),'MM-dd   HH:mm')}}</span>
                                        </p>
                                        <p>
                                            {{ item.lastconent }}
                                            <!-- <span v-show="item.conversationcount" v-if="isSave == false" ref="span">{{ item.conversationcount }}</span> -->
                                            <span v-show="item.conversationcount" ref="span">{{ item.conversationcount }}</span>
                                            <!-- <span v-if="isSave == true" ref="span" style="display:none"></span> -->
                                            <!--  <span v-if="isSave == true" style="display:none"></span>  -->
                                        </p>
                                        <div class="del" ref="delete" @click="clickMe(index)">
                                            <div class="deleteBoxs" @click="deleteFans(item,index)">
                                                <svg class="title-icons" aria-hidden="true" style="margin-left:4px;">
                                                    <use xlink:href="#icon-guanbi-copy"></use>
                                                </svg> 
                                            </div>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </LazyBox>
                    <!-- <div class="service">
                         <dl @click="getServiceChat(items.id,items.username,items.headpicture,items.initid,items.openid,items.iskefu)" v-for="items in kefuArr">
                            <dt v-if="items.headpicture">
                                <img :src="items.headpicture" alt="">
                            </dt>
                            <dt v-else>
                                <img src="../assets/images/moren.png" alt="">
                            </dt>
                            <dd>
                                <p>{{ items.username ? items.username : '客服' }}
                                    <span v-if='items.lastupdatetime'>{{$lazy.FormatDate(parseInt(items.lastupdatetime),'HH:mm')}}</span>
                                    <span v-else></span>
                                </p>
                                <p>{{ items.lastconent }}
                                    <span v-show="items.conversationcount" ref="showNum">{{ items.conversationcount }}</span>
                                </p>
                            </dd>
                        </dl>
                    </div>-->
                </LazyLayout>
                <div class="chatBox">
                    <LazyLayout orient="v">
                        <div class="chatHeader">
                            <span style="position:absolute;top:1.6%;left:1.4%;">{{ name }}</span>    
                        </div>
                        <div class="chatDiv" id="chat" ref="chat" @scroll="scrollSearchChat" v-if="chatArr.length !=0">
                            <div class="chaicon" v-if="isShow">
                                <img src="../assets/images/seeicon.png" alt="" @click="clickMore" style="cursor:pointer">
                            </div>
                            <div v-for="(item,key) in chatArr"  class="chat">  <!-- v-if="isShowChat" -->
                                <div class="chatInfoMe">
                                    <dl>
                                        <dd v-if="chatArr[chatArr.length-1-key].type == 0">
                                            <span >{{ chatArr[chatArr.length-1-key].content }}</span>
                                            <img src="../assets/images/rightme.png" alt="">
                                        </dd>
                                        <dt v-if="chatArr[chatArr.length-1-key].type == 0">
                                            <img :src="$store.state.headpicurl" alt="">
                                        </dt>
                                    </dl>  
                                </div> 
                                <div class="chatInfoUser">
                                    <dl>
                                        <dt v-if="chatArr[chatArr.length-1-key].type == 1">
                                            <img :src="photo" alt="">
                                        </dt> 
                                        <dd v-if="chatArr[chatArr.length-1-key].type == 1">
                                            <p>{{ name }}</p>
                                            <p>
                                                <img src="../assets/images/leftyou.png" alt="" class="leftyou">
                                                {{ chatArr[chatArr.length-1-key].content }}
                                                <img :src="chatArr[chatArr.length-1-key].uploadpicture" v-if="chatArr[chatArr.length-1-key].uploadpicture" class="upimg" @click="modalShow(chatArr[chatArr.length-1-key].uploadpicture)">
                                            </p>
                                        </dd>  
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="noData" v-else>
                            <img src="../assets/images/nomsg.png" alt="">
                        </div>
                        <div class="replyBox">
                            <textarea class="reply" ref="reply" id="reply" @keydown="sendmsg($event)" ></textarea> 
                        </div>
                        <Button type="primary" size="small" class="replyBtn" @click="sendReply">发送</Button>
                    </LazyLayout>
                </div>
                <div class="fileInfo">
                    <LazyLayout orient="v">
                        <div class="fileInfoHeader" style="font-size:16px;text-align:center;line-height:50px;" v-if="ispersonal">
                            个人信息
                            <!-- <div class="left" ref="left" @click="clickLeft" :class="{borderbottom:isleftborder === true}">个人信息</div> -->
                            <!-- <div class="right" ref="right" @click="clickRight" :class="{borderbottom:isrightborder === true}">文件</div> -->
                        </div> 
                        <div class="fileInfoHeader" style="font-size:16px;text-align:center;line-height:50px;" v-if="isgroup">
                            群组成员
                            <!-- <div class="left" ref="left" @click="clickLeft" :class="{borderbottom:isleftborder === true}">个人信息</div> -->
                            <!-- <div class="right" ref="right" @click="clickRight" :class="{borderbottom:isrightborder === true}">文件</div> -->
                        </div> 
                        <div class="leftBox" v-if="isleftbox">
                            <div class="picBox">
                                <img :src="this.photo" alt="" v-if="this.photo">
                                <img src="../assets/images/moren.png" alt="" v-else>
                            </div>
                            <div class="stateBox">
                                <span v-if="this.swchecked == 1">已认证</span>
                            </div>
                            <div class="username">
                                <span v-if="this.name">{{ this.name }}</span>
                                <span v-else>姓名</span>
                            </div>
                            <div class="sexBox">
                                <span v-if="this.sex == 1">男</span>
                                <span v-if="this.sex == 2">女</span>
                            </div>
                            <!-- <img src="../assets/images/log.jpg" alt="" class="img"> -->
                        </div>
                        <div class="centerBox" v-if="isCenterBox">
                            <div class="peopleBox" style="height:100%;">
                            <div ref="users">
                                <dl v-for="(item,index) in group" >
                                    <dt>
                                        <img :src="item.headpicture" alt="" v-if="item.isonline">
                                        <img :src="item.headpicture" alt="" v-else class="gray">
                                    </dt>
                                    <dd>
                                        <p v-if="item.realname ? item.realname : item.username">
                                            {{ item.realname ? item.realname : item.username }}
                                           <!--  <span>{{$lazy.FormatDate(parseInt(item.lastupdatetime),'MM-dd   HH:mm')}}</span> -->
                                        </p>
                                        <p v-else>
                                            
                                            <!-- <span>{{$lazy.FormatDate(parseInt(item.lastupdatetime),'MM-dd   HH:mm')}}</span> -->
                                        </p>
                                       <!--  <p>
                                            {{ item.lastconent }}
                                            <span v-show="item.conversationcount" v-if="isSave == false" ref="span">{{ item.conversationcount }}</span>
                                            <span v-if="isSave == true" ref="span" style="display:none"></span>
                                        </p> -->
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        </div>
                        <div class="rightBox" v-if="isrightbox">
                            <div style="margin-top:20px;">
                                <dl>
                                    <dt>
                                        <img src="../assets/images/xls.png" alt="">
                                    </dt>
                                    <dd>
                                        <p>诉求.txt(39.36MB)</p>
                                        <p>05-26  11:02:05</p>
                                        <span>已发送</span>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </LazyLayout>
                </div>
            </LazyLayout>
        </LazyBox> 
        <Modal v-model="modal10" width="800" title=" ">
            <LazyLayout>
                <div style="width:800px;height:500px;" >
                    <vueCropper
                      ref="cropper"
                      :img="imgSrc"
                    ></vueCropper>
                </div>
            </LazyLayout>
            <div slot="footer" style="height:40px;">
              <div class="control" onselectstart='return false;' style='-moz-user-select:none;' >
                    <div class="bili" onselectstart='return false;' style='-moz-user-select:none;' ></div>
                    <div class="fangda" onselectstart='return false;' style='-moz-user-select:none;'  @click="changeScale(1)"></div>
                    <div class="suoxiao" onselectstart='return false;' style='-moz-user-select:none;'   @click="changeScale(-1)"></div>
                    <div class="zuoxuan" onselectstart='return false;' style='-moz-user-select:none;'  @click="rotateLeft()"></div>
                    <div class="youxuan" onselectstart='return false;' style='-moz-user-select:none;'   @click="rotateRight()"></div>
                    <a :href="imgSrc" :download="imgSrc">
                        <div class="baocun" onselectstart='return false;' style='-moz-user-select:none;' ></div>
                    </a>
              </div>
            </div>
        </Modal>           
    </LazyLayout>
</template>

<script>
    var vm;
    var stompClient = null;
    var sendFlag = 1;
    import Button from 'iview/src/components/button'
    import Scroll from 'iview/src/components/scroll'
    import Input from 'iview/src/components/input'
    import Dropdown from 'iview/src/components/dropdown'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
    import Notice from 'iview/src/components/notice'
    import Modal from 'iview/src/components/modal'
    import VueCropper from "vue-cropper"
    // import '../../static/js/sockjs.js'
    // import '../../static/js/stomp.js'

    export default {
        name: 'activity',
        components: {
            Button,
            Input,
            Dropdown,
            DropdownMenu,
            DropdownItem,
            Scroll,
            Notice,
            Modal,
            VueCropper
        },
        data () {
            return {
                isleftborder : false,
                isrightborder : false,
                isleftbox : true,
                isCenterBox : false,
                isrightbox : false,
                //sessionList : this.$store.state.message.sessionList,
                photo : "",
                name : "",
                sex : "",
                swchecked : "",
                sessionId : "",
                //chatArr : this.$store.state.message.chatArr,
                openid : "",
                initid : "",
                peopleArr : [],
                isSearchBox : false,
                page : 1,
                pages : 1,
                allpage : 1,
                searchPeopage : 1,
                value : "",
                isSearchIcon : true,
                isDeleteIcon : false,
                id : [],
                info : [],
                lastconent : "",
                bgindex : -1,
                kefuArr : [],
                kefuid : "",
                isNum : "",
                kepeopleid : "",
                isShow : false,
                fansid : "",
                sendFlag : true,
                sendFlags : true,
                scrollFlag : true,
                saveid : '',
                lenFlag : true,
                isSave :false,
                curperson : "",
                stategroup : "",
                group: [],
                chatid: "",
                stategroup: "",
                ispersonal:false,
                isgroup: false,
                modal10: false,
                imgSrc: '',
                isShowChat: false
            }
        },
        computed: {
            sessionList() {
                return vm.$store.state.message.sessionList;
            },
            chatArr() {
                return vm.$store.state.message.chatArr;
            }
        },
        // watch: {
        //     sessionList() {
        //         //重新链接webSocket
        //         // if (stompClient != null) {  
        //         //     stompClient.disconnect();  
        //         // }  
        //         // this.initWebSocket();
        //         sessionList = this.$store.state.message.sessionList;
        //     },
        // },
        created: function(){
            vm = this;
            this.isleftborder = true;
            //this.getSessionList();
            vm.$store.commit('updateIsMsg', false);
            vm.isleftbox = true;
            vm.ispersonal = true;
            vm.$store.state.message.chatArr= []; 
            //if(this.name == vm.$store.state.message.sessionList[0].name)
        },
        updated: function () {
            this.$nextTick(function () {
                
                if(this.scrollFlag){
                    this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight  
                }
            })
        },
        methods: {
            modalShow(img){
                vm.modal10 = true;
                vm.imgSrc = img;
            },
            changeScale (num) {
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },
            rotateRight () {
                this.$refs.cropper.rotateRight()
            },
            rotateLeft () {
                this.$refs.cropper.rotateLeft()
            },
            // initWebSocket(){
            //     var vm = this; 
            //     //101.200.52.9 "http://192.168.0.10:8092/endpointWechat" "http://101.200.52.9:8092/endpointWechat"
            //     //var sockStr = this.$lazy.url.host + ":8092/endpointWechat";
            //     //console.log(sockStr);
            //     //var sock = new SockJS(sockStr);  
            //     var sock = new SockJS( "http://192.168.0.10:8092/endpointWechat" );     
            //     stompClient = Stomp.over(sock);
            //     stompClient.connect({}, function (frame) {
            //         //监听粉丝在列表是否存在
            //         console.log('开始监听:'+'/queue/conversations-' + vm.$store.state.userInfo.streetorcommunityid + vm.$store.state.userInfo.streetorcommunity)
            //         stompClient.subscribe('/queue/conversations-' + vm.$store.state.userInfo.streetorcommunityid + vm.$store.state.userInfo.streetorcommunity ,function (response) {
            //             ;
            //             vm.sessionList.unshift(JSON.parse(response.body));
            //             if(vm.$router.currentRoute.fullPath != '/conversations'){
            //                 vm.$store.commit('updateIsMsg', true);
            //             }else{
            //                 vm.$store.commit('updateIsMsg', false);
            //             }
            //         });
            //         //点击前监听粉丝在列表推送过来的消息
            //         for(var i=0; i<vm.sessionList.length; i++){
            //             (function(index){
            //                 stompClient.subscribe('/queue/conversations-' + vm.sessionList[index].id ,function (response) {
            //                     console.log('左侧列表推来的消息' + response.body)
            //                     vm.$set(vm.sessionList,index,JSON.parse(response.body));
            //                     
            //                     if(vm.$router.currentRoute.fullPath != '/conversations'){
            //                         vm.$store.commit('updateIsMsg', true);
            //                     }else{
            //                         vm.$store.commit('updateIsMsg', false);
            //                     }
            //                 });
            //             })(i);
            //         }
            //         //点击后监听粉丝推送过来的消息(列表与聊天区域同时监听推送过来的消息) 
            //         for(var i=0; i<vm.sessionList.length; i++){
            //             (function(index){   
            //                 stompClient.subscribe('/queue/everywords-' + vm.sessionList[index].id ,function (response) {
            //                     console.log('左侧列表和聊天内容推来的消息：' + JSON.parse(response.body)[1] )
            //                     console.log('左侧列表和聊天内容推来的消息：' + JSON.parse(response.body)[0] )
            //                     if(JSON.parse(response.body)[1].type != 0){
            //                         vm.chatArr.unshift(JSON.parse(response.body)[1]); 
            //                     }
            //                     vm.$set(vm.sessionList,index,JSON.parse(response.body)[0]);
            //                     //vm.$store.commit('updateIsMsg', false);
            //                     if(vm.$router.currentRoute.fullPath != '/conversations'){
            //                         vm.$store.commit('updateIsMsg', true);
            //                     }else{
            //                         vm.$store.commit('updateIsMsg', false);
            //                     }
            //                 });
            //             })(i);
            //         }
            //         // //监听客服点击前推送过来的消息
            //         // for(var i=0; i<vm.kefuArr.length; i++){
            //         //     (function(index){
            //         //         stompClient.subscribe('/queue/conversations-' + vm.kefuArr[index].id ,function (response) {
            //         //             vm.$set(vm.kefuArr,index,JSON.parse(response.body));
            //         //         });
            //         //         ;
            //         //         if(vm.$router.currentRoute.fullPath != '/conversations'){
            //         //             vm.$store.commit('updateIsMsg', true);
            //         //         }else{
            //         //             vm.$store.commit('updateIsMsg', false);
            //         //         }
            //         //     })(i);
            //         // }
            //         // //监听客服点击后推送过来的消息
            //         // for(var i=0; i<vm.kefuArr.length; i++){
            //         //     (function(index){
            //         //         stompClient.subscribe('/queue/everywords-' + vm.kefuArr[index].id ,function (response) {
            //         //             if(JSON.parse(response.body)[1].type != 0){
            //         //                 vm.chatArr.unshift(JSON.parse(response.body)[1]); 
            //         //             }
            //         //             vm.$set(vm.kefuArr,index,JSON.parse(response.body)[0]);
            //         //             //vm.$store.commit('updateIsMsg', false);
            //         //             if(vm.$router.currentRoute.fullPath != '/conversations'){
            //         //                 vm.$store.commit('updateIsMsg', true);
            //         //             }else{
            //         //                 vm.$store.commit('updateIsMsg', false);
            //         //             }
            //         //         });
            //         //     })(i);
            //         // }
            //     });
            // },
            clickLeft(){
                this.$refs.left.style.color = "#3c7ce6";
                this.$refs.right.style.color = "#666666";
                this.isleftborder = true;
                this.isrightborder = false;
                this.isleftbox = true;
                this.isrightbox = false;
            },
            clickRight(){
                this.$refs.left.style.color = "#666666";
                this.$refs.right.style.color = "#3c7ce6";
                this.isrightborder = true;
                this.isleftborder = false;
                this.isleftbox = false;
                this.isrightbox = true;
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
                    console.log(response)
                    if(response.data.newPrimaryKeys.linkman.length == 0 && vm.page > 0){
                        vm.page--;
                    }
                    debugger
                    console.log(vm.$store.state.message.sessionList)
                    vm.$store.state.message.sessionList = vm.$store.state.message.sessionList.concat(response.data.newPrimaryKeys.linkman);
                   // vm.kefuArr = vm.kefuArr.concat(response.data.newPrimaryKeys.kefu);
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            getMessage(photo,name,realname,sex,swchecked,id,openid,initid,index,iskefu,ev,stategroup,item){
                //vm.isShowChat = true;
                debugger
                vm.group = [];
                vm.stategroup = stategroup;
                if(openid !='' && initid ==null){
                    vm.isCenterBox = true;
                    vm.isleftbox = false;
                    vm.isgroup = true;
                    vm.ispersonal = false;
                }else{
                    vm.isCenterBox = false;
                    vm.isleftbox = true;
                    vm.ispersonal = true;
                    vm.isgroup = false; 
                }
                this.curperson = ev.path[2];
                this.isSave = false;
                this.pages = 1;
                this.scrollFlag = true;
                this.isShow = false;
                this.lenFlag = true;
                //this.chatArr = [];
                this.photo = photo;
                this.name = realname ? realname : name;
                this.sex = sex; 
                this.swchecked = swchecked;
                this.sessionId = id;
                this.openid = openid;
                this.initid = initid;
                this.bgindex = index;
                // this.$refs.span[index].style.display = 'none';
                item.conversationcount = 0;
                this.isNum = iskefu;
                var url =  vm.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/getLastEverywordByConversationid';
                vm.$http.get(url,{
                    params:{
                        id : vm.sessionId,
                        communityid : this.$store.state.userInfo.streetorcommunityid,
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                    }
                })
                .then(function(response){
                    vm.$store.state.message.chatArr = response.data.rows;
                })
                .catch(function(error){
                    console.log(error)
                })
                //this.$refs.users.insertBefore(ev.path[2],this.$refs.users.childNodes[0])
                //
                var fansurl = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getOpenIdListByHobbyOrState';
                this.$http.get(fansurl,{
                    params:{
                        communityid : vm.$store.state.userInfo.streetorcommunityid,
                        communitytype : vm.$store.state.userInfo.streetorcommunity,
                        stategroup : stategroup
                    }
                })
                .then(function(response){
                    console.log(response)
                    vm.group = vm.group.concat(response.data.rows);
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            getChat(){
                var url =  vm.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/getLastEverywordByConversationid';
                vm.$http.get(url,{
                    params:{
                        id : vm.sessionId,
                        communityid : this.$store.state.userInfo.streetorcommunityid,
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                        page : this.pages,
                        rows : 10
                    }
                })
                .then(function(response){
                    if(response.data.rows.length>0){
                        vm.allpage++;
                        document.getElementById("chat").scrollTop = document.getElementById("chat").offsetHeight
                    }
                    if(response.data.rows.length == 0){
                        vm.lenFlag = false;
                    }
                    vm.$store.state.message.chatArr = vm.$store.state.message.chatArr.concat(response.data.rows);
                })
                .catch(function(error){
                    console.log(error)
                })
            },
            sendReply(){
                if( this.$refs.reply.value == "" ){
                    return false;
                }
                if(this.sendFlag){
                    this.sendFlag = false;
                    var url =  this.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/save';
                    this.$http.get(url,{
                        params:{
                            communityid : this.$store.state.userInfo.streetorcommunityid,
                            communitytype : this.$store.state.userInfo.streetorcommunity,
                            content : this.$refs.reply.value,
                            type : 0,
                            openid : this.openid,
                            initid : this.initid,
                            iskefu : this.isNum,
                            stategroup : vm.stategroup
                        }
                    })
                    .then(function(response){
                        
                        console.log(response)
                        if(response.data.isSucceed){
                            vm.scrollFlag = 1;
                            vm.sendFlag = true;
                            vm.chatArr.unshift({"content" : vm.$refs.reply.value , type : 0});
                            vm.$refs.reply.value = ""; 
                        }else{
                            vm.$Notice.success({
                                title: response.data.message
                            });
                            vm.$store.state.message.sessionList = [];
                            vm.name = "";
                            vm.$store.state.message.chatArr = [];
                            vm.$refs.reply.value = "";
                            vm.getSessionList();
                        }
                    })
                    .catch(function(error){
                        vm.sendFlag = true;
                        console.log(error)
                    })
                    // if(this.curperson == this.$refs.users.childNodes[0]){
                    //     return;
                    // }else{
                    //     this.$refs.users.insertBefore(this.curperson,this.$refs.users.childNodes[0]);
                    // }
                }
            },
            sendmsg(ev){
                //阻止文本域换行
                var code;
                if (!e) var  e = window.event;  
                if (e.keyCode) code = e.keyCode;  
                else if (e.which) code = e.which;  
                if(code==13 && window.event){  
                    e.returnValue = false;  
                }else if(code==13){  
                    e.preventDefault();  
                } 
                if(vm.$refs.reply.value  == "" ){
                    return false;
                }
                if(ev.keyCode == 13){ 
                    if(this.sendFlags){
                        this.sendFlags = false;
                        var url =  this.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/save';
                        this.$http.get(url,{
                            params:{
                                communityid : this.$store.state.userInfo.streetorcommunityid,
                                communitytype : this.$store.state.userInfo.streetorcommunity,
                                content : this.$refs.reply.value,
                                type : 0,
                                openid : this.openid,
                                initid : this.initid,
                                iskefu : this.isNum,
                                stategroup: vm.stategroup
                            }
                        })
                        .then(function(response){
                            
                            console.log(response);
                            if(response.data.isSucceed){
                                vm.scrollFlag = 1;
                                vm.sendFlags = true;
                                vm.chatArr.unshift({"content" : vm.$refs.reply.value , type : 0});
                                vm.$refs.reply.value = "";
                            }else{
                                //alert(response.data.message);
                                vm.$Notice.success({
                                    title: response.data.message
                                });
                                vm.$store.state.message.sessionList = [];
                                vm.name = "";
                                vm.$store.state.message.chatArr = [];
                                vm.$refs.reply.value = "";
                                vm.getSessionList();
                            }
                        })
                        .catch(function(error){
                            vm.sendFlags = true;
                            console.log(error)
                        })
                    }
                    // if(this.curperson == this.$refs.users.childNodes[0]){
                    //     return;
                    // }else{
                    //     this.$refs.users.insertBefore(this.curperson,this.$refs.users.childNodes[0]);
                    // } 
                }
            },
            searchPeople(){
                vm.isSearchBox = true;
                vm.isSearchIcon = false;
                vm.isDeleteIcon = true;
                vm.peopleArr = [];
                if(vm.value){   
                    var url = this.$store.state.serverHost + 'wx/WeixinConversation/WeixinConversation/getWeixinUserInfo';
                    this.$http.get(url,{
                        params:{
                            communityid : this.$store.state.userInfo.streetorcommunityid,
                            communitytype : this.$store.state.userInfo.streetorcommunity, 
                            realname : this.value,
                            page : this.searchPeopage,
                            rows : 18
                        }
                    })
                    .then(function(response){
                        
                        console.log(response)

                        if(response.data.rows.length > 0){
                            vm.allpage ++ ;
                        }
                        
                        vm.peopleArr = vm.peopleArr.concat(response.data.rows);
                        // if(vm.peopleArr[0].length == 0){
                        //      vm.$Notice.error({
                        //         title: '没有相关人员',
                        //     });
                        // }
                        // if(vm.peopleArr[1].length == 0 ){
                        //      vm.$Notice.error({
                        //         title: '没有相关群组',
                        //     });
                        // }
                        vm.stategroup = vm.peopleArr[1].stategroup;
                        if(vm.peopleArr[0]){
                            vm.$refs.p1.style.display = 'none';
                        }
                        if(vm.peopleArr[1]){
                           vm.$refs.p1.style.display= 'none';
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                }else if(vm.value == ""){
                    vm.isSearchBox = false;
                    vm.isSearchIcon = true;
                    vm.isDeleteIcon = false;
                }
            },
            deleteBox(){
               vm.isSearchBox = false;
               vm.isDeleteIcon = false;
               vm.isSearchIcon = true;
               vm.value = ""; 
               vm.peopleArr = [];
            },
            scrollSearchBox(){
                var offsetHeight = document.body.offsetHeight,
                    scrollHeight = document.body.scrollHeight,
                    scrollTop = document.body.scrollTop,
                    scrollBottom = offsetHeight + scrollTop;
                if(scrollBottom == scrollHeight){
                    vm.searchPeopage++;
                    if(vm.searchPeopage <= vm.allpage){
                        vm.searchPeople();
                    }else{
                        vm.searchPeopage = vm.allpage;
                    }
                }
            },
            scrollSessionList(){
                var offsetHeight = document.body.offsetHeight,
                    scrollHeight = document.body.scrollHeight,
                    scrollTop = document.body.scrollTop,
                    scrollBottom = offsetHeight + scrollTop;
                if(scrollBottom == scrollHeight){
                    vm.page++;
                    vm.getSessionList();
                }  
            },
            scrollSearchChat(){
                var scrollTop = document.getElementById("chat").scrollTop;
                if(scrollTop == 0 && vm.lenFlag){
                    vm.scrollFlag = false; //禁用updated钩子函数
                    this.isShow = true
                }else{
                    this.isShow = false; 
                }
            },
            clickMore(){
                vm.pages++;
                vm.isShow = false;
                vm.getChat(); 
            },
            savePeople(initid,openid,name,realname,photo,sex,id,stategroup){
                // vm.$refs.span.style.display = 'none';
                //console.log(vm.$refs.span.style.display)
                vm.ispersonal = true;
                vm.isgroup = false;
                var url = this.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/save';
                this.$http.get(url,{
                    params:{
                        openid : openid,
                        initid : initid,
                        type : 2,
                        stategroup : this.stategroup
                    }
                })
                .then(function(response){
                    console.log(response);
                    if(response.data.isSucceed){
                        //vm.isShowChat = true;
                        vm.$store.state.message.sessionList = [];
                        //vm.kefuArr = [];
                        vm.$store.state.message.chatArr = [];
                        vm.isSave = true;
                        vm.page = 1;
                        vm.getSessionList();  
                        vm.isSearchBox = false;
                        vm.isDeleteIcon = false;
                        vm.isSearchIcon = true;
                        vm.$refs.reply.value = "";
                        vm.photo = photo;
                        vm.name = realname ? realname : name;
                        vm.openid = openid;
                        vm.initid = initid;
                        vm.sex = sex;
                        vm.saveid = response.data.newPrimaryKeys.conversationid;  
                        var urls = vm.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/getLastEverywordByConversationid';
                        vm.$http.get(urls,{
                            params:{
                                id : vm.saveid,
                                page : 1,
                                rows : 10
                            }
                        })
                        .then(function(response){
                            //vm.$refs.span[index].style.display = 'none';
                            debugger
                            vm.$store.state.message.chatArr = vm.$store.state.message.chatArr.concat(response.data.rows);
                        })
                        .catch(function(error){ 
                            console.log(error)
                        })
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            savegroup(stategroup,name){
                debugger
                vm.value = "";
                vm.isCenterBox = true;
                vm.isleftbox = false;
                vm.isgroup = true;
                vm.ispersonal = false;
                vm.group = [];
                var url = this.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/save';
                this.$http.get(url,{
                    params:{
                        stategroup : stategroup,
                        type : 2,
                        name: name,
                        communityid : this.$store.state.userInfo.streetorcommunityid,
                        communitytype : this.$store.state.userInfo.streetorcommunity
                    }
                })
                .then(function(response){
                    
                    console.log(response);
                    if(response.data.isSucceed){
                        vm.$store.state.message.sessionList = [];
                        vm.page = 1;
                        vm.isSave = true;
                        vm.page = 1;
                        vm.getSessionList();  
                        vm.isSearchBox = false;
                        vm.isDeleteIcon = false;
                        vm.isSearchIcon = true;
                        vm.$refs.reply.value = "";
                        debugger
                        vm.chatid = response.data.newPrimaryKeys.conversationid;
                        
                        var fansurl = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getOpenIdListByHobbyOrState';
                        vm.$http.get(fansurl,{
                            params:{
                                communityid : vm.$store.state.userInfo.streetorcommunityid,
                                communitytype : vm.$store.state.userInfo.streetorcommunity,
                                stategroup : stategroup
                            }
                        })
                        .then(function(response){
                            
                            console.log(response)
                            vm.group = vm.group.concat(response.data.rows);
                        })
                        .catch(function(error){
                            console.log(error);
                        })

                        //打开群聊天记录
                        var urls =  vm.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/getLastEverywordByConversationid';
                        vm.$http.get(urls,{
                            params:{
                                id : vm.chatid,
                                communityid : vm.$store.state.userInfo.streetorcommunityid,
                                communitytype : vm.$store.state.userInfo.streetorcommunity,
                                page : vm.pages,
                                rows : 10
                            }
                        })
                        .then(function(response){
                            
                            vm.$store.state.message.chatArr = vm.$store.state.message.chatArr.concat(response.data.rows);
                        })
                        .catch(function(error){ 
                            console.log(error)
                        })
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            getServiceChat(id,name,photo,initid,openid,iskefu){
                this.name = name;
                this.photo = photo;
                this.initid = initid;
                this.openid = openid;
                this.kefuid = id;
                this.isNum = iskefu;
                this.scrollFlag = true;
                this.$refs.showNum[0].style.display = 'none';
                var url =  vm.$store.state.serverHost + 'wx/WeixinEveryword/WeixinEveryword/getLastEverywordByConversationid';
                vm.$http.get(url,{
                    params:{
                        id : id,
                        communityid : this.$store.state.userInfo.streetorcommunityid,
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                    }
                })
                .then(function(response){
                    
                    console.log(response);
                    vm.chatArr = response.data.rows;
                })
                .catch(function(error){
                    console.log(error)
                })   
            },
            enter(index){
                this.$refs.delete[index].style.display = "block";
            },
            leave(index){
                this.$refs.delete[index].style.display = "none";
            },
            deleteFans(item,index){
                event.stopPropagation();
                debugger
                //this.$refs.span[index].style.display = 'none';
                item.conversationcount = 0;
                vm.isCenterBox = false;
                vm.isgroup = false;
                vm.isleftbox = true;
                vm.ispersonal = true;
                vm.chatArr.length = 0;
                this.name = "";
                this.photo = "";
                this.sex = "";
                vm.isShow = false;
                var url = vm.$store.state.serverHost + 'wx/WeixinConversation/WeixinConversation/del';
                this.$http.get(url,{
                    params:{
                        id : item.id
                    }
                })
                .then(function(response){
                    if(response.data.isSucceed){
                        debugger;
                        vm.sessionList.splice(vm.sessionList.indexOf(item), 1);
                        vm.$children[0].$parent.$parent.$parent.$parent.subscribeArray[index].unsubscribe();
                        vm.$children[0].$parent.$parent.$parent.$parent.subscribeArray.splice(index,1);
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            clickMe(index){
                debugger
                //this.$refs.span[index].style.display = 'none';
                item.conversationcount = 0;
            }
        }
    } 
</script>

<style scoped>
.LazyLayout{
   width: 100%;
   height: 100%;
   box-sizing:border-box;
}
.deleteBox{
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    line-height: 16px;
    position: absolute;
    right: 38px;
    top: 15px;
}
.title-icons{
    width: 12px;
    height: 12px;
    vertical-align: middle;
    cursor: pointer;
    fill: #fff;
}
.searchBox{
    width:100%;
    height:100%;
    background-color:#fff;
    position: absolute;
    top:0;
    overflow: auto;
    z-index:1;
}
.searchDiv{
    width:100%;
}
.searchDiv dl:hover{
    background-color: #edf1f7;
}
.searchBox::-webkit-scrollbar{
    width: 5px;
    height: 2px;
    background-color: #fff;
}
.searchBox::-webkit-scrollbar-track{
    background-color: #fff;
}
.searchBox::-webkit-scrollbar-thumb{
    height: 20px;
    background-color: #e9e9e9;
}
.searchBox dl{
    display: -webkit-flex;
    padding:10px 0 10px 10px;
    cursor: pointer;
}
.searchBox dl dt{
    width:40px;
    height:40px;
    margin-right:8px;
}
.searchBox dl dt img{
    width:40px;
    height:40px;
    border-radius:50%;
}
.searchBox dl dd{
    font-size:16px;
    padding-top:8px;
}
.peopleList{
    width:20%;
    border:1px solid #d7dde4;
    border-top-left-radius: 4px;
    border-bottom-left-radius:4px;
}
.peoinfo{
    display: -webkit-flex;
}
.peoimg{
    width:25px;
    height:25px;
    border-radius:50%;
    margin-right:15px;
}
.service{
    background-color:#f5f5f5;  //f5f5f5 e3e3e3
    cursor: pointer;
    height:72px;
}
.service dl{
    padding:10px 20px 10px 20px;
    display: -webkit-flex;
}
.service dl dt{
    margin:6px 10px 0 0;
}
.service dl dd{
    -webkit-box-flex: 1;
}
.service dl dt img{
    width:42px;
    height:42px;
    border-radius:50%;
}
.service dl dd{
    width:100%;
}
.service dl dd p{
    line-height: 18px;
}
.service dl dd p:nth-child(1){
    padding-top:7px;
    font-size: 12px;
    color:#333333;
}
.service dl dd p:nth-child(2){
    padding-top:3px;
    font-size: 12px;
    color:#999999;
}
.service dl dd p:nth-child(1) span{
    float: right;
}
.service dl dd p:nth-child(2) span{
    width:17px;
    height:17px;
    display: block;
    float: right;
    background: red;
    border-radius:50%;
    text-align:center;
    line-height: 17px;
    color:#fff;
}
.search{
    height:50px;
    background:#f5f5f5;
    width:100%;
}
.photoMask-icon{
    width: 22px;
    height: 22px;
    fill: #878787;
    cursor: pointer;
    position: absolute;
    top:14px;
    right:10%;
}
.ivu-input-wrapper{
    width:84%;
    margin:0 8%;
}
.peopleBox{
    width:100%;
    height:100%;
    background: #f5f5f5;
    overflow: auto;
}
.users dl:hover{
    background-color: #edf1f7;
    cursor: pointer;
}
.peopleBox{
    width:100%;
    height:100%;
    overflow:auto;
    background-color: #f5f5f5;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
}
.peopleBox::-webkit-scrollbar{
    width: 5px;
    height: 2px;
    background-color: #fff;
}
.peopleBox::-webkit-scrollbar-track{
    background-color: #fff;
}
.peopleBox::-webkit-scrollbar-thumb{
    height: 20px;
    background-color: #e9e9e9;
}
.conversations{
    padding:20px 20px 20px 20px;
}
.chatBox{
    width:60%;
    border:1px solid #d7dde4;
    border-left:none;
    background: #ffffff;
}
.chatHeader{
    height:68px;
    border-bottom:1px solid #d7dde4;
    text-align:left;
    //line-height: 49px;
    //padding-left:20px;
    color:#333333;
    font-size: 16px;
}
.fileInfo{
    width:20%;
    border:1px solid #d7dde4;
    border-left:none;
    background: #ffffff;
    border-top-right-radius:4px;
    border-bottom-right-radius:4px;
}
.fileInfoHeader{
    height:49px;
    border-bottom:1px solid #d7dde4;
}
.left{
    width:50%;
    float: left;
    text-align:center;
    line-height: 49px;
    font-size:15px;
    cursor: pointer;
    color:#3c7ce6;
}
.right{
    width:50%;
    float: right;
    text-align:center;
    line-height: 49px;
    border-left:1px solid #d7dde4;
    font-size:15px;
    cursor: pointer;
}
.borderbottom{
    border-bottom:2px solid #3c7ce6;
}
.chatDiv{
    height:100%;
    border-bottom:1px solid #d7dde4;
    overflow: auto;
    padding:8px;
}
.chatDiv::-webkit-scrollbar{
    width: 5px;
    height: 2px;
    background-color: #fff;
}
.chatDiv::-webkit-scrollbar-track{
    background-color: #fff;
}
.chatDiv::-webkit-scrollbar-thumb{
    height: 20px;
    background-color: #e9e9e9;
}
.peopleBox dl{
    padding:10px 20px 10px 20px;
    display: -webkit-flex;
    position: relative;
}
.peopleBox dl dt{
    margin:6px 10px 0 0;
}
.peopleBox dl dd{
    -webkit-box-flex: 1;
}
.peopleBox dl dt img{
    width:42px;
    height:42px;
    border-radius:50%;
}
.peopleBox dl dd{
    width:84%;
}
.peopleBox dl dd p{
    line-height: 18px;
}
.peopleBox dl dd p:nth-child(1){
    padding-top:7px;
    font-size: 12px;
    color:#333333;
}
.peopleBox dl dd p:nth-child(2){
    padding-top:3px;
    font-size: 12px;
    color:#999999;
    height:25px;
    overflow:hidden;
    /*text-overflow:ellipsis;
    white-space:nowrap;*/
}
.peopleBox dl dd p:nth-child(1) span{
    float: right;
}
.peopleBox dl dd p:nth-child(2) span{
    min-width:17px;
    min-height:17px;
    padding:1px;
    display: block;
    //float: right;
    background: red;
    border-radius:50%;
    text-align:center;
    line-height: 17px;
    color:#fff;
    position: absolute;
    right: 7%;
    top: 53%;
}
.leftBox{
    height:100%;
    width:100%;
    margin-top:42px;
}
.picBox{
    width:80px;
    height:80px;
    margin:0 auto;
    position: relative;
    background-image: url(../assets/images/yin.png);
}
.picBox img{
    width: 68px;
    height: 68px;
    position: absolute;
    left: 6px;
    top: 6px;
    border-radius:46%;
}
.stateBox{
    margin-top:16px;
}
.stateBox span:nth-child(1){
    display: block;
    width:48px;
    height:20px;
    margin:0 auto;
    background:#ff5b5b;
    text-align:center;
    line-height: 20px;
    color:#fff;
    border-radius:3px;
}
.stateBox span:nth-child(2){
    display: block;
    width:48px;
    height:20px;
    margin:0 auto;
    background:#ffc000;
    text-align:center;
    line-height: 20px;
    color:#fff;
    border-radius:3px;
}
.stateBox span:nth-child(3){
    display: block;
    width:48px;
    height:20px;
    margin:0 auto;
    background:#4bacff;
    text-align:center;
    line-height: 20px;
    color:#fff;
    border-radius:3px;
}
.username{
    margin-top:20px;
    width:100%;
    text-align:center;
    font-size:20px;
    color:#333333;
}
.sexBox{
    margin-top:17px;
    color:#a3a3a3;
    font-size:12px;
    text-align:center;
}
.rightBox dl{
    width:89%;
    height:66px;
    margin:0 20px 10px 20px;
    background:#fafafa;
    display: -webkit-flex;
    position: relative;
}
.rightBox{
    overflow: auto;
    margin-top:2px;
}
.rightBox dl dt{
    width:38px;
    height:46px;
    margin-right:25px;
}
.rightBox dl dt img{
    width:38px;
    height:46px;
    margin:10px 0 0 10px;  
}
.rightBox dl dd{
    width:100%;
    margin-top:14px;
}
.rightBox dl dd p:nth-child(1){
    font-size: 12px;
    color:#333333;
}
.rightBox dl dd p:nth-child(2){
    font-size: 10px;
    color:#a8a8a8;
    padding-top:4px;
}
.rightBox dl dd span{
    float: right;
    position: absolute;
    top:24px;
    right:10px;
    color:#a1a1a1;
}
.rightBox::-webkit-scrollbar{
    width: 5px;
    height: 2px;
    background-color: #fff;
}
.rightBox::-webkit-scrollbar-track{
    background-color: #fff;
}
.rightBox::-webkit-scrollbar-thumb{
    height: 20px;
    background-color: #e9e9e9;
}
.chatInfoMe{
    width:100%;
    height:auto;
    padding:2px 0;
}
.chatInfoMe img{
    border-radius:50%;
}
.chatInfoMe dl{
    display: -webkit-flex;
    justify-content:flex-end; 
}
.chatInfoMe dl dt{
    margin-right:8px;
    width:42px;
    height:42px;
}
.chatInfoMe dl dt img{
    width:42px;
    height:42px;
}
.chatInfoMe dl dd{
    padding:12px;
    background:#e3e3e3;
    border-radius:8px;
    margin:5px 10px 5px 30%;
    position: relative;
    line-height: 24px;
    word-break:break-all;/* 自动换行 */
}
.chatInfoMe dl dd img{
    position: absolute;
    top:14px;
    right:-9px;
}
.chatInfoUser{
    width:100%;
    height:auto;
   // margin:16px 0 16px 0;
}
.chatInfoUser dl{
    display: -webkit-flex;
    justify-content:flex-start;    
}
.chatInfoUser dl dt{
    margin-left:8px;
    width:42px;
    height:42px;
    margin-right:10px;
}
.chatInfoUser dl dt img{
    width:42px;
    height:42px;
    border-radius:50%;
}
.chatInfoUser dl dd {
    margin-right:30%;
    word-break:break-all; /* 自动换行 */
}
.chatInfoUser dl dd p:nth-child(1){
    font-size:12px;
    color:#666666;
    padding:6px 0 6px 0;
}
.chatInfoUser dl dd p:nth-child(2){
    padding:10px;
    height:auto;
    background:#e3e3e3;
    border-radius:8px;
    margin:0 40px 0 0;
    position: relative;
    line-height: 24px;
}
/*.chatInfoUser dl dd p:nth-child(2) img{
    position: absolute;
    top:14px;
    left:-10px;
}*/
.leftyou{
    position: absolute;
    top:14px;
    left:-10px;
}

.replyBox{
    width:100%;
    height:25%;
}
.reply{
    width:100%;
    height:96%;
    border:0; /* 消除边框 */
    padding:10px;
    font-size:15px;
    line-height: 24px;
    padding-bottom:40px;
    resize:none; /* 消除右下角角标 */
}
.reply:focus{
    border:0;outline:none;
}
.reply::-webkit-scrollbar{
    width: 5px;
    height: 2px;
    background-color: #fff;
}
.reply::-webkit-scrollbar-track{
    background-color: #fff;
}
.reply::-webkit-scrollbar-thumb{
    height: 20px;
    background-color: #e9e9e9;
}
.replyBtn{
    width:50px;
    height:32px;
    margin-left:91.5%;
    margin-bottom:1%;
}
.bg{
    background-color: #edf1f7;
}
.hide{
    display: none;
}
.gray{ 
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
}
.chaicon{
    width:91px;
    height:13px;
    margin:5px auto;
}
.deleteBoxs{
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,0.5);
    border-radius: 50%;
    line-height: 16px;
    position: absolute;
    right: 16px;
    top: 26px;
}
.del{
    width:44%;
    height:100%;
    background-color: #edf1f7;
    position: absolute;
    right:0px;
    top:0px;
    display: none;
}
.noData{
    width:100%;
    height:100%;
    border-bottom: 1px solid #d7dde4;
}
.noData img{
    position: absolute;
    top:-20%;
    right:0;
    bottom:0;
    left:0;
    margin:auto;
}
.centerBox{
    width:100%;
    height:100%;
}
.img{
    width: 162px;
    height: 162px;
    position: absolute;
    top: 34%;
    left: 23%;
}
.upimg{
    width:100%;
    height:50%;
    border-radius:6px;
    cursor: pointer;
}
.control{
  width:330px;
  margin:0 auto;
  position:absolute;
  bottom:0;
  background:#f3f2f2;
  height:40px;
  line-height:50px;
  margin-left:210px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.control img{
  margin-right:32px;
}
.bili{
  width:30px;
  height:18px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/bili.png);
  margin-right:30px;
}
.fangda{
  width:18px;
  height:18px;
  background-image: url(../assets/images/photoControl/fangdas.png);
  display: inline-block;
  margin-right:30px;
  cursor: pointer;
}
.fangda:hover{
  width:18px;
  height:18px;
  background-image: url(../assets/images/photoControl/fangda.png);
  display: inline-block;
  margin-right:30px;
}
.suoxiao{
  width:18px;
  height:18px;
  margin-right:30px;
  background-image: url(../assets/images/photoControl/suoxiaos.png);
  display: inline-block;
  cursor: pointer;
}
.suoxiao:hover{
  width:18px;
  height:18px;
  margin-right:30px;
  background-image: url(../assets/images/photoControl/suoxiao.png);
  display: inline-block;
}
.zuoxuan{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/zuoxuans.png);
  cursor: pointer;
}
.zuoxuan:hover{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/zuoxuan.png);
}
.youxuan{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/youxuans.png);
  cursor: pointer;
}
.youxuan:hover{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/youxuan.png);
}
.baocun{
  width:18px;
  height:18px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/baocuns.png);
  cursor: pointer;
}
.baocun:hover{
  width:18px;
  height:18px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/baocun.png);
}
</style>