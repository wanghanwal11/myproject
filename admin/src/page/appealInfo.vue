/**
* Created by bk on 2017/8/15.
*/
<template>
    <LazyLayout orient="v" style="overflow-x:hidden;">

        <!-- topBar -->
        <div style="height:45px;">
            <LazyTopbar :data="json"></LazyTopbar>
        </div>
        <!-- topBar end-->
        <LazyBox>
            <LazyLayout>
                <LazyBox class="tabs">
                    <Tabs class="box box_v" style=" height:100%;" :value="'t'+index" @on-click="clickEvent">
                        <Tab-pane name="t1" label="待处理" class="box-f1 ">
                                <div class="myTabs" @scroll="onScroll($event)">
                                   <!-- 诉求列表 -->
                                    <div class="lBox">
                                        <div  v-for="i in eventList" v-if="i.eventstate == 1">
                                            <div @click="daichuli(i.id)">
                                                <LazyLayout dis-hover align="center" style="padding-left: 20px;min-width:950px;background:#fff;margin-bottom:10px;border:1px solid #e1e1e1;box-sizing:border-box;padding:6px;">
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo" style="min-width: 155px;border-right: 1px solid #eeeeee;">
                                                            <span style="cursor: pointer;margin-left:16px;">事件编号  {{ i.eventNumber }}</span>
                                                        </div>
                                                    </LazyBox>
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo">
                                                            <span><img src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%"></span>
                                                            <span style="word-break: break-word;white-space: pre-wrap;padding-left:8px;">{{ i.username }}</span>
                                                        </div>
                                                    </LazyBox>
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo" style="width:187px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer">
                                                            <span>{{ i.content }}</span>
                                                        </div>
                                                    </LazyBox>
                                                    <div style="min-width:220px;">
                                                        <div class="orderInfo" style="padding:0 20px;">
                                                            <span>{{ i.def1 }}</span>
                                                        </div>
                                                    </div>
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo" style="padding-left:20px;">
                                                        </div>
                                                    </LazyBox>
                                                    <LazyBox auto="false">
                                                        <div class="orderState" style="color: #fff;background:#ffa800;margin-left:120px;" v-if="i.eventstate == 1">待处理</div>
                                                        <div class="orderInfo" style="margin-left:8px;min-width:10px;">
                                                            <img src="../assets/images/right.png" alt="" style="margin-top:2px;">
                                                        </div>
                                                    </LazyBox>
                                                </LazyLayout>
                                            </div>
                                        </div>
                                    </div>
                                <!-- 诉求列表 -->
                                </div>
                        </Tab-pane>
                        <Tab-pane name="t2" label="已上报" class="box-f1">
                            <!-- 诉求列表 -->
                            <div class="myTabs" @scroll="onScroll($event)">
                                <div class="lBox">
                                    <div  v-for="i in eventList" v-if="i.eventstate == 2">
                                        <div @click="shangbao(i.id)">
                                            <LazyLayout dis-hover align="center" style="padding-left: 20px;min-width:950px;background:#fff;margin-bottom:10px;border:1px solid #e1e1e1;box-sizing:border-box;padding:6px;">
                                                <LazyBox auto="false">
                                                    <div class="orderInfo" style="min-width: 155px;border-right: 1px solid #eeeeee;">
                                                        <span style="cursor: pointer;margin-left:16px;">事件编号  {{ i.eventNumber }}</span>
                                                    </div>
                                                </LazyBox>
                                                <LazyBox auto="false">
                                                    <div class="orderInfo">
                                                        <span><img src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%"></span>
                                                        <span style="word-break: break-word;white-space: pre-wrap;padding-left:8px;">{{ i.username }}</span>
                                                    </div>
                                                </LazyBox>
                                                <LazyBox auto="false">
                                                    <div class="orderInfo" style="width:187px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer">
                                                        <span>{{ i.content }}</span>
                                                    </div>
                                                </LazyBox>
                                                <div style="min-width:220px">
                                                    <div class="orderInfo" style="padding:0 20px;">
                                                        <span>{{ i.def1 }}</span>
                                                    </div>
                                                </div>
                                                <LazyBox auto="false">
                                                    <div class="orderInfo" style="padding-left:20px;">
                                                       <!--  <span>{{ i.tag }}</span> -->
                                                    </div>
                                                </LazyBox>
                                                <LazyBox auto="false">
                                                    <div class="orderState" style="color: #fff;background:#ffa800;margin-left:120px;" v-if="i.eventstate == 2">已上报</div>
                                                    <div class="orderInfo" style="margin-left:8px;min-width:10px;">
                                                        <img src="../assets/images/right.png" alt="" style="margin-top:2px;">
                                                    </div>
                                                </LazyBox>
                                            </LazyLayout>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <!-- 诉求列表 -->
                        </Tab-pane>
                        <Tab-pane name="t3" label="已转办" class="box-f1">
                            <div class="myTabs" @scroll="onScroll($event)">
                            <!-- 诉求列表 -->
                                <div class="lBox">
                                    <div  v-for="i in eventList" v-if="i.eventstate == 3">
                                        <div  @click="zhuanban(i.id)">
                                            <LazyLayout dis-hover align="center" style="padding-left: 20px;min-width:950px;background:#fff;margin-bottom:10px;border:1px solid #e1e1e1;box-sizing:border-box;padding:6px;">
                                                <LazyBox auto="false">
                                                    <div class="orderInfo" style="min-width: 155px;border-right: 1px solid #eeeeee;">
                                                        <span style="cursor: pointer;margin-left:16px;">事件编号  {{ i.eventNumber }}</span>
                                                    </div>
                                                </LazyBox>
                                                <LazyBox auto="false">
                                                    <div class="orderInfo">
                                                        <span><img src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%"></span>
                                                        <span style="word-break: break-word;white-space: pre-wrap;padding-left:8px;">{{ i.username }}</span>
                                                    </div>
                                                </LazyBox>
                                                <LazyBox auto="false">
                                                    <div class="orderInfo" style="width:187px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer">
                                                        <span>{{ i.content }}</span>
                                                    </div>
                                                </LazyBox>
                                                <div style="min-width:220px;">
                                                    <div class="orderInfo" style="padding:0 20px;;">
                                                        <span>转办： {{ i.def1 }}</span>
                                                    </div>
                                                </div>
                                                <LazyBox auto="false">
                                                    <div class="orderInfo" style="padding-left:20px;">
                                                       <!--  <span>{{ i.tag }}</span> -->
                                                    </div>
                                                </LazyBox>
                                                <LazyBox auto="false">
                                                   <div class="orderState" style="color: #fff;background:#ffa800;margin-left:120px;" @click="routeTo('appealCompletion')" v-if="i.eventstate == 3">已转办</div>
                                                    <div class="orderInfo" style="margin-left:8px;min-width:10px;">
                                                        <img src="../assets/images/right.png" alt="" style="margin-top:2px;">
                                                    </div>
                                                </LazyBox>
                                            </LazyLayout>
                                        </div>
                                    </div>
                                </div>
                                <!-- 诉求列表 -->
                            </div>
                        </Tab-pane>
                        <Tab-pane name="t4" label="已办结" class="box-f1">
                            <!-- 诉求列表 -->
                                <div class="myTabs" @scroll="onScroll($event)">
                                    <div class="lBox">
                                        <div  v-for="i in eventList" v-if="i.eventstate == 4">
                                            <div  @click="banjie(i)">
                                                <LazyLayout dis-hover align="center" style="padding-left: 20px;min-width:950px;background:#fff;margin-bottom:10px;border:1px solid #e1e1e1;box-sizing:border-box;padding:6px;">
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo" style="min-width: 155px;border-right: 1px solid #eeeeee;">
                                                            <span style="cursor: pointer;margin-left:16px;">事件编号  {{ i.eventNumber }}</span>
                                                        </div>
                                                    </LazyBox>
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo">
                                                            <span><img src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%"></span>
                                                            <span style="word-break: break-word;white-space: pre-wrap;padding-left:8px;">{{ i.username }}</span>
                                                        </div>
                                                    </LazyBox>
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo" style="width:187px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer">
                                                            <span>{{ i.content }}</span>
                                                        </div>
                                                    </LazyBox>
                                                    <div style="min-width:220px;">
                                                        <div class="orderInfo" style="padding:0 20px;">
                                                            <!-- <span>办结： 2017-08-10 09:15:15</span>
                                                            </br> -->
                                                            <span>{{ i.def1 }}</span>
                                                        </div>
                                                    </div>
                                                    <LazyBox auto="false">
                                                        <div class="orderInfo" style="padding-left:20px;">
                                                            <!-- <span>{{ i.tag }}</span> -->
                                                        </div>
                                                    </LazyBox>
                                                    <LazyBox auto="false">
                                                       <div class="orderState" style="color: #fff;background:#0fc576;margin-left:120px;" v-if="i.eventstate == 4">已办结</div>
                                                        <div class="orderInfo" style="margin-left:8px;min-width:10px;">
                                                            <img src="../assets/images/right.png" alt="" style="margin-top:2px;">
                                                        </div>
                                                    </LazyBox>
                                                </LazyLayout>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- 诉求列表 -->
                        </Tab-pane>
                    </Tabs>
                </LazyBox>
                <div class="branch">
                    <div class="reset" @click="rest">
                            <svg class="title-icon" aria-hidden="true">
                                <use xlink:href="#icon-shaixuan"></use>
                            </svg>
                            筛选
                            <span>重置</span>
                    </div>
                    <p class="searchType">事件编号</p>
                    <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                        <div>
                            <Input v-model="eventNumber" placeholder="请输入..." ></Input>
                        </div>
                    </Card>
                    <p class="searchType">人名</p>
                    <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                        <div>
                            <Input v-model="username" placeholder="请输入..." ></Input>
                        </div>
                    </Card>
                    <p class="searchType">内容</p>
                    <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                        <div>
                            <Input placeholder="请输入..." v-model="content" type="textarea" style="textarea"></Input>
                        </div>
                    </Card>
                    <p class="searchType">时间</p>
                    <Date-picker type="daterange" placement="bottom-end" :value="timeValue" @on-change="setTimeValue" placeholder="选择日期" style="width: 200px;margin: 0 0 15px 20px;"></Date-picker>
                    <Button type="primary" style="width:200px;margin-left:20px;margin-top:30px;" @click="searchValue">搜索</Button>
                </div>
            </LazyLayout>
        </LazyBox>
    </LazyLayout>
</template>


<script type="es6">
    var vm;
    import Input from 'iview/src/components/input'
    import Button from 'iview/src/components/button'
    import Checkbox from 'iview/src/components/checkbox'
    import Tree from 'iview/src/components/tree'
    import DatePicker from 'iview/src/components/date-picker'
    import Card from 'iview/src/components/card'
    import CheckboxGroup from 'iview/src/components/checkbox/checkbox-group'
    import Tabs from 'iview/src/components/tabs'
    import TabPane from 'iview/src/components/tabs/pane'

    export default {

        data () {
            return {
                json:{
                    title:"诉求",
                    right:[
                            {
                              type : 'Button',
                              size: 'small',
                              label : ' 　+ 诉求须知　',
                              onclick : function() {
                                vm.$router.push('noticeofappeal');
                             }
                        },
                    ]
                },
                eventNum:"",
                name:"",
                eventList:[],
                allpage:1,  
                index: 1,
                page:1,
                id:0,
                username:"",
                eventNumber:"",
                content:"",
                date:"",
                timeValue:[],
                reportTime:""
            }
        },

        created:function(){
            vm = this;
            this.$Loading.finish();

            //查看当前状态的标签详情后点击返回留在当前状态列表页
            if(this.$router.history.current.query.index) {
                this.index = this.$router.history.current.query.index;
                this.$lazy.data.index = null;
            }else if(this.$lazy.data.index){
                this.index = this.$lazy.data.index;
            }
            
            this.searchEventList();
        },
        components:{
           Input,
           Checkbox,
           Tree,
           DatePicker,
           Card,
           CheckboxGroup,
           Tabs,
           TabPane,
           Button
        },

        methods:{
            clickEvent(name){
                this.eventList = [];
                this.page = 1;
                this.index = name.replace('t','');
                this.$lazy.data.index = this.index;
                this.clear();
                this.searchEventList();
            },

            searchEventList(){
                var url = this.$store.state.serverHost + this.$lazy.url.weixinevent;
 
                this.$get(url, {
                    initid: vm.$store.state.communityDetail.initid,
                    type: 'PC',
                    rows:15,
                    page: this.page,
                    eventstate: this.index,
                    eventNumber:this.eventNumber,
                    username:this.username,
                    content:this.content,
                    begintime: this.timeValue[0],
                    endtime: this.timeValue[1]
                },function(data){
                    vm.page++;
                    vm.eventList = vm.eventList.concat(data.rows);
                });
            },

            routeTo(name) {
                event.stopPropagation();
                this.$router.push(name);
            },

            //待处理
            daichuli(id) {
                this.$router.push({
                    path:"AppealManagement",
                    query:{
                        routeParams:id
                    }
                });
            },

            //已上报
            shangbao(id){
                 this.$router.push({
                    path:"AppealManagementTwo",
                    query:{
                        routeParams:id,
                        flag:true
                    }
                });
            },

            //已转办
            zhuanban(id){
                 this.$router.push({
                    path:"AppealManagementTwo",
                    query:{
                        routeParams:id,
                        zhuanban:true,
                        flag:true
                    }
                });
            },

            //已办结
            banjie(i){
                var id = i.id;
                var reportTime = i.reporttime;
                if(reportTime == ""){
                    this.$router.push({
                        path:"appealCompletion",
                        query:{
                            routeParams:id
                        }
                    });
                }else if(reportTime != ""){
                    this.$router.push({
                        path:"appealManagementTwo",
                        query:{
                            routeParams:id,
                            banjie:true,
                            zhuanban:true,
                            flag:true
                        }
                    });
                }

            },

            onScroll() {
                var offsetHeight = event.target.offsetHeight,
                    scrollHeight = event.target.scrollHeight,
                    scrollTop = event.target.scrollTop,
                    scrollBottom = offsetHeight + scrollTop;
                if(scrollBottom == scrollHeight){
                    vm.searchEventList();
                }

            },

            searchValue () {
                this.eventList = [];
                this.page = 1;
                this.searchEventList();
            },

            clear(){
                this.eventNumber = "",
                this.username = "",
                this.content = "",
                this.timeValue = [];
            },
            setTimeValue (data) {
                this.timeValue = data;
            },

            rest(){
                this.clear();
            }

        }

    }
</script>


<style scoped>

    .myTabs{
        cursor:pointer;
        width:100%;
        height:100%;
        overflow:auto;
    }

    .myTabs::-webkit-scrollbar{
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .myTabs::-webkit-scrollbar-track{
        border-radius: 10px;
        background-color: #fff;
    }
    .myTabs::-webkit-scrollbar-thumb{
        height: 20px;
        border-radius: 10px;
        background: #ccc
    }

    .LazyLayout{
        width:100%;
        height:100%;
        box-sizing:border-box;
    }
    .branch{
        width: 240px;
        min-height: 100%;
        padding-bottom: 20px;
        border-left: 1px solid #ddd;
        background: #fff;
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
    .searchType{
        padding: 15px;
        font-size: 14px;
        font-weight:bolder;
    }
    .orderState {
        display: inline-block;
        height: 18px;
        min-width:40px;
        line-height: 18px;
        margin: 2px 4px 2px 0;
        /*border: 1px solid #e9eaec;*/
        border-radius: 3px;
        background: #f7f7f7;
        text-align:center;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
    }
    .orderInfo {
       display: inline-block;
    }

    .tabs{
        padding:10px 20px;
        box-sizing:border-box;
    }

</style>