/**
* Created by bk on 2017/8/30.
*/
<template>
    <div class="articleBox">
        <div style="height:45px;">
            <LazyTopbar :data="json" style="position:fixed;top:0px;z-index:11;padding-right:220px;"></LazyTopbar>
        </div>
        <div class="branch">
            <p class="searchType">企业</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="enterpriseName" @on-blur="searchByKey" @on-enter="vSearchEnter" placeholder="请输入..." :class="{hide: isblur}"></Input>
                </div>
            </Card>
            <p class="searchType">市民</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="searchKey" @on-blur="searchByKey" @on-enter="vSearchEnter" placeholder="请输入..." :class="{hide: isblur}"></Input>
                </div>
            </Card>
            <p class="searchType">时间</p>
            <Date-picker type="daterange" :value="timeValue" :options="options2" @on-change="timeSearch" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin: 0 0 15px 20px;"></Date-picker>
            <p class="searchType">服务</p>
            <Cascader :data="serviceList"  @on-change="searchByServiceId" style="width:200px;margin-left: 20px;"></Cascader>
            <p class="searchType">订单状态</p>
            <Card style="width:260px;padding: 0 20px 0;" dis-hover :bordered="false">
                <!--<p slot="title" style="font-weight: bolder;">订单状态</p>-->
                <!--<ul class="articleGroup">-->
                <!--<li style="padding: 5px 10px 5px 20px;">-->
                <!-- -->
                <!--</li>-->
                <!--</ul>-->
                <!--<Checkbox-group v-model="orderStatus" style="padding: 5px 10px 5px 20px;" @on-change="searchByKey">-->
                    <!--<div style="margin-bottom: 5px">-->
                        <!--<Checkbox label="0">待接单</Checkbox>-->
                    <!--</div>-->
                    <!--<div style="margin-bottom: 5px">-->
                        <!--<Checkbox label="1">上门中</Checkbox>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;<div style="margin-bottom: 5px">&ndash;&gt;-->
                    <!--&lt;!&ndash;<Checkbox label="2">待评价</Checkbox>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--<div style="margin-bottom: 5px">-->
                        <!--<Checkbox label="3">已完成</Checkbox>-->
                    <!--</div>-->
                    <!--<div style="margin-bottom: 5px">-->
                        <!--<Checkbox label="4">已取消</Checkbox>-->
                    <!--</div>-->
                    <!--<div style="margin-bottom: 5px">-->
                        <!--<Checkbox label="5">待派单</Checkbox>-->
                    <!--</div>-->
                    <!--<div style="margin-bottom: 5px">-->
                        <!--<Checkbox label="7">已评价</Checkbox>-->
                    <!--</div>-->
                <!--</Checkbox-group>-->
                <!--<div class="selectState" @click="selectedState(0)"  :class="{selectedColor: orderStatus.indexOf(0)>-1}" style="">待接单</div>-->
                <!--<div class="selectState" @click="selectedState(1)"  :class="{selectedColor: orderStatus.indexOf(1)>-1}" style="">上门中</div>-->
                <!--<div class="selectState" @click="selectedState(3)"  :class="{selectedColor: orderStatus.indexOf(3)>-1}" style="">已完成</div>-->
                <!--<div class="selectState" @click="selectedState(4)"  :class="{selectedColor: orderStatus.indexOf(4)>-1}" style="">已取消</div>-->
                <!--<div class="selectState" @click="selectedState(5)"  :class="{selectedColor: orderStatus.indexOf(5)>-1}" style="">待派单</div>-->
                <!--<div class="selectState" @click="selectedState(7)"  :class="{selectedColor: orderStatus.indexOf(7)>-1}" style="">已评价</div>-->
                <div class="selectState" @click="selectedState('0')"  :class="{selectedColor: orderFlag == '0'}" style="">待接单</div>
                <div class="selectState" @click="selectedState('1')"  :class="{selectedColor: orderFlag == '1'}" style="">上门中</div>
                <div class="selectState" @click="selectedState('3')"  :class="{selectedColor: orderFlag == '3'}" style="">已完成</div>
                <div class="selectState" @click="selectedState('4')"  :class="{selectedColor: orderFlag == '4'}" style="">已取消</div>
                <div class="selectState" @click="selectedState('5')"  :class="{selectedColor: orderFlag == '5'}" style="">待派单</div>
                <div class="selectState" @click="selectedState('7')"  :class="{selectedColor: orderFlag == '7'}" style="">已评价</div>
            </Card>
        </div>

        <div class="lBox" style="margin-right: 240px;padding-left:30px;padding-right:30px;">
            <div v-for="(value,key) in serviceOrderList">
                <div class="dateBox">
                    {{value.days}}  <span  style="cursor: pointer;float:right;margin-right:2.5%;" @click="tract(value)"><Icon v-if="value.backflag" type="chevron-down"></Icon><Icon v-else type="chevron-up"></Icon></span>
                </div>
                <div style="" v-for="item in value.dayResulrList" :class="{hide: value.backflag}" class="orderDiv">
                    <LazyLayout dis-hover align="center" style="" class="orderLazyLayout">
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

        <Modal width="1000"
               class-name="serviceList-modal"
               v-model="isOpenModal"
               title="服务项目设置"
               @on-ok="settingService"
               @on-cancel="cancelModel">
            <div class="serviceList">
                <div class="allServices serviceList-show">
                    <div class="serviceItem" v-for="service in allServiceList">
                        <div class="serviceItem-head">
                            <span class="serviceItem-name">{{service.title}}</span>
                            <span style="cursor: pointer;float: right" @click="showItem(service)">
                                <Icon v-if="service.showFlag" type="chevron-down" color="#666666"></Icon>
                                <Icon v-else type="chevron-up" color="#666666"></Icon>
                            </span>
                        </div>
                        <div class="serviceItem-children" v-show="!service.showFlag">
                            <div v-for="supService in service.supCodeList" @click="selectedToTemp(supService,service)" class="serviceItem-children-name namePointer" :class="{childrenSelected: tempSelServicesId.indexOf(supService.id) > -1}">{{supService.title}}</div>
                        </div>
                    </div>
                </div>
                <div class="moveService">
                    <div class="move">
                        <div class="toRight" @click="addToRight">
                            <span>添加 ></span>
                        </div>
                        <div class="toLeft" @click="removeToLeft">
                            <span>< 取消</span>
                        </div>
                    </div>
                </div>
                <div class="commService serviceList-show">
                    <div class="serviceItem" v-for="selService in selServiceList">
                        <div class="serviceItem-head">
                            <span class="serviceItem-name">{{selService.title}}</span>
                            <span style="cursor: pointer;float: right" @click="showItem(selService)">
                                <Icon v-if="selService.showFlag" type="chevron-down" color="#666666"></Icon>
                                <Icon v-else type="chevron-up"></Icon>
                            </span>
                        </div>
                        <div class="serviceItem-children" v-show="!selService.showFlag">
                            <div  v-for="selSupService in selService.supCodeList" @click="selectedToTempForRemove(selSupService,selService)" class="serviceItem-children-name namePointer" :class="{childrenSelected: tempSelServicesIdForRemove.indexOf(selSupService.id) > -1}">
                                <span>{{selSupService.title}}</span>
                                <div class="serviceItem-price"><input v-model="selSupService.price" class="servicePrice" placeholder="请输入" />元</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
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
    import Cascader from 'iview/src/components/cascader'
    import Modal from 'iview/src/components/modal'
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    export default {
        name: 'orderListM',
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
                    title:"订单",
                    right:[
                        {
                            type : 'Button',
                            label : '设置',
                            size:'small',
                            buttontype : 'text',
                            onclick : function() {
                                vm.isOpenModal = true;
                            }
                        }
                    ]
                },
                serviceList: [],
                serviceId: "",
                orderFlag: '',
                isOpenModal: false,
                allServiceList: [],
                selServiceList: [],
                tempSelServicesId: [],
                tempSelServices: [],
                tempSelServicesIdForRemove: [],
                tempSelServicesForRemove: [],
                selServicesTypeIds: [],
                selServicesPrice: []
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
            Spin,
            Cascader,
            Modal
        },
        activated : function() {
             if(this.$lazy.data.order) {
                vm.serviceOrderList = [];
                this.search(this.$lazy.data.orderConfig);
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
            this.searchServiceType(); //获取服务项
            window.addEventListener('scroll',this.scroll);

            this.searchAllServiceType();//获取所有的服务类型
            //this.getSelService();//获取已经选择的服务项
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
                vm.$set(value, 'backflag', !value.backflag);
                vm.spinShow = false;
            },
            paddNum: function(num){
                num += "";
                return num.replace(/^(\d)$/,"0$1");
            },
            searchServiceType: function () {
                var url =   this.$store.state.serverHost + "support/sup/Supserviceprovider/getProviderBycommunity";
                this.$http.get(url,{
                    params:{
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                        communityid : this.$store.state.userInfo.streetorcommunityid
                    }
                })
                        .then(function(response){
                            //现在级联显示
                            for(var i = 0; i < response.data.rows.length; i++){
                                //使用iview控件时，将数据处理成符合iview要求
                                response.data.rows[i].supProviderService.label = response.data.rows[i].supProviderService.title;
                                response.data.rows[i].supProviderService.value = response.data.rows[i].supProviderService.typeid;
                                for(var j = 0; j < response.data.rows[i].supProviderServiceList.length; j++){
                                    response.data.rows[i].supProviderServiceList[j].label = response.data.rows[i].supProviderServiceList[j].title;
                                    response.data.rows[i].supProviderServiceList[j].value = response.data.rows[i].supProviderServiceList[j].typeid;
                                }
                                if(response.data.rows[i].supProviderService.children) {
                                    response.data.rows[i].supProviderService.children.push(response.data.rows[i].supProviderServiceList);
                                } else {
                                    response.data.rows[i].supProviderService.children = [];
                                    response.data.rows[i].supProviderService.children = response.data.rows[i].supProviderServiceList;
                                }

                                vm.serviceList = vm.serviceList.concat(response.data.rows[i].supProviderService);
                            }
                            console.log(vm.serviceList);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            searchByServiceId (value) {
                if(value[1]){
                    this.serviceId = value[1];
                } else {
                    this.serviceId = "";
                }
                this.searchByKey();
            },
            search (_params) {

                var params =  {
                        ordernum: this.ordernum,
                        userphone: this.searchKey,
                        providername: this.enterpriseName,
                        begintime: this.timeValue[0],
                        endtime: this.timeValue[1],
                        orderflags: this.orderFlag,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        page: this.page,
                        rows: this.number,
                        servicetypeid: this.serviceId
                    }
                if(_params)params = _params;
                var url = this.$store.state.serverHost + "order/SupOrder/supOrder/listByTime";
                this.$lazy.data.orderConfig = params;
                this.$http.get(url, {
                    params: params
                })
                        .then(function (response) {
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
            selectedState (state) {
                //以前是多选
                //if(this.orderStatus.indexOf(state) > -1) {
                //  this.orderStatus.splice(this.orderStatus.indexOf(state), 1);
                //} else {
                //  this.orderStatus.push(state);
                //}
                //改成单选
                if( this.orderFlag === state) {
                    this.orderFlag = "";
                } else {
                    this.orderFlag = state;
                }
                this.searchByKey();
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
            },
            settingService () {
                this.selServicesTypeIds = [];
                this.selServicesPrice = [];
                for (var i = 0; i < this.selServiceList.length; i++) {
                    this.selServicesTypeIds.push(this.selServiceList[i].typeid);
                    this.selServicesPrice.push(0);//一级没有价格
                    for (var j = 0; j < this.selServiceList[i].supCodeList.length; j++){
                        this.selServicesTypeIds.push(this.selServiceList[i].supCodeList[j].typeid);
                        this.selServicesPrice.push(this.selServiceList[i].supCodeList[j].price);
                    }
                }
                console.log(this.selServicesTypeIds);
                console.log(this.selServicesPrice);
                debugger;
                var url = this.$store.state.serverHost + "support/SupProviderService/SupProviderService/saveService";
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        typeids: this.selServicesTypeIds.join(),
                        prices: this.selServicesPrice.join()
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            cancelModel () {

            },
            searchAllServiceType: function () {
                var url =   this.$lazy.url.host + this.$lazy.url.supcodeslist;
                this.$http.get(url)
                        .then(function(response){
                            vm.allServiceList = response.data.rows;
                            for(var n = 0; n < vm.allServiceList.length; n++) {
                                vm.allServiceList[n].typeid = vm.allServiceList[n].id.toString();
                                for(var m = 0; m < vm.allServiceList[n].supCodeList.length; m++){
                                    vm.allServiceList[n].supCodeList[m].typeid = vm.allServiceList[n].supCodeList[m].id.toString();
                                }
                            }
                            vm.getSelService();//获取已经选择的服务项
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            showItem (service) {
                vm.$set(service, 'showFlag', !service.showFlag);
            },
            getSelService () {
                var url = this.$lazy.url.host + this.$lazy.url.getSecLevelService;
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            debugger;
                            for(var i = 0; i < response.data.rows.length; i++){
                                vm.$set(response.data.rows[i],'supCodeList',response.data.rows[i].supProviderList);
                                for(var j = 0; j < response.data.rows[i].supCodeList.length; j++){
                                    //处理allServiceList中的数据
                                    for(var n = 0; n < vm.allServiceList.length; n++) {
                                        for(var m = 0; m < vm.allServiceList[n].supCodeList.length; m++){
                                            if(vm.allServiceList[n].supCodeList[m].id == response.data.rows[i].supCodeList[j].typeid) {
                                                vm.allServiceList[n].supCodeList.splice(m,1);
                                            }
                                        }
                                    }
                                }
                            }
                            vm.selServiceList = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            selectedToTemp (supService,service) {
                if(this.tempSelServicesId.indexOf(supService.id) > -1){
                    this.tempSelServices.splice(this.tempSelServices.indexOf(supService),1);
                    this.tempSelServicesId.splice(this.tempSelServicesId.indexOf(supService.id),1);
                } else {
                    this.tempSelServices.push(supService);
                    this.tempSelServicesId.push(supService.id);
                }
            },
            addToRight () {
                //将选择的服务项目放到右边
                for(var j = 0; j < this.tempSelServices.length; j++) {
                    var tempFlag = false;//用于判断右边有没有服务项目的父级
                    for(var i = 0; i < this.selServiceList.length; i++){
                        if(this.selServiceList[i].id == this.tempSelServices[j].parentid){
                            tempFlag = true;//该服务项目有父级，直接放入
                            this.selServiceList[i].supCodeList.push(this.tempSelServices[j]);
                        }
                    }
                    //右边没有该服务项目的父级
                    //if(!tempFlag){
                    //    for(var n = 0; n < this.allServiceList.length; n++) {
                    //        if(this.allServiceList[n].id == this.tempSelServices[j].parentid){
                    //            var tempStr = JSON.stringify(this.allServiceList[n]);
                    //            var temp = JSON.parse(tempStr);//之所以用JSON转换两次，而不是直接的用this.allServiceList[n]给temp赋值，是怕改变temp对象的属性值，引起this.allServiceList[n]的变化
                    //            this.$set(temp,'supCodeList',this.tempSelServices[j]);
                    //            temp.supCodeList = [];
                    //            temp.supCodeList.push(this.tempSelServices[j]);
                    //            this.selServiceList.push(temp);
                    //        }
                    //    }
                    //}
                    for(var n = 0; n < this.allServiceList.length; n++) {
                        if(this.allServiceList[n].id == this.tempSelServices[j].parentid){
                            //右边没有该服务项目的父级
                            if(!tempFlag){
                                var tempStr = JSON.stringify(this.allServiceList[n]);
                                var temp = JSON.parse(tempStr);//之所以用JSON转换两次，而不是直接的用this.allServiceList[n]给temp赋值，是怕改变temp对象的属性值，引起this.allServiceList[n]的变化
                                this.$set(temp,'supCodeList',this.tempSelServices[j]);
                                temp.supCodeList = [];
                                temp.supCodeList.push(this.tempSelServices[j]);
                                this.selServiceList.push(temp);
                            }
                            //将服务项目从左边移除
                            this.allServiceList[n].supCodeList.splice(this.allServiceList[n].supCodeList.indexOf(this.tempSelServices[j]),1);
                            //for(var m = 0; m < this.allServiceList[n].supCodeList.length; m++){
                            //    if(this.allServiceList[n].supCodeList[m].id == this.tempSelServices[j].id) {
                            //        this.allServiceList[n].supCodeList.splice(m,1);
                            //    }
                            //}
                        }
                    }
                }
                //清空选中的服务项目
                this.tempSelServices = [];
                this.tempSelServicesId = [];
            },
            selectedToTempForRemove (supService,service) {
                if(this.tempSelServicesIdForRemove.indexOf(supService.id) > -1){
                    this.tempSelServicesForRemove.splice(this.tempSelServicesForRemove.indexOf(supService),1);
                    this.tempSelServicesIdForRemove.splice(this.tempSelServicesIdForRemove.indexOf(supService.id),1);
                } else {
                    this.tempSelServicesForRemove.push(supService);
                    this.tempSelServicesIdForRemove.push(supService.id);
                }
            },
            removeToLeft () {
                //将选中的服务项目移到左边
                for(var j = 0; j < this.tempSelServicesForRemove.length; j++) {
                    for(var i = 0; i < this.allServiceList.length; i++){
                        if(this.allServiceList[i].id == this.tempSelServicesForRemove[j].parentid){
                            this.allServiceList[i].supCodeList.push(this.tempSelServicesForRemove[j]);
                        }
                    }
                    //将服务项目从右边移除
                    for(var n = 0; n < this.selServiceList.length; n++) {
                        if(this.selServiceList[n].typeid == this.tempSelServicesForRemove[j].parentid){
                            this.selServiceList[n].supCodeList.splice(this.selServiceList[n].supCodeList.indexOf(this.tempSelServicesForRemove[j]),1);
                        }
                        if(this.selServiceList[n].supCodeList.length == 0){
                            this.selServiceList.splice(n,1);
                        }
                    }
                }
                debugger;
                //清空选中的服务项目
                this.tempSelServicesForRemove = [];
                this.tempSelServicesIdForRemove = [];
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
        background-color: #f90;;
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
    .serviceList {
        height: 550px;
    }
    .serviceList-show {
        display: inline-block;
        width: 39%;
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
    }
    .moveService {
        display: inline-block;
        width: 19%;
        height: 100%;
        background-color: #f4f4f4;
        position: relative;
        margin-left: 16px;
    }
    .move {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
    .toLeft,.toRight {
        width: 90px;
        /*height: 26px;*/
        /*line-height: 26px;*/
        border-radius: 13px;
        text-align: center;
        color: #fff;
        background-color: #000000;
        opacity: 0.4;
        cursor: pointer;
    }
    .toLeft {
        margin-top: 50px;
    }
    .serviceItem-head {
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 10px;
        color: #666666;
    }
    .serviceItem-children {
        padding: 0 10px;
    }
    .serviceItem-children-name {
        font-size: 12px;
        /*padding-top: 10px;*/
        margin-bottom: 5px;
        color: #999999;
        clear: both;
    }
    .namePointer {
        cursor: pointer;
    }
    .namePointer:hover {
        background-color: #f4f4f4;
    }
    .childrenSelected {
        background-color: #f4f4f4;
    }
    .commService {
        padding-left: 16px;
    }
    .serviceItem-price {
        width: 72px;
        float: right;
        text-align: right;
    }
    .servicePrice {
        width: 60px;
        height: 16px;
        line-height: 16px;
        background: #FFF;
        border: none;
        font-size: 12px;
        border-radius: 5px;
        padding: 4px 7px;
        color: #657180;
        outline: none;
        text-align: right;
    }
    .servicePrice:hover {
        border: 1px solid #5cadff;
    }
</style>
 