<template>
  <div class="LazyKeep">
    <keep-alive>
      <router-view v-if="$route.meta.keep" @change="change"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keep" @change="change"></router-view>
  </div>

</template>

<script>
  export default {
    created() {
        this.$lazy.beforeRouteLeave = function(to,from,next,callback, callback2) {
          var keepStr = from.meta.keep || '';
          if(keepStr.indexOf(to.name)!=-1) {
            callback2 && callback2();
            next();
          }else {
            callback && callback();
            next();
          }
      }
    },
    methods: {
      change (num) {
        this.$emit('change',num);
      }
    }
  }
</script>
<style>
  .LazyKeep{
    height: 100%;
    width: 100%;
  }
</style>