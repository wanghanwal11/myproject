/**
* Created by bk on 2017/3/28.
*/
<template>
        <div class="enterprise">

			<my-search @listenToChildSearchEvent="getEnterpriseList"></my-search>
            <Row style="margin-left: 0px;">
		        <Col :lg="12" :md="24" v-for="volunteer in volunteersInfo" style="padding-right:30px;margin-bottom: 30px;">
		        	<div style="cursor: pointer;">
						<Card class="cardBox" dis-hover>
							<p slot="title">
								<i-switch size="small" v-model="volunteer.auditstate" @on-change="change(volunteer,$event)"></i-switch>
							</p>
							<a href="" slot="extra" @click.prevent="changeLimit">
								<svg class="title-icon" style="width:14px;height: 14px;" aria-hidden="true">
									<use xlink:href="#icon-order"></use>
								</svg>
								<svg class="title-icon" style="width:20px;height: 20px;" aria-hidden="true">
									<use xlink:href="#icon-xiaoxifasong"></use>
								</svg>
								<svg class="title-icon" style="width:14px;height: 14px;" aria-hidden="true" @click="deleteVolunteer(volunteer.id)">
									<use xlink:href="#icon-weibiaoti106"></use>
								</svg>
								
							</a>


							<div class="eList" @click="detailInfo(volunteer)">
								<div class="eLeft">
									<div class="eImg"><img :src="volunteer.logo" alt=""></div>
								</div>
								
								<div class="eRight">
									<div class="eTitle">
										<div class="textareaBox">{{volunteer.name}}</div>
									</div>
									<div class="eStar"><Rate disabled  v-model="value"></Rate></div>
									
									<div class="eContact">
										<div class="eMobile">
											<svg class="title-icon1" aria-hidden="true">
												<use xlink:href="#icon-dianhua1"></use>
											</svg>
											{{volunteer.mobile}}
										</div>
										<div class="ePhone">
											<svg class="title-icon1" aria-hidden="true">
												<use xlink:href="#icon-dianhua"></use>
											</svg>
											<!-- {{volunteer.phone}} -->
										</div>
									</div>
									<div class="eEmail">
										<svg class="title-icon1" aria-hidden="true">
											<use xlink:href="#icon-youjian"></use>
										</svg>
										<!-- {{volunteer.email}} -->
									</div>
									<div class="eAddress">
										<svg class="title-icon1" aria-hidden="true">
											<use xlink:href="#icon-llcouponsupportedshopaddress"></use>
										</svg>
										<!-- {{volunteer.address}} -->
									</div>
								</div>
							</div>
						</Card>
					</div>
		        </Col>
		    </Row>
        </div>
</template>

<script type="es6">
	var vm;
	import mySearch from '../components/volunteerSearch'
    export default {
        name: 'enterpriseList',
        data(){
        	return {
        		//志愿者信息
				volunteersInfo: [],
				isActive: 1,
        		value:2.6
        	}
        },
        components: {
			mySearch
		},
		created: function() {
			this.searchVolunteer();
		},
		methods: {
			change (volunteer,e) {
				console.log(e);
				var vm = this;
				debugger;
				volunteer.auditstate = volunteer.auditstate ? '1' : '0';
				var url = vm.$store.state.serverHost + 'support/api/support/providersave';
				vm.$http.post(url, vm.qs.stringify({
					'type': volunteer.type,
					'name': volunteer.name,
					'legalname': volunteer.legalname,
					'creditcode': volunteer.creditcode,
					'opentime': volunteer.opentime,
					'username': volunteer.username,
					'sex': volunteer.sex,
					'age': volunteer.age,
					'phone': volunteer.phone,
					'mobile': volunteer.mobile,
					'email': volunteer.email,
					'address': volunteer.address,
					'communityname': volunteer.communityname,
					'communityid': volunteer.communityid,
					'id': volunteer.id,
					'auditstate': volunteer.auditstate,
					'gps':  volunteer.gps,
					'summary': volunteer.summary
				}))
						.then(function (response) {
							console.log(response);
							if (response.data) {
								vm.$Notice.success({
									title: '修改成功!'
								});
								volunteer.auditstate = volunteer.auditstate != '0';
							} else {
								vm.$Notice.error({
									title: '修改失败!'
								});
							}
						})
						.catch(function (error) {
							vm.$Notice.error({
								title: error
							});
							volunteer.auditstate = e;
						});
			},
			searchVolunteer: function () {
				vm = this;
				var url = this.$store.state.serverHost + 'support/api/support/providerlist';
				this.$http.get(url, {
					headers: {
						'token': this.$store.state.userInfo.access_token
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
								response.data.rows[i].auditstate = response.data.rows[i].auditstate != '0';
							}
							vm.volunteersInfo = response.data.rows;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			deleteVolunteer: function (id) {
				var url = vm.$store.state.serverHost + 'support/api/support/providerdel';
				this.$http.get(url, {
					params: {
						id: id
					},
					headers: {
						'token': this.$store.state.userInfo.access_token
					}
				})
						.then(function (response) {
							console.log(response);
							vm.$Notice.success({
								desc: '删除成功!'
							});
							vm.searchVolunteer();
						})
						.catch(function (error) {
							console.log(error);
							vm.$Notice.error({
								desc: error
							});
						});
			},
			detailInfo: function (volunteer) {
				this.$store.commit('update', volunteer);
				this.$router.push('/volunteerInfo');
			},
			searchByAudistate: function(num) {
                this.isActive = num;
           },
           getEnterpriseList: function(data){
           		console.log(data);
           		vm.volunteersInfo = data;
           },
			
		}
	}
</script>

<style scoped>
	.enterprise{
		height: 100%;
		padding-left: 30px;
		position: relative;
		margin-right: 261px;
	}
	.stateBox{
		width: 250px;
		height: 30px;
		border: 1px solid #c1c5cb;
		border-right:none;
		position: absolute;
		top: 20px;
		right: 5px;
	}
	.state{
		width: 83px;
		line-height: 28px;
		float: left;
		border-right: 1px solid #c1c5cb;
		text-align: center;
		font-size: 14px;
        cursor: pointer;
	}
	.ls{
		background: #3c7ce6;
		color: #fff;
	}
	.cardBox .ivu-card-head{
		height: 46px;
	}
	.eList{
		height: 168px;
	}
	.eLeft{
		width: 30%;
		float: left;
	}
	.eRight{
		width: 50%;
		padding-right: 30px;
		float: left;
	}
	.eImg{
		width: 70px;
		height: 90px;
		border-radius: 50%;
		margin: 40px auto;
	}
	.eImg > img {
		width: 90px;
		height: 90px;
	}
	.eStar{
		margin: 10px 0 10px 0;
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
		margin-top: 36px;
		font-size: 16px;
		color: #333;
	}
	.eName{
		margin-top: 25px;
		font-size: 18px;
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
    	width: 15px;
    	height: 15px;
    	cursor: pointer;
    	fill:#ddd;
    }
    .title-icon0{
    	width: 12px;
    	height: 12px;
    	margin-right: 3px;
    	cursor: pointer;
    	fill:#50dba2;
    }
    .title-icon1{
    	width: 12px;
    	height: 12px;
    	cursor: pointer;
    	fill:#ffae00;
    }

    /*.eMobile,.ePhone,.eEmail,.eAddress,{
    	float: left;
    	width:20px;
    	height:20px;
    	font-size: 14px;
    	color: #999;
    }*/
   .eContact .eMobile{
   		width:20px;
   		height:20px;
   		float: left;
   }

   .eContact .ePhone{
   		width:20px;
   		height:20px;
   		float: left;
   }

   .eEmail{
   		width:20px;
   		height:20px;
   		float: left;
   }

   .eAddress{
		width:20px;
		height:20px;
		float: left;

   }
	.volunteerORGName{
		width: 100%;
		height: 64px;
		background: #fff;
		border: none;
		border-radius: 5px;
		padding: 4px 7px;
		outline: none;
		resize:none;
	}
	.inputVN {
		width: 90px;
		background: #fff;
		border: none;
		border-radius: 5px;
		outline: none;
		padding-left: 5px;
	}
	.inputWidth1 {
		width: 24px;
	}
	.inputWidth2 {
		width: 110px;
	}
	.inputWidth3 {
		width: 93%;
	}
	.inputVN:hover,.volunteerName:hover{
		border-color: #5cadff;
		background: #ddd;
	}
</style>

 