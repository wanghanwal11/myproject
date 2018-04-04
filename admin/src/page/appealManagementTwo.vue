/**
* Created by bk on 2017/8/15.
*/
<template>
    <div class="appealDetails">
        <div style="height:45px;">
            <LazyTopbar :data="json" style="position:fixed;top:45px;z-index:1" ></LazyTopbar>
        </div>
        <my-info  @getData="getData"></my-info>
        <LazyLayout orient="v" class="wraps">

            <!-- 步骤条 时间轴 -->
            <div class="timeAxis">
                <div class="progress">
                    <LazyLayout align="center" justify="between" style="margin:auto; width: 620px; height:100%;">

                        <div class="icondiv a1">
                            <div>待处理</br></div>
                        </div>

                        <div class="linediv line1"></div>
                        <template v-if="flag">
                            <div class="icondiv b1">
                                <div>已上报</br></div>
                            </div>
                            <div class="linediv line1"></div>
                        </template>
                         <template v-else>
                            <div class="icondiv b2">
                                <div>已上报</br></div>
                            </div>
                            <div class="linediv line2"></div>
                        </template>
                        
                        <template v-if="zhuanban && flag">
                            <div class="icondiv c1">
                                <div>已转办</br></div>
                            </div>
                            <div class="linediv line1"></div>
                        </template>
                        <template v-else>
                            <div class="icondiv c2">
                                <div>已转办</br></div>
                            </div>
                            <div class="linediv line2"></div>
                        </template>

                        <template v-if="banjie &&flag &&zhuanban">
                            <div class="icondiv d1">
                                <div>已办结</br></div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="icondiv d2">
                                <div>已办结</br></div>
                            </div>
                        </template>
                        
                    </LazyLayout>
                </div>

                <Timeline style="margin:30px 0 0 40px;">
                    <Timeline-item v-for="i in timeAxis">
                        <p style="font-size:10px;margin-bottom:6px;">{{ new Date(parseInt(i.starttime) * 1).toLocaleString().replace(/:\d{1,2}$/,' ') }}</p> 
                            {{ i.orgName + changeCn(i.stateCode) + " " + i.statename + " " + i.opinion }}
                    </Timeline-item>
                </TimeLine> 
            </div>
            <!-- 步骤条 时间轴 -->

        </LazyLayout>
    </div>
</template>


<script>
    var vm;
    import myInfo from '../components/info'
    import Timeline from 'iview/src/components/timeline'
    import Steps from 'iview/src/components/steps'
    import Step from 'iview/src/components/steps/step'
    import TimelineItem from 'iview/src/components/timeline/timeline-item'

    export default {

        data () {
            return {
                json:{
                    title:"诉求",
                    left:[{
                        type : 'Button',
                        svg : '#icon-fanhui',
                        buttontype : 'text',
                        onclick : function() {
                            vm.$router.go(-1)
                        }
                    }]
                },
                code:"",
                date:"",
                timeAxis:"",
                flag:"",
                zhaunban:"",
                banjie:"",
                state:""
            }
        },
         created:function(){

            vm = this;
            this.flag = this.$router.history.current.query.flag;
            this.zhuanban = this.$router.history.current.query.zhuanban;
            this.banjie = this.$router.history.current.query.banjie;

        },

        components:{
            myInfo,
            Timeline,
            TimelineItem,
            Steps,
            Step
        },

        methods:{
            getData(t){
                this.code = t[1];
                var url = this.$store.state.serverHost + this.$lazy.url.weixineventprocess;
                this.$get(url, {
                       initid: vm.$store.state.communityDetail.initid,
                       code: vm.code
                    },function(data){
                        debugger
                        console.log(data.rows)
                        for(var i in data.rows){
                            var strs = data.rows[i].process;
                            vm.timeAxis = JSON.parse(strs);
                            debugger
                            console.log(vm.timeAxis)
                        }
                    },function(e) {
                        console.log(e);
                    });
            },
            changeCn(str) {
                switch(str) {
                    case 0: 
                        return "已提交"
                    break;
                    case 1:  
                        return "已受理"
                    break;
                    case 2:
                        return "正在办理"
                    break;
                    case 3:
                        return "已办结"
                    break;
                    case 4:
                        return "逾期正在办理"
                    break;
                    case 5:
                        return "逾期已办结"
                    break;
                    case 6:
                        return "已作废"
                    break;
                    case 99:
                        return "已提交。等待处理"
                    break;
                    default:
                        return ""
                    break;
                }
            }
        }

    }
</script>


<style scoped>
    .icondiv {
        width: 70px;
        height: 90px;
        background-size: 30px;
        background-position: center 10px;
        background-repeat: no-repeat;
        box-sizing: border-box;
        padding-top: 50px; 
    }
    .a1 {
        background-image:url(../assets/images/liucheng/a1.png);
    }
    .b1 {
        background-image:url(../assets/images/liucheng/b1.png);
    }
    .b2 {
        background-image:url(../assets/images/liucheng/b2.png);
    }
    .c1 {
        background-image:url(../assets/images/liucheng/c1.png);
    }
    .c2 {
        background-image:url(../assets/images/liucheng/c2.png);
    }
    .d1 {
        background-image:url(../assets/images/liucheng/d1.png);
    }
    .d2 {
        background-image:url(../assets/images/liucheng/d2.png);
    }

    .linediv {
        width: 120px;
        height: 90px;
        background-size: 120px 14px;
        background-position: center 20px;
        background-repeat: no-repeat;
        box-sizing: border-box;
    }
    .line1 {
        background-image:url(../assets/images/liucheng/line1.png);
    }
    .line2 {
        background-image:url(../assets/images/liucheng/line2.png);
    }
    .wraps{
        padding: 0 30px 0 30px ;
        box-sizing: border-box;
        min-width:950px; 
    }

    .title{
        width:100%;
        height:40px;
        border-bottom:1px solid #ccc;
        line-height: 40px;
        padding-left:9px;
    }

    .title-icon{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
        fill: #686868;
        margin-top:-2px;
    }

    .progress{
       height:158px;
       width:100%;
       box-sizing: border-box;
       text-align: center;
       border-bottom: 1px solid #ccc;
    }

    .timeAxis{
        width:100%;
        height:auto;
        background: #fff;
        margin-top:10px;
        margin-bottom:50px;
        border-radius:5px;
        border:1px solid #ccc;
    }

</style>