<template>
  <LazyLayout orient="v">
    <Affix :offset-top="0">
      <LazyTopbar :data="json" style="position: fixed;top: 0;z-index: 11; width: calc(100% - 220px)"></LazyTopbar>
    </Affix>
    <LazyLayout orient="" align="" justify="" class="text1">
      <div style="width:400px ">
        <div class="divheight" :class="{tp:tp}" style="width: 400px;left: 225px;padding: 20px;z-index:22;border: 1px solid #e7e7eb;background: white;margin-left: 20px" :style="{top:tops}">
          <div style="position: relative">
            <p style="font-size: 14px;margin: 10px 0">标题名称</p>
            <Input v-model="bttitle" style="margin-left: 10px" :maxlength=65 class="bttitle"></Input>
            <span style="position: absolute;color: #a0a0a0;right: -3px;bottom: 7px;">{{bttitle.length}}/65</span>
          </div>
          <div>
            <p style="font-size: 14px;margin: 10px 0">类型</p>
            <twhp :items="items" @twhp="leixing" ref="twph"></twhp>
          </div>
          <div v-if="mm">
            <p style="font-size: 14px;margin: 10px 0">模板</p>
            <twhp :items="items1" class="moban"></twhp>
          </div>
          <div style="display: -webkit-box">
              <div style="-webkit-box-flex: 1">
                <p style="font-size: 14px;margin: 10px 0">投票数显示</p>
                <RadioGroup v-model="button1" type="button" style="margin-left: 10px">
                  <Radio label="投票前"></Radio>
                  <Radio label="投票后"></Radio>
                </RadioGroup>
              </div>
            <div style="-webkit-box-flex: 1">
              <p style="font-size: 14px;margin: 10px 0">是否多选</p>
              <RadioGroup v-model="button2" type="button" style="margin-left: 10px">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </div>
          </div>
          <div style="padding-bottom: 50px;">
            <p style="font-size: 14px;margin: 10px 0">开始时间</p>
            <DatePicker type="date" :options="options" placeholder="请选择" style="width: 300px;margin-left: 10px" v-model="starttime"></DatePicker>
            <p style="font-size: 14px;margin: 10px 0">结束时间</p>
            <DatePicker type="date" :options="options" placeholder="请选择" style="width: 300px;margin-left: 10px" v-model="endtime" @on-change="onchan"></DatePicker>
          </div>
        </div>
      </div>
      <LazyBox>
        <div style="width: 100%">
          <div class="rightEdit" ref="rightEdit">
            <div style="height: 38px"></div>
            <LazyHtmlEditor1 @change="change"   @xiugaisrc="xiugaisrc" :huodong="true" class="edit" @huodong="start" ref="htmlimg" :tops="tops" :classes="classes" @point1="point1" :class="{aff:this.classes=='init'}"></LazyHtmlEditor1>
            <div style="border: 1px solid #e7e7eb;background: white;border-top: none;padding-bottom: 20px"  v-if="leibie=='文本'">
              <div style="width:200px;margin: 0 auto;font-size: 14px;text-align: center;margin-bottom: 20px">距离投票结束</br>
                <countdown :endTime="chuo" :callback="callback" endText="已经结束了" v-if="aa"></countdown>
              </div>
              <div style="padding: 10px 50px;position: relative" v-for="(item,index) in count" :key="index">
                <p style="line-height: 50px">编号{{index+1}}</p>
                <div style="display: -webkit-box"><Input style="-webkit-box-flex: 1;display: block;padding-right: 50px;" :maxlength=35 class="bttitle1" placeholder="请输入内容" v-model="item.val"></Input><span style="position: absolute;color: #a0a0a0;right: 260px;bottom: 17px;">{{item.val.length}}/35</span><Button type="error" style="margin-right: 10px" @click="countdel(item,index)"><span style="padding-right: 5px">×</span>删除选项</Button><Button type="success" @click="countadd(item,index)">＋</Button></div>
              </div>
            </div>
            <div style="border: 1px solid #e7e7eb;background: white;border-top: none;padding-bottom: 20px;overflow: hidden"  v-if="leibie=='图文'">
              <div style="width:200px;margin: 0 auto;font-size: 14px;text-align: center;margin-bottom: 20px">距离投票结束</br>
                <countdown :endTime="chuo" :callback="callback" endText="已经结束了" v-if="aa"></countdown>
              </div>
              <div :style="{width:liecount*190+'px',marginLeft:-1*liecount*190/2+'px'}" style="left: 50%;position: relative">
              <div v-for="(item,index) in picbg" :key="index"  style="width: 170px;margin: 10px 10px;float:left;text-align: center;display: inline-block" @mouseover="mouseover(index)" @mouseleave="mouseleave(index)" >
                <div style="width: 170px;position:relative;border: 1px dashed #e7e7e7;background: #f8f8f8;"  @click="ns(index)">
                  <div class="bianhao89757">{{index+1}}</div>
                <Upload :action="up.url1"  :format="['jpg','jpeg','png','gif']" :on-success="handleSuccess1" style="display: block;position: relative; width: 100%;height: 100%; text-align: center;"  :on-format-error="handleFormatError" :show-upload-list="false">

                <div style="width: 170px;height: 140px;position: relative;border-bottom: 1px dashed #e7e7e7;background-size:100% 100%"  v-bind:style="{backgroundImage:'url('+item.path+')'}">
                  <div style="height: 100%;background-size:100% 100%">

                    <div v-if="item.path==''" style="padding-top: 35px">
                      <div style="color: #3399ff;width: 40px;height:40px;background-size: 100% 100%;    margin: 0 auto;margin-bottom: 10px;" v-bind:style="{backgroundImage:'url('+upjia+')'}"></div>
                      <p style="height: 20px;font-size: 16px;color: #999999;text-align: center;">请上传封面</p>
                    </div>
                  </div>


                </div>
                </Upload>
                <div v-if="button2=='是'&&button1=='投票后'" style="position: relative">
                  <Input style="padding: 5px;width: 80%" placeholder="请输入内容" v-model="item.content"  :maxlength=35 class="bttitle"></Input> <Checkbox v-model="item.xuanze" class="xuanze"> </Checkbox>
                  <span style="position: absolute;color: #a0a0a0;right: 35px;bottom: 12px;">{{item.content.length}}/35</span>
                </div>
                <div v-if="button2=='否'" style="position: relative">
                  <Input style="padding: 5px" placeholder="请输入内容" v-model="item.content"  :maxlength=35 class="bttitle"></Input>
                  <span style="position: absolute;color: #a0a0a0;right: 10px;bottom: 12px;">{{item.content.length}}/35</span>
                </div>
                <div style="text-align: center;display: -webkit-box;padding: 5px 0" v-if="button2=='否'">
                  <div style="-webkit-box-flex: 1;line-height: 25px;margin-left:5px;color: #ffb400;font-size: 16px" v-if="button1=='投票前'">xxxx票</div><Button type="error"  style="height: 25px;display:block;-webkit-box-flex: 1;line-height: 12px;background: #fa4343;margin: 0 10% 5px;">投票</Button>
                </div>
                <div v-if="button2=='是'&&button1=='投票前'" style="text-align: center;position: relative">
                  <Input style="padding: 5px;width: 95%;" placeholder="请输入内容" v-model="item.content"  :maxlength=35 class="bttitle"></Input>
                  <span style="position: absolute;color: #a0a0a0;right: 10px;top: 12px;">{{item.content.length}}/35</span>
                  <div style="text-align: left;display: -webkit-box;padding: 5px" >
                  <div style="-webkit-box-flex: 1;line-height: 25px;margin-left:5px;color: #ffb400;font-size: 16px" v-if="button1=='投票前'">xxxx票</div><Checkbox v-model="item.xuanze" class="xuanze"> </Checkbox>
                  </div>
                </div>
              </div>
                <div style="height: 30px">
                <Button type="error" style="display: inline-block;width: 70px;margin-top: 10px" v-if="item.mouseovern" @click="tuwendel(item,index)">删除</Button>
                </div>
              </div>
                <div style="width: 170px;height: 210px;margin:10px 10px;float:left;border: 1px dashed #e7e7e7;display: inline-block;padding-top: 65px" @click="tuwenadd">
                  <div style="color: #3399ff;width: 40px;height:40px;background-size: 100% 100%;    margin: 0 auto;margin-bottom: 10px;" v-bind:style="{backgroundImage:'url('+upjia+')'}"></div>
                  <p style="height: 20px;font-size: 16px;color: #999999;text-align: center;">新建</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </LazyBox>
    </LazyLayout>
    <modals :title="title"  @ok="ok" @cancel="cancel" :isheader="isheader">
      <div slot="header" >
        <Upload :action="up.url" :data="up.data"   :format="['jpg','jpeg','png','gif']" :on-success="handleSuccess" style="display: inline-block"  :on-format-error="handleFormatError" :show-upload-list="false">
          <label style="font-size: 14px;padding-right: 10px">选择图片</label> <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </div>
      <div class="pic"  v-if="slots==2" >

        <div style=" width: 138px;">
          <Scroll :on-reach-bottom="handleReachBottom1" style="width:135px;height: 100%;margin: 0" class="scleft" :height=460 >
            <daohang :sorts="sorts" :sindex="sindex" @sortselect="sortselect"></daohang>
          </Scroll>
        </div>

        <Scroll :on-reach-bottom="handleReachBottom" style="width: 590px;height: 100%;margin: 0" class="scright" :height=450 >
          <cards :items="item1" @load="load"  classes="photo" @del="delse"></cards>
        </Scroll>
      </div>
    </modals>
  </LazyLayout>
</template>
<script>
  import formlist from '../components/formlist'
  import countdown from '../components/countdown'
  import Card from 'iview/src/components/card'
  import Affix from 'iview/src/components/affix'
  import Scroll from 'iview/src/components/scroll'
  import cards from  "../components/cards.vue"
  import modals from  "../components/modals.vue"
  import upjia from '../assets/upjia.png'
  import { Checkbox ,CheckboxGroup,Upload,Modal,Poptip,Icon,Input,Button,Spin,Menu,MenuItem,MenuGroup,RadioGroup,Radio,DatePicker,Row,Col} from 'iview'
  import photocaijian from '../components/photocaijian'
  import twhp from '../components/twhp'
  import daohang from '../components/daohang'
  var vm;
  export default {
    data () {
      return {
        liecount:2,
        arr:[],
        aa:true,
        bttitle:"",
        leibie:"文本",
        chuo:"",
        starttime:"",
        endtime:"",
        mm:false,
        count:[],
        picbg:[],
        button1:"投票后",
        button2:"否",
        items:[{
            title:"文本",
            src:require("../assets/wenben.png")
        },{
          title:"图文",
          src:require("../assets/tuwen.png")
        }],
        items1:[{
          title:"图片模板",
          src:require("../assets/p1.png")
        }],
        opation:{
          img:""
        },
        spinShow:true,
        json:{
          title:"投票",
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
                vm.$router.push("/toupiaolb");
            }
          }]

        },
        upjia:upjia,
        tp:false,
        id:"",
        scroll:"",
        tops:"70px",
        classes:"init",
        el:'',
        up:{
          url:this.$store.state.serverHost + 'cmy/article/cmymaterial/uploadMaterial.ht',
          url1:this.$store.state.serverHost + 'base/base/oss/upload.ht?source=vote',
          data:{
            "source":"materialPicture",
            "communityid": this.$store.state.userInfo.streetorcommunityid,
            "communitytype": this.$store.state.userInfo.streetorcommunity,
            "initId":this.$store.state.communityDetail.initid,
          }
        },
        formlist:[],
        options:{
          disabledDate (date) {
            return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        page:1,
        fromId:0,
        page1:1,
        sortindex:0,
        slots:0,
        sorts:[],
        sindex:"0",
        isheader:true,
        index:0,
        item1:[],
        title:"选择模板",
        n:0,
        mouseovern:0,
        toupiaoid:this.$route.query.toupiaoid?this.$route.query.toupiaoid:"",
      }
    },
    mounted() {
      var vm=this;
      this.initcount();
      window.addEventListener('resize',this.initcount);
      this.spinShow=false
      window.addEventListener('scroll', this.menu);
      if(this.toupiaoid){
        var url = this.$store.state.serverHost + 'cmy/vote/cmyVote/getByPC';
        this.$http.get(url, {params:{
          id:this.toupiaoid
        }}).then(function(res){
            console.log(res)
          var data=res.data.rows[0];
          vm.leibie=data.type
          vm.bttitle=data.title
          if(data.type="图文"){
            vm.mm=true
            vm.$refs.twph.changeiscur(1)
            var num=[];
            for(var i=0;i<data.options.length;i++){
                var obj={}
                obj.path=data.options[i].imgcontent
                obj.content=data.options[i].txtcontent
                obj.xuanze=true
                obj.mouseovern=false
              num.push(obj)
            }
            vm.picbg=num
          }else{
            var num=[];
            for(var i=0;i<data.options.length;i++){
              var obj={}
              obj.val=data.options[i].txtcontent
              num.push(obj)
            }
            vm.count=num
          }
          vm.button1=data.numshow
          vm.button2=data.multiselect;
          vm.starttime=vm.$lazy.FormatDate(data.starttime,"yyyy-MM-dd")
          vm.endtime=vm.$lazy.FormatDate(data.endtime,"yyyy-MM-dd");
          vm.arr=["","",data.description]
          vm.$refs.htmlimg.remove(data.description)
        })
      }else{
          vm.picbg=[{path:"",content:"",xuanze:true,mouseovern:false},{path:"",content:"",xuanze:true,mouseovern:false},{path:"",content:"",xuanze:true,mouseovern:false}]
          vm.count=[{val:""},{val:""},{val:""}]
      }
    },
    destroyed(){
      window.removeEventListener('scroll', this.menu)
    },
    created:function(){
      vm=this;
      this.$emit("change",0);
    // vm.getUserAccount();
    // vm.getUserPermissions()
    },
    components : {
      daohang,
      cards,
      modals,
      formlist,
      countdown,
      twhp,
      Scroll,
      Card,
      Affix,
      Checkbox,
      CheckboxGroup,
      Upload,
      photocaijian,
      Modal,
      Poptip,
      Icon,
      Input,
      Button,Spin,RadioGroup,Radio,DatePicker,Row,Col
    },
    methods : {
        initcount(){
            this.liecount=parseInt(this.$refs.rightEdit.clientWidth/190)
        },
      onchan(time){
          time=this.$lazy.FormatDate(time,"yyyy-MM-dd")
          this.aa=false
          var vm=this
            setTimeout(bb,1);
            this.chuo=new Date(time).valueOf()
          function bb(){
                vm.aa=true
          }
      },
      callback(){

      },
      mouseover(index){
        this.picbg[index].mouseovern=true
      },
      mouseleave(index){
        this.picbg[index].mouseovern=false
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
      handleSuccess1(response,file){
        this.picbg[this.n].path=response.filepath
      },
      ns(index){
       this.n=index
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
      start(index){
        if(this.index!=index){
          this.$eventHub.$emit("reset","null")
        }
        this.index=index;
        this.isheader=false;
        this.item1=[]
        if(index==2){
          this.page=1;
          this.page1=1;
          this.sindex="0";
          this.fromId=0;
          this.sorts=[];
          this.item1=[]
          this.loadsort()
          this.loadphoto()
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
      leixing(obj){
         if(obj.index==1){
             this.leibie="图文"
             this.mm=true
         }else{
           this.leibie="文本"
             this.mm=false
         }
      },
      countadd(item,index){
        if (this.count.length) {
            var s={};
            s.title="22";
            s.val="";
          this.count.splice(index+1, 0, s);
        } else {
          this.count.push(0);
        }
      },
      tuwenadd(){
        if (this.picbg.length) {
          var s={path:"",content:"",title:1,xuanze:true,mouseovern:false}
          this.picbg.splice(this.picbg.length, 0, s);
        } else {
          this.picbg.push(0);
        }
      },
      countdel(item,index){
          if(this.count.length>1){
            this.count.splice(index,1)
          }

      },
      tuwendel(item,index){
        if(this.picbg.length>1){
          this.picbg.splice(index,1)
        }
      },
      menu() {
        this.scroll = window.pageYOffset;
        var divheight=document.getElementsByClassName('divheight')[0];
        if(this.scroll>0){
          this.tops="45px";
        }else{
          this.tops="70px";
        }
        if(this.scroll>860){
          this.tp=true
        }else{
          this.tp=false
        }
      },
      point1(obj){
        if(obj.bol=="zk"){
          this.classes="init";
        }else{
          this.classes="init1";
        }
      },
      quxiao(){
        this.$refs.imgs.value=''
      },
      change(arr) {
        this.arr=arr;
        this.$eventHub.$emit('LazyPhoneHtml',arr)
      },
      load(obj){
        this.mobanid=obj.id;
        this.path=obj.item
      },
      tijiao(){
        var url = this.$store.state.serverHost + 'cmy/vote/cmyVote/save';
        var p={};
        if(this.toupiaoid){
            p.id=this.toupiaoid
        }
        if(this.starttime==""||this.endtime==""){
          this.$Notice.warning({
            title: '请选择时间!'
          });
          return
        }
        p.initid=this.$store.state.communityDetail.initid;
        p.communityid=this.$store.state.userInfo.streetorcommunityid
        p.communitytype=this.$store.state.userInfo.streetorcommunity
        p.title=this.bttitle;
        p.type=this.leibie;
        p.template="default";
        p.numshow=this.button1;
        p.multiselect=this.button2;
        p.starttime=this.$lazy.FormatDate(this.starttime,"yyyy-MM-dd")+" 00:00:00";
        p.endtime=this.$lazy.FormatDate(this.endtime,"yyyy-MM-dd")+" 23:59:59";
        if(this.leibie=="文本"){
          var num=[]
          for(var i=0;i<this.count.length;i++){
            if(this.count[i].val==""){
              this.$Notice.warning({
                title: '请完善选项!'
              });
              return
            }
              var a={}
              a.txtcontent=this.count[i].val;
              num.push(a)
          }
           p.option=num
        }else{
          var num=[]
          for(var i=0;i<this.picbg.length;i++){
            if(this.picbg[i].path==""||this.picbg[i].content==""){
              this.$Notice.warning({
                title: '请完善选项!'
              });
              return
            }
            var a={}
            a.txtcontent=this.picbg[i].content;
            a.imgcontent=this.picbg[i].path;
            num.push(a)
          }
          p.option=num
        }
        p.description=this.arr[2]
        this.$http.post(url,this.qs.stringify(p)).then(function(res){
          vm.$router.push({
            path:"toupiaolb"
          });
        })
      }
    }
  }
</script>

<style>
  .bianhao89757{
    position: absolute;
    top: 0;
    left: 0;
    width: 22px;
    height: 26px;
    margin-left: 5px;
    color: white;
    background: url(../assets/bianhao89757.png) no-repeat;
    background-size: cover;
    z-index: 1;
  }
  .bttitle input{
    padding-right: 40px;
  }
  .bttitle1 input{
    padding-right: 60px;
  }
  .xuanze .ivu-checkbox-inner{
    width: 20px;
    height: 20px;
  }
  .xuanze .ivu-checkbox-checked .ivu-checkbox-inner:after{
    width: 6px;height: 12px;top:2px;left: 7px;border: 2px solid #fa4343;border-top: 0;  border-left: 0;
  }
  .xuanze .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #fa4343;
    background-color: white;

  }
  .tp{
    position: fixed!important;
    left: 240px!important;
    top: 70px!important;
    z-index: 9!important;
  }
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
  .aff .ivu-affix{
    position: initial!important;
  }
  .rightEdit{
    margin-left: 40px;

  }
  .rightEdit .hehe{
    right:20px!important;
    left:680px!important;
    border-right: 1px solid #e7e7eb;
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
  .pic{
    height: 440px;
    overflow-x: hidden;
    overflow-y: hidden;
    display: -webkit-box;
    position: relative;
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
  .moban .a{
    width: 120px!important;
    height: 180px!important;
  }
  .ivu-radio-group-button .ivu-radio-wrapper-checked{
    background: #2d8cf0;
    color: white;
  }
  .forms {
    margin-top: 10px;
  }
  .formlist1s .ivu-row{
    margin-left: 10px;
  }
  .formlist1s .ivu-form-item-label{
    line-height: 38px;
    font-size: 14px;
    float: none;
  }
  .formlist1s .ivu-form-item-content{
    margin-left:0px!important;
  }
  .formlist1s  .ivu-form-label-right>div:nth-child(1){
    padding-right: 20px;
  }
  .formlist1s .ivu-date-picker{
    width: 100%!important;
  }
</style>

