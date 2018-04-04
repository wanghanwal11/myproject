/**
* Created by bk on 2017/4/20.
*/
<template>
        <div class="registerWarp reg">
                    <div class="container">
                        <div class="photoBox">
                            <svg class="photo-icon" style="margin-top: -5px;" aria-hidden="true">
                                <use xlink:href="#icon-xiangji1"></use>
                           </svg>
                             头像　　
                            <div class="photo">
                                <img :src="this.$store.state.nav.photo" alt=""/>
                                <div class="photoMask">
                                    <a href="javascript:;" class="a-upload">
                                        <input type="file" name="" id="file" @change="imgChange">
                                    </a>
                                    <!--<Upload action="//jsonplaceholder.typicode.com/posts/" class="a-upload">
                                        <Button type="ghost" icon="ios-cloud-upload-outline" @change="imgChange"></Button>
                                    </Upload>-->
                                    <svg class="photoMask-icon" aria-hidden="true">
                                        <use xlink:href="#icon-xiangji1"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="infoBox">
                            <svg class="photo-icon" aria-hidden="true">
                                <use xlink:href="#icon-quyu"></use>
                           </svg>
                             行政区域
                            <div class="showClose">
                                <input :disabled="isDisable" class="searchDistrict" v-model="inputDistrict" placeholder="请输入" ref="inputDistrict"  id="district" @focus="getOldValue"></input>
                                <div class="icon-close-box" @click="clearDistrict">
                                    <svg class="icon-close" aria-hidden="true">
                                        <use xlink:href="#icon-guanbi-copy"></use>
                                    </svg>
                                </div>
                            </div>
                            <ul class="division" :class="{hide: flag}">
                                <li v-for="district in districtList" @click="selectItem(district)">
                                    <div class="s-title">{{district.streetCommunityName}}</div>
                                    <div class="s-introduce">{{district.introduce}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="infoBox">
                            <svg class="photo-icon" aria-hidden="true">
                                <use xlink:href="#icon-cantingmingcheng"></use>
                           </svg>
                             系统名称
                            <input class="searchDistrict" v-model="systemName" placeholder="请输入" @blur="searchBlur" @keyup.enter="triggerBlur($event)" @focus="getOldValue"></input>
                        </div>
                        <div class="infoBox noicon">
                              负责人　
                            <!-- <input class="searchDistrict" v-model="PIC" placeholder="请输入" @blur="searchBlur" @keyup.enter="triggerBlur($event)" @focus="getOldValue" disabled='false' on-click="dropdown"></input> -->

                            <div @click="error(true)" style="display:inline-block;"><input class="searchDistrict" v-model="PIC" v-if="this.$store.state.userInfo.isAdmin != 1" placeholder="请输入" @focus="getOldValue" ref="user" disabled></input></div>

                            <Dropdown trigger="click" v-if="this.$store.state.userInfo.isAdmin == 1">
                                <a href="javascript:void(0)">
                                    <input class="searchDistrict" v-model="PIC" placeholder="请输入" @focus="getOldValue" ref="user" ></input>
                                    <!-- <Icon type="arrow-down-b"></Icon> -->
                                </a>
                                <DropdownMenu slot="list" >
                                    <DropdownItem v-for="items in userArrs">
                                        <li @click="clickDrop(items.userid,items.nickname,items.fullname)">{{ items.fullname ? items.fullname : items.nickname  }}</li>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div class="infoBox noicon">
                              电话　　
                            <input class="searchDistrict" v-model="telephone" placeholder="请输入"  @blur="validateTelephone" @keyup.enter="triggerBlur($event)" @focus="getOldValue"></input>
                        </div>
                        <div class="infoBox noicon">
                              地址　　
                            <input class="searchDistrict" v-model="address" placeholder="请输入"  @blur="searchBlur" @keyup.enter="triggerBlur($event)" @focus="getOldValue"></input>
                        </div>
                        <div class="infoBox">
                            服务热线　　
                            <input class="searchDistrict" v-model="hotline" placeholder="请输入"  @blur="searchBlur" @keyup.enter="triggerBlur($event)" @focus="getOldValue"></input>
                        </div>
                        <div class="infoBox">
                            三维地址　　
                            <input class="searchDistrict" v-model="swip" placeholder="请输入"  @blur="validateURL" @keyup.enter="triggerBlur($event)" @focus="getOldValue"></input>
                        </div>
                        <div class="textBox">
                            <div class="introduce">
                                <svg class="photo-icon" aria-hidden="true">
                                    <use xlink:href="#icon-order"></use>
                               </svg>
                                 介绍　　
                            </div>

                            <div class="textareaBox"><textarea class="textDistrict" v-model="communityInfo" placeholder="请输入"  @blur="searchBlur" @keyup.enter="triggerBlur($event)" @focus="getOldValue"></textarea></div>
                            <div class="clear"></div>
                        </div>

                    <div>
                        </div>
                    </div>

                <Modal v-model="modal2" width="360">
                    <!-- <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>删除确认</span>
                    </p> -->
                    <div style="text-align:center">
                        <p>是否更换{{ PIC  }}为管理员，需要重新登陆！</p>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long @click="genghuan()">确定</Button>
                    </div>
                </Modal>
        </div>
</template>
<script type="es6">
    import myTitle from '../components/title'
    import photoSrc from '../assets/images/photo.png'
    import myTag from '../components/tag'
    import {Row,Col} from 'iview/src/components/grid'
    import Spin from 'iview/src/components/spin'
    import Tabs from 'iview/src/components/tabs'
    import Modal from 'iview/src/components/modal'
    import Notice from 'iview/src/components/notice'
    import Icon from 'iview/src/components/icon'
    import TabPane from 'iview/src/components/tabs/pane'
    import Card from 'iview/src/components/card'
    import Dropdown from 'iview/src/components/dropdown'
    import Button from 'iview/src/components/button'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
   // debugger;
    //const TabPane = Tabs.pane;

    export default {
        name: 'communityInfo',
        components: {
            myTitle,
            myTag,
            Row,
            Col,
            Spin,
            Tabs,
            TabPane,
            Icon,
            Card,
            Dropdown,
            DropdownMenu,
            DropdownItem,
            Modal,
            Button,
            Notice
        },
        data () {
            return {
                src: photoSrc,
                flag: true,
                inputDistrict: '',
                systemName: '',
                cityList: [],
                districtList: [],
                currentDistrict: {},
                id: '',
                communityInfo: '',
                telephone: '',
                address: '',
                PIC: '',
                addflag: true,
                lableType:'',
                isFirst: true,
                tags: [],
                maskFlag: true,
                oldValue: '',
                serviceList: '',
                selectedServiceList: {},
                currentDrop: {},
                hotline: '',
                swip: '',
                userArrs :[],
                modal2 : false,
                currentuserid : "",
                isDisable: true
            }
        },
        created: function(){
            var vm = this;
            this.$emit("change",0); // 触发父组件communityInfo.vue的change方法
            this.getTag();
            var url = vm.$store.state.serverHost + 'cmy/cmy/sCommunityinfo/list';
            this.$http.get(url, {
                params: {
                    streetorcommunityid: this.$store.state.userInfo.streetorcommunityid,
                    streetorcommunity: this.$store.state.userInfo.streetorcommunity
                }
            })
                    .then(function (response) {
                        //console.log(response);
                        vm.$store.commit('updatePath', response.data.rows[0].photopath);
                        vm.inputDistrict = response.data.rows[0].communityname;
                        vm.systemName = response.data.rows[0].streetorcommunityname;
                        vm.communityInfo = response.data.rows[0].communityinfo;
                        vm.id = response.data.rows[0].id;
                        vm.telephone = response.data.rows[0].telphone;
                        vm.PIC = response.data.rows[0].manager;
                        vm.address = response.data.rows[0].address;
                        vm.hotline = response.data.rows[0].hotline;
                        vm.swip = response.data.rows[0].swip;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            //
            document.body.addEventListener('click',this.bodyClick);
            this.searchUser();


        },
        destroyed: function () {
            window.removeEventListener('click',this.bodyClick,false);
        },
        watch: {
            inputDistrict: {
                handler: function (val, oldVal) {
                    console.log(val);
                    var vm = this;
                    var url = vm.$store.state.serverHost + 'base/base/SStreet/getStreetAndCommunityList';
                    if (val) {
                        //console.log(this.$refs.inputDistrict.$refs);
                        if (document.activeElement.id == 'district') {
                            this.flag = false;
                            this.$http.get(url, {
                                params: {
                                    inputName: val
                                }
                            })
                                    .then(function (response) {
                                        console.log(response);
                                        console.log(vm.flag);
                                        vm.districtList = response.data.rows;
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                        }
                    } else {
                        this.flag = true;
                        this.systemName = "";
                    }
                }
            }
        },
        methods: {
            searchUser(){
                debugger;
                var vm = this;
                if(vm.$store.state.userInfo.isAdmin ==1){
                    var url = vm.$store.state.serverHost + 'uc/uc/tuser/getEmployeeByRealName';
                    this.$http.get(url, {
                        params: {
                            streetorcommunityid: this.$store.state.userInfo.streetorcommunityid,
                            streetorcommunity: this.$store.state.userInfo.streetorcommunity,
                            nickname : vm.PIC
                        }
                    })
                    .then(function(res){
                        debugger;
                        console.log(res);
                        vm.userArrs = res.data.rows;
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                }
            },
            bodyClick () {
                this.$set(this.currentDrop,'visible',false);
            },
            setVisible (service) {
                event.stopPropagation();
                this.$set(this.currentDrop,'visible',false); //将前一个被展开的dropList关闭
                this.$set(service,'visible',true);
                this.currentDrop = service;
            },
            addCommunityInfo: function () {
                console.log(this.$store.state.userInfo);
                var vm = this;
                var url = vm.$store.state.host3 + '/cmy/sCommunityinfo/add';
                this.$http.get('/zapi/cmy/sCommunityinfo/add', {
                    params: {
                        streetorcommunityid: this.currentDistrict.streetorcommunityid,
                        streetorcommityname: this.currentDistrict.streetCommunityName,
                        streetorcommity: this.currentDistrict.strretOrCommunity,
                        communityinfo: this.communityInfo,
                        streetorcommunityname: this.systemName,
                        telephone: this.telephone,
                        address: this.address
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            if (response.data) {
                                vm.upload(vm.id)
                                vm.$Notice.success({
                                    title: '修改成功!'
                                });
                            } else {
                                vm.$Notice.error({
                                    title: '修改失败'
                                });
                            }
                            //vm.$router.push('/list');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
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
                            var filePath =  response.data.filepath;
                            vm.$store.commit('updatePath',filePath);
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.maskFlag = true;
                        });
            },
            selectItem (district) {
                //console.log(district);
                this.inputDistrict = district.streetCommunityName;
                this.systemName = district.streetCommunityName + '系统';
                this.currentDistrict = district;
                //console.log(this.currentDistrict.streetCommunityName);
                this.searchBlur();
                this.isDisable = true;
            },
            searchBlur () {
                var vm = this;
                //debugger;
                if(this.oldValue === event.target.value){
                    console.log('没变化不调用接口')
                } else{
                    setTimeout(function () {
                        vm.flag = true;
                        debugger;
                        var url = vm.$store.state.serverHost + 'cmy/api/sCommunitymanager/saveCommunityInfo';
                        console.log(this.currentDistrict);
                        vm.$http.get(url, {
                            params: {
                                streetorcommunityid: vm.currentDistrict.streetCommunityId,
                                communityname: vm.currentDistrict.streetCommunityName,
                                streetorcommunity: vm.currentDistrict.strretOrCommunity,
                                communityinfo: vm.communityInfo,
                                streetorcommunityname: vm.systemName,
                                telphone: vm.telephone,
                                address: vm.address,
                                manager: vm.PIC,
                                id: vm.id,
                                hotline: vm.hotline,
                                swip: vm.swip
                            },
                            headers: {
                                'token': vm.$store.state.userInfo.access_token
                            }
                        })
                                .then(function (response) {
                                    console.log(response);
                                    if (response.data) {
                                        vm.$Notice.success({
                                            title: '社区信息修改成功!'
                                        });
                                        vm.$store.commit('updateSystemName',vm.systemName);
                                    } else {
                                        vm.$Notice.error({
                                            title: '社区信息修改失败'
                                        });
                                    }
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                    }, 100)
                }
            },
            triggerBlur: function (event) {
                console.log(event.target);
                event.target.blur();
            },
            validateTelephone: function(){
                var vm = this;
                var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                if(reg.test(vm.telephone)){
                    vm.searchBlur();
                }else{
                    vm.$Notice.error({
                        title: '请填写正确的手机号!'
                    });
                }
            },
            validateURL: function () {
                var vm = this;
                var reg = /[a-zA-z]+:////[^\s]*/;
                if(reg.test(vm.swip)){
                    vm.searchBlur();
                }else{
                    vm.$Notice.error({
                        title: '请填写正确的URL!',
                        desc: '例如:http://www.baidu.com'
                    });
                }
            },
            keydown (event) {
                console.log(event)
                if (event.which == 13){
                    event.target.blur();
                }

            },
            getTag () {
                var vm = this;
                var urlgetUserNumByHobbygroup = vm.$store.state.serverHost + 'base/hobby/BaseHobby/list';
                this.$http.get(urlgetUserNumByHobbygroup,{
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.tags = [];
                            for(var i = 0; i < response.data.rows.length; i++) {
                                var tempObject = {};
                                tempObject.id = response.data.rows[i].id;
                                tempObject.name = response.data.rows[i].hobby;
                                vm.tags.push(tempObject);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getOldValue () {
                this.oldValue = event.target.value;
            },
            clickDrop(id,name,funame){
                debugger
                this.modal2 = true;
                this.currentuserid = id;
                this.PIC = funame ? funame : name;
            },
            genghuan(){
                var vm =this;
                var url = vm.$store.state.serverHost + 'uc/api/user/transferManager';
                this.$http.get(url,{
                    params:{
                        employeeid : this.currentuserid
                    },
                    headers: {
                        'token': this.$store.state.userInfo.access_token
                    }
                })
                .then(function(data){
                    debugger;
                    console.log(data)
                    debugger;
                    if(data.data.isSucceed){
                        vm.$router.push('/');
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
            },
            error (nodesc) {
                this.$Notice.error({
                    title: '您不是当前负责人，不能更换负责人！'
                });
            },
            clearDistrict () {
                this.isDisable = false;
                this.inputDistrict = '';
            }
        }
    }

</script>
<style scoped>
    .registerWarp {
        width: 100%;
        padding: 25px 15px 40px;
        margin: 0 auto;
        font-size: 14px;
    }
    .container{
        padding: 60px 84px;
    }
    .photoBox{
        height: 120px;
        margin: 0 auto;
        line-height: 90px;
    }
    .photo-icon{
        width:20px;
        height: 20px;
        vertical-align: middle;
        fill: #a7c8ff;
    }
    .photo{
        width:120px;
        height: 120px;
        margin-left: 104px;
        display: inline-block;
        position: relative;
    }
    .photo:hover .photoMask{
        display: block;
    }
    .photoMask{
        width:120px;
        height: 120px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        display: none;
    }
    .photoMask-icon{
        width:32px;
        height: 28px;
        margin: 44px;
        fill: #fff;
        position: relative;
        z-index: 8;
    }
    .photo img{
        width:120px;
        height: 120px;
        vertical-align: top;
        border-radius:50%;
    }
    .infoBox{
        margin-top: 40px;
        position: relative;
    }
    .noicon{
        padding-left: 25px;
    }
    .division{
        width: 292px;
        max-height: 360px;
        position: absolute;
        top: 32px;
        left: 184px;
        z-index: 4;
        box-shadow: 0 5px 10px #aaa;
        background: #fff;
        overflow-y: auto;
    }
    .division li{
        padding: 10px 15px 5px;
        border-bottom: 1px solid #eee;
    }
    .division li:hover{
        cursor: pointer;
        background: #ccc;
    }
    .s-title{
        line-height: 20px;
    }
    .s-introduce{
        font-size: 16px;
        line-height: 20px;
        color: #999;
    }
    .textBox{
        margin-top: 40px;
        line-height: 20px;
    }
    .introduce{
        float: left;
    }
    .textareaBox{
        height: 96px;
        float: left;
    }



    .pBox{
        height:50px;
        background:#fff;
        border: 1px solid #d7dde4;
        color:#333;
        font-size:20px;
        position: relative;
        border-radius: 5px;
    }
    .pBox img{
        margin: 21px 13px 0 11px;
        vertical-align: top;
    }
    .pBox select{
        width: 84px;
        height: 33px;
        margin-top: 8px;
        padding: 0 10px;
        border: none;
        outline: none;
        border-right: 1px solid #d7dde4;
    }
    .pBox select option{
        height: 48px;
        line-height: 48px;
    }
    .sConten{
        width: 600px;
        max-height: 360px;
        position: absolute;
        top: 50px;
        left: 0px;
        box-shadow: 0 5px 10px #aaa;
        background: #fff;
        overflow-y: auto;
        z-index: 1;
    }
    .sConten li{
        padding: 10px 15px 5px;
        border-bottom: 1px solid #eee;
    }
    .sConten li:hover{
        cursor: pointer;
        background: #ccc;
    }


    .a-upload {
        width:120px;
        height: 120px;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        overflow: hidden;
        display: block;
        z-index: 99;
        opacity: 0;
        cursor: pointer;
        display: inline-block;
        *display: inline;
        *zoom: 1;
    }

    .a-upload  input {
        width: 100%;
        height: 100%;
        position: absolute;
        border-radius: 50%;
        right: 0;
        top: 0;
        opacity: 0;
        font-size: 100px;
        z-index: 9;
    }

    .sure{
        height:50px;
        margin-top:36px;
        background:#2c52ae;
        line-height: 56px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    .searchDistrict {
        width: 292px;
        height: 32px;
        margin-left: 104px;
        line-height: 32px;
        background: #F8F8F8;
        border: none;
        font-size: 12px;
        border-radius: 5px;
        padding: 4px 7px;
        color: #657180;
        outline: none;
    }
    .textDistrict{
        width: 705px;
        height: 96px;
        margin-left: 109px;
        line-height: 32px;
        background: #F8F8F8;
        border: none;
        font-size: 12px;
        border-radius: 5px;
        padding: 4px 7px;
        color: #657180;
        outline: none;
        resize:none;
    }
    .searchDistrict:hover,.textDistrict:hover{
        border-color: #5cadff;
        background: #ddd;
    }
    .clear{
        clear: both;
    }
    .icon-close{
        width:14px;
        height:14px;
        fill: #ccc;
    }
    .icon-close-box {
        position: absolute;
        right: 10px;
        top: 50%;
        display: none;
        transform: translate(0, -50%);
        cursor: pointer;
    }
    .showClose {
        display: inline-block;
        position: relative
    }
    .showClose:hover  .icon-close-box{
        display: block;
    }

</style>
