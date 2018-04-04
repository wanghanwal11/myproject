s/**
* Created by bk on 2017/6/29.
*/
<template>
        <div class="enterprise">
                 <LazyTopbar :data="json" style="position:fixed;top:0px;left:0;right:0;z-index:1;padding-left:220px;">
                      <!-- <img style="width: 130px;height: 130px;" :src="img" slot="Button"> -->
                      <div slot="Button">
                      <p style="text-align:center;font-weight:bolder;">企业、志愿者报名二维码</p>
                          <img style="width: 130px;height: 130px;" :src="img">
                      </div>
                 </LazyTopbar>
            <LazyLayout>
                <div style="width:100%;height:100%;box-sizing:border-box;">
                    <LazyLayout class="lazyOut" wrap="top" orient="" align="" justify="">
                        <LazyBox class="LazyBox" m1="12" m2="6" m3="6" m4="4" v-for="volunteer in volunteersInfo" style="">
                            <Card class="cardBox" dis-hover style="min-width:350px; width:100%;">
                                <p slot="title" style="height:32px;">
                                    <i-switch size="small" v-model="volunteer.ischeck" @on-change="change(volunteer,$event)">
                                    </i-switch>
                                </p>
                                <div @click="seeToDetail(volunteer.id)" style="cursor: pointer">
                                    <LazyLayout>
                                        <!-- <div class="eList" @click="detailInfo(volunteer)"> -->
                                        <LazyLayout>
                                            <div class="eImg"><img :src="volunteer.logo" alt=""></div>
                                        </LazyLayout>

                                        <LazyLayout orient="v" style="margin-right:5px;">
                                            <div style="height:108px;">
                                                <div class="eTitle">
                                                    <div>{{volunteer.name}}
                                                        <Tag color="blue" class="tag" v-if="volunteer.type == 1">企业</Tag>
                                                        <Tag color="red" class="tag" v-if="volunteer.type == 2">志愿者团队</Tag>
                                                        <Tag color="red" class="tag" v-if="volunteer.type == 3">便民服务团队</Tag>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Tooltip v-if="volunteer.serversName" :content="volunteer.serversName" placement="top-start" style="width:100%;">
                                                        <p style="color:#5498c8;width:188px;height:21px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><span>{{ volunteer.serversName }}</span></p>
                                                    </Tooltip>
                                                    <div class="eStar"><Rate disabled  v-model="volunteer.providerstart"></Rate></div>
                                                </div>
                                            </div>
                                            <div style="margin-left:-4px;">
                                                <div class="icon">
                                                    <Tooltip :content="volunteer.address" placement="top">
                                                        <svg class="title-icon2 address" aria-hidden="true">
                                                            <use xlink:href="#icon-dizhi1"></use>
                                                        </svg>
                                                    </Tooltip>
                                                </div>
                                                <div class="icon">
                                                    <Tooltip :content="volunteer.phone" placement="top">
                                                        <svg class="title-icon2 phoneSvg" aria-hidden="true">
                                                            <use xlink:href="#icon-xihebiaozhunyuanjian439"></use>
                                                        </svg>
                                                    </Tooltip>
                                                </div>
                                                <!-- <div style="font-size: 13px;float: left;width: 20px"></div> -->
                                                <!-- <p style="float:right;margin-right:10px;font-size:12px;color:#999999;">1256</p>
                                                <div class="icon" style="float:right;">
                                                    <svg class="title-icon2 order" aria-hidden="true">
                                                        <use xlink:href="#icon-dingdan"></use>
                                                    </svg>
                                                </div>
                                                <p style="float:right;margin-right:10px;font-size:12px;color:#999999;">1256</p>
                                                <div class="icon" style="float:right">
                                                    <svg class="title-icon2 pinglun" aria-hidden="true">
                                                        <use xlink:href="#icon-pinglun1"></use>
                                                    </svg>
                                                </div> -->
                                            </div>
                                        </LazyLayout>
                                        <!--  </div> -->
                                    </LazyLayout>
                                </div>
                            </Card>
                        </LazyBox>
                    </LazyLayout>
                </div>
                <my-search @listenToChildSearchEvent="getEnterpriseList"></my-search>
            </LazyLayout>
        </div>
</template>
<script type="es6">
    var vm;
    import mySearch from '../components/volunteerSearch'
    import Card from 'iview/src/components/card'
    import Checkbox from 'iview/src/components/checkbox'
    import Tooltip from 'iview/src/components/tooltip'
    import Tag from 'iview/src/components/tag'
    import {Row,Col} from 'iview/src/components/grid'
    import Rate from 'iview/src/components/rate'
    import iSwitch from 'iview/src/components/switch'

    export default {
        name: 'enterpriseLists',
        data(){
            return {
                volunteersInfo: [],
                searchTerm: {searchKey: '',ischeck: '',summary: []},
                value:"",
                page:1,
                img:"",
                servers:"",
                arrs:[],
                serversName:[],
                allpage : 1,
                json:{
                    title:"服务提供者",
                    right:[
                        {
                            type:"Button",
                            buttontype:"ghost",
                            class:"btns",
                            svg:"#icon-erweima",
                            //buttontype:"text",
                            size:"small",
                             poptip : {
                                trigger : "hover",
                                placement : "bottom"
                            }
                        },
                        {
                            type:"ButtonGroup",
                            //class:'btn',
                              content : [{
                                  label : '加盟',
                                  size:'small',
                                  onclick:function(){
                                    window.open('../../static/join.html?communityid=' + vm.$store.state.userInfo.streetorcommunityid + '&communitytype=' + vm.$store.state.userInfo.streetorcommunity +'&initid=' + vm.$store.state.communityDetail.initid );
                                  }
                              }],
                        }
                    ]
                }
            }
        },
        components: {
            mySearch,
            Card,
            Checkbox,
            Tooltip,
            Tag,
            Row,
            Col,
            Rate,
            iSwitch
        },
        created: function() {
            vm = this;
            debugger;
            this.searchVolunteer();
            window.addEventListener('scroll',vm.scroll);
            var url = this.$store.state.serverHost + "wx/api/wx/getForeverCode";
            // vm.$get(url,{
            //    initid : vm.$store.state.communityDetail.initid,
            //    code:"AddSer",
            //    'token': vm.$store.state.userInfo.access_token
            // },function(res){

            //     console.log(res)
            //     vm.img = res.rows[0];
            // })

            //获取二维码
             this.$http.get(url,{
                params:{
                    initid : vm.$store.state.communityDetail.initid,
                    code:"AddSer",
                    'token': vm.$store.state.userInfo.access_token
                }
             })
                .then(function(res){
                    vm.img = res.data.rows[0];
                })
                .catch(function(err){
                    console.log(err);
                })


        },
        destroyed: function () {
            window.removeEventListener('scroll',vm.scroll,false);
        },
        methods: {
            searchVolunteer:function(){
                debugger;
                var url =   this.$store.state.serverHost + "support/sup/Supserviceprovider/list";
                this.$http.get(url,{
                    params:{
                        communitytype : vm.$store.state.userInfo.streetorcommunity,
                        communityid : vm.$store.state.userInfo.streetorcommunityid,
                        ischeck: this.searchTerm.ischeck,
                        name: this.searchTerm.searchKey,
                        page:this.page,
                        rows:15,
                        summary: this.searchTerm.summary.join()
                    }
                })
                    .then(function(response){
                        debugger;
                        console.log(response)
                        if(response.data.rows.length>0){
                            for(var i=0; i < response.data.rows.length; i++) {
                                response.data.rows[i].ischeck = response.data.rows[i].ischeck == 1;
                                for(var j=0; j < response.data.rows[i].supProviderList.length; j++) {
                                    for(var k=0; k<response.data.rows[i].supProviderList[j].supProviderServiceList.length; k++) {
                                        if(response.data.rows[i].serversName){
                                            vm.$set(response.data.rows[i], 'serversName', response.data.rows[i].serversName + ',' + response.data.rows[i].supProviderList[j].supProviderServiceList[k].title);
                                        } else {
                                            vm.$set(response.data.rows[i], 'serversName', response.data.rows[i].supProviderList[j].supProviderServiceList[k].title);
                                        }

                                    }
                                }
                            }
                            vm.allpage++;
                        }
                        debugger;
                        vm.volunteersInfo = vm.volunteersInfo.concat(response.data.rows);
                    })
                    .catch(function(error){
                        console.log(error)
                    })

                //带loading的ajax请求
                // this.$get(url,{
                //          communitytype : vm.$store.state.userInfo.streetorcommunity,
                //          communitytypeid : vm.$store.state.userInfo.streetorcommunityid,
                //          ischeck: this.searchTerm.ischeck,
                //          name: this.searchTerm.searchKey,
                //          page:this.page
                //      },function(obj){
                //         vm.volunteersInfo = vm.volunteersInfo.concat(obj.rows);
                //      })
            },
            change:function(volunteer,event){
                debugger;
                var vm = this;
                volunteer.ischeck = volunteer.ischeck ? 1 : 0;
                var url = vm.$store.state.serverHost + "support/sup/Supserviceprovider/save";
                vm.$http.get(url,{
                    params:{
                        id : volunteer.id,
                        ischeck : volunteer.ischeck
                    }
                })
                    .then(function(data){
                        debugger;
                        console.log(data);
                        if (data.data) {
                           vm.$Message.success("修改成功!");
                        } else {
                           vm.$Message.error("修改失败!");
                        }
                    })
                    .catch(function(error){
                        vm.$Notice.error({
                            title: error
                        });
                       // volunteer.auditstate = event;
                    })
            },
            getEnterpriseList (data) {
                this.searchTerm = data;
                this.volunteersInfo = [];
                this.page = 1;
                this.searchVolunteer();
            },
            scroll:function(){
                if(vm.isTriggerScroll){
                    var offsetHeight = document.body.offsetHeight,
                            scrollHeight = document.body.scrollHeight,
                            scrollTop = document.body.scrollTop,
                            scrollBottom = offsetHeight + scrollTop;
                           if(scrollBottom == scrollHeight){
                                vm.page++;
                                if(vm.page <= vm.allpage){
                                    vm.searchVolunteer();
                                }else{
                                    vm.page = vm.allpage;
                                }
                            }
                }else{
                    vm.isTriggerScroll = true;
                }
            },
            seeToDetail(id) {
                this.$router.push({
                    name:"VolunteerInfos",
                    query:{
                        routeParams:id
                    }
                });
            },
        }
    }
</script>

<style scoped>

    .lazyOut{
        width:100%;
        height:100%;
        //margin-top:15px;
        //margin-left:31px;
        //margin-right:45px;
        box-sizing:border-box;
        padding:30px 30px 0;
    }
    .LazyBox {
        min-width: 100px;
        padding-right:31px;
        padding-bottom:31px;
    }
    .phoneSvg{
        fill:#3242dd;
        width:18px;
        height:18px;
    }

    .address{
        fill:#39cfa2;
        width:14px;
        height:13px;
        margin-left:3px;
    }

    .pinglun{
        fill:#999999;
        width:15px;
        height:12px;
        margin-left:1px;
    }

    .order{
        fill:#999999;
        width:17px;
        height:15px;
        margin-top:2px;
    }

    .icon {
        width:20px;
        height:20px;
        float: left;
    }
    .title-icon2{
        cursor: pointer;
    }
    .tag{
        margin:0 0 2px 8px;
    }
    .enterprise{
        height: 100%;
        //padding-left: 30px;
        position: relative;
       // margin-right: 261px;
        //top:-15px;
    }
    .stateBox{
        width: 250px;
        height: 30px;
        border: 1px solid #c1c5cb;
        border-right:none;
        position: absolute;
        top: 20px;
        right: 5px;
    }
    .state{
        width: 83px;
        line-height: 28px;
        float: left;
        border-right: 1px solid #c1c5cb;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }
    .ls{
        background: #3c7ce6;
        color: #fff;
    }

    .eList{
        //height: 168px;
        height:140px;
    }
    .eLeft{
        width: 32%;
        float: left;
        height:130px;
    }
    .eRight{
        width: 66%;
        //padding-right: 30px;
        float: left;
    }
    .eImg{
        //width: 32px;
        //height: 39px;
        //border-radius: 50%;
        //margin: 40px auto;
       margin:18px 20px 13px 10px;
    }
    .eImg > img {
        width: 105px;
        height: 105px;
    }
    .eStar{
        //margin: 10px 0 10px 0;
        margin-top:-6px;
    }
    .eRead{
        line-height: 20px;
        margin-left: 18px;
    }
    .eRead img{
        vertical-align: top;
        margin-right: 8px;
    }
    .eTitle{
        margin-top: 16px;
        margin-bottom:5px;
        font-size: 14px;
        color: #333;
    }
    .eName{
        margin-top: 25px;
        font-size: 18px;
        color: #333;
    }
    .eName span{
        line-height: 24px;
        margin-top: 3px;
        margin-left: 20px;
        font-size: 12px;
        color: #666;
    }
    .title-icon{
        width: 15px;
        height: 15px;
        cursor: pointer;
        fill:#ddd;
    }
    .title-icon0{
        width: 12px;
        height: 12px;
        margin-right: 3px;
        cursor: pointer;
        fill:#50dba2;
    }
    .title-icon1{
        width: 12px;
        height: 12px;
        cursor: pointer;
        fill:#ffae00;
    }

    /*.eMobile,.ePhone,.eEmail,.eAddress,{
        float: left;
        width:20px;
        height:20px;
        font-size: 14px;
        color: #999;
    }*/
   .eContact .eMobile{
        width:20px;
        height:20px;
        float: left;
   }

   .eContact .ePhone{
        width:20px;
        height:20px;
        float: left;
   }

   .eEmail{
        width:20px;
        height:20px;
        float: left;
   }

   .eAddress{
        width:20px;
        height:20px;
        float: left;

   }
    .volunteerORGName{
        width: 100%;
        height: 64px;
        background: #fff;
        border: none;
        border-radius: 5px;
        padding: 4px 7px;
        outline: none;
        resize:none;
    }
    .inputVN {
        width: 90px;
        background: #fff;
        border: none;
        border-radius: 5px;
        outline: none;
        padding-left: 5px;
    }
    .inputWidth1 {
        width: 24px;
    }
    .inputWidth2 {
        width: 110px;
    }
    .inputWidth3 {
        width: 93%;
    }
    .inputVN:hover,.volunteerName:hover{
        border-color: #5cadff;
        background: #ddd;
    }




</style>

<style>
    .btns{
        margin-right:-10px;
    }

</style>

