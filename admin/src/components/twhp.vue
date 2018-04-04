<template>
  <div class="twhp" :class="classes">
    <div  v-for="(item,index) in items" :key="index" class="cos" @click="point(index,item)">
      <div class="a" :class="{cur:iscur==index}">
        <img :src="item.src">
      </div>
      <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: '',
        bol:true,
        iscur:0
      }
    },
    created:function(){
    },
    props:{
      items:{
        type:Array,
        default:[]
      },
      classes:{
        type:String,
        default:""
      }
    },
    components: {
    },
    methods: {
      point(index,item){
        this.iscur=index;
        this.$emit("twhp",{index:index,id:item.id,item:item})
      },
      changeiscur(index){
        this.iscur=index;
      }
    }
  }
</script>

<style scoped>
  .twhp{
    overflow: hidden
  }
  .twhp .a{
    width: 150px;
    height: 100px;
    text-align: center;
    color: #7D7D7D;
    font-size: 14px;
    background: #f6f6f6;
    border: 2px solid #f6f6f6;
  }
  .twhp .a img{
    width: 100%;
    height: 100%;
  }
  .twhp  .cos{
    float: left;
    margin: 15px 10px;
  }
  .twhp .title{
    text-align: center;
    margin-top: 5px;
  }
  .cur{
    border: 2px solid #ffb400!important;
  }
</style>
