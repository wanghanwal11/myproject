/**
* Created by bk on 2017/10/30.
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
        name: 'articleShow',
        components: {
            titletab
        },
        data () {
            return {
                json:{left:[{
                    type : 'Button',
                    svg : '#icon-fanhui',
                    buttontype : 'text',
                    onclick : function() {
                        vm.$router.push("articleList");
                    }
                }]},
                items1:[{name:"文章编辑"},{name:"预览"}],
                right:[{
                    type : 'Button',
                    label : '保存',
                    size:'small',
                    loading:false,
                    buttontype : 'primary',
                    onclick : function() {
                        //vm.tijiao();
                        debugger;
                        vm.$children[1].$children[0].tijiao();
                    }
                }]
            }
        },
        created: function(){
            vm = this;
        },
        methods: {
            load(obj){
               if(obj.index == 1){
                   this.$router.push({
                       path:"articleLocalPreview"
                   });
                  var temp =  this.$children[1].$children[0].getallval();
                   this.$store.commit('updateContent', temp);
               }else if(obj.index == 0){
                   this.$router.push({
                       path:"kong2",
                       query:{
                           yulan:true
                       }
                   });
               }
            },
            change (num) {
                this.$refs.titletab.change(num); // 调用子组件titletab的chang方法，实现当前活动标签的切换
                if( num == 0) {
                    this.$set(this.json,'right',this.right);
                } else {
                    this.$set(this.json,'right',{});
                }
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
