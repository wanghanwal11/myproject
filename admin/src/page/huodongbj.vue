<template>
  <LazyLayout orient="v" style="height: 100%">
    <Affix :offset-top="0">
        <LazyTopbar :data="json" style="position:fixed;top:0;right:0;left:220px;width: calc(100% - 220px)"></LazyTopbar>
    </Affix>
  <LazyLayout orient="" align="" justify="" class="text1">
    <div style="width:400px;" class="affs">
        <div class="divheight" :class="{tp:tp}" style="width: 400px;position: absolute;left: 0px;padding: 20px;border: 1px solid #e7e7eb;background: white;margin-left: 20px" :style="{top:tops1}">
           <div style="width: 358px;height: 208px;border: 1px dashed rgb(231, 231, 235);position: relative" >
              <div style="padding: 20px 0;height: 206px;background-size:100% 100%" v-bind:style="{backgroundImage:'url('+photopath+')'}">
                <div v-if="photopath==''">
                <div style="color: #3399ff;width: 70px;height: 70px;background-size: 100% 100%;    margin: 0 auto;margin-bottom: 10px;" v-bind:style="{backgroundImage:'url('+upjia+')'}"></div>
                <p style="height: 20px;font-size: 16px;color: #999999;text-align: center;">请上传海报</p>
                <p style="line-height: 20px;color: #999999;border-top: 1px dashed #e7e7eb;margin: 20px;padding-top: 5px">注意：上传规格为350*200px，图片大小不超过2M</p>
                </div>
              </div>
             <label  for="uploads"  style="width: 100%;height: 100%;position: absolute;top: -20px"></label>
             <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                    accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg" ref="imgs">
             <Spin size="large" fix v-if="spinShow"></Spin>
           </div>
          <div class="form">
            <formlist :items="formlist" ref="formval" class="formlist1" @ditu="ditus"></formlist>
          </div>
          <div class="btnlist">
            <p style="font-size: 14px">标签</p>
            <btnlist :items="btnlist"class="btnlists"></btnlist>
          </div>
          <div class="btnlist1"  >
            <p style="font-size: 14px;position: relative">分类
              <span style="position: absolute;right: 0">
                <Poptip>
                <span><Icon type="ios-plus-outline"   size="20"></Icon></span>
                  <div slot="content"><Input type="text" size="small" style="width: 62%" placeholder="分类名" v-model="flname"></Input><Button size="small" style="margin-left: 5px" @click="add">确定</Button></div>
              </Poptip></span></p>
            <btnlist :items="btnlist1"class="btnlists1" @removes="removes" :remove="true"></btnlist>
          </div>
        </div>
    </div>
    <LazyBox>
    <div style="width: 100%">
        <div class="rightEdit1">
          <div style="height: 38px"></div>
              <LazyHtmlEditor @change="change" :huodong="true" placeholderarcher="请输入活动摘要" @huodong="huodong" @xiugaisrc="xiugaisrc" class="edit" ref="htmlimg" :tops="tops" @point1="point1" :classes="classes" :class="{aff:this.classes=='init'}"></LazyHtmlEditor>
        </div>
    </div>
    </LazyBox>
    <div style="width:1px;">
    </div>
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
  import formlist from '../components/formlist'
  import btnlist from '../components/btnlist'
  import Scroll from 'iview/src/components/scroll'
  import daohang from '../components/daohang'
  import upjia from '../assets/upjia.png'
  import Button from 'iview/src/components/button'
  import Card from 'iview/src/components/card'
  import Affix from 'iview/src/components/affix'
  import { Checkbox ,CheckboxGroup,Upload,Select,Option,Modal,Icon,Row ,Tooltip,Poptip,Input,Spin} from 'iview'
  import menus from  "../components/menu.vue"
  import cards from  "../components/cards.vue"
  import modals from  "../components/modals.vue"
  import photocaijian from '../components/photocaijian'
  var vm;
  export default {
    data () {
      return {
        sindex:"0",
        sorts:[],
        page:1,
        fromId:0,
        page1:1,
        sortindex:0,
        opation:{
            img:""
        },
        modal1:false,
        upjia:upjia,
        social: [],
        btnlist:[],
        btnlist1:[],
        x:'',
        y:'',
        flname:'',
        state:"",
        formlist:[],
        json:{
          title:"活动编辑",
          right:[{
            type : 'Button',
            label : '发布',
            size:'small',
            loading:false,
            buttontype : 'primary',
            onclick : function(v) {
                vm.state=1;
                vm.tijiao();
            }
          },{
            type : 'Button',
            label : '存草稿',
            size:'small',
            loading:false,
            buttontype : 'primary',
            onclick : function() {
              vm.state=0;
              vm.tijiao();
            }
          }
              ],
          left:[{
            type : 'Button',
            svg : '#icon-fanhui',
            buttontype : 'text',
            onclick : function() {
              vm.$router.go(-1);
            }
          }]

        },
        item1:[],
        title:"选择模板",
        index:0,
        slots:0,
        arr:['','',''],
        isheader:true,
        id:this.$route.query.routeParams?this.$route.query.routeParams:"",
        photopath:'',
        mobanid:0,
        path:{},
        flag4:true,
        scroll:"",
        tops:"80px",
        tops1:"36px",
        tp:false,
        classes:"init",
        spinShow:true,
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
        options:{
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.menu)
      vm.$http.all([vm.getactive(), vm.getactive1()])
        .then(vm.$http.spread(function (acct, perms) {
          if(vm.id){
            var url = vm.$store.state.serverHost + 'cmy/activity/cmyactivity/getActivity';
            vm.$http.get(url,{
              params:{
                id:vm.id
              }
            }).then(function(res){
                vm.spinShow=false
              var data=res.data.rows[0];
              vm.arr=[data.title,data.summary,data.content]
              vm.$refs.htmlimg.addtitle([data.title,data.summary])
              vm.$refs.htmlimg.remove(data.content)
              var arr=[];
              var time1=vm.$lazy.FormatDate(data.starttime, "yyyy-MM-dd HH:mm:ss")
              var time2=vm.$lazy.FormatDate(data.endtime, "yyyy-MM-dd")
              var hms1=vm.$lazy.FormatDate(data.starttime, "HH:mm:ss")
              var hms2=vm.$lazy.FormatDate(data.endtime, "HH:mm:ss")
              if(JSON.parse(data.coordinate)){
                arr.push(JSON.parse(data.coordinate).x)
                arr.push(JSON.parse(data.coordinate).y)
              }
              vm.photopath=data.cover;
              vm.x=arr.join(",");
              vm.y=data.address;
              vm.$eventHub.$emit("addmap",{x:vm.x,y:vm.y})
              vm.formlist=[{type:'input', title:"联系人", key:"contact", val:data.contact},{type:'input', title:"电话", key:"tel", val:data.tel,number:"true",ruler:"phone"},{type:'ditu', title:"地点", key:"address", val:data.address},{type:'input', title:" 上限人数", key:"limited", val:data.limited},{type:'time3',title:"开始时间", title1:"结束时间",  key:"activitytime",val:time1,hms:hms1,val1:time2,hms1:hms2,options:vm.options},{type:'select', title:"提醒",  tishi:"参加活动的人会在活动前收到提醒", key:"remind", val:data.remind,sel:[{text:"提前1天提醒",val:'1'},{text:"提前2天提醒",val:'2'},{text:"提前3天提醒",val:'3'}]}]
              var activitytag=data.activitytag;
              var activitytype=data.activitytype;
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
          }else{
            vm.spinShow=false
            vm.formlist=[{type:'input', title:"联系人", key:"contact", val:""},{type:'input', title:"电话", key:"tel", val:"",number:"number",ruler:"phone"},{type:'ditu', title:"地点", key:"address", val:""},{type:'input', title:"上限人数", key:"limited", val:"",number:"number"},{type:'time3', title:"开始时间", title1:"结束时间",  key:"activitytime", val:"",hms:"",val1:"",hms1:"",options:vm.options},{type:'select', title:"提醒",  tishi:"参加活动的人会在活动前收到提醒", key:"remind", val:"1",sel:[{text:"提前1天提醒",val:'1'},{text:"提前2天提醒",val:'2'},{text:"提前3天提醒",val:'3'}]}]
          }
        }));
    },
    destroyed(){
      window.removeEventListener('scroll', this.menu)
    },
    created:function(){
        vm=this;
    },
    components : {
      Scroll,
        menus,
        cards,
        modals,
        Button,
        Card,
      Affix,
      Checkbox,
      CheckboxGroup,
      Upload,
      formlist,
      btnlist,
      Select,Option,
      Modal,
      photocaijian,
      Tooltip,
      Icon,Poptip,Input,Spin,daohang
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
      getactive(){
        var url = this.$store.state.serverHost + 'cmy/activity/cmyactivitytype/getActivityType';
        return   this.$http.get(url,{
          params:{
            communityid:this.$store.state.userInfo.streetorcommunityid,
            communitytype:this.$store.state.userInfo.streetorcommunity
          }
        }).then(function(res){
          var res=res.data.rows;
          for(var i=0;i<res.length;i++){
            var obj={};
            obj.name=res[i].type;
            obj.id=res[i].id;
            obj.show=false;
            vm.btnlist1.push(obj)
          }
        })
      },
      getactive1(){
        var url = vm.$store.state.serverHost + 'cmy/activity/cmyactivitytag/getActivityTag';
      return  vm.$http.get(url,{
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
      menu() {
        this.scroll = window.pageYOffset;
        var divheight=document.getElementsByClassName('divheight')[0];
        if(this.scroll>0){
          this.tops="45px";
          this.tops1=36+"px";
        }else{
          this.tops="80px";
          this.tops1="36px";
        }
        if(this.scroll>860){
          this.tp=true
        }else{
          this.tp=false
        }
      },
      add(){
        this.flname=this.flname.trim();
          if(this.flname==''){
            this.$Notice.warning({
              title: "分类不能为空!"
            });
            return
          }
        var url = this.$store.state.serverHost + 'cmy/activity/cmyactivitytype/save';
        this.$http.get(url,{
          params:{
            communityid:this.$store.state.userInfo.streetorcommunityid,
            communitytype:this.$store.state.userInfo.streetorcommunity,
            type:this.flname
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
        var url = this.$store.state.serverHost + 'cmy/activity/cmyactivitytype/delById';
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
          vm.photopath=res.data.newPrimaryKeys.path
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
      ditus(data){
          this.x=data.value?data.value:',';
          this.y=data.label;
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

      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      exceeded(file){
        this.$Notice.warning({
          title: '文件大小超出限制'
        });
      },
      handleSuccess1(response,file){
        this.photopath=response.newPrimaryKeys.path;
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
      huodong(index){
         if(this.index!=index){
            this.$eventHub.$emit("reset","null")
          }
          this.index=index;
          this.isheader=false;
          this.item1=[]
         if(index==0){
            var url = this.$store.state.serverHost + 'cmy/article/cmytemplate/getTemplateList.ht?def1=2';
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
          var s=this.$refs.formval.getdituval();
          if(s){
            this.x=s.value?s.value:"";
            this.y=s.label?s.label:"";
          }
          var p={
            "communityid": this.$store.state.userInfo.streetorcommunityid,
            "communitytype": this.$store.state.userInfo.streetorcommunity,
            "initid":this.$store.state.communityDetail.initid
          }
        if(this.photopath==''){
           this.$Notice.info({
             desc: '请上传海报!'
           });
           return
         }
        for(var i=0;i<this.formlist.length;i++) {
          if (this.formlist[i].type == 'ditu'){
            if(this.x!=''){
              //this.formlist[i].val=this.y;
              var val=this.x.split(',');
              var ssr={};
              ssr.x=val[0];
              ssr.y=val[1];
              p.coordinate=JSON.stringify(ssr)
            }
            if(!this.x){
              this.$Notice.info({
                desc: '请选择'+this.formlist[i].title+'!'
              });
              return
            }
          }
          if(i!=2){
            if(i==4){
              if(this.formlist[i].val==''||this.formlist[i].val1==''||this.formlist[i].hms==''||this.formlist[i].hms1==''){
                this.$Notice.info({
                  desc: '请填写开始或结束时间!'
                });
                return
              }
            } else if(this.formlist[i].val.length==0||this.formlist[i].val==""){
              this.$Notice.info({
                desc: '请填写'+this.formlist[i].title+'!'
              });
              return
            }
          }
          if(i==4){
            p[this.formlist[i].key] = [this.formlist[i].val,this.formlist[i].val1,this.formlist[i].hms,this.formlist[i].hms1]
          }else{
            p[this.formlist[i].key] = this.formlist[i].val
          }
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
        if(activitytype.length==0&&this.btnlist.length>0){
          this.$Notice.info({
            desc: '请选择分类!'
          });
          return
        }else if(activitytag.length==0&&this.btnlist1.length>0){
          this.$Notice.info({
            desc: '请选择标签!'
          });
          return
        }
        for(var i=0;i<this.arr.length;i++){
            if(this.arr[i]==''&&i!=1){
              this.$Notice.info({
                desc: '请完善活动信息!'
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
        p.activitytype=activitytype.join(",")
        p.activitytag=activitytag.join(",")
        p.title= this.arr[0];
        p.content= this.arr[2];
        var tt=p.activitytime;
         var a=[];
         var str='';
         a.push(this.$lazy.FormatDate(tt[0], "yyyy-MM-dd")+" "+this.$lazy.FormatDate(tt[2], "HH:mm:ss"))
         a.push(this.$lazy.FormatDate(tt[1], "yyyy-MM-dd")+" "+this.$lazy.FormatDate(tt[3], "HH:mm:ss"))
         str=a.join(",")
         p.activitytime= str;
         p.state=this.state;
        p.address=this.y;
        p.cover=this.photopath;
         if(this.id!=''){
             p.id=this.id;
         }
         if(vm.state==1){
           vm.json.right[0].loading=true
         }else{
           vm.json.right[1].loading=true
         }
          var url = this.$store.state.serverHost + 'cmy/activity/cmyactivity/save';
          this.$http.post(url, this.qs.stringify(p)).then(function(res){
            debugger;
              if(!res.data.isSucceed){
                vm.$Notice.info({
                  desc: res.data.message
                });
                vm.json.right[1].loading=false
                vm.json.right[0].loading=false
                return
              }
              if(vm.state==1){
                if(vm.$lazy.data.sx != undefined){
                    vm.$lazy.data.sx = true;
                   // vm.$lazy.data.sxMore = true;
                }
                vm.$lazy.data.csx = true;
                vm.$router.push('/activityList');
                vm.json.right[0].loading=false
              } else if(vm.state==0){
                vm.$router.push('/activityDraft');
                if(vm.$lazy.data.csx != undefined){
                  vm.$lazy.data.csx = true;
                }
                vm.json.right[1].loading=false
              }

          })
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
  input::-webkit-outer-spin-button,            input::-webkit-inner-spin-button{                -webkit-appearance: none !important;            }
  .amap-logo,.amap-copyright {
    display: none!important;
  }

  .titleInput .ivu-input{
    height: 65px;
    font-size: 28px;
  }
  .authorInput .ivu-input{
    height: 30px;
    font-size: 16px;
  }
  .edit .authorInput{
    display: none;
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
  /*焦点时内容为空*/
  .editor .content:focus:before{
    content:none;
  }
  .edit img{
    max-width: 100%;
  }
  .ivu-upload-list-file-finish{
    display: none;
  }
  .top{
    top:120px;
  }
 .affs .ivu-affix{
      left: 220px!important;
  }
  .tp{
    position: fixed!important;
    left: 220px!important;
    bottom: 80px!important;
    top: auto!important;
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
  .rightEdit1{
    margin-left: 40px;
    margin-bottom: 80px;
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
    width: 300px;
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
  .rightEdit1 .hehe{
    right:20px!important;
    left:680px!important;
    border-right: 1px solid #e7e7eb;
  }
  .formlist1 .ivu-form-item-label{
    line-height: 38px;
    font-size: 14px;
    float: none;
  }
  .formlist1 .ivu-form-item-content{
    margin-left:0px!important;
  }
  .formlist1  .ivu-form-label-right>div:nth-child(1),.formlist1  .ivu-form-label-right>div:nth-child(2){
    float: left;
    width: 30%;
  }
  .formlist1  .ivu-form-label-right>div:nth-child(2){
    float: left;
    width: 70%;
  }
  .formlist1  .ivu-form-label-right>div:nth-child(1){
    padding-right: 20px;
  }
  .formlist1 .ivu-date-picker{
    width: 100%!important;
  }
</style>

