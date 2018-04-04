<template>
  <LazyLayout >
          <Tabs>
            <Tab-pane  :label="item.name" :name="item.cls" v-for="(item,index) in items" :key="index"><slot :name="item.cls"></slot></Tab-pane>
          </Tabs>
  </LazyLayout>
</template>

<script>
  import Tabs from 'iview/src/components/tabs'
    export default {
        mounted(){

        },
        data () {
            return {
                message: ''
            }
        },
        props:{
          items:{
            type:Array,
            default:[]
          }
        },
        components: {
          Tabs
        },
        methods: {}
    }
</script>

<style scoped>
  .ivu-tabs-bar{
    margin-bottom: 0;
  }
</style>
