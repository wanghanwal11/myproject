/**
* Created by bk on 2017/9/22.
*/
<template>
    <div class="articleBox" @scroll="onScroll($event)">
        <div class="branch">
            <div class="reset">
                <svg class="title-icon" aria-hidden="true">
                    <use xlink:href="#icon-shaixuan"></use>
                </svg>
                筛选
                <span @click="reset">重置</span>
            </div>
            <p class="searchType">文章标题</p>
            <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                <div>
                    <Input v-model="searchKey" @on-blur="search" @on-enter="vSearchEnter" placeholder="请输入..." :class="{hide: isblur}"></Input>
                </div>
            </Card>
            <p class="searchType">时间</p>
            <Date-picker type="daterange" :value="timevalue" :options="options2" @on-change="timeslot" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin: 0 0 15px 20px;"></Date-picker>
            <Card style="width:240px" dis-hover :bordered="false" class="list-type-card">
                <p slot="title" style="font-weight: bolder;">分类</p>
                <a slot="extra">
                    <Button type="primary" style="width: 22px;height: 22px;padding:0;background: none;border: none;color: #333;font-size: 18px;line-height: 22px;" @click="addtype">+</Button>
                </a>
				<loading v-if="isLoading.articleType">
					<div slot="tip"></div>
				</loading>
                <ul v-else class="articleGroup">
                    <li v-for='pjdt in projectdatas' @drop='drop($event,pjdt)' @dragover='allowDrop($event,pjdt)' :class="{libg: dropflag == pjdt.id}" style="padding: 5px 10px 5px 20px;"><Checkbox @on-change="stateList(pjdt)" v-model="pjdt.selectFlag">{{pjdt.name}}</Checkbox><svg class="del-icon" aria-hidden="true" @click="delType(pjdt)"><use xlink:href="#icon-guanbi-copy"></use></svg><span>{{pjdt.articlecount}}</span></li>
                </ul>
                <div class="addBox">
                    <Input :class="{hide: addflag}" v-model="articleType" @on-blur="ok" @on-enter="vEnter($event)" placeholder="请输入分类名称" type="text"></Input>
                </div>
            </Card>
        </div>
		<loading v-if="isLoading.searchArticle"></loading>
		<div v-else style="height: 100%">
			<div v-if="articleList.length == 1 && articleList[0].dayscount == 0" style="margin-right: 240px;height: 100%">
				<no-data-page path="kong2"></no-data-page>
			</div>
			<div v-else class="lBox" style="margin-right: 240px;margin-left:30px;">

				<Row v-for="(value,key) in articleList">
					<div class="dateBox" @click="tract(value)" style="font-size: 18px;color: #3c7ce6">
						<span v-if="value.months.substr(value.months.indexOf('年')+1) == '01月'">{{value.months}}</span><span v-else>{{value.months.substr(value.months.indexOf('年')+1)}}</span>  <span  style="cursor: pointer;float:right;margin-right:2.5%;"><Icon v-if="value.backflag" type="chevron-down"></Icon><Icon v-else type="chevron-up"></Icon></span><span style="font-size:14px;color:#a8aeb6;padding-left:6px;">{{value.monthscount}}篇</span>
					</div>
					<Col v-if="key === 0" :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 30px;padding-right: 16px;cursor: pointer" :class="{hide: value.backflag}">
					<div class="divAdd" style="border: 1px dashed #e1e1e1;background-color: #fbfbfb;position: relative;border-radius: 4px">
						<div style="width: 100%;height: 0;padding-top: 56.25%;">

						</div>
						<div style="height: 80px"></div>
						<div @click="routeTo('kong2')" style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;background-repeat: no-repeat;background-position: center;" :style="{backgroundImage:'url('+addPicture+')'}">

						</div>
					</div>
					</Col>
					<Col :xs="24" :sm="12" :md="8" :lg="6" style="margin-bottom: 30px;padding-right: 16px;" v-for="(item,itemKey) in value.everymonthdata" :class="{hide: value.backflag}">
					<div draggable='true' @dragstart='drag(item.id)' @dragend='ondragend' class="divCard">
						<Card dis-hover>
							<!--<Checkbox v-model="item.selectFlag" @on-change="selectArticles(item)" style="z-index:1" :class="{vCheckBox:true,hideCheckbox: !item.selectFlag}"><span></span></Checkbox>-->
							<div style="width: 100%;height: 0;padding-top: 56.25%;background-size: cover;background-position: center;background-repeat: no-repeat;cursor: pointer;position: relative;border-radius: 4px 4px 0 0;" v-bind:style="{backgroundImage:'url('+item.def1+')'}" @click="goToDetail(item)">
								<!--<div class="mark marks" v-model="item.selectFlag" :class="{vCheckBox:true,hideCheckbox: !item.selectFlag}"></div>-->
								<div class="sendBox" @click.stop="addToSend(item)">
									<svg class="send-icon" aria-hidden="true">
										<use xlink:href="#icon-iconfontfasong"></use>
									</svg>
								</div>
								<div class="divOther">
									<!-- <div class="mark marks otherMark">
                                        <div style="margin: 0 auto;width: 80%">
                                            <div class="read"> -->
									<!--<svg class="icon-ck" aria-hidden="true">-->
									<!--<use xlink:href="#icon-chakan"></use>-->
									<!--</svg>-->
									<!-- <img class="icon-pl" src="../assets/images/articlePingLun.png" alt="">
                                    <div class="number">{{item.def5}}</div>
                                </div>
                                <div class="read" style="left: 50%;"> -->
									<!--<svg class="icon-pl" aria-hidden="true">-->
									<!--<use xlink:href="#icon-pinglun"></use>-->
									<!--</svg>-->
									<!-- 		<img class="icon-ck" src="../assets/images/articleLook.png" alt="">
											<div class="number">{{item.def4}}</div>
										</div>
									</div> -->
									<!-- </div> -->
									<!--<div class="infoBox">-->
										<!--<div class="rightBox">-->
											<!--<dl>-->
												<!--<dt><img class="icon-pl" src="../assets/images/articlePingLun.png" alt=""></dt>-->
												<!--<dd><p>{{item.def5}}</p></dd>-->
											<!--</dl>-->

											<!--<dl>-->
												<!--<dt><img class="icon-ck" src="../assets/images/articleLook.png" alt=""></dt>-->
												<!--<dd><p>{{item.def4}}</p></dd>-->
											<!--</dl>-->

										<!--</div>-->
									<!--</div>-->

									<!--<div class="codeBox" style="right: 40px" :class="{vCheckBox:true,hideCheckbox: !item.selectFlag}" @click="delArticle(item,value.everydaydata,key)">-->
										<!--<svg class="icon-close" aria-hidden="true">-->
											<!--<use xlink:href="#icon-guanbi-copy"></use>-->
										<!--</svg>-->
										<!--&lt;!&ndash;<img src="../assets/images/delInco.png" alt=""/>&ndash;&gt;-->
									<!--</div>-->
									<div class="codeBox" :class="{vCheckBox:true,hideCheckbox: !item.selectFlag}">
										<Poptip trigger="hover" placement="bottom" style="float: right" class="handlerMenu">
											<svg class="caidan-icon" aria-hidden="true">
												<use xlink:href="#icon-caidan"></use>
											</svg>
											<div class="api" slot="content">
												<div class="handler-item handler-item1" @click="">
													<!--<svg class="handler-icon icon-del" aria-hidden="true">-->
													<!--<use xlink:href="#icon-weibiaoti106"></use>-->
													<!--</svg>-->
													<span @click="goToPreview(item)">预览</span>
												</div>
												<div class="handler-item" @click="updateArticle(item)">
													<!--<svg class="handler-icon" aria-hidden="true">-->
													<!--<use xlink:href="#icon-bianji1"></use>-->
													<!--</svg>-->
													<span>编辑</span>
												</div>
												<div class="handler-item" @click="delArticle(item,value.everymonthdata,key)">
													<!--<svg class="handler-icon" aria-hidden="true">-->
													<!--<use xlink:href="#icon-bianji1"></use>-->
													<!--</svg>-->
													<span>删除</span>
												</div>
											</div>
										</Poptip>
									</div>
								</div>
							</div>
							<!--<div class="abstract" v-if="item.articletitle.length > wordNum">{{item.articletitle.slice(0,wordNum) + '...'}}</div>-->
							<div class="abstract" :title="item.articletitle">{{item.articletitle}}</div>
							<div class="article-card-footer">
								<div class="showInfo pingLun">
									<div>
										<!--<img src="../assets/images/pingLun.png" alt=""/>-->
										<svg class="showInfo-svg" aria-hidden="true" style="width: 14px">
											<use xlink:href="#icon-pinglun2"></use>
										</svg>
										<span>{{item.def5}}</span>
									</div>
								</div>
								<div style="display:inline-block;height: 13px;border-right: 1px solid #999999"></div>
								<div class="showInfo chaKan">
									<div>
										<!--<img src="../assets/images/pingLun.png" alt=""/>-->
										<svg class="showInfo-svg" aria-hidden="true">
											<use xlink:href="#icon-chakan1"></use>
										</svg>
										<Badge dot count="0">
											<span style="margin-left: 0">{{item.def4}}</span>
										</Badge>
									</div>
								</div>
								<!--<div class="showInfo renShu">-->
									<!--<div style="border-right: none">-->
										<!--&lt;!&ndash;<img src="../assets/images/pingLun.png" alt=""/>&ndash;&gt;-->
										<!--<svg class="showInfo-svg" aria-hidden="true" style="width: 12px">-->
											<!--<use xlink:href="#icon-ren-copy-copy"></use>-->
										<!--</svg>-->
										<!--<span>0</span>-->
									<!--</div>-->
								<!--</div>-->
							</div>
							<!--<Poptip placement="bottom" class="codeBox" :class="{vCheckBox:true,hideCheckbox: !item.selectFlag}"-->
							<!--confirm-->
							<!--title="确认是否删除？"-->
							<!--@on-ok="del(item,value.everydaydata)">-->
							<!--<svg class="icon-close" aria-hidden="true">-->
							<!--<use xlink:href="#icon-guanbi-copy"></use>-->
							<!--</svg>-->
							<!--</Poptip>-->
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
							<!--<Poptip placement="top" style="float: right" class="handlerMenu">-->
							<!--<svg class="caidan-icon" aria-hidden="true">-->
							<!--<use xlink:href="#icon-caidan"></use>-->
							<!--</svg>-->
							<!--<div class="api" slot="content">-->
							<!--<div class="handler-item handler-item1" @click="delArticle(item)">-->
							<!--<svg class="handler-icon icon-del" aria-hidden="true">-->
							<!--<use xlink:href="#icon-weibiaoti106"></use>-->
							<!--</svg>-->
							<!--<span style="margin-left: 20px">删除</span>-->
							<!--</div>-->
							<!--<div class="handler-item" @click="updateArticle(item)">-->
							<!--<svg class="handler-icon" aria-hidden="true">-->
							<!--<use xlink:href="#icon-bianji1"></use>-->
							<!--</svg>-->
							<!--<span style="margin-left: 20px">编辑内容</span>-->
							<!--</div>-->
							<!--</div>-->
							<!--</Poptip>-->
							<!--<svg class="caidan-icon" aria-hidden="true" @click="addToSend(item)">-->
							<!--<use xlink:href="#icon-iconfontfasong"></use>-->
							<!--</svg>-->
							<!--<Poptip placement="bottom" class="codeBox" trigger="hover":class="{vCheckBox:true,hideCheckbox: !item.selectFlag}" >-->
							<!--<a>-->
							<!--<svg class="icon-close" aria-hidden="true">-->
							<!--<use xlink:href="#icon-guanbi-copy"></use>-->
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

				<!--<Modal-->
				<!--v-model="sendflag1"-->
				<!--title="发送文章"-->
				<!--width="700">-->
				<!--<div class="sendBox">-->
				<!--<div class="artbox">-->
				<!--&lt;!&ndash;<Col class="demo-spin-col" span="8">&ndash;&gt;-->
				<!--&lt;!&ndash;<Spin fix>&ndash;&gt;-->
				<!--&lt;!&ndash;<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>&ndash;&gt;-->
				<!--&lt;!&ndash;<div>Loading</div>&ndash;&gt;-->
				<!--&lt;!&ndash;</Spin>&ndash;&gt;-->
				<!--&lt;!&ndash;</Col>&ndash;&gt;-->
				<!--<iframe :src="articleHtml" frameborder="0" v-if="isSingle" style="width: 100%;height: 100%"></iframe>-->
				<!--<div v-else class="wxBox">-->
				<!--<div class="first">-->
				<!--<img :src="listId[0].def1">-->
				<!--<div class="firsttitle" v-model="listId[0].articletitle">{{listId[0].articletitle}}</div>-->
				<!--</div>-->
				<!--<div class="two" v-for="(article,index) in listId" v-if="index != 0">-->
				<!--<p class="twoleft" v-model="article.articletitle">{{article.articletitle}}</p>-->
				<!--<div class="tworight"><img :src="article.def1"></div>-->
				<!--</div>-->
				<!--</div>-->
				<!--</div>-->
				<!--<div class="group">-->
				<!--<my-typeList @listenToChildSearchEvent="getArticle" @listenToChildGetTypeEvent='getType'></my-typeList>-->
				<!--</div>-->
				<!--</div>-->
				<!--<div slot="footer" style="line-height: 36px">-->
				<!--&lt;!&ndash;<span style="float: left">推送给：{{selectPeople}}</span>&ndash;&gt;-->
				<!--&lt;!&ndash;<Checkbox v-model="isSendMessage" style="float: left">是否给没绑定微信号的市民发送短信</Checkbox>&ndash;&gt;-->
				<!--<div class="mask" :class="{hide: shortmessageflag}"></div>-->
				<!--<div class="smallinfo" :class="{hide: shortmessageflag}">-->
				<!--<Input v-model="shortmessage" type="textarea" :rows="4" placeholder="请输入..."></Input>-->
				<!--<div class="shortBox" :class="{hide: shortmessageflag}"><Button type="info">发送</Button></div>-->
				<!--</div>-->
				<!--&lt;!&ndash;<Button type="primary" size="large" v-if="isSingle" @click="editContent">短信</Button>&ndash;&gt;-->
				<!--&lt;!&ndash;<Button type="text" size="large" @click="send(0)">预览</Button>&ndash;&gt;-->
				<!--&lt;!&ndash;<Poptip trigger="hover" title="提示标题"  placement="top-end">&ndash;&gt;-->
				<!--&lt;!&ndash;<svg class="title-icon" aria-hidden="true" @click="send(0)">&ndash;&gt;-->
				<!--&lt;!&ndash;<use xlink:href="#icon-yulan1"></use>&ndash;&gt;-->
				<!--&lt;!&ndash;</svg>&ndash;&gt;-->
				<!--&lt;!&ndash;</Poptip>&ndash;&gt;-->
				<!--<Poptip placement="top" class="yulan" trigger="hover" style="position: relative;right: 100px;top: 9px;">-->
				<!--<a>-->
				<!--<svg class="title-icon title-yulan" aria-hidden="true" @mouseover="previewover" @mouseout="previewout">-->
				<!--<use xlink:href="#icon-yulan1"></use>-->
				<!--</svg>-->
				<!--</a>-->
				<!--<div class="api" slot="content">-->
				<!--<img v-if="isGetPreviewCode" style="width: 118px;height: 100px;" :src="previewCode">-->
				<!--<div v-else>-->
				<!--<div v-if="isLoadingPreviewCode" style="width: 118px;height: 100px;position: relative;">-->
				<!--<Spin fix size="large"></Spin>-->
				<!--</div>-->
				<!--<div v-else style="width: 118px;height: 100px;line-height: 118px;text-align: center;">-->
				<!--<span @click="getPreviewCode"><Icon type="refresh"></Icon></span>-->
				<!--重新获取二维码-->
				<!--</div>-->
				<!--</div>-->
				<!--</div>-->
				<!--</Poptip>-->
				<!--<Poptip trigger="hover" :content="sendTimesStr.timesStr" placement="top-end" class="list-send-Poptip">-->
				<!--<Button type="primary" size="large" @click="send(1)">发送</Button>-->
				<!--</Poptip>-->
				<!--</div>-->
				<!--</Modal>-->
				<Modal v-model="sendflag"
					   @on-ok="send(1)"
					   title="发送文章">
					<p>确定发送？</p>
				</Modal>
				<Modal v-model="modal2" width="360">
					<p slot="header" style="color:#f60;text-align:center">
						<Icon type="information-circled"></Icon>
						<span>删除确认</span>
					</p>
					<div style="text-align:center">
						<p>是否确认删除？</p>
					</div>
					<div slot="footer">
						<Button type="error" size="large" long  @click="del(arts)">删除</Button>
					</div>
				</Modal>
				<div class="demo-spin-container" style="height: 32px;">
					<!--<Spin size="large" v-if="spinShow" style="margin-left:50%;"></Spin>-->
					<loading v-if="spinShow"></loading>
				</div>
			</div>
		</div>
    </div>
</template>

<script type="es6">
	var vm;
	import myTypeList from '../components/typeList'
    import Card from 'iview/src/components/card'
    import Input from 'iview/src/components/input'
    import Checkbox from 'iview/src/components/checkbox'
    import {Row,Col} from 'iview/src/components/grid'
    import Poptip from 'iview/src/components/poptip'
    import Icon from 'iview/src/components/icon'
    import Spin from 'iview/src/components/spin'
    import Modal from 'iview/src/components/modal'
    import DatePicker from 'iview/src/components/date-picker'
    import Button from 'iview/src/components/button'
	import addPic from '../assets/images/addArticle.png'
	import noDataPage from '../components/noDataPage'
	import loading from '../components/loading'
	import Badge from 'iview/src/components/badge'
    export default {
        name: 'articleList',
        data (){
            return {
                articleList: [],
                listId: [],
              modal2:false,
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
			    arts:"",
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
				previewCode: '',
				isGetPreviewCode: false,
				isLoadingPreviewCode: false,
				spinShow:false,
				isTriggerScroll: true,
				wordNum: 20,
				addPicture: addPic,
				isArticleFirst: true,
				articleInArrayIndex: -1,
				isLoading: {searchArticle:true,articleType:true}
            }
        },
        components: {
			myTypeList,
			Card,
			Input,
			Checkbox,
			Row,
			Col,
			Poptip,
			Icon,
			Spin,
			Modal,
			DatePicker,
			Button,
			noDataPage,
			loading,
			Badge
		},
		created: function() {
			vm = this;
			vm.searchList(vm.searchKey,vm.stategroup,vm.timevalue);
			vm.searchArticleType();
			this.$emit("change",0); // 触发父组件article.vue的change方法
			window.addEventListener('scroll',vm.scroll);
		},
		destroyed: function () {
			debugger;
			window.removeEventListener('scroll',vm.scroll,false);
		},
		activated: function() {
			//vm = this;
			//debugger;
			//this.$emit("change",0); // 触发父组件article.vue的change方法
			////if(!this.$lazy.data.isNotArticleFirst){
			////	vm.searchList(vm.searchKey,vm.stategroup,vm.timevalue);
			////	vm.searchArticleType();
			////	this.$lazy.data.isNotArticleFirst = true;
			////	this.isArticleFirst = false;
			////}
			//window.addEventListener('scroll',vm.scroll);
			//if(this.$lazy.data.listMore){
			//	vm.articleList = [];
			//	this.$lazy.data.listMore = false;
			//}
		 //if(this.$lazy.data.list) {
		 //	//window.location.reload();
		 //	vm.articleList = [];
			//this.page = 1;
			//vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
			// vm.searchArticleType();
			////
		 //	//vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
		 //	//alert(vm.articallist);
		 //	this.$lazy.data.list = false;
		 //	this.$lazy.data.listMore = true;
		 //}
		},
		deactivated: function () {
			debugger;
			//window.removeEventListener('scroll',vm.scroll,false);
		},

		methods: {
			scroll: function() {
				if(vm.isTriggerScroll){
					var offsetHeight = document.body.offsetHeight,
							scrollHeight = document.body.scrollHeight,
							scrollTop = document.body.scrollTop;
					if(document.body.scrollTop == 0){
						offsetHeight = document.documentElement.offsetHeight;
						scrollHeight = document.documentElement.scrollHeight;
						scrollTop = document.documentElement.scrollTop;
					}
					var scrollBottom = offsetHeight + scrollTop + 50;
					if(scrollBottom >= scrollHeight)
					{
						debugger
						vm.page++;
						if(vm.page <= vm.allpage){
							vm.spinShow=true; //查询数据前显示spin
							vm.searchList(vm.searchKey,vm.stategroup,vm.timevalue);
						}else{
							vm.page = vm.allpage;
							vm.spinShow=false;
						}
					}
				}else {
					vm.isTriggerScroll = true;
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
				debugger;
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
				vm.getWXSendTimes ();
				vm.getPreviewCode ();
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
				var articleids=[];
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
			goToDetail: function(article) {
				debugger;
				event.stopPropagation();
				this.$store.commit('updateContent', {});
				this.$router.push({
					path:"articleDetail",
					query:{
						actid:article.id
					}
				});
			},
			goToPreview: function(article) {
				debugger;
				event.stopPropagation();
				this.$store.commit('updateContent', {});
				this.$router.push({
					path:"articleLocalPreview",
					query:{
						actid:article.id
					}
				});
			},
			updateArticle: function (article) {
				event.stopPropagation();
				debugger;
				this.$store.commit('updateContent', {});
				this.$router.push({
					path:"kong2",
					query:{
						actid:article.id
					}
				});
			},
			delArticle: function (article,articleArr,index) {
				event.stopPropagation();
				this.modal2=true;
				this.arts = article;
				this.currentArticleArr = articleArr;
				this.articleInArrayIndex = index;
			},
			del(article){
        event.stopPropagation();
        var vm = this;
        var url = vm.$store.state.serverHost + 'cmy/article/cmyarticle/del';
        this.$http.post(url, this.qs.stringify({
          id: article.id
        }))
          .then(function (response) {
            if (response.data.isSucceed) {
                vm.modal2=false;
				debugger;
				vm.currentArticleArr.splice(vm.currentArticleArr.indexOf(article), 1);
				vm.$set(vm.articleList[vm.articleInArrayIndex],'dayscount',vm.articleList[vm.articleInArrayIndex].dayscount - 1);
				vm.searchArticleType();
				//从推送中删除
				var sendItems = JSON.parse(localStorage.sendItems);
				for(var i = 0; i < sendItems.length; i++){
					if(sendItems[i].comeid == article.id) {
						sendItems.splice(i, 1);
					}
				}
				//改变localStorage
				localStorage.sendItems = JSON.stringify(sendItems);
				var dStr = new Date().getTime();
				vm.$store.commit('updateSendArticle', dStr);
				//保存到库中
				vm.saveSend(sendItems);
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
								vm.$Message.success('分类成功!');
							} else {
								vm.$Message.info(response.data.message);
							}
						})
						.catch(function (error) {
							console.log(error);
							vm.$Message.error('分类失败!');
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
					vm.isTriggerScroll = false;//不触发滚动事件
					this.page = 1;
					this.isLoading.searchArticle = true;
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
								vm.projectdatas.splice(vm.projectdatas.indexOf(data), 1);
								vm.stategroup.splice(vm.stategroup.indexOf(data.id), 1);
								vm.articleList = [];
								vm.isTriggerScroll = false;//不触发滚动事件
								vm.page = 1;
								vm.isLoading.searchArticle = true;
								vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
							}
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			search: function () {
				vm.isTriggerScroll = false;//不触发滚动事件
				this.page = 1;
				vm.articleList = [];
				this.isLoading.searchArticle = true;
				vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
			},
			vSearchEnter: function () {
				event.target.blur();
			},
			searchList: function (searchKey, typeid, value) {
				var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/listByMonthTimeArray';
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
							debugger;
							vm.isLoading.searchArticle = false;
							if(response.data.rows.length > 0) {
								for(var i = 0; i < response.data.rows.length; i++){
									if(response.data.rows[i].everymonthdata.length > 0){
										for(var j = 0; j< response.data.rows[i].everymonthdata.length; j++) {
											vm.$set( response.data.rows[i].everymonthdata[j], 'selectFlag', false);
										}
									}
								}
								vm.allpage++; //查出文章时才让总页数加一
							} else {
								vm.page--;
							}

							vm.articleList = vm.articleList.concat(response.data.rows);
							//vm.timeArticle = vm.articleList;
							//获取当天的日期
							var currentTime = new Date();
							var currentTimeStr = currentTime.getFullYear() + '年' + vm.$lazy.paddNum( currentTime.getMonth() + 1 ) + '月';
							var temp = {months: currentTimeStr,monthscount: 0,everymonthdata: [],backflag: false};
							if(vm.articleList.length > 0) {
								if(vm.articleList[0].months != currentTimeStr){
									vm.articleList.unshift(temp);
								}
							} else {
								vm.$set(vm.articleList,0,temp);
							}
							//console.log(vm.timeArticle);
							vm.spinShow=false; //查询数据后隐藏spin
						})
						.catch(function (error) {
							console.log(error);
						});
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
				vm.isTriggerScroll = false;//不触发滚动事件
				vm.articleList = [];
				vm.timevalue = data;
				this.page = 1;
				this.isLoading.searchArticle = true;
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
				vm.isTriggerScroll = false;//不触发滚动事件
				vm.articleList = [];
				vm.searchKey = '';
				vm.stategroup = [];
				vm.timevalue = [];
				this.page = 1;
				this.allpage = 1;
				for (var i = 0; i < vm.projectdatas.length; i++) {
					vm.$set(vm.projectdatas[i], 'selectFlag', false);
				}
				this.isLoading.searchArticle = true;
				vm.searchList(vm.searchKey, vm.stategroup, vm.timevalue);
			},
			editContent () {
				debugger
				vm.shortmessageflag = !vm.shortmessageflag;
			},
			getSendTimesStr (data) {
				//this.sendTimesStr = data;
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
							vm.$set(vm.sendTimesStr, 'timesStr', '还剩' + vm.wxSendTimes + '次');
							vm.$set(vm.sendTimesStr, 'times', '还剩' + vm.wxSendTimes);
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			getPreviewCode: function () {
				this.isLoadingPreviewCode = true;
				var url = vm.$store.state.serverHost + 'wx/api/wx/getimageTextPreviewCode';
				debugger;
				var articleids;
				if(this.listId.length == 1) {
					articleids = this.listId;
				} else {
					articleids = [];
					for(var i = 0; i < this.listId.length; i++) {
						articleids.push(this.listId[i].id);
					}
				}
				vm.$http.get(url,{
					params: {
						articleids: articleids.join(','),
						initid: vm.$store.state.communityDetail.initid
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.previewCode = response.data.rows[0];
							if(response.data.isSucceed) {
								vm.isGetPreviewCode = true;
							} else {
								vm.isGetPreviewCode = false;
							}
							vm.isLoadingPreviewCode = false;
						})
						.catch(function (error) {
							debugger;//123
							vm.isGetPreviewCode = false;
							vm.isLoadingPreviewCode = false;
							console.log(error);
						});
			},
			tract (value) {
				debugger;
				vm.$set(value, 'backflag', !value.backflag);
				vm.spinShow=false;
				//for(var i=0;i<value.length;i++){
				//	value[i].backflag = !value[i].backflag;
				//
				//}
			},
			previewover: function () {
				console.log("over");
			},
			previewout: function () {
				console.log("out");
			},
			searchArticleType: function () {
				var urlBasePeopleState = vm.$store.state.serverHost + 'cmy/article/cmyarticletype/list';

				this.$http.get(urlBasePeopleState,{
					params: {
						type: this.$store.state.userInfo.streetorcommunityid,
						def6: this.$store.state.userInfo.streetorcommunity
					}
				})
						.then(function (response) {
							vm.isLoading.articleType = false;
							vm.projectdatas = response.data.rows;

						})
						.catch(function (error) {
							console.log(error);
						});
			},
			addToSend (article) {
				debugger;
				var sendItems = JSON.parse(localStorage.sendItems);
				if(sendItems.length < 8) {
					for(var i = 0; i < sendItems.length; i++){
						if(sendItems[i].comeid == article.id) {
							this.$Message.info('已经在推送中!');
							return;
						}
					}
					article.comeid = article.id;
					article.title = article.articletitle;
					article.type = 'cmyarticle';
					article.cover = article.imgPath = article.def1;
					article.initid = this.$store.state.communityDetail.initid;
					article.communityid = this.$store.state.userInfo.streetorcommunityid;
					article.communitytype = this.$store.state.userInfo.streetorcommunity;
					sendItems.push(article);
					//改变localStorage
					localStorage.sendItems = JSON.stringify(sendItems);
					var dStr = new Date().getTime();
					this.$store.commit('updateSendArticle', dStr);
					//保存到库中
					this.saveSend(sendItems);
				} else {
					this.$Message.info('最多添加八条!');
				}
			},
			saveSend (sendItems) {
				var url =  this.$lazy.url.host + '/cmy/article/cmysendcart/saveCart';
				this.$http.post(url, JSON.stringify(sendItems), {
					headers: {
						'token': this.$store.state.userInfo.access_token,
						'Content-Type': 'application/json;charset=utf-8'
					}
				})
						.then(function (response) {
							debugger;
							console.log(response);
						})
						.catch(function (error) {
							console.log(error);
						});
			}
		}
	}
</script>

<style scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: absolute;
        top:231px;
        left:18px;
    }
    .infoBox{
        height:26px;
        background-color:rgba(0,0,0,0.5);
        position: absolute;
        bottom:10px;
        left: 50%;
        transform: translateX(-50%);
        display:none;
        width:auto;
        border-bottom-right-radius:15px;
        border-top-right-radius:15px;
        border-bottom-left-radius:15px;
        border-top-left-radius:15px;
    }
    .divCard:hover .infoBox{
        display: inline-block;
    }
    .rightBox{
        line-height: 27px;
        color:#fff;
        font-size:1px;
        display: -webkit-box;
        //width:70%;
    }
    .rightBox p:nth-child(2){
        margin-right:10px;
    }
    .rightBox dl{
        display: -webkit-flex;
        display: flex;
        padding:0 12px;
    }
    .rightBox dl:nth-child(3) dt img{
        width: 10px;
        height: 13px;
        margin-right: 5px;
        margin-top: 7px;
    }
    .rightBox dl:nth-child(2) dt img{
        width: 16px;
        height: 12px;
        margin-right: 5px;
        margin-bottom: -1px;
    }
    .rightBox dl:nth-child(1) dt img{
        width: 16px;
        height: 15px;
        margin-right: 5px;
        margin-bottom: -3px;
    }
    .mark{
        width: 88%;
        height: 34px;
        background:-webkit-gradient(linear, 0 0, 0 bottom, from(black), to(rgba(0, 0, 255, 0.5)));
        background: rgba(0,0,0,0.5)
    }
    .articleBox{
    //padding-left:30px;
        width: 100%;
		height: 100%;
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
        width: 240px;
        min-height: 100%;
        padding-bottom: 20px;
        border-left: 1px solid #ddd;
        background: #fff;
        position: fixed;
        right: 0;
        top: 45px;
        z-index: 99;
    }
    .branch span{
        float: right;
    }
    .searchType{
        padding: 15px;
        font-size: 14px;
        font-weight:bolder;
    }
    .vCheckBox{
        display: block;
        position: absolute;
        top: 10px;
		width: 15px;
		height: 15px;
		right: 10px
    }
    .sendBox{
        width: 30px;
        height: 30px;
		border-radius: 50%;
		background-color: #3c7ce6;
		position: absolute;
		bottom: -15px;
		right: 10px;
		box-shadow: 0 0 12px rgba(0,85,225,.8);
		border: 2px solid #fff;
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
        /*background: #edf3ff;*/
        padding-left: 10px;
        font-size: 13px;
        margin-top: 30px;
        /*margin-bottom: 25px;*/
        cursor: pointer;
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
        /*height: 48px;*/
        /*font-size:14px;*/
        /*margin: 10px 2%;*/
        /*line-height: 24px;*/
        /*color:#606060;*/
        /*word-wrap:break-word;*/
        /*word-break:normal;*/
        /*position: relative;*/
        /*overflow: hidden;*/
		padding: 0px 10px;
		height: 40px;
		line-height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    }
	.abstract span {
		position: absolute;
		font-size: 12px;
		color: #999999;
		right: 2px;
		top: 24px;
	}
    .icon-del{

    }
	.handler-item {
		position: relative;
		cursor: pointer;
		margin-top: 5px;
	}
	.handler-item1 {
		margin-top: 0;
	}
	.handler-item:hover .handler-icon{
		fill: #578ee9;
	}
	.handler-icon {
		width:14px;
		height:14px;
		fill:#BDBDBF;
		position: absolute;
		top: 2px;
	}
    .caidan-icon {
        width:20px;
        height:20px;
        cursor: pointer;
        fill:#fff;
		vertical-align: middle;
		margin-right: 2px;
    }
	.caidan-icon:hover {
		/*fill: #3c7ce6*/
	}
	.send-icon {
		width:14px;
		height:14px;
		cursor: pointer;
		fill:#fff;
		position: absolute;
		left: 6px;
		top: 6px;
	}
    .codeBox{
        width: 24px;
        height: 24px;
        cursor: pointer;
        font-size: 14px;
        line-height: 21px;
        float: right;
        position: absolute;
        top: 10px;
		right: 10px;
		background-color: rgba(0,0,0,.5);
		border-radius: 50%;
		text-align: center;
    }
    .yulan {
        width: 14px;
        height: 14px;
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
	.icon-close{
		width:12px;
		height:12px;
		fill: #fff;
		vertical-align: middle;
	}
	.icon-close:hover .codebox{
		display: block;
	}
    .icon-send{
        /* width: 56px; */
        /* height: 26px; */
        float: right;
        line-height: 9px;
        /* text-align: center; */
        margin-right: 5px;
        /* fill: #BDBDBF; */
        /* opacity: 0.5; */
        /* margin-top: 0px; */
        /* width: 19px; */
        height: 23px;
    }
    .follow{
        height:40px;
        padding: 10px 2%;
        border-top: 1px solid #ddd;
    }
    .read{
		position: absolute;
		width: 40%;
		top: 50%;
		transform: translate(0, -50%)
    }
    .icon{
        width:14px;
        height:14px;
        margin: 3px 5px 0 0;
        float:left;
    }
    .icon-pl{
        width:16px;
        height:15px;
        margin: 7px 5px 0 0;
        float:left;
    }
    .icon-ck{
        width:16px;
        height:12px;
        margin: 7px 5px 0 0;
        float:left;
    }
    .number{
        float:left;
        font-size:12px;
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
	.otherMark {
		position:absolute;
		width: 47%;
		height: 26px;
		bottom: 10px;
		border-radius: 13px;
		display: none;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.divCard:hover  .otherMark{
		display: block;
	}
	.sendBox:hover + .divOther {
		display: none;
	}
	.sendBox:hover {
		animation: animation .5s ease;
	}
	@keyframes animation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	/*.sendBox:hover + .otherMark {*/
		/*display: none;*/
	/*}*/
	/*.sendBox:hover + .vCheckBox  {*/
		/*display: none;*/
	/*}*/
	.article-card-footer {
		padding: 0 10px;
		height: 40px;
		line-height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.showInfo {
		display: inline-block;
		margin-left: 2px;
	}
	.showInfo img {
		width: 14px;
		height: 12px;
	}
	.showInfo span {
		font-size: 12px;
		color: #bdbdbf;
		margin-left: 5px;
	}
	.showInfo > div {
		display: flex;
		align-items: center;
		height: 16px;
		padding-right: 5px;
		/*border-right: 1px solid #999999;*/
	}
	.showInfo-svg {
		width:16px;
		height:16px;
		cursor: pointer;
		fill:#999999;
		vertical-align: middle;
		/*margin-right: 2px;*/
	}
</style>
