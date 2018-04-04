/**
* Created by bk on 2017/3/28.
*/
<template>

        <div style="height: 100%;" class="peopleList">
    		<LazyTopbar :data="json" style="position: fixed;top: 0;width: calc(100% - 220px);z-index:1">
                <div slot="Button">
                    <p style="text-align:center;font-weight:bolder;">微信扫一扫，申请加入</p>
                    <img style="width: 130px;height: 130px;" :src="employeeCode" v-if="employeeCode">
                    <p style="width:130px;height:130px;text-align:center;line-height:130px;font-weight:bolder;cursor:pointer;" v-else @click="addEmployee">点击加载
                        <Spin style="position:absolute;top:40%;left:45%;" v-if="spinShow"></Spin>
                        <img :src="employeeCode" alt="">
                    </p>
                </div>
            </LazyTopbar>
			<div :class="{mask: true,hide: isMask}"></div>
            <div :class="{maskWrap: true,hide: isMask}" @click="hideMask">
				<!-- <div style="width: 300px;height: 300px;background-color: #fff; position: relative;margin: 100px auto; z-index: 1001" @click="divStop">
                    <p style="text-align:center;padding-top:24px;font-weight:bolder;font-size:16px;">微信扫一扫，申请加入</p>
					<img :src="employeeCode" alt=""/>
				</div> -->
			</div>


			<div class="branch">
				<div style="padding: 0 30px;">
					<!-- <Button style="background: #3399ff;color: #fff;width:200px;height:36px;position: relative;z-index: 3;margin-top: 35px;margin-left:4px;" @click="addEmployee" :disabled="isDisable">添加员工</Button> -->
					<!-- <Button style="background: #3399ff;color: #fff;position: absolute;top: 35px;left:13%;z-index: 3; width: 200px;" @click="addVolunteer" size="large">企业加盟</Button> -->
				</div>
				<div class="resets">
					<svg class="title-icon" aria-hidden="true">
						<use xlink:href="#icon-shaixuan"></use>
					</svg>
					筛选
					<span @click="reset" style="cursor: pointer">重置</span>
				</div>
				<Card style="width:240px" :bordered="false" dis-hover>
					<div>
						<p class="searchType">姓名</p>
						<Input v-model="employeeName" placeholder="请输入..." @on-blur="searchByName" @on-enter="vEnter" style="padding-left: 30px;padding-right: 30px;"></Input>
					</div>
				</Card>
				<Card style="width:240px" :bordered="false" dis-hover>
					<p slot="title">分组</p>
					<a slot="extra">
						<Button type="primary" style="width: 22px;height: 22px;padding:0;background: none;border: none;color: #333;font-size: 18px;" @click="addGroup">+</Button>
					</a>
					<ul class="peopleGroup">
						<CheckboxGroup v-model="selectedGroups" @on-change="selectGroups">
							<li v-for='(group,key) in peopleGroups' @drop='drop($event,group)' @dragover='allowDrop($event,group)' :class="{libg: dropflag == group.tusergroup}" style="padding: 5px 10px 5px 20px;">
								<Checkbox :label="group.tusergroup"><span style="margin-left: 10px">{{group.groupname}}</span></Checkbox>
								<Poptip placement="bottom"
										confirm
										title="您确认删除这条内容吗？"
										@on-ok="delGroup(group.tusergroup,key)">
									<svg class="del-icon" aria-hidden="true" ><use xlink:href="#icon-guanbi-copy"></use></svg>
								</Poptip>
								<!--<svg class="del-icon" aria-hidden="true" @click="delType(pjdt)"><use xlink:href="#icon-guanbi-copy"></use></svg>-->
								<span>{{group.num}}</span>
							</li>
						</CheckboxGroup>

					</ul>
					<div class="addBox">
						<Input :class="{hide: addflag}" v-model="peopleType" @on-blur="addPeopleGroup" @on-enter="addEnter" placeholder="新分类" type="text"></Input>
					</div>
				</Card>
			</div>


            <Row :gutter="20" style="margin-left:0;margin-right: 240px;">
		        <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="(employee,key) in employees" style="margin-top:30px;">
					<div draggable='true' @dragstart='drag($event,employee.userid)' @dragend='ondragend'>
						<Card class="cardBox" dis-hover>
							<!-- 点点点 -->
							<!--<p slot="title"></p>-->
							<!-- <a href="" slot="extra">
                                <svg class="menu-icon" aria-hidden="true">
                                    <use xlink:href="#icon-caidan"></use>
                                </svg>
                            </a> -->
							<div class="eList" @click="routeTo(employee)">
								<div class="eLeft">
									<div class="eImg">
										<img v-if="employee.headpicurl" :src="employee.headpicurl">
										<img v-else src="../assets/images/moren.png">
										<!--<div class="ecode"><img src="../assets/images/QR.png"></div>-->
									</div>
								</div>
								<div class="eRight">
									<div class="eName" v-if="employee.fullname" style="padding-top:18px;">{{employee.fullname}}
										<!-- <span>男 | 12</span> -->
									</div>
									<div class="eName" v-else style="padding-top:18px;">{{employee.nickname}}
										<!-- <span>男 | 12</span> -->
									</div>
									<div style="margin-top:22px;">
										<!-- 	<div class="icon">
                                                    <Tooltip :content="employee.address ? employee.address : '未绑定地址' " placement="top">
                                                        <svg class="title-icon2 address" aria-hidden="true">
                                                            <use xlink:href="#icon-dizhi1"></use>
                                                        </svg>
                                                    </Tooltip>
                                                </div> -->
										<div class="icon">
											<Tooltip :content="employee.phone ? employee.phone : '未绑定电话' " placement="top">
												<svg class="title-icon2 phoneSvg" aria-hidden="true">
													<use xlink:href="#icon-xihebiaozhunyuanjian439"></use>
												</svg>
											</Tooltip>
										</div>

										<!-- <div class="icon">
                                            <svg class="title-icon2 code" aria-hidden="true">
                                                <use xlink:href="#icon-erweima"></use>
                                            </svg>
                                        </div> 	 -->
									</div>
									<div class="codeBox" @click="delModal(employee.userid,key)">
										<svg class="icon-close" aria-hidden="true">
											<use xlink:href="#icon-guanbi-copy"></use>
										</svg>
									</div>
								</div>
							</div>
						</Card>
					</div>

		        </Col>
		    </Row>

			<Modal v-model="isDelete" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>删除确认</span>
                </p>
                <div style="text-align:center">
                    <p>是否确认删除？</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long  @click="delSheGong(curentEmployee.userid,curentEmployee.index)">删除</Button>
                </div>
            </Modal>
        </div>
</template>

<script type="es6">
	var vm;
    import Card from 'iview/src/components/card'
    import Tooltip from 'iview/src/components/tooltip'
    import Input from 'iview/src/components/input'
    import {Row,Col} from 'iview/src/components/grid'
    import Affix from 'iview/src/components/affix'
    import Spin from 'iview/src/components/spin'
	import Poptip from 'iview/src/components/poptip'
	import Button from 'iview/src/components/button'
	import CheckboxGroup from 'iview/src/components/checkbox/checkbox-group'
	import Checkbox from 'iview/src/components/checkbox'
	import Modal from 'iview/src/components/modal'
    export default {
        name: 'peopleList',
        components: {
            Card,
            Tooltip,
            Input,
            Row,
            Col,
            Affix,
            Spin,
			Poptip,
			Button,
			CheckboxGroup,
			Checkbox,
			Modal
		},
		data () {
			return {
				employees:[],
				isMask: true,
				employeeCode: '',
				employeeName: '',
				json : {
                    title : '社工',
                    right : [
                    {
                        type:"Button",
                        buttontype:"ghost",
                        class:"btns",
                        svg:"#icon-erweima",
                        //buttontype:"text",
                        size:"small",
                         poptip : {
                            trigger : "hover",
                            placement : "bottom",
                            placement : "bottom-end"
                        }
                    }

                    ]
                },
                spinShow : false,
				addflag: true,
				peopleId: '',
				peopleType: '',
				peopleGroups: [],
				dropflag: '',
				selectedGroups: [],
				page: 1,
				row: 25,
				isDelete: false,
				curentEmployee: {userid: 0, index: -1}
			}
		},
		methods: {
			addEmployee: function () {
                vm.spinShow = true;
				var url = vm.$store.state.serverHost + 'wx/api/wx/getCJCode';
				this.$http.get(url, {
					params: {
                        streetorcommunityid: vm.$store.state.userInfo.streetorcommunityid,
                        streetorcommunity: vm.$store.state.userInfo.streetorcommunity,
                        //initid: vm.$store.state.communityDetail.initid,
                        code: 2,
                        'token': vm.$store.state.userInfo.access_token
                    }
				})
				.then(function (response) {
                    debugger
					console.log(response);
					vm.employeeCode = response.data.rows[0];
					console.log(vm.employeeCode);
                    vm.spinShow = false;
				})
				.catch(function (error) {
					console.log(error);
				});
			},
			hideMask: function () {
				this.isMask = true;
			},
			divStop: function (event) {
				event.cancelBubble = true
			},
			reset: function () {
				this.employeeName = '';
				this.employees = [];
				this.page = 1;
				this.selectedGroups = [];
				this.search();
			},
			searchByName () {
				this.employees = [];
				this.page = 1;
				this.search();
			},
			search: function () {
				var url = vm.$store.state.serverHost + 'uc/uc/tuser/getTuserIdListByTuserGroup';
				this.$http.get(url, {
					params: {
						communityid: this.$store.state.userInfo.streetorcommunityid,
						communitytype: this.$store.state.userInfo.streetorcommunity,
						nickname: this.employeeName,
						page: this.page,
						rows: this.row,
						tusergroup: this.selectedGroups.join()
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.employees = vm.employees.concat(response.data.rows);
							if(response.data.rows.length == 0 && vm.page > 0){
								vm.page--;
							}
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			vEnter: function () {
				event.target.blur();
			},
			searchGroup () {
				var url = vm.$store.state.serverHost + 'uc/uc/tuser/getTuserGroupNum';
				this.$http.get(url, {
					params: {
						communityid: vm.$store.state.userInfo.streetorcommunityid,
						communitytype: vm.$store.state.userInfo.streetorcommunity
					}
				})
						.then(function (response) {
							console.log(response);
							vm.peopleGroups = response.data.rows;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			addGroup () {
				this.addflag = !this.addflag;
			},
			addPeopleGroup () {
				debugger;
				this.addflag = true;
				var url = vm.$store.state.serverHost + 'base/BaseTuserGroup/basetusergroup/save';
				this.$http.get(url, {
					params: {
						communityid: vm.$store.state.userInfo.streetorcommunityid,
						communitytype: vm.$store.state.userInfo.streetorcommunity,
						groupname: this.peopleType
					}
				})
						.then(function (response) {
							console.log(response);
							vm.peopleType = "";
							vm.searchGroup();
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			selectGroups () {
				debugger;
				this.employees = [];
				this.page = 1;
				this.search();
			},
			addEnter () {
				this.addflag = true;
			},
			delGroup (tusergroup,index) {
				var url = vm.$store.state.serverHost + 'base/BaseTuserGroup/basetusergroup/delByCommunityId';
				this.$http.get(url, {
					params: {
						communityid: vm.$store.state.userInfo.streetorcommunityid,
						communitytype: vm.$store.state.userInfo.streetorcommunity,
						tusergroup: tusergroup
					}
				})
						.then(function (response) {
							if(response.data.isSucceed){
								vm.peopleGroups.splice(index,1);
							}else {
								vm.$Message.error('删除失败!');
							}

						})
						.catch(function (error) {
							console.log(error);
						});
			},
			drag: function (event, userid) {
				this.peopleId = userid;
			},
			drop (event,group) {
				this.dropflag = '';
				event.preventDefault();
				var url = vm.$store.state.serverHost + 'uc/TuserGroup/tusergroup/save';
				this.$http.get(url, {
					params: {
						communityid: vm.$store.state.userInfo.streetorcommunityid,
						communitytype: vm.$store.state.userInfo.streetorcommunity,
						tusergroup: group.tusergroup,
						groupname: group.groupname,
						tuserid: this.peopleId
					}
				})
						.then(function (response) {
							if(response.data.isSucceed){
								vm.$Message.success('分组成功!');
								vm.searchGroup();
							}else {
								vm.$Message.error(response.data.message);
							}

						})
						.catch(function (error) {
							console.log(error);
						});
			},
			allowDrop: function (event, item) {
				this.dropflag = item.tusergroup;
				event.preventDefault();
			},
			ondragend: function () {
				debugger
				this.dropflag = '';
			},
			delSheGong (id,index) {
				var url = vm.$store.state.serverHost + 'uc/uc/tuser/delTuserById';
				this.$http.get(url, {
					params: {
						communityid: vm.$store.state.userInfo.streetorcommunityid,
						communitytype: vm.$store.state.userInfo.streetorcommunity,
						tuserid: id
					}
				})
						.then(function (response) {
							console.log(response);
							vm.isDelete = false;
							vm.employees.splice(index,1);
							vm.searchGroup();
						})
						.catch(function (error) {
							vm.isDelete = false;
							console.log(error);
						});
			},
			scroll: function() {
				var offsetHeight = document.body.offsetHeight,
						scrollHeight = document.body.scrollHeight,
						scrollTop = document.body.scrollTop;
				if(document.body.scrollTop == 0){
					offsetHeight = document.documentElement.offsetHeight;
					scrollHeight = document.documentElement.scrollHeight;
					scrollTop = document.documentElement.scrollTop;
				}
				var scrollBottom = offsetHeight + scrollTop; //滚动条滚到底部时，相加的和可能比scrollHeight大一点点
				if(scrollBottom >= scrollHeight && scrollTop != 0) {
					debugger;
					vm.page++;
					vm.search();
				}
			},
			delModal (userid,index){
				this.isDelete = true;
				this.curentEmployee.userid = userid;
				this.curentEmployee.index = index;
			},
			routeTo(item) {
				debugger;
				this.$router.push({
					path:"peopleInfo",
					query:{
						id:item.userid
					}
				});
			}
		},
		created: function () {
			vm = this;
			this.search();
			this.searchGroup();
			var url = vm.$store.state.serverHost + 'wx/wechatgl/gzhguanli/getAddStaffUrl';
			this.$http.get(url, {
				params: {
					streetorcommunityid: vm.$store.state.userInfo.streetorcommunityid,
					streetorcommunity: vm.$store.state.userInfo.streetorcommunity,
					initid: vm.$store.state.communityDetail.initid,
					code: 2,
					'token': vm.$store.state.userInfo.access_token
				}
			})
					.then(function (response) {
						console.log(response);
						//vm.employeeCode = response.data.rows[0];
					})
					.catch(function (error) {
						console.log(error);
					});
			window.addEventListener('scroll',this.scroll);
		},
		destroyed: function () {
			debugger;
			window.removeEventListener('scroll',vm.scroll,false);
		}
	}
</script>

<style scoped>

	.menu-icon{
		width: 20px;
		height: 20px;
	}

	.tag{
        margin:0 0 2px 8px;
    }

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
	.resets{
		height: 66px;
	    //margin-top: 9px;
	    line-height: 66px;
	    padding: 0 14px;
	    border-bottom: 1px solid #d7dde4;
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
		padding-left:5px;width:60%;
	}
	.eImg{
		width: 71px;
		height: 71px;
		border-radius: 50%;
		margin: 19px auto;
		position: relative;
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
		right: 0;
		bottom: 0;
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
		/*margin-top: 5px;*/
		font-size: 16px;
		color: #333;
	}
	.eName span{
		line-height: 24px;
		margin-top: 3px;
		margin-left: 20px;
		font-size: 12px;
		color: #808080;
		/*padding-left:8px;*/
	}
	.title-icon{
		vertical-align: top;
    	cursor: pointer;
    	fill: #ffae00;
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
/*侧边栏样式*/
	.branch{
		width: 240px;
		min-height: 100%;
		padding-bottom: 20px;
		border-left: 1px solid #ddd;
		background: #fff;
		position: fixed;
		right: 0;
		top: 45px;
		//z-index: 99;
	}
	.branch span{
		float: right;
	}
	.searchType{
		padding: 13px 15px 16px 16px;
		font-size: 14px;
		font-weight:bolder;
	}
	.reset{
		height: 66px;
		line-height: 66px;
		padding: 0 10px;
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
	.mask{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(55,55,55,.6);
		height: 100%;
		z-index: 1000;
	}
	.maskWrap {
		position: fixed;
		overflow: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1000;
		-webkit-overflow-scrolling: touch;
		outline: 0;
	}
	.libg{
		background: #ddd;
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
	.addBox{
		width: 200px;
		height: 32px;
		margin: 10px auto;
	}
	.codeBox {
		width: 24px;
		height: 24px;
		cursor: pointer;
		font-size: 14px;
		line-height: 21px;
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: rgba(0,0,0,.5);
		border-radius: 50%;
		text-align: center;
		display: none;
	}
	.icon-close{
		width:12px;
		height:12px;
		fill: #fff;
		vertical-align: middle;
	}
	.cardBox:hover .codeBox {
		display: block;
	}
	.peopleGroup{
		max-height: 200px;
		overflow-y: scroll;
		margin-top:10px;
	}
</style>

