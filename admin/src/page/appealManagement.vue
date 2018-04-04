/**
* Created by bk on 2017/8/15.
*/
<template>
    <div class="appealDetails">
        <div style="height:45px;">
            <LazyTopbar :data="json" style="position:fixed;top:45px;z-index:1" ></LazyTopbar>
        </div>
        <my-info @getData="getData"></my-info>
        <LazyLayout orient="v" class="wraps">
            <div style="width:100%;border:1px solid #ccc;border-radius:5px;">
                <div class="title">
                    <span>
                        <svg class="title-icon" aria-hidden="true">
                            <use xlink:href="#icon-huifu"></use>
                        </svg>
                        <span style="padding-left:5px;">回复</span>
                    </span>
                </div>
                <div class="content">
                    <textarea class="textarea" rows="6" v-model="text" placeholder="请输入您的办理内容"></textarea>
                </div>
            </div>

            <LazyLayout class="btns" justify="end">
                 <div style="margin:25px 0 15px 0">
                    <Button type="primary" style="padding:5px 35px 5px 35px;font-size:12px;margin-right:13px;" @click="banli('4')">办理</Button>
                    <Button type="info" style="padding:5px 35px 5px 35px;font-size:12px" @click="zhuanban('2')">转办</Button>
                 </div>
            </LazyLayout>
        </LazyLayout>
    </div>
</template>


<script>
    var vm;
    import myInfo from '../components/info'
    import Button from 'iview/src/components/button'
    import Input from 'iview/src/components/input'
    

    export default {

        data () {
            return {
                json:{
                    title:"诉求",
                    left:[{
                        type : 'Button',
                        svg : '#icon-fanhui',
                        buttontype : 'text',
                        onclick : function() {
                                vm.$router.go(-1)
                        }
                    }]
                },
                text:"",
                id:0,
            }
        },

        created:function(){
            vm=this;
        },

        components:{
            myInfo,
            Button,
            Input
        },

        methods:{
            getData(t) {
                this.id = t[0]
            },
            banli(index){

                if(!this.id){
                    alert("提交失败");
                    return false;
                }else if(this.text == ""){
                    alert("回复不能为空！")
                }

                if(this.text){
                    alert("办理成功");
                    vm.$router.push({
                        path:'appealInfo'
                    })
                }

                var url = this.$store.state.serverHost + this.$lazy.url.wechat;
                this.$get(url, {
                    reply:vm.text,
                    id : vm.id
                },function(){
                    vm.$router.push({
                                    path:"appealInfo",
                                    query:{
                                        index:index
                                    }
                                });
                },function(e) {
                    console.log(e);
                });
            },
            zhuanban(index){
                alert("转办成功")
                vm.$router.push({
                    path:'appealInfo'
                })
                var url = this.$store.state.serverHost + this.$lazy.url.weixineventzhuan;
                this.$get(url, {
                    eventid:vm.id
                },function(){
                    this.$router.push({
                                    path:"appealInfo",
                                    query:{
                                        index:index
                                    }
                                });
                },function(e) {
                    console.log(e);
                });
            }
        }

    }
</script>


<style scoped>

    .wraps{
        padding: 0 30px 0 30px ;
        box-sizing: border-box;
        min-width:950px; 
    }

    .title{
        width:100%;
        height:40px;
        border-bottom:1px solid #ccc;
        line-height: 40px;
        padding-left:9px;
    }

    .title-icon{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
        fill: #686868;
        margin-top:-2px;
    }

    .content{
        height:auto;
        padding:10px;
        box-sizing:border-box;
        background-color: #fff;
    }
    .textarea {
        border: none;
        background: none;
        width: 100%;
        outline:none;
        line-height: 1.5;
    }
    .btns{

    }
    

</style>