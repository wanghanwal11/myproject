<template>
    <div>
      <div style="width: 670px;height: auto;margin: 0 auto;padding-top: 65px;">
        <div v-html="list1.title" style="margin-bottom: 10px;" class="imgBox">

        </div>
          <div style="margin-bottom:50px;">
            <p style="margin-bottom: 10px;color: #f3d275;text-align: center">投票时间</p>
            <p style="color: #f3d275;text-align: center">{{list1.starttime}} ～ {{list1.endtime}}</p>
          </div>
          <div style="text-align: center;margin-bottom: 30px;">
            <div style="margin: 0 auto;overflow: hidden;width: 38%;">
              <i class="f_left f_i" style="margin-right: 25px;"></i><span class="f_left" style="">请查看投票结果</span><i class="f_left f_i" style="margin-left: 25px;"></i>
            </div>
          </div>


        <!--<myProgress2 :pms="pms" ></myProgress2>-->
        <div>
          <div v-if="pms.type=='文本'">
            <div style="width: 100%;height: 80px;display: flex;" v-for="(pm,i) in pms.options" :key="i">
              <div style="width: 100%;float:left;margin:0 15px 0 10px;flex: 1;padding-top: 5px;">
                <div style="float:left;">{{pm.txtcontent}}</div>
                <div style="float: right;margin-bottom: 12px;color: #9ac691;font-size: 12px;"><span style="font-size: 16px;">投票数{{pm.votecount}}</span> </div>
                <Progress :percent="pm.percent" hide-info ></Progress>
              </div>
            </div>
          </div>

          <div v-else>
            <wall :imgsArr="imgsArr" :maxCols=2>
              <template scope="props">
                <div class="grids">
                  <div class="content" style="padding: 10px 0;background-color: #fff">
                    <div class="name" style="font-size: 14px;padding: 5px;color: #747474;text-align: center;">
                      <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{props.value.txt}}</p>
                    </div>
                    <span style="padding: 0 10px;color: orange;font-weight: bold">{{props.value.value}}<span style="font-size: 14px">票</span></span>
                    <span style="float: right;margin-right: 10px;width: 50px;height: 20px;line-height: 20px;background-color: #ff5f46;color: #fff;text-align: center;-webkit-border-radius: 9px;">第{{props.index+1}}名</span>
                  </div>
                </div>
              </template>
            </wall>
          </div>
        </div>
      </div>

      <div class="share" v-if="list1.qrcode">
        <Poptip trigger="hover" placement="bottom">
          <Card style="width:40px;height: 40px;text-align: center;vertical-align: middle;display: table-cell;">
            <Icon type="android-share-alt"></Icon>
          </Card>
          <div class="api" slot="content">
            <p data-v-3d08df60="" style="text-align: center; font-weight: bolder;font-size: 14px;line-height: 1.5;">扫一扫分享到微信</p>
            <img style="width: 150px;height: 150px;" :src="list1.qrcode">
          </div>
        </Poptip>
      </div>
      <div class="toTop" @click="goToTop">
        <Card style="width:40px;height: 40px;text-align: center;vertical-align: middle;display: table-cell;">
          <Icon type="chevron-up"></Icon>
        </Card>
      </div>
    </div>
</template>
<script>
    import titletab from '../components/titletab.vue';
    import Affix from 'iview/src/components/affix';
    import Icon from 'iview/src/components/icon'
    import Poptip from 'iview/src/components/poptip'
    import Card from 'iview/src/components/card'
    import Progress from 'iview/src/components/progress';
    import wall  from '../components/wall.vue';
//    import myProgress2 from '../components/myProgress2.vue';
    var vm;
    export default {

        data () {
            return {
              id:'',
              list1:[],
              list2:[],
              item:[],
              aa:'fsdafsa',
              pms:[],
              imgsArr:[],
              abc:'213',
              json:{
                left:[{
                  type : 'Button',
                  svg : '#icon-fanhui',
                  buttontype : 'text',
                  onclick : function() {
                    vm.$router.push({path:'toupiaoxq',query:{routeParams:vm.id}})
                  }
                }]

              },
            }
        },

        created: function () {
            vm = this;
            vm.getYl();
            vm.getResult();
//            vm.$emit("change",1);
        },
        components: {
          titletab,
          Affix,
          Icon,
          Poptip,
          Card,
          Progress,
          wall,
//          myProgress2
        },
        mounted(){
          this.getResult()
        },
        methods: {
          getYl(){
            vm.id = this.$route.query.routeParams;
            var url = this.$store.state.serverHost + 'cmy/vote/cmyVote/getByPC?id='+ vm.id;
            this.$http.get(url, {
              params:{
              }
            }).then(function (response) {
              vm.list1 = response.data.rows[0];
              vm.list2 = response.data.rows[0].options;
              vm.list1.starttime = vm.$lazy.FormatDate(vm.list1.starttime,"yyyy-MM-dd HH:mm:ss");
              vm.list1.endtime = vm.$lazy.FormatDate(vm.list1.endtime,"yyyy-MM-dd HH:mm:ss");

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
              var arr = [];
              vm.pms = response.data.rows[0];
              for(var i=0;i<vm.pms.options.length;i++){
                vm.pms.options[i].percent = vm.pms.options[i].percent.replace('%','');
                arr.push({src:vm.pms.options[i].imgcontent,value:vm.pms.options[i].votecount,txt:vm.pms.options[i].txtcontent});
              }
              vm.imgsArr = arr;
            }).catch(function (error) {
              console.log(error);
            });
          },
          goToTop () {
            //document.body.scrollTop = 0;
            //document.documentElement.scrollTop = 0;
            clearInterval(timer);
            var timer = setInterval(function() {
              let curHeight = document.documentElement.scrollTop || document.body.scrollTop;  // 得到当前高度
              var now = curHeight;
              var speed = (0 - now) / 7;                              // 随着高度减速
              speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
              //console.log(`当前的高度应该是:` + curHeight);
              //console.log('我是零你也那我没办法');
              if (curHeight === 0) {                          //当前高度为零,停止这次计时器
                clearInterval(timer);                             // C1
              }
              document.documentElement.scrollTop = curHeight + speed;         //直接给高度赋值
              document.body.scrollTop = curHeight + speed;                //谷歌的
              //stop = false;                               // A
              //console.log('回到顶部一次');
            }, 30);
          }
        }

    }
</script>
<style>
  .toTop {
    position: fixed;
    bottom: 100px;
    right: 75px;
    cursor: pointer;
  }
  .share {
    position: fixed;
    top: 100px;
    right: 75px;
    cursor: pointer;
  }
  .cur{
    color: #6291e9!important;
  }
  .f_left{
    float: left;
    color: #c1c2c4;
  }
  .f_i{
    width: 60px;
    height: 1px;
    margin-top: 8px;
    background-color: #c1c2c4;
  }
  .imgBox img{
    max-width:100%;
  }
</style>
