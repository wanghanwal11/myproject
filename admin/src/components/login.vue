<template>
  <LazyLayout class="loginadmin loginBox" orient="v" align="center" justify="">
    <!--<LazyScript src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js" @onload="onload"></LazyScript>-->
    <div class="headBox"></div>
    <div class="formBox">
      <ul id="formUl">
        <li @click="change" :class="{active:flag==1}">{{loginTitle1}}</li>
        <li @click="change2" :class="{active:flag==2}">{{loginTitle2}}</li>
      </ul>
      <div v-show="flag==1">
        <div class="erweima">
          <div class="erweima-top" id="erweima-top" >
            <iframe :src="loginCodeUrl" frameborder="0" scrolling="no" width="300px" height="400px" sandbox="allow-scripts allow-top-navigation"></iframe>
          </div>
          <!--<div class="erweima-bottom">-->
            <!--<i class="sys"></i>-->
            <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;打开&nbsp;<a href="javascript:;">{{weixin}}</a>，扫一扫登录<br/>-->
            <!--<span>更安全的登录方式</span>-->
          <!--</div>-->
        </div>
      </div>
      <div v-show="flag==2">
        <div class="verBox" style="position: relative"  :class="{a:!isPhone && isvalidatePhone}">
          <input v-model="loginIfon.phoneNumber" placeholder="请输入手机号" @blur="validatePhone">
        </div>
        <p v-if="!isPhone && isvalidatePhone" style="color:#ff8a00;margin: 10px 0 10px 10px;">手机号不正确</p>
        <div class="sliderBox" :style="{background: bg,color:color}">
          <div id="slider" @mousedown="slideVerification" :style="{ left: ii + 'px'}"></div>
          {{con}}
        </div>
        <div class="phoneCode">
          <input type="text" placeholder="请输入手机验证码" v-model="loginIfon.phoneCode">
          <button @click="getValidCode" v-if="isDisabled">发送验证码</button>
          <button v-else disabled v-model="countdown">{{countdown}}s</button>
        </div>
        <button class="clickLogin" @click="send">登录</button>
        <!-- <div class="formFoot"><a href="javascript:;">企业加盟</a></div> -->
      </div>
    </div>
    <LazyBox class="footer">
      <div class="footerBox">
        <!--<div class="foot-logo"><img src="../assets/images/foot-logo.png" alt=""/></div>-->
        <!--<p>北京北科维拓科技有限公司 京ICP备08100339号</p>-->
        <p style="color: rgb(195, 195, 195);margin-bottom: 10px">推荐使用先进浏览器获得最佳体验</p>
        <a href="http://rj.baidu.com/soft/detail/14744.html" target="_blank" style="color: rgb(86, 86, 86);">
          <img role="presentation" src="../assets/images/chrome.png" style="width: 25px;vertical-align: middle;">
          <span>下载Chrome浏览器</span>
        </a>
      </div>
    </LazyBox>
  </LazyLayout>
</template>
<script>
  export default {
    name:'login',
    data: function () {
      return {
        loginTitle1: '二维码登录',
        loginTitle2: '账号登录',
//      erweimaSrc:'https://open.weixin.qq.com/connect/qrcode/051eN8vgqTW8Bw8o',
        weixin: '微信',
        loginIfon: {
          phoneNumber: '',
          phoneCode: ''
        },
        isvalidatePhone: false,
        isPhone: false,
        isDisabled: true,
        countdown: 60,
        flag: 1,
        con: '请按住滑块，拖动到最右边',
        ii: 0,
        bg: '#e8e8e8',
        color: '#9c9c9c',
        slideFlag: false,
        isSlide:false,
        loginCodeUrl: ''
      };
    },
    components: {},
    created: function () {
      var appid;
      var redirect_uri;
      if(this.$lazy.url.host == 'http://www.shequhao.cn'){
        appid = 'wx2c548fab12847177';
        redirect_uri = encodeURIComponent('http://www.shequhao.cn');
      } else {
        appid = 'wx0077bd12fdda37f8';
        redirect_uri = encodeURIComponent('http://ceshi.vitoyun.cn');
      }

      this.loginCodeUrl = 'https://open.weixin.qq.com/connect/qrconnect?appid='+ appid +'&scope=snsapi_login&redirect_uri=' + redirect_uri + '&login_type=jssdk&self_redirect=default&href=https://sunyudi.github.io/wx/wx.css&state=';
    },
    methods: {
      onload:function(){
        var obj = new WxLogin({
          id: "erweima-top",
          appid: "wx2c548fab12847177",
          scope: "snsapi_login",
          redirect_uri: "http%3a%2f%2fshequ.vitoyun.cn",
          state: "",
          style: "",
          //href: 'https://hanguang90.github.io/weixin.css'
          href: 'https://sunyudi.github.io/wx/wx.css'
        });
      },
      send:function(){
        if(this.isPhone && this.loginIfon.phoneCode) {
          this.$emit('event',this.loginIfon);
        }else {
          this.$Message.error("请填写正确的手机号和验证码!")
        }
      },
      validatePhone: function () {
        this.isvalidatePhone = true;
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        this.isPhone = reg.test(this.loginIfon.phoneNumber);
      },
      change: function () {
        this.flag = 1;
      },
      change2: function () {
        this.flag = 2;
      },
      slideVerification: function (e) {
        if(this.slideFlag) return;
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
          if (vm.ii >= 330) {
            vm.ii = 330;
            vm.bg = '#7ac23c';
            vm.color = '#fff';
            vm.con = '验证通过';
            document.onmousemove = null;
            vm.slideFlag = true;
          }
        };
        document.onmouseup = function () {
          document.onmousemove = null;
          if (vm.ii >= 330) {
            vm.ii = 330;
          } else {
            vm.ii = 0;
          }
        }
      },
      getValidCode: function () {
        if (this.slideFlag && this.isPhone) {
          this.isDisabled = false;
          this.setTime();
          var url = this.$store.state.serverHost + 'base/base/identifyingcode/sendRandomByPhone';
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
          this.$Message.error("请填写正确的手机号且滑动验证!")
        }
      },
      setTime: function () {
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
      }
    }
  }
</script>
<style>
  .impowerBox .title{
    display:none!important;
  }
  .impowerBox .qrcode{
    width:200px!important;
  }
</style>
<style scoped>
  .a{
    border:1px solid #ff8a00!important;
  }
  .loginBox {
    background-color: #fff;
    width: 100%;
    height: 100%;
  }
  /*账号密码登录*/
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .headBox {
    height: 200px;
    /*height: 185px;*/
    width: 380px;
    background: url("../assets/images/sqfw.png") no-repeat 100px center;
  }
  .formBox {
    width: 380px;
    /*height: 300px;*/
    margin: 0 auto;
  }
  .formBox #formUl {
    font-size:14px;
    width:378px;
    height: 28px;
    line-height: 28px;
    /*border-bottom: 1px solid #e4e4e4;*/
    cursor: pointer;
    position: relative;
  }
  .formBox #formUl li {
    text-align: center;
    width: 189px;
    float: left;
    margin-bottom: 2px;
  }
  .active {
    border-bottom: 2px solid #3c7ce6;
  }
  #formUl::after{
    content: '';
    display:block;
    width: 378px;
    height: 1px;
    background-color: #e4e4e4;
    position: absolute;
    bottom:-3px;
    left:0;
  }
  .verBox {
    width: 100%;
    height: 42px;
    margin: 24px auto 0;
    border: 1px solid #d7dde4;
    border-radius: 5px;
  }
  .verBox input {
    width: 98%;
    height: 40px;
    float: left;
    border: none;
    outline: none;
    margin-left: 6px;
    color: #333333;
  }
  .phoneCode {
    width: 100%;
    height: 42px;
    margin: 10px auto 0;
  }
  .phoneCode input {
    width: 260px;
    height: 40px;
    float: left;
    outline: none;
    padding-left: 6px;
    border: 1px solid #d7dde4;
    border-radius: 5px;
    color: #333333;
  }
  .phoneCode button {
    float: right;
    width: 105px;
    height: 40px;
    background: none;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 40px;
    color: #575656;
    cursor: pointer;
  }
  .sliderBox {
    width: 100%;
    height: 40px;
    line-height: 38px;
    font-size: 12px;
    margin: 10px auto 0;
    /*margin: 25px auto 0;*/
    border-radius: 5px;
    position: relative;
    text-align: center;
    background: rgb(232, 232, 232);
    color: rgb(156, 156, 156);
  }
  .sliderBox::selection{
    background-color:transparent;
  }
  #slider {
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
  .clickLogin {
    width: 100%;
    height: 42px;
    background: none;
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #3c7ce6;
    margin: 15px auto 0;
    color: #fff;
    cursor: pointer;
  }
  .formFoot {
    width: 100%;
    height: 42px;
    margin: 25px auto 0;
    line-height: 42px;
    text-align: center;
  }
  .formFoot a {
    color: #333333;
  }
  /*二维码登录*/
  .erweima-top {
    width: 380px;
    margin-top: 30px;
    text-align: center;
  }
  .erweima-top img {
    width: 234px;
    height: 234px;
  }
  /*.erweima-bottom {*/
    /*position: relative;*/
    /*text-align: center;*/
    /*padding-left: 20px;*/
  /*}*/
  /*.erweima-bottom a {*/
    /*font-size: 14px;*/
  /*}*/
  /*.erweima-bottom .sys {*/
    /*width: 40px;*/
    /*height: 40px;*/
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 100px;*/
    /*background: url("../assets/images/sys.png") no-repeat;*/
  /*}*/

  /*.erweima-bottom span {*/
    /*color: #666666;*/
    /*font-weight: 700;*/
    /*font-size: 14px;*/
  /*}*/
  .footer{
    width:380px;
    position:relative;
  }
  .footerBox{
    /*position: absolute;*/
    /*bottom:20px;*/
    /*left:60px;*/
    text-align: center;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .foot-logo {
    text-align: center;
  }

</style>
