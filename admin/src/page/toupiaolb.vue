<template>
    <div style="display: flex;min-height: 100%;">
      <div style="flex: 1;">
        <Affix :offset-top="0">
          <LazyTopbar :data='json'style="position:fixed;top:0;z-index:11;padding-right:235px;margin-bottom: 10px;">
          </LazyTopbar>
        </Affix>
        <div class="rows">
          <!--<div v-if="lists.length==0">暂无数据</div>-->
          <no-data-page path="toupiaotj" v-if="lists.length==0"></no-data-page>
          <Row class="row" v-for="(list,index) in lists" :key="index" style="margin:10px 0 50px 0;" ref="row">
            <div class="dateBox" style="font-size: 18px;margin:0 0 30px 20px;">
              <span style="color: #3c7ce6;">{{list.months}}</span>
              <span  style="cursor: pointer;float:right;margin-right:2.5%;" @click="tract(list)" >
              <Icon v-if="list.backflag" type="chevron-down" style="color: #a8aeb6;"></Icon><Icon v-else type="chevron-up" style="color: #a8aeb6;"></Icon>
            </span>
              <span style="font-size:14px;color:#a8aeb6;padding-left:6px;">{{list.monthscount}}篇</span>
            </div>

            <!--<centerlist :width="wid" :number="255" :class="{hide: list.backflag}">-->
            <div :class="{hide: list.backflag}" style="overflow: hidden;">
              <div class="colBox" v-if="index==0" style="min-width: 300px;height: 200px;float: left;margin:0 0 30px 20px;border:1px dashed #bbbbbb;padding-top: 75px;cursor: pointer" @click="toupiaotj">
                <div :style="{backgroundImage:'url('+jia+')'}" style="width: 50px;height: 50px;margin:0 auto;background-size: cover;"></div>
              </div>

              <myCard2 :items="item"  :arr="list.everymonthdata" :arr1="item" :key="index" @getIndex="getIndex(index)" @close="del" @openUrl="goRouter" @mouseent="mouseent(index)" @toupiaobj="toupiaobj"></myCard2>
            </div>
            <!--</centerlist>-->
          </Row>
        </div>
        </div>
      <!-- 右侧区域 -->
      <!--<loading v-if="isLoading.isSearchActiveList"></loading>-->
      <div style="width:240px;min-height: 100%;background-color: #fff;border-left: 1px solid #ddd;">
        <div>
          <div class="reset">
            <svg class="title-icon" aria-hidden="true">
              <use xlink:href="#icon-shaixuan"></use>
            </svg>
            筛选
            <span @click="reset">重置</span>
          </div>
        </div>
        <p class="searchType">标题</p>
        <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
          <div>
            <Input v-model="searchKey" @on-blur="search" @on-enter="search" placeholder="请输入..." ></Input>
          </div>
        </Card>
        <p class="searchType sta">状态</p>
        <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
          <div>
            <div class="selectState" @click="selectedState('2')"  :class="{selectedColor: activeFlag == '2'}">已结束</div>
            <div class="selectState" @click="selectedState('1')"  :class="{selectedColor: activeFlag == '1'}">进行中</div>
            <div class="selectState" @click="selectedState('0')"  :class="{selectedColor: activeFlag == '0'}">未开始</div>
          </div>
        </Card>

        <!--<div style="position:fixed;bottom: 10px;width: 100%;height: 35px;border-top: 1px solid #eeeeee;">-->
          <!--<div class="rightBtn" style="background-color: #3c7ce6;color: #fff;" @click="search">搜索</div>-->
          <!--<div class="rightBtn" style="border: 1px solid #3c7ce6;color: #3c7ce6;" @click="reset">重置</div>-->
        <!--</div>-->
      </div>
      <!-- 右侧区域 -->

    </div>
</template>
<script>
  import Affix from 'iview/src/components/affix';
  import Card from 'iview/src/components/card';
  import Input from 'iview/src/components/input'
  import {Row,Col,Icon}  from 'iview';
  import read from '../components/read.vue';
  import centerlist from '../components/centerlist.vue';
  import myCard2 from '../components/myCard2.vue';
  import jia from '../assets/images/toupiao/jia.png';
  import loading from '../components/loading';
  import noDataPage from '../components/noDataPage';


    var vm;
    export default {
        data () {
            return {
              wid:'',
              jia:jia,
              i:'',
              searchKey : "",
              state:"",
              activeFlag : "",
              page : 1,
              isLoading: {isSearchActiveList: true},
              item:[{value:23100,title:'阅读'},{value:123,title:'候选'},{value:123,title:'投票'}],
              json:{
                title:"投票",
              },
              lists:[]
//              lists:[{num:"0001",ticket:"203",arr:[{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"}]},{num:"0002",ticket:"200",arr:[{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"}]}]
            }
        },
        mounted:function(){
          this.ff();
          window.addEventListener('resize',this.ff);
          this.getList();
        },
        created: function () {
            vm = this;
        },
        components: {
          Affix,
          Row,
          Col,
          Icon,
          read,
          centerlist,
          myCard2,
          Card,
          Input,
          loading,
          noDataPage
        },
        methods: {
          alt(){
            alert(1)
          },
            getList(){
              var url = this.$store.state.serverHost + 'cmy/vote/cmyVote/listByMonthTimeArray';
              this.$http.get(url, {
                params:{
                    "communityid": this.$store.state.userInfo.streetorcommunityid,
                    "communitytype": this.$store.state.userInfo.streetorcommunity,
                    "initId":this.$store.state.communityDetail.initid,
                    "title":vm.searchKey,
                    "page":'1',
                    "rows":'10',
                    "state":vm.activeFlag
                  }
              })
                .then(function (response) {
//                  vm.isLoading.isSearchActiveList = false;
                  vm.lists = response.data.rows;
//                  for(var i =0;i<vm.lists.length;i++){
//                      for(var j =0;j<vm.lists[i].everymonthdata.length;j++){
//                          if(vm.lists[i].everymonthdata[j].state=="0"){
//                              vm.stateObj.stateStr = '未开始';
//                              vm.stateObj.stateImg = 'wei';
//                          }else if(vm.lists[i].everymonthdata[j].state=="1"){
//                              vm.stateObj.stateStr = '进行中';
//                              vm.stateObj.stateImg = 'jin';
//                          }else{
//                              vm.stateObj.stateStr = '已结束';
//                              vm.stateObj.stateImg = 'yi';
//                          }
//                      }
//                  }
                })
                .catch(function (error) {
                  console.log(error);
                })
            },
            ff(){
              this.wid=document.getElementsByClassName('rows')[0].clientWidth;
            },
            tract (list) {
              vm.$set(list, 'backflag', !list.backflag);
            },
            search: function(){
                this.ff();
                this.getList();
            },
            reset:function(){
                this.ff();
                vm.searchKey= "",
                vm.title='';
                vm.state='';
                vm.activeFlag='';
                vm.stateObj={};
                this.getList();
            },
            selectedState : function(state){
//              vm.state = state;
              if( vm.activeFlag === state) {
                vm.activeFlag = "";
              } else {
                vm.activeFlag = state;
              }
              this.getList();
            },
            del : function(obj){
//              vm.lists[index].everymonthdata.splice(vm.i,1);
              var url = this.$store.state.serverHost + 'cmy/vote/cmyVote/del?id='+obj.id;
              this.$http.get(url, {
                params:{
                }
              })
                .then(function (response) {
                  vm.lists[vm.i].everymonthdata.splice(obj.index,1);
                })
                .catch(function (error) {
                  console.log(error);
                })
            },
            goRouter :function(id){
              this.$router.push({
                path:"toupiaoZi",
                query:{
                  routeParams:id
                }
              });
            },
            mouseent :function(i){
                  vm.i = i;
            },
            toupiaotj:function(){
              this.$router.push({
                path:"toupiaotj"
              });
            },
            toupiaobj(id){
              this.$router.push({
                path:"toupiaotj",
                query:{
                  toupiaoid:id

                }
              })
            },

        }

    }
</script>
<style>
  @media screen and (min-width: 1730px) {
    .colBox {
      width:25%;
    }
  }
  @media screen and (min-width:1460px) and (max-width:1730px){
    .colBox {
      width:30%;
    }
  }
  @media screen and (min-width:1133px) and (max-width:1460px){
    .colBox {
      width:45%;
    }
  }
  @media screen and (max-width: 1133px) {
    .colBox {
      width:60%;
    }
  }

  .dateBox{
    margin-bottom: 15px!important;
    margin-top: 15px!important;
  }
  /*.myBox2{*/
    /*width:auto!important;*/
    /*height: 56px!important;*/
    /*background-color: transparent!important;*/
  /*}*/
  .read_p2{
    color: #999999;
    font-size: 12px;
  }
  /*.fl{*/
    /*width: 33.33%!important;*/
    /*height:auto!important;*/
    /*margin-top: 5px!important;*/
    /*border:none!important;*/
  /*}*/
  .hide{
    display: none;
  }
  /*右侧*/
  .rightBtn{
    float:left;
    width: 105px;
    height: 25px;
    margin:8px 0 0 10px;
    line-height: 25px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }
  .selectedColor {
    background-color: #2d8cf0!important;
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
  .searchType{
    padding: 15px;
    font-size: 14px;
    font-weight:bolder;
  }
  .sta{
    padding-top:35px;
  }
  .title-icon{
    width: 16px;
    height: 16px;
    vertical-align: middle;
    cursor: pointer;
    fill: #333;
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
</style>

