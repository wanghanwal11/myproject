<template>
    <div>
      <div style="height: 80px;display: flex;" v-for="(pm,i) in pms.options" :key="i">
          <span style="float: left;line-height: 60px;color: #ff4200;font-size: 12px;margin:0 15px;">第 <span style="font-size: 16px;">{{i+1}}</span> 名</span>
          <div v-if="pms.type=='图文'" style="width: 110px;height: 60px;margin-bottom:-25px;display: inline-block;">
            <img :src=pm.imgcontent alt="" style="width: 100%;height: 100%;">
          </div>
          <!--<div style="width: 110px;height: 60px;margin-bottom:-25px;display: inline-block;background-size: contain" :style="{backgroundImage: 'url(' + pm.img + ')'}"></div>-->
        <div style="float:left;margin:0 15px 0 10px;flex: 1;padding-top: 5px;">
          <div style="float:left;">{{pm.txtcontent}}&nbsp;&nbsp;{{pm.number}}</div>
          <div style="float: right;margin-bottom: 12px;color: #6ea3eb;font-size: 12px;"><span style="font-size: 16px;">{{pm.votecount}}</span> 票</div>
          <Progress :percent="pm.percent" hide-info ></Progress>
        </div>
      </div>


    </div>
</template>
<script>
  import Progress  from 'iview/src/components/progress';
    var vm;
    export default {

        data () {
            return {}
        },
        props:{
          num:String,
          pms:{
              type:Array,
              default:[]
          }
        },

        created: function () {
            vm = this;
        },
        components: {
          Progress
        },
        methods: {}

    }
</script>
<style scoped>
</style>
