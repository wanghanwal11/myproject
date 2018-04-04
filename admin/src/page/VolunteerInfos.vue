/**
* Created by bk on 2017/6/30.
*/
<template>

    <div class="detailsWrap" style="background:#eeeeee;height:910px;position:absolute;top:0;left:0;right:0;
    bottom:0">
        <LazyTopbar :data="json" style="position:fixed;top:0px;left:0;right:0;z-index:1;padding-left:220px;"></LazyTopbar>

        <Row style="width:95%;height:850px;margin:0 auto;margin-top:38px;">
            <Col span="12" style="height:260px;background:#fff;border-top:1px solid #ccc;border-bottom:1px solid #ccc;border-left:1px solid #ccc;border-top-left-radius:5px;border-bottom-left-radius:5px;">
                <Card style="border:none;padding-left:30px;padding-top:49px;" dis-hover>
                   <dl class="info">
                    <dt style="position:relative;">
                        <img :src="logo" alt="">
                        <!-- <div class="photo">
                            <div class="photoMask">
                                <a href="javascript:;" class="a-upload">
                                    <input type="file" name="" id="file" style="opacity:0; filter:alpha(opacity=0); width: 150px;height:150px;margin-left:0;" @change="imgChange">
                                </a>
                                <svg class="photoMask-icon" aria-hidden="true">
                                    <use xlink:href="#icon-xiangji1"></use>
                                </svg>
                            </div>
                        </div> -->
                    </dt>
                    <dd>
                        <p style="font-size:20px;cursor:pointer;">{{ username }}  {{valTitle}}
                            <Tag color="blue"  class="tag" v-if="type == 1">企业</Tag>
                            <Tag color="red"  class="tag" v-if="type == 2">志愿者团队</Tag>
                            <Tag color="red"  class="tag" v-if="type == 3">便民服务团队</Tag>
                        </p>
                       <!--  <Input v-model="valTitle" placeholder="请输入..." style="width: 180px" v-if="flags" @on-blur="complete"></Input> -->


                        <p@click="displays" style="cursor:pointer">{{ legalname }} {{ sex }}  {{ age }}  {{ nation }} {{ valueName }}</p>
                        <!-- <Input  v-model="valueName" placeholder="请输入..." style="width: 180px" v-if="nameAges" @on-blur="completes"></Input> -->


                        <p @click="displayTime" style="cursor:pointer;">{{ businesstime }} {{ household }} {{ valueTime }}</p>
                       <!--  <Input v-model="valueTime" placeholder="请输入..." style="width: 180px" v-if="times" @on-blur="completeTime"></Input> -->

                    </dd>
                </dl>
                </Card>
            </Col>
            <Col span="12" style="height:260px;background:#fff;border-top:1px solid #ccc;border-bottom:1px solid #ccc;
            border-right:1px solid #ccc;border-top-right-radius:5px;border-bottom-right-radius:5px;">
                <!-- <Button type="info" style="float:right;margin:10px 10px 0 0" @click="saveInfo">保存</Button> -->
                <Card dis-hover style="margin-top:45px;margin-left:105px;border:none;border-left:1px solid #ccc;">
                    <div class="top">
                        <p>电话</p>
                        <p style="cursor:pointer;" v-if="pho">{{ phone }} {{ valuePhone }}</p>
                       <!--  <Input v-model="valuePhone" placeholder="请输入..." style="width: 180px" v-if="phones" @on-blur="completePhone"></Input> -->
                    </div>
                    <div class="bottom">
                        <p>地址</p>
                        <p style="cursor:pointer">{{ addre }}</p>

                        <!-- <Col span="12">
                            <Select
                                    @on-change="completeDizhi"
                                    v-if="dizhis"
                                    v-model="addre" ref="gps"
                                    label-in-value
                                    filterable
                                    remote
                                    :remote-method="searchAddress">
                                <Option v-for="option in options" :value="option.location" :label="option.name">
                                    <span>{{option.name}}</span>
                                    <span style="float:right;color:#ccc">{{option.district}}</span>
                                </Option>
                            </Select>
                        </Col> -->

                    </div>
                </Card>
            </Col>

            <Col span="24" style="margin-top:18px;">
                <div class="left" style="border:1px solid #ccc;border-radius:5px;">
                    <p class="titles">服务项目
                        <!-- <svg class="title-icon" aria-hidden="true" @click="getData">
                            <use xlink:href="#icon-tianjia"></use>
                        </svg> -->
                    </p>
                    <div class="left_content">
                      <ul>
                        <li v-for="item in server">{{ item.title }}</li>
                      </ul>
                    </div>
                </div>
                <div class="right" style="border:1px solid #ccc;border-radius:5px">
                    <p class="titles">订单</p>
                    <div class="right_content">
                       <Timeline style="margin:20px 0 0 20px;">
                            <Timeline-item v-for="i in order">
                                <p class="title" style="font-size:16px;margin-bottom:6px;">{{ new Date(parseInt(i.ordertime) * 1).toLocaleString().replace(/:\d{1,2}$/,' ') }}</p>
                                <p style="padding-left:15px;padding-bottom:5px;"><Rate style="font-size:15px;" disabled allow-half v-model="i.evaluate"></Rate></p>
                                <p class="content" style="padding-left:15px;">{{ i.username }}  订购了  {{ i.servicetype }}服务 {{ i.orderprice }}元</p>
                            </Timeline-item>
                        </TimeLine>
                    </div>
                </div>
            </Col>
        </Row>
        <!-- 遮罩 -->
        <!-- <alert-div v-if="showHide" @listenToChildDelEvent="hide" @data="datas"  :value="val"></alert-div> -->
    </div>
</template>
<script  type="es6">
    var vm;
    //import Timeline from 'iview/src/components/timeline'
    import Tag from 'iview/src/components/tag'
    import {Row,Col} from 'iview/src/components/grid'
    import Affix from 'iview/src/components/affix'
    import Timeline from 'iview/src/components/timeline'
    import TimelineItem from 'iview/src/components/timeline/timeline-item'
    import Card from 'iview/src/components/card'
    import Rate from 'iview/src/components/rate'
    import alertDiv from '../components/alertDiv'
    import Input from 'iview/src/components/input'
    import {Select,Option} from 'iview/src/components/select'
    import Button from 'iview/src/components/button'

    export default {
        name: 'VolunteerInfos',
        data (){
            return {
                server:[],
                id:"",
                username:"",
                businesstime:"",
                creditcode:"",
                age:"",
                sex:"",
                nation:"",
                idcard:"",
                household:"",
                date:"",
                addre:"",
                phone:"",
                servicetype:"",
                providerid:"",
                legalname:"",
                order:[],
                type:"",
                logo:"",
                value:"",
                showHide:"",
                flag:true,
                flags:"",
                nameAge:true,
                nameAges:"",
                time:true,
                times:"",
                pho:true,
                dizhi:true,
                dizhis:"",
                phones:"",
                valTitle:"",
                valueName:"",
                valueTime:"",
                valuePhone:"",
                options:[],
                gps:"",
                val:[],
                maskFlag:true,
                filePath:"",
                json:{
                    title:"详情",
                    left:[{
                          type : 'Button',
                          svg : '#icon-fanhui',
                          buttontype : 'text',
                          onclick : function() {
                              vm.$router.go(-1);
                          }
                    }]
                }
            }
        },
        components:{
            Tag,
            Row,
            Col,
            Affix,
            Timeline,
            TimelineItem,
            Card,
            Rate,
            alertDiv,
            Input,
            Select,
            Option,
            Button

        },
        created: function () {
            vm = this;
            vm.flags = false;
            //获取路由传过来的id
            this.id = this.$router.history.current.query.routeParams;

            //服务项内容
            var url = this.$store.state.serverHost + "support/sup/Supserviceprovider/get?id="+this.id;
             this.$http.get(url)
                    .then(function(response){
                        debugger
                        console.log(response)
                        //console.log(response.data.rows[0].communitytype)
                        vm.type = response.data.rows[0].type;

                        //企业名称
                        vm.name = response.data.rows[0].name;

                        //个人名称
                        vm.username = response.data.rows[0].name;

                        //年龄
                        vm.age = response.data.rows[0].age;

                        //性别
                        vm.sex = response.data.rows[0].sex;

                        //民族
                        vm.nation = response.data.rows[0].nation;

                        //身份证
                        vm.idcard = response.data.rows[0].idcard;

                        //营业时间
                        vm.businesstime = response.data.rows[0].businesstime;

                        //户口所在
                        vm.household = response.data.rows[0].household;

                        //地址
                        vm.addre = response.data.rows[0].address;

                        //电话号码
                        vm.phone = response.data.rows[0].phone;

                        //法人
                        vm.legalname = response.data.rows[0].legalname;

                        //信用代码
                        vm.creditcode = response.data.rows[0].creditcode

                        //logo
                        vm.logo = response.data.rows[0].logo

                        //取到每一项的服务项
                        for(var i=0; i<response.data.rows[0].supProviderList.length; i++){
                            vm.server = vm.server.concat(response.data.rows[0].supProviderList[i].supProviderServiceList)
                            debugger
                            console.log(vm.server)
                           //父组件准备向子组件传递的数组
                            vm.val=vm.server;
                        }
                    })

                    .catch(function(error){
                        console.log(error)
                    })


            //订单内容
            var orderUrl = this.$store.state.serverHost + "order/SupProviderOrder/SupProviderOrder/listOfOrder?providerid=" + this.id;
            this.$http.get(orderUrl)
                      .then(function(res){
                        console.log(res)
                          for(var i=0; i<res.data.rows.length; i++){
                              vm.order = vm.order.concat(res.data.rows[i])
                          }
                      })
                    .catch(function(error){
                        console.log(error);
                    })
        },

        methods: {

            //子组件传递过来的值
            // getData(){
            //     vm.showHide = true;
            // },

            //子组件传递过来的值
            // hide(data){
            //     vm.showHide = data;
            // },

            //子组件传递过来的值
            // datas(dat){
            //     vm.server = dat;
            //     vm.val=vm.server;
            // },

            //修改企业名称
            // display(){
            //     vm.flag = false;
            //     vm.flags = true;
            // },

            // complete () {
            //     vm.flags = false;
            //     vm.flag = true;
            //     vm.username = "";
            // },

            // //修改人名 年龄
            // displays(){
            //     vm.nameAge = false;
            //     vm.nameAges = true;
            // },
            // completes(){
            //     vm.nameAges = false;
            //     vm.nameAge = true;
            //     vm.legalname = "";
            //     vm.sex = "";
            //     vm.age = "";
            // },

            // //修改时间
            // displayTime(){
            //     vm.time = false;
            //     vm.times = true;
            // },
            // completeTime(){
            //     vm.time = true;
            //     vm.times = false;
            //     vm.businesstime = "";
            // },

            // //修改电话
            // displayPhone(){
            //     vm.pho = false;
            //     vm.phones = true;
            // },
            // completePhone(){
            //     vm.phones = false;
            //     vm.pho = true;
            //     vm.phone = "";
            // },

            //修改地址
            // displayAddress(){
            //     vm.dizhi = false;
            //     vm.dizhis = true;
            // },
            // completeDizhi(val){
            //     vm.dizhis = false;
            //     vm.dizhi = true;
            //     debugger;
            //     console.log(val.label);
            //     vm.addre = val.label;
            //     vm.gps = val.value;
            // },

            //远程搜索地址
            // searchAddress (query) {
            //     if (query !== '') {
            //         var url = 'http://restapi.amap.com/v3/assistant/inputtips';
            //         this.$http.get(url,{
            //             params:{
            //                 key : '28db175679cb08e7eecbfaac315294e2',
            //                 keywords : query
            //             }
            //         })
            //             .then(function(response){
            //                 debugger;
            //                 for(var i = 0; i < response.data.tips.length; i++) {
            //                     if(typeof response.data.tips[i].location === "object"){
            //                         (function() {
            //                             vm.$http.get("http://restapi.amap.com/v3/geocode/geo",{
            //                                 params:{
            //                                     key : '28db175679cb08e7eecbfaac315294e2',
            //                                     address : response.data.tips[i].district
            //                                 }
            //                             })
            //                                     .then(function (response) {
            //                                         debugger;
            //                                         console.log(response)
            //                                         //vm.gps = response.data.geocodes[0].location;
            //                                         //console.log(vm.gps)
            //                                     })
            //                                     .catch(function (error) {
            //                                         console.log(error);
            //                                     })
            //                         })(response.data.tips[i]);
            //                     }
            //                 }
            //                 vm.options = response.data.tips;
            //             })
            //             .catch(function (error) {
            //                 console.log(error);
            //             })
            //     }
            // },

            //上传修改头像
            imgChange: function (e) {
                debugger;
                this.maskFlag = false;
                var file = e.target.files || e.dataTransfer.files;
                console.log(e.target.value);
                console.log(file);
                if (typeof FileReader === 'undefined') {
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function (e) {
                        console.log(e.target.result);
                        console.log(typeof e.target.result);
                        vm.src = e.target.result;
                        vm.upload(vm.id);
                    };
                }
            },
            upload (id) {
                var vm = this;
                var fileObj = document.getElementById("file").files[0];
                var form = new FormData();
                form.append("file", fileObj);
                form.append("id", id);
                var url = this.$store.state.serverHost + 'cmy/cmy/sCommunityinfo/uploadCommunityPic';
                this.$http.post(url, form)
                        .then(function (response) {
                            console.log(response);
                            vm.maskFlag = true;
                            debugger;
                            vm.filePath =  response.data.filepath;
                            //vm.$store.commit('updatePath',filePath);
                            debugger;
                            vm.logo = vm.filePath;
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.maskFlag = true;
                        });
            },

            //保存编辑后的信息
            // saveInfo(){
            //     debugger
            //     var url = this.$store.state.serverHost + "support/SupProviderService/SupProviderService/saveProviderService?id=" + this.id;
            //     this.$http.get(url,{
            //         params:{

            //         }
            //     })
            //         .then(function(){
            //             alert("保存成功！")
            //         })

            //         .catch(function(err){
            //             console.log(err);
            //         })
            // }

        }
    }

</script>
<style scoped>

/* 上传头像 */
    .photo{
        width: 150px;
        height: 150px;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0
    }

    .photo:hover .photoMask{
        display: block;
        cursor: pointer;
    }

    .photo img{
        width:150px;
        height: 150px;
        vertical-align: top;
    }

    .photoMask{
        width:150px;
        height: 150px;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        display: none;
    }

    .photoMask-icon{
        width: 40px;
        height: 40px;
        fill: #fff;
        position: absolute;
        top:50px;
        left:58px;
        z-index: -1;
        cursor: pointer;
    }
/* 上传头像 */

    .title-icon{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
        fill: #686868;
        margin:16px 12px 0 0;
        float: right;
    }

    .tag{
        margin:0 0 6px 9px;
    }
    .info dt{
        width:150px;
        height:150px;
        border:1px solid #ccc;
        float: left;
        margin-right:20px;
    }
    .info dt img{
        width:150px;
        height:150px;
    }
    .info dd p{
        line-height: 39px;
    }
    .top{
        margin:25px 0 25px 20px;
        font-size:15px;
        line-height: 35px;
    }
    .bottom{
        margin:20px 0 20px 20px;
        font-size:15px;
        line-height: 35px;
    }
    .left{
        width:30%;
        height:540px;
        background: #fff;
        float: left;
    }
    .right{
        width:68.7%;
        height:540px;
        background: #fff;
        float: right;
    }
    .right_content::-webkit-scrollbar{
        width: 2px;
        height: 2px;
        background-color: #fff;
      }
    .right_content::-webkit-scrollbar-track{
        border-radius: 10px;
        background-color: #fff;
        }
    .right_content::-webkit-scrollbar-thumb{
        height: 20px;
        border-radius: 10px;
        }
    .titles{
        height:52px;
        line-height: 52px;
        font-size:14px;
        border-bottom:1px solid #ccc;
        padding-left:15px;
    }
    .right_content{
        height:476px;
        overflow: auto;
    }
    .left ul{
        margin:20px 0 0 38px;
        overflow: hidden;
    }
    .left ul li{
        height:30px;
        border:1px solid #ccc;
        float: left;
        line-height: 30px;
        text-align:center;
        margin-right:9px;
        margin-bottom:10px;
        padding: 0 5px;
    }
    .left_content{
        height:523px;
        overflow: auto;
    }
    .left_content::-webkit-scrollbar{
        width: 2px;
        height: 2px;
        background-color: #fff;
      }
    .left_content::-webkit-scrollbar-track{
        border-radius: 10px;
        background-color: #fff;
        }
    .left_content::-webkit-scrollbar-thumb{
        height: 20px;
        border-radius: 10px;
    }


</style>