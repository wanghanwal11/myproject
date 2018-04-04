/**
* Created by bk on 2017/9/14.
*/
<template>
    <div class="box box_v" style="height:100%;">
        <LazyTopbar :data="json" style="position:fixed;top:0px;z-index:11;padding-right:235px;">
            <titletab :items="items1" @load="load" slot="centertitle" ref="titletab"></titletab>
        </LazyTopbar>
        <LazyKeep @change="change"></LazyKeep>
    </div>
</template>
<script type="es6">
    import titletab from '../components/titletab'
    export default {
        name: 'activity',
        components: {
            titletab
        },
        data () {
            return {
                json:{},
                items1:[{name: '统计'},{name:"活动"},{name:"草稿"}] //共享
            }
        },
        created: function(){
         //this.$router.push("commInfo");
        },
        methods: {
            load(obj){
                if(obj.index == 0) {
                    this.$router.push("activityCount");
                }else if(obj.index == 1){
                    //this.$lazy.data.sx = true;
                    this.$router.push("activityList")
               }else if(obj.index == 2){
                    //this.$lazy.data.csx = true;
                    this.$router.push("activityDraft")
               }
            },
            change (num) {
                debugger;
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
