<template>
  <LazyLayout orient="v" align="" justify="">
      <div style="height: 45px;position:fixed;top:0px;left:220px;right:0;z-index:1;">
          <LazyTopbar :data="json"></LazyTopbar>
      </div>
      <LazyBox>
          <LazyLayout align="" justify="">
            <LazyBox style="padding: 20px 40px 0 40px">
              <LazyLayout orient="v">
                <div style="height: 240px;">
                    <Card style="padding: 30px 20px; height: 238px">
                        <Row :gutter="16">
                            <Col span="16">
                            <Row :gutter="16">
                                <Col span="8">
                                    <div class="orderInfoLabel">电话</div>
                                    <Input v-model="telephone" @on-blur="search" @on-enter="vSearchEnter" ref="telephone" placeholder="请输入..."></Input>
                                    <p v-if="!isPhone" style="color:red;position: absolute;">手机号不正确</p>
                                </Col>
                                <Col span="8">
                                    <div class="orderInfoLabel">姓名</div>
                                    <Input v-model="name" ref="name" placeholder="请输入..."></Input>
                                </Col>
                                <Col span="8">
                                <div class="orderInfoLabel">
                                    <span style="display: inline-block">服务</span>
                                    <Poptip v-if="isPoptipServiceInfo" placement="right" width="400">
                                        <svg class="" aria-hidden="true" style="display: inline-block;width:14px;height:14px;cursor: pointer">
                                            <use xlink:href="#icon-wenhao"></use>
                                        </svg>
                                        <div class="api" slot="content" style="word-break: break-word;white-space: pre-wrap;" ref="serviceInfo"></div>
                                    </Poptip>
                                </div>
                                <Cascader :data="serviceList" v-model="serviceIds" @on-change="searchProviderByService"></Cascader>
                                </Col>
                            </Row>
                            <Row :gutter="16" style="margin-top: 20px;">
                                <div class="orderInfoLabel" style="padding-left: 8px;padding-right: 8px;min-height: 26px"><span style="margin-right: 5px">地址</span><Tag v-for="address in userAddressList"><span @click="chooseUserAddress(address)">{{address.tag}}</span></Tag></div>
                                <Col span="12">
                                    <Select @on-change="chooseAddress"
                                            v-model="gps" ref="gps"
                                            label-in-value
                                            filterable
                                            remote
                                            :remote-method="searchAddress"
                                            :loading="loading">
                                        <Option v-for="option in options" :value="option.location" :label="option.name" :key="new Date()">
                                            <span>{{option.name}}</span>
                                            <span style="float:right;color:#ccc">{{option.district}}</span>
                                        </Option>
                                    </Select>
                                </Col>
                                <Col span="12">
                                    <Input v-model="houseNum" ref="houseNum" placeholder="详细楼号/门牌号"></Input>
                                </Col>
                            </Row>
                            </Col>
                            <Col span="8">
                                <div class="orderInfoLabel">备注</div>
                                <Input v-model="remarks" type="textarea" :rows="5" placeholder="请输入..."></Input>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <LazyBox style="padding-top: 20px;">
                  <LazyLayout orient="h" align="" justify="">
                    <LazyBox style="padding-right: 10px;">
                      <LazyLayout orient="v" align="" justify="">
                        <LazyBox style="padding-bottom: 5px;">
                          <div style="width: 100%; height: 100%;">
                              <Card style="height:100%;">
                                  <p slot="title">上一次</p>
                                  <LazyLayout class="sList" v-if="isLast" >
                                      <LazyLayout class="sLeft">
                                          <div class="sImg" @click="selectedProvider(lastService)"><img :src="lastService.logo" alt=""></div>
                                      </LazyLayout>
                                      <LazyLayout class="sRight">
                                          <div class="sTitle" @click="selectedProvider(lastService)">
                                          <div style="height:79px;">
                                              <div>{{lastService.name}}
                                                  <Tag color="blue" style="margin-left: 15px;padding: 0 8px;" v-if="lastService.type == 1">企业</Tag>
                                                  <Tag color="red" style="margin-left: 15px;padding: 0 8px;" v-if="lastService.type == 2">志愿者团队</Tag>
                                                  <Tag color="red" style="margin-left: 15px;padding: 0 8px;" v-if="lastService.type == 3">便民服务团队</Tag>
                                              </div>
                                              <div class="sStar"><Rate disabled  v-model="lastService.providerstart"></Rate>
                                          <span style="color:#999999;padding-top:4px;padding-left:14px;float:right;font-size:13px;">订单 {{ lastService.num }}　好评率 <span v-if="lastService.bestrate">{{ ((lastService.bestrate)*100) +'%'}}</span>
                                          </span>
                                      </div>
                                          </div>
                                              <div>
                                                <div class="icon">
                                                    <Poptip trigger="hover" :content="lastService.address">
                                                        <svg class="title-icons" aria-hidden="true">
                                                            <use xlink:href="#icon-dingwei"></use>
                                                        </svg>
                                                    </Poptip>
                                                </div>
                                                <div class="icon">
                                                    <Poptip trigger="hover" :content="lastService.phone">
                                                        <svg class="title-icon" aria-hidden="true">
                                                            <use xlink:href="#icon-dianhua"></use>
                                                        </svg>
                                                    </Poptip>
                                                </div>
                                              </div>
                                          </div>
                                      </LazyLayout>
                                  </LazyLayout>
                                  <div v-else style="height: 168px;line-height: 168px;text-align: center; color:#a1c4fe;">{{lastMessage}}</div>
                              </Card>
                          </div>
                        </LazyBox>
                        <LazyBox style="padding-top: 5px;">
                          <div style="width: 100%; height: 100%;">
                              <Card style="height:100%;">
                                  <p slot="title">距离最近</p>
                                  <LazyLayout class="sList" v-if="isNear">
                                      <div class="sLeft">
                                          <div class="sImg" @click="selectedProvider(nearProvider)"><img :src="nearProvider.logo" alt=""></div>
                                      </div>
                                      <div class="sRight" @click="selectedProvider(nearProvider)">
                                          <div style="height:78px;">
                                              <div class="sTitle">
                                                  <div>{{nearProvider.name}}
                                                       <Tag color="blue" style="margin-left: 15px;padding: 0 8px;" v-if="nearProvider.type == 1">企业</Tag>
                                                      <Tag color="red" style="margin-left: 15px;padding: 0 8px;" v-if="nearProvider.type == 2">志愿者团队</Tag>
                                                      <Tag color="red" style="margin-left: 15px;padding: 0 8px;" v-if="nearProvider.type == 3">便民服务团队</Tag>
                                                  </div>
                                              </div>
                                              <div class="sStar"><Rate disabled  v-model="nearProvider.providerstart"></Rate>
                                          <span style="color:#999999;padding-top:4px;padding-left:14px;float:right;font-size:13px;">订单 {{ nearProvider.num }}　好评率 <span v-if="nearProvider.bestrate">{{ ((nearProvider.bestrate)*100) +'%'}}</span>
                                          </span>
                                      </div>
                                         </div>
                                          <div>
                                              <div class="icon">
                                                  <Poptip trigger="hover" :content="nearProvider.address">
                                                      <svg class="title-icons" aria-hidden="true">
                                                          <use xlink:href="#icon-dingwei"></use>
                                                      </svg>
                                                  </Poptip>
                                              </div>
                                              <div class="icon">
                                                  <Poptip trigger="hover" :content="nearProvider.phone">
                                                      <svg class="title-icon" aria-hidden="true">
                                                          <use xlink:href="#icon-dianhua"></use>
                                                      </svg>
                                                  </Poptip>
                                              </div>
                                              
                                          </div>
                                      </div>
                                  </LazyLayout>
                                  <div v-else style="height: 168px;line-height: 168px;text-align: center; color:#a1c4fe;">{{nearMessage}}</div>
                              </Card>
                          </div>
                        </LazyBox>
                      </LazyLayout>
                    </LazyBox>
                    <LazyBox style="padding-left: 10px;">
                      <div style="width: 100%; height: 100%;">
                          <Card class="providers" v-if="!isNoProvider" style="height:100%">
                              <p slot="title">服务提供者</p>
                              <div @click="selectedProvider(provider)" v-for="provider in providerList">
                                  <LazyLayout class="sList searchList" >
                                      <div class="sImg" style="width:130px;margin-right:13px;" ><img :src="provider.logo" alt=""></div>
                                      <LazyLayout orient="v">
                                          <div style="height:108px;margin-bottom:7px;margin-right:8px;">
                                              <div class="sTitle">
                                                  <div>{{provider.name}}
                                                      <Tag color="blue" style="margin-left: 8px;padding: 0 8px;" v-if="provider.type == 1">企业</Tag>
                                                      <Tag color="red" style="margin-left: 8px;padding: 0 8px;" v-if="provider.type == 2">志愿者团队</Tag>
                                                      <Tag color="red" style="margin-left: 8px;padding: 0 8px;" v-if="provider.type == 3">便民服务团队</Tag>
                                                  </div>
                                              </div>
                                              <div class="sStar"><Rate disabled  v-model="provider.providerstart"></Rate>
                                              <span style="color:#999999;padding-top:4px;padding-left:14px;float:right;font-size:13px;">订单 {{ provider.num }}　好评率 <span v-if="provider.bestrate">{{ (((provider.bestrate)*100).toFixed(1)) +'%'}}</span>
                                              </span>
                                              </div>
                                          </div>
                                          <div>

                                              <div class="icon">
                                                  <Poptip trigger="hover" :content="provider.address">
                                                      <svg class="title-icons" aria-hidden="true">
                                                          <use xlink:href="#icon-dingwei"></use>
                                                      </svg>
                                                  </Poptip>
                                              </div>
                                              <div class="icon">
                                                  <Poptip trigger="hover" :content="provider.phone">
                                                      <svg class="title-icon" aria-hidden="true">
                                                          <use xlink:href="#icon-dianhua"></use>
                                                      </svg>
                                                  </Poptip>
                                              </div>
                                          </div>
                                      </LazyLayout>
                                  </LazyLayout>
                              </div>
                          </Card>
                          <Card v-else :style="{height: servantHeight + 'px',lineHeight: servantHeight - 52 + 'px'}">
                              <p slot="title">服务提供者</p>
                              <div style="text-align: center;color:#a1c4fe;">{{noProviderMessage}}</div>
                          </Card>
                      </div>
                    </LazyBox>
                  </LazyLayout>
                </LazyBox>
              </LazyLayout>
            </LazyBox>


            <div style="width: 360px;margin-top:-1px;">
                <div style="height:100%;width:360px;background-color: rgba(183, 202, 254,0.3)">
                <!-- <Card>
                    <div style="padding: 5px">订单预览</div>
                </Card>
                -->
              <div  class="orders"  style="height:90%;width:360px;overflow-y:scroll;">
                <div>
                  <Card>
                      <div style="position:relative;height: 60px">
                          <div v-if="isSelected">
                              <div class="servicePhoto">
                                  <img :src="sProvider.logo" alt=""/>
                              </div>
                              <div class="serviceInfo">
                                  <span>{{sProvider.name}}</span>
                                  <div class="eStar"><Rate disabled  v-model="sProvider.providerstart" style="font-size: 14px"></Rate></div>
                              </div>
                          </div>
                          <Spin fix v-else>请选择服务提供者</Spin>
                      </div>
                      <div style="height: 100px;border-top: 1px solid #e3e8ee;padding: 10px;position:relative">
                          <div v-if="isUserInfo">
                              <div class="orderInfo">
                                  <span>{{name}}</span>
                                  <div class="right">{{telephone}}</div>
                              </div>
                              <div class="orderInfo" style="height: 42px">
                                  <svg class="title-icons" aria-hidden="true">
                                      <use xlink:href="#icon-dingwei"></use>
                                  </svg>
                                  <div class="right">{{previewAddress + houseNum}}</div>
                              </div>
                          </div>
                          <Spin fix v-else>请填写用户信息</Spin>
                      </div>
                      <div style="clear: both;background-color: #B7CAFE;height: 15px;opacity: 0.3"></div>
                      <div class="serviceContent">
                          <div class="orderInfo">
                              <span>订单号</span>
                              <div class="right">{{this.orderNum}}</div>
                          </div>
                          <div class="orderInfo">
                              <span>下单时间</span>
                              <div class="right">{{orderTime}}</div>
                          </div>
                          <div class="orderInfo">
                              <span>服务类型</span>
                              <div class="right">{{serviceName}}</div>
                          </div>
                          <div class="orderInfo" style="height: 60px">
                              <span>备注</span>
                              <div class="right" style="word-break: break-word;white-space: pre-wrap;">{{remarks}}</div>
                          </div>
                      </div>
                      <div style="clear: both;background-color: #B7CAFE;height: 15px;opacity: 0.3"></div>
                      <div class="money">
                          <div class="orderInfo">
                              <span>订单金额</span>
                              <div class="right">￥{{orderPrice}}</div>
                          </div>
                          <div class="orderInfo">
                              <span>优惠金额</span>
                              <div class="right">￥{{favourableprice}}</div>
                          </div>
                          <div class="orderInfo">
                              <span>订单总额</span>
                              <div class="right" style="font-size: 18px;color: #ffae00">{{orderPrice - favourableprice}}元</div>
                          </div>
                      </div>
                  </Card>
                  
                </div>
              </div>
              <div style="height:85px;background:#fff;">
                <div style="width:330px;margin:0 auto;padding-top:28px;">
                    <Button type="warning" long :loading="creating" @click="createOrder">
                        <span v-if="!loading">派单</span>
                        <span v-else>派单中...</span>
                    </Button>
                </div>
              </div>
              </div>
            </div>
          </LazyLayout>
      </LazyBox>
  </LazyLayout>
</template>


<script type="es6">
    var vm;
    import photo from '../assets/images/TDLOGO.png'
    import Button from 'iview/src/components/button'
    import {Row,Col} from 'iview/src/components/grid'
    import Card from 'iview/src/components/card'
    import Input from 'iview/src/components/input'
    import Spin from 'iview/src/components/spin'
    import Affix from 'iview/src/components/affix'
    import {Select,Option} from 'iview/src/components/select'
    import Rate from 'iview/src/components/rate'
    import Poptip from 'iview/src/components/poptip'
    import Tag from 'iview/src/components/tag'
    import Cascader from 'iview/src/components/cascader'

    export default {
        name: 'entryOrder',
        data () {
            return {
                telephone: '',
                isPhone: true,
                name: '',
                gps: '',
                address: '',
                previewAddress: '',
                houseNum: '',
                loading: false,
                options: [],
                serviceName: '',
                serviceId: '',
                serviceIds: [],
                remarks: '',
                serviceList: [],
                lastService: {},
                nearProvider: {},
                value: 5,
                providerList: [],
                isLast: false,
                lastMessage: '还没有订过服务',
                isNear: false,
                nearMessage: '没有距离最近的服务提供者',
                isNoProvider: true,
                noProviderMessage: '请选择服务',
                orderTime: '',
                orderNum: '',
                sProvider: {name: '选择服务提供者',logo: photo},
                isSelected: false,
                isSetQuery: false,
                json:{
                    title:"我的订单",
                    left:[{
                          type : 'Button',
                          svg : '#icon-fanhui',
                          buttontype : 'text',
                          onclick : function() {
                              vm.$router.push("orderListM");
                          }
                    }]
                },
                orderPrice: 0,
                favourableprice: 0,
                orderId: 0,
                servantHeight: 0,
                creating: false,
                isNewOrder: true,
                userAddressList: [],
                isUserInfo: false,
                isPoptipServiceInfo: false,
                serviceContent: ''
            }
        },
        components:{
            Row,
            Col,
            Button,
            Card,
            Input,
            Spin,
            Affix,
            Select,
            Option,
            Poptip,
            Tag,
            Rate,
            Cascader
        },
        created: function () {
            console.log(11);

            this.searchServiceType();

            //var time = new Date();
            //this.orderTime = time.getFullYear() + '年' + ( time.getMonth() + 1 ) + '月' + time.getDate() + '日';
            this.incrementTime();
            vm = this;

            //获取路由传过来的参数
            if(this.$router.history.current.query.orderId) {
                //在searchServiceType方法的完成函数中执行
                //this.isNewOrder = false;//表示重新派单
                //this.orderId = this.$router.history.current.query.orderId;
                //this.searchOrderInfo();
            } else {
                this.isNewOrder = true;//表示录入新的订单
                this.getOrderNum();
            }
            this.servantHeight = document.body.clientHeight - 376;
        },
        watch: {
            telephone: {
                handler:function(val,oldVal){
                    if(this.telephone || this.name || this.gps || this.houseNum) {
                        this.isUserInfo = true;
                    } else {
                        this.isUserInfo = false;
                    }
                }
            },
            name: {
                handler:function(val,oldVal){
                    if(this.telephone || this.name || this.gps || this.houseNum) {
                        this.isUserInfo = true;
                    } else {
                        this.isUserInfo = false;
                    }
                }
            },
            gps: {
                handler:function(val,oldVal){
                    if(this.telephone || this.name || this.gps || this.houseNum) {
                        this.isUserInfo = true;
                    } else {
                        this.isUserInfo = false;
                    }
                }
            },
            houseNum: {
                handler:function(val,oldVal){
                    if(this.telephone || this.name || this.gps || this.houseNum) {
                        this.isUserInfo = true;
                    } else {
                        this.isUserInfo = false;
                    }
                }
            },
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData () {
                if(vm.$router.history.current.query.orderId) {
                        vm.isNewOrder = false;//表示重新派单
                        vm.orderId = vm.$router.history.current.query.orderId;
                        vm.searchOrderInfo();
                    }
            },
            paddNum: function(num){
                num += "";
                return num.replace(/^(\d)$/,"0$1");
            },
            incrementTime: function () {
                var time = new Date();
                this.orderTime = time.getFullYear() + '-' + ( time.getMonth() + 1 ) + '-' + time.getDate() + '  ' + this.paddNum(time.getHours()) + ":" + this.paddNum(time.getMinutes()) + ':' + this.paddNum(time.getSeconds());
                setTimeout(function () {
                    vm.incrementTime();
                }, 1000);
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
                            //console.log(response.data.rows);
                            //以前只显示二级菜单
                            //for(var i = 0; i < response.data.rows.length; i++) {
                            //    vm.serviceList = vm.serviceList.concat(response.data.rows[i].supProviderServiceList);
                            //}
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
                            if(vm.$router.history.current.query.orderId) {
                                vm.isNewOrder = false;//表示重新派单
                                vm.orderId = vm.$router.history.current.query.orderId;
                                vm.searchOrderInfo();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            validatePhone: function () {
                var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                this.isPhone = reg.test(this.telephone);
            },
            search: function () {
                debugger;
                this.validatePhone();
                if(this.isPhone) {
                    this.getUserAdressList();//根据电话查找多地址
                    var url = this.$store.state.serverHost + "order/SupOrder/supOrder/getLastOrderByPhone";
                    this.$http.get(url, {
                        params: {
                            mobile: this.telephone,
                            servicetypeid: this.serviceId
                        }
                    })
                            .then(function (response) {
                                if(response.data.rows.length > 0) {
                                    vm.isLast = true;
                                    vm.lastService = response.data.rows[0];
                                } else {
                                    vm.isLast = false;
                                    vm.lastService = {};
                                }

                                //isNewOrder表示是否是新录入的订单，true表示是，将上一单的用户信息拿来用;false表示是重新派单。
                                if(response.data.newPrimaryKeys.UserInfo.typeid && vm.isNewOrder) {
                                    vm.setAddress(response.data.newPrimaryKeys.UserInfo.address);
                                    vm.previewAddress = response.data.newPrimaryKeys.UserInfo.address;
                                    vm.houseNum = response.data.newPrimaryKeys.UserInfo.homeaddress;
                                    vm.gps = response.data.newPrimaryKeys.UserInfo.usergps;
                                    vm.name = response.data.newPrimaryKeys.UserInfo.username;
                                    vm.serviceId = response.data.newPrimaryKeys.UserInfo.typeid;
                                    vm.serviceIds = [response.data.newPrimaryKeys.UserInfo.categoryid,response.data.newPrimaryKeys.UserInfo.typeid];
                                    vm.serviceName = response.data.newPrimaryKeys.UserInfo.typename;
                                    vm.orderPrice = response.data.newPrimaryKeys.UserInfo.orderprice || 0;
                                    vm.favourableprice = response.data.newPrimaryKeys.UserInfo.favourableprice || 0;
                                    vm.getProviderByServiceType();
                                    vm.getThreeService();
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                }
            },
            vSearchEnter: function () {
                event.target.blur();
            },
            searchAddress (query) {
                debugger;
                if (query !== '') {
                    this.loading = true;
                    var url = 'http://restapi.amap.com/v3/assistant/inputtips';
                    this.$http.get(url,{
                        params:{
                            key : '28db175679cb08e7eecbfaac315294e2',
                            keywords : query
                        }
                    })
                            .then(function(response){
                                debugger;
                                for(var i = 0; i < response.data.tips.length; i++) {
                                    if(typeof response.data.tips[i].location === "object"){
                                        (function(addr) {
                                            vm.$http.get("http://restapi.amap.com/v3/geocode/geo",{
                                                params:{
                                                    key : '28db175679cb08e7eecbfaac315294e2',
                                                    address : response.data.tips[i].district
                                                }
                                            })
                                                    .then(function (response) {
                                                        debugger;
                                                        addr.location = response.data.geocodes[0].location;
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    })
                                        })(response.data.tips[i]);
                                    }
                                }
                                vm.options = response.data.tips;
                                vm.loading = false;
                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                } else {
                    this.options = [];
                    this.gps = '';
                    this.previewAddress = '';
                    this.houseNum = '';
                }
            },
            searchProviderByService (value,selectedData) {
                debugger;
                this.isSelected = false; // 表示没有选择服务提供者。服务类型换了，重新搜索服务提供者时值为false。
                if (value.length === 0) { //length是0表示没有选择服务
                    this.isPoptipServiceInfo = false;
                    this.serviceId = ""; 
                    this.serviceName = "";
                    this.orderPrice = 0;
                } else {
                    //更换了选择服务的方式，为了保证不用修改变量，再一次给以前的变量赋值
                    this.serviceId = value[1]; //value是存放id的数组，一级id是value[0],二级id是value[1];
                    this.serviceName = selectedData[1].label;//selectedData是所选着的全部数据，一级的数据是selectedData[0],二级的数据是selectedData[1]
                    this.orderPrice = selectedData[1].price;
                    this.getThreeService(); //搜索第三级
                }
                debugger;
                //服务改变时，也要重新搜索上一次的服务提供者
                if (this.telephone && this.serviceId) {
                    this.search();
                }
                //  else {
                //     vm.isLast = false;
                //     vm.lastService = {};
                // }
                //服务改变时，也要重新搜索最近距离的服务提供者
                if (this.gps) {
                    this.searchNearest();
                }
                this.getProviderByServiceType();
            },
            getThreeService () {
                this.isPoptipServiceInfo = true;//显示一个问号图标，poptip内容是所选服务的描述
                var descirbeUrl = this.$lazy.url.host + this.$lazy.url.getThreeService;
                this.$http.get(descirbeUrl, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        parentid: this.serviceId
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            debugger;
                            if(response.data.rows[0]) {
                                vm.$refs.serviceInfo.innerHTML = response.data.rows[0].servicedescribe;
                            }else {
                                vm.$refs.serviceInfo.innerHTML = "没有描述信息";
                            }
                            //vm.serviceContent = response.data.rows[0].servicedescribe;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getProviderByServiceType () {
                var url = this.$store.state.serverHost + "support/sup/Supserviceprovider/getByServiceType";
                this.$http.get(url, {
                    params: {
                        typeid: this.serviceId,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        communityid: this.$store.state.userInfo.streetorcommunityid
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response.data.rows);
                            vm.providerList = response.data.rows;
                            if (response.data.rows.length == 0) {
                                vm.isNoProvider = true;
                                vm.noProviderMessage = '没有服务提供者';
                            } else {
                                vm.isNoProvider = false;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            chooseAddress (data) {
                console.log(this.gps);
                this.address = data.label;
                this.searchNearest();
                if (this.isSetQuery) {
                    this.isSetQuery = false;
                } else {
                    this.previewAddress = data.label;
                }
            },
            selectedProvider (provider) {
                this.sProvider = provider;
                this.isSelected = true;
            },
            setAddress (addr) {
                this.$refs.gps.setQuery(addr);
                this.previewAddress = addr;
                this.isSetQuery = true;
            },
            chooseUserAddress (address) {
                this.setAddress(address.address);
                this.houseNum = address.fulladdress;
                this.gps = address.gps;
            },
            searchNearest () {
                var url = this.$store.state.serverHost + "support/sup/Supserviceprovider/calculatedistance";
                this.$http.get(url, {
                    params: {
                        persongps: this.gps,
                        typeid: this.serviceId,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        communityid: this.$store.state.userInfo.streetorcommunityid
                    }
                })
                        .then(function (response) {
                            debugger;
                            if (response.data.id) {
                                vm.nearProvider = response.data;
                                vm.isNear = true;
                            } else {
                                vm.isNear = false;
                                vm.nearMessage = '没有距离最近的服务提供者';
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            getOrderNum: function () {
                var url = this.$store.state.serverHost + "order/SupOrder/supOrder/createOrderNum";
                this.$http.get(url)
                        .then(function (response) {
                            debugger;
                            vm.orderNum = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            createOrder: function () {
                debugger;
                //有电话且电话正确，同时选择了服务提供者后，才可以生成订单
                if (this.isSelected && this.isPhone && this.telephone && this.serviceId) {
                    this.creating = true;
                    var url = this.$store.state.serverHost + "order/api/order/save";
                    this.$http.get(url, {
                        params: {
                            ordernum: this.orderNum,
                            servicetypeid: this.serviceId,
                            categoryid: this.serviceIds[0],
                            servicetype: this.serviceName,
                            userphone: this.telephone,
                            username: this.name,
                            orderremark: this.remarks,
                            useraddress: this.previewAddress,
                            usergps: this.gps,
                            provideropenids: this.sProvider.openid,
                            providerinitIds: this.sProvider.initid,
                            providerphone: this.sProvider.phone,
                            providername: this.sProvider.name,
                            providerid: this.sProvider.id,
                            providerpicture: this.sProvider.logo,
                            orderprice: this.orderPrice,
                            favourableprice: this.favourableprice,
                            communitytype: this.$store.state.userInfo.streetorcommunity,
                            communityid: this.$store.state.userInfo.streetorcommunityid,
                            id: this.orderId,
                            userhomeaddress: this.houseNum
                        },
                        headers: {
                            'token': this.$store.state.userInfo.access_token
                        }
                    })
                            .then(function (response) {
                                vm.$lazy.data.order = true;
                                debugger;
                                console.log(response.data.rows);
                                if (response.data.isSucceed) {
                                    vm.$Message.success('派单成功!');
                                    // 清除选择的服务提供者和服务类型，以便防止重复派单
                                    vm.isSelected = false;
                                    vm.sProvider = {};
                                    vm.serviceId = "";
                                    vm.serviceName = "";
                                    vm.serviceIds = [];
                                    vm.$Notice.close(vm.orderId);
                                    vm.orderId = 0;
                                    vm.orderPrice = 0;
                                    vm.favourableprice = 0;
                                    //清空
                                    vm.telephone = '';
                                    vm.name = '';
                                    vm.gps = '';
                                    vm.previewAddress = '';
                                    vm.houseNum = '';
                                    vm.remarks = '';
                                    vm.isLast = false;
                                    vm.isNear = false;
                                    vm.isNoProvider = true;
                                    vm.providerList = {};
                                    vm.noProviderMessage = '没有服务提供者';
                                    //重新获取订单号
                                    vm.getOrderNum();
                                    //
                                    vm.isNewOrder = true;//重新派单后将值设为true，在派单时，就是新的录入订单了
                                    //重新获取待派单的个数
                                    vm.getOrderNumOfReSend();
                                } else {
                                    vm.$Message.error(response.data.message);
                                }
                                vm.creating = false;
                            })
                            .catch(function (error) {
                                console.log(error);
                                vm.creating = false;
                            })
                } else {
                    vm.$Message.info('选择服务，服务提供者和填入正确的手机号后才可以派单!');
                }

            },
            searchOrderInfo () {
                var url = this.$lazy.url.host + this.$lazy.url.getOrderInfo;
                this.$http.get(url, {
                    params: {
                        id: this.orderId
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.orderNum = response.data.rows[0].ordernum;
                            vm.orderPrice = response.data.rows[0].orderprice;
                            vm.telephone = response.data.rows[0].userphone;
                            vm.name = response.data.rows[0].username;

                            vm.setAddress(response.data.rows[0].useraddress);
                            vm.previewAddress = response.data.rows[0].useraddress;
                            vm.houseNum = response.data.rows[0].userhomeaddress;
                            vm.gps = response.data.rows[0].usergps;

                            vm.serviceId = response.data.rows[0].servicetypeid;
                            vm.serviceIds = [response.data.rows[0].categoryid,response.data.rows[0].servicetypeid];
                            vm.serviceName = response.data.rows[0].servicetype;

                            vm.remarks = response.data.rows[0].orderremark;
                            vm.getProviderByServiceType();
                            vm.getThreeService();
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            getUserAdressList () {
                var url = this.$lazy.url.host + this.$lazy.url.UserAddressList;
                this.$http.get(url, {
                    params: {
                        mobile: this.telephone
                    }
                })
                        .then(function (response) {
                            debugger;
                            //vm.orderNum = response.data;
                            console.log(response);
                            vm.userAddressList = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            getOrderNumOfReSend () {
                var url = this.$lazy.url.host + this.$lazy.url.OrderNumOfReSend;
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            //vm.OrderNumOfReSend = response.data.newPrimaryKeys.num;
                            vm.$store.commit('updateOrderNumOfReSend', response.data.newPrimaryKeys.num);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
        }
    }

</script>


<style scoped>
  .LazyLayout {
    height: 100%;
    width: 100%;
  }
   .entryOrder {
        width: 100%;
        height: 100%;
        font-size: 14px;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        overflow: hidden;
    }
    .container {
        margin-right: 400px;
        margin-top:25px;
        margin-left:40px;
    }
    .infoBox {

    }
    /*服务提供者的卡片样式*/
    .servant {
        margin-top: 20px;
    }
    .nearServant {
        margin-top: 10px;
    }
    .sList{
        min-width: 410px;
        height: 168px;
        cursor: pointer;
    }
    .searchList {
        position: relative;
        border-bottom: 1px solid #e3e8ee;
        cursor: pointer;
        clear: both;
    }
    .searchList:hover {

    }
    .sLeft {
        width: 120px;
        margin-right:10px;
        //float: left;
    }
    .sRight {
        /*width: 50%;*/
        padding-right: 30px;
       // float: left;
    }
    .sImg {
       // width: 70px;
        //height: 90px;
        border-radius: 50%;
        margin: 40px auto;
    }
    .sImg > img {
        width: 90px;
        height: 90px;
        margin-left:22px;
    }
    .sTitle {
        margin-top: 36px;
        font-size: 14px;
        color: #333;
    }
    .sStar{
       // margin: 10px 0 10px 0;
        display: inline-block;
    }
    .icon {
        width:20px;
        height:20px;
        float: left;
    }
    .title-icons{
        width: 12px;
        height: 12px;
        cursor: pointer;
        fill:#39cfa2;
    }
    .title-icon{
         width: 12px;
        height: 12px;
        cursor: pointer;
       fill:#7c86e7; 
    }


    .providers {
        height: 453px;
        overflow: hidden;
        overflow-y: auto;
    }
    .providers::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }

    .providers::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }

    .providers::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }

    .orders {
        height: 453px;
        overflow: hidden;
        overflow-y: auto;
    }
    .orders::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }

    .orders::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }

    .orders::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }




    .vCheckBox{
        position: absolute;
        top: 6%;
        left: 6%;
        padding-left: 9px;
        padding-top: 5px;
    }
    .hideCheckbox {
        display: none;
    }
    .searchList:hover  .vCheckBox{
        display: block;
    }
    /*订单预览*/
    .preview {
        width: 360px;
        /* height: 972px; */
        /* background-color: #fff; */
        /* border: 1px solid #e3e8ee; */
        position: fixed;
        top: 83px;
        border-left: 1px solid #e3e8ee;
        right: 0px;
        bottom: 0px;
        background-color: rgba(183, 202, 254,0.3);
    }
    .servicePhoto {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        float: left;
        text-align: center;
        padding-top: 10px;
    }
    .servicePhoto img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .serviceInfo {
        float: left;
        font-size: 12px;
        height: 60px;
        padding-top: 12px;
    }
    .icon-tel {
        float: right;
        text-align: center;
        padding-top: 10px;
        padding-right: 5px;
    }
    .order-tel-icon {
        width: 40px;
        height: 40px;
        cursor: pointer;
        fill:#ffae00;
    }
    .serviceContent {
        padding: 10px;
    }
    .orderInfo .right {
        max-width: 260px;
        float: right;
    }
    .orderInfo {
        margin-bottom: 15px;
        clear: both;
    }
    .money {
        padding: 10px;
    }
    .orderInfoLabel {
        margin-bottom: 5px;
    }
</style>
