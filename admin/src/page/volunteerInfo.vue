/**
* Created by bk on 2017/4/7.
*/
<template>
    <div class="registerWarp">
        <div class="container">
            <a href="#" @click="goback"><<返回</a>
    		<div class="vTitle">我的志愿者信息</div>
    		<div class="photo"><img src="" alt=""/></div>
    		<div class="infoBox">行政区域
            	<input class="searchDistrict" placeholder="请搜索行政区域" ref="inputDistrict" v-model="inputDistrict" @blur='blur'></input><span>请输入正确行政区域</span>
				<ul class="sConten" :class="{hide: flag}">
					<li v-for="district in districtList" @click="selectItem(district)">
						<div class="s-title">{{district.streetCommunityName}}</div>
						<div class="s-introduce">{{district.introduce}}</div>
					</li>
				</ul>
            </div>
            <div class="infoBox">
        	组织类型
        		<Radio-group v-model="volunteerInfo.type" style="margin-left: 104px;">
			        <Radio label="工商企业"></Radio>
			        <Radio label="个体工商户"></Radio>
			    </Radio-group>
        	</div>
            <div class="infoBox">
        	单位名称
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.name" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确单位名称</span>
        	</div>
        	<div class="infoBox">
        	法人姓名
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.legalname" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确法人姓名</span>
        	</div>
        	<div class="infoBox">
        	信用代码
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.creditcode" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确信用代码</span>
        	</div>
        	<div class="infoBox">
                 营业时间
		            <Time-picker v-model="volunteerInfo.opentime" @on-change="blur" format="HH:mm" type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px;display: inline-block;margin-left: 104px;"></Time-picker>
        		<span>请选择营业时间</span>
        	</div>
            <div class="infoBox">
                 姓名　　
        		<input class="searchDistrict" placeholder="请输入" id="district" v-model="volunteerInfo.username" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确姓名</span>
        	</div>
        	<div class="infoBox">
                 性别　　
        		<Select v-model='volunteerInfo.sex' @on-change='blur' style="width: 292px;margin-left: 104px;">
        			<Option :value ="0">女</Option>
				  <Option :value ="1">男</Option>
				</Select></input><span>请输入正确性别</span>
        	</div>
        	<div class="infoBox">
                 年龄　　
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.age" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确年龄</span>
        	</div>
        	<div class="infoBox">
        	联系电话
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.phone" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确联系电话</span>
        	</div>
        	<div class="infoBox">
        		 手机　　
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.mobile" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确手机号</span>
        	</div>
        	<div class="infoBox">
        		  邮箱　　
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.email" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确邮箱</span>
        	</div>
        	<div class="infoBox">
        		  地址　　
        		<input class="searchDistrict" placeholder="请输入" v-model="volunteerInfo.address" @blur='blur' @keyup.enter="triggerBlur($event)"></input><span>请输入正确地址</span>
        	</div>
        	<div class="infoBox">
        		  经纬度　
        		<input class="searchDistrict" placeholder="请输入" readonly="readonly" v-model="volunteerInfo.gps"></input><span>请输入正确地址</span>
        	</div>
        	 <div class="amap-page-container">
			      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
			      <el-amap vid="amapDemo" :center="mapCenter" :zoom="12" class="amap-demo">
			        <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
			      </el-amap>
    		</div>
        	<div class="textBox">
        		<div class="introduce">服务内容</div>
        		<div class="textareaBox"><textarea class="textDistrict" v-model="volunteerInfo.summary" @blur='blur' @keyup.enter="triggerBlur($event)" placeholder="请输入"></textarea></div>
        		<span>请输入服务内容</span>
        		<div class="clear"></div>
        	</div>
        </div>
    </div>
</template>
<script  type="es6">
	import { lazyAMapApiLoaderInstance } from 'vue-amap';
    var isFirst = true;
    export default {
        name: 'yunLogin',
        data (){
            return {
                inputDistrict: '',
                volunteerInfo: {},
                districtList:'',
                currentDistrict: {},
                flag: true,
                bus: false,
                per: false,
                markers: [
	          	],
	            searchOption: {
		             city: '上海',
            		citylimit: true
		        },
      		    mapCenter: [121.59996, 31.197646]
            }
        },
        components: {
            
        },
        created: function () {
        	debugger;
            this.volunteerInfo = this.$store.state.volunteer.volunteerInfo;
            this.volunteerInfo.opentime = this.volunteerInfo.opentime.split('-');
            if(this.volunteerInfo.type == '0'){
            	this.bus = true;
            }
            console.log(this.volunteerInfo.opentime)
            this.inputDistrict = this.$store.state.volunteer.volunteerInfo.communityname;
            this.volunteerInfo.sex == '女' ? this.$store.commit('updateSex',0) : this.$store.commit('updateSex',1);
            isFirst = true;
            
            
        },
        watch: {
            inputDistrict: {
                handler: function (val, oldVal) {
                    var vm = this;
                    var url = vm.$store.state.serverHost + 'base/base/sStreet/getStreetAndCommunityList';

                    if (val) {
                        if(isFirst) {
                            isFirst = false;
                        }else {
                            this.flag = false;
                            this.$http.get(url, {
                                params: {
                                    inputName: val
                                }
                            })
                                    .then(function (response) {
                                        console.log(response);
                                        vm.districtList = response.data.rows;
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                        }
                    } else {
                        this.flag = true;
                        this.systemName = "";
                    }
                }
            }
        },
        methods: {
            blur: function () {
                var vm = this;
                var opentime = vm.volunteerInfo.opentime[0].getHours() + ':' + vm.volunteerInfo.opentime[0].getMinutes() + '-' + vm.volunteerInfo.opentime[1].getHours() + ':' + vm.volunteerInfo.opentime[1].getMinutes();
                vm.volunteerInfo.auditstate = vm.volunteerInfo.auditstate ? '1' : '0';
                setTimeout(function () {
                    vm.flag = true;
                    var url = vm.$store.state.serverHost + 'support/api/support/providersave';
                    vm.$http.post(url, vm.qs.stringify({
                    	'type': vm.volunteerInfo.type,
                        'name': vm.volunteerInfo.name,
                        'legalname': vm.volunteerInfo.legalname,
                        'creditcode': vm.volunteerInfo.creditcode,
                        'opentime': opentime,
                        'username': vm.volunteerInfo.username,
                        'sex': vm.volunteerInfo.sex,
                        'age': vm.volunteerInfo.age,
                        'phone': vm.volunteerInfo.phone,
                        'mobile': vm.volunteerInfo.mobile,
                        'email': vm.volunteerInfo.email,
                        'address': vm.volunteerInfo.address,
                        'communityname': vm.volunteerInfo.communityname,
                        'communityid': vm.volunteerInfo.communityid,
                        'id': vm.volunteerInfo.id,
                        'auditstate':  vm.volunteerInfo.auditstate,
                        'gps':  vm.volunteerInfo.gps,
                        'summary': vm.volunteerInfo.summary
                    }))
                            .then(function (response) {
                                console.log(response);
                                if (response.data) {
                                    vm.$Notice.success({
                                        title: '修改成功!'
                                    });
                                } else {
                                    vm.$Notice.error({
                                        title: '修改失败!'
                                    });
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }, 100)
            },
            selectItem (district) {
                this.inputDistrict = district.streetCommunityName;
                this.currentDistrict = district;
                this.volunteerInfo.communityname  = district.streetCommunityName;
                this.volunteerInfo.communityid  = district.streetCommunityId;
            },
            triggerBlur: function (event) {
                event.target.blur();
            },
            addMarker: function() {
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push([lng, lat]);
        },
        onSearchResult(pois) {
        	debugger;
        	this.volunteerInfo.address = pois[0].address;
        	this.volunteerInfo.gps = pois[0].lng + ',' + pois[0].lat;
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
        },
            goback: function() {
                this.$router.go(-1);
            }
        },
        mounted() {
			
        }
    }

</script>
<style scoped>
    .registerWarp {
        width: 100%;
        padding: 50px 15px 40px;
        font-size: 14px;
    }
    .container{
    	width: 1000px;
    	margin: 0 auto;
    	padding: 60px 84px;
    	border: 1px solid #d7dde4;
    	background: #fff;
    }
    .vTitle{
    	line-height: 50px;
    	text-align: center;
    	font-size: 24px;
    	font-weight: bold;
    }
    .photo{
    	width:120px;
        height: 120px;
        margin: 30px auto 0;
        border-radius: 50%;
    }
    .photo img{
    	width:120px;
        height: 120px;
        border: none;
    }
	.infoBox{
		margin-top: 25px;
		position: relative;
	}
	.infoBox span{
		margin-left: 5px;
		color: red;
		display: none;
	}
	.infoBox select{
		    margin-left: 104px;
	}
	.sConten{
        width: 292px;
        max-height: 360px;
        position: absolute;
        top: 33px;
        left: 163px;
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
    .s-title{
    	line-height: 20px;
    }
    .s-introduce{
    	font-size: 16px;
    	line-height: 20px;
    	color: #999;
    }
    .business{
		margin-left: 104px;
		vertical-align: middle;
	}
	.personal{
		margin-left: 20px;
		vertical-align: middle;
	}
    #map{
    	height: 500px;
    	margin-top: 25px;
    	position: relative;
    }
    #myPageTop{
    	padding: 6px;
    	position: absolute;
    	top:10px;
    	right: 10px;
    	z-index: 100;
    }
	.textBox{
		margin-top: 40px;
		line-height: 20px;
	}
	.textBox span{
		display: none;
		color:red;
	}
	.introduce{
		float: left;
	}
	.textareaBox{
		height: 96px;
        float: left;
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
        background: #fff;
        border: none;
        font-size: 12px;
        border-radius: 5px;
        padding: 4px 7px;
        color: #657180;
        outline: none;
    }
    .textDistrict{
    	width: 505px;
        height: 96px;
        margin-left: 109px;
        line-height: 32px;
        background: #fff;
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
    .submit{
    	width: 200px;
    	line-height: 30px;
    	margin: 40px auto;
    	background: #ccc;
    	text-align: center;
    	border-radius: 5px;
    	cursor: pointer;
    	color: #fff;
    }
    .clear{
    	clear: both;
    }
    .a-upload {
		width:90px;
	    height: 30px;
	    line-height: 28px;
	    border: 1px solid #dedddd;
	    margin: 16px auto 0px;
	    background: #f6f5f5;
	    text-align: center;
	    color: #999;
	    position: relative;
	    cursor: pointer;
	    overflow: hidden;
	    display: block;
	}
	
	.a-upload  input {
	    position: absolute;
	    font-size: 100px;
	    right: 0;
	    top: 0;
	    opacity: 0;
	    filter: alpha(opacity=0);
	    cursor: pointer
	}
	
	.a-upload:hover {
	    color: #444;
	    background: #eee;
	    border-color: #ccc;
	    text-decoration: none
	}
	.mask{
		width: 100%;
		height: 100%;
		background: #000;
		opacity: 0.5;
		position: fixed;
		top:0;
		left:0;
		z-index: 1;
	}
	#QRcode{
		width: 300px;
		height: 305px;
		background: #fff;
		position: fixed;
		top:0;
		right:0;
		bottom:0;
		left:0;
		margin: auto auto;
		z-index: 2;
	}
	 .amap-demo {
      height: 300px;
    }

    .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
    }

    .amap-page-container {
      position: relative;
    }
</style>