<template>
    <div >
      <Affix :offset-top="45">
        <LazyTopbar :data="json"></LazyTopbar>
      </Affix>
      <div   class="alls">
        <p class="p">编辑模板</p>
        <div class="body1">
          <div class="body2">
          <LazyLayout  orient="" align="" justify="">
            <div class="yulan bgg">
              <seemodal :items="htmls" :title="name"></seemodal>
            </div>
            <LazyBox>
              <div class="form">
                <formlist :items="items" ref="formval"></formlist>
              </div>
            </LazyBox>
          </LazyLayout>
            <lines biaoti="推送对象"></lines>
          <p style="margin-top: 20px">社工</p>
          <Select v-model="model10" multiple style="margin-top: 20px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  var vm
  import formlist from '../components/formlist'
  import rowcol from '../components/rowcol'
  import seemodal from '../components/seemodal'
  import lines from '../components/line'
  import Affix from 'iview/src/components/affix'
  import { Select,Option } from 'iview'
    export default {
        created(){
          vm=this;
          this.htmls=this.tem?JSON.parse(this.tem):{};
          var p=this.peopleid?this.peopleid.split(','):[]
          this.model10=p;
          var url = this.$store.state.serverHost + 'uc/uc/tuser/list';
          this.$http.get(url, {params:{
            ismanager:0,
            streetorcommunityid: this.$store.state.userInfo.streetorcommunityid,
            streetorcommunity: this.$store.state.userInfo.streetorcommunity
          }}).then(function(res){
            for(var i=0;i<res.data.rows.length;i++){
               var obj={};
               obj.value=res.data.rows[i].userid+"";
              obj.label=res.data.rows[i].nickname;
              vm.cityList.push(obj)
            }
          })
          if(vm.items.length>0){
            for(var i=0;i<vm.items.length;i++){
              vm.htmls[vm.items[i].title]=vm.items[i].val
            }
          }
          vm.$eventHub.$on('changeInput',function(obj){
            var s=obj.item.title;
            vm.htmls[s]=obj.val;
            vm.htmls = Object.assign({}, vm.htmls)
          })
          if(this.type==0){
              this.items=[{type:'input', title:"开头语", key:"first", val:""},{type:'input', title:"会议名称", key:"keyword1", val:""},{
                type:'time',
                key:"keyword2",
                title:"会议时间",
                val:""
              },{
                type:'input',
                title:"会议地点",
                key:"keyword3", val:""},{type:'textarea', title:"会议介绍", key:"keyword4", val:""},{type:'input', title:"结束语", key:"remark", val:""}]
             if(this.tem){
                  var tem=JSON.parse(this.tem)
                  var arr=[]
                   for(var prop in tem){
                      arr.push(tem[prop])
                   }
                   for(var i=0;i<this.items.length;i++){
                     this.items[i].val=arr[i]
                   }
             }
          }else if(this.type==1){
            this.items=[{type:'input', title:"开头语", key:"first", val:""},{type:'input', title:"名称", key:"keyword1", val:""},{
              type:'input',
              key:"keyword2",
              title:"发起人",
              val:""
            },{
              type:'time',
              title:"接收时间",
              key:"keyword3", val:""},{type:'input', title:"评审对象",  key:"keyword4", val:""},{type:'input', title:"结束语", key:"remark", val:""}]
            if(this.tem){
              var tem=JSON.parse(this.tem)
              var arr=[]
              for(var prop in tem){
                arr.push(tem[prop])
              }
              for(var i=0;i<this.items.length;i++){
                this.items[i].val=arr[i]
              }
            }
          }else if(this.type==2){
            this.items=[{type:'input', title:"开头语", key:"first", val:""},{type:'textarea', title:"目标内容", key:"keyword1", val:""},{
              type:'time',
              key:"keyword2",
              title:"完成时间",
              val:""
            },{
              type:'input',
              key:"keyword3",
              title:"所属项目", val:""},{type:'input', title:"完成人",   key:"keyword4", val:""},{type:'input', title:"结束语", key:"remark", val:""}]
            if(this.tem){
              var tem=JSON.parse(this.tem)
              var arr=[]
              for(var prop in tem){
                arr.push(tem[prop])
              }
              for(var i=0;i<this.items.length;i++){
                this.items[i].val=arr[i]
              }
            }
          }
        },
        mounted(){

        },
        data () {
            return {
              type:this.$route.query.type,
              tem:this.$route.query.tem,
              name:this.$route.query.name,
              peopleid:this.$route.query.peopleid+'',
              htmls:{},
              cityList: [],
              model10: [],
                items:[],
                json:{
                    title:'消息推送',
                  left:[{
                    type : 'Button',
                    svg : '#icon-fanhui',
                    buttontype : 'text',
                    onclick : function() {
                      vm.$router.go(-1);
                    }
                  }],
                  right:[{
                    type : 'Button',
                    label : '提交',
                    size:'small',
                    buttontype : 'primary',
                    onclick : function() {
                      vm.getval()
                    }
                  }]
                }
            }
        },
        components: {
          formlist,
          Affix,
          Select,
          Option,
          lines,
          rowcol,
          seemodal
        },
        methods: {
          getval(){
            var pam={
              userId:this.model10.join(","),
              communityid: this.$store.state.userInfo.streetorcommunityid,
              communitytype: this.$store.state.userInfo.streetorcommunity,
              title:this.name
            }
            var tem={};
            for(var i=0;i<this.items.length;i++) {
              if (this.items[i].type == 'time'&&this.items[i].val.length!=0) {
                this.items[i].val = this.$lazy.FormatDate(this.items[i].val, "yyyy-MM-dd HH:mm:ss")
              }
              if( this.items[i].key!='first'&&this.items[i].key!='remark'){
                  if( this.items[i].val.length==0){
                    this.$Notice.info({
                      desc: '请选择'+this.items[i].title+'!'
                    });
                  }
              }
              pam[this.items[i].key] = this.items[i].val
              tem[this.items[i].title] =  this.items[i].val
            }
            if(this.model10.length==0){
              this.$Notice.info({
                desc: '请选择社工!'
              });
            }
            tem=JSON.stringify(tem)
            pam.template=tem;
            var url = this.$store.state.serverHost + 'uc/NoticeDetail/NoticeDetail/sendNotice';
            this.$http.get(url, {params:pam}).then(function(res){
              vm.$router.go(-1);
            })
          }
        }
    }
</script>

<style>
  .alls{
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #f8f8f8;

  }
  .bgg{
    background: url(../assets/images/bgg.png) no-repeat;
    background-size: cover;
  }
  .body1{
    height: 100%;
    background: white;
    padding: 20px;
    border: 1px solid #d7dde4;
    border-radius: 5px;
  }
  .body2{
    max-width: 820px;
    margin: 0 auto;
  }
  .p{
    margin: 0px 20px 20px;
    line-height: 20px;
    font-size: 18px;
    padding-left: 8px;
    border-left: 4px solid #4f4f4f;
    margin-bottom: 20px;
  }
  .yulan{
    width: 215px;
    height: 380px;
  }
  .form{
      max-width: 600px;
  }
</style>
