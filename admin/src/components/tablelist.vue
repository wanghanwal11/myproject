<template>
  <div :class="classes">
    <Table border :columns="columns" :data="data1" @on-select="select" @on-select-all="selectall" :row-class-name="rowClassName " @on-selection-change="selchange"></Table>
  </div>
</template>

<script>
  import { Table } from 'iview'
    export default {
        mounted(){

        },
      props:{
        data1:{
          type:Array,
          default:[]
        },
        classes:{
          type:String,
          default:""
        },
        columns:{
          type:Array,
          default:[]
        }
      },
        data () {
            return {
                message: ''
            }
        },
        components: {
          Table
        },
        methods: {
          selchange(selection){
            this.$emit("selchange",{selection:selection})
          },
          rowClassName(row, index){
              if (row._expanded) {
                return 'tab';
              }
              return '';
          }
        }
    }
</script>

<style >
  .ivu-table .tab td{
    background-color: #33b982;
    color: #fff;
  }
</style>
