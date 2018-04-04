/**
* Created by bk on 2017/09/12.
*/
<template>
    <div style="height:100%;width:100%;">
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
        </div>
        <!-- 右侧区域 -->
        <div v-if="isNOtData" style="margin-right: 240px;height: 100%">
            <no-data-page path="huodongbj"></no-data-page>
        </div>
        <!-- 内容区域 -->
        <div v-else class="lBox" style="margin-right: 240px;margin-left:20px;margin-top:30px;">
            <Row>

                <Col v-if="ind === 0" :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 20px;padding-right: 20px;cursor:pointer;" class="divCard"  v-for="(item,ind) in activeList">
                    <div style="border: 1px dashed #e1e1e1;background-color: #fbfbfb;position: relative;border-radius:4px;">
                        <div style="width: 100%;height: 0;padding-top: 57%;">
                            
                        </div>
                        <div @click="routeTo('huodongbj')" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;background-repeat: no-repeat;background-position: center;" :style="{backgroundImage:'url('+addPicture+')'}">

                        </div>
                        <p style="padding:0 10px;height:40px;line-height:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"></p>
                    </div>
                </Col>

                <Col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 30px;padding-right: 25px;" v-for="(item,ind) in activeList" class="divCard">
                    <Card dis-hover >
                        <div class="imgBox">
                            <div class="stateDiv" v-if="item.state == 3"><p class="p">已结束</p></div>
                            <div class="stateDivs" v-if="item.state == 2"><p class="p">进行中</p></div>
                            <div class="stateDivss" v-if="item.state == 1"><p class="p">未开始</p></div>
                            <div style="background-size: cover;background-position: center;padding-top: 57%;background-repeat: no-repeat;cursor:pointer;border-top-right-radius:4px;border-top-left-radius:4px;" v-bind:style="{backgroundImage:'url('+item.cover+')'}"  @click="ToHuoDonBianJi(item.id)"></div>
                            <!-- 遮罩 -->
                            <!-- <div class="mark" :class="{mark:true,hidemark: !item.selectFlag}" @click="deleteMe(item)"></div>
                            <div class="marks" :class="{marks:true,hidemarks: !item.selectFlag}" @click="ToHuoDonBianJi(item.id)"></div> -->
                            <div class="delBox"  :class="{delBox:true,hidemark: !item.selectFlag}" @click="deleteMe(item)">
                               <!--  <img src="../assets/images/delInco.png" alt=""> -->
                               <div class="deleteBox">
                                    <svg class="title-icons" aria-hidden="true" style="margin-left:6px;">
                                        <use xlink:href="#icon-guanbi-copy"></use>
                                    </svg>  
                               </div>
                            </div>
                            <div class="infoBox" :class="{infoBox:true,hide: !item.selectFlag}">
                                <div class="leftBox">
                                    <span>{{ new Date(parseInt(item.starttime)).toLocaleDateString() }}</span>
                                </div>
                                <div class="rightBox">
                                    <span><img src="../assets/images/eye.png" alt="">{{ item.views }}</span>
                                    <span><img src="../assets/images/peo.png" alt="">{{item.enrollment}}</span>
                                </div>
                            </div>
                        </div>
                        <p style="padding:0 10px;height:40px;line-height:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ item.title }}</p>

                    </Card>
                </Col>
            </Row>
            
        </div>
        <Modal v-model="modal2" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>是否确认删除？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="del()">删除</Button>
                </div>
            </Modal>
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
    import Modal from 'iview/src/components/modal'
    import noDataPage from '../components/noDataPage'


    export default {
        name: 'activityDraft',
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
                addPicture: addPic,
                modal2 : false,
                actid : "",
                isNOtData : false
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
            Slider,
            Modal,
            noDataPage
        },
        // activated : function() {
        //     vm  =  this;
        //     debugger;
        //     if(this.$lazy.data.csxMore && !this.$lazy.data.csx){
        //         this.page = 1;
        //         vm.activeList = [];
        //         //this.searchActiveList();
        //         this.$lazy.data.csxMore = false;
        //     }
        //     debugger
        //     if(this.$lazy.data.csx) {
        //         //vm.activeList = [];
        //         this.page = 1;
        //         vm.activeList = [];
        //         this.searchActiveList();
        //         this.$lazy.data.csx = false;
        //         this.$lazy.data.csxMore = true;
        //     }
        //     this.$emit("change",1); // 触发父组件的change方法
        //     window.addEventListener('scroll',this.scroll);
        // },
        deactivated: function () {
            window.removeEventListener('scroll',vm.scroll,false);
        },
        created: function(){
            vm = this;
            this.page = 1;
            vm.activeList = [];
            this.$emit("change",2); // 触发父组件的change方法
            vm.searchActiveList();
            window.addEventListener('scroll',vm.scroll);
        },
        methods:{
            searchActiveList () {
                var url = this.$store.state.serverHost + '/cmy/activity/cmyactivity/list';
                this.$http.get(url, {
                    params: {
                        communitytype : this.$store.state.userInfo.streetorcommunity,
                        communityid : this.$store.state.userInfo.streetorcommunityid,
                        title : vm.searchKey,
                        page : vm.page,
                        rows:16,
                        state : 0
                    }
                })
                .then(function (response) {
                    vm.activeList = vm.activeList.concat(response.data.rows);
                    if(response.data.rows.length > 0){
                        for(var i=0; i<vm.activeList.length; i++){
                            vm.$set( vm.activeList[i], 'selectFlag', false);
                        }
                        vm.allpage++;
                    }else{
                        vm.isNOtData = vm.activeList.length == 0 ? true : false;
                    }

                })
                .catch(function (error) {
                    vm.isNOtData = true;
                    console.log(error);
                })
            },
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
            ToHuoDonBianJi(id) {
                this.$router.push({
                    path:"huodongbj",
                    query:{
                        routeParams:id
                    }
                });
            },
            deleteMe(val){
                event.stopPropagation();
                this.modal2 = true;
                this.actid = val.id;
            },
            del(){
                var url = this.$store.state.serverHost + "cmy/activity/cmyactivity/del";
                this.$http.get(url, {
                       params: {
                        id : this.actid
                    }
                })
                .then(function (res) {
                    debugger;
                    if(res.data.isSucceed){
                        vm.modal2 = false;
                        vm.page = 1;
                        vm.activeList = [];
                        vm.searchActiveList();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            routeTo(name) {
                this.$router.push(name);
            },
            search: function(){
                vm.isTriggerScroll = false;
                vm.activeList = [];
                this.page = 1;
                vm.searchActiveList();
            },
            vSearchEnter: function () {
                event.target.blur();
            },
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
.deleteBox{
    width:24px;
    height:24px;
    background:rgba(0,0,0,0.5);
    border-radius:50%;
    line-height: 21px;
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
.title-icons{
    width: 12px;
    height: 12px;
    vertical-align: middle;
    cursor: pointer;
    fill: #fff;
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

.imgBox img{
    width:100%;
    height:100%;
    position: relative;
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
.list-type-card li{
    padding-left:18px;
}
.timeBox{
    font-size:5px;
    position: absolute;
    bottom:9px;
    right:15px;
    color:#999999;
}
.mark{
    background-image: url(../assets/images/delete.png);
    border-radius:50%;
    position: absolute;
    top:25%;
    right:0;
    bottom:0;
    left:15%;
    background-size: cover;background-position: center;
    width:23%;
    height:30%;
    display: block;
    cursor: pointer;
}
.hidemark{
    display: none;
}
.divCard:hover .mark{
    display: block;
}
/*.marks{
    background-image: url(../assets/images/search.png);
    border-radius:50%;
    position: absolute;
    top:25%;
    right:0;
    bottom:0;
    right:15%;
    background-size: cover;background-position: center;
    width:23%;
    height:30%;
    display: block;
    cursor: pointer;
}*/
.hidemarks{
    display: none;
}
.divCard:hover .delBox{
    display: block;
}
.delBox{
    position: absolute;
    right:10px;
    top:10px;
    cursor: pointer;
}
</style>

