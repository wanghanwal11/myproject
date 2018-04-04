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
            <div style="" class="infoBox">
                <p>{{ reply }}</p>
            </div>
        </LazyLayout>
    </div>
</template>


<script>

    var vm;
    import myInfo from '../components/info'
    import Button from 'iview/src/components/button'

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
                reply:""
            }
        },

        created:function(){
            vm = this;
        },

        components:{
            myInfo,
            Button
        },

        methods:{
            getData(t){
                this.reply = t[2];
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

    .infoBox{
        height:148px;
        width:100%;
        padding-left:10px;
        border-radius:5px;
        background-color: #fff;
    }

</style>