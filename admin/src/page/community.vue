/**
* Created by bk on 2017/4/20.
*/
<template>
        <div class="registerWarp">
        	<my-title></my-title>
        	<Row :gutter="30" style="margin-left: 0;margin-right: 0;">
		        <Col span="24">
		        	<div class="container">
			        	<div class="photoBox">
			        		<svg class="photo-icon" aria-hidden="true">
		                        <use xlink:href="#icon-wenhao"></use>
		                    </svg>
		                    头像　　
			        		<div class="photo">
			        			<img :src="src" alt=""/>
			        			<div class="photoMask">
			        				<svg class="photoMask-icon" aria-hidden="true">
				                        <use xlink:href="#icon-wenhao"></use>
				                        <a href="javascript:;" class="a-upload">
							                <input type="file" name="" id="file" @change="imgChange">更改头像
							            </a>
				                    </svg>
			        			</div>
			        		</div>
			        	</div>
			            <div class="infoBox">
			        		<svg class="photo-icon" aria-hidden="true">
		                        <use xlink:href="#icon-wenhao"></use>
		                    </svg>
		                    行政区域
			        		<input class="searchDistrict" v-model="inputDistrict" placeholder="请输入" ref="inputDistrict" @blur="searchBlur"></input>
			        	</div>
			        	<div class="infoBox">
			        		<svg class="photo-icon" aria-hidden="true">
		                        <use xlink:href="#icon-wenhao"></use>
		                    </svg>
		                    系统名称
			        		<input class="searchDistrict" v-model="systemName" placeholder="请输入" @blur="searchBlur"></input>
			        	</div>
			        	<div class="infoBox">
		                    　　负责人　
			        		<input class="searchDistrict" v-model="PIC" placeholder="请输入" @blur="searchBlur"></input>
			        	</div>
			        	<div class="infoBox">
		                    　　电话　　
			        		<input class="searchDistrict" v-model="telephone" placeholder="请输入" @blur="searchBlur"></input>
			        	</div>
			        	<div class="infoBox">
		                    　　地址　　
			        		<input class="searchDistrict" v-model="address" placeholder="请输入" @blur="searchBlur"></input>
			        	</div>
			        	<div class="textBox">
			        		<div class="introduce">
			        			<svg class="photo-icon" aria-hidden="true">
			                        <use xlink:href="#icon-wenhao"></use>
			                    </svg>
		                    	介绍　　
			        		</div>
			        		
			        		<div class="textareaBox"><textarea class="textDistrict" v-model="communityInfo" placeholder="请输入" ref="inputDistrict" @blur="searchBlur"></textarea></div>
			        		<div class="clear"></div>
			        	</div>
                    </div>
		        </Col>
		    </Row>
        </div>
</template>
<script type="es6">
	import myTitle from '../components/title'
    import photoSrc from '../assets/images/photo.png'
    export default {
        name: 'communityInfo',
        components: {
            myTitle
        },
        data () {
            return {
                src: photoSrc,
                flag: true,
                inputDistrict: '',
                systemName: '',
                cityList: [],
                districtList: [],
                currentDistrict: {},
                id: '',
                communityInfo: '',
                telephone: '',
                address: '',
                PIC: ''
            }
        },
        created: function(){
            this.$Notice.config({
                top: 70,
                duration: 3
            });
            var vm = this;
            this.$http.get('/zapi/cmy/sCommunityinfo/get',{
                params: {
                    streetorcommityid: "3", //this.$store.state.userInfo.streetorcommunityid,
                    streetorcommity: "1"  //this.$store.state.userInfo.streetorcommunity
                }
            })
                    .then(function (response) {
                        console.log(response);
                        vm.inputDistrict = response.data[0].oriname;
                        vm.systemName = response.data[0].streetorcommunityname;
                        vm.communityInfo = response.data[0].communityinfo;
                        vm.id =  response.data[0].id;
                        vm.telephone =  response.data[0].telphone;
                        vm.address =  response.data[0].address;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            //apiCommunity.getCommunityInfo()
        },
        watch: {
            inputDistrict: {
                handler:function(val,oldVal){
                    console.log(val);
                    var vm = this;
                    var url = vm.$store.state.host3 + '/base/sStreet/getStreetAndCommunityList';
                    if (val) {
                        this.flag = false;
                        this.$http.get('/xzapi/base/sStreet/getStreetAndCommunityList',{
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
                    } else {
                        this.flag = true;
                        this.systemName = "";
                    }
                }
            }
        },
        methods: {
            addCommunityInfo: function () {
                console.log(this.$store.state.userInfo);
                var vm = this;
                var url = vm.$store.state.host3 + '/cmy/sCommunityinfo/add';
                this.$http.get('/zapi/cmy/sCommunityinfo/add',{
                    params: {
                        streetorcommunityid: this.currentDistrict.streetorcommunityid,
                        streetorcommityname: this.currentDistrict.streetCommunityName,
                        streetorcommity: this.currentDistrict.strretOrCommunity,
                        communityinfo: this.communityInfo,
                        communityorcommunityname: this.systemName,
                        telephone: this.telephone,
                        address: this.address
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            if(response.data) {
                                vm.upload(vm.id)
                                vm.$Notice.success({
                                    title: '社区信息修改成功!'
                                });
                            } else {
                                vm.$Notice.error({
                                    title: '社区信息修改失败'
                                });
                            }
                            //vm.$router.push('/list');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
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
                        console.log(e.target.result);
                        vm.src = e.target.result;
                    };
                }
            },
            upload (id) {
                var fileObj = document.getElementById("file").files[0];
                var form = new FormData();
                form.append("file", fileObj);
                //form.append("id",id);
                this.$http.post('/zapi/cmy/sCommunityinfo/uploadCommunityPic', form)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            selectItem (district) {
                this.inputDistrict = district.streetCommunityName;
                this.systemName = district.streetCommunityName + '系统';
                this.currentDistrict = district;
                //console.log(this.currentDistrict.streetCommunityName);
            },
            searchBlur () {
                var vm = this;
                setTimeout(function () {
                    vm.flag = true;
                }, 200)
            }
        }
    }

</script>
<style scoped>
    .registerWarp {
        width: 100%;
        height: 100%;
        padding: 25px 15px 40px;
        margin: 0 auto;
        font-size: 14px;
    }
    .container{
    	padding: 60px 84px;
    	border: 1px solid #d7dde4;
    	background: #fff;
    }
    .photoBox{
        height: 120px;
        margin: 0 auto;
        line-height: 90px;
    }
    .photo-icon{
    	width:22px;
        height: 17px;
        vertical-align: middle;
    }
    .photo{
    	width:120px;
        height: 120px;
        margin-left: 104px;
        border-radius: 50%;
        display: inline-block;
        position: relative;
    }
    .photo:hover .photoMask{
    	display: block;
    }
    .photoMask{
    	width:120px;
        height: 120px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        display: none;
    }
    .photoMask-icon{
    	width:32px;
        height: 28px;
        margin: 44px;
        fill: #fff;
    }
    .photo img{
        width:120px;
        height: 120px;
        vertical-align: top;
    }
	.infoBox{
		margin-top: 40px;
	}
	.textBox{
		margin-top: 40px;
		line-height: 20px;
	}
	.introduce{
		float: left;
	}
	.textareaBox{
		height: 96px;
        float: left;
	}
	
	
	
    .pBox{
        height:50px;
        background:#fff;
        border: 1px solid #d7dde4;
        color:#333;
        font-size:20px;
        position: relative;
        border-radius: 5px;
    }
    .pBox img{
        margin: 21px 13px 0 11px;
        vertical-align: top;
    }
    .pBox select{
        width: 84px;
        height: 33px;
        margin-top: 8px;
        padding: 0 10px;
        border: none;
        outline: none;
        border-right: 1px solid #d7dde4;
    }
    .pBox select option{
        height: 48px;
        line-height: 48px;
    }
    .sConten{
        width: 600px;
        max-height: 360px;
        position: absolute;
        top: 50px;
        left: 0px;
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

    .a-upload {
        width:90px;
        height: 30px;
        line-height: 28px;
        border: 1px solid #dedddd;
        margin: 16px auto 54px;
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
    	width: 705px;
        height: 96px;
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
    .searchDistrict:hover,.textDistrict:hover{
        border-color: #5cadff;
        background: #ddd;
    }
    .clear{
    	clear: both;
    }
    .a-upload {
        width:90px;
        height: 30px;
        line-height: 28px;
        border: 1px solid #dedddd;
        margin: 16px auto 54px;
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
        border-radius: 50%;
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
    .sure{
        height:120px;
        margin-top:36px;
        background:#2c52ae;
        line-height: 56px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    .searchDistrict {
        width: 100%;
        height: 32px;
        line-height: 32px;
        background: #fff;
        border: none;
        font-size: 12px;
        border-radius: 5px;
        padding: 4px 7px;
        color: #657180;
    }
    .searchDistrict:hover {
        border-color: #5cadff;
    }
</style>
 