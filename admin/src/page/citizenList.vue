/**
* Created by bk on 2017/3/28.
*/
<template>
	<div style="height: 100%;" class="citizenList">
        	<LazyTopbar :data="json" style="position:fixed;top:0px;z-index:1;width: calc(100% - 220px)"></LazyTopbar>
			<Row  style="margin:0px 240px 20px 0;">
				<Col :xs="24" :sm="12" :md="8" :lg="6" v-for="item in articleList" style="padding-left: 15px;padding-right: 15px;margin-top: 30px;">
					<div draggable='true' @dragstart='drag($event,item.id)' @dragend='ondragend'>
						<Card class="cardBox" dis-hover>
						<!-- 	<p slot="title"	>
							</p> -->
							<!-- <a href="" slot="extra" @click.prevent="changeLimit">
								<svg class="menu-icon" aria-hidden="true">
									<use xlink:href="#icon-caidan"></use>
								</svg>
							</a> -->
							<div class="eList" @click="routeTo(item)">
								<div class="eLeft">
									<div class="eImg">
										<img draggable='false' v-if="item.headpicture" :src="item.headpicture">
										<img draggable='false' v-else src="../assets/images/moren.png">
									</div>
									<!--<div class="ecode"><img src="../assets/images/QR.png"></div>-->
								</div>
								<div class="eRight" style="padding-left:5px;width:60%;">
									<div v-if="item.realname" class="eName" style="padding-top:18px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.realname}}</div>
									<div v-else class="eName" style="padding-top:18px;">{{item.username}}</div>
									<!-- <div style="margin-top:2p"> -->
                                        <!-- <Tag color="blue" class="tag" v-if="">老人</Tag>
                                        <Tag color="red" class="tag" v-if="">党员</Tag> -->
                                        <!-- <Tag color="green" class="tag" v-if="">低保人群</Tag> -->
                                        <!-- <Tag color="yellow" class="tag" v-if="">妇女</Tag> -->
                                   <!--  </div> -->
									<div style="margin-top:25px;">
					                   	<div class="icon">
	                                        <Tooltip :content="item.address ? item.address : '地址未绑定' " placement="top">
	                                            <svg class="title-icon2 address" aria-hidden="true">
	                                                <use xlink:href="#icon-dizhi1"></use>
	                                            </svg>
	                                        </Tooltip>
	                                    </div>
	                                    <div class="icon">
	                                        <Tooltip :content="item.mobile ? item.mobile : '电话未绑定' " placement="top">
	                                            <svg class="title-icon2 phoneSvg" aria-hidden="true">
	                                                <use xlink:href="#icon-xihebiaozhunyuanjian439"></use>
	                                            </svg>
	                                        </Tooltip>
	                                    </div>
	                                   
	                                  <!--   <div class="icon">
	                                        <svg class="title-icon2 code" aria-hidden="true">
	                                            <use xlink:href="#icon-erweima"></use>
	                                        </svg>
	                                    </div> 	 -->
					        		</div>
								</div>
							</div>
						</Card>
					</div>
				</Col>
			</Row>


		<div class="cation">
			<div class="reset">
				<svg class="title-icon" aria-hidden="true">
					<use xlink:href="#icon-shaixuan"></use>
				</svg>
				筛选
				<span @click="reset">重置</span> 
			</div>
			<Card style="width:240px;" dis-hover>
				<p slot="title">姓名</p>
				<Input v-model="searchKey" placeholder="请输入..." @on-blur="searchByKey" @on-enter="keyEnter" style="padding-left: 30px;padding-right: 30px;margin-top: 20px"></Input>
			</Card>
			<Card style="width:240px" dis-hover>
				<p slot="title">分组</p>
				<a slot="extra">
					<Button type="primary" style="width: 22px;height: 22px;padding:0;background: none;border: none;color: #333;font-size: 18px;" @click="addtype">+</Button>
				</a>
				<ul class="peopleGroup">
					<li v-for='pjdt in projectdatas' @drop='drop($event,pjdt)' @dragover='allowDrop($event,pjdt)' :class="{libg: dropflag == pjdt.stategroup}" style="padding: 5px 10px 5px 20px;">
						<Checkbox @on-change="stateList(pjdt)" v-model="pjdt.selectFlag" style="margin-right: 8px">{{pjdt.peoplestate}}</Checkbox>
						<Poptip placement="bottom"
								confirm
								title="您确认删除这条内容吗？"
								@on-ok="delType(pjdt)">
							<svg class="del-icon" aria-hidden="true" ><use xlink:href="#icon-guanbi-copy"></use></svg>
						</Poptip>
						<!--<svg class="del-icon" aria-hidden="true" @click="delType(pjdt)"><use xlink:href="#icon-guanbi-copy"></use></svg>-->
						<span>{{pjdt.num}}</span>
					</li>
				</ul>
				<div class="addBox">
					<Input :class="{hide: addflag}" v-model="peopleType" @on-blur="ok" @on-enter="vEnter" placeholder="新分类" type="text"></Input>
				</div>
			</Card>
			<Card style="width:240px;" dis-hover>
				<p slot="title">标签</p>
				<a href="" slot="extra"></a>
				<ul class="clearfix" style="margin-top:10px;">
					<li v-for='pjty in projecttype' @click="hobbyList(event,pjty)"><i class="tagList" :class="{tagbg: pjty.selectFlag}">{{pjty.hobby}}({{pjty.num}})</i></li>
				</ul>
			</Card>
		</div>
	</div>
</template>

<script type="es6">
    import Card from 'iview/src/components/card'
    import Checkbox from 'iview/src/components/checkbox'
    import Tooltip from 'iview/src/components/tooltip'
    import Tag from 'iview/src/components/tag'
    import Affix from 'iview/src/components/affix'
    import {Row,Col} from 'iview/src/components/grid'
    import Button from 'iview/src/components/button'
    import Input from 'iview/src/components/input'
	import Poptip from 'iview/src/components/poptip'
    
	let dom = null
	export default {
		name: 'list',
		//组件
		components: {
			Card,
			Checkbox,
			Tooltip,
			Tag,
			Affix,
			Row,
			Col,
			Button,
			Input,
			Poptip
		},
		data (){
		return {
			articleList: [],
			age:[20,50],
			people:'党员',
			projectdatas:'',
			projecttype:'',
			peopleType:'',
			peopleId:'',
			peoplestate:'',
			dropflag:'',
			addflag:true,
			stategroup: [],
			hobbygroup: [],
			json:{
                title:"居民"
            },
			page: 1,
			row: 25,
			searchKey: ''
		}
	},
	created: function(){
		var vm = this;
		vm.searchCitizenNew();
		vm.searchGroup();
		window.addEventListener('scroll',vm.scrollCitizen);
		debugger;
		var urlgetUserNumByHobbygroup = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getUserNumByHobbygroup';
		this.$http.get(urlgetUserNumByHobbygroup, {
					params: {
						communityid: this.$store.state.userInfo.streetorcommunityid,
						communitytype: this.$store.state.userInfo.streetorcommunity
					}
				})
				.then(function (response) {
					console.log(response);
					vm.projecttype = response.data.rows;
				})
				.catch(function (error) {
					console.log(error);
				});
	},
		destroyed: function () {
			window.removeEventListener('scroll',this.scrollCitizen,false);
		},
		methods: {
			scrollCitizen: function() {
				var offsetHeight = document.body.offsetHeight,
						scrollHeight = document.body.scrollHeight,
						scrollTop = document.body.scrollTop;
				if(document.body.scrollTop == 0){
					offsetHeight = document.documentElement.offsetHeight;
					scrollHeight = document.documentElement.scrollHeight;
					scrollTop = document.documentElement.scrollTop;
				}
				var scrollBottom = offsetHeight + scrollTop;
				debugger;
				if(scrollBottom == scrollHeight && scrollTop != 0)
				{
					debugger
					this.page++;
					this.searchCitizenNew();
				}
			},
			searchByKey () {
				this.articleList = [];
				this.page = 1;
				this.searchCitizenNew();
			},
			keyEnter () {
				event.target.blur();
			},
			searchCitizenNew: function(){
				var vm = this;
				var url = this.$store.state.serverHost + 'wx/wechatgl/weixinuser/getOpenIdListByHobbyOrState';
				this.$http.get(url, {
					params: {
						communitytype: this.$store.state.userInfo.streetorcommunity,
						communityid: this.$store.state.userInfo.streetorcommunityid,
						hobbygroup: this.hobbygroup.join(","),
						stategroup: this.stategroup.join(","),
						page: this.page,
						rows: this.row,
						keyname: this.searchKey
					}
				})
						.then(function (response) {
							console.log(response);
							for (var i = 0; i < response.data.rows.length; i++) {
								if (response.data.rows[i].sex == '0') {
									response.data.rows[i].sex = '女';
								}
								if (response.data.rows[i].sex == '1') {
									response.data.rows[i].sex = '男';
								}
							}
							debugger;
							if(vm.page == 1){
								vm.articleList = response.data.rows;
							} else {
								vm.articleList = vm.articleList.concat(response.data.rows);
							}
							if(response.data.rows.length == 0){
								vm.page--;
							}
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			searchCitizen: function () {
				var vm = this;
				var url = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getUserBycommuityId';
				this.$http.get(url, {
					params: {
						communityid: vm.$store.state.userInfo.streetorcommunityid,
						communitytype: vm.$store.state.userInfo.streetorcommunity,
						page: this.page,
						rows: this.row
					}
				})
						.then(function (response) {

							console.log(response);
							for (var i = 0; i < response.data.rows.length; i++) {
								if (response.data.rows[i].sex == '0') {
									response.data.rows[i].sex = '女';
								}
								if (response.data.rows[i].sex == '1') {
									response.data.rows[i].sex = '男';
								}
							}
							debugger
							//vm.articleList = response.data.rows;
							vm.articleList = vm.articleList.concat(response.data.rows);
							if(response.data.rows.length == 0){
								vm.page--;
							}
							vm.$Loading.finish();
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			searchGroup: function() {
				var vm = this;
				var urlBasePeopleState = vm.$store.state.serverHost + 'wx/wechatgl/weixinuser/getPeopleStateNum';
				this.$http.get(urlBasePeopleState, {
					params: {
						communityid: this.$store.state.userInfo.streetorcommunityid,
						communitytype: this.$store.state.userInfo.streetorcommunity
					}
				})
						.then(function (response) {
							debugger
							for (var i = 0; i < vm.stategroup.length; i++) {
								for (var j = 0; j < response.data.rows.length; j++) {
									if (vm.stategroup[i] == response.data.rows[j].stategroup) {
										vm.$set(response.data.rows[j], 'selectFlag', true);
									}
								}
							}
							vm.projectdatas = response.data.rows;
							console.log(vm.projectdatas)
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			routeTo(item) {
				this.$router.push({
					path:"citizenInfo",
					query:{
						id:item.id,
						openid:item.openid
					}
				});
			},
			drag: function (event, id) {
				this.peopleId = id;
			},
			drop: function (event,data) {
				debugger
				this.dropflag = '';

				var vm = this;
				//this.stategroup = stategroup;
				//this.peoplestate = peoplestate;
				event.preventDefault();
				var urlweixinusersave = vm.$store.state.serverHost + 'wx/wechatgl/weixinuserhobbystate/save';
				this.$http.get(urlweixinusersave, {
					params: {
						userid: this.peopleId,
						stategroup: data.stategroup,
						peoplestate: data.peoplestate,
						communityid: this.$store.state.userInfo.streetorcommunityid,
						communitytype: this.$store.state.userInfo.streetorcommunity
					}
				})
						.then(function (response) {
							console.log(response)
							if (response.data.isSucceed) {
								vm.$Message.success('分类成功!');
								data.num = Number(data.num)+ 1;
							} else {
								vm.$Message.info(response.data.message);
							}
						})
						.catch(function (error) {
							console.log(error);
							vm.$Message.error( '分类失败!');
						});
			},
			allowDrop: function (event, item) {
				this.dropflag = item.stategroup;
				event.preventDefault();
			},
			ondragend: function () {
				debugger
				this.dropflag = '';
			},
			peopleChange: function () {
				console.log(this.people);
			},
			stateList: function (pjdt) {
				var vm = this;
				debugger;
				if (pjdt.selectFlag) {
					this.stategroup.push(pjdt.stategroup);
				} else {
					this.stategroup.splice(this.stategroup.indexOf(pjdt.stategroup), 1);
				}
				this.articleList = [];
				this.page = 1;
				this.searchCitizenNew();
				//if (this.stategroup.length == 0 && this.hobbygroup.length == 0) {
				//	this.searchCitizen();
				//} else {
				//	var url = this.$store.state.serverHost + 'wx/wechatgl/weixinuser/getOpenIdListByHobbyOrState';
				//	this.$http.get(url, {
				//		params: {
				//			communitytype: this.$store.state.userInfo.streetorcommunity,
				//			communityid: this.$store.state.userInfo.streetorcommunityid,
				//			hobbygroup: this.hobbygroup.join(","),
				//			stategroup: this.stategroup.join(",")
				//		}
				//	})
				//			.then(function (response) {
				//				console.log(response);
				//				for (var i = 0; i < response.data.rows.length; i++) {
				//					if (response.data.rows[i].sex == '0') {
				//						response.data.rows[i].sex = '女';
				//					}
				//					if (response.data.rows[i].sex == '1') {
				//						response.data.rows[i].sex = '男';
				//					}
				//				}
				//				vm.articleList = response.data.rows;
				//			})
				//			.catch(function (error) {
				//				console.log(error);
				//			});
				//}
			},
			hobbyList: function (e, pjty) {
				var vm = this;
				debugger
				if (!pjty.selectFlag) {
					this.$set(pjty, 'selectFlag', true);
					this.hobbygroup.push(pjty.hobbygroup);
				} else {
					this.$set(pjty, 'selectFlag', false);
					this.hobbygroup.splice(this.hobbygroup.indexOf(pjty.hobbygroup), 1);
				}
				this.articleList = [];
				this.page = 1;
				this.searchCitizenNew();
				//if(this.stategroup.length == 0 && this.hobbygroup.length == 0) {
				//	this.searchCitizen();
				//} else {
				//	var url = this.$store.state.serverHost + 'wx/wechatgl/weixinuser/getOpenIdListByHobbyOrState';
				//	this.$http.get(url, {
				//		params: {
				//			communitytype: this.$store.state.userInfo.streetorcommunity,
				//			communityid: this.$store.state.userInfo.streetorcommunityid,
				//			hobbygroup: this.hobbygroup.join(","),
				//			stategroup: this.stategroup.join(",")
				//		}
				//	})
				//			.then(function (response) {
				//				console.log(response);
				//				vm.articleList = response.data.rows;
				//			})
				//			.catch(function (error) {
				//				console.log(error);
				//			});
				//}

			},
			ok () {
				var vm = this;
				vm.addflag = true;
				console.log(111);
				debugger
				if (!this.peopleType) {
					return;
				} else {
					var url = vm.$store.state.serverHost + 'base/BasePeopleState/BasePeopleState/save';
					this.$http.get(url, {
						params: {
							communitytype: this.$store.state.userInfo.streetorcommunity,
							communityid: this.$store.state.userInfo.streetorcommunityid,
							peoplestate: this.peopleType
						}
					})
							.then(function (response) {
								console.log(response);
								vm.peopleType = '';
								debugger
								vm.searchGroup();
							})
							.catch(function (error) {
								console.log(error);
							});
				}

			},
			keydown (event) {
				console.log(event)
				if (event.which == 13) {
					event.target.blur();
				}
			},
			vEnter () {
				var vm = this;
				vm.addflag = true;
			},
			reset () {
				debugger
				var i = 0, k = 0;
				for (; i < this.projectdatas.length; i++) {
					this.$set(this.projectdatas[i], 'selectFlag', false);
				}
				for (; k < this.projecttype.length; k++) {
					this.$set(this.projecttype[k], 'selectFlag', false);
				}
				this.page = 1;
				this.searchKey = "";
				this.stategroup = [];
				this.hobbygroup = [];
				this.articleList = [];
				//this.$set(this,'articleList',[]);
				this.searchCitizenNew();
			},
			addtype () {
				this.addflag = !this.addflag;
			},
			delType (data) {
				var vm = this;
				debugger
				var urlBasePeopleState = this.$store.state.serverHost + 'base/BasePeopleState/BasePeopleState/delByCommunityId';
				this.$http.get(urlBasePeopleState, {
					params: {
						communitytype: this.$store.state.userInfo.streetorcommunity,
						communityid: this.$store.state.userInfo.streetorcommunityid,
						stategroup: data.stategroup
					}
				})
						.then(function (response) {
							console.log(response);
							if (response.data.isSucceed) {
								vm.projectdatas.splice(vm.projectdatas.indexOf(data), 1)
							}
						})
						.catch(function (error) {
							console.log(error);
						});
			}
		}
	}
</script>

<style scoped>
	
	.phoneSvg{
	        fill:#3242dd;
	        width:18px;
	        height:18px;
	}

    .address{
        fill:#39cfa2;
        width:14px;
        height:13px;
        margin-left:3px;
    }

    .code{
        fill:#4bacff;
        width:15px;
        height:12px;
        margin-left:1px;
    }

    .order{
        fill:#00a8ff;
        width:17px;
        height:15px;
        margin-top:2px;
    }

    .icon {
        width:20px;
        height:20px;
        float: left;
    }
    .title-icon2{
        cursor: pointer;
    }

	.cation{
		width: 240px;
		min-height: 100%;
		padding-bottom: 30px;
		border-left: 1px solid #ddd;
		background: #fff;
		position: fixed;
		top: 45px;
		right: 0px;
	}
	li{
		padding: 0px 10px 5px 20px;
		cursor: pointer;
	}
	.clearfix li{
		float: left;
	}
	.tagList{
		line-height: 22px;
		margin: 2px 4px 2px 0;
		font-style: normal;
		padding: 2px 8px;
		border: 1px solid #e3e8ee;
		border-radius: 3px;
	    background: #f7f7f7;
	    font-size: 12px;
	    cursor: pointer;
	}
	.tagbg{
		background: #39f;
		color: #fff;
		border: 1px solid #39f;
	}
	.addBox{
		width: 200px;
		height: 32px;
		margin: 10px auto;
	}
	.newtype:hover{
		/*background: #ddd;*/
	}
	.ivu-card-head{
		height: 46px;
	}
	.menu-icon{
		width: 20px;
		height: 20px;
	}
	.eList{
		height: 108px;
		display: -webkit-box;
		cursor: pointer;
	}
	.eLeft{
		width: 90px;
		height:108px;
		//float: left;
		position: relative;
	}
	.eRight{
	}
	.eImg{
		width: 71px;
		height: 71px;
		border-radius: 50%;
		margin: 19px auto;
		overflow: hidden;
	}
	.eImg img{
		width: 71px;
		height: 71px;
	}
	.ecode{
		width: 22px;
		height: 22px;
		border-radius: 50%;
		position: absolute;
		top: 108px;
		left: 65%;
		overflow: hidden;
		z-index: 3;
	}
	.eStar{
		height: 16px;
	}
	.eRead{
		line-height: 20px;
		margin-left: 18px;
	}
	.eRead img{
		vertical-align: top;
		margin-right: 8px;
	}
	.eTitle{
		margin-top: 20px;
		font-size: 16px;
		color: #333;
	}
	.eName{
		font-size: 16px;
		color: #333;
	}
	.eName span{
		line-height: 24px;
		margin-top: 3px;
		margin-left: 20px;
		font-size: 12px;
		color: #666;
	}
	.title-icon{
		width: 16px;
		height: 16px;
		vertical-align: middle;
		cursor: pointer;
		fill: #ffae00;
	}
	.peopleGroup{
		max-height: 200px;
		overflow-y: scroll;
		margin-top:10px;
	}
	.peopleGroup li span{
		float: right;
	}
	.peopleGroup:hover{
		overflow-y: scroll;
	}
	.del-icon {
		width: 12px;
		height: 12px;
		vertical-align: middle;
		cursor: pointer;
		opacity: 0;
	}
	.peopleGroup li:hover .del-icon{
		opacity: 0.3;
	}
	.eContact{
		height: 21px;
		margin-top: 35px;
		font-size: 16px;
		color: #999;
	}
	.eMobile{
		float: left;
	}
	.ePhone{
		float: right;
	}
	.eEmail{
		margin-top: 30px;
		font-size: 16px;
		color: #999;
	}
	.eAddress{
		margin-top: 15px;
		font-size: 16px;
		color: #999;
	}
	.reset{
		height: 66px;
		line-height: 66px;
		padding: 0 14px;
		border-bottom: 1px solid #d7dde4;
	}
	.reset span{
		float: right;
		cursor: pointer;
	}
	.libg{
		background: #ddd;
	}
	.ageBox{
		margin-top: 40px;
		padding: 0 10px;
	}
	.clearfix {
	 	overflow: auto;
	}
</style>