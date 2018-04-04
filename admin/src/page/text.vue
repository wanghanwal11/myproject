<template>
  <div>
    <Affix :offset-top="45">
      <LazyTopbar :data="json">
        <titletab slot="centertitle" @load="load" :items="item">
        </titletab>
      </LazyTopbar>
    </Affix>
  </div>
</template>

<script>
  import titletab from  "../components/titletab.vue"
  import Affix from 'iview/src/components/affix'
  export default {
    mounted(){

    },
    data () {
      return {
        json: {

        },
        item:[{name:11},{name:11}]
      }
    },
    components: {
      titletab,
      Affix
    },
    methods: {
      load(obj){

      }
    }
  }
</script>

<style>
</style>
