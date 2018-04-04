	/**
* Created by bk on 2017/3/28.
*/
	<template>
		<div class="settings">
			<Row :gutter="30" style="margin-left: 0;margin-right: 0;padding:25px 15px;">
				<Col span="16" >
				<div >
					<Card class="publicBox" dis-hover>
						<p slot="title">
							<span>设置</span>
							<Poptip trigger="hover" placement="bottom-start">
								<div slot="content" style="width:300px;word-break: break-word;white-space: pre-wrap;">开通微信后，进入微信公众号管理平台https://mp.weixin.qq.com/，点击”开发”--”基本配置”里面公众号开发信息来获取appid、appSecret，appid为开发者id，appSecret开发者密码。点击”设置”--”公众号设置”找到底部的”注册信息”模块，可找到原始ID。</div>
								<svg class="title-icon " aria-hidden="true" style="width:14px;height:14px;">
									<use xlink:href="#icon-wenhao"></use>
								</svg>
							</Poptip>
						</p>
						<!--<Dropdown v-if="!isAuthority" slot="extra" trigger="custom" @on-click="selectedWX" :visible="dropDownVisible" style="margin-left: 20px">-->
							<!--<Button  type="success" size="small"  @click="dropDownOpen" style="width: 145px;margin-top: -10px;margin-right: 10px;">-->
							<!--<span style="    position: relative;left: 0;top: 3px;">-->
								<!--<svg class="" aria-hidden="true" style="width:14px;height:14px;fill:#fff">-->
									<!--<use xlink:href="#icon-weixin"></use>-->
								<!--</svg>-->
							<!--</span>-->
								<!--使用其他微信公众号-->
							<!--</Button>-->
							<!--<DropdownMenu slot="list">-->
								<!--<div style="width: 300px">-->
									<!--<div v-if="gzhList.length == 0" style="text-align: center;color: #9ea7b4;margin-top: 10px"><p>没有可选的公众号</p></div>-->
									<!--<DropdownItem v-else v-for="(gzhItem,index) in gzhList" :name="JSON.stringify(gzhItem)" :class="{gzhItemActive: gzhItem.id == selectedGZHID}">-->
										<!--<div class="gzhItem">-->
											<!--<div style="width: 30px;height: 30px;">-->
												<!--<img :src="gzhItem.head_img" alt="" style="width: 30px;height: 30px;margin: 0;border-radius: 50%;"/>-->
											<!--</div>-->
											<!--<div style="margin-left: 30px;">-->
												<!--<div style="font-size: 17px">{{gzhItem.gzhmingc}}</div>-->
											<!--</div>-->
										<!--</div>-->
									<!--</DropdownItem>-->

									<!--<div style="text-align: right;margin:10px;">-->
										<!--<Button type="text" @click="dropDownClose">取消</Button>-->
										<!--<Button type="primary" @click="saveGZH">确定</Button>-->
									<!--</div>-->
								<!--</div>-->
							<!--</DropdownMenu>-->
						<!--</Dropdown>-->
						<Button v-if="!isAuthority" type="success" size="small" slot="extra" @click="authority" style="width: 145px;margin-top: -10px;">
							<span style="    position: relative;left: 0;top: 3px;">
								<svg class="" aria-hidden="true" style="width:14px;height:14px;fill:#fff">
									<use xlink:href="#icon-weixin"></use>
								</svg>
							</span>
							绑定本单位公众号
						</Button>
						<Button v-else type="warning" size="small" slot="extra" @click="opendelgzhModel" style="width: 80px;margin-top: -10px;">
							注销
						</Button>
						<div class="" style="display:flex;align-items:center;height: 168px;">
							<div style="width: 90px;height: 90px;margin-left: 50px;">
								<img :src="WeChat.headImg" alt="" style="width: 90px;height: 90px;margin: 0;border-radius: 50%;"/>
							</div>
							<div style="margin-left: 30px;min-height: 100px">
								<div style="font-size: 17px">{{WeChat.name}}</div>
								<div style="color: #9ea7b4">APPID:  {{WeChat.appid}}</div>
								<div style="color: #9ea7b4">原始ID:  {{WeChat.orgId}}</div>
								<div style="color: #9ea7b4">账号类型: {{WeChat.type}}</div>
							</div>
						</div>
					</Card>
				</div>
				<Card class="replyBox" dis-hover>
					<p slot="title">
						<span>自动回复</span>
						<Poptip trigger="hover" placement="bottom-start">
							<div slot="content" style="width:300px;word-break: break-word;white-space: pre-wrap;">1.  设置关注回复后，粉丝在关注您的公众号时，会自动发送您设置的文字
								2.  设置消息回复后，会在粉丝给您平台发送微信消息时，会自动回复您设置的文字</div>
							<svg class="title-icon" aria-hidden="true" style="width:14px;height:14px;margin-top:3px;margin-left:0px;">
								<use xlink:href="#icon-wenhao"></use>
							</svg>
						</Poptip>
					</p>
					<div class="" :class="{hide: !autoResFlag}">
						<div class="r-box">
							<div class="r-title">
								<svg class="title-icon" aria-hidden="true" style="width:14px;height:16px;">
									<use xlink:href="#icon-tianjiaadd143" class="fonts"></use>
								</svg>
								<p>关注回复</p>
							</div>
							<div class="clear"></div>
							<input class="reply-con inputColor" placeholder="请编辑被添加内容！" v-model="WeChat.hyy" type="text" @blur="addWeChatAnswer" @keyup.enter="triggerBlur($event)"/>
						</div>
						<div class="n-box">
							<div class="r-title">
								<svg class="title-icon" aria-hidden="true" style="width:14px;height:18px;">
									<use xlink:href="#icon-tubiao15"></use>
								</svg>
								<p>消息回复</p>
							</div>
							<div class="clear"></div>
							<div style="height: 125px;line-height: 125px;text-align: center; color:#a1c4fe;">消息回复功能正在开发</div>
							<!--<input class="reply-con inputColor" v-model="WeChat.answer" placeholder="请编辑消息内容！" type="text" @blur="addWeChat" @keyup.enter="triggerBlur($event)"/>-->
						</div>
						<div class="n-box">
							<div class="r-title">
								<svg class="title-icon" aria-hidden="true" style="width:18px;height:18px;">
									<use xlink:href="#icon-geci"></use>
								</svg>
								<p>关键词</p>
							</div>
							<div class="clear"></div>
							<div style="height: 125px;line-height: 125px;text-align: center; color:#a1c4fe;">关键字回复功能正在开发</div>
							<div class="labelBox hide">
								<div class="label">
									<Tooltip placement="top" content="打球" >
										<div class="label-name">健身<span>x</span></div>
									</Tooltip>
								</div>
								<div class="label">
									<Tooltip placement="top" content="豆浆，油条" >
										<div class="label-name">早餐<span>x</span></div>
									</Tooltip>
								</div>
								<div class="label">
									<Tooltip placement="top" content="地铁，公交" >
										<div class="label-name">交通工具<span>x</span></div>
									</Tooltip>
								</div>
								<div class="label">
									<Tooltip placement="top" content="热，冰激凌" >
										<div class="label-name">夏天<span>x</span></div>
									</Tooltip>
								</div>
								<div class="label-add-box">
									<Tooltip placement="top" content="添加关键词" >
										<Button class="label-add" @click="modal1 = true">+</Button>
									</Tooltip>
									<Modal
											v-model="modal1"
											title="新规则"
											@on-ok="onOk"
											width="760">
										<div class="Kcontent">
											<div class="rule">规则名</div>
											<div class="ruleBox"><input class="inputColor" v-model="ruleName" placeholder="请编辑被添加内容！" type="text" /></div>
											<div class="rule">关键字</div>
											<div class="ruleInput">
												<my-tag @listenToChildDelEvent="delTag" :dynamicTags="tags" @listenToChildAddEvent="addTag"></my-tag>
											</div>
											<div class="clear"></div>
											<div class="rule">回复　</div>
											<div class="replayCon">
												<textarea class="inputColor" v-model="replayCon" placeholder="请添加回复内容" type="text" ></textarea>
											</div>
											<div class="clear"></div>
										</div>
									</Modal>
								</div>
								<div class="clear"></div>
							</div>
						</div>
					</div>
					<div class="in-off" :class="{hide: autoResFlag}">
						<p>您还没有绑定·公众号！ </p>
						<p>绑定后可以设置自动回复</p>
					</div>
				</Card>
				</Col>
				<Col span="8">
				<Card class="menuBox" dis-hover>
					<div  slot="title">
						<p>
							菜单设置
							<svg class="title-icon" aria-hidden="true" style="float:right;margin-right:81%;width:14px;height:14px;margin-top:3px;">
								<use xlink:href="#icon-wenhao"></use>
							</svg>
						</p>
						<div v-if="isDownloadCode" style="float: right;margin-top: -27px;">
							<Poptip trigger="hover" placement="bottom">
								<Button   type="text" >公众号二维码</Button>
								<div v-if="isCreateCode" class="api" slot="content">
									<img style="width: 100px;height: 100px;" :src="shequCode">
									<div style="text-align: center;">
										<Button type="text" @click="downloadCode" size="small">下载</Button>
									</div>
								</div>
								<div v-else class="api" slot="content">
									<div v-if="codeType == 0" style="width: 100px;height: 140px;">
										<img v-if="shequCode" style="width: 100px;height: 100px;" :src="shequCode">
										<div v-else>
											<div  style="height: 116px;line-height: 116px;text-align: center">
												请上传二维码
											</div>
											<div  class="btnUploadCode" @click="triggerUploadBtn">
												电脑上传
												<input type="file" name="" ref="uploadCode" id="file" style="display: none" @change="imgChange">
											</div>
										</div>
									</div>
									<div v-else style="width: 100px;height: 140px;margin-left: 10px;line-height: 140px">
										<span @click="getloadCode" style="cursor: pointer"><Icon type="refresh"></Icon></span>
										重新获取二维码
									</div>
								</div>
							</Poptip>
						</div>
						<div v-else>
							<Button  disabled type="text" style="float: right;margin-top: -27px;">下载二维码</Button>
						</div>

					</div>
					<div class="menu">
						<div class="keyboard">
							<svg class="keyboard-icon" aria-hidden="true">
								<use xlink:href="#icon-weixinjianpan"></use>
							</svg>
						</div>
						<div class="menu-name"  :class="{menuSmall: menuCount === 3 || menuCount === 2,menuMiddle: menuCount === 1}" v-for="menu in menuData" @click="showNavMenu(menu)">
							<svg class="menu-title-icon" aria-hidden="true" @click="editorMenu(menu)">
								<use xlink:href="#icon-caidan"></use>
							</svg>  {{menu.name}}

							<div class="navmenu-add" :class="{hide: menu.isHideNavMenu}" @dragover="allowDrop">
								<div class="li" :id="index" draggable="true"  @drop="drop(menu,index)" @dragstart="drag(index)" v-for="(navMenu,index) in menu.children" @click="editorNavMenu(navMenu,menu)" style="border-bottom: 1px solid #d7dde4;cursor: pointer;">{{navMenu.name}}</div>
								<div  @click="addNavMenu(menu)" :class="{hide: menu.isHideAddNav}" style="-webkit-user-select:none;user-select:none;cursor: pointer;">+</div>
							</div>
						</div>
						<div class="menu-add" @click="addMenu" :class="{menuSmall: menuCount === 2,menuMiddle: menuCount === 1,menuLarge: menuCount === 0,hide: isHideAddMenu}" style=" -webkit-user-select:none;user-select:none;cursor: pointer">+</div>
					</div>
				</Card>
				</Col>
			</Row>
			<Modal v-model="modalNavMenu" width="900">
				<p slot="header" style="">
					{{modalNavMenuInfo.name}}
				</p>
				<div v-if="isShowMenuName">
					<div style="color: #8d8d8d;padding-bottom: 10px;">已添加子菜单，仅可设置菜单名称。</div>
					<div class="modalLabel">菜单名称	<Input v-model="modalNavMenuInfo.name" placeholder="请输入..." style="width: 300px;margin-left: 10px;"></Input></div>
					<div style="margin-left: 74px;font-size: 14px;color: #8d8d8d;"><span>字数不超过4个汉字或8个字母</span></div>
				</div>
				<div style="" v-else>
					<div class="modalLabel"><span v-if="isMenu">菜单名称</span><span v-else>子菜单名称</span>	<Input v-model="modalNavMenuInfo.name" placeholder="请输入..." style="width: 300px;margin-left: 10px;"></Input></div>
					<div style="margin-left: 74px;font-size: 14px;color: #8d8d8d;margin-top:6px;"><span v-if="isMenu">字数不超过4个汉字或8个字母</span><span v-else>字数不超过8个汉字或16个字母</span></div>
					<div style="margin-top: 10px"><span v-if="isMenu">菜单内容</span><span v-else>子菜单内容</span>
						<Radio-group v-model="navMenuContent" @on-change="radioChange" style="margin-left: 10px">
							<Radio label="view">
								<span>跳转网页</span>
							</Radio>
							<Radio label="click">
								<span>事件推送</span>
							</Radio>
							<Radio label="miniprogram">
								<span>小程序</span>
							</Radio>
						</Radio-group>
					</div>
					<div style="width: 800px;height: 400px; margin: 0 auto;border: 1px solid #d7dde4;margin-top: 10px">
						<div :class="{hide: navMenuContent !== 'view'}" style="padding: 16px 20px;">
							<div style="color: #8d8d8d;padding-bottom: 10px;">订阅者点击该子菜单会跳到以下链接</div>
							<div class="">链接地址	<Input v-model="modalNavMenuInfo.url" placeholder="请输入..." style="width: 300px;margin-left: 10px;"></Input></div>
							<div style="margin-top: 10px;">
								<Radio-group v-model="modalNavMenuInfo.url">
									<div>
										<div style="font-weight: 700;margin-bottom: 5px;">常用链接</div>
										<Radio v-for="url in listmenuurl" :label="url.url"><span>{{url.title}}</span></Radio>
									</div>
									<div style="margin-top: 10px;">
										<div style="font-weight: 700;margin-bottom: 5px;">预存链接</div>
										<Radio v-for="preSavePage in preSavePages" :label="preSavePage.url">
											<span>{{preSavePage.title}}</span>
										</Radio>
									</div>
									<!--<div style="margin-top: 10px;">-->
										<!--<div style="font-weight: 700;margin-bottom: 5px;">事件推送</div>-->
										<!--<Radio v-for="eventItem in eventTuiSong" :label="eventItem.url">-->
											<!--<span>{{eventItem.title}}</span>-->
										<!--</Radio>-->
									<!--</div>-->
									<!--<div style="margin-top: 10px;">-->
										<!--<div style="font-weight: 700;margin-bottom: 5px;">小程序</div>-->
										<!--<Radio v-for="item in xiaoChengXu" :label="item.url">-->
											<!--<span>{{item.title}}</span>-->
										<!--</Radio>-->
									<!--</div>-->
								</Radio-group>
							</div>
						</div>
						<div :class="{hide: navMenuContent !== 'click'}" style="padding: 16px 20px;">
							<div>
								<Radio-group v-model="modalNavMenuInfo.location">
									<div>
										<!--<div style="font-weight: 700;margin-bottom: 5px;">事件推送</div>-->
										<Radio v-for="eventItem in eventTuiSong" :label="eventItem.url">
											<span>{{eventItem.title}}</span>
										</Radio>
									</div>
									<!--<div style="margin-top: 10px;">-->
									<!--<div style="font-weight: 700;margin-bottom: 5px;">小程序</div>-->
									<!--<Radio v-for="item in xiaoChengXu" :label="item.url">-->
									<!--<span>{{item.title}}</span>-->
									<!--</Radio>-->
									<!--</div>-->
								</Radio-group>
							</div>
						</div>
						<div :class="{hide: navMenuContent !== 'miniprogram'}" style="padding: 16px 20px;">
							<div class="">链接地址	<Input v-model="modalNavMenuInfo.pagepath" placeholder="请输入..." style="width: 300px;margin-left: 10px;"></Input></div>
							<div style="margin-top: 10px">
								<Radio-group v-model="modalNavMenuInfo.pagepath">
									<div>
										<!--<div style="font-weight: 700;margin-bottom: 5px;">小程序</div>-->
										<Radio v-for="item in xiaoChengXu" :label="item.url">
											<span>{{item.title}}</span>
										</Radio>
									</div>
								</Radio-group>
							</div>
						</div>
					</div>
				</div>
				<div slot="footer">
					<Poptip v-model="isVisibleMenuPop"  placement="top-end" style="font-weight: 500;">
						<span v-if="isMenu"><a  v-if="!isMyMenu" >删除菜单</a></span>
						<span v-else><a>删除子菜单</a></span>
						<div  slot="title" >
							<p style="text-align: left;font-weight: 500">您确认删除这条内容吗？</p>
						</div>
						<div  slot="content" style="padding-left: 20px">
							<p style="font-size: 12px;font-weight: 500">删除后“{{modalNavMenuInfo.name}}”菜单下设置的内容将被删除</p>
							<div style="text-align: right;">
								<Button type="text" @click="cancelDel">取消</Button>
								<Button v-if="isMenu" type="primary" @click="delMenu(modalNavMenuInfo)" >确定</Button>
								<Button v-else type="primary" @click="delNavMenu" >确定</Button>
							</div>
						</div>
					</Poptip>
					<Button type="success" size="large" @click="saveMenu">确认提交</Button>
				</div>
			</Modal>
			<Modal v-model="delgzhModel" width="360">
				<p slot="header" style="color:#f60;text-align:center">
					<Icon type="information-circled"></Icon>
					<span>删除确认</span>
				</p>
				<div style="text-align:center">
					<p>删除后该账号下的所有设置(粉丝、菜单)都将清除</p>
				</div>
				<div slot="footer">
					<Button type="error" size="large" long  @click="delgzh">删除</Button>
				</div>
			</Modal>
		</div>
	</template>

	<script type="es6">
	import myTitle from '../components/title'
	import myTag from '../components/tag'
	import myList from '../components/List'
	import Input from 'iview/src/components/input'
	import Button from 'iview/src/components/button'
	import {Row,Col} from 'iview/src/components/grid'
	import Tooltip from 'iview/src/components/tooltip'
	import Poptip from 'iview/src/components/poptip'
	import Modal from 'iview/src/components/modal'
	import Card from 'iview/src/components/card'
	import Affix from 'iview/src/components/affix'
    import RadioGroup from 'iview/src/components/radio/radio-group'
    import Radio from 'iview/src/components/radio'
	import Icon from 'iview/src/components/icon'
	import Dropdown from 'iview/src/components/dropdown'
	import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
	import DropdownItem from 'iview/src/components/dropdown/dropdown-item'

    export default {
        name: 'admin',
		data () {
			return {
				autoResFlag: false,
				addFlag: true,
				modal1:false,
				ruleName:'',
				replayCon:'',
				WeChat: {
					name: '',
					orgId: '',
					appid: '',
					appSecret: '',
					id: '',
					answer: '',
					hyy: '',
					hyyid: 0,
                    type: '',
                    headImg: ''
				},
				tags: [],
				isSmallMenu: false,
                menuCount: 0,
				menuData: [],
				isHideAddMenu: false,
				isHideNavMenu: true,
				isHideAddNav: false,
				modalNavMenu: false,
				isMenu: true,
				isShowMenuName: true,
				modalNavMenuInfo: {},
				modalMenuInfo: {},
				navMenuContent: 'view',
				preSavePage: '',
				preSavePages: [],
				isMyMenu: false,
				selectedArticle: {},
				isVisibleMenuPop: false,
				isDownloadCode: false,
				shequCode: '',
				json:{
					title:"微信设置"
				},
				listmenuurl: [],
                isAuthority: false,
                authorizationCode: '',
				delgzhModel: false,
				isCreateCode: false,
				codeErrorMessage: '',
				codeType: -1,
				dropDownVisible: false,
				gzhList: [],
				currentWX: {},
				selectedGZHID: -1,
				eventTuiSong: [],
				xiaoChengXu: []
			}
		},
		components: {
			myTitle,
			myTag,
			myList,
			Input,
			Button,
			Row,
			Col,
			Tooltip,
			Poptip,
			Modal,
			Card,
			Affix,
			RadioGroup,
			Radio,
			Icon,
			Dropdown,
			DropdownMenu,
			DropdownItem
		},
		created: function() {
			var vm = this;
            this.$emit("change",2); // 触发父组件communityInfo.vue的change方法
			//获取微信基本信息
			this.authorizationCode = this.$lazy.getQueryString('auth_code');
			if(this.authorizationCode) {
				this.queryAuth();
			} else {
				this.wxGet();
				if(vm.$store.state.communityDetail.initid) {
					this.isDownloadCode = true;
				}

				//获取常用菜单
				this.getMenuUrl();
				this.getEventTuiSong();
				this.getXiaoChengXu();
				////获取菜单
				//this.getMenu();
				////
				//this.gethyy();
				////
				//this.getloadCode();
			}
			this.getUpGZH();
		},
		methods: {
			test () {
				//触发div的滚动事件
			},
			trim: function (s) {
				return s.replace(/(^\s*)|(\s*$)/g, "");
			},
			wxGet () {
				var vm = this;
				var url = this.$store.state.serverHost + 'wx/api/wx/get';
				this.$http.post(url, this.qs.stringify({
					communityid: vm.$store.state.userInfo.streetorcommunityid,
					communitytype: this.$store.state.userInfo.streetorcommunity
				}),{headers: {
					'token': this.$store.state.userInfo.access_token
				}}).then(function (response) {
					console.log(response);
					if(response.data.rows[0]) {
						vm.WeChat.name = response.data.rows[0].gzhmingc;
						vm.WeChat.orgId = response.data.rows[0].initid;
						vm.WeChat.appid = response.data.rows[0].gzhappid;
						vm.WeChat.appSecret = response.data.rows[0].gzhappsecret;
						vm.WeChat.answer = response.data.rows[0].autoanswer;
						vm.WeChat.id = response.data.rows[0].id;
                        vm.WeChat.type = response.data.rows[0].gzhleixing == 2 ? '服务号' : '订阅号';
                        vm.WeChat.headImg = response.data.rows[0].head_img;
                        //if(response.data.rows[0].status == ''){
                        //    vm.isAuthority = false;
                        //} else {
                        //    vm.isAuthority = response.data.rows[0].status > -1;
                        //}
						vm.isAuthority = response.data.rows[0].status == '0';
						vm.$store.state.communityDetail.initid = response.data.rows[0].initid;
						localStorage.initid = response.data.rows[0].initid;
						if(vm.$store.state.communityDetail.initid) {
							vm.isDownloadCode = true;
						}
						if(vm.WeChat.orgId && vm.WeChat.appid) {
							debugger;
							vm.autoResFlag = true;
						} else {
							vm.autoResFlag = false;
						}
						//获取预存页面
						vm.getPreSavePageUrl();
					} else {
						//没有获取数据时
						vm.WeChat.name = "";
						vm.WeChat.orgId = "";
						vm.WeChat.appid = "";
						vm.WeChat.appSecret = "";
						vm.WeChat.answer = "";
						vm.WeChat.id = "";
						vm.WeChat.headImg = "";
						vm.$store.state.communityDetail.initid = "";
						localStorage.initid = "";
						localStorage.uid = "";
						vm.autoResFlag = false;
						vm.isDownloadCode = false;
					}

					//获取菜单
					vm.getMenu();
					//
					vm.gethyy();
					//
					vm.getloadCode();
				}).catch(function (error) {
					console.log(error);
				});
			},
			addWeChatNew () {
				if(event.target.value) {
					this.addWeChat();
				}
			},
			addWeChat: function () {
				debugger;
				var vm = this;
				//原始id,appid,appSecret去除左右空格
				// debugger;
				// this.WeChat.orgId = this.WeChat.orgId.replace(/(^\s*)|(\s*$)/g, "");
				// this.WeChat.appid = this.WeChat.appid.replace(/(^\s*)|(\s*$)/g, "");
				// this.WeChat.appSecret = this.WeChat.appSecret.replace(/(^\s*)|(\s*$)/g, "");
				var url = this.$store.state.serverHost + 'wx/api/wx/updateAutoanswer';
				this.$http.post(url, this.qs.stringify({
					id: this.WeChat.id,
                    autoanswer: this.WeChat.answer,
					orgpath: this.$store.state.userInfo.streetorcommunity,
					orgid: this.$store.state.userInfo.streetorcommunityid
				}),{headers: {
					'token': this.$store.state.userInfo.access_token
				}})
						.then(function (response) {
							console.log(response);
							vm.$store.state.communityDetail.initid = vm.WeChat.orgId;
							//vm.WeChat.id = response.data.newPrimaryKeys.id;
							//提示消息用message，绑定成功时用notice
							if(response.data.isSucceed){
								vm.$Message.success( '保存成功!');
								if(vm.WeChat.orgId && vm.WeChat.appid) {
									vm.autoResFlag = true;
									vm.isDownloadCode = true;
									vm.getloadCode();
									//获取菜单
									vm.getMenu();
								} else {
									vm.autoResFlag = false;
									vm.isDownloadCode = false;
								}
							} else {
								vm.autoResFlag = false;
								vm.isDownloadCode = false;
								//vm.$Message.error( '绑定微信号失败!');
								vm.$Notice.error({
									title: '绑定微信号失败',
									desc: response.data.message
								});
							}

						})
						.catch(function (error) {
							console.log(error);
						});
			},
			addWeChatAnswer: function() {
				if(this.WeChat.orgId) {
					var vm = this;
					var url = this.$store.state.serverHost + 'wx/api/wx/savehyy';
					this.$http.post(url, this.qs.stringify({
						type: 0,
						body: this.WeChat.hyy,
						initid: this.WeChat.orgId,
						id: this.WeChat.hyyid
					}),{headers: {
						'token': this.$store.state.userInfo.access_token
					}})
							.then(function (response) {
								console.log(response);
								vm.$Message.success( '保存成功!');
								vm.WeChat.hyyid = response.data.newPrimaryKeys.id;

							})
							.catch(function (error) {
								console.log(error);
								vm.$Message.error( '保存失败!');
							});
				} else {
					this.$Notice.error({
						desc: '请先绑定微信公众号!'
					});
				}
			},
			triggerBlur: function (event) {
				console.log(event.target);
				event.target.blur();
			},
			onOk: function () {
				console.log(this.ruleName);
				console.log(this.ruleName);
				console.log(this.replayCon);
			},
			vEnter: function () {
				event.target.blur();
			},

			tagClose: function (name) {
				var index = this.labels.indexOf(name);
                this.labels.splice(index, 1);
			},
			addTag: function (data) {
				var tag = {};
				var d = new Date()
				tag.id = d.getTime();
				tag.name = data;
				this.tags.push(tag);
			},
			delTag: function (data) {
				console.log(data);
				//this.tags.splice(this.dynamicTags.indexOf(data), 1);
			},
			addMenu: function() {
                var length = this.menuData.length;
                this.menuCount = length + 1;
                if(length === 2){
                    this.isHideAddMenu = true;
                }
                if(length < 3){
                    var newMenu = {
                        name: '一级菜单',
                        isHideNavMenu: true,
                        isHideAddNav: false,
                        children: [],
                        mediaid: '',
                        type: '',
                        url: '',
						location: '',
						pagepath: ''
                    };
                    this.menuData.push(newMenu);
                }
			},
			delMenu: function (menu) {
				this.modalNavMenu = false;
				this.menuData.splice(this.menuData.indexOf(menu), 1);
                this.menuCount = this.menuData.length;
                this.isHideAddMenu = false;
                this.saveMenuAjax();
			},
			showNavMenu: function (menu) {
                debugger;
				for(var i = 0; i < this.menuData.length; i++) {
					//this.menuData[i].isHideNavMenu = true;
                    this.$set(this.menuData[i],'isHideNavMenu',true);
				}
				menu.isHideNavMenu = false;
				if(menu.children.length > 4){
					this.$set(menu,'isHideAddNav',true);
				}
			},
			editorMenu: function (menu) {
				this.modalNavMenu = true; //显示modal
                this.isMyMenu = false;//没有我的菜单了

				this.modalMenuInfo = menu;
				this.isMenu = true;
				if(!menu.children) {
					this.isShowMenuName = false;
				} else {
					if(menu.children.length > 0){
						this.isShowMenuName = true;
					} else {
						this.isShowMenuName = false;
					}
				}
debugger;
				this.modalNavMenuInfo = menu; // 一级菜单的内容展示在modal中
				this.navMenuContent = menu.type || 'view';
			},
			addNavMenu: function (menu) {
				event.stopPropagation(); //阻止冒泡，不去触发showNavMenu方法
				if(!menu.children){
					this.$set(menu,'children',[]);
				}
				debugger;
				var navMenus = menu.children;
				var length = navMenus.length; // 当前子菜单个数
                menu.isHideAddNav = !(length < 4);
				// 新增的子菜单
				var newMenu = {
					name: '子菜单名称',
					children: [],
					mediaid: '',
					type: '',
					url: '',
					location: '',
					pagepath: ''
				};
				navMenus.push(newMenu);
			},
			editorNavMenu: function (navMenu, menu) {
				event.stopPropagation(); //阻止冒泡，不去触发showNavMenu方法
				this.modalNavMenu = true;
				debugger;
				this.modalNavMenuInfo = navMenu; // 子菜单的内容展示在modal中
				this.modalMenuInfo = menu; //记录下子菜单对应的一级菜单
				this.isMenu = false; // 是否点击的一级菜单
				this.isShowMenuName = false;

				this.navMenuContent = navMenu.type || 'view';
			},
			delNavMenu: function () {
				this.modalMenuInfo.children.splice(this.modalMenuInfo.children.indexOf(this.modalNavMenuInfo), 1);
				this.isVisibleMenuPop = false;
				this.modalNavMenu = false;
				this.modalMenuInfo.isHideAddNav = false; //删除子菜单后将添加子菜单的按钮设置为可见
                this.saveMenuAjax();
			},
			cancelDel () {
				this.isVisibleMenuPop = false;
			},
			radioChange: function () {
				//console.log(this.navMenuContent);
			},
			getArticle: function (data) {
				this.selectedArticle = data[0];
			},
			saveMenu: function () {
				// 保存菜单内容
				if(this.isShowMenuName) {
					// 只能修改主菜单名字时
					this.modalNavMenuInfo.type = '';
					this.modalNavMenuInfo.mediaid =  '';
					this.modalNavMenuInfo.url =  '';
					this.modalNavMenuInfo.location =  '';
					this.modalNavMenuInfo.pagepath =  '';
				} else {
					this.modalNavMenuInfo.type = this.navMenuContent;
					this.modalNavMenuInfo.location = this.navMenuContent == 'click' ? this.modalNavMenuInfo.location : '';
					this.modalNavMenuInfo.url = this.navMenuContent == 'view' ? this.modalNavMenuInfo.url : '';
					this.modalNavMenuInfo.pagepath = this.navMenuContent == 'miniprogram' ? this.modalNavMenuInfo.pagepath : '';
					if(this.navMenuContent == 'view' && this.modalNavMenuInfo.url == '') {
						this.$Message.info("页面地址不能为空!");
						return;
					}
				}
				this.saveMenuAjax();
			},
			saveMenuAjax () {
				//关闭modal
				debugger;
				this.modalNavMenu = false;
				var vm = this;
				var url = vm.$store.state.serverHost + 'wx/api/wx/savewxmenu';
				this.$http.post(url, this.qs.stringify({
					wmenu: JSON.stringify(this.menuData),
					initid: this.$store.state.communityDetail.initid
				}),{headers: {
					'token': this.$store.state.userInfo.access_token
				}})
						.then(function (response) {
							console.log(response);
							debugger;
							if(!response.data.isSucceed) {
								vm.$Message.error(response.data.message);
							}

						})
						.catch(function (error) {
							console.log(error);
						});
			},
			getMenu: function () {
				var vm = this;
				var url = vm.$store.state.serverHost + 'wx/api/wx/getMenu';
				this.$http.post(url, this.qs.stringify({
					initid: this.$store.state.communityDetail.initid
				}),{headers: {
					'token': this.$store.state.userInfo.access_token
				}})
						.then(function (response) {
							console.log(response);

							if(response.data.rows.length > 0) {
                                vm.menuData  = JSON.parse(response.data.rows[0].menucontent);
                                for(var i = 0; i < vm.menuData.length; i++) {
                                    //this.menuData[i].isHideNavMenu = true;
                                    vm.$set(vm.menuData[i],'isHideNavMenu',true);
                                }
                                var length = vm.menuData.length;
                                vm.menuCount = length;
                                vm.isHideAddMenu = length === 3;
							} else {

							}
						})
						.catch(function (error) {
							debugger;
							console.log(error);
						});
			},
			getloadCode: function () {
				var vm = this;
				var url = vm.$store.state.serverHost + 'wx/api/wx/getForeverCode';
				this.$http.get(url, {
					params: {
						initid: this.$store.state.communityDetail.initid,
						code: 'SubCode'
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							if(response.data.isSucceed){
								vm.shequCode = response.data.rows[0];
								vm.isCreateCode = true;
								//vm.isCreateCode = false;
							} else {
								vm.isCreateCode = false;
								vm.codeErrorMessage = response.data.message;
								vm.codeType = response.data.code;
							}

						})
						.catch(function (error) {
							console.log(error);
						});
			},
			downloadCode: function () {
				var vm = this;
				debugger;
				window.open(this.$store.state.serverHost + 'wx/api/wx/downSubCode?initid=' + vm.$store.state.communityDetail.initid + '&token=' + this.$store.state.userInfo.access_token);
			},
			gethyy: function () {
				var vm = this;
				var url = vm.$store.state.serverHost + 'wx/api/wx/gethyy';
				this.$http.get(url, {
					params: {
						initid: this.$store.state.communityDetail.initid
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.WeChat.hyy = response.data.rows[0].body;
							vm.WeChat.hyyid = response.data.rows[0].id;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			getMenuUrl () {
				var vm = this;
				var url = this.$lazy.url.host + this.$lazy.url.listmenuurl;
				this.$http.get(url, {
					params: {
						state: 1,
						remark: 1
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.listmenuurl = response.data.rows;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			getPreSavePageUrl () {
				var vm = this;
				var url = this.$lazy.url.host + this.$lazy.url.listmenuurl;
				this.$http.get(url, {
					params: {
						state: 1,
						remark: this.WeChat.orgId
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.preSavePages = response.data.rows;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			getEventTuiSong () {
				var vm = this;
				var url = this.$lazy.url.host + this.$lazy.url.listmenuurl;
				this.$http.get(url, {
					params: {
						state: 1,
						remark: 'click'
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.eventTuiSong = response.data.rows;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			getXiaoChengXu () {
				var vm = this;
				var url = this.$lazy.url.host + this.$lazy.url.listmenuurl;
				this.$http.get(url, {
					params: {
						state: 1,
						remark: 'miniprogram'
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.xiaoChengXu = response.data.rows;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
            allowDrop() {
                event.preventDefault();
            },
            drag(index) {
                event.dataTransfer.setData("indext",index);
            },
            drop(menu,indexf) {
                event.preventDefault();
                //拖动dom的位置indext
                var indext = parseInt(event.dataTransfer.getData("indext"));
                //放下dom的位置indexf
              debugger;
                var tempt = menu.children[indext];
                if(indexf > indext) {
                    //event.target.parentNode.insertBefore(el, event.target.nextSibling);//改变数组的顺序元素的位置就自动发生变化了
                    for(var i = indext; i <= indexf; i++) {
                        if( i == indexf) {
                            //menu.children[i] = tempt;//将indext位置的数据放到indexf的位置上
                            this.$set(menu.children,i,tempt);
                        } else {
                            //menu.children[i] = menu.children[i + 1];//将indext(不包括)到indexf(包括)之间的数据向前移
                            this.$set(menu.children,i,menu.children[i + 1]);
                        }
                    }
                } else if (indexf < indext) {
                    //event.target.parentNode.insertBefore(el, event.target);//改变数组的顺序元素的位置就自动发生变化了
                    for(var j = indext; j >= indexf; j--){
                        if(j == indexf) {
                            //menu.children[j] = tempt;//将indext位置的数据放到indexf的位置上
                            this.$set(menu.children,j,tempt);
                        } else {
                            //menu.children[j] = menu.children[j - 1];
                            this.$set(menu.children,j,menu.children[j - 1]);
                        }
                    }
                } else {
                    return;
                }
                //拖动完成后调用保存接口
                this.saveMenuAjax();
            },
            authority () {
                debugger;
                var vm = this;
                var url = this.$lazy.url.host + this.$lazy.url.getauthurl;
                this.$http.get(url)
                        .then(function (response) {
                            debugger;
                            console.log(response);
                            //window.open(response.data.rows[0]);
							if(response.data.isSucceed){
								window.location.href = response.data.rows[0];
							}else {
								vm.$Message.info(response.data.message);
							}
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            unbind () {

            },
            queryAuth () {
                debugger;
                var vm = this;
                var url = this.$lazy.url.host + this.$lazy.url.queryAuth;
                this.$http.get(url, {
                    params: {
                        authorization_code: this.authorizationCode,
                        orgpath: this.$store.state.userInfo.streetorcommunity,
                        orgid: this.$store.state.userInfo.streetorcommunityid
                    },
                    headers: {
                        'token': this.$store.state.userInfo.access_token
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            if (response.data.isSucceed) {
                                vm.WeChat.name = response.data.rows[0].gzhmingc;
                                vm.WeChat.orgId = response.data.rows[0].initid;
                                vm.WeChat.appid = response.data.rows[0].gzhappid;
                                vm.WeChat.appSecret = response.data.rows[0].gzhappsecret;
                                vm.WeChat.answer = response.data.rows[0].autoanswer;
                                vm.WeChat.id = response.data.rows[0].id;
                                vm.WeChat.type = response.data.rows[0].gzhleixing == 2 ? '服务号' : '订阅号';
                                vm.WeChat.headImg = response.data.rows[0].head_img;
                                //if (response.data.rows[0].status == '') {
                                //    vm.isAuthority = false;
                                //} else {
                                //    vm.isAuthority = response.data.rows[0].status > -1;
                                //}
								vm.isAuthority = response.data.rows[0].status == '0';
                                vm.$store.state.communityDetail.initid = response.data.rows[0].initid;
                                if (vm.WeChat.orgId && vm.WeChat.appid) {
                                    debugger;
                                    vm.autoResFlag = true;
                                } else {
                                    vm.autoResFlag = false;
                                }
                                //获取预存页面
                                vm.getPreSavePageUrl();

								//授权后在执行
								if(vm.$store.state.communityDetail.initid) {
									vm.isDownloadCode = true;
								}

								//获取常用菜单
								vm.getMenuUrl();
								vm.getEventTuiSong();
								vm.getXiaoChengXu();
								//获取菜单
								vm.getMenu();
								//
								vm.gethyy();
								//
								vm.getloadCode();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
			delgzh () {
				var vm = this;
				var url = this.$lazy.url.host + this.$lazy.url.delgzh;
				this.$http.post(url, this.qs.stringify({
					initid: this.WeChat.orgId,
					orgid: this.$store.state.userInfo.streetorcommunityid,
					orgpath: this.$store.state.userInfo.streetorcommunity
				}),{headers: {
					'token': this.$store.state.userInfo.access_token
				}})
						.then(function (response) {
							console.log(response);
							vm.$Message.success("删除成功!");
							vm.delgzhModel = false;
							vm.isAuthority = false;
							//获取微信基本信息
							vm.wxGet();
							vm.getUpGZH();
							if(vm.$store.state.communityDetail.initid) {
								vm.isDownloadCode = true;
							}
							if(vm.menuData.length > 0) {
								vm.isSmallMenu = true;
							}
							if(vm.menuData.length > 1) {
								vm.isSmallMenu = true;
								vm.isHideAddMenu = true;
							}

							//获取常用菜单
							vm.getMenuUrl();
							vm.getEventTuiSong();
							vm.getXiaoChengXu();
							//获取菜单
							vm.getMenu();
							//
							vm.gethyy();
							//
							vm.getloadCode();
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			opendelgzhModel () {
				this.delgzhModel = true;
			},
			triggerUploadBtn () {
				this.$refs.uploadCode.click();
			},
			imgChange: function (e) {
				console.log(e);
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
						vm.shequCode = e.target.result;
						vm.upload();
					};
				}
			},
			upload () {
				var vm = this;
				var fileObj = document.getElementById("file").files[0];
				var form = new FormData();
				form.append("file", fileObj);
				form.append("initid",vm.$store.state.communityDetail.initid);
				var vm  = this;
				var url = this.$store.state.serverHost + 'wx/wechatgl/gzhguanli/uploadQrImage';
				this.$http.post(url, form)
						.then(function (response) {
							console.log(response);
							vm.shequCode = response.data.filepath;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			dropDownOpen () {
				this.dropDownVisible = true;
				this.currentWX = {};
			},
			dropDownClose () {
				this.dropDownVisible = false;
			},
			selectedWX (wx) {
				this.currentWX = JSON.parse(wx);
				this.selectedGZHID = this.currentWX.id;
			},
			selectedGZH (index){
				debugger;

			},
			getUpGZH () {
				var vm = this;
				debugger;
				var url = this.$lazy.url.host + '/wx/wechatgl/gzhguanli/getGzhListByCommunity';
				this.$http.get(url, {
					params: {
						communitytype: this.$store.state.userInfo.streetorcommunity,
						communityid: this.$store.state.userInfo.streetorcommunityid
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							debugger;
							vm.gzhList = response.data.rows;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			saveGZH () {
				var vm = this;
				if(this.gzhList.length == 0){
					this.dropDownVisible = false;
					return;
				}
				if(!this.currentWX.initid){
					this.$Message.info('请选择要使用的公众号');
					return;
				}
				var url = this.$lazy.url.host + '/wx/api/wx/save';
				this.$http.post(url, this.qs.stringify({
					initid: this.currentWX.initid,
					orgpath: this.$store.state.userInfo.streetorcommunity,
					orgid: this.$store.state.userInfo.streetorcommunityid
				}),{headers: {
					'token': this.$store.state.userInfo.access_token
				}})
						.then(function (response) {
							debugger;
							vm.selectedGZHID = -1;
							vm.dropDownVisible = false;
							vm.currentWX = {};
							if(response.data.isSucceed) {
								vm.wxGet();

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
		.settings {
			font-size: 14px;
			font-family: "微软雅黑";
		//padding: 25px 15px;
			position: relative;
		}
		.placeholderColor{
			color: #ddd;
		}
		.inputColor{
			color: #666;
		}
		.publicBox{
			width: 100%;
			height: 210px;
			float: left;
			border: 1px solid #d7dde4;
		}
		.public p{
			padding-left:23px;
			line-height: 18px;
		}
		.p-box{
			height: 60px;
			padding: 0 20px;
			border-bottom: 1px solid #d7dde4;
		}
		.p-box1{
			height: 60px;
			padding: 0 20px;
		}
		.p-title{
			line-height: 60px;
			float: left;
		}
		.settings img{
			vertical-align: top;
			margin: 16px 0px 0 10px;
		}
		.p-edit{
			float: right;
			cursor: pointer;
		}
		.public{
			padding: 20px 20px;
			font-size: 14px;
		}
		.title-icon{
			width: 16px;
			height: 16px;
			font-size:10px;
			cursor: pointer;
			float: left;
		}
		.menu-title-icon{
			width: 18px;
			height: 18px;
			font-size:10px;
			cursor: pointer;
			position: absolute;
			margin-top: 24px;
			margin-left: -15px;
		}
		.nameBox{
			width: 33%;
			height: 167px;
			float: left;
			border: none;
			border-right: 1px solid #e8ebee;
		}
		.nameBox1{
			width: 34%;
			height: 167px;
			float: left;
		}
		.name{
			width: 85%;
			height: 24px;
			line-height: 24px;
			font-size: 14px;
			margin: 15px auto 0px;
			text-align: center;
			border: none;
			outline: none;
			display: block;
		}
		.name:hover,.reply-con:hover{
			background: #ddd;
		}
		textarea{
			resize : none;
		}
		.name1{
			font-size: 14px;
			margin: 20px 0 0px 52px;
		}
		.lower{
			margin-top: 15px;
		}
		.reply-con{
			width: 90%;
			height: 24px;
			line-height: 24px;
			background: none;
			display: block;
			float: left;
			margin-top: 40px;
			margin-left: 45px;
			border: none;
			outline: none;
		}
		.prompt{
			height: 24px;
			line-height: 24px;
			float: left;
			margin-top: 40px;
			margin-left: 45px;
			color: #ccc;
		}
		.add-reply{
			width: 80px;
			height: 24px;
			line-height: 22px;
			background: #f8f8f8;
			border-radius: 12px;
			text-align: center;
			margin-left: 50px;
			margin-top: 40px;
			color: #666;
			float: left;
			cursor: pointer;
		}
		.replyBox{
			width: 100%;
			height: 535px;
			float: left;
			margin-top: 30px;
		}
		.r-box{
			height: 165px;
			padding: 20px 20px;
		}
		.n-box{
			height: 165px;
			padding: 20px 20px;
			border-top: 1px solid #d7dde4;
		}
		.r-title{
			float: left;
			font-size: 14px;
			width:76px;
		}
		.r-title .title-icon{
			margin-right:6px;
			margin-top:3px;
		}

		.label{
			width: 98px;
			height: 34px;
			float: left;
			margin-left: 40px;
			border:1px solid #ead483 ;
			margin-top: 45px;
		}
		.label-name{
			width: 96px;
			height: 32px;
			line-height: 32px;
			padding-left: 15px;
			text-align: center;
			border:1px solid #fff ;
			background: #fef6ce;
			color: #60646b;
			cursor: pointer;
			font-size: 14px;
		}
		.label-name span{
			margin-top: -5px;
			margin-left: 5px;
			color: #2c51b1;
			opacity: 0;
		}
		.label-name:hover span{
			opacity: 1;
		}
		.label-add-box{
			width: 98px;
			height: 34px;
			float: left;
			margin-left: 40px;
			margin-top: 45px;
		}
		.label-add{
			width: 98px;
			height: 34px;
			line-height: 20px;
			float: left;
			border:1px dashed #ead483 ;
			text-align: center;
			color: #ead483;
			font-size: 28px;
			cursor: pointer;
		}
		.ivu-modal{
			background: none;
		}
		.Kframe{
			width: 760px;
			height: 440px;
			position: fixed;
			left: 0;
			bottom: 0px;
			top: 0;
			right: 0;
			margin: auto auto;
			border: 1px solid #ddd;
			background: #fff;
			border-radius: 10px;
		}
		.Ktitle{
			height: 60px;
			padding-left: 20px;
			line-height: 60px;
			color: #333;
			font-size: 18px;
		}
		.Kcontent{
			font-size: 14px;
		}
		.rule{
			height: 32px;
			line-height: 32px;
			margin-top: 20px;
			float: left;
		}
		.ruleBox{
			width: 640px;
			height: 32px;
			margin-top: 20px;
			margin-left: 10px;
			border: 1px solid #d7dde4;
			float: left;
			border-radius: 3px;
			position: relative;
		}
		.ruleInput{
			width: 640px;
			height: 51px;
			margin-top: 23px;
			margin-left: 10px;
			/*border: 1px solid #d7dde4;*/
			float: left;
			/*border-radius: 3px;*/
			position: relative;
		}
		.ruleBox input{
			width: 638px;
			height: 30px;
			line-height: 30px;
			padding-left: 8px;
			border-radius: 3px;
			border: none;
			font-size: 14px;
		}
		.Kadd{
			width: 37px;
			height: 30px;
			line-height: 28px;
			position: absolute;
			top: 0;
			right: 0;
			text-align: center;
			font-size: 24px;
			border-left: 1px solid #d7dde4;
			background: #eee;
			border-top-right-radius:3px;
			border-bottom-right-radius:3px;
			color: #a4a4a4;
			cursor: pointer;
		}
		.Kwords{
			width: 640px;
			height: 30px;
			line-height: 30px;
			margin-top: 20px;
			margin-left: 58px;
		}
		.replayCon{
			width: 640px;
			height: 122px;
			float: left;
			margin-top: 20px;
			margin-left: 10px;
		}
		.replayCon textarea{
			width: 640px;
			height: 122px;
			padding: 9px;
			border-radius: 3px;
			font-size: 14px;
		}
		.menuBox{
			width: 100%;
			height: 775px;
			float: right;
			border: 1px solid #d7dde4;
			position: relative;
		}
		.menu{
			width: 100%;
			height: 66px;
			position: absolute;
			left: 0;
			bottom: 0px;
			background: #f4f4f4;
		}
		.keyboard{
			width: 19%;
			height: 66px;
			float: left;
			border-top: 1px solid #d7dde4;
		}
		.menu-name{
			height: 66px;
			line-height: 66px;
			text-align: center;
			border-left: 1px solid #d7dde4;
			border-top: 1px solid #d7dde4;
			color: #666;
			float: left;
			position: relative;
			cursor: pointer;
		}
		.menu-add{
			height: 66px;
			line-height: 66px;
			text-align: center;
			border-left: 1px solid #d7dde4;
			border-top: 1px solid #d7dde4;
			color: #666;
			float: left;
			background: #f4f4f4;
			position: relative;
		}
		.my-menu{
			height: 66px;
			line-height: 66px;
			text-align: center;
			border-left: 1px solid #d7dde4;
			border-top: 1px solid #d7dde4;
			color: #666;
			float: left;
			position: relative;
			cursor: pointer;
		}

		.navmenu-add{
			width: 100%;
			text-align: center;
			border: 1px solid #d7dde4;
			color: #666;
			float: left;
			position: absolute;
			left: 0;
			bottom: 78px;
			background: #f4f4f4;
		}

		.menuSmall {
			width: 27%;
		}
		.menuMiddle {
			width: 40%;
		}
		.menuLarge {
			width: 81%;
		}
		.menu-icon-del {
			width: 12px;
			height: 12px;
			cursor: pointer;
		}

		.modalLabel {

		}
		.menu-icon-tuwen {
			width: 30px;
			height: 25px;
			float: left;
			cursor: pointer;
		}

		.chooseTuwen {
			display: block;
			border: 2px dotted #d9dadc;
			padding: 42px 0;
			cursor: pointer;
		}
		.chooseTuwen:hover {
			border-color: #b3b3b3;
		}
		.menu-icon-tianjia {
			width: 20px;
			height: 20px;
		}

		.ivu-card-head p{
			font-weight:normal;
		}
		.in-off{
			padding-top: 220px;
		}
		.in-off p{
			line-height: 25px;
			text-align: center;
			color: #a1c4fe;
		}
		.keyboard-icon{
			width: 28px;
			height: 24px;
			margin: 21px 0 0 28px;
		}
		.clear{
			clear:both;
		}
		.codeBox{
			width: 14px;
			height: 14px;
			cursor: pointer;
			font-size: 14px;
			line-height: 14px;
			float: right;
			margin-right: 5px;
			position: absolute;
			top: 7%;
			left: 85%;
		}
		.btnUploadCode {
			width:64px;
			height:24px;
			background-color: #5b99ff;
			color:#fff;
			text-align:center;
			line-height:24px;
			cursor:pointer;
			border-radius:5px;
			overflow: hidden;
			margin-left: 28px;
		}
		.gzhItem {
			display:flex;
			align-items:center;
			height: 50px;
		}
		.gzhItemActive {
			background-color: #f3f3f3;
		}
	</style>