/**
* Created by bk on 2017/09/12.
*/
<template>
    <div class="activeList">
        <!-- 右侧区域 -->
        <div class="branch">
            <div class="reset">
                <svg class="title-icon" aria-hidden="true">
                    <use xlink:href="#icon-shaixuan"></use>
                </svg>
                筛选
                <span @click="reset">重置</span>
            </div>

            <p class="searchType">标题</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="searchKey" @on-blur="search" @on-enter="vSearchEnter" placeholder="请输入..." ></Input>
                </div>
            </Card>
            <p class="searchType sta">状态</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <div class="selectState" @click="selectedState('3')"  :class="{selectedColor: activeFlag == '3'}">已结束</div>
                    <div class="selectState" @click="selectedState('2')"  :class="{selectedColor: activeFlag == '2'}">进行中</div>
                    <div class="selectState" @click="selectedState('1')"  :class="{selectedColor: activeFlag == '1'}">未开始</div>
                </div>
            </Card>
          <!--   <p style="cursor: pointer;margin-bottom:40px;margin-top:40px;padding-left:16px;font-weight:bolder;font-size:14px;">人数</p>
            <div class="classify">
                <Slider max="200" v-model="value" @on-change="slideVal" range style="width:200px;margin:0 auto;"></Slider>
            </div> -->
            <p slot="title" class="searchType times" style="font-weight: bolder;">时间</p>
            <Date-picker type="daterange" :value="timeValue" @on-change="timeSearch" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin: 0 0 15px 20px;"></Date-picker>

            <Card style="width:240px;margin-top:7px;" dis-hover :bordered="false" class="list-type-card">
                <p slot="title" style="font-weight: bolder;">分类</p>
                <ul style="overflow:auto;height:150px;">
                    <li v-for="type in activeType">
                        <Checkbox @on-change="stateList(type)" v-model="type.selectFlag">
                            <span style="padding-left:10px;">{{ type.type }}</span>
                        </Checkbox>
                     </li>
                </ul>
            </Card>
        </div>
        <!-- 右侧区域 -->
        <loading v-if="isLoading.isSearchActiveList"></loading>
        <div v-else style="height:100%;">
            <div v-if="isNOtData" style="margin-right: 240px;height: 100%">
                <no-data-page path="huodongbj"></no-data-page>
            </div>
            <!-- 内容区域 -->
            <div v-else class="lBox" style="margin-right: 240px;margin-left:20px;">
                <Row v-for="(value,key) in activeList">

                   <!--  <Col v-if="ind === 0" :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 20px;padding-right: 20px;cursor:pointer;" class="divCard"  v-for="(item,ind) in activeList">
                        <div style="border: 1px dashed #e1e1e1;background-color: #fbfbfb;position: relative">
                            <div style="width: 100%;height: 0;padding-top: 57%;">

                            </div>
                            <div @click="routeTo('huodongbj')" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;background-repeat: no-repeat;background-position: center;" :style="{backgroundImage:'url('+addPicture+')'}">

                            </div>
                            <p style="padding:0 10px;height:40px;line-height:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></p>
                        </div>
                    </Col> -->
                    <div class="dateBox" @click="tract(value)" style="font-size: 18px;color: #3c7ce6">
                        <span v-if="value.months.substr(value.months.indexOf('年')+1) == '01月'">
                            {{value.months}}
                        </span>
                        <span v-else>
                            {{value.months.substr(value.months.indexOf('年')+1)}}
                        </span>
                        <span  style="cursor: pointer;float:right;margin-right:2.5%;"><Icon v-if="value.backflag" type="chevron-down"></Icon><Icon v-else type="chevron-up"></Icon></span><span style="font-size:14px;color:#a8aeb6;padding-left:6px;">{{value.monthscount}}篇</span>
                    </div>
                    <!--margin-bottom: 20px; -->
                    <Col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom:10px;padding-right: 20px;cursor:pointer;" v-for="(item,itemKey) in value.everymonthdata" class="divCard" :class="{hide: value.backflag}">

                        <Card dis-hover style="position:relative;">
                            <div class="imgBox" @click="goRouter(item.id)">
                                <div class="stateDiv" v-if="item.state == 3"><p class="p">已结束</p></div>
                                <div class="stateDivs" v-if="item.state == 2"><p class="p">进行中</p></div>
                                <div class="stateDivss" v-if="item.state == 1"><p class="p">未开始</p></div>
                                <div class="cexiao" v-if="item.state == 1" :class="{ceshi:true,hides: !item.selectFlag}" @click="backActiveDraft(item.state,item.id)">
                                    <!-- <img src="../assets/images/cexiao.png" alt=""> -->
                                    <div class="cexiaoBox">
                                        <svg class="title-icons" aria-hidden="true">
                                            <use xlink:href="#icon-chexiao"></use>
                                        </svg>       
                                    </div>
                                </div>
                                <div style="background-size: cover;background-position: center;padding-top: 57%;background-repeat: no-repeat;border-top-right-radius: 4px;border-top-left-radius: 4px;" v-bind:style="{backgroundImage:'url('+item.cover+')'}"></div>
                                <!-- <div class="tuiBox">
                                    <img src="../assets/images/tui.png" alt="">
                                </div> -->
                                <!-- <div class="infoBox" :class="{infoBox:true,hide: !item.selectFlag}"> -->
                                    <!-- <div class="leftBox">
                                        <span>{{ new Date(parseInt(item.starttime)).toLocaleDateString()}}&nbsp;&nbsp;&nbsp;{{$lazy.FormatDate(parseInt(item.starttime),'HH:mm:ss')}}</span>
                                    </div>   -->
                                    <!-- <div class="rightBox">
                                        <dl>
                                            <dt><img class="icon-pl" src="../assets/images/articlePingLun.png" alt=""></dt>
                                            <dd><p>{{item.comments}}</p></dd>
                                        </dl>

                                        <dl>
                                            <dt><img class="icon-ck" src="../assets/images/articleLook.png" alt=""></dt>
                                            <dd><p>{{item.views}}</p></dd>
                                        </dl>

                                        <dl>
                                            <dt><img src="../assets/images/peo.png" alt=""></dt>
                                            <dd><p>{{item.enrollment}}</p></dd>
                                        </dl>
                                    </div>
                                </div> -->
                            </div>
                            <div style="padding:0 10px;height:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                                <div style="padding-top:10px;color:#606060;">{{ item.title }}</div>
                                <div style="display:-webkit-box;margin-top:16px;font-size:12px;">
                                    <div style="display:-webkit-box">
                                        <div style="margin-right:4px;padding-top:3px;">
                                            <!-- <svg class="title-ic" aria-hidden="true">
                                                <use xlink:href="#icon-pinglun2"></use>
                                            </svg> -->
                                            <img src="../assets/images/icon/pin.png" alt="">
                                        </div>
                                        <div style="padding-top:1px;color:#adadad;">{{item.comments}}</div>
                                    </div>
                                    <div style="margin:0 10px;padding-top:3px;">
                                        <img src="../assets/images/icon/shu.png" alt="">
                                    </div>
                                    <div style="display:-webkit-box">
                                        <div style="margin-right:4px;padding-top:1px;">
                                            <!-- <svg class="title-ics" aria-hidden="true">
                                                <use xlink:href="#icon-chakan1"></use>
                                            </svg> -->
                                            <img src="../assets/images/icon/cha.png" alt="">
                                        </div>
                                        <div style="padding-top:1px;color:#adadad;">{{item.views}}</div>
                                    </div>
                                    <div style="margin:0 10px;padding-top:3px;">
                                        <img src="../assets/images/icon/shu.png" alt="">
                                    </div>
                                    <div style="display:-webkit-box">
                                        <div style="margin-right:4px;padding-top:3px;">
                                            <img src="../assets/images/icon/peo.png" alt="">
                                        </div>
                                        <div style="padding-top:1px;color:#adadad;"> {{item.enrollment}}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <div class="demo-spin-container" style="height: 32px;">
                    <Spin size="large" v-if="spinShow" style="margin-left:50%;"></Spin>
                </div>
            </div>
            <!-- 内容区域 -->
            <Modal
                v-model="modal1"
                @on-ok="ok"
                >
                <p style="text-align:center;height:50px;line-height:50px;font-size:20px;">确定撤销？</p>
            </Modal>
        </div>
    </div>
</template>

<script type="es6">
    var vm;
    import Card from 'iview/src/components/card'
    import Spin from 'iview/src/components/spin'
    import Input from 'iview/src/components/input'
    import Checkbox from 'iview/src/components/checkbox'
    import {Row,Col} from 'iview/src/components/grid'
    import Icon from 'iview/src/components/icon'
    import DatePicker from 'iview/src/components/date-picker'
    import Button from 'iview/src/components/button'
    import Slider from 'iview/src/components/slider'
    import addPic from '../assets/images/addArticle.png'
    import Modal from 'iview/src/components/modal'
    import noDataPage from '../components/noDataPage'
    import loading from '../components/loading'

    export default {
        name: 'list',
        data (){
            return {
                json:{
                    title : "活动",
                },
                value : [],
                activeList : [],
                searchKey : "",
                activeFlag : "",
                timeValue : [],
                page : 1,
                allpage : 1,
                activeType : [],
                id : "",
                stategroup : [],
                isTriggerScroll : true,
                addPicture: addPic,
                spinShow : false,
                modal1 : false,
                activityId : "",
                activityState : "",
                isNOtData: false,
                isLoading: {isSearchActiveList: true}
            }
        },
        components: {
            Card,
            Input,
            Checkbox,
            Row,
            Col,
            Icon,
            DatePicker,
            Button,
            Slider,
            Spin,
            Modal,
            noDataPage,
            loading
        },
        // activated : function() {
        //     vm = this;
        //     if(this.$lazy.data.sxMore && !this.$lazy.data.sx){
        //         this.page = 1;
        //         vm.activeList = [];
        //         //this.searchActiveList();
        //         this.$lazy.data.sxMore = false;
        //     }
        //     if(this.$lazy.data.sx) {
        //         this.page = 1;
        //         vm.activeList = [];
        //         this.searchActiveList();
        //         vm.activeType = [];
        //         this.searchActiveType();
        //         this.$lazy.data.sx = false;
        //         this.$lazy.data.sxMore = true;
        //     }
        //     this.$emit("change",0); // 触发父组件的change方法
        //     //记忆位置
        //     window.addEventListener('scroll',this.scroll);
        //     this.$nextTick(function(){
        //         window.scroll(0, this.$lazy.data.activeListPosition)
        //     })
        // },
        deactivated: function () {
            window.removeEventListener('scroll',vm.scroll,false);
        },
        created: function () {
            vm = this;
            this.$emit("change",1); // 触发父组件的change方法
            vm.activeList = [];
            this.page = 1;
            this.searchActiveList();
            this.searchActiveType();
            this.$lazy.data.sx = false;
            this.$lazy.data.sxMore = false;
            window.addEventListener('scroll',vm.scroll);
        },
        // beforeRouteLeave(to, from, next){
        //   let position = document.documentElement.scrollTop;
        //   this.$lazy.data.activeListPosition= position//离开路由时把位置存起来
        //   next()
        // },
         destroyed: function () {
            window.removeEventListener('scroll',vm.scroll,false);
        },

        methods:{
            searchActiveList (_params) {
                var params = {
                    communitytype : this.$store.state.userInfo.streetorcommunity,
                    communityid : this.$store.state.userInfo.streetorcommunityid,
                    title : vm.searchKey,
                    state : vm.activeFlag,
                    beginactivitytime : vm.timeValue[0],
                    endactivitytime : vm.timeValue[1],
                    page : vm.page,
                    rows : 3,
                    lowernumber : vm.value[0],
                    uppernumber : vm.value[1],
                    activitytype : vm.stategroup.join(),
                    draft : 'N'
                }
                if(_params)params = _params;
                this.$lazy.data.activeConfig = params;
                var url = this.$store.state.serverHost + '/cmy/activity/cmyactivity/listByMonthTimeArray';
                this.$http.get(url, {
                    params: params
                })
                .then(function (response) {
                    debugger
                    vm.isLoading.isSearchActiveList = false;
                   //vm.isSpinShow = false;
                    if(response.data.rows.length > 0){
                        for(var i=0; i<vm.activeList.length; i++){
                            vm.$set( vm.activeList[i], 'selectFlag', false);
                        }
                        vm.allpage++;
                    } else {
                        vm.isNOtData = vm.activeList.length == 0 ? true : false;
                    }
                    debugger
                    vm.activeList = vm.activeList.concat(response.data.rows);
                    console.log(vm.activeList);
                })
                .catch(function (error) {
                    vm.isNOtData = true;
                    console.log(error);
                })
            },
            searchActiveType(){
                var url = this.$store.state.serverHost + this.$lazy.url.activeType;
                 this.$http.get(url, {
                    params: {
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                        communityid : this.$store.state.userInfo.streetorcommunityid
                    }
                })
                .then(function (data) {
                    debugger
                    vm.isLoading.isSearchActiveList = false;
                    vm.activeType = vm.activeType.concat(data.data.rows)
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            search: function(){
                vm.isTriggerScroll = false;
                vm.activeList = [];
                vm.searchActiveList();
            },
            vSearchEnter: function () {
                vm.isLoading.isSearchActiveList = true;
                event.target.blur();
            },
            selectedState(state){
                vm.isLoading.isSearchActiveList = true;
                if( vm.activeFlag === state) {
                    vm.activeFlag = "";
                    vm.isNOtData  = false;
                } else {
                    vm.activeFlag = state;
                }
                vm.isTriggerScroll = false;
                this.page = 1;
                vm.searchActiveState()
            },
            searchActiveState(){
                debugger;
                vm.isNOtData  = false;
                vm.isTriggerScroll = false;
                vm.page = 1;
                vm.activeList = [];
                vm.searchActiveList();
            },
            timeSearch(data){
                vm.isLoading.isSearchActiveList = true;
                vm.activeList = [],
                vm.timeValue = data;
                vm.isTriggerScroll = false;
                vm.isNOtData = false;
                this.page = 1;
                vm.searchActiveList();
            },
            scroll: function() {
                if(vm.isTriggerScroll){
                    var offsetHeight = document.body.offsetHeight,
                            scrollHeight = document.body.scrollHeight,
                            scrollTop = document.body.scrollTop,
                            scrollBottom = offsetHeight + scrollTop
                    if(scrollBottom == scrollHeight)
                    {
                        debugger;
                        vm.page++;
                        if(vm.page <= vm.allpage){
                            debugger
                            vm.spinShow = true;
                            vm.searchActiveList();
                        }else{
                            vm.page = vm.allpage;
                            vm.spinShow = false;
                        }
                    }
                }else {
                    vm.isTriggerScroll = true;
                }
            },
            goRouter(id) {
                this.$router.push({
                    path:"activityDetails",
                    query:{
                        routeParams:id
                    }
                });
            },
            reset(){
                vm.isNOtData  = false;
                vm.activeList = [];
                vm.searchKey = "";
                vm.timeValue = [];
                vm.activeFlag = "";
                vm.stategroup = [];
                vm.timevalue = [];
                vm.page = 1;
                vm.isTriggerScroll = false;
                this.page = 1;
                vm.searchActiveList();
            },
            stateList: function (type) {
                vm.isLoading.isSearchActiveList = true;
                if (type.selectFlag) {
                    vm.stategroup.push(type.id);
                }else{
                    vm.stategroup.splice(vm.stategroup.indexOf(type.id), 1);
                }
                console.log(this.stategroup)
                if (this.stategroup) {
                    vm.isTriggerScroll = false;
                    vm.activeList = [];
                    this.page = 1;
                    vm.isNOtData  = false;
                    vm.searchActiveList();
                }
            },
            backActiveDraft(num,id){
                event.stopPropagation();
                if(num == 1){
                    this.modal1 = true;
                }
                vm.activityId = id;
                vm.activityState = num
            },
            ok(){
                if(vm.activityState == 1){
                    var url = this.$store.state.serverHost + '/cmy/activity/cmyactivity/revoke';
                    this.$http.get(url,{
                        params:{
                            id:vm.activityId
                        }
                    })
                    .then(function(datas){
                        debugger;
                        console.log(datas)
                        if(datas.data.isSucceed){
                            vm.page = 1;
                            vm.activeList = [];
                            vm.searchActiveList();
                            //vm.$lazy.data.csxMore = true;
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                }
            },
            tract (value) {
                vm.$set(value, 'backflag', !value.backflag);
            },
        }
    }
</script>

<style scoped>
.activeList{
     font-family: "Microsoft YaHei" ! important;
     height:100%;
}
.reset{
    height: 66px;
    line-height: 66px;
    padding: 0 10px;
    border-bottom: 1px solid #d7dde4;
}
.cexiaoBox{
    width:24px;
    height:24px;
    background:rgba(0,0,0,0.5);
    border-radius:50%;
    text-align:center;
    line-height: 22px;
}
.icon-ck{
    width:16px;
    height:12px;
    margin: 3px 5px 0 0;
}
.icon-pl{
    width:16px;
    height:15px;
    margin: 3px 5px 0 0;
}
.reset span{
    float: right;
    cursor: pointer;
}
.title-icon{
    width: 16px;
    height: 16px;
    vertical-align: middle;
    cursor: pointer;
    fill: #333;
}
.title-ic{
    width: 16px;
    height: 16px;
    vertical-align: middle;
    cursor: pointer;
    fill: #999999;
}
.title-ics{
    width: 20px;
    height: 22px;
    vertical-align: middle;
    cursor: pointer;
    fill: #999999;
    padding-bottom:1px;
}
.guanzhu{
    width: 14px;
    height: 12px;
    margin-bottom:2px;
    vertical-align: middle;
    fill: #dbdbdb;
}
.title-icons{
    width: 16px;
    height: 16px;
    vertical-align: middle;
    cursor: pointer;
    fill: #fff;
}
.branch{
    width: 240px;
    min-height: 100%;
    padding-bottom: 20px;
    border-left: 1px solid #ddd;
    background: #fff;
    position: fixed;
    right: 0;
    top: 45px;
    z-index: 99;
}
.branch span{
    float: right;
}
.searchType{
    padding: 15px;
    font-size: 14px;
    font-weight:bolder;
}
.vCheckBox{
    display: block;
    position: absolute;
    top: 6%;
    left: 6%;
    padding-left: 9px;
    padding-top: 5px;
}
.sendBox{
    width: 668px;
    height: 400px;
}
.imgBox{
    position: relative;
}
.stateDiv{
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    width:66px;
    height:24px;
    position: absolute;
    top:10px;
    color:#fff;
    background:#0aab7f;
    text-align:center;
    line-height: 24px;
    font-size:12px;
}
.stateDivs{
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    width:66px;
    height:24px;
    background:#ff8827;
    position: absolute;
    top:10px;
    color:#fff;
    text-align:center;
    line-height: 24px;
    font-size:12px;
}
.stateDivss{
    border-bottom-right-radius: 15px;
    border-top-right-radius: 15px;
    width:66px;
    height:24px;
    background:#666666;
    position: absolute;
    top:10px;
    color:#fff;
    text-align:center;
    line-height: 24px;
    font-size:12px;
}
.imgBox img{
    width:100%;
    height:100%;
}
.stateBox{
    width:50px;
    height:23px;
    background-color:#2d8cf0;
    position:absolute;top:32px;
    right:10px;
    border-radius:3px;
    font-size:8px;
    text-align:center;
    line-height:23px;
    color:#fff;
}
.selectState {
    display: inline-block;
    height: 22px;
    line-height: 20px;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    border-radius: 3px;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
    color: #fff;
    background: #aeaeae;
    margin-left:5px;
}
.selectedColor {
    background-color: #2d8cf0;;
}
.list-type-card ul{
    margin-top:-6px;
}
.list-type-card li{
    padding-left:18px;
    line-height: 33px;
}
.infoBox{
    height:26px;
    background-color:rgba(0,0,0,0.5);
    position: absolute;
    bottom:10px;
    left: 50%;
    transform: translateX(-50%);
    display:none;
    width:auto;
    border-bottom-right-radius:15px;
    border-top-right-radius:15px;
    border-bottom-left-radius:15px;
    border-top-left-radius:15px;
}
.leftBox{
    font-size:3px;
    color:#fff;
    line-height: 27px;
    padding-left:5px;
    float: left;
}
.rightBox{
    line-height: 27px;
    color:#fff;
    font-size:1px;
    display: -webkit-box;
    //width:70%;
}
.rightBox p:nth-child(2){
    margin-right:10px;
}

.leftBox span:nth-child(1){
    margin-right:3px;
}
.hide{
    display: none;
}
.divCard:hover .infoBox{
    display: inline-block;
}
.photoMask-icon{
    width: 10px;
    height: 11px;
    fill: #fff;
    margin-right:3px;
}
.photoMask-icons{
    width: 17px;
    height: 25px;
    fill: #fff;
    float: left;
    font-weight:bolder;
    margin-right:3px;
}
.rightBox dl{
    display: -webkit-flex;
    display: flex;
    padding:0 12px;
}
.rightBox dl:nth-child(3) dt img{
    width: 10px;
    height: 13px;
    margin-right: 5px;
    margin-top: 7px;
}
.rightBox dl:nth-child(2) dt img{
    width: 16px;
    height: 12px;
    margin-right: 5px;
    margin-bottom: -1px;
}
.rightBox dl:nth-child(1) dt img{
    width: 16px;
    height: 15px;
    margin-right: 5px;
    margin-bottom: -3px;
}
.sta{
    padding-top:35px;
}
.times{
    padding-top:35px;
}
.dateBox{
    width: 100%;
    line-height: 45px;
    /*background: #edf3ff;*/
    //padding-left: 10px;
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 10px;
    cursor: pointer;
}
.cexiao{
    position: absolute;
    right: 9px;
    top: 6px;
}
.tuiBox{
    width:26px;
    height:26px;
    position: absolute;
    top:90%;
    right:10px;
    border-radius:50%;

}
.hides{
    display: none;
}
.divCard:hover .ceshi{
    display: block;
}
</style
>