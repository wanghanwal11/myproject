/**
* Created by bk on 2017/8/28.
*/
<template>
    <div>
        <my-search :searchItems="searchItems" @getSearchItems="getSearchItems">
            <!--<div class="searchItem">-->
                <!--<p class="searchType">cesSlot</p>-->
                <!--<Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>-->
                    <!--<div>-->
                        <!--<i-input   placeholder="请输入..."></i-input>-->
                    <!--</div>-->
                <!--</Card>-->
            <!--</div>-->
        </my-search>
        <div style="height:45px;">
            <LazyTopbar :data="json" style="position:fixed;top:45px;z-index:11;padding-right:235px;"></LazyTopbar>
        </div>
        <my-order-list :serviceOrderList="serviceOrderList"></my-order-list>
        <div class="demo-spin-container" style="height: 32px;">
            <Spin size="large" v-if="spinShow" style="margin-left:50%;"></Spin>
        </div>
    </div>
</template>
<script type="es6">
    var vm;
    import myOrderList from '../components/order'
    import Spin from 'iview/src/components/spin'
    import mySearch from '../components/search'
    import iInput from 'iview/src/components/input'
    import Card from 'iview/src/components/card'
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    export default {
        name: 'serviceOrderList',
        data () {
            return {
                ordernum: '',
                searchKey: '',
                enterpriseName: '',
                timeValue: [],
                serviceOrderList: [],
                serviceList: [],
                orderFlag: '',
                page: 1,
                number: 8,
                spinShow: false,
                isTriggerScroll: true,
                isScrollSearch: false,
                orderStatus: [],
                json:{
                    title:"订单"
                },
                searchItems: {
                    input: [
                        {
                            title: '企业',
                            value: ''
                        },{
                            title: '市民',
                            value: ''
                        }
                    ],
                    DatePicker: [
                        {
                            title: '时间',
                            value: []
                        }
                    ],
                    Cascader: [
                        {
                            title: '服务',
                            data: [],
                            value: []
                        }
                    ],
                    tag: [
                        {
                            title: '订单状态',
                            data: [{
                                name: '待接单',
                                value: '0'
                            },{
                                name: '上门中',
                                value: '1'
                            },{
                                name: '已完成',
                                value: '3'
                            },{
                                name: '已取消',
                                value: '4'
                            },{
                                name: '待派单',
                                value: '5'
                            },{
                                name: '已评价',
                                value: '7'
                            }],
                            value: ''
                        }
                    ]
                }
            }
        },
        components:{
            myOrderList,
            Spin,
            mySearch,
            iInput,
            Card
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
                            debugger;
                            //现在级联显示
                            for(var i = 0; i < response.data.rows.length; i++){
                                //使用iview控件时，将数据处理成符合iview要求
                                response.data.rows[i].supProviderService.label = response.data.rows[i].supProviderService.title;
                                response.data.rows[i].supProviderService.value = response.data.rows[i].supProviderService.typeid;
                                for(var j = 0; j < response.data.rows[i].supProviderServiceList.length; j++){
                                    response.data.rows[i].supProviderServiceList[j].label = response.data.rows[i].supProviderServiceList[j].title;
                                    response.data.rows[i].supProviderServiceList[j].value = response.data.rows[i].supProviderServiceList[j].typeid;
                                }
                                debugger;
                                if(response.data.rows[i].supProviderService.children) {
                                    response.data.rows[i].supProviderService.children.push(response.data.rows[i].supProviderServiceList);
                                } else {
                                    response.data.rows[i].supProviderService.children = [];
                                    response.data.rows[i].supProviderService.children = response.data.rows[i].supProviderServiceList;
                                }

                                vm.serviceList = vm.serviceList.concat(response.data.rows[i].supProviderService);
                            }
                            console.log(vm.serviceList);
                            //给组件中的Cascader控件赋值
                            //vm.searchItems.Cascader[0].data = vm.serviceList;
                            vm.$set(vm.searchItems.Cascader[0],'data',vm.serviceList);
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
                debugger;
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
            selectedState (state) {
                if(this.orderStatus.indexOf(state) > -1) {
                    this.orderStatus.splice(this.orderStatus.indexOf(state), 1);
                } else {
                    this.orderStatus.push(state);
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
            },
            getSearchItems (data) {
                this.enterpriseName = data.input[0].value;
                this.searchKey = data.input[1].value;
                this.timeValue = data.DatePicker[0].value;
                if(data.Cascader[0].value[1]){
                    this.serviceId = data.Cascader[0].value[1];
                } else {
                    this.serviceId = "";
                }
                this.orderFlag = data.tag[0].value;
                this.searchByKey();
            }
        }
    }

</script>
<style scoped>

</style>
 