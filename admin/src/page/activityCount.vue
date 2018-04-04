/**
* Created by bk on 2018/1/8.
*/
<template>
    <LazyLayout orient="v" style="height: 100%">
        <LazyTopbar :data="topBar"  style="position:fixed;top:0;right:0;z-index:1;padding-left: 220px"></LazyTopbar>
        <LazyBox style="padding: 20px">
            <LazyLayout orient="v" style="height: 100%">
                <div class="activityStateCount">
                    <div class="cutLine"></div>
                    <Row :gutter="20" class-name="row">
                        <Col span="12" class-name="col">
                            <Row :gutter="20" class-name="row">
                                <Col span="12" class-name="col">
                                    <div class="activityTotal">
                                        <div class="activityIcon">
                                            <img src="../assets/images/activityCount.png" alt=""/>
                                        </div>
                                        <div class="activityComplete brightColor">
                                            <div class="activityNum">{{activityCount[0]+activityCount[1]+activityCount[2]}} <span style="font-size: 12px">个</span></div>
                                            <div style="font-size: 14px;margin-left: 3px;">活动总次数</div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span="12" class-name="col">
                                    <div class="activityStateNum">
                                        <div class="activityComplete">
                                            <div class="activityNum">{{activityCount[2]}} <span style="font-size: 12px">个</span></div>
                                            <div style="font-size: 14px;margin-left: 3px;">已完成活动</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span="12" class-name="col">
                            <div class="activityStatus">
                                <div class="cutLine"></div>
                                <Row :gutter="20" class-name="row">
                                    <Col span="12" class-name="col">
                                        <div class="activityStateNum">
                                            <div class="activityComplete">
                                                <div class="activityNum">{{activityCount[1]}} <span style="font-size: 12px">个</span></div>
                                                <div style="font-size: 14px;margin-left: 3px;">进行中活动</div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span="12" class-name="col">
                                        <div class="activityStateNum">
                                            <div class="activityComplete">
                                                <div class="activityNum">{{activityCount[0]}} <span style="font-size: 12px">个</span></div>
                                                <div style="font-size: 14px;margin-left: 3px;">未开始活动</div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div class="activityCharts">
                    <Row :gutter="30" class-name="row">
                        <Col span="12" class-name="col">
                            <div class="charts">
                                <LazyLayout orient="v" style="height: 100%">
                                    <div class="charts-title">
                                        <p>1~12个月参与活动人数趋势</p>
                                        <Date-picker type="year" :open="openDate" @on-change="handleChangeTrendDate" placement="bottom-end" style="position: absolute;right: 15px;top: 20px">
                                            <div class="dateCustom" @click="handleClickTrendDate">
                                                <template>{{ trendDate }}</template>
                                                <Icon type="chevron-down" color="#cbcbcb"></Icon>
                                            </div>
                                        </Date-picker>
                                    </div>
                                    <LazyBox>
                                        <div id="charts-trendData" class="charts-data"></div>
                                    </LazyBox>
                                </LazyLayout>
                            </div>
                        </Col>
                        <Col span="12" class-name="col">
                            <div class="charts">
                                <LazyLayout orient="v" style="height: 100%">
                                    <div class="charts-title">
                                        <p>1~12个月活动数量统计</p>
                                        <Date-picker type="year" :open="openNumDate" @on-change="handleChangeNumDate" placement="bottom-end" style="position: absolute;right: 15px;top: 20px">
                                            <div class="dateCustom" @click="handleClickNumDate">
                                                <template>{{ numDate }}</template>
                                                <Icon type="chevron-down" color="#cbcbcb"></Icon>
                                            </div>
                                        </Date-picker>
                                    </div>
                                    <LazyBox>
                                        <div id="charts-activityNum" class="charts-data"></div>
                                    </LazyBox>
                                </LazyLayout>
                            </div>
                        </Col>
                    </Row>
                </div>
                <LazyBox>
                    <div class="ranking">
                        <Row :gutter="30" class-name="row">
                            <Col span="8" class-name="col">
                                <div class="rankingType">
                                    <LazyLayout orient="v" style="height: 100%">
                                        <div class="ranking-title">
                                            <p>活动项目排名</p>
                                        </div>
                                        <LazyBox>
                                            <div class="ranking-content">
                                                <div class="rankingItem" v-for="(item,key) in activityRanking">
                                                    <div class="ranking-num-polygon">
                                                        <div class="ranking-num">{{key + 1}}</div>
                                                    </div>
                                                    <div class="ranking-Img">
                                                        <img v-if="item.cover" :src="item.cover" alt=""/>
                                                        <img v-else src="../assets/images/detail.png" alt=""/>
                                                    </div>
                                                    <div class="rankingItemInfo">
                                                        <div class="rankingItemInfo-title">{{item.title}}</div>
                                                        <div class="rankingItemInfo-num"><span>{{item.num}}</span>人</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </LazyBox>
                                    </LazyLayout>
                                </div>
                            </Col>
                            <Col span="8" class-name="col">
                                <div class="rankingType">
                                    <LazyLayout orient="v" style="height: 100%">
                                        <div class="ranking-title">
                                            <p>参与活动最多的市民排名</p>
                                        </div>
                                        <LazyBox>
                                            <div class="ranking-content">
                                                <div class="rankingItem" v-for="(people,index) in mostActivePeople">
                                                    <div class="ranking-num-polygon ranking-polygonColor">
                                                        <div class="ranking-num">{{index + 1}}</div>
                                                    </div>
                                                    <div class="ranking-Img rankingPeople-Img">
                                                        <img v-if="people.headpicture" :src="people.headpicture" alt=""/>
                                                        <img v-else src="../assets/images/moren.png" alt=""/>
                                                    </div>
                                                    <div class="rankingItemInfo">
                                                        <div v-if="people.realname" class="rankingItemInfo-title">{{people.realname}}</div>
                                                        <div v-else-if="people.username" class="rankingItemInfo-title">{{people.username}}</div>
                                                        <div v-else="people.username" class="rankingItemInfo-title">某某某</div>
                                                        <div class="rankingItemInfo-num ranking-otherFontColor"><span>{{people.num}}</span>次</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </LazyBox>
                                    </LazyLayout>
                                </div>
                            </Col>
                            <Col span="8" class-name="col">
                                <div class="rankingType">
                                    <LazyLayout orient="v" style="height: 100%">
                                        <div class="ranking-title">
                                            <p>评论最多的活动排名</p>
                                        </div>
                                        <LazyBox>
                                            <div class="ranking-content">
                                                <div class="rankingItem rankingItem-activityType" v-for="(comment,index) in commentRank">
                                                    <div class="ranking-num-polygon">
                                                        <div class="ranking-num">{{index + 1}}</div>
                                                    </div>
                                                    <div class="ranking-activityType">{{comment.title}}</div>
                                                    <div class="rankingItemInfo-num"><span>{{comment.num}}</span>条</div>
                                                </div>
                                            </div>
                                        </LazyBox>
                                    </LazyLayout>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </LazyBox>
            </LazyLayout>
        </LazyBox>
    </LazyLayout>
</template>
<script type="es6">
    var vm;
    import {Row,Col} from 'iview/src/components/grid'
    import Dropdown from 'iview/src/components/dropdown'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
    import DatePicker from 'iview/src/components/date-picker'
    import Icon from 'iview/src/components/icon'

    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入折线图组件
    require('echarts/lib/chart/line');
    // 引入柱状图组件
    require('echarts/lib/chart/bar');
    //引入markPoint组件
    require("echarts/lib/component/markPoint");
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    export default {
        name: 'activityCount',
        components: {
            Row,
            Col,
            Dropdown,
            DropdownMenu,
            DropdownItem,
            DatePicker,
            Icon
        },
        data () {
            return {
                topBar: {
                    title: '活动统计'
                },
                activityCount: [0,0,0,0],
                trendDate: '',
                numDate: '',
                openDate: false,
                openNumDate: false,
                trendData: [],
                numData: [],
                activityRanking: [],
                mostActivePeople: [],
                commentRank: []
            }
        },
        created () {
            vm = this;
            this.$emit("change",0); // 触发父组件的change方法
            this.trendDate = new Date().getFullYear();
            this.numDate = new Date().getFullYear();
            this.getActivityCount();
            for(var i = 0; i < 12; i++){
                this.numData[i] = 0;
                this.trendData[i] = 0;
            }
            this.getPeopleTrend();
            this.getActivityNumByYear();
            this.getActivityRanking();
            this.getMostActivePeople();
            this.getCommentRank();
        },
        mounted () {
            //this.drawLine();
            //debugger;
            //this.drawBar();
        },
        methods: {
            handleClickTrendDate () {
                this.openDate = !this.openDate;
            },
            handleClickNumDate () {
                this.openNumDate = !this.openNumDate;
            },
            handleChangeTrendDate (date) {
                for(var i = 0; i < 12; i++){
                    this.trendData[i] = 0;
                }
                this.trendDate = date;
                this.openDate = false;
                this.getPeopleTrend();
            },
            handleChangeNumDate (date) {
                for(var i = 0; i < 12; i++){
                    this.numData[i] = 0;
                }
                this.numDate = date;
                this.openNumDate = false;
                this.getActivityNumByYear();
            },
            getActivityCount () {
                var url = this.$store.state.serverHost + 'cmy/activity/cmyactivity/getStateNum';
                this.$http.get(url, {
                    params: {
                        initid: this.$store.state.communityDetail.initid,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            var temp = response.data.rows;
                            for (var  i = 0; i < temp.length; i++){
                                vm.$set(vm.activityCount,temp[i].state - 1,temp[i].num);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getPeopleTrend () {
                var url = this.$store.state.serverHost + 'cmy/activity/cmyactivity/getUserSignMonthNum';
                this.$http.get(url, {
                    params: {
                        initid: this.$store.state.communityDetail.initid,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        activitytime: this.trendDate
                    }
                })
                        .then(function (response) {
                            var temp = response.data.rows;
                            for(var i = 0; i < temp.length; i++){
                                var index = temp[i].activitytime.split('-')[1] - 1;
                                vm.trendData[index] = temp[i].num;
                            }
                            vm.drawLine(vm.trendData);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getActivityNumByYear () {
                var url = this.$store.state.serverHost + 'cmy/activity/cmyactivity/getActivityMonthNum';
                this.$http.get(url, {
                    params: {
                        initid: this.$store.state.communityDetail.initid,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        activitytime: this.numDate
                    }
                })
                        .then(function (response) {
                            var temp = response.data.rows;
                            for(var i = 0; i < temp.length; i++){
                                var index = temp[i].activitytime.split('-')[1] - 1;
                                vm.numData[index] = temp[i].num;
                            }
                            vm.drawBar(vm.numData);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            drawLine (data) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('charts-trendData'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data:[]
                    },
                    toolbox: {
                        feature: {

                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#e1e1e1'
                                }
                            },
                        axisLabel: {
                            color: '#333'
                        },
                            data : ['1','2','3','4','5','6','7','8','9','10','11','12']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            offset: 5
                        }
                    ],
                    series : [
                        {
                            name:'peopleTrend',
                            type:'line',
                            smooth: true,
                            symbolSize: 0,
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: 'rgb(253, 190, 205)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(255, 255, 255)'
                                    }])
                                }
                            },
                            data: data
                        }
                    ]
                });
            },
            drawBar (data) {
                //var data = [2.0, 4.9, 7.0, 0, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3];
                var markPointData = [];
                for(var i = 0; i < data.length; i++) {
                    //if(data[i] != 0){
                        markPointData.push({coord: [i,data[i]]});
                    //}
                }
                // 基于准备好的dom，初始化echarts实例
                let myChart2 = echarts.init(document.getElementById('charts-activityNum'));
                // 绘制图表
                myChart2.setOption({
                    title : {
                        text: '',
                        subtext: ''
                    },
                    itemStyle: {
                        color: '#72d3fb'
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#e1e1e1'
                                }
                            },
                            axisLabel: {
                                color: '#333'
                            },
                            data : ['1','2','3','4','5','6','7','8','9','10','11','12']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            offset: 5
                        }
                    ],
                    series : [
                        {
                            name:'activityNum',
                            type:'bar',
                            barWidth: '6',
                            data: data,
                            //itemStyle: {
                            //    normal: {
                            //        barBorderRadius: [12,12,0,0]
                            //    }
                            //}
                            markPoint : {
                                symbol: 'circle',
                                symbolSize: 12,
                                symbolOffset: [0,'-42%'],
                                label: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data : markPointData
                            }
                        }
                    ]
                });
            },
            getActivityRanking () {
                var url = this.$store.state.serverHost + 'cmy/activity/cmyactivity/getActivitySignRank';
                this.$http.get(url, {
                    params: {
                        initid: this.$store.state.communityDetail.initid,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            vm.activityRanking = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getMostActivePeople () {
                var url = this.$store.state.serverHost + 'cmy/activity/cmyactivitysign/getUserSignNum';
                this.$http.get(url, {
                    params: {
                        initid: this.$store.state.communityDetail.initid
                    }
                })
                        .then(function (response) {
                            vm.mostActivePeople = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getCommentRank () {
                var url = this.$store.state.serverHost + 'cmy/activity/cmyactivity/getActivityQaaRank';
                this.$http.get(url, {
                    params: {
                        initid: this.$store.state.communityDetail.initid,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.commentRank = response.data.rows;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
        }
    }

</script>
<style scoped>
    .row {
        height: 100%;
    }
    .col {
        height: 100%;
    }
    .activityStateCount,
    .activityStatus {
        width: 100%;
        height: 140px;
        background-color: #fff;
        position: relative;
    }
    .cutLine {
        width: 0;
        height: 100px;
        border-left: 1px solid #e5e5e5;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .activityTotal,
    .activityStateNum {
        height: 100%;
        display: flex;
        align-items: center;
    }
    .activityStateNum {
        justify-content: center;
    }
    .activityIcon {
        width: 100px;
        height: 100px;
        background-color: #b1cf66;
        border-radius: 50%;
        /*position: absolute;*/
        /*top: 50%;*/
        /*transform: translate(0,-50%);*/
        /*left: 30px;*/
        /*display: inline-block;*/
        margin-left: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .activityComplete {
        /*display: inline-block;*/
        /*position: absolute;*/
        margin-left: 50px;
    }
    .brightColor {
        color: #b1cf66;
    }
    .activityNum {
        font-size: 20px;
    }
    .activityCharts {
        /*height: 420px;*/
        /*height: 100%;*/
        height: 370px;
        padding-top: 30px;
        overflow: hidden;
    }
    .charts {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
    .charts-title {
        padding-left: 20px;
        padding-top: 20px;
        font-size: 14px;
        color: #333333;
        font-weight: 600;
        position: relative;
    }
    .dateCustom {
        width: 80px;
        height: 30px;
        background-color: #fff;
        border: 1px solid #cbcbcb;
        line-height: 30px;
        font-weight: 500;
        text-align: center;
        cursor: pointer;
    }
    .ranking {
        /*height: 350px;*/
        height: 100%;
        padding-top: 30px;
    }
    .rankingType {
        height: 100%;
        background-color: #fff;
    }
    .ranking-title {
        padding-left: 20px;
        padding-top: 20px;
        font-size: 14px;
        color: #333333;
        font-weight: 600;
    }
    .ranking-content {
        height: 100%;
        padding-top: 20px;
        overflow: hidden;
        overflow-y: auto;
    }
    .ranking-content::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .ranking-content::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .ranking-content::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .rankingItem {
        padding: 0 26px 20px 26px;
        display: flex;
        align-items: center;
        height: 90px;
    }
    .rankingItem-activityType {
        height: 50px;
    }
    .ranking-num-polygon {
        width: 16px;
        height: 10px;
        display: inline-block;
        background-color: #54cdb2;
        position: relative;
        color: #fff;
    }
    .ranking-num-polygon::before {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: -5px;
        border-bottom: 5px solid #54cdb2;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
    }
    .ranking-num-polygon::after {
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: 10px;
        border-left: 8px solid transparent;
        border-top: 5px solid #54cdb2;
        border-right: 8px solid transparent;
    }
    .ranking-num {
        width: 16px;
        height: 20px;
        position: absolute;
        top: -5px;
        text-align: center;
    }
    .ranking-Img {
        display: inline-block;
        margin-left: 20px;
        max-width: 120px;
    }
    .ranking-Img > img {
        max-width: 100%;
    }
    .rankingPeople-Img > img {
        max-width: 42px;
        width: 100%;
        border-radius: 50%;
    }
    .rankingItemInfo {
        height: 100%;
        flex: 1;
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .rankingItemInfo-title {
        color: #8b8b8b;
    }
    .rankingItemInfo-num {
        color: #54cdb2;
        font-size: 12px;
    }
    .rankingItemInfo-num span {
        font-size: 18px;
    }
    .ranking-polygonColor {
        background-color: #40b0ff;
    }
    .ranking-polygonColor::before {
        border-bottom: 5px solid #40b0ff;
    }
    .ranking-polygonColor::after {
        border-top: 5px solid #40b0ff;
    }
    .ranking-otherFontColor {
        color: #40b0ff;;
    }
    .ranking-activityType {
        flex: 1;
        text-align: center;
        color: #8b8b8b;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        padding-right: 10px;
        padding-left: 10px;
    }
    .charts-data {
        /*padding-right: 30px;*/
        height: 100%;
        overflow: hidden;
    }
</style>
 