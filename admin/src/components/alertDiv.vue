/**
* Created by bk on 2017/8/29.
*/
<template>
    <div>
        <div class="alertContent">
            <div class="serverType">
                <div class="title">
                    服务类型
                </div>
                <div class="serverLeft">
                    <div class="sub_box" v-for="item in serverList">
                        <p style="height:30px;line-height30px;padding-left:20px;font-size:14px;cursor:pointer" @click="tract(item)">{{ item.title }}</p>
                        <li v-for="(items,i) in item.supProviderList" v-if="item.backflag" @click="clickMe(items,item.supProviderList)">{{ items.title }}</li>
                    </div>
                </div>
                <div class="serverRight">
                    <div class="serverRight_top">
                        <li v-for="(i,ind) in myArr" >
                            {{ i.title }}
                            <span style="padding-left:10px;" @click="del(i,ind,myArr)"> X </span>
                        </li> 
                    </div> 
                    <div class="serverRight_bottom">
                        <div class="determine" @click="queding">确定</div>
                        <div class="cancel" @click="quxiao">取消</div>
                    </div> 
                </div>
            </div>
        </div>  
    </div>
</template>
<script  type="es6">
    var vm,typearr=[];
    export default {
        name: 'VolunteerInfos',
        data (){
            return {
                serverList:[],
                myArr:[],
                leftArr:[],
                rightArr:[],
                typeid:"",
                providerid:"",
                providername:""
            }
        },
        props:['value'],
        components:{
           
        },
        created: function () {
            vm = this;
            var left_title,right_title;
            
            //循环父组件中传递过来的value数组
            for(var j=0; j<this.value.length; j++){
                this.myArr.push(this.value[j]);
            }
            
            //获取所有的服务项
            var url = this.$store.state.serverHost + this.$lazy.url.serverList;  
            this.$get(url, {
                       communityid:vm.$store.state.userInfo.streetorcommunityid,
                       communitytype:vm.$store.state.userInfo.streetorcommunity
                    },function(data){
                        vm.serverList = vm.serverList.concat(data.rows);
                        debugger;
                        for(var i=0; i<vm.myArr.length; i++){
                            debugger;
                            right_title = vm.myArr[i].title;
                            debugger
                            vm.rightArr.push(right_title);
                        }

                        for(var i=0; i<vm.serverList.length; i++){
                            var childTitle = vm.serverList[i].supProviderList;
                            for(var j in childTitle){
                                debugger;
                                left_title = childTitle[j].title;
                                //如果能找到，就从数组中截取
                                if(vm.rightArr.indexOf(left_title) > -1) {
                                    childTitle.splice(childTitle.indexOf(childTitle[j]), 1);
                                }
                            }
                        }

                    },function(e) {
                        console.log(e);
                    }); 

            //获取子服务的typeid
            for(var i=0; i<vm.myArr.length; i++){
                debugger;
                console.log(vm.myArr[i])
                vm.typeid = vm.myArr[i].typeid;
                vm.providerid = vm.myArr[i].providerid;
                vm.providername = vm.myArr[i].providername;
            }
        },

        methods: {

            //点击取消让遮罩消失
            quxiao(){
                this.$emit('listenToChildDelEvent', false); 
            },

            //点击显示隐藏
            tract (item) {
                vm.$set(item, 'backflag', !item.backflag);
            },

            //点击从左向右添加服务
            clickMe(ite,cli){
                vm.myArr.push(ite);
                cli.splice(cli.indexOf(ite), 1);
                vm.arrs = cli;
            },

            //删除
            del(j,ind,arr){
                arr.splice(arr.indexOf(j),1);
                for(var i=0; i<vm.serverList.length; i++){
                    //对应的服务到其父类之下
                    if(j.parentid == vm.serverList[i].typeid) {
                        vm.serverList[i].supProviderList.push(j);
                    }
                }
            },

            //确定
            queding(){
                this.$emit('data', vm.myArr);
                this.$emit('listenToChildDelEvent', false);
                //保存接口
                 var url =   this.$store.state.serverHost + "support/SupProviderService/SupProviderService/saveProviderService";
                this.$http.get(url,{
                    params:{
                        communitytype : vm.$store.state.userInfo.streetorcommunity,
                        communityid :  vm.$store.state.userInfo.streetorcommunityid,
                        typeid : vm.typeid,
                        providerid : vm.providerid,
                        providername : vm.providername
                    }
                })
                .then(function(res){
                    alert("服务保存成功")
                })
                .catch(function(err){
                    console.log(err);
                })
            }

        }
    }

</script>
<style scoped>
li{
    list-style: none;
}
.alertContent{
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    right:0;
    bottom:0;
    left:0;
    z-index:1000;
    //display: none;
  }
  .serverType{
    width:760px;
    height:441px;
    background: #fff;
    border-radius:10px;
    margin:15% auto;
  }
  .title{
    height:60px;
    border-bottom:1px solid #e3e8ee;
    line-height: 60px;
    padding-left:20px;
  }
  .serverLeft{
    width:195px;
    height:380px;
    float: left;
    border-right:1px solid #e3e8ee;
    overflow:auto;

  }
  .serverRight{
    width:565px;
    height:380px;
    float: right;
  }
  .serverRight_top{
    height:314px;
    overflow:hidden;
    padding:20px;
  }
  .serverRight_bottom{
    height:66px;
  }
  .serverRight_bottom div{
    width:88px;
    height:32px;
    float: right;
    text-align:center;
    line-height: 32px;
    margin-right:31px;
  }
  .determine{
    background: #3c7ce6;
    border-radius: 5px;
    color:#fff;
    cursor: pointer;
  }
  .cancel{
    cursor: pointer;
  }
  .sub_box{
    margin-top:10px;
  }
  .type{
    padding-left:20px;
    color:#666666;
    font-size:14px;
    cursor: pointer;
    height:30px;
    line-height: 30px;
  }
  .sub_box li{
    padding-left:35px;
    color:#666;
    font-size:13px;
    line-height: 30px;
    cursor: pointer;
  }
  .hide{
    display: none;
  }
  .serverRight_top li{
    float: left;
    width:88px;
    height:28px;
    border-radius:5px;
    border:1px solid #ead483;
    margin-left:14px;
    text-align:left;
    line-height: 28px;
    padding-left:7px;
    margin-bottom:20px;
    font-size:11px; 
    position: relative;
    background: #fef6ce;
    cursor: pointer;
  }
  .box{
    height:30px;
  }
  .clo{
    display: block;
    width: 26px;
    height: 26px;
    border-left: 1px solid #ead483;
    text-align: center;
    line-height: 26px;
    float: right;
  }
  .serversLeft{
    width:1030px;
    height:110px;
    overflow:auto;
    margin-left:60px;
  }

  .serversLeft::-webkit-scrollbar{
    width: 2px;
    height: 2px;
    background-color: #fff;
  }
  .serversLeft::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #fff;
    }
  .serversLeft::-webkit-scrollbar-thumb{
    height: 20px;
    border-radius: 10px;
    }

  .serversLeft li{
    line-height: 10px;
  }

.sub_box{
    margin-top:10px;
  }
</style>