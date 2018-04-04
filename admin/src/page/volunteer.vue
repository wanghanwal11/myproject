/**
* Created by bk on 2017/6/14.
*/
<style scoped>
    body{
        margin: 0;
        font-family: "微软雅黑";
        min-width: 1280px;
    }
    h1,h2,h3,h4,h5,h6,ul,li,p{
        margin: 0;
        padding: 0;
        list-style:none;
    }
    a{
        text-decoration:none;
        color:#000;
    }
    *{
        box-sizing:border-box;
    }
    .volunteer{
        background: #fff;
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
    #shadow img{
        width: 100%;
    }
    .registerWarp {
        width: 1000px;
        padding: 0px 15px 40px;
        margin: 0 auto;
        font-size: 14px;
    }
    .container{
        padding: 60px 84px;
        background: #fff;
    }
    .vTitle{
        line-height: 50px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
    }
    .infoBox,.infoBox1{
        line-height: 32px;
        margin-top: 25px;
        position: relative;
    }
    .infoBox i{
        font-style: normal;
    }
    .infoBox span,.infoBox1 span{
        margin-left: 5px;
        color: red;
        display: none;
    }
    .infoBox i{
        font-style: normal;
    }
    .open{
        margin-left: 104px;
        margin-right: 20px;
    }
    .end{
        margin-left: 20px;
    }
    .groupType{
        float: left;
    }
    .businessType{
        height: 32px;
        margin-left: 104px;
        float: left;
    }
    .business{
        margin-left: 104px;
        vertical-align: middle;
    }
    .personal{
        margin-left: 20px;
        vertical-align: middle;
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
        z-index: 5;
        display: none;
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
    
    .searchDistrict,.searchDistrict1 {
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
    .phone{
        width: 236px;
        margin-right: 56px;
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
    .searchDistrict:hover,.searchDistrict1:hover,.textDistrict:hover{
        border-color: #5cadff;
        background: #ddd;
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
        z-index: 111;
    }
    #QRcode{
        width: 200px;
        height: 250px;
        line-height: 50px;
        background: #fff;
        position: fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        margin: auto auto;
        z-index: 112;
        text-align: center;
        font-size: 18px;
    }
    #QRcode img{
        width: 200px;
        height: 200px;
    }
    .serverBox{
        margin-top: 25px;
    }
    .sicon,.sicon1{
        width: 0;
        height: 0;
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        border-top: 10px solid #333;
        position: absolute;
        top:10px;
        left: 178px;
        z-index: 3;
        cursor: pointer;
    }
    .serverBox span{
        line-height: 32px;
        margin-left: 5px;
        color: red;
        display: none;
    }
    .serverTitle{
        line-height: 32px;
        float: left;
    }
    .server{
        width: 200px;
        height: 32px;
        line-height: 24px;
        padding: 4px 7px;
        border: 1px solid #aaa;
        margin-left: 104px;
        float: left;
        position: relative;
    }
    .server ul{
        width: 200px;
        background: #fff;
        position: absolute;
        top:32px;
        left: 0;
        z-index: 3;
        display: none;
    }
    .verCode{
        position: absolute;
        top: 0;
        left: 400px;
    }
    .verCode button{
        width: 56px;
        height: 32px;
    }
    .CodeBox{
        width: 102px;
        height: 102px;
        border: 1px solid #ddd;
        position: absolute;
        bottom: 32px;
        left: 378px;
        display: none;
    }
    .CodeBox img{
        width: 100px;
        height: 100px;
    }
    .checkBox{
        float:left;
    }
    .check{
        width:16px;
        height:16px;
        margin: 8px 0;
        border-radius:50%;
        border:1px solid #359aff;
        float:left;
    }
    .typeName{
        line-height: 32px;
        margin: 0 20px 0 5px;
        float: left;
    }
    .checkBox:hover{
        cursor:pointer;
    }
    .circle{
        width:10px;
        height:10px;
        border-radius:50%;
        background:#359aff;
        margin:2px auto;
        display:none;
    }
    .block{
        display: block;
    }
    .clear{
        clear:both;
    }
</style>

<template>   
    
    <div class="volunteer">

        <div class="header"><img src="../assets/images/prise.png"></div>
    <div id="shadow"><img src="../assets/images/shadow.png" ></div>
    <div class="registerWarp">
        <div class="container">
            <div class="vTitle">志愿者申请表</div>
            <div class="infoBox">行政区域
                <input class="searchDistrict" placeholder="请搜索行政区域"></input><span>请输入正确行政区域</span>
                <ul class="sConten">
                    
                </ul>
            </div>
            <div class="infoBox groupBox">
                <div class="groupType">组织类型</div>
                <!--<input class="business" type="checkbox"></input><i id="bus">工商企业</i><input class="personal" type="checkbox"></input><i id="per">个体工商户</i><span>请选择组织类型</span>-->
                <div class="businessType">
                    <div class="checkBox">
                        <div class="check">
                            <div class="circle block" type="工商企业"></div>
                        </div>
                        <div class="typeName">工商企业</div>
                        <div class="clear"></div>
                    </div>
                    <div class="checkBox">
                        <div class="check">
                            <div class="circle" type="个体工商户"></div>
                        </div>
                        <div class="typeName">个体工商户</div>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
            <div class="infoBox">
            单位名称
                <input class="searchDistrict" placeholder="请输入"></input><span>请输入正确单位名称</span>
            </div>
            
            <div class="infoBox">
                 法人姓名
                <input class="searchDistrict" placeholder="请输入" id="district"></input><span>请输入正确法人姓名</span>
            </div>
            <div class="infoBox">
                 信用代码
                <input class="searchDistrict" placeholder="请输入" id="district"></input><span>请输入信用代码</span>
            </div>
            <div class="infoBox">
                 营业时间
                <select class="open">
                  <option value ="7:00">7:00</option>
                  <option value ="7:30">7:30</option>
                  <option value ="8:00">8:00</option>
                  <option value ="8:30">8:30</option>
                  <option value ="9:00">9:00</option>
                  <option value ="9:30">9:30</option>
                  <option value ="10:00">10:00</option>
                  <option value ="10:30">10:30</option>
                  <option value ="11:00">11:00</option>
                  <option value ="11:30">11:30</option>
                  <option value ="12:00">12:00</option>
                  <option value ="12:30">12:30</option>
                  <option value ="13:00">13:00</option>
                  <option value ="13:30">13:30</option>
                  <option value ="14:00">14:00</option>
                  <option value ="14:30">14:30</option>
                  <option value ="15:00">15:00</option>
                  <option value ="15:30">15:30</option>
                  <option value ="16:00">16:00</option>
                  <option value ="16:30">16:30</option>
                  <option value ="17:00">17:00</option>
                  <option value ="17:30">17:30</option>
                  <option value ="18:00">18:00</option>
                  <option value ="18:30">18:30</option>
                  <option value ="19:00">19:00</option>
                  <option value ="19:30">19:30</option>
                  <option value ="20:00">20:00</option>
                  <option value ="20:30">20:30</option>
                  <option value ="21:00">21:00</option>
                  <option value ="21:30">21:30</option>
                  <option value ="22:00">22:00</option>
                  <option value ="22:30">22:30</option>
                  <option value ="23:00">23:00</option>
                  <option value ="23:30">23:30</option>
                  <option value ="24:00">24:00</option>
                </select>
                至
                <select class="end">
                  <option value ="7:00">7:00</option>
                  <option value ="7:30">7:30</option>
                  <option value ="8:00">8:00</option>
                  <option value ="8:30">8:30</option>
                  <option value ="9:00">9:00</option>
                  <option value ="9:30">9:30</option>
                  <option value ="10:00">10:00</option>
                  <option value ="10:30">10:30</option>
                  <option value ="11:00">11:00</option>
                  <option value ="11:30">11:30</option>
                  <option value ="12:00">12:00</option>
                  <option value ="12:30">12:30</option>
                  <option value ="13:00">13:00</option>
                  <option value ="13:30">13:30</option>
                  <option value ="14:00">14:00</option>
                  <option value ="14:30">14:30</option>
                  <option value ="15:00">15:00</option>
                  <option value ="15:30">15:30</option>
                  <option value ="16:00">16:00</option>
                  <option value ="16:30">16:30</option>
                  <option value ="17:00">17:00</option>
                  <option value ="17:30">17:30</option>
                  <option value ="18:00">18:00</option>
                  <option value ="18:30">18:30</option>
                  <option value ="19:00">19:00</option>
                  <option value ="19:30">19:30</option>
                  <option value ="20:00">20:00</option>
                  <option value ="20:30">20:30</option>
                  <option value ="21:00">21:00</option>
                  <option value ="21:30">21:30</option>
                  <option value ="22:00">22:00</option>
                  <option value ="22:30">22:30</option>
                  <option value ="23:00">23:00</option>
                  <option value ="23:30">23:30</option>
                  <option value ="24:00">24:00</option>
                </select>
                <span>请选择营业时间</span>
            </div>
            
            <div class="infoBox">
            联系电话
                <input class="searchDistrict" placeholder="请输入"></input><span>请输入正确联系电话</span>
            </div>
            <div class="infoBox">
                 手机　　
                <input class="searchDistrict phone" placeholder="请输入"></input><span>请输入正确手机号</span>
                <div class="CodeBox"><img src="http://vitocloud.oss-cn-beijing.aliyuncs.com/code/2017/6/9/157f03ca-baaf-405e-b4fd-3f55d4a43991.jpg"></div>
                <div class="verCode"><button>二维码</button></div>
            </div>
            <div class="infoBox1">
                  验证码　
                <input class="searchDistrict1" placeholder="请输入"></input><span>请输入正确验证码</span>
            </div>
            <div class="infoBox">
                  邮箱　　
                <input class="searchDistrict" placeholder="请输入"></input><span>请输入正确邮箱</span>
            </div>
            <div class="infoBox">
                  地址　　
                <input class="searchDistrict" placeholder="请在地图上搜索地址"></input><span>请输入正确地址</span>
            </div>
            <div id="map">
                <div id="myPageTop">
                    <table>
                        <tr>
                            <td>
                                <label>按关键字搜索：</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" placeholder="请输入关键字进行搜索" id="tipinput">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="textBox">
                <div class="introduce">服务内容</div>
                <div class="textareaBox"><textarea class="textDistrict" placeholder="请输入"></textarea></div>
                <span>请输入服务内容</span>
                <div class="clear"></div>
            </div>
            <div class="submit">提交</div>
        </div>
    </div>

    </div>
    
</template>

<script>
    
  


    
</script>
 