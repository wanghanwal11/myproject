/**
* Created by bk on 2018/1/10.
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
                                <img class="headPicture-img" :src="peopleInfo.headpicurl" alt=""/>
                                <div v-if='peopleInfo.fullname' class="citizenName">{{peopleInfo.fullname}}</div>
                                <div v-else class="citizenName">{{peopleInfo.nickname}}</div>
                                <!--<div v-if="peopleInfo.sex == '0'" class="citizenSex">男</div>-->
                                <!--<div v-else class="citizenSex">女</div>-->
                                <div class="citizenSex">{{peopleInfo.sex}}</div>
                            </div>
                        </div>
                        <div class="citizenOtherInfo">
                            <img :src="peopleInfo.wxaqrcode" alt=""/>
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
                            <div style="height: 100%;display: flex;justify-content: center;align-items: center;color: #a1c4fe">正在开发中...</div>
                            <!--<div class="citizenDetails-content citizenDetails-content-scroll" @scroll="scrollSearch">-->
                                <!--&lt;!&ndash;<strip-list v-show="isActive == 1" :serviceOrderList="serviceOrderList"></strip-list>&ndash;&gt;-->
                                <!--&lt;!&ndash;<strip-list-activity v-show="isActive == 2" :activityList="activityList"></strip-list-activity>&ndash;&gt;-->
                            <!--</div>-->
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
        name: 'peopleInfo',
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
                    title: '社工详情'
                },
                groupList: [],
                peopleInfo: {

                },
                peopleId: '',
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
            this.peopleId = this.$route.query.id;
            //this.citizenOpenId = this.$route.query.openid;
            this.getPeopleInfo();
            this.getGroup();
        },
        destroyed: function () {

        },
        methods: {
            getGroup () {
                var url = vm.$store.state.serverHost + 'uc/uc/tuser/getTuserGroupNum';
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
            getPeopleInfo () {
                var url = vm.$store.state.serverHost + 'uc/uc/tuser/get';
                this.$http.get(url, {
                    params: {
                        userid: this.peopleId
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.peopleInfo = response.data.rows[0];
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
            isShow (item) {
                this.$set(item,'active',!item.active);
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
        justify-content: center;
    }
    .citizenOtherInfo img {
        max-width: 150px;
        width: 100%;
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
 