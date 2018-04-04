/**
* Created by bk on 2017/10/31.
*/
<template>
    <LazyLayout orient="v" style="height: 100%">
        <!--<div style="height: 39px"></div>-->
        <LazyBox>
            <loading v-if="isLoading"></loading>
            <div v-else class="sendResults" @scroll="scroll">
                <div class="resultItem" v-for="item in sendList">
                    <Row :gutter="30">
                        <Col span="4">
                        <div class="sendState divInline">
                            <div class="stateInfo">
                                <div class="stateDate">{{$lazy.FormatDate(parseInt(item.createtime),'yyyy-MM-dd')}}</div>
                                <div class="">
                                    <span>状态:</span>
                                    <span v-if="item.sendstate == 0 || item.sendstate == '' || item.sendstate == null">发送中</span>
                                    <span v-else-if="item.sendstate == 'send success'">发送成功</span>
                                    <span v-else>发送失败</span>
                                </div>
                                <div class="">
                                    <span>成功接收人数:</span>
                                    <span>{{item.sendnumber}}</span>
                                </div>
                            </div>
                        </div>
                        </Col>
                        <Col span="20">
                        <div class="sendInfo divInline">
                            <Row :gutter="30">
                                <Col span="6">
                                <div class="sendPic divInline">
                                    <div class="picDiv" :style="{backgroundImage:'url('+item.cover+')'}"></div>
                                </div>
                                </Col>
                                <Col span="18">
                                <div class="sendContent divInline">
                                    <div class="sendTitle">{{item.title}}</div>
                                </div>
                                </Col>
                            </Row>
                        </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </LazyBox>
    </LazyLayout>
</template>
<script type="es6">
    var vm;
    import {Row,Col} from 'iview/src/components/grid'
    import Card from 'iview/src/components/card'
    import articleSearchList from '../components/articleSearchList'
    import loading from '../components/loading'
    export default {
        name: 'sendHistory',
        data () {
            return {
                sendList: [],
                page: 1,
                rows: 10,
                isLoading: true,
                isScrollLoading: true
            }
        },
        components: {
            articleSearchList,
            Row,
            Col,
            Card,
            loading
        },
        created: function () {
            vm = this;
            this.search();
            this.$emit("change", 3);
            window.addEventListener('scroll', vm.scroll);
        },
        destroyed: function () {
            debugger;
            window.removeEventListener('scroll', vm.scroll, false);
        },
        activated: function () {

        },
        deactivated: function () {
            debugger;
            window.removeEventListener('scroll', vm.scroll, false);
        },
        methods: {
            scroll: function () {
                var offsetHeight = event.target.offsetHeight,
                        scrollHeight = event.target.scrollHeight,
                        scrollTop = event.target.scrollTop,
                        scrollBottom = offsetHeight + scrollTop + 20;
                if (scrollBottom >= scrollHeight && scrollTop != 0) {
                    debugger
                    if(this.isScrollLoading){
                        this.isScrollLoading = false;
                        vm.page++;
                        this.search();
                    }
                }
            },
            search () {
                var url = this.$lazy.url.host + '/cmy/article/cmysendcart/getSendhistory';
                this.$http.get(url, {
                    params: {
                        initid: this.$store.state.communityDetail.initid,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        page: this.page,
                        rows: this.rows
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.isScrollLoading = true;
                            vm.isLoading = false;
                            if (response.data.isSucceed) {
                                vm.sendList = vm.sendList.concat(response.data.rows);
                            }
                            if(response.data.rows.length == 0 && vm.page > 0){
                                vm.page--;
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
    .sendResults {
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
    .sendResults::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .sendResults::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .sendResults::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .resultItem {
        padding-left: 15px;
        padding-right: 15px;
        border-bottom: 1px solid #dddddd;
    }
    .colorSuccess {
        color: #19be6b;
    }
    .colorError {
        color: #e13c13;
    }
    .divInline {
        display: inline-block;
    }
    .sendState {
        width: 100%;
        height: 140px;
        display: flex;
        align-items: center;
        min-width: 120px;
    }
    .stateInfo > div {
        margin-top: 10px;
    }
    .stateDate {
        font-size: 16px;
    }
    .sendInfo {
        width: 100%;
        height: 140px;
    }
    .sendPic {
        width: 100%;
        height: 140px;
        display: flex;
        align-items: center;
        min-width: 84px;
    }
    .picDiv {
        width: 100%;
        padding-top: 56.25%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .sendContent {
        width: 100%;
        height: 140px;
        display: flex;
        align-items: center;
    }
    .sendTitle {
        font-size: 20px;
        color: #000;
    }
</style>
 