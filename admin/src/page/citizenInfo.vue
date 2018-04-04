/**
* Created by bk on 2017/12/25.
*/
<template>
    <LazyLayout orient="v" style="height: 100%">
        <LazyTopbar :data="topBar"  style="position:fixed;top:0;right:0;z-index:1;padding-left: 220px"></LazyTopbar>
        <LazyBox style="padding: 20px">
            <Row :gutter="20" class-name="row">
                <Col span="7" class-name="col">
                <div class="citizenInfo divList divListScroll">
                    <div class="citizenDivList">
                        <div class="headPicture">
                            <div style="text-align: center;">
                                <img class="headPicture-img" :src="citizenInfo.headpicture" alt=""/>
                                <div v-if='citizenInfo.realname' class="citizenName">{{citizenInfo.realname}}</div>
                                <div v-else class="citizenName">{{citizenInfo.username}}</div>
                                <div v-if="citizenInfo.sex == '0'" class="citizenSex">男</div>
                                <div v-else class="citizenSex">女</div>
                            </div>
                        </div>
                        <div class="citizenOtherInfo">
                            <svg class="svg-icon-weixin" aria-hidden="true">
                                <use xlink:href="#icon-weixin"></use>
                            </svg>
                            <p class="otherInfoName">微信</p>
                        </div>
                        <div class="otherInfoContent"></div>
                        <div class="citizenOtherInfo">
                            <svg class="svg-icon-weixin" aria-hidden="true">
                                <use xlink:href="#icon-dianhua"></use>
                            </svg>
                            <p class="otherInfoName">电话</p>
                        </div>
                        <div class="otherInfoContent">{{citizenInfo.mobile}}</div>
                        <div class="citizenOtherInfo">
                            <svg class="svg-icon-weixin" aria-hidden="true">
                                <use xlink:href="#icon-dizhi1"></use>
                            </svg>
                            <p class="otherInfoName">地址</p>
                        </div>
                        <div class="otherInfoContent">{{citizenInfo.address}}</div>
                        <!--<div class="citizenTag">-->
                            <!--<p class="tagName">标签</p>-->
                            <!--<btnlist :items="tagList"></btnlist>-->
                        <!--</div>-->
                        <div class="citizenTag">
                            <p class="tagName">分组</p>
                            <my-tag style="margin-top: 20px;" :otherGroup="otherGroup" @listenToChildAddGroupEvent="addToGroup">
                                <div slot="tagItem" class="tagItem" :class="{active: item.active}" v-for="item in groupList" @click="isShow(item)">
                                    <span>{{item.peoplestate}}</span>
                                    <sup v-show="item.active" class="badge-remove" @click="deleteGroup(item,index)">×</sup>
                                </div>
                            </my-tag>
                        </div>
                    </div>
                </div>
                </Col>
                <Col span="17" class-name="col">
                <div class="citizenDetails divList">
                    <LazyLayout orient="v" style="height: 100%">
                        <div class="citizenDetails-header">
                            <span :class="{active: isActive == 1}" @click="toggleLeaveWord(1)">订单</span>
                            <span :class="{active: isActive == 2}" style="margin-left: 10px" @click="toggleLeaveWord(2)">活动</span>
                        </div>
                        <LazyBox>
                            <div class="citizenDetails-content citizenDetails-content-scroll" @scroll="scrollSearch">
                                <strip-list v-show="isActive == 1" :serviceOrderList="serviceOrderList"></strip-list>
                                <strip-list-activity v-show="isActive == 2" :activityList="activityList"></strip-list-activity>
                            </div>
                        </LazyBox>
                    </LazyLayout>
                </div>
                </Col>
            </Row>
        </LazyBox>
    </LazyLayout>
</template>
<script type="es6">
    var vm;
    import photoSrc from '../assets/images/photo.png'
    import Button from 'iview/src/components/button'
    import {Row,Col} from 'iview/src/components/grid'

    import myTag from '../components/tagNew'
    import stripList from '../components/stripList'
    import stripListActivity from '../components/stripListActivity'
    export default {
        name: 'citizenInfo',
        components: {
            Button,
            myTag,
            Row,
            Col,
            stripList,
            stripListActivity
        },
        data () {
            return {
                topBar: {
                    title: '市民详情',
                    left:[{
                        type : 'Button',
                        svg : '#icon-fanhui',
                        buttontype : 'text',
                        onclick : function() {
                            vm.$router.push("citizenList");
                        }
                    }]
                },
                tagList: [],
                groupList: [],
                citizenInfo: {

                },
                citizenId: '',
                citizenOpenId: '',
                isActive: 1,
                serviceOrderList: [],
                otherGroup: [],
                activityList: [],
                pageActivity: 1,
                row: 20,
                isScrollLoadingA: true
            }
        },
        created: function(){
            vm = this;
            this.citizenId = this.$route.query.id;
            this.citizenOpenId = this.$route.query.openid;
            //this.getTag();
            //this.getGroup();
            this.getCitizenInfo();
            this.getCitizenGroup();
            this.getOtherGroup();
            //this.searchServiceOrder();
            this.searchServiceOrderNew();
            this.getActivityList();
        },
        destroyed: function () {

        },
        methods: {
            getTag () {
                var url = this.$store.state.serverHost + 'wx/wechatgl/weixinuser/getUserNumByHobbygroup';
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.tagList = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getGroup () {
                var url = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getPeopleStateNum';
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            debugger;
                            for(var i = 0; i < response.data.rows.length; i++){
                                response.data.rows[0].name = response.data.rows[0].peoplestate;
                                response.data.rows[0].show = false;
                            }
                            vm.groupList = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getCitizenInfo () {
                var url = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getAll';
                this.$http.get(url, {
                    params: {
                        id: this.citizenId
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.citizenInfo = response.data.rows[0];
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getCitizenGroup () {
                var url = vm.$store.state.serverHost + 'wx/wechatgl/weixinuserhobbystate/list';
                this.$http.get(url, {
                    params: {
                        userid: this.citizenId,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            debugger;
                            //console.log(response);
                            //for(var i = 0; i < response.data.rows.length; i++){
                            //    response.data.rows[0].name = response.data.rows[0].peoplestate;
                            //    response.data.rows[0].show = false;
                            //}
                            vm.groupList = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getOtherGroup () {
                var url = vm.$store.state.serverHost + 'wx/wechatgl/weixinuserhobbystate/getUnSelectStatelist';
                this.$http.get(url, {
                    params: {
                        userid: this.citizenId,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            debugger;
                            //console.log(response);
                            for(var i = 0; i < response.data.rows.length; i++){
                                response.data.rows[i].name = response.data.rows[i].peoplestate;
                                //response.data.rows[i].groupId =  response.data.rows[i].stategroup;
                            }
                            vm.otherGroup = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            toggleLeaveWord (num) {
                if(this.isActive == num){
                    return
                }
                this.isActive = num;
            },
            paddNum: function(num){
                num += "";
                return num.replace(/^(\d)$/,"0$1");
            },
            searchServiceOrderNew () {
                var url = this.$store.state.serverHost + "order/SupOrder/supOrder/list";
                this.$http.get(url, {
                    params: {
                        isshow: 1,
                        userid: this.citizenId
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response);
                            vm.serviceOrderList = vm.serviceOrderList.concat(response.data.rows);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            isShow (item) {
                this.$set(item,'active',!item.active);
            },
            deleteGroup (item,index) {
                var url = vm.$store.state.serverHost + 'wx/wechatgl/weixinuserhobbystate/del';
                this.$http.get(url, {
                    params: {
                        id: item.id
                    }
                })
                        .then(function (response) {
                            debugger;
                            if(response.data.isSucceed){
                                vm.groupList.splice(index, 1);
                                item.name = item.peoplestate;
                                vm.otherGroup.push(item);
                            } else {
                                vm.$Message.error(response.data.message);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            addToGroup (group) {
                debugger;
                var url = vm.$store.state.serverHost + 'wx/wechatgl/weixinuserhobbystate/save';
                this.$http.get(url, {
                    params: {
                        userid: this.citizenId,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        stategroup: group.stategroup,
                        peoplestate: group.peoplestate
                    }
                })
                        .then(function (response) {
                            debugger;
                            if(response.data.isSucceed){
                                vm.otherGroup.splice(group.index, 1);
                                vm.groupList.push(group);
                            } else {
                                vm.$Message.error(response.data.message);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            scrollSearch () {
                var offsetHeight = event.target.offsetHeight,
                        scrollHeight = event.target.scrollHeight,
                        scrollTop = event.target.scrollTop,
                        scrollBottom = offsetHeight + scrollTop + 20;
                if(scrollBottom > scrollHeight)
                {
                    debugger;
                    if(this.isActive == 2 && this.isScrollLoadingA) {
                        this.isScrollLoadingA = false;
                        this.pageActivity++;
                        this.getActivityList();
                    }
                }
            },
            getActivityList () {
                var url = vm.$store.state.serverHost + 'cmy/activity/cmyactivity/getUserActivity';
                this.$http.get(url, {
                    params: {
                        openid: this.citizenOpenId,
                        initid: this.$store.state.communityDetail.initid,
                        page: this.pageActivity,
                        rows: this.row
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.isScrollLoadingA = true;
                            vm.activityList = vm.activityList.concat(response.data.rows);
                            if(response.data.rows.length == 0 && vm.pageActivity > 1) {
                                vm.pageActivity--;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
        }
    }

</script>
<style scoped>
    .row {
        height: 100%;
    }
    .col {
        height: 100%;
    }
    .headPicture {
        display: flex;
        width: 100%;
        height: 260px;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #ebebeb;
    }
    .headPicture-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }
    .citizenName {
        font-size: 16px;
        color: #333333;
        margin-top: 10px;
    }
    .citizenSex {
        font-size: 12px;
        color: #999999;
        margin-top: 10px;
    }
    .citizenOtherInfo {
        margin-top: 50px;
        display: flex;
        align-items: center;
        color: #666666;
    }
    .otherInfoName {
        font-size: 13px;
        color: #333333;
        margin-left: 5px;
    }
    .otherInfoContent {
        font-size: 13px;
        color: #999999;
        margin-top: 20px;
        margin-left: 20px;
    }
    .svg-icon-weixin {
        width: 16px;
        height: 16px;
        fill: #666666;
    }
    .citizenTag {
        margin-top: 50px;
    }
    .tagName {
        font-size: 13px;
        color: #333333;
    }
    .divList {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        overflow: hidden;
        overflow-y: auto;
    }
    .divList:hover {
        /*box-shadow: 0 1px 6px rgba(0,0,0,.2);*/
        /*border-color: #d7dde4;*/
        /*border-radius: 4px;*/
    }
    .divListScroll::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .divListScroll::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .divListScroll::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .citizenDetails-header {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 16px;
        color: #666;
        border-bottom: 1px solid #d7dde4;
    }
    .citizenDetails-header > span {
        cursor: pointer;
    }
    .citizenDivList {
        padding: 15px;
    }
    .citizenDetails-content {
        height: 100%;
        padding-top: 10px;
    }
    .citizenDetails-content-scroll {
        overflow: hidden;
        overflow-y: auto;
    }
    .citizenDetails-content-scroll::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .citizenDetails-content-scroll::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .citizenDetails-content-scroll::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .active {
        color: #5087e8;
    }
</style>
 