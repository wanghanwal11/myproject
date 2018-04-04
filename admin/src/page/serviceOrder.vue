/**
* Created by bk on 2017/6/30.
*/
<template>
    <div class="articleBox">
        <div style="height:45px;">
            <LazyTopbar :data="json" style="position:fixed;top:45px;z-index:11;padding-right:235px;"></LazyTopbar> 
        </div>
        <div class="branch">
            <div class="reset">
                <svg class="title-icon" aria-hidden="true">
                    <use xlink:href="#icon-shaixuan"></use>
                </svg>
                筛选
                <span @click="reset">重置</span>
            </div>
            <p class="searchType">订单号</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="ordernum" @on-blur="searchByKey" @on-enter="vSearchEnter" placeholder="请输入..." :class="{hide: isblur}"></Input>
                </div>
            </Card>
            <p class="searchType">企业名称</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="enterpriseName" @on-blur="searchByKey" @on-enter="vSearchEnter" placeholder="请输入..." :class="{hide: isblur}"></Input>
                </div>
            </Card>
            <p class="searchType">手机号</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="searchKey" @on-blur="searchByKey" @on-enter="vSearchEnter" placeholder="请输入..." :class="{hide: isblur}"></Input>
                </div>
            </Card>
            <p class="searchType">时间</p>
            <Date-picker type="daterange" :value="timeValue" :options="options2" @on-change="timeSearch" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin: 0 0 15px 20px;"></Date-picker>
            <p class="searchType">订单状态</p>
            <Card style="width:260px" dis-hover :bordered="false">
                <!--<p slot="title" style="font-weight: bolder;">订单状态</p>-->
                <!--<ul class="articleGroup">-->
                    <!--<li style="padding: 5px 10px 5px 20px;">-->
                        <!-- -->
                    <!--</li>-->
                <!--</ul>-->
                <Checkbox-group v-model="orderStatus" style="padding: 5px 10px 5px 20px;" @on-change="searchByKey">
                    <div style="margin-bottom: 5px">
                        <Checkbox label="0">待接单</Checkbox>
                    </div>
                    <div style="margin-bottom: 5px">
                        <Checkbox label="1">上门中</Checkbox>
                    </div>
                    <!--<div style="margin-bottom: 5px">-->
                        <!--<Checkbox label="2">待评价</Checkbox>-->
                    <!--</div>-->
                    <div style="margin-bottom: 5px">
                        <Checkbox label="3">已完成</Checkbox>
                    </div>
                    <div style="margin-bottom: 5px">
                        <Checkbox label="4">已取消</Checkbox>
                    </div>
                    <div style="margin-bottom: 5px">
                        <Checkbox label="5">待派单</Checkbox>
                    </div>
                    <div style="margin-bottom: 5px">
                        <Checkbox label="7">已评价</Checkbox>
                    </div>
                </Checkbox-group>
            </Card>
        </div>

        <div class="lBox" style="margin-right: 240px;padding-left:30px;padding-right:30px;">
            <div v-for="(value,key) in serviceOrderList">
                <div class="dateBox">
                    {{value.days}}  <span  style="cursor: pointer;float:right;margin-right:2.5%;" @click="tract(value)"><Icon v-if="value.backflag" type="chevron-down"></Icon><Icon v-else type="chevron-up"></Icon></span>
                </div>
                <div style="" v-for="item in value.dayResulrList" :class="{hide: value.backflag}">
                    <LazyLayout dis-hover align="center" style="padding-left: 20px;min-width:950px;background:#fff;margin-bottom:10px;border:1px solid #e1e1e1;box-sizing:border-box;padding:6px;">
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
                        <div class="orderInfo" style="width:150px;padding-left: 18px;">
                            <Poptip trigger="hover" :delay="9000" placement="top-start" width="260">
                                <div class="api" slot="content">
                                    <dl>
                                        <dt>
                                            <img v-if="item.userpicture" :src="item.userpicture" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">
                                            <img v-else src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">
                                        </dt>
                                        <dd>
                                            <p style="word-break: break-word;white-space: pre-wrap;">电话： {{ item.userphone }}</p>
                                            <p style="word-break: break-word;white-space: pre-wrap;">地址： {{ item.useraddress }}</p>
                                        </dd>
                                    </dl>
                                </div>
                                <img v-if="item.userpicture" :src="item.userpicture" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">
                                <img v-else src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;cursor:pointer;">
                            </Poptip>
                            
                            <Poptip trigger="hover" placement="top-start" width="260">
                                <div class="api" slot="content">
                                    <dl>
                                        <dt>
                                            <img v-if="item.userpicture" :src="item.userpicture" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%">
                                            <img v-else src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%">
                                        </dt>
                                        <dd>
                                            <p style="word-break: break-word;white-space: pre-wrap;">电话： {{ item.userphone }}</p>
                                            <p style="white-space: pre-wrap;white-space: pre-wrap;">地址： {{ item.useraddress }}</p>
                                        </dd>
                                    </dl>
                                </div>
                                <p style="display: inline-block;padding-left: 12px;cursor:pointer">{{item.username}}</p>
                            </Poptip>
                            
                        </div>
                        <div class="orderInfo" style="padding-left: 30px;color: #73a8d0;">{{item.servicetype}}</div>
                        <LazyBox auto="false">
                            
                                <p class="orderInfo orderInfos" style="width:200px;padding-left: 80px;cursor:pointer">
                                <Poptip trigger="hover" placement="top" width="350">
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
                            <div class="orderInfo" style="width:145px;font-size: 12px">{{item.ordertimeStr}}</div>
                        </LazyBox>
                        <div style="display: inline-block;width: 30px;height: 18px">
                            <Poptip trigger="hover" placement="top">
                                <div class="api" slot="content">
                                     <div>
                                         <span style="padding-right: 10px">服务质量</span>
                                         <Rate v-model="item.quality" disabled></Rate>
                                         <!--<span>满意</span>  -->
                                     </div>
                                     <div>
                                         <span style="padding-right: 10px">服务效率</span>
                                         <Rate v-model="item.efficiency" disabled></Rate>
                                         <!--<span>比较满意</span>  -->
                                     </div>
                                     <div>
                                         <span style="padding-right: 10px">服务态度</span>
                                         <Rate v-model="item.attitude" disabled></Rate>
                                         <!--<span>一般</span>  -->
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
                            <!--<Poptip placement="bottom" class="order-card" style="line-height: normal">-->
                                <!--<svg class="icon-caidan" aria-hidden="true" @click="">-->
                                    <!--<use xlink:href="#icon-caidan"></use>-->
                                <!--</svg>-->
                                <!--<div slot="content">-->
                                    <!--<div style="text-align: center;">-->
                                        <!--<ul>-->
                                            <!--<li v-if="item.orderflag == 5" @click="reOrder(item)" style="margin-bottom: 5px;cursor:pointer">重新派单</li>-->
                                            <!--&lt;!&ndash;<li @click="finishOrder(item)" style="cursor:pointer">市民取消订单</li>&ndash;&gt;-->
                                            <!--<Poptip width="184" style="text-align: initial;"-->
                                                    <!--placement="bottom"-->
                                                    <!--confirm-->
                                                    <!--title="确认删除这条订单吗？"-->
                                                    <!--@on-ok="finishOrder(item)">-->
                                                <!--<li @click="" style="cursor:pointer" disabled>市民取消</li>-->
                                            <!--</Poptip>-->
                                            <!--<li @click="" style="cursor:pointer">企业取消</li>-->
                                        <!--</ul>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</Poptip>-->
                            <Dropdown trigger="click" style="line-height: normal">
                                <svg class="icon-caidan" aria-hidden="true" @click="">
                                    <use xlink:href="#icon-caidan"></use>
                                </svg>
                                <Dropdown-menu slot="list">
                                    <Dropdown-item :disabled="item.orderflag != 5"><li @click="reOrder(item)" style="margin-bottom: 5px;">重新派单</li></Dropdown-item>
                                    <Dropdown-item :disabled="item.orderflag == 3 || item.orderflag == 4 || item.orderflag == 7"><li @click="finishOrder(item)">市民取消</li></Dropdown-item>
                                    <Dropdown-item :disabled="item.orderflag == 3 || item.orderflag == 4 || item.orderflag == 5 || item.orderflag == 7"><li @click="enterpriseCancel(item)">企业取消</li></Dropdown-item>
                                </Dropdown-menu>
                            </Dropdown>
                        </div>
                    </LazyLayout>
                </div>
            </div>
            <!--<Row v-for="(value,key) in serviceOrderList">-->
                <!--<div class="dateBox" @click="tract(value)">-->
                    <!--{{value.days}}  <span  style="cursor: pointer;float:right;margin-right:2.5%;"><Icon v-if="value.backflag" type="chevron-down"></Icon><Icon v-else type="chevron-up"></Icon></span>-->
                <!--</div>-->
                <!--<Col :lg="12" :md="24" style="margin-bottom: 30px;padding-right: 25px;" v-for="item in value.dayResulrList" :class="{hide: value.backflag}">-->
                <!--<div class="divCard">-->

                    <!--<Card dis-hover>-->
                        <!--<p slot="title">-->
                            <!--<span style="font-weight: 500;cursor: pointer" @click="orderDetails(item)">订单号：{{item.ordernum}}</span>-->
                            <!--<span style="font-weight: 500;color: red" v-if="item.orderflag == 0">待接单</span>-->
                            <!--<span style="font-weight: 500;color: red" v-if="item.orderflag == 1">上门中</span>-->
                            <!--<span style="font-weight: 500;color: red" v-if="item.orderflag == 2">待评价</span>-->
                            <!--<span style="font-weight: 500;color: red" v-if="item.orderflag == 3">已完成</span>-->
                            <!--<span style="font-weight: 500;color: red" v-if="item.orderflag == 4">已取消</span>-->
                            <!--<span style="font-weight: 500;color: red" v-if="item.orderflag == 5">重新派单</span>-->
                        <!--</p>-->
                        <!--<a href="#" slot="extra" @click.prevent="">-->
                            <!--<Poptip placement="bottom" class="order-card">-->
                                <!--<svg class="icon-caidan" aria-hidden="true" @click="">-->
                                    <!--<use xlink:href="#icon-caidan"></use>-->
                                <!--</svg>-->
                                <!--<div slot="content">-->
                                    <!--<div style="text-align: center;">-->
                                        <!--<ul>-->
                                            <!--<li v-if="item.orderflag != 3 && item.orderflag != 4" @click="reOrder(item)" style="margin-bottom: 5px;">重新派单</li>-->
                                            <!--<li @click="finishOrder(item)">市民取消订单</li>-->
                                        <!--</ul>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</Poptip>-->
                        <!--</a>-->
                        <!--<div>-->
                            <!--<div class="oList">-->
                                <!--<div class="oLeft">-->
                                    <!--<div class="oImg"><img v-if="item.userpicture" :src="item.userpicture" alt=""></div>-->
                                    <!--<p class="abstract">{{item.username}}</p>-->
                                <!--</div>-->
                                <!--<div class="oRight">-->
                                    <!--<div style="float: left">{{item.servicetype}}</div>-->
                                    <!--<div style="float: right;color: red">￥{{item.orderprice}}</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="follow">-->
                            <!--<span>{{item.providername}}</span>-->
                        <!--</div>-->
                    <!--</Card>-->
                <!--</div>-->
                <!--</Col>-->
            <!--</Row>-->
            <div class="demo-spin-container" style="height: 32px;">
                <Spin size="large" v-if="spinShow" style="margin-left:50%;"></Spin>
            </div>
        </div>


    </div>
</template>
<script type="es6">
    var vm;
    import Input from 'iview/src/components/input'
    import Checkbox from 'iview/src/components/checkbox'
    import Tree from 'iview/src/components/tree'
    import Icon from 'iview/src/components/icon'
    import Card from 'iview/src/components/card'
    import {Row,Col} from 'iview/src/components/grid'
    import Tooltip from 'iview/src/components/tooltip'
    import DatePicker from 'iview/src/components/date-picker'
    import Affix from 'iview/src/components/affix'
    import CheckboxGroup from 'iview/src/components/checkbox/checkbox-group'
    import Poptip from 'iview/src/components/poptip'
    import Dropdown from 'iview/src/components/dropdown'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
    import Rate from 'iview/src/components/rate'
    import Spin from 'iview/src/components/spin'
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    export default {
        name: 'serviceOrder',
        data () {
            return {
                ordernum: '',
                searchKey: '',
                enterpriseName: '',
                timeValue: [],
                serviceOrderList: [],
                page: 1,
                number: 8,
                spinShow: false,
                isTriggerScroll: true,
                isScrollSearch: false,
                orderStatus: [],
                json:{
                    title:"订单"
                }
            }
        },
        components:{
            Input,
            Checkbox,
            Tree,
            Icon,
            Card,
            Row,
            Col,
            DatePicker,
            CheckboxGroup,
            Affix,
            Poptip,
            Dropdown,
            DropdownMenu,
            DropdownItem,
            Tooltip,
            Rate,
            Spin
        },
        activated : function() {
             if(this.$lazy.data.order) {
                vm.serviceOrderList = []
                this.search(this.$lazy.data.orderConfig)
                this.$lazy.data.order = false;
               // alert('需要刷新')
             }
            window.addEventListener('scroll',this.scroll);
        },
        deactivated: function () {
            window.removeEventListener('scroll',vm.scroll,false);
        },
        created: function () {
            vm = this;
            this.ordernum = getQueryString('orderid') || '';
            this.search();
            window.addEventListener('scroll',this.scroll);
        },
        destroyed: function () {
            window.removeEventListener('scroll',vm.scroll,false);
        },
        methods: {
            scroll: function() {
                if(vm.isTriggerScroll){
                    var offsetHeight = document.body.offsetHeight,
                            scrollHeight = document.body.scrollHeight,
                            scrollTop = document.body.scrollTop,
                            scrollBottom = offsetHeight + scrollTop
                    if(scrollBottom == scrollHeight)
                    {
                        debugger;
                        if(vm.isScrollSearch){
                            vm.page++;
                            vm.$set(vm, 'spinShow', true); //查询数据前显示spin
                            // vm.spinShow = true; //查询数据前显示spin
                            vm.search();
                        }else{
                            vm.spinShow = false;
                        }
                    }
                }else {
                    vm.isTriggerScroll = true;
                }
            },
            tract (value) {
                debugger;
                vm.$set(value, 'backflag', !value.backflag);
                vm.spinShow = false;
            },
            paddNum: function(num){
                num += "";
                return num.replace(/^(\d)$/,"0$1");
            },
            search (_params) {

                var params =  {
                        ordernum: this.ordernum,
                        userphone: this.searchKey,
                        providername: this.enterpriseName,
                        begintime: this.timeValue[0],
                        endtime: this.timeValue[1],
                        orderflags: this.orderStatus.join(),
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        page: this.page,
                        rows: this.number
                    }
                if(_params)params = _params;
                var url = this.$store.state.serverHost + "order/SupOrder/supOrder/listByTime";
                this.$lazy.data.orderConfig = params;
                this.$http.get(url, {
                    params: params
                })
                        .then(function (response) {
                            debugger;
                            console.log(response)
                            if(response.data.rows.length > 0) {
                                vm.isScrollSearch = true;
                                for(var i = 0; i < response.data.rows.length; i++) {
                                    var day = new Date(response.data.rows[i].dayTime);
                                    var dayStr = day.getFullYear() + '年' + ( day.getMonth() + 1 ) + '月' + day.getDate() + '日';
                                    vm.$set(response.data.rows[i], 'days', dayStr);
                                    for(var j = 0; j < response.data.rows[i].dayResulrList.length; j++) {
                                        var ordertime = new Date(response.data.rows[i].dayResulrList[j].ordertime);
                                        var ordertimeStr = ordertime.getFullYear() + '年' + ( ordertime.getMonth() + 1 ) + '月' + ordertime.getDate() + '日 ' + vm.paddNum(ordertime.getHours()) + ":" + vm.paddNum(ordertime.getMinutes()) + ':' + vm.paddNum(ordertime.getSeconds());
                                        vm.$set(response.data.rows[i].dayResulrList[j], 'ordertimeStr', ordertimeStr);
                                    }
                                }
                                vm.serviceOrderList = vm.serviceOrderList.concat(response.data.rows);
                            } else {
                                vm.isScrollSearch = false;
                                vm.page--;
                            }
                            vm.spinShow=false;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            searchByKey () {
                this.serviceOrderList = [];
                this.page = 1;
                vm.isTriggerScroll = false;//不触发滚动事件
                this.search();
            },
            vSearchEnter: function () {
                event.target.blur();
            },
            timeSearch (data) {
                this.serviceOrderList = [];
                this.timeValue = data;
                this.page = 1;
                vm.isTriggerScroll = false;//不触发滚动事件
                this.search();
            },
            reset () {
                this.serviceOrderList = [];
                this.searchKey = '';
                this.enterpriseName = '';
                this.timeValue = [];
                this.orderStatus = [];
                this.ordernum = "";
                this.page = 1;
                vm.isTriggerScroll = false;//不触发滚动事件
                this.search();
            },
            delOrder (item) {

            },
            reOrder (item) {
                if(item.orderflag == 5) {
                    this.$router.push({
                        name:"EntryOrder",
                        query:{
                            orderId:item.id
                        }
                    });
                } else {
                    this.$Message.info('企业取消服务后才能重新派单!');
                }

            },
            finishOrder (item) {
                debugger;
                if(item.orderflag == 3 || item.orderflag == 4 || item.orderflag == 7) {
                    this.$Message.info('订单已结束!');
                    return;
                }
                var url = this.$lazy.url.host + this.$lazy.url.userCancleOrder;
                this.$http.get(url, {
                    params: {
                        orderid: item.id
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response);
                            if(response.data.isSucceed) {
                                item.orderflag = 4;
                            }else {
                                vm.$Message.error(response.data.message);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            orderDetails (item) {
                this.$router.push({
                    name:"EntryOrder",
                    query:{
                        orderId:item.id
                    }
                });
            },
            enterpriseCancel (item) {
                if(item.orderflag == 3 || item.orderflag == 4 || item.orderflag == 7) {
                    this.$Message.info('订单已结束!');
                    return;
                }
                if(item.orderflag == 5){
                    this.$Message.info('待派单状态下，企业不能取消!');
                    return;
                }
                var url = this.$lazy.url.host + this.$lazy.url.cancleOrderState;
                this.$http.get(url, {
                    params: {
                        orderid: item.id
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response);
                            if(response.data.isSucceed) {
                                item.orderflag = 5;
                                // var num = vm.$store.state.nav.orderNumOfReSend + 1;
                                // vm.$store.commit('updateOrderNumOfReSend', num);
                            }else {
                                vm.$Message.error(response.data.message);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
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
</style>
 