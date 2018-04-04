<template>
  <div class="masonry" :class="classes">
    <Row>
      <div v-for="(item,index) in items" :key="index" class="column">
            <Col :xs="24" :sm="24" :md="12" :lg="8">
            <div class="item" @mouseenter="mouseenter(index,item)" @mouseleave="mouseleave(index,item)">
              <img :src="item.src" v-if="bol" class="item__content" />
              <div class="word">{{item.title}}</div>
                <div class="all" :class="{cur:iscur===index}">
                    <div class="zhezhao">
                    </div>
                    <div class="btn">
                    <span class="clk"  @click="point(index,item)"><i></i><i></i></span>
                    </div>
                </div>
            </div>
          </Col>
        </slot>
      </div>
    </Row>
  </div>
</template>

<script>
  import { Row,Col } from 'iview'
    export default {
        data () {
            return {
                message: '',
                bol:true,
                iscur:"null"
            }
        },
      created:function(){
        var vm=this;
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
          Row,Col
        },
        methods: {
          mouseenter:function(index,item){
                this.iscur=index;
            },
          mouseleave:function(){
            this.iscur='null';
          },
          point(index,item){
            this.$emit("point",{index:index,item:item})
          }
        }
    }
</script>

<style scoped>
  .masonry {
   width: 100%;
    overflow: hidden;
  }

  .column {

  }
  .item{
    max-width: 300px;
    height: 400px;
    margin: 30px auto;
    margin-bottom: 50px;
    position: relative;
  }
  .item__content{
    width: 100%;
    height: 100%;
  }
  .all{
    display: none;
  }
  .zhezhao{

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: black;
    opacity: 0.8;
    z-index: 1;
  }
  .btn{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 2;
  }
  .btn .clk{
    cursor: pointer;
    position: absolute;
    top:50%;
    left: 50%;
    margin-top: -32px;
    margin-left: -32px;
    display: block;
    width: 64px;
    height: 64px;
  }
  .clk i:nth-child(2){
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background: white;
    opacity: 0.5;
    border-radius: 50%;
  }
  .clk i:nth-child(1){
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    background: url(../assets/images/bj.png) no-repeat;
    background-position: center center;
  }
  .cur{
    display: block;
  }
  .word{
    text-align: center;
    font-size: 16px;
  }
</style>
