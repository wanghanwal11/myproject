/**
* Created by bk on 2017/5/10.
*/
<template>
    <div class="register">
        <div class="header"><img src="../assets/images/logoBind.png" ></div>
        <div id="shadow"><img src="../assets/images/shadow.png" ></div>
        <div class="registerWarp">
            <div class="photo"><img :src="src" alt=""/></div>
            <div class="verBox" style="position: relative">
                <input v-model="phoneNumber" placeholder="请输入手机号"  @blur="validatePhone">
                <p v-if="!isPhone && isvalidatePhone" style="position: absolute;top: 43px;color:red;">手机号不正确</p>
            </div>
            <div class="verBox"><input id="p-code" v-model="phoneCode" placeholder="请输入手机验证码" type="text">
                <button id="obtain-code" @click="getValidCode" v-if="isDisabled" style="outline:none;cursor:pointer;">获取验证码</button>
                <button id="obtain-code"  v-else disabled v-model="countdown">{{countdown}}s</button>
            </div>


            <div class="sure" @click="bindPhone">确定</div>

        </div>
        <div class="footer">
            <div class="foot-logo"><img src="../assets/images/foot-logo.png" alt=""/></div>
            <p>北京北科维拓科技有限公司 京ICP备08100339号</p>
        </div>
    </div>
</template>
<script type="es6">
    import photoSrc from '../assets/images/photo.png'
    export default {
        name: 'bindPhone',
        data () {
            return {
                src: photoSrc,
                flag: true,
                phoneNumber: '',
                phoneCode: '',
                countdown: 60,
                isvalidatePhone: false,
                isPhone: false,
                isDisabled: true
            }
        },
        created: function () {
            var vm = this;
            this.src = vm.$store.state.userInfo.headimgurl;
            console.log(vm.$store.state.userInfo.headimgurl);
            console.log(vm.$store.state.userInfo.nickname);
            console.log(vm.$store.state.userInfo.openid);
        },
        methods: {
            validatePhone: function () {
                this.isvalidatePhone = true;
                var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                this.isPhone = reg.test(this.phoneNumber);
            },
            getValidCode() {
                if (this.isPhone) {
                    this.isDisabled = false;
                    this.setTime();
                    var url = vm.$store.state.serverHost + 'base/base/identifyingcode/sendRandomByPhone';
                    this.$http.get(url, {
                        params: {
                            phone: this.phoneNumber
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
            checkManager () {
                var vm = this;
                var url = vm.$store.state.serverHost + 'cmy/api/sCommunitymanager/checkManager';
                this.$http.get(url,{
                    headers: {
                        'token': this.$store.state.userInfo.access_token
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            if(response.data.newPrimaryKeys.resultStr == 0) {
                                vm.$router.push('/register');
                            } else if(response.data.newPrimaryKeys.resultStr == 1) {
                                vm.$router.push('/');
                                alert('正在审核');
                            } else {
                                vm.$router.push('/list');
                                vm.$store.state.userInfo.streetorcommunity = response.data.newPrimaryKeys.streetorcommunity;
                                vm.$store.state.userInfo.streetorcommunityid = response.data.newPrimaryKeys.streetorcommunityid;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.$router.push('/');
                        });
            },
            bindPhone: function() {
                var vm = this;
                var url = this.$store.state.serverHost+ 'uc/uc/tuser/addOrUpdateByPhone';
                this.$http.get(url,{
                    params: {
                        mobile: this.phoneNumber,
                        headpicurl: this.src,
                        openid: this.$store.state.userInfo.openid
                    }
                })
                        .then(function (response) {
                            console.log(response);
                            vm.$store.state.userInfo.access_token = response.data.rows[0].access_token;
                            vm.checkManager();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            }
        }
    }
</script>
<style scoped>
    *{
        box-sizing:border-box;
    }
    .register {
        width: 100%;
        height: 100%;
    }
    .header{
        width:1200px;
        height:91px;
        margin: 0 auto;
        line-height: 91px;
        font-size: 30px;
        color:#3c7ce6;
        font-weight: bold;
    }
    .header img{
        margin-top: 29px;
    }
    .header span{
        font-size: 14px;
        color: #666;
        font-weight: 400;
        float: right;
    }
    #shadow img{
        width: 100%;
    }
    .registerWarp {
        width: 600px;
        height: 495px;
        margin: 92px auto 0;
        font-size: 14px;
    }
    .photo{
        width:120px;
        height: 120px;
        margin: 0 auto;
        border-radius: 50%;
    }
    .photo img{
        width:120px;
        height: 120px;
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
    .verBox{
        height: 40px;
        margin: 25px auto 0;
        border: 1px solid #d7dde4;
        border-radius: 5px;
        background-color: #ffffff;
    }
    .verBox input{
        width: 515px;
        height: 38px;
        border-radius: 5px;
        float: left;
        border: none;
        outline: none;
        padding:0 10px;
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
    .footer{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 75px;
        text-align: center;
        color:#666;
    }
    .footer p{
        margin-top: 10px;
    }
</style>
 