<template>
    <div class="myBox2">
      <div class="fl" v-for="(item,index) in items" :key="index">
        <div style="">
          <p class="read_p1">{{item.value}}</p>
          <p class="read_p2">{{item.title}}</p>
        </div>
      </div>
    </div>
</template>
<script>
    var vm;
    export default {
        props:{
          items:{
            type:Array,
            default:[]
          }
        },
        data () {
            return {}
        },

        created: function () {
            vm = this;
        },
        components: {},
        methods: {}

    }
</script>
<style scoped>
  .myBox2{
    background-color: #f8f8f8;
    width: 440px;
    height:70px;
    margin: 0 auto;
  }
  .fl{
    width:145px;
    float: left;
    height:55px;
    text-align: center;
    border-right:1px solid #d8d8d8;
    margin-top: 10px;
    padding-top:5px;
    font-size: 14px;
    color: #6b6b6b;
  }


</style>
