<template>
    <div class="bd" :class="classes">
      <slot></slot>
      <div class="content" :class="{left:left}">{{biaoti}}</div>
    </div>
</template>
<script type="es6">

    export default {
        data: function () {
            return {
            };
        },
        components: {},
        props:{
          biaoti:{
              type:String
          },
          left:{
            type:Boolean
          },
          classes:{
            type:String,
            default:""
          },
        },
        created: function () {

        }
    }
</script>
<style scoped>
  .bd{
    width:100%;
    /*height:1px;*/
    border-top:1px solid #d7dde4;
    margin-top: 20px;
    position: relative;
  }
  .write{
    width:100%;
    min-height:50px;
    border:1px solid #d7dde4;
    position: relative;
    padding-top: 15px;
  }
  .content{
    margin:0 auto;
    width: 100px;
    height:30px;
    line-height: 30px;
    background-color: #f8f8f8;
    text-align: center;
    position: absolute;
    top: -15px;
    left:50%;
    margin-left: -50px;

  }
  .left{
    width: 100px;
    height:30px;
    line-height: 30px;
    background-color: #f8f8f8;
    text-align: center;
    position: absolute;
    top: -15px;
    left:20%;
  }
</style>
