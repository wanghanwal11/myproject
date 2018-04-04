/**
* Created by bk on 2017/3/28.
*/
<template>
            <div class="cation">
				<!--<div class="reset">筛选
					<svg class="title-icon" aria-hidden="true">
						<use xlink:href="#icon-shaixuan"></use>
					</svg>
					<span @click="reset">重置</span>
				</div>-->
				<!--<Card style="width:260px" dis-hover>
	                <p slot="title">关键字</p>
	                <input v-model="searchKey" @blur="search" @keyup.enter="triggerBlur($event)" placeholder="请输入..." style="padding-left: 5px;margin: 0 0 20px 40px;"></input>
	            </Card>-->
	            <Tabs value="name1">
			        <Tab-pane label="分组" name="name1" :disabled="isDisabledGroup">
						<ul>
							<span  v-for='pjdt in projectdatas'>
								<Checkbox @on-change="stateList(pjdt)" v-model="pjdt.selectFlag">{{pjdt.peoplestate}}</Checkbox>
							</span>
						</ul>
						<Alert type="warning" :class="{hide: !isDisabledLabel}">已选择分组，不能再选择标签</Alert>
			        </Tab-pane>
			        <Tab-pane label="标签" name="name2" :disabled="isDisabledLabel">
						<ul>
							<span v-for='pjty in projecttype' @click="hobbyList(event,pjty)"><i class="tagList" :class="{tagbg: pjty.selectFlag}">{{pjty.hobby}}</i></span>
						</ul>
						<Alert type="warning" :class="{hide: !isDisabledGroup}">已选择标签，不能再选择分组</Alert>
			        </Tab-pane>
			        <!--<Tab-pane label="人员" name="pushPeople">-->
				        <!--<Select-->
			                <!--v-model="model13"-->
			                <!--style="width:362px;margin: 0 20px;"-->
			                <!--filterable-->
			                <!--remote-->
			                <!--placeholder="请搜索"-->
			                <!--:loading="loading1">-->
			                <!--<Option v-for="option in options1" :value="option.value" :key="new Date()">{{option.label}}</Option>-->
			            <!--</Select>-->
			        <!--</Tab-pane>-->
			    </Tabs>
				<!--<Card style="width:260px" dis-hover>
					<p slot="title">分组</p>
					<a slot="extra"></a>
					<ul>
						<span  v-for='pjdt in projectdatas'>
							<Checkbox @on-change="stateList(pjdt)" v-model="pjdt.selectFlag">{{pjdt.peoplestate}}</Checkbox>
						</span>
					</ul>
				</Card>
				<Card style="width:260px;margin-top: 20px;" dis-hover>
					<p slot="title">标签</p>
					<a href="" slot="extra"></a>
					<ul>
						<li v-for='pjty in projecttype' @click="hobbyList(event,pjty)"><i class="tagList" :class="{tagbg: pjty.selectFlag}">{{pjty.hobby}}</i><span>{{pjty.num}}</span></li>
					</ul>
				</Card>-->
			</div>
</template>
<script type="es6">
	var vm;
	let dom = null;
    import Tabs from 'iview/src/components/tabs'
    import Checkbox from 'iview/src/components/checkbox'
    import Alert from 'iview/src/components/alert'
    import TabPane from 'iview/src/components/tabs/pane'

    export default {
        name: 'list',
        components: {
        	Tabs,
        	Checkbox,
        	Alert,
        	TabPane
		},
		data (){
            return {
                modal1: false,
                projectdatas: [],
                projecttype: [],
                peopleId:'',
                typeId:[],
                peoplestate: '',
                stategroup: [],
				hobbygroup: [],
				searchKey: '',
				model13: '',
                loading1: false,
                options1: [],
				selectPeople: [],
				isDisabledGroup: false,
				isDisabledLabel: false,
				wxSendTimes: 0
            }
        },
        created: function(){
        	vm = this;
			var urlBasePeopleState = this.$store.state.serverHost + 'base/BasePeopleState/BasePeopleState/list'
            this.$http.get(urlBasePeopleState, {
				params: {
					communityid: this.$store.state.userInfo.streetorcommunityid,
					communitytype: this.$store.state.userInfo.streetorcommunity
				}
			})
                    .then(function (response) {
						console.log(response);
						vm.projectdatas = response.data.rows;
						var i = 0;
						debugger;
						//if (vm.projectdatas.length > 0) {
						//	vm.getWXSendTimes(vm.projectdatas[0].stategroup);
						//}
						for (; i < vm.projectdatas.length; i++) {
							vm.$set(vm.projectdatas[i], 'selectFlag', false);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
			var urlgetUserNumByHobbygroup = this.$store.state.serverHost + 'wx/wechatgl/weixinuser/getUserNumByHobbygroup'
			this.$http.get(urlgetUserNumByHobbygroup, {
				params: {
					communityid: this.$store.state.userInfo.streetorcommunityid,
					communitytype: this.$store.state.userInfo.streetorcommunity
				}
			})
					.then(function (response) {
						console.log(response);
						vm.projecttype = response.data.rows;
						var k = 0;
						for (; k < vm.projecttype.length; k++) {
							vm.$set(vm.projecttype[k], 'selectFlag', false);
						}
					})
					.catch(function (error) {
						console.log(error);
					});
		},
		methods: {
			routeTo(name) {
				this.$router.push(name);
			},
			peopleChange: function () {
				console.log(this.people);
			},
			stateList: function (pjdt) {
				debugger;
				if (pjdt.selectFlag) {
					this.stategroup.push(pjdt.stategroup);
					this.selectPeople.push(pjdt.peoplestate);
				} else {
					this.stategroup.splice(this.stategroup.indexOf(pjdt.stategroup), 1);
					this.selectPeople.splice(this.selectPeople.indexOf(pjdt.peoplestate), 1);
				}
				this.$emit('listenToChildGetTypeEvent', {
					hobbygroup: this.hobbygroup,
					stategroup: this.stategroup,
					selectPeople: this.selectPeople
				});

				if (this.stategroup.length === 0) {
					this.isDisabledLabel = false;
				} else {
					this.isDisabledLabel = true;
				}
			},
			hobbyList: function (e, pjty) {
				debugger
				if (!pjty.selectFlag) {
					this.$set(pjty, 'selectFlag', true);
					this.hobbygroup.push(pjty.hobbygroup);
					this.selectPeople.push(pjty.hobby);
				} else {
					this.$set(pjty, 'selectFlag', false);
					this.hobbygroup.splice(this.hobbygroup.indexOf(pjty.hobbygroup), 1);
					this.selectPeople.splice(this.selectPeople.indexOf(pjty.hobby), 1);
				}
				this.$emit('listenToChildGetTypeEvent', {
					hobbygroup: this.hobbygroup,
					stategroup: this.stategroup,
					selectPeople: this.selectPeople
				});
				if (this.hobbygroup.length === 0) {
					this.isDisabledGroup = false;
				} else {
					this.isDisabledGroup = true;
				}
			},
			reset () {
				var i = 0, k = 0;
				for (; i < this.projectdatas.length; i++) {
					this.$set(this.projectdatas[i], 'selectFlag', false);
				}
				for(;k<this.projecttype.length;k++){
					this.$set(this.projecttype[k], 'selectFlag', false);
				}
				this.stategroup = [];
				this.hobbygroup = [];
				this.searchKey = '';
			},
			search: function () {
                var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/list';
                this.$http.get(url, {
                    params: {
                        name: vm.searchKey
                    },
                    headers: {
                        'token': this.$store.state.userInfo.access_token
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.$emit('listenToChildSearchEvent', response.data.rows);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            triggerBlur: function (event) {
                console.log(event.target);
                event.target.blur();
            },
			getWXSendTimes (group) {
				var url = vm.$store.state.serverHost + 'cmy/api/cmyArticle/getMonthsCount';
				this.$http.get(url,{
					params: {
						communityid: vm.$store.state.userInfo.streetorcommunityid,
						hobbygroup: group
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.wxSendTimes = response.data.newPrimaryKeys.sendcount;
							console.log(vm.wxSendTimes);
							var timesStr = '还剩' + vm.wxSendTimes + '次';
							vm.$emit('listenToChildSendTimesEvent', {times:vm.wxSendTimes,timesStr:timesStr,group: group});
						})
						.catch(function (error) {
							console.log(error);
						});
			}
		}
    }
</script>

<style scoped>
	.cation{
		width: 100%;
		min-height: 100%;
		padding-bottom: 20px;
		background: #fff;
	}
	li{
		padding: 5px 10px 5px 0px;
		cursor: pointer;
	}
	li input{
		vertical-align: top;
		margin: 4px 5px 0 0;
	}
	li span{
		float: right;
	}
	.title-icon{
		width: 16px;
		height: 16px;
		vertical-align: middle;
		cursor: pointer;
		fill: #333;
	}
	.ivu-card-head{
		height: 46px;
	}
	.ivu-card-head{
		height: 46px;
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
	.libg{
		background: #ddd;
	}
	.ageBox{
		margin-top: 40px;
		padding: 0 10px;
	}
	.tagList{
		line-height: 22px;
		margin: 2px 4px 2px 0;
		font-style: normal;
		padding: 0 8px;
		border: 1px solid #e3e8ee;
		border-radius: 3px;
	    background: #f7f7f7;
	    font-size: 12px;
	    cursor: pointer;
	}
	.tagbg{
		background: #39f;
		color: #fff;
	}
	ul{
		height: 300px;
		padding: 0 20px;
		overflow: hidden;
	}
	ul:hover{
		overflow-y: scroll;
	}
	.peopleBox{
		margin: 0 20px;
		border: 1px solid #ddd;
	}
	.ptitle{
		padding-left: 10px;
		border-bottom: 1px solid #ddd;
		line-height: 30px;
		font-size: 18px;
	}
	.pbox{
		height: 180px;
		overflow: hidden;
	}
	.pbox:hover{
		overflow-y: scroll;
	}
	.pname{
		margin-top: 10px;
		margin-left: 10px;
		line-height: 50px;
	}
	.pname img{
		width: 50px;
		height: 50px;
		vertical-align: top;
	}
	.pbox1{
		height: 60px;
		margin-top: 10px;
		margin-left: 20px;
		overflow: hidden;
	}
	.pbox1:hover{
		overflow-y: scroll;
	}
	.pname1{
		width: 50px;
		height: 80px;
		margin-right: 30px;
		line-height: 30px;
		float: left;
	}
	.pname1 img{
		width: 50px;
		height: 50px;
	}
	.pname1 span{
		display: inline-block;
		text-align: center;
	}
</style>

 