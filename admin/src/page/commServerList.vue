/**
* Created by bk on 2017/4/20.
*/
<template>
        <div class="registerWarp">
                <Row :gutter="15">
                    <Col span="12" v-for="service in serviceList" style="margin-bottom: 15px;">
                        <Card>
                            <p slot="title">
                                {{service.title}}
                            </p>
                            <Dropdown placement="bottom-end" trigger="custom" :visible="service.visible" slot="extra" @on-click="selectServices" style="margin-left: 20px">
                                <a href="javascript:void(0)" @click="setVisible(service)">
                                    添加
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <Dropdown-menu slot="list">
                                    <Dropdown-item :disabled="subService.disabled" v-for="(subService,key) in service.supCodeList" :name="JSON.stringify(subService)">{{subService.title}}</Dropdown-item>
                                </Dropdown-menu>
                            </Dropdown>
                            <div class="cardBody">
                                <div class="serviceInfo" v-for="selectedService in selectedServiceList[service.id]">
                                    <span style="margin-right: 8px;">{{selectedService.title}}</span>
                                    <svg class="del-icon" aria-hidden="true" @click="delService(selectedService)"><use xlink:href="#icon-guanbi-copy"></use></svg>
                                    <svg class="editor-icon" aria-hidden="true" @click="openModal(selectedService)"><use xlink:href="#icon-bianji"></use></svg>
                                    <div style="float: right"><input class="servicePrice" v-model="selectedService.price" placeholder="请输入" @blur="savePriceBlur(selectedService)" @keyup.enter="triggerBlur($event)" @focus="getOldValue">元</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            <Modal width="900"
                    v-model="isOpenModal"
                    title="服务描述"
                    @on-ok="saveServiceDetail"
                    @on-cancel="cancleModel">
                <quill-editor v-model="serviceContent"
                              ref="myQuillEditor"
                              :config="editorOption" style="height: 500px">
                </quill-editor>
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
    import Icon from 'iview/src/components/icon'
    import TabPane from 'iview/src/components/tabs/pane'
    import Card from 'iview/src/components/card'
    import Dropdown from 'iview/src/components/dropdown'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
    import Modal from 'iview/src/components/modal'
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
            Modal
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
                isOpenModal: false,
                serviceContent: '',
                editorOption: {
                    // some quill options
                },
                parentid: ''
            }
        },
        created: function(){
            var vm = this;
            this.$emit("change",1); // 触发父组件communityInfo.vue的change方法
            //this.getTag();
            //vm.inputDistrict = 111;
            //var url = vm.$store.state.serverHost + 'cmy/cmy/sCommunityinfo/list';
            //this.$http.get(url, {
            //    params: {
            //        streetorcommunityid: this.$store.state.userInfo.streetorcommunityid,
            //        streetorcommunity: this.$store.state.userInfo.streetorcommunity
            //    }
            //})
            //        .then(function (response) {
            //            console.log(response);
            //            vm.inputDistrict = response.data.rows[0].communityname;
            //            vm.systemName = response.data.rows[0].streetorcommunityname;
            //            vm.communityInfo = response.data.rows[0].communityinfo;
            //            vm.id = response.data.rows[0].id;
            //            vm.telephone = response.data.rows[0].telphone;
            //            vm.PIC = response.data.rows[0].manager;
            //            vm.address = response.data.rows[0].address;
            //        })
            //        .catch(function (error) {
            //            console.log(error);
            //        });
            this.searchServiceType();
            //
            document.body.addEventListener('click',this.bodyClick);
        },
        destroyed: function () {
            window.removeEventListener('click',this.bodyClick,false);
        },
        //watch: {
        //    inputDistrict: {
        //        handler: function (val, oldVal) {
        //            console.log(val);
        //            var vm = this;
        //            var url = vm.$store.state.serverHost + 'base/base/sStreet/getStreetAndCommunityList';
        //            if (val) {
        //                //console.log(this.$refs.inputDistrict.$refs);
        //                if (document.activeElement.id == 'district') {
        //                    this.flag = false;
        //                    this.$http.get(url, {
        //                        params: {
        //                            inputName: val
        //                        }
        //                    })
        //                            .then(function (response) {
        //                                console.log(response);
        //                                console.log(vm.flag);
        //                                vm.districtList = response.data.rows;
        //                            })
        //                            .catch(function (error) {
        //                                console.log(error);
        //                            });
        //                }
        //            } else {
        //                this.flag = true;
        //                this.systemName = "";
        //            }
        //        }
        //    }
        //},
        methods: {
            bodyClick () {
                this.$set(this.currentDrop,'visible',false);
            },
            setVisible (service) {
                event.stopPropagation();
                this.$set(this.currentDrop,'visible',false); //将前一个被展开的dropList关闭
                this.$set(service,'visible',true);
                this.currentDrop = service;
            },
            //selectItem (district) {
            //    //console.log(district);
            //    this.inputDistrict = district.streetCommunityName;
            //    this.systemName = district.streetCommunityName + '系统';
            //    this.currentDistrict = district;
            //    //console.log(this.currentDistrict.streetCommunityName);
            //},
            //getTag () {
            //    var vm = this;
            //    var urlgetUserNumByHobbygroup = vm.$store.state.serverHost + 'base/hobby/BaseHobby/list';
            //    this.$http.get(urlgetUserNumByHobbygroup,{
            //        params: {
            //            communityid: this.$store.state.userInfo.streetorcommunityid,
            //            communitytype: this.$store.state.userInfo.streetorcommunity
            //        }
            //    })
            //            .then(function (response) {
            //                console.log(response);
            //                vm.tags = [];
            //                for(var i = 0; i < response.data.rows.length; i++) {
            //                    var tempObject = {};
            //                    tempObject.id = response.data.rows[i].id;
            //                    tempObject.name = response.data.rows[i].hobby;
            //                    vm.tags.push(tempObject);
            //                }
            //            })
            //            .catch(function (error) {
            //                console.log(error);
            //            });
            //},
            getOldValue () {
                this.oldValue = event.target.value;
            },
            searchServiceType: function () {
                var vm = this;
                var url =   this.$lazy.url.host + this.$lazy.url.supcodeslist;
                this.$http.get(url)
                        .then(function(response){
                            //console.log(response.data.rows);

                            vm.serviceList = response.data.rows;
                            console.log(vm.serviceList);
                            vm.getSelService();
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
            },
            selectServices (service) {
                event.stopPropagation();
                var temp = JSON.parse(service);
                //debugger;
                if(temp.disabled) {
                    this.$Message.info('已经添加');
                } else {
                    if(this.selectedServiceList[temp.parentid]) {
                        //this.selectedServiceList[temp.parentid].push(temp);
                        this.saveServices(temp);
                    } else {
                        this.$set(this.selectedServiceList, temp.parentid, []);
                        //this.selectedServiceList[temp.parentid].push(temp);
                        this.saveServices(temp);
                    }

                    //for(var i = 0; i < this.serviceList.length; i++) {
                    //    for(var j = 0; j < this.serviceList[i].supCodeList.length; j++) {
                    //        if(this.serviceList[i].supCodeList[j].id == temp.id) {
                    //            this.$set(this.serviceList[i].supCodeList[j], 'disabled', true);
                    //        }
                    //    }
                    //}
                }
            },
            saveServices (service) {
                //debugger;
                var vm = this;
                var url = this.$lazy.url.host + this.$lazy.url.saveCommunityService;
                // this.$http.get(url, {
                //     params: {
                //         id: service.id,
                //         parentid: service.parentid,
                //         price: service.price,
                //         communityid: this.$store.state.userInfo.streetorcommunityid,
                //         communitytype: this.$store.state.userInfo.streetorcommunity
                //     }
                // })
                //         .then(function (response) {
                //             console.log(response);
                //             //service.id = response.data.newPrimaryKeys.id;
                //             //vm.selectedServiceList[service.parentid].push(service);
                //             vm.getSelService();
                //         })
                //         .catch(function (error) {
                //             console.log(error);
                //         });
                //         
                    vm.$get(url,{
                         id: service.id,
                         parentid: service.parentid,
                         price: service.price,
                         communityid: vm.$store.state.userInfo.streetorcommunityid,
                         communitytype: vm.$store.state.userInfo.streetorcommunity
                    },function(response){
                        //debugger
                        console.log(response);
                        vm.getSelService();
                    },function(err){
                        console.log(err);
                    })

            },
            savePriceBlur (service) {
                var vm = this;
                //debugger;
                if(this.oldValue === event.target.value){
                    console.log('没变化不调用接口');
                } else {
                    var url = this.$lazy.url.host + this.$lazy.url.savePrice;
                    this.$http.get(url, {
                        params: {
                            id: service.id,
                            price: service.price
                        }
                    })
                            .then(function (response) {
                                console.log(response);
                                vm.$Message.success('修改成功');
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }
            },
            getSelService () {
                var vm = this;
                var url = this.$lazy.url.host + this.$lazy.url.getSecLevelService;
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.selectedServiceList = {};
                            for(var i = 0; i < response.data.rows.length; i++) {
                                //将已添加过的服务项目，在card中展示出来
                                if(vm.selectedServiceList[response.data.rows[i].parentid]) {
                                    vm.selectedServiceList[response.data.rows[i].parentid].push(response.data.rows[i]);
                                } else {
                                    vm.$set(vm.selectedServiceList, response.data.rows[i].parentid, []);
                                    vm.selectedServiceList[response.data.rows[i].parentid].push(response.data.rows[i]);
                                }
                                //将已添加过的服务项目，设置成disabled
                                for(var k = 0; k < vm.serviceList.length; k++) {
                                    for(var j = 0; j < vm.serviceList[k].supCodeList.length; j++) {
                                        if(vm.serviceList[k].supCodeList[j].id == response.data.rows[i].typeid) {
                                            vm.$set(vm.serviceList[k].supCodeList[j], 'disabled', true);
                                        }
                                    }
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            delService (service) {
                var vm = this;
                var url = this.$lazy.url.host + this.$lazy.url.delSecService;
                this.$http.get(url, {
                    params: {
                        id: service.id
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            for(var k = 0; k < vm.serviceList.length; k++) {
                                for(var j = 0; j < vm.serviceList[k].supCodeList.length; j++) {
                                    vm.$set(vm.serviceList[k].supCodeList[j], 'disabled', false);
                                }
                            }
                            vm.getSelService();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            openModal (service) {
                debugger;
                this.serviceContent = "";//每次打开model时,先清空以前的数据
                this.isOpenModal = true;
                this.parentid = service.typeid;
                var vm = this;
                var url = this.$lazy.url.host + this.$lazy.url.getThreeService;
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        parentid: this.parentid
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.serviceContent = response.data.rows[0].servicedescribe;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            saveServiceDetail () {
                var vm = this;
                var url = this.$lazy.url.host + this.$lazy.url.saveLevelThreeService;
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        parentid: this.parentid,
                        servicedescribe: this.serviceContent
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.serviceContent = "";
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            cancleModel () {
                this.serviceContent = "";
            }
        },
        // get the current quill instace object.
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
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
    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(55,55,55,.6);
        height: 100%;
        z-index: 1000;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .cardBody {
        height: 300px;
        padding: 20px;
        overflow-y: auto;
    }
    .serviceInfo {
        height: 32px;
        line-height: 32px;
        clear: both;
    }
    .servicePrice {
        height: 32px;
        line-height: 32px;
        background: #FFF;
        border: none;
        font-size: 12px;
        border-radius: 5px;
        padding: 4px 7px;
        color: #657180;
        outline: none;
        text-align: right;
    }
    .servicePrice:hover {
        border-color: #5cadff;
    }
    .del-icon {
        width: 12px;
        height: 12px;
        vertical-align: middle;
        cursor: pointer;
        opacity: 0;
    }
    .editor-icon {
        width: 15px;
        height: 15px;
        vertical-align: middle;
        cursor: pointer;
        opacity: 0;
    }
    .serviceInfo:hover .del-icon,
    .serviceInfo:hover .editor-icon{
        opacity: 0.3;
    }
</style>
 