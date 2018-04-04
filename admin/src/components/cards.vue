<template>
  <div class="masonry" :class="classes">
            <div  v-for="(item,index) in items" :key="index" class="column"><slot><i v-if="item.del" :class="{del:iscur===index}" @click="del(index,item)"></i><div  class="item" @click="load(index,item)" :class="{cur:iscur===index}"><img :src="item.src" v-if="bol"  class="item__content"></div></slot></div>
  </div>
</template>

<script>
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
        this.$eventHub.$on("reset",function(str){
          vm.change(str)
        })
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
            load:function(index,item){
                this.iscur=index;
                this.$emit("load",{index:index,id:item.id,item:item})
            },
            change:function(str){
               this.iscur=str;
            },
            del:function(index,item){
              this.$emit("del",{index:index,id:item.id,item:item})
            }
        }
    }
</script>

<style scoped>
  .masonry {
   width: 100%;
  }


  .column {
    position: relative;
    float: left;
  }
  .item{
    width: 140px;
    height: 170px;
    margin: 17px;
  }
  .item__content{
    width: 100%;
    height: 100%;
  }
  .cur{
   border: 3px solid #ffb400;
  }
  .del{
    position: absolute;
    right: 11px;
    top: 7px;
    background: url("../assets/delse.png");
    padding: 7px;
    background-size: 14px;
    cursor: pointer;
  }
</style>
