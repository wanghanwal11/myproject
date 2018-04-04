/**
* Created by bk on 2017/09/12.
*/
<template>
    <div>
        <!-- 右侧区域 -->
        <div class="branch">
            <div class="reset">
                <svg class="title-icon" aria-hidden="true">
                    <use xlink:href="#icon-shaixuan"></use>
                </svg>
                筛选
                <span @click="reset">重置</span>
            </div>

            <p class="searchType">标题</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="searchKey" @on-blur="search" @on-enter="vSearchEnter" placeholder="请输入..." ></Input>
                </div>
            </Card>

            <p class="searchType sta">状态</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <div class="selectState" @click="selectedState('3')"  :class="{selectedColor: activeFlag == '3'}">已结束</div>
                    <div class="selectState" @click="selectedState('2')"  :class="{selectedColor: activeFlag == '2'}">进行中</div>
                    <div class="selectState" @click="selectedState('1')"  :class="{selectedColor: activeFlag == '1'}">未开始</div>
                </div>
            </Card>
          <!--   <p style="cursor: pointer;margin-bottom:40px;margin-top:40px;padding-left:16px;font-weight:bolder;font-size:14px;">人数</p>
            <div class="classify">
                <Slider max="200" v-model="value" @on-change="slideVal" range style="width:200px;margin:0 auto;"></Slider>
            </div> -->
            <p slot="title" class="searchType times" style="font-weight: bolder;">时间</p>
            <Date-picker type="daterange" :value="timeValue" @on-change="timeSearch" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin: 0 0 15px 20px;"></Date-picker>

            <Card style="width:240px;margin-top:7px;" dis-hover :bordered="false" class="list-type-card">
                <p slot="title" style="font-weight: bolder;">分类</p>
                <ul>
                    <li v-for="type in activeType">
                        <Checkbox @on-change="stateList(type)" v-model="type.selectFlag">
                            <span style="padding-left:10px;">{{ type.type }}</span>
                        </Checkbox>
                     </li>
                </ul>
            </Card>
        </div>
        <!-- 右侧区域 -->

        <!-- 内容区域 -->
        <div class="lBox" style="margin-right: 240px;margin-left:20px;margin-top:59px;">
            <Row>

            <!--     <Col v-if="ind === 0" :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 20px;padding-right: 20px;cursor:pointer;" class="divCard"  v-for="(item,ind) in activeList">
                    <div style="border: 1px dashed #e1e1e1;background-color: #fbfbfb;position: relative">
                        <div style="width: 100%;height: 0;padding-top: 57%;">

                        </div>
                        <div @click="routeTo('huodongbj')" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;background-repeat: no-repeat;background-position: center;" :style="{backgroundImage:'url('+addPicture+')'}">

                        </div>
                        <p style="padding:0 10px;height:40px;line-height:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></p>
                    </div>
                </Col> -->

                <Col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 20px;padding-right: 20px;cursor:pointer;" v-for="(item,ind) in activeList" class="divCard">

                    <Card dis-hover >
                        <div class="imgBox" @click="goRouter(item.id)">
                            <div class="stateDiv" v-if="item.state == 3"><p class="p">已结束</p></div>
                            <div class="stateDivs" v-if="item.state == 2"><p class="p">进行中</p></div>
                            <div class="stateDivss" v-if="item.state == 1"><p class="p">未开始</p></div>
                            <div style="background-size: cover;background-position: center;padding-top: 57%;background-repeat: no-repeat;" v-bind:style="{backgroundImage:'url('+item.cover+')'}"></div>
                            <div class="infoBox"  :class="{infoBox:true,hide: !item.selectFlag}">
                                <div class="leftBox">
                                    <span>{{ new Date(parseInt(item.starttime)).toLocaleDateString()}}&nbsp;&nbsp;&nbsp;{{$lazy.FormatDate(parseInt(item.starttime),'HH:mm:ss')}}</span>
                                </div>
                                <div class="rightBox">
                                    <dl>
                                        <dt><img src="../assets/images/ping.png" alt=""></dt>
                                        <dd><p>{{item.comments}}</p></dd>
                                    </dl>

                                    <dl>
                                        <dt><img src="../assets/images/eyes.png" alt=""></dt>
                                        <dd><p>{{item.views}}</p></dd>
                                    </dl>

                                    <dl>
                                        <dt><img src="../assets/images/peo.png" alt=""></dt>
                                        <dd><p>{{item.enrollment}}</p></dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                            <p style="padding:0 10px;height:40px;line-height:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ item.title }}</p>
                    </Card>
                </Col>
            </Row>
        </div>
        <!-- 内容区域 -->
    </div>
</template>

<script type="es6">
    var vm;
    import Card from 'iview/src/components/card'
    import Input from 'iview/src/components/input'
    import Checkbox from 'iview/src/components/checkbox'
    import {Row,Col} from 'iview/src/components/grid'
    import Icon from 'iview/src/components/icon'
    import DatePicker from 'iview/src/components/date-picker'
    import Button from 'iview/src/components/button'
    import Slider from 'iview/src/components/slider'
    import addPic from '../assets/images/addArticle.png'


    export default {
        name: 'activityLists',
        data (){
            return {
                json:{
                    title : "活动",
                },
                value : [],
                activeList : [],
                searchKey : "",
                activeFlag : "",
                timeValue : [],
                page : 1,
                allpage : 1,
                activeType : [],
                id : "",
                stategroup : [],
                isTriggerScroll : true,
                addPicture: addPic
            }
        },
        components: {
            Card,
            Input,
            Checkbox,
            Row,
            Col,
            Icon,
            DatePicker,
            Button,
            Slider
        },

        activated : function() {
            debugger
            vm = this;
            if(this.$lazy.data.sxMore){
                vm.activeList = [];
                this.page = 1;
                this.searchActiveList();
                this.$lazy.data.sxMore = false;
            }
            if(this.$lazy.data.sx) {
                vm.activeList = [];
                this.page = 1;
                this.searchActiveList();
                this.$lazy.data.sx = false;
                this.$lazy.data.sxMore = true;
            }
            this.$emit("change",0); // 触发父组件的change方法
            //记忆位置
            window.addEventListener('scroll',this.scroll);
            this.$nextTick(function(){
                window.scroll(0, this.$lazy.data.activeListPosition)
            })

        },
        deactivated: function () {
            debugger
            window.removeEventListener('scroll',vm.scroll,false);
        },


        created: function () {
            debugger;
            vm = this;
            this.page = 1;
            this.$emit("change",0); // 触发父组件的change方法
            vm.searchActiveList();
            vm.searchActiveType();
            window.addEventListener('scroll',vm.scroll);
        },

        beforeRouteLeave(to, from, next){
          let position = document.documentElement.scrollTop;
          this.$lazy.data.activeListPosition= position//离开路由时把位置存起来
          next()
        },
        //组件销毁后调用
         destroyed: function () {
            debugger;
            window.removeEventListener('scroll',vm.scroll,false);
        },

        methods:{
            //搜索活动列表
            searchActiveList (_params) {
                var params = {
                    communitytype : this.$store.state.userInfo.streetorcommunity,
                    communityid : this.$store.state.userInfo.streetorcommunityid,
                    title : vm.searchKey,
                    state : vm.activeFlag,
                    beginactivitytime : vm.timeValue[0],
                    endactivitytime : vm.timeValue[1],
                    page : vm.page,
                    rows : 16,
                    lowernumber : vm.value[0],
                    uppernumber : vm.value[1],
                    activitytype : vm.stategroup.join(","),
                    draft : 'N'
                }
                if(_params)params = _params;
                this.$lazy.data.activeConfig = params;
                var url = this.$store.state.serverHost + this.$lazy.url.activeList;
                this.$http.get(url, {
                    params: params
                })
                .then(function (response) {
                    debugger
                    console.log(response);
                    if(response.data.rows.length > 0){
                        for(var i=0; i<vm.activeList.length; i++){
                            vm.$set( vm.activeList[i], 'selectFlag', false);
                        }
                        vm.allpage++;
                    }
                    vm.activeList = vm.activeList.concat(response.data.rows);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },

            //搜索活动分类
            searchActiveType(){
                var url = this.$store.state.serverHost + this.$lazy.url.activeType;
                 this.$http.get(url, {
                    params: {
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                        communityid : this.$store.state.userInfo.streetorcommunityid
                    }
                })
                .then(function (data) {
                    debugger;
                    console.log(data)
                    vm.activeType = vm.activeType.concat(data.data.rows)
                })
                .catch(function (error) {
                    console.log(error);
                })
            },

            //标题搜索
            search: function(){
                vm.isTriggerScroll = false;
                vm.activeList = [];
                this.page = 1;
                vm.searchActiveList();
            },

            //状态搜索
            selectedState(state){
                if( vm.activeFlag === state) {
                    vm.activeFlag = "";
                } else {
                    vm.activeFlag = state;
                }
                vm.isTriggerScroll = false;
                this.page = 1;
                vm.searchActiveState()
            },
            searchActiveState(){
                vm.activeList = [];
                vm.isTriggerScroll = false;
                vm.searchActiveList();
            },

            //根据时间搜索
            timeSearch(data){
                vm.activeList = [],
                vm.timeValue = data;
                vm.isTriggerScroll = false;
                this.page = 1;
                vm.searchActiveList();
            },

            //page分页
            scroll: function() {
                if(vm.isTriggerScroll){
                    var offsetHeight = document.body.offsetHeight,
                            scrollHeight = document.body.scrollHeight,
                            scrollTop = document.body.scrollTop,
                            scrollBottom = offsetHeight + scrollTop
                    if(scrollBottom == scrollHeight)
                    {
                        vm.page++;
                        if(vm.page <= vm.allpage){
                            debugger
                            vm.searchActiveList();
                        }else{
                            vm.page = vm.allpage;
                        }
                    }
                }else {
                    vm.isTriggerScroll = true;
                }
            },

            goRouter(id) {
                this.$router.push({
                    path:"activityDetails",
                    query:{
                        routeParams:id
                    }
                });
            },

           // 重置
            reset(){
               vm.activeList = [];
               vm.searchKey = "";
               vm.timeValue = [];
               vm.activeFlag = "";
               vm.stategroup = [];
               vm.timevalue = [];
               vm.page = 1;
               for (var i = 0; i < vm.activeType.length; i++) {
                    vm.$set(vm.activeType[i], 'selectFlag', false);
                }
                vm.isTriggerScroll = false;
                this.page = 1;
               vm.searchActiveList();
            },

            stateList: function (type) {
                if (type.selectFlag) {
                    vm.stategroup.push(type.id);
                }else{
                    vm.stategroup.splice(vm.stategroup.indexOf(type.id), 1);
                }
                if (this.stategroup) {
                    vm.activeList = [];
                    vm.isTriggerScroll = false;
                    this.page = 1;
                    vm.searchActiveList();
                }
            },

            routeTo(name) {
                this.$router.push(name);
            },

            vSearchEnter: function () {
                event.target.blur();
            },

        }
    }
</script>

<style scoped>
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
.vCheckBox{
    display: block;
    position: absolute;
    top: 6%;
    left: 6%;
    padding-left: 9px;
    padding-top: 5px;
}
.sendBox{
    width: 668px;
    height: 400px;
}
.imgBox{
    position: relative;
}
.stateDiv{
    width: 0;
    height: 0;
    border-top: 50px solid #0aab7f;
    border-right: 50px solid transparent;
    position: absolute;
    top:0;
    left:0;
}
.stateDivs{
    width: 0;
    height: 0;
    border-top: 50px solid #ff8827;
    border-right: 50px solid transparent;
    position: absolute;
    top:0;
    left:0;
}
.stateDivss{
    width: 0;
    height: 0;
    border-top: 50px solid #666666;
    border-right: 50px solid transparent;
    position: absolute;
    top:0;
    left:0;
}
.p{
    width: 50px;
    -webkit-transform: rotate(-48deg);
    position: absolute;
    top: -48px;
    left: -4px;
    font-size: 1px;
    color:#fff;
}
.imgBox img{
    width:100%;
    height:100%;
}
.stateBox{
    width:50px;
    height:23px;
    background-color:#2d8cf0;
    position:absolute;top:32px;
    right:10px;
    border-radius:3px;
    font-size:8px;
    text-align:center;
    line-height:23px;
    color:#fff;
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
    background-color: #2d8cf0;;
}
.list-type-card ul{
    margin-top:-6px;
}
.list-type-card li{
    padding-left:18px;
    line-height: 33px;
}
.infoBox{
    height:26px;
    min-width:100%;
    background-color:rgba(0,0,0,0.5);
    position: absolute;
    bottom:0px;
    display: block;
}
.leftBox{
    font-size:3px;
    color:#fff;
    line-height: 27px;
    padding-left:5px;
    float: left;
}
.rightBox{
    float: right;
    line-height: 27px;
    color:#fff;
    font-size:1px;
    display: -webkit-box;
}
.rightBox p:nth-child(2){
    margin-right:10px;
}

.leftBox span:nth-child(1){
    margin-right:3px;
}
.hide{
    display: none;
}
.divCard:hover .infoBox{
    display: block;
}
.photoMask-icon{
    width: 10px;
    height: 11px;
    fill: #fff;
    margin-right:3px;
}
.photoMask-icons{
    width: 17px;
    height: 25px;
    fill: #fff;
    float: left;
    font-weight:bolder;
    margin-right:3px;
}
.rightBox dl{
    display: -webkit-flex;
    display: flex;
}
.rightBox dl:nth-child(3) dt img{
    width:8px;
    height:10px;
    margin-right:3px;
}
.rightBox dl:nth-child(2) dt img{
    width:12px;
    height:8px;
    margin-right:5px;
    margin-bottom:1px;
}
.rightBox dl:nth-child(1) dt img{
    width:11px;
    height:9px;
    margin-right:4px;
}
.rightBox dl{
    margin-right:10px;
}
.sta{
    padding-top:35px;
}
.times{
    padding-top:35px;
}
.dateBox{
        width: 100%;
        line-height: 45px;
        /*background: #edf3ff;*/
        padding-left: 10px;
        font-size: 13px;
        //margin-top: 30px;
        margin-bottom: 25px;
        cursor: pointer;
    }
</style>

