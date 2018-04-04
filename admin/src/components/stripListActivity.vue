/**
* Created by bk on 2017/12/28.
*/
<template>
    <div class="activityBox" style="padding-left:20px;padding-right:20px;padding-top: 10px">
        <div style="" v-for="(item,key) in activityList">
            <LazyLayout dis-hover align="center" style="" class="orderLazyLayout">
                <!--<div class="orderInfo" style="width: 230px;border-right: 1px solid #eeeeee;">-->
                    <!--<span style="cursor: pointer">{{item.title}}</span>-->
                    <!--&lt;!&ndash;<div class="orderState" style="color: #fff;background: #666666;margin-left:5px;" v-if="item.state == 0">未开始</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="orderState" style="color: #fff;background: #f90;margin-left:5px;" v-if="item.state == 1">进行中</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="orderState" style="color: #fff;background: #29c089;margin-left:5px;" v-if="item.state == 3">已结束</div>&ndash;&gt;-->
                <!--</div>-->
                <!--<div class="orderInfo" style="padding-left: 30px;color: #73a8d0;">{{$lazy.FormatDate(parseInt(item.createtime),'yyyy年MM月dd日 HH:mm:ss')}}</div>-->
                <LazyBox auto="false">
                    <div class="orderInfo" style="font-size: 12px;">{{item.title}}</div>
                </LazyBox>
                <LazyBox auto="false">
                    <div class="orderInfo" style="font-size: 12px;">{{$lazy.FormatDate(parseInt(item.createtime),'yyyy年MM月dd日 HH:mm:ss')}}</div>
                </LazyBox>
                <LazyBox auto="false">
                    <div class="orderInfo" style="font-size: 12px;">{{$lazy.FormatDate(parseInt(item.endtime),'yyyy年MM月dd日 HH:mm:ss')}}</div>
                </LazyBox>
                <LazyBox auto="false">
                    <div class="orderInfo" style="font-size: 12px;">{{item.address}}</div>
                </LazyBox>
                <!--<div class="orderInfo" style="padding-left: 30px;color: #73a8d0;">{{item.address}}</div>-->
                <!--<LazyBox auto="false">-->

                    <!--<p class="orderInfo orderInfos" style="width:200px;padding-left: 80px;cursor:pointer">-->
                        <!--<Poptip v-if="key < 2" trigger="hover" placement="bottom" width="350">-->
                            <!--<div class="api" slot="content">-->
                                <!--<div class="eImg"><img :src="item.providerpicture" alt=""></div>-->
                                <!--<div class="right">-->
                                    <!--<div>xxxxxxxx</div>-->
                                    <!--<div><Rate disabled  v-model="item.providerstart" style="font-size:14px;"></Rate></div>-->
                                    <!--<div style="word-break: break-word;white-space: pre-wrap;">xxxxxxxx</div>-->
                                    <!--<div style="word-break: break-word;white-space: pre-wrap;">xxxxxxxx</div>-->
                                <!--</div>-->
                            <!--</div>-->
                                    <!--<span>-->
                                        <!--xxxxxxxx-->
                                    <!--</span>-->
                        <!--</Poptip>-->
                        <!--<Poptip v-else trigger="hover" placement="top" width="350">-->
                            <!--<div class="api" slot="content">-->
                                <!--<div class="eImg"><img :src="item.providerpicture" alt=""></div>-->
                                <!--<div class="right">-->
                                    <!--<div>xxxxxxxx</div>-->
                                    <!--<div><Rate disabled  v-model="item.providerstart" style="font-size:14px;"></Rate></div>-->
                                    <!--<div style="word-break: break-word;white-space: pre-wrap;">xxxxxxxx</div>-->
                                    <!--<div style="word-break: break-word;white-space: pre-wrap;">xxxxxxxx</div>-->
                                <!--</div>-->
                            <!--</div>-->
                                    <!--<span>-->
                                        <!--xxxxxxxx-->
                                    <!--</span>-->
                        <!--</Poptip>-->
                    <!--</p>-->
                <!--</LazyBox>-->
                <!--<LazyBox auto="false">-->
                    <!--<div class="orderInfo" style="width:145px;font-size: 12px;">yyyy年MM月dd日 HH:mm:ss</div>-->
                <!--</LazyBox>-->
                <div style="display: inline-block;width: 80px;">
                    <div class="orderState" style="color: #fff;background: #666666;margin-left:5px;" v-if="item.state == 0">未开始</div>
                    <div class="orderState" style="color: #fff;background: #f90;margin-left:5px;" v-if="item.state == 1">进行中</div>
                    <div class="orderState" style="color: #fff;background: #29c089;margin-left:5px;" v-if="item.state == 3">已结束</div>
                </div>
                <!--<div style="display: inline-block;width: 30px;height: 18px">-->
                    <!--<Poptip trigger="hover" placement="top">-->
                        <!--<div class="api" slot="content">-->
                            <!--<div>-->
                                <!--<span style="padding-right: 10px">服务质量</span>-->
                                <!--<Rate v-model="item.quality" disabled></Rate>-->
                            <!--</div>-->
                            <!--<div>-->
                                <!--<span style="padding-right: 10px">服务效率</span>-->
                                <!--<Rate v-model="item.efficiency" disabled></Rate>-->
                            <!--</div>-->
                            <!--<div>-->
                                <!--<span style="padding-right: 10px">服务态度</span>-->
                                <!--<Rate v-model="item.attitude" disabled></Rate>-->
                            <!--</div>-->
                            <!--<div>-->
                                <!--{{item.description}}-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<img v-if="item.evaluate == 1" src="../assets/images/bad.png" alt="">-->
                        <!--<img v-if="item.evaluate == 2" src="../assets/images/middle.png" alt="">-->
                        <!--<img v-if="item.evaluate == 3" src="../assets/images/best.png" alt="">-->
                    <!--</Poptip>-->

                <!--</div>-->
                <!--<div>-->
                    <!--<div style="display: inline-block;color: #ff8042;font-size: 24px">￥{{item.orderprice}}</div>-->
                <!--</div>-->
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
    export default {
        name: 'stripListActivity',
        props: {
            activityList: {
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
 