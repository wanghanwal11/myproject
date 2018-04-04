<template>
    <div>
      <Affix :offset-top="45">
        <LazyTopbar :data="json"></LazyTopbar>
      </Affix>
      <div  class="body">
        <p class="p">选择模板</p>
        <photolist :items="items" class="photo" @point="point"></photolist>
      </div>
    </div>
</template>

<script>
  import Affix from 'iview/src/components/affix'
  import photolist from '../components/photolist'
  var vm
    export default {
        created(){
            vm=this;
        },
        data () {
            return {
                items: [{
                    src:require("../assets/images/hytz.png"),
                  title:"模板-会议通知",
                  title1:"会议通知"
                },{
                  src:require("../assets/images/rwtx.png"),
                  title:"模板-任务提醒",
                  title1:"任务提醒"
                },{
                  src:require("../assets/images/mtwcdqr.png"),
                  title:"模板-目标完成待确认提醒",
                  title1:"目标完成待确认提醒"
                }],
              json:{
                    title:"消息推送",
                    left:[{
                      type : 'Button',
                      svg : '#icon-fanhui',
                      buttontype : 'text',
                      onclick : function() {
                        vm.$router.go(-1);
                      }
                    }],
                  right:[{
                    type : 'Button',
                    label : '历史记录',
                    size:'small',
                    buttontype : 'primary',
                    onclick : function() {
                      vm.$router.push('noticlishi')
                    }
                  }]

              }
            }
        },
        components: {
          photolist,
          Affix
        },
        methods: {
          point(obj){
             this.$router.push({path: '/bjnotic', query: {type: obj.index,name:obj.item.title1}})
          }
        }
    }
</script>

<style>
  .body{
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #f8f8f8;
  }
  .p{
    line-height: 20px;
    font-size: 18px;
    padding-left: 8px;
    border-left: 4px solid #4f4f4f;
    margin-bottom: 20px;
  }
  .photo{
    border: 1px solid #d7dde4;
    border-radius: 5px;
    background: white;
  }
</style>
