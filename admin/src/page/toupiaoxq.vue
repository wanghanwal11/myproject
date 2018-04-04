<template>
  <div>
    <div class="contain" style="overflow: hidden;background-color: #f8f8f8;display: flex;margin-top: 20px;">
      <div class="left" style="float: left;margin-left: 15px;width: 510px;border:1px solid #d7dde4;background-color: #fff">
        <!--<div class="img" style="width: 440px;height: 245px;background-color: #00b8ff;margin: 35px auto 20px auto;">-->
        <!--</div>-->
        <div style="margin-bottom:25px;overflow: hidden;margin-top: 20px;">
          <div style="float: left;margin-left:35px;max-width: 320px">
            <p style="font-size: 14px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{list1.title}}</p>
            <p style="color: #666666;">{{list1.starttime}} ～ {{list1.endtime}}</p>
          </div>
          <span class="ing">{{ing}}</span>
        </div>
        <read :items="item"></read>

        <!--<div style="width: 440px;margin: 50px auto 45px auto;overflow: hidden;">-->
        <div style="width: 440px;margin: 50px 35px 45px;overflow: hidden;">
          <div style="float: left;width: 200px;">
            <p style="margin-bottom: 20px;">类型</p>
            <div style="width: 150px;">
              <div v-if="list1.type=='图文'" :style="{backgroundImage: 'url(' + tuwen + ')'}" style="width: 150px;height: 100px;border: 2px solid #fff;cursor: pointer;" @click="bd('0')" :class="{border:bor=='0'}">
              </div>
              <div  v-else :style="{backgroundImage: 'url(' + txt + ')'}" style="width: 150px;height: 100px;border: 2px solid #fff;cursor: pointer;" @click="bd('0')" :class="{border:bor=='0'}">
                <!--<img :src="txt" alt="">-->
              </div>


              <p v-if="list1.type=='图文'" style="text-align: center">图文</p>
              <p v-else style="text-align: center">文本</p>
            </div>
          </div>
          <div v-if="list1.type=='图文'" style="float: left;width: 200px;">
            <p style="margin-bottom: 20px;">主题</p>
            <div style="width: 120px;">
              <div style="box-sizing: border-box;width: 120px;height:180px;border: 2px solid #fff;cursor: pointer;" :style="{backgroundImage: 'url(' + modal + ')'}" @click="bd('1')"  :class="{border:bor=='1'}">
                <!--<img :src="modal" alt="">-->
              </div>
              <p style="text-align: center">某某某模板</p>
            </div>
          </div>
        </div>

        <!--<myTag class="center" :title="title" :items="text"></myTag>-->

      </div>
      <!--left结束-->
      <div class="right" style="float: left;background-color: #fff;border:1px solid #d7dde4;margin:0 15px 0 20px;width: 57%;" ref="right" >
        <Tabs value="name1" type="line">
          <TabPane label="结果" name="name1">
            <div v-if="pms.length==0">暂无数据</div>
            <myProgress :pms="pms"></myProgress>
          </TabPane>
          <TabPane label="统计" name="name2">
              <div v-if="pms.length==0">暂无数据</div>
              <div style="width: 500px;height:400px" ref="main"></div>
              <!--<schart :canvasId="canvasId"-->
                      <!--:type="type"-->
                      <!--:width="width"-->
                      <!--:height="height"-->
                      <!--:data="data"-->
                      <!--:options="options"-->
              <!--style="box-sizing: border-box;margin: 0 auto"></schart>-->
          </TabPane>
          <TabPane label="投票" name="name3">
            <div v-if="list1.options.length==0">暂无数据</div>
            <myCard :lists="list1.options" @more="moreUser"></myCard>
          </TabPane>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<script>
    import read from '../components/read.vue';
    import txt from '../assets/images/toupiao/txt.png';
    import tuwen from '../assets/images/toupiao/tuwen.png';
    import modal from '../assets/images/toupiao/modal.png';
    import myTag from '../components/myTag.vue';
    import myCard from '../components/myCard.vue';
    import myProgress from '../components/myProgress.vue';
    import titletab from '../components/titletab.vue';
    import {Tabs,TabPane}  from 'iview';
    import centerlist from '../components/centerlist.vue';
    import echarts from 'echarts';
//    import schart from 'vue-schart';

    var vm;
    export default {

        data () {
            return {
                ing:"进行中",
                item:[{value:23100,title:'阅读'},{value:123,title:'候选'},{value:123,title:'投票'}],
                txt:txt,
                tuwen:tuwen,
                list1:{},
                list2:{},
                echartsArr:[],
                echa:'',
                echArr:[],
                id:'',
                page:'1',
                pages:[],
                optionid:'',
                modal:modal,
                title:'分类',
                text:['某1','某2','某3','某4','某5','某6'],
                name:'',
                bor:'0',
                list:[{num:"0001",ticket:"203",arr:[{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"}]},{num:"0002",ticket:"200",arr:[{"title":"张大鹏","time":"12-15 21:02:03"},{"title":"张大鹏","time":"12-15 21:02:03"}]}],
                lists:[],
                pms:[],
            }
        },
        created() {

        },
        mounted(){
          vm = this;
//          vm.$emit("change",0);
          this.getXq();
          this.getResult();
          setTimeout(()=>{
            this.echart();
          },1000)

        },
        components: {
          read,
          myTag,
          Tabs,
          TabPane,
          myCard,
          myProgress,
          titletab,
          echarts,
//          schart
        },
        methods: {
          getXq(){
            vm.id = this.$route.query.routeParams;
            var url = this.$store.state.serverHost + 'cmy/vote/cmyVote/getByPC?id='+ vm.id;
            this.$http.get(url, {
              params:{
              }
            }).then(function (response) {
                var arr =[];
                vm.list1 = response.data.rows[0];
                vm.list2 = response.data.rows[0].options;
                vm.list1.starttime = vm.$lazy.FormatDate(vm.list1.starttime,"yyyy-MM-dd HH:mm:ss");
                vm.list1.endtime = vm.$lazy.FormatDate(vm.list1.endtime,"yyyy-MM-dd HH:mm:ss");
                for(var i=0;i < vm.list1.options.length;i++){
                  var obj = {};
                  vm.list1.options[i].number = (parseInt(vm.list1.options[i].number) + 1)+'号';
                  vm.list1.options[i].votecount = parseInt(vm.list1.options[i].votecount)+'票';
                  obj.value = parseInt(vm.list1.options[i].votecount);
                  obj.name = (parseInt(vm.list1.options[i].number) )+'号';
                  arr.push(obj);
                  for(var j=0;j<vm.list1.options[i].users.length;j++){
                    vm.list1.options[i].users[j].votetime =vm.$lazy.FormatDate(vm.list1.options[i].users[j].votetime,"yyyy-MM-dd HH:mm:ss");
                  }
                }
                vm.echArr=arr;
//                vm.data=arr;
                vm.item[0].value = vm.list1.viewnum;
                vm.item[1].value = vm.list1.options.length;
                vm.item[2].value = vm.list1.votenum;

              }).catch(function (error) {
                console.log(error);
              });
          },
          getResult(){
            vm.id = this.$route.query.routeParams;
            var url2 = this.$store.state.serverHost + 'cmy/vote/cmyVote/getResult?id=' + vm.id;
            this.$http.get(url2, {
              params:{
              }
            }).then(function (response) {
              vm.pms = response.data.rows[0];
              for(var i=0;i<vm.pms.options.length;i++){
                vm.pms.options[i].percent = vm.pms.options[i].percent.replace('%','');
                vm.pms.options[i].number = "("+(parseInt(vm.pms.options[i].number)+1)+"号)";
              }
            }).catch(function (error) {
              console.log(error);
            });
          },
          getVote(obj){
            var url3 = this.$store.state.serverHost + 'cmy/vote/cmyVoteuser/getVoteuser';
            this.$http.get(url3, {
              params:{
                  page : vm.list2[obj.i].page||2,
                  row : 10,
                  optionid : vm.optionid
              }
            }).then(function (response) {
                if(response.data.rows.length==0){
                  vm.$set(vm.list2[obj.i],'noUser',1);
                }
                vm.list2[obj.i].users = vm.list2[obj.i].users.concat(response.data.rows);
              for(var j=0;j<vm.list2[obj.i].users.length;j++){
                vm.list2[obj.i].users[j].votetime =vm.$lazy.FormatDate(vm.list2[obj.i].users[j].votetime,"yyyy-MM-dd HH:mm:ss");
              }

            }).catch(function (error) {
              console.log(error);
            });
          },
          bd(bol){
              this.bor=bol;
          },
          bianji(){
            var url = this.$store.state.serverHost + '';
          },
          moreUser(obj){
            vm.optionid = obj.id;

            vm.list2[obj.i].page = parseInt(vm.list2[obj.i].page||1)+1;
            vm.$set(vm.list2[obj.i],'page',vm.list2[obj.i].page);
            vm.getVote(obj);
          },
          echart(){
            vm.echa = echarts.init(vm.$refs.main);
            vm.echa.setOption({
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: '50%',
                  data:vm.echArr
//                  data:[
//                    {value:1, name:'视频广告'},
//                  ]
                }
              ]
            });
          }

        }//methods
    }
</script>
<style>
  .contain{
    background-color: #fff;
  }
  .center{
    width:440px;
    margin:0 auto;
  }
  .ing{
    float: right;
    font-size: 12px;
    margin-right: 75px;
    width:60px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #ff8827;
    border:1px solid #ff8827;
    border-radius:13px;
  }
  .myBox2 div:nth-child(3){
    border:none!important;
  }
  .ivu-tabs-ink-bar{
    background-color: transparent!important;
  }

  .ivu-progress-inner{
    border-radius:0!important;
  }
  .ivu-progress-bg{
    height: 15px!important;
    border-radius:0;
    background-color: #6ea3eb;
  }
  .border{
    border: 2px solid #ffb400!important;
  }
  .cur{
    color: #6291e9!important;
  }
  .ivu-tabs .ivu-tabs-content-animated{
    /*width: 100%!important;*/
  }
  .ivu-tabs .ivu-tabs-tabpane{
    /*width: 100%!important;*/
    /*flex-shrink: 1!important;*/
    /*overflow: hidden;*/
  }
</style>
