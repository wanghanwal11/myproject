/**
* Created by bk on 2017/10/31.
*/
<template>
    <div style="height:100%">
        <LazyTopbar :data="json" style="position:fixed;top:45px;z-index:11;padding-right:235px;">
            <titletab :items="items1" @load="load" slot="centertitle" ref="titletab"></titletab>
        </LazyTopbar>
        <!--<router-view @change="change"></router-view>-->
        <LazyKeep @change="change"></LazyKeep>
    </div>
</template>
<script type="es6">
    var vm;
    import titletab from '../components/titletab'
    export default {
        name: 'send',
        components: {
            titletab
        },
        data () {
            return {
                json:{},
                items1:[{name:"推送"},{name:"历史"}]
            }
        },
        created: function(){
            vm = this;
        },
        methods: {
            load(obj){
               if(obj.index == 1){
                this.$router.push("sendHistory")
               }else if(obj.index == 0){
                this.$router.push("articleSend")
               }
            },
            change (num) {
                this.$refs.titletab.change(num); // 调用子组件titletab的chang方法，实现当前活动标签的切换
                //if( num == 1) {
                //    this.$set(this.json,'right',this.right);
                //} else {
                //    this.$set(this.json,'right',{});
                //}
            }
        }
    }

</script>
<style scoped>

</style>
 