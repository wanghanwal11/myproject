/**
* Created by bk on 2017/3/28.
*/
<template>
	<div class="container">
        <div class="cation">
			<Card style="width:260px" dis-hover>
				<p slot="title">类型</p>
				<a slot="extra">
					<Button type="primary" style="width: 22px;height: 22px;padding:0;background: none;border: none;color: #333;font-size: 18px;" @click="addtype">+</Button>
				</a>
				<ul>
					<li v-for='pjdt in projectdatas'><Checkbox @on-change="stateList(pjdt)" v-model="pjdt.selectFlag">{{pjdt.title}}</Checkbox><span @click="typeDelete(pjdt.id)">x</span></li>
					<li ><input class="newtype" :class="{hide: addflag}" v-model="peopleType" @blur="ok" @keydown="keydown($event)" placeholder="新分类" type="text"></li>
				</ul>
			</Card>
		</div>
		<div class="content">
			<my-tag @listenToChildDelEvent="delTag" :dynamicTags="tags" @listenToChildAddEvent="addTag"></my-tag>
		</div>
	</div>
</template>
<script type="es6">
	import myTag from '../components/tag'
	let dom = null
	var vm;
    export default {
        name: 'list',
        components: {
        	myTag
		},
		data (){
            return {
                modal1: false,
                projectdatas: [],
                typeId:[],
                addflag:true,
                peopleType:'',
                peoplestate: '',
                stategroup: [],
                tags: [],
                parentid: 0,
                path: ''
            }
        },
        created: function(){
        	vm = this;
        	var url = vm.$store.state.serverHost + 'support/api/support/codelist';
        	this.$http.get(url, {
                params: {
                    parentid: 0
                },
                headers: {
                    'token': this.$store.state.userInfo.access_token
                }
            })
                    .then(function (response) {
                        vm.projectdatas = response.data.rows;
						var i=0;
						debugger;
						for(;i<vm.projectdatas.length;i++){
							vm.$set(vm.projectdatas[i], 'selectFlag', false);
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
            peopleChange:function(){
            	console.log(this.people);
            },
            stateList: function (pjdt) {
				debugger;
				var flag = pjdt.selectFlag;
				for(var i = 0;i<vm.projectdatas.length;i++){
					vm.$set(vm.projectdatas[i], 'selectFlag', false);
				}
				if(flag){
					this.$set(pjdt, 'selectFlag', true);
					this.parentid = pjdt.id;
					this.path = pjdt.path;
				}
				
				var url = this.$store.state.serverHost + 'support/api/support/codelist';
				this.$http.get(url,{
					params: {
						parentid: pjdt.id
					},
	                headers: {
	                    'token': this.$store.state.userInfo.access_token
	                }
				})
						.then(function (response) {
							console.log(response);
							vm.tags = [];
							 for(var i = 0; i < response.data.rows.length; i++) {
                                var tempObject = {};
                                tempObject.id = response.data.rows[i].id;
                                tempObject.name = response.data.rows[i].title;
                                vm.tags.push(tempObject);
                            }
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			ok () {
				vm.addflag = !vm.addflag;
				var url = vm.$store.state.serverHost + 'support/api/support/codesave';
				this.$http.post(url,this.qs.stringify({title: vm.peopleType}),{headers: {
					'token': this.$store.state.userInfo.access_token
				}})
						.then(function (response) {
							debugger
							var url = vm.$store.state.serverHost + 'support/api/support/codelist';
							        	vm.$http.get(url, {
							                params: {
							                    parentid: 0
							                },
							                headers: {
							                    'token': vm.$store.state.userInfo.access_token
							                }
							            })
							                    .then(function (response) {
							                        vm.projectdatas = response.data.rows;
													var i=0;
													debugger;
													for(;i<vm.projectdatas.length;i++){
														vm.$set(vm.projectdatas[i], 'selectFlag', false);
													}
							                    })
							                    .catch(function (error) {
							                        console.log(error);
							                    });
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			keydown (e) {
				if (event.which == 13) {
					event.target.blur();
				}
			},
			addtype () {
				this.addflag = !this.addflag;
			},
			typeDelete: function(id){
				var url = vm.$store.state.serverHost + 'support/api/support/codedel';
							vm.$http.get(url,{
								params: {
									id: id
								},
				                headers: {
				                    'token': vm.$store.state.userInfo.access_token
				                }
							})
									.then(function (response) {
										var url = vm.$store.state.serverHost + 'support/api/support/codelist';
							        	vm.$http.get(url, {
							                params: {
							                    parentid: 0
							                },
							                headers: {
							                    'token': vm.$store.state.userInfo.access_token
							                }
							            })
							                    .then(function (response) {
							                        vm.projectdatas = response.data.rows;
													var i=0;
													debugger;
													for(;i<vm.projectdatas.length;i++){
														vm.$set(vm.projectdatas[i], 'selectFlag', false);
													}
							                    })
							                    .catch(function (error) {
							                        console.log(error);
							                    });
									})
									.catch(function (error) {
										console.log(error);
									});
			},
			addTag: function (data) {
				debugger;
				var url = vm.$store.state.serverHost + 'support/api/support/codesave';
				this.$http.post(url,this.qs.stringify({
					parentid: vm.parentid,
					path: vm.path,
					title: data
					}),
					{headers: {
					'token': this.$store.state.userInfo.access_token
				}})
						.then(function (response) {
							debugger
							var url = vm.$store.state.serverHost + 'support/api/support/codelist';
							vm.$http.get(url,{
								params: {
									parentid: vm.parentid
								},
				                headers: {
				                    'token': vm.$store.state.userInfo.access_token
				                }
							})
									.then(function (response) {
										console.log(response);
										vm.tags = [];
										 for(var i = 0; i < response.data.rows.length; i++) {
			                                var tempObject = {};
			                                tempObject.id = response.data.rows[i].id;
			                                tempObject.name = response.data.rows[i].title;
			                                vm.tags.push(tempObject);
			                            }
									})
									.catch(function (error) {
										console.log(error);
									});
						})
						.catch(function (error) {
							console.log(error);
						});
				
			},
			delTag: function (data) {
				var url = this.$store.state.serverHost + 'support/api/support/codedel';
							this.$http.get(url,{
								params: {
									id: data.id
								},
				                headers: {
				                    'token': vm.$store.state.userInfo.access_token
				                }
							})
									.then(function (response) {
										this.tags.splice(this.dynamicTags.indexOf(data), 1);
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
		width: 261px;
		min-height: 100%;
		padding-bottom: 30px;
		border-right: 1px solid #ddd;
		background: #fff;
		position: fixed;
		top: 63px;
		left: 230px;
	}
	li{
		padding: 5px 10px 5px 40px;
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
	.tabg{
		background: #39f;
		color: #fff;
	}
	.content{
		width: 70%;
		height: 500px;
		margin-top: 30px;
		margin-left: 291px;
	}
</style>

 