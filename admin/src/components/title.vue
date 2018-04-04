/**
* Created by bk on 2017/4/25.
*/
<template>
    <div class="title">
        {{$store.state.pageTitle}}
    </div>
</template>
<script type="es6">
    export default {
        name: 'title',
        data () {
            return {
                
            }
        }
    }

</script>
<style scoped>
 .title {
     height: 20px;
     line-height: 20px;
     padding-left: 10px;
     margin: 25px 0 25px 15px;
     border-left: 4px solid #4f4f4f;
     color: #4f4f4f;
     font-size: 16px;
     font-weight: bold;
 }
</style>
 