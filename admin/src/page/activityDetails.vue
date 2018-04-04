<template>
  <LazyLayout orient="v" class="activityDetails">
    <div class="topBox">
            <div style="height:244px;border:1px solid #d7dde4;padding:12px;border-radius:4px;background-color:#fff;">
                <div style="display:flex;align-items:center;padding:0 4px;">
                    <div class="picBox" v-bind:style="{backgroundImage:'url('+infoPic+')'}"></div>
                    <div class="infoBox">
                        <div class="title">
                            {{ infoTitle }}
                            <span class="state" v-if="state==3">已结束</span>
                            <span class="state" v-if="state==2">进行中</span>
                            <span class="state" v-if="state==1">未开始</span>
                        </div>
                        <div class="serBox">
                            <span v-for="i in activitytags"> {{ i }}</span>
                        </div>
                        <div class="lei">
                            {{ activitytype }}
                        </div>
                        <div class="infos">
                            <svg class="photoMask-icon" aria-hidden="true">
                                <use xlink:href="#icon-gonggao1"></use>
                            </svg>
                           <span style="display:block;margin-left:18px;">提前{{ remind }}天提醒活动开始</span>
                        </div>
                        <div class="infos">
                            <svg class="photoMask-icon" aria-hidden="true">
                                <use xlink:href="#icon-ren"></use>
                            </svg>
                            <span style="display:block;margin-left:18px;">{{ contact }}&nbsp;&nbsp;&nbsp;( {{ tel }} )</span>
                            <!-- <svg class="photoMask-icon" aria-hidden="true">
                                <use xlink:href="#icon-dianhua1"></use>
                            </svg> -->
                        </div>

                        <div class="infos">
                            <svg class="photoMask-icon" aria-hidden="true">
                                <use xlink:href="#icon-icon-test"></use>
                            </svg>
                            <span style="display:block;margin-left:18px;">
                                {{ new Date(parseInt(starttime)).toLocaleDateString()}}&nbsp;&nbsp;&nbsp;{{$lazy.FormatDate(parseInt(starttime),'HH:mm:ss')}}&nbsp;&nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;&nbsp;{{ new Date(parseInt(endtime)).toLocaleDateString()}}&nbsp;&nbsp;&nbsp;{{$lazy.FormatDate(parseInt(endtime),'HH:mm:ss')}}
                            </span>
                        </div>

                        <div class="infos">
                            <svg class="photoMask-icon" aria-hidden="true">
                                <use xlink:href="#icon-llcouponsupportedshopaddress"></use>
                            </svg>
                            <span style="display:block;margin-left:18px;">{{ address }}</span>
                        </div>
                    </div>
                    <div class="codeBox">
                        <p class="sao">扫一扫分享到微信</p>
                        <div class="cobox">
                           <img :src="qrcode" alt="">
                        </div>
                        <div class="btn" @click="downhuodongCode">下载活动二维码</div>
                        <div class="btns" @click="downCode">下载签到二维码</div>
                    </div>
                </div>
            </div>
    </div>

    <LazyBox>
        <LazyLayout>
            <!-- 参与人 -->
            <div class="canyu">
              <LazyLayout orient="v">
                  <p class="titles">参与人
                  <!-- <span style="color:#ff9292">
                  报名：{{ cannum }}</span>
                  <span style="color:#29c089">签到：{{ baonum }}</span></span> -->
                  <span class="person">
                        <span style="color:#ff9292;font-size:12px;">报名：</span><span style="font-size:12px;margin-right:12px;">{{ cannum }}人</span>
                        <span style="color:#29c089;font-size:12px;">签到：</span><span style="font-size:12px;">{{ baonum }}人</span>
                  </span>
                  </p>
                  <LazyBox >
                     <div class="canyudiv" @scroll="onScrolls()">
                        <dl v-for="ite in listArr">
                             <dt v-if="ite.headpicture">
                                 <img :src="ite.headpicture" alt="">
                             </dt>
                             <dt v-else>
                                 <img src="../assets/images/moren.png" alt="">
                             </dt>
                             <dd>
                                 <p><span style="padding-right:6px;">{{ite.realname ? ite.realname : (ite.username ? ite.username : "游客") }}</span><span class="typeBox" v-if="ite.type == 'sign' "> 签到 </span><span class="typeBoxs" v-if="ite.type == 'enroll' " >报名</span></p>
                                 <p>{{ new Date(parseInt(ite.createtime)).toLocaleString() }}</p>
                             </dd>
                         </dl>
                     </div>
                  </LazyBox>
              </LazyLayout>
            </div>

            <!-- 上传相册 -->
            <div class="photoBox">
                <LazyLayout orient="v">
                    <div>
                        <p class="tabtitle"><span @click="xiangce" ref="xiang" style="color:#0363f3;">相册</span> <!-- <span @click="wenjian" ref="wen">文件</span> --></p>
                        <Button  type="primary" size="small"  class="pcbtn" :loading="loading">
                            <span v-if="!loading">电脑上传</span>
                            <span v-else>电脑上传</span>
                            <input type="file" name="" id="file" style="opacity:0; filter:alpha(opacity=0); width: 100%;height:100%;position:absolute;left:0;top:0;" @change="imgChange">
                        </Button>
                        <Poptip trigger="hover" placement="bottom" class="mobtn" >

                            <div style="width:64px;height:24px;">手机上传</div>
                            <div slot="content">
                                <img style="width: 180px;height: 200px;" :src="codeImg">
                            </div>
                        </Poptip>
                    </div>
                    <LazyBox>
                      <div class="myTabs" @scroll="scrollMe">
                          <div class="imgsBox" v-show="xiangceflag">
                              <div class="picBoxs" v-for="(img,index) in imgList" v-bind:style="{backgroundImage:'url('+img.materialurl+')'}"  @click="modalShow(index)" :src="imgList[index]">
                                    <span class="close" :class="{close:true,hideClose: !img.selectFlag}" @click="deleteImg(img)"> X </span>
                              </div>
                              <Modal v-model="modal10" width="800" :title=" infoTitle + '相册' ">
                                    <LazyLayout>
                                        <div style="width:800px;height:500px;" >
                                            <vueCropper
                                              ref="cropper"
                                              :img="imgSrc"
                                            ></vueCropper>
                                        </div>
                                        <div class="btn1 qiehuan" @click="imgQieHuan(-1)">
                                            <img src="../assets/images/photoControl/left.png" alt="">
                                        </div>
                                        <div class="btn2 qiehuan" @click="imgQieHuan(1)">
                                            <img src="../assets/images/photoControl/right.png" alt="">
                                        </div>
                                    </LazyLayout>
                                    <div slot="footer" style="height:80px;">
                                      <div class="describe">
                                        <p style="color:#6e6e6e;">活动名称：{{ infoTitle }}</p>
                                        <p style="margin-top:9px;color:#666666;">时间：{{ new Date(parseInt(ctime)).toLocaleDateString()}}&nbsp;&nbsp;&nbsp;{{$lazy.FormatDate(parseInt(ctime),'HH:mm')}}</p>
                                        <!-- <p style="color:#666666;">上传人：某某某</p> -->
                                      </div>
                                      <div class="control" onselectstart='return false;' style='-moz-user-select:none;' >
                                            <div class="bili" onselectstart='return false;' style='-moz-user-select:none;' ></div>
                                            <div class="fangda" onselectstart='return false;' style='-moz-user-select:none;'  @click="changeScale(1)"></div>
                                            <div class="suoxiao" onselectstart='return false;' style='-moz-user-select:none;'   @click="changeScale(-1)"></div>
                                            <div class="zuoxuan" onselectstart='return false;' style='-moz-user-select:none;'  @click="rotateLeft()"></div>
                                            <div class="youxuan" onselectstart='return false;' style='-moz-user-select:none;'   @click="rotateRight()"></div>
                                            <a :href="imgSrc" :download="imgSrc">
                                                <div class="baocun" onselectstart='return false;' style='-moz-user-select:none;' ></div>
                                            </a>
                                      </div>
                                    </div>
                              </Modal>
                          </div>
                          <div class="imgsBox" v-show="!xiangceflag">
                              <dl v-for="file in fileArr" class="file">
                                <dt>
                                    <a :href="file.materialurl"  :download="file.def2">
                                      <img :src="wordpic" v-if="file.def2.indexOf('doc')>-1" alt="">
                                      <img :src="txtpic" v-if="file.def2.indexOf('txt')>-1" alt="">
                                      <img :src="xlspic" v-if="file.def2.indexOf('xls')>-1" alt="">
                                    </a>
                                </dt>
                                <dd>
                                    <p>{{ file.def2 }}</p>
                                </dd>
                                    <span class="guanbi" :class="{guanbi:true,hideguanbi:!file.selectFlag}" @click="deleteFile(file)"> X </span>
                              </dl>
                          </div>
                      </div>
                    </LazyBox>
                </LazyLayout>
            </div>

            <!-- 留言 -->
            <div class="msgBox">
              <LazyLayout orient="v">
                  <p class="titles">留言</p>
                  <LazyBox class="message">
                      <div class="msgdiv" @scroll="scrollmsg">
                        <dl v-for="(val,ind) in msgArr">
                            <dt v-if="val.headpicture">
                                <img :src="val.headpicture" alt="" class="img">
                            </dt>
                            <dt v-else>
                                <img src="../assets/images/moren.png" alt="" class="img">
                            </dt>
                            <dd>
                                <p class="username">{{ val.username }} <span class="dianzan"><img src="../assets/images/dianzan.png" alt="" style="margin-right:2px;">  {{val.qlikes}}</span> </p>
                                <p class="userinfo">{{ val.question }}</p>
                                <p class="timebox">
                                    <p class="dis">{{ new Date(parseInt(val.questiontime)).toLocaleString() }}</p>
                                    <p class="dis" style="float:right; color:#5e7da2;cursor:pointer;margin-right:10px;">
                                        <span v-if="!val.answer" @click="huifu(val)">回复</span> 
                                        <span  @click="deletes(val)">删除</span>
                                    </p> 
                                </p>

                                <div class="msgbox" v-if="val.isReplyFlag">
                                    <Input type="textarea" v-model="val.answerLocal" placeholder="请输入..." class="txt" style="z-index:1"></Input>
                                    <Button type="primary" size="small" class="dete"  @click="dete(val)">确定</Button>
                                </div>
                                <div class="msgbox" v-if="val.answer">
                                    <div>
                                        <div class="htitle">
                                            <img src="../assets/images/blue.png" class="img" alt="" style="margin-right:5px;">
                                            <span calss="zuozhe">作者回复</span>
                                            <div class="dianzans">
                                                <img src="../assets/images/dianzan.png" alt="" style="margin-right:2px;"> 
                                                <span style="font-weight:normal">{{val.alikes}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="msgboxs">{{ val.answer }}</div>
                                    <div class="msgtime" v-if="val.answertime">{{ new Date(parseInt(val.answertime)).toLocaleString() }}</div>
                                    <div class="msgtime" v-else></div>
                                </div>
                            </dd>
                        </dl>
                      </div>
                  </LazyBox>
              </LazyLayout>
            </div>
            <Modal v-model="modal" @on-ok="ok">
                <p style="text-align:center;height:50px;line-height:50px;font-size:20px;">确定删除？</p>
            </Modal>
        </LazyLayout>
    </LazyBox>
  </LazyLayout>
</template>
<script>
    var vm;
    import Card from 'iview/src/components/card'
    import wordpic from '../assets/images/world.png'
    import txtpic from '../assets/images/txt.png'
    import xlspic from '../assets/images/xls.png'
    import Tabs from 'iview/src/components/tabs'
    import TabPane from 'iview/src/components/tabs/pane'
    import Modal from 'iview/src/components/modal'
    import Button from 'iview/src/components/button'
    import Input from 'iview/src/components/input'
    import Poptip from 'iview/src/components/poptip'
    import { Icon} from 'iview'
    import VueCropper from "vue-cropper"

    export default {
        data () {
            return{
                wordpic : wordpic,
                txtpic : txtpic,
                xlspic : xlspic,
                isReplyFlag : false,
                isInfoFlag : false,
                modal10 : false,
                show : false,
                pics : "",
                infoPic : "",
                infoTitle : "",
                state : "",
                address : "",
                starttime : "",
                endtime : "",
                contact : "",
                tel : "",
                activitytags : [],
                activitytype : "",
                remind : "",
                qrcode : "",
                signcode : "",
                msgArr : [],
                myId : "",
                page : 1,
                scale_n : 1,
                listArr : [],
                pages : 1,
                pagess: 1,
                cannum : "",
                baonum : "",
                id: "",
                imgList : [],
                xiangceflag : true,
                wenjianflag : false,
                codeImg : "",
                fileArr : [],
                imgSrc : "",
                ctime : "",
                allpage : 1,
                imgindex : 0,
                modal : false,
                actId : "",
                loading : false
            }
        },
        components:{
            Card,
            Tabs,
            TabPane,
            Modal,
            Button,
            Input,
            Poptip,
            VueCropper,
            Icon,
        },
        created:function(){
            vm = this;
            this.id = this.$router.history.current.query.routeParams;
            this.searchActivityInfo();
            this.searchList();
            this.getActivityMessage();
            this.searchImgs();
            this.searchPhoneCode();
            this.searchFile();
        },
        methods:{
            modalShow(index){
                this.modal10 = true;
                this.imgSrc = this.imgList[index].materialurl;
                this.ctime = this.imgList[index].createtime;
            },
            changeScale (num) {
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },
            rotateRight () {
                this.$refs.cropper.rotateRight()
            },
            rotateLeft () {
                this.$refs.cropper.rotateLeft()
            },
            searchActivityInfo(){
                var url = this.$store.state.serverHost + this.$lazy.url.activityInfo;
                this.$http.get(url, {
                    params: {
                      id : this.id,
                    }
                })
                .then(function (response) {
                    vm.infoPic = response.data.rows[0].cover;
                    vm.infoTitle = response.data.rows[0].title;
                    vm.state = response.data.rows[0].state;
                    vm.address = response.data.rows[0].address;
                    vm.starttime = response.data.rows[0].starttime;
                    vm.endtime = response.data.rows[0].endtime;
                    vm.contact = response.data.rows[0].contact;
                    vm.tel = response.data.rows[0].tel;
                    vm.activitytype = response.data.rows[0].activitytype.replace(/,/g, "、");
                    vm.activitytags = vm.activitytags.concat(response.data.rows[0].activitytags);
                    vm.remind = response.data.rows[0].remind;
                    vm.qrcode = response.data.rows[0].qrcode;
                    vm.signcode = response.data.rows[0].signcode;
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            downCode: function () {
                window.open(this.$store.state.serverHost + '/cmy/activity/cmyactivity/downloadQrcode?type=qd&code=' + vm.signcode );
            },
            downhuodongCode :function(){
                window.open(this.$store.state.serverHost + '/cmy/activity/cmyactivity/downloadQrcode?type=hd&code=' + vm.qrcode);
            },
            searchList(){
                var url = this.$store.state.serverHost + this.$lazy.url.list;
                this.$http.get(url, {
                    params: {
                      activityid : this.id,
                      //type : "sign",
                      page : this.pages,
                      rows : 10
                    }
                })
                .then(function (data) {
                    debugger;
                    console.log(data)
                    vm.listArr = vm.listArr.concat(data.data.rows);
                    debugger;
                    console.log(vm.listArr)
                    vm.cannum = data.data.newPrimaryKeys.enroll;
                    vm.baonum = data.data.newPrimaryKeys.sign
                })
                .catch(function (error) {
                  console.log(error)
                })
            },
            onScrolls(){
                if(vm.isTriggerScroll){
                    var offsetHeight = document.body.offsetHeight,
                        scrollHeight = document.body.scrollHeight,
                        scrollTop = document.body.scrollTop,
                        scrollBottom = offsetHeight + scrollTop;
                    if(scrollBottom == scrollHeight){
                        vm.pages++;
                        vm.searchList();
                    }
                }else{
                    vm.isTriggerScroll = true;
                }
            },
            getActivityMessage(){
                var url = this.$store.state.serverHost + this.$lazy.url.activityMessage;
                this.$http.get(url, {
                    params: {
                        activityid : this.id,
                        initId: vm.$store.state.communityDetail.initid,
                        page : this.page,
                        rows : 6
                    }
                })
                .then(function (res) {
                    debugger
                    console.log(res.data.rows)
                    if(res.data.rows.length > 0){
                        vm.allpage ++ ;
                    }
                    vm.msgArr = vm.msgArr.concat(res.data.rows);
                })
                .catch(function (error) {
                    console.log(error);
                })
            },
            deletes(val){
                debugger
                this.modal = true;
                this.actId = val.id;
            },
            ok(){
                debugger
                var url = this.$store.state.serverHost + this.$lazy.url.del;
                this.$http.get(url, {
                    params: {
                      id : vm.actId
                    }
                })
                .then(function (res) {
                    debugger
                    if(res.data.isSucceed){
                        //vm.msgArr.splice(vm.msgArr.indexOf(res), 1);
                        vm.page = 1;
                        vm.msgArr = [];
                        vm.getActivityMessage();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
            },
            dete(val){
                debugger;
                this.$set(this,"show",true);
                this.$set(val,"isReplyFlag",false);
                this.$set(val,"isReplyBtn",true);
                var url = this.$store.state.serverHost + this.$lazy.url.answerReply;
                this.$http.get(url, {
                    params: {
                      id : val.id,
                      answer : val.answerLocal
                    }
                })
                .then(function (res) {
                    if(res.data.isSucceed){
                        vm.$set(val,'answer',val.answerLocal);
                    }
                })
                .catch(function (error) {
                  console.log(error)
                })
            },
            huifu(val){
              this.$set(val,"isReplyFlag",true);
              this.$set(val,"isInfoFlag",true);
            },
            scrollmsg(){
                if(vm.isTriggerScroll){
                    var offsetHeight = document.body.offsetHeight,
                        scrollHeight = document.body.scrollHeight,
                        scrollTop = document.body.scrollTop,
                        scrollBottom = offsetHeight + scrollTop;
                    if(scrollBottom == scrollHeight){
                        vm.page++;
                        if(vm.page <= vm.allpage){
                            vm.getActivityMessage();
                        }else{
                            vm.page = vm.allpage;
                        }
                    }
                }else{
                    vm.isTriggerScroll = true;
                }
            },
            imgChange: function (e) {
                this.loading = true;
                var file = e.target.files || e.dataTransfer.files;
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
                        vm.src = e.target.result;
                        vm.upload(vm.id);
                    };
                }
            },
            upload (id) {
                var type;
                var vm = this;
                var fileObj = document.getElementById("file").files[0];
                debugger;
                //判断是照片还是文件
                if(fileObj.type.indexOf("image")>-1){
                  type = 'photo'
                }else{
                  type = "file"
                }
                // if(fileObj.type.indexOf("word")>-1){
                //     this.imgpath = worldpic;
                // }

                // if(fileObj.type.indexOf("text")>-1){
                //     this.imgpath = txtpic;
                // }
                var form = new FormData();
                form.append("file", fileObj);
                form.append("activityid", id);
                form.append("initid" , vm.$store.state.communityDetail.initid);
                form.append("fileType" , type);
                form.append("communityid" , vm.$store.state.userInfo.streetorcommunityid);
                form.append("communitytype" ,vm.$store.state.userInfo.streetorcommunity);
                var url = this.$store.state.serverHost + 'zuul/cmy/activity/cmyactivityfiles/uploadFile';
                this.$http.post(url, form)
                .then(function (response) {
                    debugger;
                    console.log(response);
                    if(response.data.isSucceed){
                        vm.loading = false;
                        vm.imgList = [];
                        vm.fileArr = [];
                        vm.pagess = 1;
                        vm.searchImgs();
                        vm.searchFile();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            searchImgs:function(){
                var url = this.$store.state.serverHost + '/cmy/activity/cmyactivityfiles/getPhotos';
                this.$http.get(url,{
                  params:{
                      activityid : this.id,
                      initid : vm.$store.state.communityDetail.initid,
                      page : vm.pagess,
                      rows : 22
                    }
                })
                .then(function(res){
                    vm.imgList = vm.imgList.concat(res.data.rows);
                    for(i in vm.imgList){
                        vm.$set( vm.imgList[i], 'selectFlag', false);
                    }
                })
                .catch(function(error){
                  console.log(error);
                })
            },  
            searchFile(){
              var url = this.$store.state.serverHost + '/cmy/activity/cmyactivityfiles/getFiles';
              this.$http.get(url,{
                params:{
                  initid : vm.$store.state.communityDetail.initid,
                  activityid : this.id,
                  fileType : 'file',
                  page : vm.pagess,
                  rows : 21
                }
              })
              .then(function(datas){
                vm.fileArr = vm.fileArr.concat(datas.data.rows);
              })
              .catch(function(error){
                console.log(error);
              })
            },
            scrollMe(){
                if(vm.isTriggerScroll){
                    var offsetHeight = document.body.offsetHeight,
                        scrollHeight = document.body.scrollHeight,
                        scrollTop = document.body.scrollTop,
                        scrollBottom = offsetHeight + scrollTop;
                    if(scrollBottom == scrollHeight){
                        vm.pagess++;
                        vm.searchImgs();
                        vm.searchFile();
                    }
                }else{
                    vm.isTriggerScroll = true;
                }
            },
            xiangce(){
                vm.$set(vm,"xiangceflag",true);
                this.$refs.xiang.style.color="#0363f3";
                this.$refs.wen.style.color="#666666";
            },
            /*wenjian(){
                vm.$set(vm,"xiangceflag",false);
                this.$refs.wen.style.color="#0363f3";
                this.$refs.xiang.style.color="#666666";
            },*/
            deleteImg(img){
                event.stopPropagation();
                var file = document.getElementById("file");
                    file.value = "";
                var url = this.$store.state.serverHost + '/cmy/activity/cmyactivityfiles/delByFileid';
                this.$http.get(url,{
                    params:{
                        fileid : img.id
                    }
                })
                .then(function(response){
                    if(response.data.isSucceed){
                        vm.imgList.splice(vm.imgList.indexOf(img), 1);
                    }
                })
                .catch(function(error){
                  console.log(error);
                })
            },
            deleteFile(file){
                event.stopPropagation();
                var url = this.$store.state.serverHost + '/cmy/activity/cmyactivityfiles/delByFileid';
                this.$http.get(url,{
                    params:{
                        fileid : file.id
                    }
                })
                .then(function(response){
                    if(response.data.isSucceed){
                        vm.fileArr.splice(vm.fileArr.indexOf(file), 1);
                    }
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            searchPhoneCode(){
                var url = this.$store.state.serverHost + 'wx/api/wx/getwxacode';
                this.$http.get(url,{
                    params:{
                      code : this.id
                    }
                })
                .then(function(res){
                    vm.codeImg = res.data.rows[0];
                })
                .catch(function(error){
                    console.log(error);
                })
            },
            imgQieHuan(n) {
                if(n>0) this.imgindex ++;
                else this.imgindex--;
                if(this.imgindex > this.imgList.length-1)this.imgindex = 0;
                if(this.imgindex < 0)this.imgindex = this.imgList.length-1;
                this.imgSrc = this.imgList[this.imgindex].materialurl;
            }
        }
    }
</script>

<style scoped>
.LazyLayout{
   width: 100%;
   height: 100%;
   box-sizing:border-box;
}
.dis{
    display: inline-block;
}
.myTabs{
    width:100%;
    height:100%;
    overflow:auto;
    background-color: #fff;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
}
.myTabs::-webkit-scrollbar{
    width: 2px;
    height: 2px;
    background-color: #fff;
}
.myTabs::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #fff;
}
.myTabs::-webkit-scrollbar-thumb{
    height: 20px;
    border-radius: 10px;
    background-color: #ccc;
}
.topBox{
    width: 100%;
    height:254px;
   // margin-top: 40px;
    padding: 19px;
}
.canyu{
    width:25%;
    padding:28px 19px 19px 19px;
    overflow: hidden;
    border-radius:15px;
}
.canyudiv{
    width:100%;
    height:100%;
    overflow:auto;
    background-color: #fff;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border:1px solid #d7dde4;
}
.canyudiv::-webkit-scrollbar{
    width: 2px;
    height: 2px;
    background-color: #fff;
}
.canyudiv::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #fff;
}
.canyudiv::-webkit-scrollbar-thumb{
    height: 20px;
    border-radius: 10px;
    background-color: #ccc;
}
.photoBox{
    width:46%;
    margin:28px 19px 19px 0;
    border:1px solid #d7dde4;
    border-radius:4px;
}
.msgBox{
    width:31%;
    padding:28px 19px 19px 0;
    overflow: hidden;
    border-radius:15px;
}
.picBox{
    width:50%;
    padding-top:15%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.picBoxs{
    width:17%;
    padding-top:17%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    margin-left:2.5%;
    margin-top:1.5%;
    border-radius:5px;
    position: relative;
    cursor: pointer;
}

.close{
  width:20px;
  height:20px;
  background-color: red;
  position: absolute;
  right:-5px;
  top:-5px;
  border-radius:50%;
  text-align:center;
  line-height: 20px;
  color:#fff;
  display: block;
}

.picBoxs:hover .close{
  display: block;
}

.hideClose{
  display: none;
}

.infoBox{
    width:100%;
    min-width:550px;
    padding-left:15px;
}
.title{
    font-weight:bolder;
    font-size:16px;
    height:47px;
    padding-top:5px;
}
.state{
    width:50px;
    height:20px;
    display: inline-block;
    line-height: 18px;
    text-align:center;
    margin-left:8px;
    font-size:8px;
    color:#29c089;
    border-radius:20px;
    border:1px solid #29c089;
}
.serBox{
        margin-top:6px;
}
.serBox span:nth-child(4n + 1){
  background-image: url(../assets/images/borderDashed/borderPink.png);
  display:inline-block;
  width:57px;
  height:24px;
  text-align:center;
  line-height: 24px;
  margin-right:10px;
  color:#666666;
}
.serBox span:nth-child(4n + 2){
  background-image: url(../assets/images/borderDashed/borderBlue.png);
  display:inline-block;
  width:57px;
  height:24px;
  text-align:center;
  line-height: 24px;
  margin-right:10px;
  color:#666666;
}
.serBox span:nth-child(4n + 3){
  background-image: url(../assets/images/borderDashed/borderOrange.png);
  display:inline-block;
  width:57px;
  height:24px;
  text-align:center;
  line-height: 24px;
  margin-right:10px;
  color:#666666;
}
.serBox span:nth-child(4n + 4){
  background-image: url(../assets/images/borderDashed/borderGreen.png);
  display:inline-block;
  width:57px;
  height:24px;
  text-align:center;
  line-height: 24px;
  margin-right:10px;
  color:#666666;
}
.lei{
    color:#5498c8;
    margin-top:9px;
    font-size:15px;
}

.infos{
    position: relative;
    margin-top:6px;
    color:#a1a1a1;
}
.infos span{
    color:#a1a1a1;
    font-size:14px;
}
.photoMask-icon{
    width: 14px;
    height: 14px;
    fill: #9d9d9d;
    cursor: pointer;
    position: absolute;
    top:4px;
}
.codeBox{
    width:25%;
    border-left:1px solid #e0e0e2;
    //margin-left:65px;
    margin-right:0;
}
.sao{
    text-align:center;
    margin-bottom:5px;
}
.cobox{
    width:125px;
    height:125px;
    margin:0 auto;
}
.cobox img{
    width:100%;
    height:100%;
}
.btn{
  width:118px;
  height:28px;
  border:1px solid #29c089;
  text-align:center;
  line-height: 28px;
  color:#29c089;
  border-radius:3px;
  cursor: pointer;
  margin:0 auto;
}
.btns{
  width:118px;
  height:28px;
  border:1px solid #29c089;
  text-align:center;
  line-height: 28px;
  color:#fff;
  background-color: #29c089;
  border-radius:3px;
  cursor: pointer;
  margin:6px auto;
}
.canyuBox{
    overflow-y:auto;
    border:1px solid #d7dde4;
    background-color:#fff;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;

}
.pic{
    border:1px solid #d7dde4;
    background-color:#fff;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;
    height:100%;
    overflow:hidden;
}
.message{
    overflow-y:auto;
    border:1px solid #d7dde4;
    background-color:#fff;
    border-bottom-left-radius:4px;
    border-bottom-right-radius:4px;

}
.canyudiv dl{
    margin:20px 0 0 20px;
}
.canyudiv dl dt{
    float: left;
    margin-right:10px;
}
.canyudiv dl dt img{
    width:50px;
    height:50px;
    border-radius:50%;
}
.canyudiv dl dd p{
    line-height: 24px;
}
.titles{
    height:51px;
    border:1px solid #d7dde4;
    background:#fff;
    border-bottom:none;
    line-height: 51px;
    font-size:15px;
    color:#747474;
    padding-left:15px;
    border-top-left-radius:4px;
    border-top-right-radius:4px;
}
.person{
    float: right;
    padding-right:10px;
}
.imgList{
    display: inline-block;
    margin:4px 0 0 14px;
    cursor: pointer;
    width:116px;
    height:116px;
    min-width:85px;
    min-height:85px;
}
.imgList img{
    width:100%;
    height:100%;
    border-radius:5px;
}
.pcbtn{
    position: absolute;
    top:14px;
    right:98px;
    z-index:1;
    //width:64px;
    //height:24px;
    color:#fff;
   // text-align:center;
   // line-height:24px;
    cursor:pointer;
    border-radius:5px;
}
.mobtn{
    position: absolute;
    top:14px;
    right:25px;
    z-index:1;
    width:64px;
    height:24px;
    background-color: #2d8cf0;
    border-radius:5px;
    text-align:center;
    line-height: 24px;
    color:#fff;
    cursor: pointer;
}

.message::-webkit-scrollbar{
    width: 2px;
    height: 2px;
    background-color: #fff;
}
.message::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #fff;
}
.message::-webkit-scrollbar-thumb{
    height: 20px;
    border-radius: 10px;
    background-color: #ccc;
}
.message dl{
    margin:40px 10px 45px 20px;
    display : flex;
    flex-direction: row
}
.message dl dt{
    float: left;
    margin-right:10px;
}
.message dl dt{
    width:36px;
    height:36px;
}
.message dl dt .img{
    width:36px;
    height:36px;
    border-radius:50%;
}
.userinfo{
    height:auto;
    color:#666666;
    font-size:14px;
    margin-top:8px;
}
.message dl dd{
    width:100%;
}
.message dl dd p{
    line-height: 20px;
}
.timebox{
    color:#c6cbd1;
    font-size:14px;
    margin-top:9px;
}
.timebox span{
    color:#5e7da2;
    margin-right:10px;
    cursor: pointer;
}
.msgbox{
    width:100%;
    height:auto;
    border-top:1px solid #ccc;
    margin-top:10px;
}
.txt{
    margin-top:20px;
}
.dete{
    float: right;
    margin-top:5px;
}
.dianzan{
    float: right;
    //padding-right:8px;
    width:30px;
}
.htitle{
    margin-top:20px;
    font-size:15px;
    line-height: 15px;
    font-weight:bolder;
}
.htitle .img{
    height:15px;
    display: block;
    float: left;
}
.dianzans{
    float: right;
    font-size:8px;
    //padding-right:8px;
    width:30px;
}
.msgboxs{
    margin-top:12px;
    font-size:13px;
    color:#666666;
    word-break:break-all; /* 自动换行 */
}
.msgtime{
    color:#c6cbd1;
    margin-top:9px;
    font-size:14px;
}
.username{
    font-size:14px;
}
.tabtitle{
  height:51px;
  border-bottom:1px solid #d7dde4;
  background-color: #fff;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  line-height: 51px;
  font-size:16px;
  color:#666666;
}
.tabtitle span{
  padding-right:15px;
  cursor: pointer;
}
.tabtitle span:nth-child(1){
  padding-left:15px;
}
.msgdiv{
    width:100%;
    height:100%;
    overflow:auto;
    background-color: #fff;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
}
.msgdiv::-webkit-scrollbar{
    width: 2px;
    height: 2px;
    background-color: #fff;
}
.msgdiv::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: #fff;
}
.msgdiv::-webkit-scrollbar-thumb{
    height: 20px;
    border-radius: 10px;
    background-color: #ccc;
}
.file{
  display: inline-block;
  margin-left:2.7%;
  margin-top:1.5%;
  width:13.5%;
  height:11%;
  position: relative;
}
.file dt img{
  width:100%;
  height:100%;
}
.file dd p{
  width:100%;
  height:20px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.guanbi{
  width:20px;
  height:20px;
  text-align:center;
  line-height: 20px;
  color:#fff;
  background:red;
  display: block;
  border-radius:50%;
  position: absolute;
  top:-5px;
  right:-5px;
  display: block;
  cursor: pointer;
}
.hideguanbi{
  display: none;
}
.file:hover .guanbi{
  display: block;
}
.alertBox{
  width:768px;
  height:475px;
  overflow: hidden;
  position: relative;
}
.picDiv{
    margin:0 auto;
    width:100%;
    height:100%;
}
.control{
  width:330px;
  margin:0 auto;
  position:absolute;
  bottom:0;
  background:#f3f2f2;
  height:40px;
  line-height:50px;
  margin-left:210px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.control img{
  margin-right:32px;
}
.bili{
  width:30px;
  height:18px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/bili.png);
  margin-right:30px;
}
.fangda{
  width:18px;
  height:18px;
  background-image: url(../assets/images/photoControl/fangdas.png);
  display: inline-block;
  margin-right:30px;
  cursor: pointer;
}
.fangda:hover{
  width:18px;
  height:18px;
  background-image: url(../assets/images/photoControl/fangda.png);
  display: inline-block;
  margin-right:30px;
}
.suoxiao{
  width:18px;
  height:18px;
  margin-right:30px;
  background-image: url(../assets/images/photoControl/suoxiaos.png);
  display: inline-block;
  cursor: pointer;
}
.suoxiao:hover{
  width:18px;
  height:18px;
  margin-right:30px;
  background-image: url(../assets/images/photoControl/suoxiao.png);
  display: inline-block;
}
.zuoxuan{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/zuoxuans.png);
  cursor: pointer;
}
.zuoxuan:hover{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/zuoxuan.png);
}
.youxuan{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/youxuans.png);
  cursor: pointer;
}
.youxuan:hover{
  width:16px;
  height:20px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/youxuan.png);
}
.baocun{
  width:18px;
  height:18px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/baocuns.png);
  cursor: pointer;
}
.baocun:hover{
  width:18px;
  height:18px;
  margin-right:30px;
  display: inline-block;
  background-image: url(../assets/images/photoControl/baocun.png);
}
.describe{
  position: absolute;
  left:0;
  top:570px;
  text-align:left;
  padding-left:16px;
}
.typeBox{
    display:inline-block;
    width:50px;
    height:20px;
    border:1px solid #29c089;
    //float: right;
    text-align:center;
    line-height: 17px;
    margin-right:40%;
    border-radius:20px;
    color:#29c089;
}
.typeBoxs{
    display:inline-block;
    width:50px;
    height:20px;
    border:1px solid #ff9292;
    //float: right;
    text-align:center;
    line-height: 17px;
    margin-right:40%;
    border-radius:20px;
    color:#ff9292;
}
.btn1{
    width:50px;
    height:50px;
    position: absolute;
    left:20px;
    top:224px;
    cursor: pointer;
}

.btn2{
    width:50px;
    height:50px;
    position: absolute;
    right:20px;
    top:224px;
    cursor: pointer;
}
.qiehuan{
    display:none;
}
.ivu-modal-content:hover .qiehuan{
    display:block;
}
.zhanshi{
    margin-top:-73px;
}
</style>