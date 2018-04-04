/**
* Created by bk on 2017/12/26.
*/
<template>
    <div class="lBox" style="padding-left:20px;padding-right:20px;padding-top: 10px">
        <!--<div v-for="(value,key) in serviceOrderList">-->
            <!--<div class="dateBox">-->
                <!--{{value.days}}  <span  style="cursor: pointer;float:right;margin-right:2.5%;" @click="tract(value)"><Icon v-if="value.backflag" type="chevron-down"></Icon><Icon v-else type="chevron-up"></Icon></span>-->
            <!--</div>-->
            <div style="" v-for="(item,key) in serviceOrderList">
                <LazyLayout dis-hover align="center" style="" class="orderLazyLayout">
                    <!--<div class="orderInfo">-->
                        <!--<Button v-if="!item.isShowTimeline" @click="showTimeLine(item)" type="text" icon="plus-round" size="small">-->
                        <!--</Button>-->
                        <!--<Button v-else @click="showTimeLine(item)" type="text" icon="minus-round" size="small">-->
                        <!--</Button>-->
                    <!--</div>-->
                    <div class="orderInfo" style="width: 230px;border-right: 1px solid #eeeeee;">
                        <span style="cursor: pointer">订单号：{{item.ordernum}}</span>
                        <div class="orderState" style="color: #fff;background: #f90;margin-left:5px;" v-if="item.orderflag == 0">待接单</div>
                        <div class="orderState" style="color: #fff;background: #f90;margin-left:5px;" v-if="item.orderflag == 1">上门中</div>
                        <!--状态2不用-->
                        <!--<div class="orderState" style="color: #fff;background: #f90;" v-if="item.orderflag == 2">待评价</div>-->
                        <div class="orderState" style="color: #fff;background:#19be6b;margin-left:5px;" v-if="item.orderflag == 3">已完成</div>
                        <div class="orderState" style="color: #fff;background: #aeaeae;margin-left:5px;" v-if="item.orderflag == 4">已取消</div>
                        <div class="orderState" style="color: #fff;background: #ed3f14;margin-left:5px;" v-if="item.orderflag == 5">待派单</div>
                        <div class="orderState" style="color: #fff;background: #19be6b;margin-left:5px;" v-if="item.orderflag == 7">已评价</div>
                    </div>
                    <!--<div class="orderInfo" style="width:150px;padding-left: 18px;">-->
                        <!--<Poptip trigger="hover" :delay="9000" placement="top-start" width="260">-->
                            <!--<div class="api" slot="content">-->
                                <!--<dl>-->
                                    <!--<dt>-->
                                        <!--<img v-if="item.userpicture" :src="item.userpicture" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">-->
                                        <!--<img v-else src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">-->
                                    <!--</dt>-->
                                    <!--<dd>-->
                                        <!--<p style="word-break: break-word;white-space: pre-wrap;">电话： {{ item.userphone }}</p>-->
                                        <!--<p style="word-break: break-word;white-space: pre-wrap;">地址： {{ item.useraddress }}</p>-->
                                    <!--</dd>-->
                                <!--</dl>-->
                            <!--</div>-->
                            <!--<img v-if="item.userpicture" :src="item.userpicture" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">-->
                            <!--<img v-else src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">-->
                        <!--</Poptip>-->

                        <!--<Poptip trigger="hover" placement="top-start" width="260">-->
                            <!--<div class="api" slot="content">-->
                                <!--<dl>-->
                                    <!--<dt>-->
                                        <!--<img v-if="item.userpicture" :src="item.userpicture" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%">-->
                                        <!--<img v-else src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%">-->
                                    <!--</dt>-->
                                    <!--<dd>-->
                                        <!--<p style="word-break: break-word;white-space: pre-wrap;">电话： {{ item.userphone }}</p>-->
                                        <!--<p style="white-space: pre-wrap;white-space: pre-wrap;">地址： {{ item.useraddress }}</p>-->
                                    <!--</dd>-->
                                <!--</dl>-->
                            <!--</div>-->
                            <!--<p style="display: inline-block;padding-left: 12px;cursor:pointer">{{item.username}}</p>-->
                        <!--</Poptip>-->

                    <!--</div>-->
                    <div class="orderInfo" style="padding-left: 30px;color: #73a8d0;">{{item.servicetype}}</div>
                    <LazyBox auto="false">

                        <p class="orderInfo orderInfos" style="width:200px;padding-left: 80px;cursor:pointer">
                            <Poptip v-if="key < 2" trigger="hover" placement="bottom" width="350">
                                <div class="api" slot="content">
                                    <div class="eImg"><img :src="item.providerpicture" alt=""></div>
                                    <div class="right">
                                        <div>{{ item.providername }}</div>
                                        <div><Rate disabled  v-model="item.providerstart" style="font-size:14px;"></Rate></div>
                                        <div style="word-break: break-word;white-space: pre-wrap;">电话：{{ item.providerphone }}</div>
                                        <div style="word-break: break-word;white-space: pre-wrap;">地址：{{ item.useraddress }}</div>
                                    </div>
                                </div>
                                    <span>
                                        {{item.providername}}
                                    </span>
                            </Poptip>
                            <Poptip v-else trigger="hover" placement="top" width="350">
                                <div class="api" slot="content">
                                    <div class="eImg"><img :src="item.providerpicture" alt=""></div>
                                    <div class="right">
                                        <div>{{ item.providername }}</div>
                                        <div><Rate disabled  v-model="item.providerstart" style="font-size:14px;"></Rate></div>
                                        <div style="word-break: break-word;white-space: pre-wrap;">电话：{{ item.providerphone }}</div>
                                        <div style="word-break: break-word;white-space: pre-wrap;">地址：{{ item.useraddress }}</div>
                                    </div>
                                </div>
                                    <span>
                                        {{item.providername}}
                                    </span>
                            </Poptip>
                        </p>
                    </LazyBox>
                    <LazyBox auto="false">
                        <div class="orderInfo" style="width:145px;font-size: 12px;">{{$lazy.FormatDate(parseInt(item.ordertime),'yyyy年MM月dd日 HH:mm:ss')}}</div>
                    </LazyBox>
                    <div style="display: inline-block;width: 30px;height: 18px">
                        <Poptip trigger="hover" placement="top">
                            <div class="api" slot="content">
                                <div>
                                    <span style="padding-right: 10px">服务质量</span>
                                    <Rate v-model="item.quality" disabled></Rate>
                                </div>
                                <div>
                                    <span style="padding-right: 10px">服务效率</span>
                                    <Rate v-model="item.efficiency" disabled></Rate>
                                </div>
                                <div>
                                    <span style="padding-right: 10px">服务态度</span>
                                    <Rate v-model="item.attitude" disabled></Rate>
                                </div>
                                <div>
                                    {{item.description}}
                                </div>
                            </div>
                            <img v-if="item.evaluate == 1" src="../assets/images/bad.png" alt="">
                            <img v-if="item.evaluate == 2" src="../assets/images/middle.png" alt="">
                            <img v-if="item.evaluate == 3" src="../assets/images/best.png" alt="">
                        </Poptip>

                    </div>
                    <div>
                        <div style="display: inline-block;color: #ff8042;font-size: 24px">￥{{item.orderprice}}</div>
                        <!--<Dropdown trigger="click" style="line-height: normal">-->
                            <!--<svg class="icon-caidan" aria-hidden="true" @click="">-->
                                <!--<use xlink:href="#icon-caidan"></use>-->
                            <!--</svg>-->
                            <!--<Dropdown-menu slot="list">-->
                                <!--<Dropdown-item :disabled="item.orderflag != 5"><li @click="reOrder(item)" style="margin-bottom: 5px;">重新派单</li></Dropdown-item>-->
                                <!--<Dropdown-item :disabled="item.orderflag == 3 || item.orderflag == 4 || item.orderflag == 7"><li @click="finishOrder(item)">市民取消</li></Dropdown-item>-->
                                <!--<Dropdown-item :disabled="item.orderflag == 3 || item.orderflag == 4 || item.orderflag == 5 || item.orderflag == 7"><li @click="enterpriseCancel(item)">企业取消</li></Dropdown-item>-->
                            <!--</Dropdown-menu>-->
                        <!--</Dropdown>-->
                    </div>
                </LazyLayout>
            </div>
        <!--</div>-->
    </div>
</template>
<script type="es6">
    var vm;
    import Button from 'iview/src/components/button'
    import Icon from 'iview/src/components/icon'
    import Poptip from 'iview/src/components/poptip'
    import Dropdown from 'iview/src/components/dropdown'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
    import Rate from 'iview/src/components/rate'
    import Timeline from 'iview/src/components/timeline/timeline'
    import TimelineItem from 'iview/src/components/timeline/timeline-item'
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    export default {
        props: {
            serviceOrderList: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {

            }
        },
        components:{
            Button,
            Icon,
            Poptip,
            Dropdown,
            DropdownMenu,
            DropdownItem,
            Rate,
            Timeline,
            TimelineItem
        },
        methods: {
            showTimeLine (item) {
                //this.isShowTimeline = !this.isShowTimeline;
                this.$set(item, 'isShowTimeline', !item.isShowTimeline);
            },
            tract (value) {
                debugger;
                this.$set(value, 'backflag', !value.backflag);
            }
        }
    }


</script>
<style scoped>
    /* .api{
             width:400px;
             height:200px;
             border:1px solid #ccc;
         }*/
    .api dl dt{
        float: left;
        margin-right:15px;
        margin-top:1px;
    }

    .api dl dd {
        display: inline-block;
        width: 170px;
    }
    .api dl dd p{
        /*line-height: 20px;*/
        margin-bottom:4px;
    }

    .eImg{
        width:90px;
        height:90px;
        float: left;
        margin-right:10px;
    }

    .eImg img{
        width:87px;
        height:87px;
    }

    .api .right {
        display: inline-block;
        width: 218px;

    }
    .right div{
        margin-top:3px;
    }

    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: absolute;
        top:231px;
        left:18px;
    }
    .mark{
        width: 88%;
        height: 34px;
        background:-webkit-gradient(linear, 0 0, 0 bottom, from(black), to(rgba(0, 0, 255, 0.5)));
        background: rgba(0,0,0,0.5)
    }
    .articleBox{
    // padding-left:30px;
    }
    .reset{
        height: 66px;
        line-height: 66px;
        padding: 0 10px;
        border-bottom: 1px solid #d7dde4;
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
    .branch{
        width: 240px;
        min-height: 100%;
        padding-bottom: 20px;
        border-left: 1px solid #ddd;
        background: #fff;
        position: fixed;
        right: 0;
        top: 84px;
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
    .dateBox{
        width: 100%;
        line-height: 45px;
        /*background: #edf3ff;*/
        padding-left: 10px;
        font-size: 14px;
        margin-top: 30px;
        /*margin-bottom: 25px;*/
        cursor: pointer;
    }
    .abstract{
        height: 48px;
        font-size:16px;
        line-height: 48px;
        color:#606060;
        word-wrap:break-word;
        word-break:normal;
        position: relative;
        overflow: hidden;
    }
    .icon-caidan {
        width:20px;
        height:22px;
        cursor: pointer;
        fill:#BDBDBF;
    }
    .follow{
        height:50px;
        padding-left: 15px;
        border-top: 1px solid #ddd;
        line-height: 50px;
    }
    .oList{
        height: 168px;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    .oLeft{
        min-width: 90px;
        width: 30%;
        height: 100%;
        float: left;
        text-align: center;
        border-right: 2px dashed #e9eaec;
    }
    .oRight{
        width: 70%;
        padding-left: 30px;
        padding-right: 30px;
        float: left;
    }
    .oImg{
        border-radius: 50%;
        margin: 0 auto;
    }
    .oImg > img {
        width: 90px;
        height: 90px;
    }
    .orderState {
        display: inline-block;
        height: 22px;
        line-height: 20px;
        margin: 2px 4px 2px 0;
        padding: 0 8px;
        /*border: 1px solid #e9eaec;*/
        border-radius: 3px;
        background: #f7f7f7;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
    }
    .orderInfo {
        display: inline-block;
        /*float: left;*/
    }
    .orderLazyLayout:hover{
        background-color: #efefef;
    }
    .orderLazyLayout {
        min-width:950px;
        background:#fff;
        margin-bottom:10px;
        border:1px solid #e1e1e1;
        box-sizing:border-box;
        padding:6px;
    }
</style>
 