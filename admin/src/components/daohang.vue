<template>
  <!--<Menu  :active-name="sindex"   class="sortselect">-->
    <!--<MenuGroup>-->
      <!--<MenuItem  v-for="(sort,index) in sorts" :key="index" :name="index">-->
        <!--{{sort.name}}({{sort.number}})-->
      <!--</MenuItem>-->
    <!--</MenuGroup>-->
  <!--</Menu>-->
  <ul class="daohang" :class="classes">
    <li  v-for="(sort,index) in sorts" :key="index" :class="{ruler:sindex==index}" @click="ruler(index,sort)">
        {{sort.name}}({{sort.number}})
    </li>
  </ul>
</template>

<script>
  import {Menu,MenuItem,MenuGroup} from 'iview'
  export default {
    mounted(){

    },
    props:{
      sorts:{
        type:Array,
        default:[]
      },
      sindex:{
        type:String,
        default:"0"
      },
      classes:{
        type:String,
        default:""
      }
    },
    data () {
      return {
      }
    },
    components: {Menu,MenuItem,MenuGroup},
    methods: {
      ruler:function(index,item){
        this.$emit("sortselect",index)
      }
    }
  }
</script>

<style scoped>
  .daohang{
    width: 100%;position: relative;height: 480px; overflow: hidden
  }
  .daohang li{
    padding: 14px 15px;
    border-bottom:none;
    cursor:pointer;
    }
  .ruler{
    color: #2d8cf0;
  }
</style>
