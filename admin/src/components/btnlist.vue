<template>
  <div class="menu" :class="classes">

      <span :name="index" v-for="(item,index) in items" :key="index" class="li" @click="clk(item)"   :class="{'cur':item.show===true}">
      <i class="i" v-if="item.show"></i>
        <div  v-if="!remove">{{item.name}}</div>
        <Tooltip placement="top"   v-if="remove">
          {{item.name}}
           <div slot="content">
            <div @click="hehe(item,index,$event)">点我删除</div>
           </div>
       </Tooltip>
    </span>
  </div>
</template>

<script>
  import {Tooltip} from 'iview'
  export default {
    mounted(){

    },
    props:{
      items:{
        type:Array,
        default:[]
      },
      classes:{
        type:String,
        default:""
      },
      remove:{
        type:Boolean,
        default:false
      }
    },
    data () {
      return {
        message: ''
      }
    },
    components: {Tooltip},
    methods: {
      clk:function(item,event){
        item.show = !item.show;
      },
      hehe(obj,index,$event){
        event.stopPropagation();
        obj.index=index
        this.$emit("removes",obj)
      }
    }
  }
</script>

<style scoped>
  .li{
    display: inline-block;
    padding: 5px 10px;
    border: 2px solid #eeeeee;
    background: #f7f5fa;
    border-radius: 2px;
    color: #999999;
    cursor: pointer;
    position: relative;
    margin: 8px;
  }
  .cur{
    border: 2px solid #82a7cf;
  }
  .i{
    background: url("../assets/huihao.png");
    background-repeat: no-repeat;
    padding: 7px;
    position: absolute;
    top: -7px;
    right: -6px;
  }
</style>
