<template>
  <div>
    <div  v-for="(value,index) in arr" class="myCard2Box colBox" style="border: 1px solid #e1e1e1;min-width: 300px;height: 200px;position:relative;background-color: #fff;float:left;margin: 0 0 30px 20px;" @click="openUrl(value.id)" @mouseenter="getIndex2(index)" @mouseleave="leaveBox(index)":class="{'mar':index==j}">
      <div class="topDiv" style="width:300px;height: 140px;border-bottom: 1px solid #e1e1e1;font-size: 16px;padding: 50px 15px 0; word-wrap: break-word;color: #333333;">
        <!--<p>宣传专题视题视频素教程题视频素教程频素教程视解相...</p>-->
        <p style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{value.title}}</p>
      </div>
      <span v-if="value.state==0" style="position:absolute;width: 66px;height: 29px;top: 10px;left: -8px;text-align: center;line-height: 24px;color: #fff;background-size:cover;" :style="{backgroundImage:'url('+ wei +')'}">未开始</span>
      <span v-if="value.state==2" style="position:absolute;width: 66px;height: 29px;top: 10px;left: -8px;text-align: center;line-height: 24px;color: #fff;background-size:cover;" :style="{backgroundImage:'url('+ yi +')'}">已结束</span>
      <span v-if="value.state==1" style="position:absolute;width: 66px;height: 29px;top: 10px;left: -8px;text-align: center;line-height: 24px;color: #fff;background-size:cover;" :style="{backgroundImage:'url('+ jin +')'}">进行中</span>

      <div v-if="value.state==0">
        <span class="hide" style="position:absolute;top: 12px;right: 40px;width: 20px;height: 20px;background-size: cover;cursor: pointer" :style="{backgroundImage:'url('+ x +')'}" @click.stop="close(value.id,index)"></span>
        <div @mouseleave.stop="mouselev">
          <span class="hide" style="position:absolute;top: 12px;right: 12px;width: 20px;height: 20px;background-size: cover;cursor: pointer" :style="{backgroundImage:'url('+ sandian +')'}" @mouseenter="getIndex(index)"></span>
          <div  v-if="index==i" class="menu" style="position:absolute;top: 32px;right: 0;width: 50px;border: 1px solid #dcdbdb;z-index: 99;background-color: #fff;padding: 5px 0;cursor: pointer;margin-top: 1px;">
            <p class="p" @click.stop="toupiaobj(value.id)">编辑</p>
          </div>
        </div>
      </div>
      <div class="bottomDiv" style="border-bottom: 2px solid transparent;" :class="{'bot':index==j}">
        <!--<read :items="items"></read>-->
        <div class="readBox">
            <div class="f1">
              <p class="read_p1">{{value.viewnum}}</p>
              <p class="read_p2">{{items[0].title}}</p>
            </div>
            <div class="f1">
              <p class="read_p1">{{value.optioncount}}</p>
              <p class="read_p2">{{items[1].title}}</p>
            </div>
            <div class="f1">
              <p class="read_p1">{{value.votenum}}</p>
              <p class="read_p2">{{items[2].title}}</p>
            </div>
        </div>
      </div>
      <div v-if="index==j" style="height: 11px;"></div>
    </div>
  </div>
</template>
<script>
  import read from '../components/read.vue';
  import wei from '../assets/images/toupiao/wei.png';
  import yi from '../assets/images/toupiao/yi.png';
  import jin from '../assets/images/toupiao/jin.png';
  import x from '../assets/images/toupiao/x.png';
  import sandian from '../assets/images/toupiao/sandian.png';
    var vm;
    export default {

        data () {
            return {
              wei:wei,
              jin:jin,
              yi:yi,
              id:'',
              sandian:sandian,
              x:x,
              i:'-1',
              j:'-1',
            }
        },
        props:{
          items:{
            type:Array,
            default:[]
          },
          arr:{
            type:Array,
            default:[]
          },
          state:{
            type:Object,
            default: {}
          }
        },

        created: function () {
            vm = this;
        },
        components: {
          read
        },
        methods: {
          getIndex(index){
            this.i = index;
          },
          getIndex2(index){
            this.j = index;
          },
          mouselev(){
              this.i=-1;
          },
          leaveBox(){
            this.j=-1;
          },
          close(id,index){
              this.$emit("close",{id:id,index:index})
          },
          openUrl(id){
            this.$emit("openUrl",id)
          },
          mouseent(){
            this.$emit("mouseent")
          },
          toupiaobj(id){
            this.$emit("toupiaobj",id)
          }
        }

    }
</script>
<style scoped>
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
  .hide{
    display: none;
  }
  .myCard2Box{
    transition: margin 0.3s;
    cursor: pointer;
  }
  .myCard2Box:hover .hide{
    display: block;
  }

.mar{
  margin-top: -10px!important;
  margin-bottom: 40px!important;
}
.bot{
  border-bottom: 2px solid #3c7ce6!important;
}
  .p{
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #666666;
  }
  .p:hover{
    background-color: #f1f1f1;
  }

  .readBox{
    /*background-color: #f8f8f8;*/
    /*width: 440px;*/
    height:56px;
    margin: 0 auto;
  }
  .readBox .f1{
    width:33.33%;
    height:55px;
    float: left;
    text-align: center;
    padding-top: 5px;
  }
  .readBox .read_p1{
    font-size: 16px;
    color: #666666;
  }
</style>

