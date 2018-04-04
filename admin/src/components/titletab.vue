<template>
  <div class="masonry" :class="classes">
      <div  v-for="(item,index) in items" :key="index" class="column" @click="load(index,item)" :class="{cur:iscur===index}">
          <Badge :count="item.count">
              <span>{{item.name}}</span>
          </Badge>
      </div>
  </div>
</template>

<script>
    import Badge from 'iview/src/components/badge'
    export default {
        data () {
            return {
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
            Badge
        },
        methods: {
            load:function(index,item){
                this.iscur=index;
                this.$emit("load",{item:item,index:index})
            },
            change:function(str){
               this.iscur=str;
            }
        }
    }
</script>

<style scoped>
  .column {
    float: left;
    padding: 4px 40px;
    cursor: pointer;
    font-size:16px;
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
    //border-bottom: 2px solid red;
    color:#3c7ce6;
    font-weight:bolder;
  }
</style>
