/**
* Created by bk on 2017/8/23.
*/
<template>
    <div class="notice">
        <div style="height:45px;">
            <LazyTopbar :data="json"></LazyTopbar>
        </div>
          <!-- <Input type="textarea" :rows="4" placeholder="请输入..." v-model="notice" style="padding:20px 20px 0 20px;"></Input> -->
          <textarea name="" id="" cols="30" rows="10" v-model="notice" style="padding:20px 20px 0 20px;width:100%;height:500px;"></textarea>
         <Button type="primary" @click="save" style="float:right;margin:10px 20px 0 0">保存</Button>
    </div>
</template>

<script>
   
    var vm;
    import Input from 'iview/src/components/input'
    import Button from 'iview/src/components/button'
    
    export default {

        data () {
            return {
                json:{
                    title:"诉求须知",
                    left:[{
                          type : 'Button',
                          svg : '#icon-fanhui',
                          buttontype : 'text',
                          onclick : function() {
                              vm.$router.go(-1);
                          }
                    }]
                },
                notice:"",
                id:""
            }
        },

        created:function(){
            vm = this; 
            vm.search()
        },
        components:{
            Input,
            Button
        },

        methods:{
            save(){
                var url = this.$store.state.serverHost + this.$lazy.url.noticeSave;
                this.$get(url, {
                    initid: vm.$store.state.communityDetail.initid, 
                    eventdirectory:vm.notice,
                    id:vm.id
                },function(data){
                    console.log(data.rows[0])
                    alert("保存成功") 
                }); 
            },
            search(){
                var url = this.$store.state.serverHost + this.$lazy.url.getNotice;
                this.$get(url, {
                    initid: vm.$store.state.communityDetail.initid
                },function(data){
                    debugger
                    console.log(data.rows[0]) 
                    vm.notice = data.rows[0].eventdirectory;
                    vm.id = data.rows[0].id
                });
            }
        }

    }
</script>


<style scoped>

    .myTabs{
        cursor:pointer;
        width:100%;
        height:100%;
        overflow:auto;
    }

    .myTabs::-webkit-scrollbar{
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .myTabs::-webkit-scrollbar-track{
        border-radius: 10px;
        background-color: #fff;
    }
    .myTabs::-webkit-scrollbar-thumb{
        height: 20px;
        border-radius: 10px;
        background: #ccc
    }

    .LazyLayout{
        width:100%;
        height:100%;
        box-sizing:border-box;
    }
    .branch{
        width: 240px;
        min-height: 100%;
        padding-bottom: 20px;
        border-left: 1px solid #ddd;
        background: #fff;
    }
    .reset{
        height: 66px;
        line-height: 66px;
        padding: 0 10px;
        border-bottom: 1px solid #d7dde4;
    }
    .reset span{
        float: right;
        cursor: pointer;
    }
    .title-icon{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
        fill: #333;
    }
    .searchType{
        padding: 15px;
        font-size: 14px;
        font-weight:bolder;
    }
    .orderState {
        display: inline-block;
        height: 18px;
        min-width:40px;
        line-height: 18px;
        margin: 2px 4px 2px 0;
        /*border: 1px solid #e9eaec;*/
        border-radius: 3px;
        background: #f7f7f7;
        text-align:center;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
    }
    .orderInfo {
       display: inline-block;
    }

    .tabs{
        padding:10px 20px;
        box-sizing:border-box;
    }

</style>