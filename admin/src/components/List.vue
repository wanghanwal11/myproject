/**
* Created by bk on 2017/3/28.
*/
<template>
        <div class="articleBox" @scroll="onScroll($event)">
        	<div class="branch">
        		<div class="reset">筛选
					<svg class="title-icon" aria-hidden="true">
						<use xlink:href="#icon-shaixuan"></use>
					</svg>
					<span @click="reset">重置</span>
				</div>
				<p class="searchType">关键字</p>
	            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
			        <div>
	                	<Input v-model="searchKey" @on-blur="search" @on-enter="vSearchEnter" placeholder="请输入..." :class="{hide: isblur}"></Input>
        			</div>
			    </Card>
			    <p class="searchType">时间</p>
			    <Date-picker type="daterange" :value="timevalue" :options="options2" @on-change="timeslot" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin: 0 0 15px 20px;"></Date-picker>
        		<Card style="width:260px" dis-hover :bordered="false" class="list-type-card">
					<p slot="title" style="font-weight: 500;">分类</p>
					<a slot="extra">
						<Button type="primary" style="width: 22px;height: 22px;padding:0;background: none;border: none;color: #333;font-size: 18px;line-height: 22px;" @click="addtype">+</Button>
					</a>
					<ul class="articleGroup">
						<li v-for='pjdt in projectdatas' @drop='drop($event,pjdt)' @dragover='allowDrop($event,pjdt)' :class="{libg: dropflag == pjdt.id}" style="padding: 5px 10px 5px 20px;"><Checkbox @on-change="stateList(pjdt)" v-model="pjdt.selectFlag">{{pjdt.name}}</Checkbox><svg class="del-icon" aria-hidden="true" @click="delType(pjdt)"><use xlink:href="#icon-guanbi-copy"></use></svg><span>{{pjdt.articlecount}}</span></li>
					</ul>
					<div class="addBox">
						<Input :class="{hide: addflag}" v-model="articleType" @on-blur="ok" @on-enter="vEnter($event)" placeholder="请输入分类名称" type="text"></Input>
					</div>
				</Card>
        	</div>
            <div class="lBox">
				<Row v-for="(value,key) in articleList">
					<div class="dateBox" @click="tract(value)">
						{{value.days}}  <span  style="cursor: pointer;float:right;margin-right:2.5%;"><Icon v-if="value.backflag" type="chevron-down"></Icon><Icon v-else type="chevron-up"></Icon></span><span style="color:#9494AB;padding-left:6px;">{{value.dayscount}}篇</span>
					</div>
					<Col :xs="24" :sm="24" :md="12" :lg="8" style="margin-bottom: 30px;padding-right: 25px;" v-for="item in value.everydaydata" :class="{hide: value.backflag}">
					<div draggable='true' @dragstart='drag(item.id)' @dragend='ondragend' class="divCard">

						<Card dis-hover>
							<Checkbox v-model="item.selectFlag" @on-change="selectArticles(item)" style="z-index:1" :class="{vCheckBox:true,hideCheckbox: !item.selectFlag}"><span></span></Checkbox>
							<div style="width: 88%;height: 0;padding-top: 56.25%;margin: 6% 6% 0;background-size: cover;background-position: center;background-repeat: no-repeat;" v-bind:style="{backgroundImage:'url('+item.def1+')'}">
								<div class="mark marks" v-model="item.selectFlag" :class="{vCheckBox:true,hideCheckbox: !item.selectFlag}"></div>
							</div>
							<p class="abstract">{{item.articletitle}}</p>
							<!--<div class="follow">-->
								<!--<div class="read">-->
									<!--<svg class="icon-ck" aria-hidden="true">-->
										<!--<use xlink:href="#icon-chakan"></use>-->
									<!--</svg>-->
									<!--<div class="number">{{item.def4}}</div>-->
								<!--</div>-->
								<!--<div class="read">-->
									<!--<svg class="icon-pl" aria-hidden="true">-->
										<!--<use xlink:href="#icon-pinglun"></use>-->
									<!--</svg>-->
									<!--<div class="number">{{item.def5}}</div>-->
								<!--</div>-->
								<!--<svg class="icon-del" aria-hidden="true" @click="delArticle(item)" style="margin-right:-9px;">-->
									<!--<use xlink:href="#icon-weibiaoti106"></use>-->
								<!--</svg>-->
								<!--<Poptip placement="bottom" class="codeBox" trigger="hover":class="{vCheckBox:true,hideCheckbox: !item.selectFlag}" >-->
									<!--<a>-->
										<!--<svg class="icon-code" aria-hidden="true">-->
											<!--<use xlink:href="#icon-erweima"></use>-->
										<!--</svg>-->
									<!--</a>-->
									<!--<div class="api" slot="content">-->
										<!--<img style="width: 100px;height: 100px;" :src="item.def2">-->
									<!--</div>-->
								<!--</Poptip>-->
								<!--<Button type="primary" class="icon-send" aria-hidden="true" @click="eject(item)" style="margin-right:13px;">发送</Button>-->
							<!--</div>-->
						</Card>
					</div>
					</Col>
				</Row>
			    <Modal
			        v-model="sendflag"
			        title="发送文章"
			        width="700">
			        <div class="sendBox">
			        	<div class="artbox">
							<iframe :src="articleHtml" frameborder="0" v-if="isSingle" style="width: 100%;height: 100%"></iframe>
							<div v-else class="wxBox">
								<div class="first">
									<img :src="listId[0].def1">
									<div class="firsttitle" v-model="listId[0].articletitle">{{listId[0].articletitle}}</div>
								</div>
								<div class="two" v-for="(article,index) in listId" v-if="index != 0">
									<p class="twoleft" v-model="article.articletitle">{{article.articletitle}}</p>
									<div class="tworight"><img :src="article.def1"></div>
								</div>
							</div>
				    	</div>
				    	<div class="group">
				    		<my-typeList @listenToChildSearchEvent="getArticle" @listenToChildGetTypeEvent='getType' @listenToChildSendTimesEvent="getSendTimesStr"></my-typeList>
				    	</div>
			        </div>
					<div slot="footer" style="line-height: 36px">
						<!--<span style="float: left">推送给：{{selectPeople}}</span>-->
						<!--<Checkbox v-model="isSendMessage" style="float: left">是否给没绑定微信号的市民发送短信</Checkbox>-->
						<div class="mask" :class="{hide: shortmessageflag}"></div>
						<div class="smallinfo" :class="{hide: shortmessageflag}">
							<Input v-model="shortmessage" type="textarea" :rows="4" placeholder="请输入..."></Input>
							<div class="shortBox" :class="{hide: shortmessageflag}"><Button type="info">发送</Button></div>
						</div>
						<!--<Button type="primary" size="large" v-if="isSingle" @click="editContent">短信</Button>-->
						<!--<Button type="text" size="large" @click="send(0)">预览</Button>-->
						<!--<Poptip trigger="hover" title="提示标题"  placement="top-end">-->
							<!--<svg class="title-icon" aria-hidden="true" @click="send(0)">-->
								<!--<use xlink:href="#icon-yulan1"></use>-->
							<!--</svg>-->
						<!--</Poptip>-->
						<Poptip placement="top" class="codeBox" trigger="hover" style="position: relative;right: 100px;top: 9px;">
							<a>
								<svg class="title-icon title-yulan" aria-hidden="true" @mouseover="previewover" @mouseout="previewout">
									<use xlink:href="#icon-yulan1"></use>
								</svg>
							</a>
							<div class="api" slot="content">
								<img style="width: 100px;height: 100px;" :src="previewCode">
							</div>
						</Poptip>
						<Poptip trigger="hover" title="提示标题" :content="sendTimesStr.timesStr" placement="top-end" class="list-send-Poptip">
							<Button type="primary" size="large" @click="send(1)">发送</Button>
						</Poptip>
					</div>
			    </Modal>
            </div>
        </div>
</template>

<script type="es6">
	var vm;
	import myTypeList from '../components/typeList'
	import {Row,Col} from 'iview/src/components/grid'
	import Card from 'iview/src/components/card'
	import Checkbox from 'iview/src/components/checkbox'
	import Modal from 'iview/src/components/modal'
	import DatePicker from 'iview/src/components/date-picker'
	import Poptip from 'iview/src/components/poptip'
	import Input from 'iview/src/components/input'

    export default {
        name: 'list',
        data (){
            return {
                articleList: [],
                listId: [],
				peopleType: {hobbygroup:[],stategroup:[]},
				sendflag: false,
				articletitle: '',
				articleimg: '',
				options2: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近一个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '最近三个月',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
               },
               	addflag:true,
				articleType:'',
				projectdatas:[],
				number:3,
			    page:1,
			    allpage: 1,
			    timeArticle:{},
			    searchKey:'',
			    dropflag:'',
			    articleId:'',
			    stategroup:[],
			    timevalue:[],
				articleHtml: '',
				isSingle: true,
				selectPeople: '',
				shortmessage:'',
				shortmessageflag:true,
				isDisable: true,
				isSendMessage: true,
				isblur: false,
				sendTimesStr: {},
				previewCode: ''
            }
        },
        components: {
			myTypeList,
			Row,
			Col,
			Card,
			Checkbox,
			Modal,
			DatePicker,
			Poptip,
			Input
		},
        created: function(){
        	vm = this;
        	vm.searchList(vm.searchKey,vm.stategroup,vm.timevalue);
			var urlBasePeopleState = vm.$store.state.serverHost + 'cmy/article/cmyarticletype/list';
			this.$http.get(urlBasePeopleState,{
					params: {
						type: this.$store.state.userInfo.streetorcommunityid,
						def6: vm.$store.state.userInfo.streetorcommunity
					}
				})
					.then(function (response) {
						debugger
						vm.projectdatas = response.data.rows;
					})
					.catch(function (error) {
						console.log(error);
					});
        },
		methods: {
			onScroll() {
				var offsetHeight = event.target.offsetHeight,
						scrollHeight = event.target.scrollHeight,
						scrollTop = event.target.scrollTop,
						scrollBottom = offsetHeight + scrollTop + 20;
				if(scrollBottom>scrollHeight)
				{
					debugger
					vm.page++;
					if(vm.page <= vm.allpage){
						vm.searchList(vm.searchKey,vm.stategroup,vm.timevalue);
					}else{
						vm.page = vm.allpage;
						return;
					}
				}

			},
			routeTo(name) {
				this.$router.push(name);
			},
			sele: function(item){
				if(!item.selectFlag){
					this.$set(item, 'selectFlag', true);
					this.listId.push(item.id);
				} else {
					this.$set(item, 'selectFlag', false);
					this.listId.splice(this.listId.indexOf(item.id), 1);
				}
			},
			eject: function(item){
				var vm = this;
				debugger;
				vm.shortmessageflag = true;
				if(typeof this.listId[0] === 'object') {
					for(var i=0;i<this.listId.length;i++){
						vm.$set(this.listId[i], 'selectFlag', false);
					}
				}
				vm.listId = [];
				vm.sendflag = true;
				vm.isSingle = true;
				vm.isDisable = true;
				vm.listId.push(item.id);
				vm.articleHtml =  vm.$store.state.aliHost + 'wechat/shequ/xinwenxq.html?articleid=' + item.id;
				vm.getWXSendTimes ();
				vm.getPreviewCode ();
			},
			selectArticles: function (item) {
				if(typeof this.listId[0] === 'number') {
					this.listId = [];
				}
				if(event.target.checked) {
					this.listId.push(item);
				} else {
					this.listId.splice(this.listId.indexOf(item), 1);
				}

				if(this.listId.length >= 2) {
					this.isDisable = false;
				} else {
					this.isDisable = true;
				}
				console.log(this.listId);
				this.$emit('listenToChildGetArticleEvent', this.listId);
				//vm.getWXSendTimes ();
				//vm.getPreviewCode ();
			},
			multiArticle: function () {
				if(typeof this.listId[0] === 'number') {
					this.listId = [];
				}
				if(this.listId.length == 0){
					vm.$Notice.info({
						desc: '请先选择文章!'
					});
				}
				vm.shortmessageflag = true;
				if(this.listId.length <= 8) {
					vm.sendflag = true;
					vm.isSingle = false;
				} else {
					vm.$Notice.info({
						desc: '一次推送不能超过8篇文章!'
					});
				}
			},
			send: function (number) {
				var vm = this;
				console.log(this.listId);
				debugger
				if(vm.sendTimesStr.times <=0) {
					vm.$Notice.info({
						desc: '本月已无发送次数!'
					});
					return;
				}
				var articleids;
				if(this.listId.length == 1) {
					articleids = this.listId;
				} else {
					for(var i = 0; i < this.listId.length; i++) {
						articleids.push(this.listId[0].id);
					}
				}
				var url = this.$store.state.serverHost + 'cmy/api/cmyArticle/sendArticleArray.ht';
				this.$http.get(url, {
					params: {
						articleids: articleids,
						communityid: this.$store.state.userInfo.streetorcommunityid,
						def6: this.$store.state.userInfo.streetorcommunity,
						hobbygroup: this.peopleType.hobbygroup.join(','),
						stategroup: this.peopleType.stategroup.join(','),
						sendtype: number
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							debugger
							if (response.data.isSucceed) {
								vm.$Notice.success({
									desc: '发送成功!'
								});
								vm.sendflag = false;
								vm.listId = [];
								if(number === 1) {
									vm.getWXSendTimes();
								}
							} else {
								vm.$Notice.info({
									desc: '发送失败!'
								});
							}
						})
						.catch(function (error) {
							console.log(error);
							vm.$Notice.info({
								desc: '发送失败!'
							});
						});
			},
			getType: function (data) {
				console.log(data);
				this.peopleType = data;
				this.selectPeople = this.peopleType.selectPeople.join('+');
			},
			getArticle: function (data) {

			},
			updateArticle: function (article) {
				event.stopPropagation();
				debugger;
				console.log(article);
				this.$store.commit('updateAuthor', article.articleauthor);
				this.$store.commit('updateTitle', article.articletitle);
				this.$store.commit('updateContent', article.articlecontent);
				this.$store.commit('updateId', article.id);
				this.$store.commit('updateDef1', article.def1);
				this.$router.push('quillEditor');
			},
			delArticle: function (article) {
				event.stopPropagation();
				var vm = this;
				var url = vm.$store.state.serverHost + 'cmy/article/cmyarticle/del';
				this.$http.post(url, this.qs.stringify({
					id: article.id
				}))
						.then(function (response) {
							console.log(response);
							if (response.data.isSucceed) {
								vm.articleList = [];
								vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
							}
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			addtype () {
				this.addflag = !this.addflag;
			},
			drag: function (id) {
				vm.articleId = id;
			},
			drop: function (event, data) {
				debugger
				this.dropflag = '';
				event.preventDefault();
				var urlweixinusersave = vm.$store.state.serverHost + 'cmy/article/cmyarticletyperelate/save.ht';
				this.$http.get(urlweixinusersave, {
					params: {
						articleid: this.articleId,
						articletypeid: data.id
					}
				})
						.then(function (response) {
							console.log(response)
							if (response.data.isSucceed) {
								data.articlecount += 1;
								vm.$Message.success({
									title: '分类成功!'
								});
							} else {
								vm.$Message.info({
									desc: response.data.message
								});
							}
						})
						.catch(function (error) {
							console.log(error);
							vm.$Message.error({
								desc: '分类失败!'
							});
						});
			},
			allowDrop: function (event, item) {
				this.dropflag = item.id;
				event.preventDefault();
			},
			ondragend: function () {
				debugger
				this.dropflag = '';
			},
			stateList: function (pjdt) {
				if (pjdt.selectFlag) {
					vm.stategroup.push(pjdt.id);
				} else {
					vm.stategroup.splice(vm.stategroup.indexOf(pjdt.id), 1);
				}
				if (this.stategroup) {
					vm.articleList = [];
					this.page = 1;
					vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
				}
			},
			delType (data) {
				var vm = this;
				var urlBasePeopleState = this.$store.state.serverHost + 'cmy/article/cmyarticletype/del.ht';
				this.$http.get(urlBasePeopleState, {
					params: {
						id: data.id
					}
				})
						.then(function (response) {
							debugger
							console.log(response);
							if (response.data.isSucceed) {
								vm.projectdatas.splice(vm.projectdatas.indexOf(data), 1)
							}
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			search: function () {
				this.page = 1;
				vm.articleList = [];
				vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
			},
			vSearchEnter: function () {
				event.target.blur();
			},
			searchList: function (searchKey, typeid, value) {
				debugger
				var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/listByTimeArray';
				this.$http.get(url, {
					params: {
						def3: this.$store.state.userInfo.streetorcommunityid,
						def6: this.$store.state.userInfo.streetorcommunity,
						articletypeids: vm.stategroup.join(),
						begincreatetimestr: value[0],
						endcreatetimestr: value[1],
						articletitle: vm.searchKey,
						page: this.page,
						rows: this.number
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							//console.log(response);
							//vm.timeArticle = {};
							if(response.data.rows.length > 0) {
								for(var i = 0; i < response.data.rows.length; i++){
									if(response.data.rows[i].everydaydata.length > 0){
										for(var j = 0; j< response.data.rows[i].everydaydata.length; j++) {
											vm.$set( response.data.rows[i].everydaydata[j], 'selectFlag', false);
										}
									}
								}
								vm.allpage++; //查出文章时才让总页数加一
							}

							vm.articleList = vm.articleList.concat(response.data.rows);
							//vm.timeArticle = vm.articleList;

							//console.log(vm.timeArticle);
						})
						.catch(function (error) {
							console.log(error);
						});
				//var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/listByTime.ht';
				//this.$http.get(url, {
				//	params: {
				//		def3: this.$store.state.userInfo.streetorcommunityid,
				//		articletypeids: vm.stategroup.join(),
				//		begincreatetimestr: value[0],
				//		endcreatetimestr: value[1],
				//		articletitle: vm.searchKey,
				//		page: this.page,
				//		rows: this.number
				//	},
				//	headers: {
				//		'token': this.$store.state.userInfo.access_token
				//	}
				//})
				//		.then(function (response) {
				//			console.log(response);
				//			vm.allpage = Math.ceil(response.data.total / vm.number);
				//			vm.timeArticle = {};
				//			vm.articleList = vm.articleList.concat(response.data.rows);
				//			for (var i = 0; i < vm.articleList.length; i++) {
				//				var now = new Date(vm.articleList[i].createtime);
				//				var year = now.getFullYear();
				//				var month = now.getMonth() + 1;
				//				var date = now.getDate();
				//				debugger
				//				vm.articleList[i].showCreatetime = year + "年" + month + "月" + date + "日";
				//				if (vm.articleList[i].def2 != null) {
				//					vm.articleList[i].def2 = '//' + vm.articleList[i].def2;
				//				}
				//				vm.$set(vm.articleList[i], 'selectFlag', false);
				//				vm.$set(vm.articleList[i], 'backflag', false);
				//				if (!vm.timeArticle[vm.articleList[i].showCreatetime]) {
				//					vm.timeArticle[vm.articleList[i].showCreatetime] = [];
				//					vm.timeArticle[vm.articleList[i].showCreatetime].push(vm.articleList[i]);
				//				} else {
				//					vm.timeArticle[vm.articleList[i].showCreatetime].push(vm.articleList[i]);
				//				}
				//			}
				//			console.log(vm.timeArticle);
				//		})
				//		.catch(function (error) {
				//			console.log(error);
				//		});
			},
			ok () {
				vm.addflag = true;
				debugger
				if (!this.articleType) {
					return;
				} else {
					var url = vm.$store.state.serverHost + 'cmy/article/cmyarticletype/save.ht';
					this.$http.get(url, {
						params: {
							name: this.articleType,
							type: vm.$store.state.userInfo.streetorcommunityid,
							def6: this.$store.state.userInfo.streetorcommunity
						}
					})
							.then(function (response) {
								console.log(response);
								vm.articleType = '';
								debugger
								var urlBasePeopleState = vm.$store.state.serverHost + 'cmy/article/cmyarticletype/list.ht';
								vm.$http.get(urlBasePeopleState, {
									params: {
										type: vm.$store.state.userInfo.streetorcommunityid,
										def6: vm.$store.state.userInfo.streetorcommunity
									}
								})
										.then(function (response) {
											console.log(vm.stategroup);
											debugger
											for (var i = 0; i < vm.stategroup.length; i++) {
												for (var j = 0; j < response.data.rows.length; j++) {
													if (vm.stategroup[i] == response.data.rows[j].id) {
														vm.$set(response.data.rows[j], 'selectFlag', true);
													}
												}
											}
											vm.projectdatas = response.data.rows;
										})
										.catch(function (error) {
											console.log(error);
										});
							})
							.catch(function (error) {
								console.log(error);
							});
				}

			},
			timeslot(data){
				vm.articleList = [];
				vm.timevalue = data;
				this.page = 1;
				vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
			},
			triggerBlur: function (event) {
				event.target.blur();
			},
			vEnter () {
				var vm = this;
				vm.addflag = true;
			},
			reset () {
				debugger
				vm.articleList = [];
				vm.searchKey = '';
				vm.stategroup = [];
				vm.timevalue = [];
				this.page = 1;
				for (var i = 0; i < vm.projectdatas.length; i++) {
					vm.$set(vm.projectdatas[i], 'selectFlag', false);
				}
				vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
			},
			editContent () {
				debugger
				vm.shortmessageflag = !vm.shortmessageflag;
			},
			getSendTimesStr (data) {
				this.sendTimesStr = data;
			},
			getWXSendTimes () {
				var url = vm.$store.state.serverHost + 'cmy/api/cmyArticle/getMonthsCount';
				vm.$http.get(url,{
					params: {
						initId: vm.$store.state.communityDetail.initid
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.wxSendTimes = response.data.newPrimaryKeys.sendcount;
							console.log(vm.wxSendTimes);
							vm.sendTimesStr.timesStr = '还剩' + vm.wxSendTimes + '次';
							vm.sendTimesStr.times =  vm.wxSendTimes;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			getPreviewCode: function () {
				var url = vm.$store.state.serverHost + 'wx/api/wx/getimageTextPreviewCode';
				vm.$http.get(url,{
					params: {
						articleids: this.listId.join(','),
						initid: vm.$store.state.communityDetail.initid
					}
				})
						.then(function (response) {
							console.log(response);
							vm.previewCode = response.data.rows[0];
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			tract(value){
				for(var i=0;i<value.length;i++){
					value[i].backflag = !value[i].backflag;
				}
			},
			previewover: function () {
				console.log("over");
			},
			previewout: function () {
				console.log("out");
			}
		}
	}
</script>

<style scoped>
	.articleBox{
		width: 540px;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
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
    .branch{
		width: 259px;
		padding-bottom: 20px;
		border-left: 1px solid #ddd;
		background: #fff;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 99;
		height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}
	.branch span{
		float: right;
	}
	.searchType{
		padding: 15px;
		font-size: 14px;
	}
	.vCheckBox{
		display: block;
		position: absolute;
		top: 8%;
		left: 8%;
		padding-left: 3px;
	}
    .sendBox{
    	width: 668px;
    	height: 400px;
    }
    .mask{
    	width: 100%;
    	height: 100%;
    	position: fixed;
    	top: 0;
    	left: 0;
    	background: #000;
    	opacity: 0.5;
    }
    .sendtitle{
    	padding: 10px;
    	border-bottom: 1px solid #ddd;
    	font-size: 18px;
    }
    .artbox{
    	width: 250px;
    	height: 400px;
    	border-right: 1px solid #ddd;
    	border-top: none;
    	float: left;
    }
    .group{
    	width: 402px;
    	height: 400px;
    	float: right;
    }
	.sBox{
		width: 300px;
		height: 42px;
		margin-top: 20px;
		float: right;
		position: relative;
	}
	.date-search{
		width: 300px;
		height: 42px;
		padding-left: 10px;
		/*border-radius: 3px;*/
		font-size: 16px;
	}
	.add-article{
		width: 150px;
		height: 32px;
		line-height: 30px;
		border: 1px solid #3c7ce6;
		border-radius: 3px;
		float: right;
		margin: 20px 20px 0;
		text-align: center;
		color: #3c7ce6;
		position: relative;
		z-index: 3;
		cursor: pointer;
	}
	.articleGroup{
		max-height: 300px;
		overflow-y: scroll;
	}
	.articleGroup:hover{
		overflow-y: scroll;
	}
	.dateBox{
		width: 100%;
	    line-height: 45px;
	    background: #edf3ff;
	    padding-left: 10px;
	    font-size: 14px;
		margin-top: 30px;
		margin-bottom: 25px;
	}
	.spot{
		width: 4px;
		height: 4px;
		margin-top: 7px;
		border-radius: 50%;
		background: #3a404a;
		float: left;
	}
	.date{
		line-height: 18px;
		float: left;
		margin-left: 10px;
		font-size: 18px;
	}
	.line{
		width: 80%;
		height: 9px;
		margin-left: 25px;
		border-bottom:1px dashed #d7dde4 ;
		float: left;
	}
	.date-icon{
		width: 18px;
		height: 18px;
		margin-left: 5px;
		float: right;
	}
	.listBox{
		width: 370px;
		height: 340px;
		margin-right: 30px;
		margin-bottom: 40px;
		float: left;
		border-bottom: 1px solid #e1e1e1;
		background: #fff;
	}
	.bor{
		border: 1px solid #3399ff;
	}
	.picture{
		width:99%;
		height: 100%;
	}
	.pictureFirst {
		height: 30%;
	}
	.pictureFirst img{
		height: 100%;
		width:100%;
		max-height: 235px;
		cursor: pointer;
	}
	.picture img{
		width:100%;
		max-height: 235px;
		cursor: pointer;
	}
	.abstract{
		height: 48px;
		font-size:16px;
		margin: 10px 8%;
		line-height: 24px;
		color:#606060;
		word-wrap:break-word;
		word-break:normal;
		position: relative;
		overflow: hidden;
	}
	.icon-del{
		width:14px;
		height:14px;
		cursor: pointer;
		fill:#BDBDBF;
		float: right;
	}
	.codeBox{
		width:14px;
		height:14px;
		cursor: pointer;
		font-size: 14px;
		line-height: 14px;
		float: right;
		margin-right: 5px;
	}
	.icon-code{
		width:14px;
		height:14px;
		fill: #bdbdbf;
	}
	.icon-code:hover .codebox{
		display: block;
	}
	.icon-send{
		width:14px;
		height:14px;
		cursor: pointer;
		float: right;
		margin-right: 5px;
		fill: #BDBDBF;
		opacity: 0.5;
	}
	.follow{
		height:50px;
		padding: 15px 8%;
    	border-top: 1px solid #ddd;
	}
	.read{
		float:left;
		margin-right: 20px;
	}
	.icon{
		width:14px;
		height:14px;
		margin: 3px 5px 0 0;
		float:left;
	}
	.icon-pl{
		width:14px;
		height:14px;
		margin: 5px 5px 0 0;
		float:left;
		fill: #bdbdbf;
	}
	.icon-ck{
		width:20px;
		height:20px;
		margin: 0px 5px 0 0;
		float:left;
		fill: #bdbdbf;
	}
	.number{
		float:left;
		font-size:14px;
		color:#bdbdbf;
	}
	.mask{
		width: 700px;
		height: 432px;
		background: #000;
		opacity: 0.5;
		position: absolute;
		top: 50px;
		left: 0px;
		z-index: 8;
	}
	.smallinfo{
		width: 700px;
		position: absolute;
		bottom: 61px;
		left: 0px;
		z-index: 9;
	}
	.shortBox{
		width: 100px;
		position: absolute;
		bottom: 30px;
		right: 16px;
		z-index: 10;
	}
	.del-icon {
		width: 12px;
		height: 12px;
		vertical-align: middle;
		cursor: pointer;
		opacity: 0;
	}
	.articleGroup li:hover .del-icon{
		opacity: 0.3;
	}
	.newtype{
		margin: 20px;
	}
	.libg{
		background: #ddd;
	}
	.api img{
	}
	.wxBox{
		height: 100%;
		padding: 15px;
		border: 1px solid #ddd;
		overflow: hidden;
		overflow-y: auto;
	}
	.first{
		height: 120px;
		margin-bottom: 10px;
		position: relative;
	}
	.firsttitle{
		width: 100%;
		line-height: 30px;
		background: #000;
		opacity:0.6;
		position: absolute;
		left: 0;
		bottom: 0;
		text-align: center;
		color: #fff;
	}
	.two{
		padding: 15px 0;
		border-top: 1px solid #ddd;
		height: 80px;
		line-height: 50px;
	}
	.twoleft{
		width: 78%;
		float: left;
		word-wrap:break-word;
	}
	.tworight{
		width: 20%;
		height: 100%;
		float: right;
	}
	.first img{
		width: 100%;
		height: 100%;
	}
	.tworight img{
		width: 100%;
		height: 100%;
	}
	.wxBox::-webkit-scrollbar {
		width: 2px;
		height: 2px;
		background-color: #fff;
	}

	.wxBox::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: #fff;
	}

	.wxBox::-webkit-scrollbar-thumb {
		height: 20px;
		border-radius: 10px;
		background-color: rgba(0,0,0,.3);
	}
	.addBox{
		width: 200px;
		height: 32px;
		margin: 0 auto;
	}
	.hideCheckbox {
		display: none;
	}
	.divCard:hover  .vCheckBox{
		display: block;
	}
	.title-yulan {
		width: 22px;
		height: 22px;
	}

	.articleBox::-webkit-scrollbar {
		width: 2px;
		height: 2px;
		background-color: #fff;
	}

	.articleBox::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: #fff;
	}

	.articleBox::-webkit-scrollbar-thumb {
		height: 20px;
		border-radius: 10px;
		background-color: rgba(0,0,0,.3);
	}

	.branch::-webkit-scrollbar {
		width: 2px;
		height: 2px;
		background-color: #fff;
	}

	.branch::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: #fff;
	}

	.branch::-webkit-scrollbar-thumb {
		height: 20px;
		border-radius: 10px;
		background-color: rgba(0,0,0,.3);
	}
</style>

 