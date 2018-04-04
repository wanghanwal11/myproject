/**
* Created by bk on 2017/9/14.
*/
<template>
    <div class="activity box box_v">
    <LazyTopbar :data="json" style="position:fixed;top:0;z-index:11;padding-right:235px;">
        <titletab :items="items1" @load="load" slot="centertitle" ref="titletab"></titletab>
    </LazyTopbar>
        <router-view></router-view>
    </div>
</template>
<script type="es6">
    var vm;
    import titletab from '../components/titletab'
    export default {
        name: 'activity',
        components: {
            titletab
        },
        data () {
            return {
                json:{
                    left:[{
                          type : 'Button',
                          svg : '#icon-fanhui',
                          buttontype : 'text',
                          onclick : function() {
                            vm.$lazy.data.sx =false;
                            vm.$lazy.data.sxMore =false;
                            vm.$router.push("activityList");
                          }
                    }]
                },
                items1:[{name:"详情"},{name:"预览"}]
            }
        },
        created: function(){
            vm = this;
            //this.$router.push("commInfo");
            this.id = this.$router.history.current.query.routeParams;
            console.log(this.id);
        },
        methods: {
            load(obj){
               if(obj.index == 0){
                //this.$router.push("activityDetails");
                this.$router.push({
                    path:"activityDetails",
                    query:{
                        routeParams:this.id
                    }
                });
               }else if(obj.index == 1){
                //this.$router.push("activePreview")
                this.$router.push({
                    path:"activityPreview",
                    query:{
                        routeParams:this.id
                    }
                });
               }
            },
            // change (num) {
            //     this.$refs.titletab.change(num); // 调用子组件titletab的chang方法，实现当前活动标签的切换
            // }
        }
    }

</script>
<style scoped>
.activity {
  position: absolute;
      top: 0;
       bottom: 0;
       left: 0;
       right: 0;
}
    .registerWarp {
        /*width: 100%;
        padding: 25px 15px 40px;
        margin: 0 auto;*/
        font-size: 14px;
    }
</style>
