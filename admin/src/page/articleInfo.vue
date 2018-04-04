/**
* Created by bk on 2017/12/12.
*/
<template>
    <!--<div>-->
        <div style="height:100%">
            <LazyTopbar :data="json" style="position:fixed;top:0;z-index:11;padding-right:235px;">
                <titletab :items="items1" @load="load" slot="centertitle" ref="titletab"></titletab>
            </LazyTopbar>
            <!--<router-view @change="change"></router-view>-->
            <LazyKeep @change="change"></LazyKeep>
        </div>
    <!--</div>-->
</template>
<script type="es6">
    var vm;
    import titletab from '../components/titletab'
    export default {
        name: 'articleInfo',
        components: {
            titletab
        },
        data () {
            return {
                actid: '',
                json:{
                    left:[{
                        type : 'Button',
                        svg : '#icon-fanhui',
                        buttontype : 'text',
                        onclick : function() {
                            vm.$router.push("articleList");
                        }
                    }],
                    right:[
                        {
                            type : 'Button',
                            label : '编辑',
                            size:'small',
                            buttontype : 'primary',
                            onclick : function() {
                                vm.$router.push({
                                    path:"kong2",
                                    query:{
                                        actid: vm.actid,
                                        yulan: true
                                    }
                                });
                            }
                        }
                    ]
                },
                items1:[{name:"详情"},{name:"预览"}],
                right:[
                    {
                        type : 'Button',
                        label : '编辑',
                        size:'small',
                        buttontype : 'primary',
                        onclick : function() {
                            vm.$router.push({
                                path:"kong2",
                                query:{
                                    actid: vm.actid,
                                    yulan: true
                                }
                            });
                        }
                    }
                ]
            }
        },
        created: function(){
            vm = this;
            this.actid = this.$route.query.actid;
        },
        methods: {
            load(obj){
                if(obj.index == 1){
                    //this.$set(this.json,'right',this.right);
                    this.$router.push({
                        path:"articleLocalPreview",
                        query:{
                            actid:this.actid
                        }
                    });
                }else if(obj.index == 0){
                    this.$router.push({
                        path:"articleDetail",
                        query:{
                            actid:this.actid
                        }
                    });
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
 