<template>
  <LazyLayout orient="v">
    <Affix :offset-top="0">
      <LazyTopbar :data="json" style="position: fixed;top: 0; width: calc(100% - 220px)"></LazyTopbar>
    </Affix>
    <LazyLayout orient="" align="" justify="" class="text1">
      <div style="width:400px ">
        <div class="divheight" :class="{tp:tp}" style="width: 400px;position: fixed;left: 225px;padding: 20px;z-index:22;border: 1px solid #e7e7eb;background: white;margin-left: 20px" :style="{top:tops}">
          <div style="width: 358px;height: 208px;border: 1px dashed rgb(231, 231, 235);position: relative" >
            <div style="padding: 20px 0;height: 206px;background-size:100% 100%" v-bind:style="{backgroundImage:'url('+firstPath+')'}">
              <div v-if="firstPath==''">
              <div style="color: #3399ff;width: 70px;height: 70px;background-size: 100% 100%;    margin: 0 auto;margin-bottom: 10px;" v-bind:style="{backgroundImage:'url('+upjia+')'}"></div>
              <p style="height: 20px;font-size: 16px;color: #999999;text-align: center;">请上传标题图</p>
              <p style="line-height: 20px;color: #999999;border-top: 1px dashed #e7e7eb;margin: 20px;padding-top: 5px">注意：上传规格为350*200px，图片大小不超过2M</p>
              </div>
              <Spin size="large" fix v-if="spinShow"></Spin>
              </div>
            <label  for="uploads"  style="width: 100%;height: 100%;position: absolute;top: -20px"></label>
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                   accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" ref="imgs">
          </div>
          <div  style="margin-top: 15px">
            <p style="font-size: 14px">原文链接</p>
            <Input style="margin-top: 10px;margin-left: 8px" v-model="yuanlink"></Input>
          </div>
          <div  style="margin-top: 15px">
            <p style="font-size: 14px">是否留言</p>
            <RadioGroup v-model="disabledGroup" style="margin-top: 10px;margin-left:8px">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </div>
          <div  style="margin-top: 15px">
          <p style="font-size: 14px">标签</p>
          <btnlist :items="btnlist"class="btnlists"></btnlist>
          </div>
          <div  >
          <p style="font-size: 14px;position: relative">分类
          <span style="position: absolute;right: 0">
          <Poptip >
          <span><Icon type="ios-plus-outline"   size="20"></Icon></span>
          <div slot="content"><Input type="text" size="small" style="width: 62%" placeholder="分类名" v-model="flname"></Input><Button size="small" style="margin-left: 5px" @click="adds">确定</Button></div>
          </Poptip></span></p>
          <btnlist :items="btnlist1"class="btnlists1" @removes="removes" :remove="true"></btnlist>
          </div>
        </div>
      </div>
      <LazyBox>
        <div style="width: 100%">
          <div class="rightEdit">
            <div style="height: 38px"></div>
            <LazyHtmlEditor @change="change"  @xiugaisrc="xiugaisrc" :huodong="true" @huodong="start" class="edit" ref="htmlimg" :tops="tops" @point1="point1" :classes="classes" :class="{aff:this.classes=='init'}"></LazyHtmlEditor>
            <!--<div style="margin-left: 40px;margin-top: 20px">-->
            <!--分类:-->
            <!--<Checkbox-group v-model="social"  style="margin-left: 10px;display: inline-block;">-->
            <!--<Checkbox :label="item.name" v-for="(item,index) in items" :key="index"><span>{{item.name}}</span></Checkbox>-->
            <!--</Checkbox-group>-->
            <!--</div>-->
            <!--<div style="margin-left: 40px;margin-top: 20px">-->
            <!--标题图:-->
            <!--<label  for="uploads"  style="width: 100%;height: 100%;border: 1px solid #dddee1;padding: 8px;margin: 0 5px;border-radius: 2px;cursor: pointer">上传图片</label>-->
            <!--<input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"-->
            <!--accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" ref="imgs">-->
            <!--<Button type="ghost" @click="firstImg" size="large">在文章中选取</Button><span style="margin-left: 222px;" :class="{hide: flag4}"></span>-->
            <!--</div>-->
            <!--<div class="firstBox" style="margin-top: 20px" :class="{hide: firstflag}"><img  style="width: 100%;height: 100%;background-size: 100% 100%;background-position: center;background-repeat: no-repeat;" v-bind:style="{backgroundImage:'url('+firstPath+')'}"></div>-->
          </div>
        </div>
      </LazyBox>
    </LazyLayout>
    <modals :title="title"  @ok="ok" @cancel="cancel" :isheader="isheader">
      <div class="pic" v-if="slots==0">
        <cards :items="item1" @load="load"></cards>
      </div>
      <div class="pic"  v-if="slots==1" >
        <cards :items="item1" @load="load"   classes="yangshi"></cards>
      </div>
      <div slot="header" >
        <Upload :action="up.url" :data="up.data"   :format="['jpg','jpeg','png','gif']" :on-success="handleSuccess" style="display: inline-block"  :on-format-error="handleFormatError" :show-upload-list="false">
          <label style="font-size: 14px;padding-right: 10px">选择图片</label> <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
      <div class="pic"  v-if="slots==2" >

        <div style=" width: 138px;">
          <Scroll :on-reach-bottom="handleReachBottom1" style="width:135px;height: 100%;margin: 0" class="scleft" height="460" >
            <daohang :sorts="sorts" :sindex="sindex" @sortselect="sortselect"></daohang>
          </Scroll>
        </div>

        <Scroll :on-reach-bottom="handleReachBottom" style="width: 590px;height: 100%;margin: 0" class="scright" height="450" >
          <cards :items="item1" @load="load"  classes="photo" @del="delse"></cards>
        </Scroll>
      </div>
    </modals>
    <Modal
      v-model="modal1"
      title="图片裁剪"
      @on-ok="caijian"
      @on-cancel="quxiao">
      <photocaijian @finishend="finishend" ref="photocaijian" :img="opation.img" width="600"></photocaijian>
    </Modal>
  </LazyLayout>
</template>
<script>
  import Card from 'iview/src/components/card'
  import Affix from 'iview/src/components/affix'
  import Scroll from 'iview/src/components/scroll'
  import upjia from '../assets/upjia.png'
  import { Checkbox ,CheckboxGroup,Upload,Modal,Poptip,Icon,Input,Button,Spin,Menu,MenuItem,MenuGroup,RadioGroup,Radio} from 'iview'
  import menus from  "../components/menu.vue"
  import cards from  "../components/cards.vue"
  import modals from  "../components/modals.vue"
  import photocaijian from '../components/photocaijian'
  import btnlist from '../components/btnlist'
  import daohang from '../components/daohang'
  var vm;
  export default {
    data () {
      return {
        yuanlink:"",
        disabledGroup:"是",
        sindex:"0",
        sorts:[],
        opation:{
          img:""
        },
        modal1:false,
        social: [],
        items:[{
          name:"北京"
        },{
          name:"天津"
        },{
          name:"河北"
        }],
        json:{
          title:"图文编辑",
          right:[{
            type : 'Button',
            label : '保存',
            size:'small',
            loading:false,
            buttontype : 'primary',
            onclick : function() {
              vm.tijiao();
            }
          }
          ],
          left:[{
            type : 'Button',
            svg : '#icon-fanhui',
            buttontype : 'text',
            onclick : function() {
              if(vm.actid){
                var temp =  vm.getallval();
                vm.$store.commit('updateContent', temp);
                vm.$router.push({
                  path:"articleLocalPreview",
                  query:{
                    actid: vm.actid
                  }
                });
              }else {
                vm.$router.push("/articleList");
              }
            }
          }]

        },
        item:[{
          name:"模板库",
          src:require("../assets/mb.png")
        },{
          name:"样式",
          src:require("../assets/ys.png")
        },{
          name:"图片",
          src:require("../assets/tp.png")
        }
          /* ,{
           name:"视频",
           src:require("../assets/sp.png")
           },{
           name:"音频",
           src:require("../assets/yp.png")
           },{
           name:"投票",
           src:require("../assets/toupiao.png")
           },{
           name:"小程序",
           src:require("../assets/xcx.png")
           }*/
        ],
        item1:[],
        title:"选择模板",
        index:0,
        photopath:'',
        upjia:upjia,
        slots:0,
        arr:[],
        btnlist:[],
        btnlist1:[],
        flname:'',
        tp:false,
        isheader:true,
        id:"",
        actid:this.$route.query.actid?this.$route.query.actid:"",
        yulan:this.$route.query.yulan?this.$route.query.yulan:false,
        firstPath:'',
        mobanid:0,
        path:{},
        firstflag:true,
        flag4:true,
        scroll:"",
        tops:"75px",
        classes:"init",
        el:'',
        up:{
          url:this.$store.state.serverHost + 'cmy/article/cmymaterial/uploadMaterial.ht',
          data:{
            "source":"materialPicture",
            "communityid": this.$store.state.userInfo.streetorcommunityid,
            "communitytype": this.$store.state.userInfo.streetorcommunity,
            "initId":this.$store.state.communityDetail.initid,
          }
        },
        spinShow:true,
        articleCode: '',
        page:1,
        fromId:0,
        page1:1,
        sortindex:0
      }
    },
    mounted() {
      window.addEventListener('scroll', this.menu)
      vm.$http.all([vm.getUserAccount(), vm.getUserPermissions()])
        .then(vm.$http.spread(function (acct, perms) {
          if(vm.actid && !vm.$store.state.article.articlecontent.id){
            vm.id=vm.actid;
            var url = vm.$store.state.serverHost + 'cmy/article/cmyarticle/getArticle';
            vm.$http.get(url,{
              params:{
                id:vm.actid
              }
            }).then(function(res){
              vm.spinShow=false
              var data=res.data.rows[0];
              vm.firstPath=data.def1;
              vm.yuanlink = data.def8;
              vm.disabledGroup = data.def9;
              vm.arr=[data.articletitle,data.articleauthor,data.articlecontent]
              vm.articleCode = data.def2;
              vm.$refs.htmlimg.addtitle([data.articletitle,data.articleauthor])
              vm.$refs.htmlimg.remove(data.articlecontent)
              console.log(data)
              var activitytag=data.articletag;
              var activitytype=data.articletype;
              activitytag=activitytag.split(",");
              activitytype=activitytype.split(",");
              for(var j=0;j<vm.btnlist.length;j++){
                for(var i=0;i<activitytag.length;i++){
                  if(activitytag[i]==vm.btnlist[j].id){
                    vm.btnlist[j].show=true;
                  }
                }
              }
              for(var j=0;j<vm.btnlist1.length;j++){
                for(var i=0;i<activitytype.length;i++){
                  if(activitytype[i]==vm.btnlist1[j].id){
                    vm.btnlist1[j].show=true;
                  }
                }
              }
            })
          }else if(vm.yulan){
              vm.spinShow=false
              var da=vm.$store.state.article.articlecontent;
              vm.id=da.id;
              vm.articleCode = da.def2;
              if(da.photo){
                vm.firstPath=da.photo;
              }
              vm.arr=da.html;
              //alert(da.arr)
              vm.$refs.htmlimg.addtitle([da.html[0],' '])
              vm.$refs.htmlimg.remove(da.html[2])
                for(var i=0;i<da.tag.length;i++){
                  if(da.tag[i].show==true){
                    vm.btnlist[i].show=true;
                  }
                }
                for(var i=0;i<da.fenlei.length;i++){
                  if(da.fenlei[i].show==true){
                    vm.btnlist1[i].show=true;
                  }
                }
          }else{
            vm.spinShow=false
          }
        }));
    },
    created:function(){
      vm=this;
      this.$emit("change",0);
    // vm.getUserAccount();
    // vm.getUserPermissions()

    },
    components : {
      Scroll,
      menus,
      cards,
      modals,
      Card,
      Affix,
      Checkbox,
      CheckboxGroup,
      Upload,
      photocaijian,
      Modal,
      btnlist,
      Poptip,
      Icon,
      Input,
      Button,Spin,daohang,RadioGroup,Radio
    },
    methods : {
      delse(item){
        var url = this.$store.state.serverHost + 'cmy/article/cmymaterial/delPic';
        this.$http.get(url,{
          params:{
              id:item.id
          }
        }).then(function(res){
            vm.item1.splice(item.index, 1)
            if(vm.sortindex==0){
              vm.sorts[vm.sortindex].number--;
              for(var i=0;i<vm.sorts.length;i++){
                  if(vm.sorts[i].id==res.data.newPrimaryKeys.id){
                    vm.sorts[i].number--;
                  }
              }
            }else{
              vm.sorts[0].number--;
              vm.sorts[vm.sortindex].number--;
            }
        })
      },
      sortselect(name){
          this.sortindex=name;
          this.sindex=name;
          this.fromId=this.sorts[name].id;
          this.item1=[];
          this.page1=1;
          this.loadphoto()
      },
      handleReachBottom(){
        return new Promise(resolve => {
          setTimeout(() => {
            vm.loadphoto()
            resolve();
          }, 500);
        });
      },
      handleReachBottom1(){
        return new Promise(resolve => {
          setTimeout(() => {
            vm.loadsort()
            resolve();
          }, 500);
        });
      },
      getallval(){
          var obj={}
          obj.photo=this.firstPath;
          obj.tag=this.btnlist;
          obj.fenlei=this.btnlist1;
          obj.html=this.arr;
          obj.id=this.id;
          obj.def2 = this.articleCode;
          return obj
      },
      getUserAccount(){
        var url = this.$store.state.serverHost + 'cmy/article/cmyarticletype/getArticleTypeAdd';
        return this.$http.get(url,{
          params:{
            communityid:this.$store.state.userInfo.streetorcommunityid,
            communitytype:this.$store.state.userInfo.streetorcommunity
          }
        }).then(function(res){
          var res=res.data.rows;
          for(var i=0;i<res.length;i++){
            var obj={};
            obj.name=res[i].name;
            obj.id=res[i].id;
            obj.show=false;
            vm.btnlist1.push(obj)
          }
        })
      },
      getUserPermissions(){
        var url = vm.$store.state.serverHost + 'cmy/activity/cmyactivitytag/getActivityTag';
        return vm.$http.get(url,{
          params:{
//          communityid:vm.$store.state.userInfo.streetorcommunityid,
//          communitytype:vm.$store.state.userInfo.streetorcommunity
          }
        }).then(function(res){
          var res=res.data.rows;
          for(var i=0;i<res.length;i++){
            var obj={};
            obj.name=res[i].tag;
            obj.id=res[i].id;
            obj.show=false;
            vm.btnlist.push(obj)
          }
        })
      },
      adds(){
          this.flname=this.flname.trim();
        if(this.flname==''){
          this.$Notice.warning({
            title: "分类不能为空!"
          });
          return
        }
        var url = this.$store.state.serverHost + 'cmy/article/cmyarticletype/save';
        this.$http.get(url,{
          params:{
            type:this.$store.state.userInfo.streetorcommunityid,
            def6:this.$store.state.userInfo.streetorcommunity,
            name:this.flname
          }
        }).then(function(res){
          var obj={};
          obj.name=vm.flname;
          obj.id=res.data.newPrimaryKeys.id;
          obj.show=false;
          vm.btnlist1.push(obj)
        })
      },
      removes(index){
        var url = this.$store.state.serverHost + 'cmy/article/cmyarticletype/delById';
        this.$http.get(url,{
          params:{
            id:index.id
          }
        }).then(function(res){
          if(res.data.isSucceed){
            vm.btnlist1.splice(index.index,1)
          }else{
            vm.$Notice.warning({
              title: res.data.message
            });
          }
        })
      },
      uploadImg (e) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        console.log(file)
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$Notice.warning({
            title: '图片类型必须是.gif,jpeg,jpg,png,bmp中的一种',
          });
          return false
        }
        if(file.size/1024>2048){
          this.$Notice.warning({
            title: '文件大小超出限制'
          });
          return
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          this.opation.img = e.target.result
          this.modal1=true
          this.$refs.imgs.value=''
        }
        reader.readAsDataURL(file)
      },
      finishend(data){
        this.spinShow=true;
        var url=this.$store.state.serverHost + 'cmy/article/cmymaterial/uploadMaterial_base64.ht'
        var p={
          "source":"materialPicture",
          "communityid": this.$store.state.userInfo.streetorcommunityid,
          "communitytype": this.$store.state.userInfo.streetorcommunity,
          "initId":this.$store.state.communityDetail.initid,
        }
        p.base64Code=data;
        this.$http.post(url,this.qs.stringify(p)).then(function(res){
          vm.firstPath=res.data.newPrimaryKeys.path
          vm.firstflag = false;
          vm.spinShow=false;
        })
      },
      caijian(){
        this.$refs.photocaijian.finish("base64")
      },
      quxiao(){
        this.$refs.imgs.value=''
        this.modal1=false;
      },
      xiugaisrc(el){
        this.el=el;
        this.index=10;
        this.page=1;
        this.page1=1;
        this.sindex="0";
        this.fromId=0;
        this.sorts=[];
        this.item1=[]
        this.loadsort()
        this.loadphoto()
      },
      point1(obj){
        if(obj.bol=="zk"){
          this.classes="init";
        }else{
          this.classes="init1";
        }
      },
      menu() {
        this.scroll = window.pageYOffset;
        if(this.scroll>0){
          this.tops="45px";
        }else{
          this.tops="75px";
        }
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleSuccess(response,file){
          if(this.fromId==0||this.fromId==1){
            this.item1.unshift({id:response.newPrimaryKeys.id,src:response.newPrimaryKeys.path})
          }
        this.sorts[0].number++;
        this.sorts[1].number++;
      },
      change(arr) {
        this.biaoti=arr[0];
        this.author=arr[1];
        this.arr=arr;
        this.$eventHub.$emit('LazyPhoneHtml',arr)
      },
      load(obj){
        this.mobanid=obj.id;
        this.path=obj.item
      },
      start(index){
        if(this.index!=index){
          this.$eventHub.$emit("reset","null")
        }
        this.index=index;
        this.isheader=false;
        this.item1=[]
        if(index==0){
          var url = this.$store.state.serverHost + 'cmy/article/cmytemplate/getTemplateList.ht?def1=0';
          this.$http.get(url).then(function(res){
            var arr={};
            for(var i=0;i<res.data.rows.length;i++){
              vm.item1.push({id:res.data.rows[i].id,src:res.data.rows[i].templatephoto})
            }
            vm.slots=0;
            vm.title="选择模板";
            vm.modal=true;
            vm.$eventHub.$emit("changemodal",true)
          })

        }else if(index==2){
          this.page=1;
          this.page1=1;
          this.sindex="0";
          this.fromId=0;
          this.sorts=[];
          this.item1=[]
          this.loadsort()
          this.loadphoto()
        }else if(index==1){
          var url = this.$store.state.serverHost + 'cmy/article/cmytemplate/getTemplateList.ht?def1=1';
          this.$http.get(url).then(function(res){
            var arr={};
            for(var i=0;i<res.data.rows.length;i++){
              vm.item1.push({id:res.data.rows[i].id,src:res.data.rows[i].templatephoto})
            }
            vm.slots=1;
            vm.title="选择样式";
            vm.$eventHub.$emit("changemodal",true)
          })
        }

      },
      loadsort(){
        var url = this.$store.state.serverHost + 'cmy/article/cmymaterial/getMaterialPicture';
        this.$http.get(url,{
          params:{
            communityid:this.$store.state.userInfo.streetorcommunityid,
            communitytype:this.$store.state.userInfo.streetorcommunity,
            initid:this.$store.state.communityDetail.initid,
            rows:20,
            page:this.page
          }
        }).then(function(res){
          for(var i=0;i<res.data.rows.length;i++){
            vm.sorts.push({id:res.data.rows[i].id,name:res.data.rows[i].name,number:res.data.rows[i].number})
          }
          vm.page++;
        })
      },
      loadphoto(){
        var url = this.$store.state.serverHost + 'cmy/article/cmymaterial/getMaterialPictureList';
        this.$http.get(url,{
          params:{
            communityid:this.$store.state.userInfo.streetorcommunityid,
            communitytype:this.$store.state.userInfo.streetorcommunity,
            rows:20,
            page:this.page1,
            fromId:this.fromId
          }
        }).then(function(res){
          var arr={};
          for(var i=0;i<res.data.rows.length;i++){
            vm.item1.push({id:res.data.rows[i].id,src:res.data.rows[i].materialurl,del:true})
          }
          vm.page1++;
          vm.slots=2;
          vm.$eventHub.$emit("changemodal",true)
          vm.isheader=true;
        })
      },
      ok () {
        this.modal=false;
        this.item1=[];
        if(this.index==0){
          this.$refs.htmlimg.remove(true)
          var url = this.$store.state.serverHost + 'cmy/article/cmytemplate/get.ht';
          this.$http.get(url, {params:{
            id:this.mobanid
          }}).then(function(res){
            vm.$refs.htmlimg.insertHTML(res.data.rows[0].templatecontent)
          })
        }else if(this.index==1){
          var url = this.$store.state.serverHost + 'cmy/article/cmytemplate/get.ht';
          this.$http.get(url, {params:{
            id:this.mobanid
          }}).then(function(res){
            vm.$refs.htmlimg.insertHTML(res.data.rows[0].templatecontent)
          })

        }else if(this.index==2){
          this.$refs.htmlimg.addImage(this.path.src)
        }else{
          this.el.src=this.path.src;
          var s=this.$refs.htmlimg.getval()
          this.change(s)
        }
      },
      cancel () {
        this.modal=false;
        this.item1=[];
      },
      tijiao(){
        vm.$lazy.data.list = true;
        if(!localStorage.initid) {
          vm.$Message.warning('请先绑定微信号');
          return;
        }
        if(this.firstPath==''){
          this.$Message.warning('请上传标题图!');
          return;
        }
        var activitytype=[]
        for(var i=0;i<this.btnlist1.length;i++){
          if(this.btnlist1[i].show){
            activitytype.push(this.btnlist1[i].id)
          }
        }
        var activitytag=[]
        for(var i=0;i<this.btnlist.length;i++){
          if(this.btnlist[i].show){
            activitytag.push(this.btnlist[i].id)
          }
        }
       /* if(activitytype.length==0&&this.btnlist.length>0){
          this.$Notice.info({
            desc: '请选择分类!'
          });
          return
        }else if(activitytag.length==0&&this.btnlist1.length>0){
          this.$Notice.info({
            desc: '请选择标签!'
          });
          return
        }*/
        for(var i=0;i<this.arr.length;i++){
          if(this.arr[i]==''&&i!=1){
            this.$Notice.info({
              desc: '请完善文章信息!'
            });
            return
          }
        }
        if(this.arr[0].length>64){
          this.$Notice.info({
            desc: '标题不能超过64字!'
          });
          return
        }
        vm.json.right[0].loading=true
        var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/save';
        this.$http.post(url, this.qs.stringify({
          def3: this.$store.state.userInfo.streetorcommunityid,
          def6: this.$store.state.userInfo.streetorcommunity,
          def7: localStorage.initid,
          def8:this.yuanlink,
          def9:this.disabledGroup,
          articletitle: this.arr[0],
          articleauthor: this.arr[1],
          articlecontent: this.arr[2],
          def1: this.firstPath,
          id: this.id,
          articletype:activitytype.join(","),
          articletag:activitytag.join(",")
        }))
          .then(function (response) {
            console.log(response);
//            vm.$router.push('/articleList');
                  vm.$store.commit('updateContent', {});
                  vm.$router.push({
                    path:"articleLocalPreview",
                    query:{
                      actid: response.data.newPrimaryKeys.id
                    }
                  });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>

<style>
  /*滚动条样式*/
  .ivu-scroll-container::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .ivu-scroll-container::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .ivu-scroll-container::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .titleInput .ivu-input{
    height: 65px;
    font-size: 28px;
  }
  .authorInput .ivu-input{
    height: 30px;
    font-size: 16px;
  }
  .titleInput .ivu-input,.authorInput .ivu-input{
    border: none!important;
  }
  .titleInput .ivu-input:focus,.authorInput .ivu-input:focus{
    -webkit-box-shadow: none!important;
  }
  .hehe .ivu-select-selection{
    border: none;
  }
  .editor .content:empty:before{
    content: attr(placeholder);
    color:#ccc;
    font-size: 14px;
  }
  .edit .authorInput{
    display: none;
  }
  /*焦点时内容为空*/
  .editor .content:focus:before{
    content:none;
  }
  .edit img{
    max-width: 100%;
  }
  .edit .sel .ivu-select-selection{
    border: none!important;
    box-shadow: none!important;;
  }
  .top{
    top:120px;
  }
  .affs .ivu-affix{
    left: 220px!important;
  }
  .text1{
    padding: 25px 20px 0px 20px;
  }
  .phone{
    margin-left: 20px;
  }
  .aff .ivu-affix{
    position: initial!important;
  }
  .right{
    width: 186px;
    background-color: #fff;
  }
  .rightEdit{
    margin-left: 40px;

  }
  .rightEdit .hehe{
    right:20px!important;
    left:680px!important;
    border-right: 1px solid #e7e7eb;
  }
  .card{
    width: 179px;
    border: none;
    border-radius: 0px;

  }
  .card:hover{
    box-shadow:none;
  }
  .menus{
    margin-top: 30px!important;
  }
  .pic{
    height: 440px;
    overflow-x: hidden;
    overflow-y: hidden;
    display: -webkit-box;
    position: relative;
  }
  .btn{
    width: 50%;
    margin: 30px auto;
  }
  .firstBox{
    width: 358px;
    height: 200px;
    margin-left: 40px;
  }

  .a-upload {
    width:90px;
    padding: 7px 10px;
    margin-top: 1px;
    margin-right: 20px;
    border-radius: 4px;
    border: 1px solid #dedddd;
    background: #f6f5f5;
    text-align: center;
    color: #999;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }
  .a-upload  input {
    width: 86px;
    height: 27px;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
  }
  .a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none;
    cursor: pointer;
  }
  .pic .photo {
    overflow: hidden;
  }
  .pic .photo  .item{
    width: 110px;
    height: 110px;
    margin-left: 18px;
  }
  .yangshi  .item{
    width: 180px!important;
    height: 110px!important;
  }
  .ivu-menu-item-group-title{
    display: none;
  }
</style>

