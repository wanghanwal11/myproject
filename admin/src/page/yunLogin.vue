/**
* Created by bk on 2017/4/7.
*/
<template>
    <div class="login">
        <remote-js src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></remote-js>
    	<div class="header"><img src="../assets/images/LOGO.png" ></div>
        <div class="loginType">
        	<div class="container">
        		<div class="sqrm">
					<img :src="src" >
				</div>
	            <div class="codeLogin">
	                <div class="content" :class="{hide: !lscan}">
	                	<div class="lType">
	                		<div class="lIcon" @click="lswitch"><img src="../assets/images/switchCode.png" alt=""/></div>
	                	</div>
	                    <span>手机登录</span>
                        <div class="verBox" style="position: relative">
                            <input v-model="loginIfon.phoneNumber" placeholder="请输入手机号"  @blur="validatePhone"></input>
                            <p v-if="!isPhone && isvalidatePhone" style="position: absolute;top: 43px;color:red;">手机号不正确</p>
                        </div>
	                    <div class="sliderBox" :style="{background: bg,color:color}">
	                    	<div id="slider" @mousedown="slideVerification" :style="{ left: ii + 'px'}"></div>{{con}}
	                    </div>
	                    <div class="verBox"><input id="p-code" v-model="loginIfon.phoneCode" placeholder="请输入手机验证码" type="text"></input>
	                    	<button id="obtain-code" @click="getValidCode" v-if="isDisabled" style="outline:none;cursor:pointer;">获取验证码</button>
	                    	<button id="obtain-code"  v-else disabled v-model="countdown">{{countdown}}s</button>
	                    </div>
	                    <!--<Button style="width: 263px;height:40px;margin-top:25px;background:#329be5;border:none;" type="success" long @click="handleSubmit('loginIfon')">登录</Button>-->
	                    <Button style="width: 263px;height:40px;margin-top:25px;background:#329be5;border:none;" type="primary" :loading="loading" @click="handleSubmit('loginIfon')">
					        <span v-if="!loading">登陆</span>
					        <span v-else>Loading...</span>
					    </Button>
	                </div>
	                <div class="content" :class="{hide: lscan}">
	                	<div class="lType">
	                		<div class="lIcon" @click="lswitch"><img src="../assets/images/switchPSW.png" alt=""/></div>
	                	</div>
                        <div class="QRcode" id="loginCode"></div>
	                </div>
	            </div>
	            <div class="clear"></div>
        	</div>
        	
        </div>
        <div class="footer">
        	<div class="foot-logo"><img src="../assets/images/foot-logo.png" alt=""/></div>
        	<p>北京北科维拓科技有限公司 京ICP备08100339号</p>
        </div>
    </div>
</template>
<script  type="es6">
    import srcPath from '../assets/images/1.jpg';
    import src1 from '../assets/images/2.jpg';
    import src2 from '../assets/images/3.jpg';
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    export default {
        name: 'yunLogin',
        data (){
            return {
                ii: 0,
                con: '请按住滑块，拖动到最右边',
                bg: '#e8e8e8',
                loading: false,
                color: '#9c9c9c',
                src: srcPath,
                slideFlag: false,
                loginIfon: {
                    phoneNumber: '',
                    phoneCode: ''
                },
                isvalidatePhone: false,
                isPhone: false,
                isDisabled: true,
                countdown: 60,
                loginType: 1,
                lscan: false,
                ruleInline: {
                    phoneNumber: [{
                        required: true,
                        message: '请填手机号',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        message: '请输入正确的手机号',
                        pattern: new RegExp("^1[3|4|5|7|8][0-9]{9}$"),
                        trigger: 'blur'
                    }]
                },
                communityDetail: {}
            }
        },
        components: {
            'remote-js': {
                render(createElement) {
                    return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
                },
                props: {
                    src: {type: String, required: true},
                }
            }
        },
        created: function () {
            var vm = this;
            var code = getQueryString('code');
            console.log(code);
            if (code) {
                var url = this.$store.state.serverHost + 'cmy/cmy/sCommunitymanager/loginByQRcode';
                this.$http.get(url, {
                    params: {
                        code: code
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response);
                            if(!vm.$store.state.userInfo) {
                                vm.$store.state.userInfo = {};
                            }
                            //vm.$store.state.userInfo.access_token = response.data.rows[0].access_token;
                                ;
                            vm.$store.commit('updateToken', response.data.rows[0].access_token);
                            vm.checkManager();
                            //vm.$store.state.userInfo = {};
                            //if (response.data.newPrimaryKeys.phone !== 'no') {
                            //    vm.$store.state.userInfo.access_token = response.data.rows[0].access_token;
                            //    //vm.checkManager();
                            //} else {
                            //    vm.$store.state.userInfo.headimgurl = response.data.newPrimaryKeys.headimgurl;
                            //    vm.$store.state.userInfo.nickname = response.data.newPrimaryKeys.nickname;
                            //    vm.$store.state.userInfo.openid = response.data.newPrimaryKeys.openid;
                            //    //vm.$router.push('/bindPhone');
                            //}
                            //vm.$router.push('/list');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }

            document.onmouseup = function () {
                document.onmousemove = null;
                if (vm.ii >= 213) {
                    vm.ii = 213;
                } else {
                    vm.ii = 0;
                }
            }
            var i = 0;
            var src = [srcPath, src1, src2];

            function lun() {
                i++;
                if (i == 3) {
                    i = 0;
                }
                vm.src = src[i];
            }

            var timer = setInterval(lun, 5000);
        },
        methods: {
            switchLoginType: function (type) {
                this.loginType = type;
            },
            validatePhone: function () {
                this.isvalidatePhone = true;
                var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                this.isPhone = reg.test(this.loginIfon.phoneNumber);
            },
            handleSubmit(name) {
                var vm = this;
                var url = this.$store.state.serverHost + 'uc/uc/tuser/testLogin';
                this.$http.get(url)
                        .then(function (response) {
                            console.log(response);
                            //vm.$store.state.userInfo = {};
                            //vm.$store.state.userInfo.access_token = response.data.rows[0].access_token;
                            debugger;
                            vm.$store.commit('updateToken', response.data.rows[0].access_token);
                            vm.checkManager();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                //if (this.slideFlag && this.isPhone && this.loginIfon.phoneCode) {
                //    this.loading = true;
                //    var userInfo = {
                //        'phone': this.loginIfon.phoneNumber,
                //        'password': this.loginIfon.password
                //    }
                //    var vm = this;
                //    var url = vm.$store.state.serverHost + 'uc/api/user/login';
                //    this.$http.post(url, this.qs.stringify({
                //        mobile: this.loginIfon.phoneNumber,
                //        code: this.loginIfon.phoneCode,
                //        type: 'mobile'
                //    }))
                //            .then(function (response) {
                //                vm.$store.state.userInfo = userInfo;
                //                vm.$store.state.userInfo.userid = response.data.message;
                //                vm.$store.state.userInfo.access_token = response.data.rows[0].access_token;
                //                vm.checkManager();
                //            })
                //            .catch(function (error) {
                //                vm.$Notice.error({
                //                    desc: error
                //                });
                //                vm.loading = false;
                //            });
                //
                //} else {
                //    this.$Notice.info({
                //        desc: '请填写正确的手机号并且滑动验证,填写验证码!'
                //    });
                //}
            },
            handleReset(val) {
                console.log(val)
            },
            getValidCode() {
                if (this.slideFlag && this.isPhone) {
                    this.isDisabled = false;
                    this.setTime();
                    var url = vm.$store.state.serverHost + 'base/base/identifyingcode/sendRandomByPhone';
                    this.$http.get(url, {
                        params: {
                            phone: this.loginIfon.phoneNumber
                        }
                    })
                            .then(function (response) {
                                console.log(response);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                } else {
                    alert("请填写正确的手机号且滑动验证!")
                }

            },
            setTime() {
                if (this.countdown == 0) {
                    this.isDisabled = true;
                    this.countdown = 60;
                } else {
                    this.countdown--;
                    var vm = this;
                    setTimeout(function () {
                        vm.setTime()
                    }, 1000)
                }
            },
            upload () {
                var fileObj = document.getElementById("file").files[0];
                var form = new FormData();
                form.append("file", fileObj);
                this.$http.post('/api/base/oss/upload', form)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            slideVerification (e) {
                var bb = e.clientX;
                var vm = this;
                document.onmousemove = function (e) {
                    var dd = e.clientX;

                    if (dd - bb > 0) {
                        vm.ii = dd - bb;
                    } else {
                        vm.ii = 0;
                        return;
                    }
                    if (vm.ii >= 213) {
                        vm.ii = 213;
                        vm.bg = '#7ac23c';
                        vm.color = '#fff';
                        vm.con = '验证通过';
                        vm.slideVerification = null;
                        document.onmousemove = null;
                        vm.slideFlag = true;
                    }

                }

            },
            checkManager () {
                var vm = this;
                var url = vm.$store.state.serverHost + 'cmy/api/sCommunitymanager/checkManager';
                this.$http.get(url, {
                    headers: {
                        'token': this.$store.state.userInfo.access_token
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            if (response.data.newPrimaryKeys.resultStr == 0) {
                                vm.$router.push('/register');
                                vm.$store.state.headpicurl = response.data.newPrimaryKeys.headpicurl;
                                if(!vm.$store.state.communityDetail) {
                                    vm.$store.state.communityDetail = {};
                                }
                            } else if (response.data.newPrimaryKeys.resultStr == 1) {
                                vm.$router.push('/');
                                vm.$Notice.info({
                                    desc: '正在审核!'
                                });
                            } else {
                                //vm.$store.state.userInfo.streetorcommunity = response.data.newPrimaryKeys.streetorcommunity;
                                //vm.$store.state.userInfo.streetorcommunityid = response.data.newPrimaryKeys.streetorcommunityid;
                                vm.$store.commit('updateCommunity',response.data.newPrimaryKeys.streetorcommunity);
                                vm.$store.commit('updateCommunityid',response.data.newPrimaryKeys.streetorcommunityid);
                                vm.$store.commit('updateheadpicurl',response.data.newPrimaryKeys.headpicurl);
                                //vm.$store.state.headpicurl = response.data.newPrimaryKeys.headpicurl;
                                vm.getInitId();
                            }
                        })
                        .catch(function (error) {
                            vm.$Notice.error({
                                desc: error
                            });
                            vm.loading = false;
                            console.log(error);
                            vm.$router.push('/');
                        });
            },
            lswitch(){
                this.lscan = !this.lscan;
            },
            getInitId () {
                var vm = this;
                var url = vm.$store.state.serverHost + 'wx/api/wx/get';
                this.$http.post(url, this.qs.stringify({
                    communityid: vm.$store.state.userInfo.streetorcommunityid,
                    communitytype: this.$store.state.userInfo.streetorcommunity
                }),{headers: {
                    'token': this.$store.state.userInfo.access_token
                }})
                        .then(function (response) {
                            console.log(response);
                            //if(!vm.$store.state.communityDetail) {
                            //    vm.$store.state.communityDetail = {};
                            //}
                            if(response.data.rows.length == 0) {
                                //vm.$store.state.communityDetail.initid = '';
                                vm.$store.commit('updateheadpicurl','');
                            } else {
                                //vm.$store.state.communityDetail.initid =  response.data.rows[0].initid;
                                vm.$store.commit('updateinitid',response.data.rows[0].initid);
                            }
                            debugger;
                            if(vm.$store.state.communityDetail.initid){
                                vm.$router.push('/list');
                            }else if(vm.$store.state.communityDetail.initid == ""){
                                vm.$router.push('/settings');
                            }else{
                                vm.$router.push('/settings');
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
        },
        mounted() {
            var vm = this;
            if (vm.$store.state.loadWX) {
                var obj = new WxLogin({
                    id: "loginCode",
                    appid: "wx2c548fab12847177",
                    scope: "snsapi_login",
                    redirect_uri: "http%3a%2f%2fshequ.vitoyun.cn",
                    state: "",
                    style: "",
                    href: 'https://hanguang90.github.io/weixin.css'
                });
            } else {
                window.onload = function () {
                    vm.$store.state.loadWX = true;
                    var obj = new WxLogin({
                        id: "loginCode",
                        appid: "wx2c548fab12847177",
                        scope: "snsapi_login",
                        redirect_uri: "http%3a%2f%2fshequ.vitoyun.cn",
                        state: "",
                        style: "",
                        href: 'https://hanguang90.github.io/weixin.css'
                    });
                }
            }
        }
    }


</script>
<style scoped>
    .login {
        width: 100%;
        height: 100%;
        background-size:100% 100%;
        moz-user-select: -moz-none;
		-moz-user-select: none;
		-o-user-select:none;
		-khtml-user-select:none;
		-webkit-user-select:none;
		-ms-user-select:none;
		user-select:none;
    }
    .header{
    	width:1200px;
    	height:91px;
    	margin: 0 auto;
    }
    .header img{
    	margin-top: 29px;
    }
    .loginType {
    	height: 600px;
        background: url("../assets/images/banner-bg.jpg");
        background-size: 100% 100%;
    }
    .container{
    	width:1200px;
    	margin: 0 auto;
    }
    .sqrm{
    	width: 770px;
    	float: left;
    	margin-left: 110px;
    }
    .sqrm img{
    	width: 100%;
    }
    .codeLogin{
    	width: 320px;
    	height: 370px;
    	background:#fff;
    	float: right;
    	margin-top: 114px;
    }
    .content {
    	text-align: center;
    }
    .lType{
    	height: 46px;
    }
    .prompt{
    	width: 192px;
    	height: 33px;
    	margin: 0 auto;
    }
    .prompt img{
    	width: 100%;
    	height: 100%;
    }
    .lIcon{
    	width: 45px;
    	height: 46px;
    	float: right;
    	cursor: pointer;
    }
    .lIcon img{
    	width: 45px;
    	height: 46px;
    	cursor: pointer;
    }
    .content > span {
        font-size: 16px;
        font-family: "Microsoft YaHei";
        color: rgb( 77, 77, 77 );
    }
    .sliderBox{
    	width: 263px;
	    height: 40px;
	    line-height: 38px;
	    font-size: 12px;
	    margin: 25px auto 0;
	    border-radius: 5px;
	    position: relative;
	    text-align: center;
    }
    #slider{
    	width: 50px;
	    height: 40px;
	    text-align: center;
	    border-radius: 5px;
	    background: url("../assets/images/slider.png") no-repeat;
	    position: absolute;
	    top: 0;
	    left: 0;
	    cursor: pointer;
    }
    .verBox{
    	width: 263px;
	    height: 40px;
	    margin: 25px auto 0;
	    border: 1px solid #d7dde4;
	    border-radius: 5px;
    }
    .verBox input{
    	width: 172px;
    	height: 38px;
    	float: left;
    	border: none;
    	outline: none;
    	margin-left: 6px;
    }
    .verBox img{
    	vertical-align: top;
    	float: left;
    }
    #obtain-code{
    	width: 83px;
    	height: 27px;
    	background: none;
    	border: none;
    	line-height: 27px;
    	margin-top: 6px;
    	border-left: 1px solid #ccc;
    	float: right;
    	color: #3c7ce6;
    }
    .QRcode{
    	height: 320px;
    }
    .footer p{
    	margin-top: 10px;
    }
    .clear{
    	clear:both;
    }
    
    .LoginTip {
        position: relative;
        padding-top: 30px;
    }
    .LoginTipFont {
        position: relative;
        left: 116px;
    }
    .LoginTipIcon {
        position: absolute;
        left: 245px;
        top: 30px;
        cursor: pointer;
    }
    .code {
        background: url("../assets/images/codebg.png") no-repeat;
    }
    .code img{
    	width:162px;
    	height:162px;
    }
    .footer {
        text-align: center;
        margin: 30px 0;
        font-size: 12px;
        font-family: "NSimSun";
        color: rgb( 102, 102, 102 );
    }
    .formStyle {
        width: 80%;
        margin: 10px auto 0;
    }
    .userStyle {
        display: inline-block;
        width: 15px;
        font-size: 20px;
    }
    .register {
        width: 80%;
        margin: 0 auto 35px;
    }
    .ivu-form-item {
        margin-bottom: 0;
        margin-right: 0;
    }
</style>