<template>
  <ul class="menu" :class="classes">
    <li :name="index" v-for="(item,index) in items" :key="index" class="li" @click="start(index)">
      <div class="auto">
        <i :style="{backgroundImage:'url('+item.src+')'}"></i>
      <span>{{item.name}}</span>
      </div>
    </li>
  </ul>
</template>

<script>
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
      }
    },
    data () {
      return {
        message: ''
      }
    },
    components: {},
    methods: {
      start:function(index){
          this.$emit("start",index)
      }
    }
  }
</script>

<style scoped>
  .menu{
    width: 120px;
    margin: 0 auto;
    border: 1px solid #e7e7eb;
  }
    .li{
      line-height: 40px;
      border-bottom:1px solid #e7e7eb;
      cursor:pointer;
    }
  .li:nth-last-child(1){
    border-bottom:none;
  }
  i{
    display: inline-block;
    width: 18px;
    height: 20px;
    vertical-align: middle;
    margin-right: 5px;
    background-repeat: no-repeat;
  }
  .auto{
    width: 72px;
    margin: 0 auto;
  }
</style>
