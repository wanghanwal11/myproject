/**
* Created by bk on 2017/9/21.
*/
<template>
    <div style="height:100%">
        <LazyTopbar :data="json" style="position:fixed;top:0;z-index:11;padding-right:235px;">
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
        name: 'article',
        components: {
            titletab
        },
        data () {
            return {
                json:{},
                items1:[{name:"图文"},{name:"发现"},{name:"推送"}],
                right:[
                    {
                        type : 'Button',
                        label : '推送',
                        size:'small',
                        buttontype : 'primary',
                        onclick : function() {
                            vm.$router.push('articleSend');
                        }
                    }
                ],
                articleList: []
            }
        },
        computed: {
            isUpdateSend() {
                return this.$store.state.article.sendArticle;
            }
        },
        watch: {
            isUpdateSend(curVal, oldVal) {
                //从localStorage中取值
                this.articleList = JSON.parse(localStorage.sendItems);
                this.$set(this.items1[2],'count', this.articleList.length);
            }
        },
        created: function(){
            vm = this;
            try {
                this.articleList = JSON.parse(localStorage.sendItems);
            } catch (e) {
                this.articleList = [];
                localStorage.sendItems = JSON.stringify(this.articleList);
            }
            this.$set(this.items1[2],'count', this.articleList.length);
        },
        methods: {
            load(obj){
               if(obj.index == 1){
                this.$router.push("articleSearch")
               }else if(obj.index == 0){
                this.$router.push("articleList")
               } else if (obj.index == 2){
                   this.$router.push("articleSend")
               } else if(obj.index == 3) {
                   this.$router.push("sendHistory")
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
    .registerWarp {
        /*width: 100%;
        padding: 25px 15px 40px;
        margin: 0 auto;*/
        font-size: 14px;
    }
</style>
 