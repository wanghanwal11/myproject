/**
* Created by bk on 2017/5/24.
*/
<template>
        <div class="resets">
        <div class="cation">
            <div class="reset">
                    <svg class="title-icon" aria-hidden="true">
                        <use xlink:href="#icon-shaixuan"></use>
                    </svg>
                    筛选
                    <span @click="reset">重置</span>
                </div>
                <Card style="width:260px" dis-hover>
                    <p slot="title">企业名称</p>
                   <!--  <input v-model="searchKey" @blur="search" @keyup.enter="triggerBlur($event)" placeholder="请输入..." style="padding-left: 5px;margin: 0 0 20px 40px;"></input> -->
                    <Input v-model="searchKey" @on-blur="search" @on-enter="vSearchEnter" placeholder="请输入..." style="padding-left: 30px;padding-right: 30px;"></Input>
                </Card>
                <Card style="width:260px;padding-bottom: 20px;" dis-hover>
                    <p slot="title">状态</p>
                    <ul>
                        <li><Checkbox @on-change="setAudistate(1)" v-model="chooseAudited">已审核</Checkbox></li>
                        <li><Checkbox @on-change="setAudistate(0)" v-model="chooseNoAudited">未审核</Checkbox></li>
                    </ul>
                </Card>
                <Card style="width:260px" dis-hover>
                    <p slot="title" style="cursor: pointer;">服务项目</p>
                    <div class="classify">
                        <Tree :data="baseData" ref="baseData" show-checkbox @on-check-change="checkSearch($event)" style="margin-left: 30px;"></Tree>
                    </div>
                </Card>
            </div>
        </div>
</template>

<script type="es6">
    var vm;
    import Checkbox from 'iview/src/components/checkbox'
    import Tree from 'iview/src/components/tree'
    import Card from 'iview/src/components/card'
    import Input from 'iview/src/components/input'

    export default {
        name: 'volunteerSearch',
        components: {
            Checkbox,
            Tree,
            Card,
            Input
		},
		data (){
            return {
                modal1: false,
                searchKey: '',
                baseData: [],
                chooseAudited: false,
                chooseNoAudited: false,
                searchTerm: {searchKey:'',ischeck:'',summary: []},
                img:""
            }
        },
        created: function(){
        	vm = this;
            this.searchList({});
        },
		methods: {
            // getImg:function(){
            //     var url = this.$store.state.serverHost + "wx/api/wx/getForeverCode";
            //      this.$http.get(url, {
            //             params: {
            //                 initid: this.$store.state.communityDetail.initid,
            //                 code: this.SubCode
            //             }
            //         })
            //         .then(function(res){
            //             vm.img = res.data.rows[0];
            //         })
            //         .catch(function(error){
            //             console.log(error)
            //         })
            // },
            addVolunteer: function () {
                window.open('../../static/join.html?communityid=' + this.$store.state.userInfo.streetorcommunityid + '&communitytype=' + vm.$store.state.userInfo.streetorcommunity +'&initid=' + this.$store.state.communityDetail.initid );
            },
            reset () {
                this.searchKey = '';
                this.chooseAudited = false;
                this.chooseNoAudited = false;
                this.searchTerm.ischeck = '';
                var aa = this.$refs.baseData.getCheckedNodes();
                debugger;
                for(var i = 0; i < aa.length; i++) {
                    aa[i].checked = false;
                }
                console.log(this.$refs.baseData.getCheckedNodes());
                this.$refs.baseData.updateData();
                this.search();
            },
            searchList: function (parent) {
                var parentid = parent.id || 0;
                var url = this.$store.state.serverHost + 'support/sup/Supserviceprovider/getProviderBycommunity';
                this.$http.get(url, {
                    params: {
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                })

                        .then(function (response) {
                            console.log(response)
                            for (var i = 0; i < response.data.rows.length; i++) {
                                //var communityid = response.data.rows[i].supProviderService.communityid;
                                //var communitytype = response.data.rows[i].supProviderService.communitytype;
                                vm.baseData.push({
                                    title: response.data.rows[i].supProviderService.title,
                                    children: response.data.rows[i].supProviderServiceList,
                                })
                            }
                        })

                        .catch(function (error) {
                            console.log(error);
                        });
            },
            setAudistate: function (Num) {
                this.chooseAudited = false;
                this.chooseNoAudited = false;
                if (event.target.checked) {
                    if (Num == 0) {
                        this.chooseNoAudited = true;
                    } else {
                        this.chooseAudited = true;
                    }
                    this.searchTerm.ischeck = Num;
                } else {
                    this.searchTerm.ischeck = '';
                }
                this.search();
            },
            search: function () {
                debugger
                this.searchTerm.searchKey = this.searchKey;
                //将searchKey、ischeck、传给父组件
                vm.$emit('listenToChildSearchEvent', this.searchTerm);
            },
            vSearchEnter: function () {
                event.target.blur();
            },
            routeTo(routeName) {
                this.$router.push(routeName);
                this.footNavNum = 0;
            },
            checkSearch(event){
            	debugger
                this.searchTerm.summary = [];
            	var aa = this.$refs.baseData.getCheckedNodes();
                for(var i in aa){
                    debugger;
                    if(aa[i].typeid) {
                        this.searchTerm.summary.push(aa[i].typeid);
                    }
                }
                this.search();
            }
        }
    }
</script>

<style scoped>

    .cation{
        width: 240px;
        min-height: 100%;
        padding-bottom: 30px;
        background: #fff;
        border-left: 1px solid #ddd;
        position: fixed;
        right:0;
        top:45px;
    }
    .resets{
        width: 240px;
        min-height: 100%;
    }
    li{
        padding: 5px 10px 5px 40px;
        cursor: pointer;
    }
    .title-icon{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
        fill: #333;
    }
    .reset{
        height: 66px;
        //margin-top: 80px;
        line-height: 66px;
        padding: 0 14px;
        border-bottom: 1px solid #d7dde4;
    }
    .libg{
        background: #ddd;
    }
    .tabg{
        background: #39f;
        color: #fff;
    }
    .reset span {
        float: right;
        cursor: pointer;
    }
    .classify{
	    height: 300px;
    	overflow-y: hidden;
    }
    .classify:hover{
    	overflow-y: scroll;
    }
</style>
 