/**
* Created by bk on 2017/4/20.
*/
<template>
    <div class="registerWarp">
    <LazyTopbar :data="json" style="position: fixed;top: 0;width:calc(100% - 220px);z-index: 11">
        <titletab :items="items1" @load="load" slot="centertitle" ref="titletab"></titletab>
    </LazyTopbar>
        <router-view @change="change"></router-view>
    </div>
</template>
<script type="es6">
    import titletab from '../components/titletab'
    export default {
        name: 'communityInfo',
        components: {
            titletab
        },
        data () {
            return {
                json:{},
                items1:[{name:"基本信息"},{name:"服务项目"},{name:"微信设置"}]
            }
        },
        created: function(){
         //this.$router.push("commInfo");
        },
        methods: {
            load(obj){
               if(obj.index == 0){
                this.$router.push("commInfo")
               }else if(obj.index == 1){
                this.$router.push("commServerList")
               }else if(obj.index == 2){
                this.$router.push("settings")
               }
            },
            change (num) {
                this.$refs.titletab.change(num); // 调用子组件titletab的chang方法，实现当前活动标签的切换
            }
        }
    }

</script>
<style scoped>
    .registerWarp {
        /*width: 100%;
        padding: 25px 15px 40px;
        margin: 0 auto;*/
        font-size: 14px;
    }
</style>
 