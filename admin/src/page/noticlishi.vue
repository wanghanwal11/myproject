<template>
    <div >
      <Affix :offset-top="45">
        <LazyTopbar :data="json"></LazyTopbar>
      </Affix>
      <div   class="alls">
        <p class="ps">推送历史</p>
        <div class="body1">
          <LazyLayout  orient="" align="" justify="">
            <Select v-model="model1" style="width:150px" @on-change="sel">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Date-picker type="date" placeholder="选择日期和时间" style="width: 200px;margin-left: 20px" v-model="begintime"></Date-picker>
            <p style="width:20px;line-height: 27px;font-size: 16px;text-align: center;margin-left: 20px">至</p>
            <Date-picker type="date" placeholder="选择日期和时间" style="width: 200px;margin-left: 20px"  v-model="endtime"></Date-picker>
            <Button type="primary" style="margin-left: 20px" @click="chaxun">查询</Button>
          </LazyLayout>
          <div class="tables">
            <tablelist :data1="data1" :columns="columns"  @selchange="selchange"></tablelist>
          </div>
          <div class="footer">
            <LazyLayout  orient="" align="" justify="">
            <Button   size="small" @click="delall">删除推送历史</Button>
            <Page :total="total"  show-sizer show-total show-elevator size="small" :page-size="pageSize" style="position: absolute;right: 0" @on-change="ye" @on-page-size-change="changePagesize"></Page>
            </LazyLayout>
          </div>
        </div>
      </div>
      <Modal v-model="modal2" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>是否继续删除？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long  @click="del">删除</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
  var vm
  import tablelist from '../components/tablelist'
  import rowcol from '../components/rowcol'
  import Affix from 'iview/src/components/affix'
  import { Select,Option,DatePicker,Button,Page,Modal,Icon } from 'iview'
    export default {
        created(){
          this.getDatalist()
        },
        data () {
            return {
              modal2:false,
                model1:'全部',
                pageSize:10,
              begintime:"",
              tem:[],
              endtime:"",
                page:1,
                total:0,
                data1:[],
                ids:[],
                columns:[
                  {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                  },
                  {
                    title: '发送时间',
                    key: 'time',
                    align: 'center'
                  },
                  {
                    title: '模板',
                    key: 'modal',
                    align: 'center'
                  },
                  {
                    title: '内容',
                    key: 'content',
                    align: 'center'
                  },
                  {
                    title: '目标|阅读',
                    key: 'read',
                    align: 'center'
                  },
                  {
                    title: '操作',
                    key: 'work',
                    align: 'center',
                    render: (h, params) => {
                      return h('div', [
                        h(Button, {
                          props: {
                            icon : "information-circled",
                            type: 'text',
                            size: 'small'
                          },
                          on: {
                            click: () => {
                              //this.show(params.index)
                              if(this.data1[params.index]._expanded){
                                this.data1[params.index]._expanded = false;
                              }
                              else
                                this.data1[params.index]._expanded =  true;
                            }
                          }
                        }, ''),
                        h(Button, {
                          props: {
                            icon : "trash-a",
                            type: 'text',
                            size: 'small'
                          },
                          on: {
                            click: () => {
                                this.modal2=true;
                                var arr=[];
                                arr.push(this.data1[params.index].id)
                                this.ids=arr;
                            }
                          }
                        }, ''),
                        h(Button, {
                          props: {
                            icon : "document-text",
                            type: 'text',
                            size: 'small'
                          },
                          on: {
                            click: () => {
                                var type='';
                                if(this.data1[params.index].modal=="会议通知"){
                                      type=0;
                                }else if(this.data1[params.index].modal=="任务提醒"){
                                    type=1
                                }else{
                                    type=2
                                }
                              this.$router.push({path:'/bjnotic',query:{tem:this.data1[params.index].tem,type:type,peopleid:this.data1[params.index].peopleid,name:this.data1[params.index].modal}})
                            }
                          }
                        }, '')
                      ]);
                    }
                  },
                  {
                    type:'expand',
                    width:0.1,
                    align: 'center',
                    render: (h, params) => {
                      return h(rowcol, {
                        props: {
                          items: this.tem[params.index]
                        }
                      })
                    }
                  }],
                items:[
                  {
                    type:'time'

                  }],
                cityList: [{value: '全部', label: '全部'},{value: '会议通知', label: '会议通知'}, {value: '任务提醒', label: '任务提醒'}, {value: '目标完成待确认提醒', label: '目标完成待确认提醒'}],
                json:{
                    title:'消息推送',
                  left:[{
                    type : 'Button',
                    svg : '#icon-fanhui',
                    buttontype : 'text',
                    onclick : function() {
                      vm.$router.go(-1);
                    }
                  }]
                }
            }
        },
        components: {
          Affix,
          Select,
          Option,
          DatePicker,
          Button,
          tablelist,
          Page,
          Modal,
          Icon
        },
        methods: {
          getDatalist(){
            vm=this;
            var url = this.$store.state.serverHost + 'uc/NoticeDetail/NoticeDetail/listByTime';
            this.$http.get(url, {params:{
              rows:this.pageSize,
              page:this.page,
              communityid: this.$store.state.userInfo.streetorcommunityid,
              communitytype: this.$store.state.userInfo.streetorcommunity,
              title:this.model1,
              begintime:this.begintime?this.$lazy.FormatDate(this.begintime, "yyyy-MM-dd HH:mm:ss"):"",
              endtime:this.endtime?this.$lazy.FormatDate(this.endtime, "yyyy-MM-dd HH:mm:ss"):""
            }}).then(function(res){
              console.log(res)
              var arr=[]
              var tems=[]
              vm.total=res.data.total
              if(res.data.rows.length>0){
              for(var i=0;i<res.data.rows.length;i++){
                var obj={}
                var cont={}
                var mubiao="目标";
                var yuedu="阅读";
                var people=[];
                var people1=[]
                var peopleid=[]
                obj.time=vm.$lazy.FormatDate(res.data.rows[i].createtime, "yyyy-MM-dd HH:mm:ss");
                obj.modal=res.data.rows[i].title;
                obj.content=res.data.rows[i].first;
                obj.read=res.data.rows[i].totalpeople+"/"+res.data.rows[i].readpeople;
                obj._expanded=false;
                obj.id=res.data.rows[i].id;
                obj.tem=res.data.rows[i].template;
                arr.push(obj)
                vm.data1=arr;
                for(var j=0;j<res.data.rows[i].totalPeopleList.length;j++){
                  if(res.data.rows[i].totalPeopleList.length>0){
                    people.push(res.data.rows[i].totalPeopleList[j].username)
                    peopleid.push(res.data.rows[i].totalPeopleList[j].userid)
                  }
                  if(res.data.rows[i].readPeopleList.length>0){
                    people1.push(res.data.rows[i].readPeopleList[j].username)
                  }
                }
                obj.peopleid=peopleid;
                var  peoples=people.join(",")
                var  peoples1=people1.join(",")
                cont=JSON.parse(res.data.rows[i].template);
                cont[mubiao]=res.data.rows[i].totalpeople+"人<span style='color: #245078;margin-left: 5px'>("+peoples+")</span>";
                cont[yuedu]=res.data.rows[i].readpeople+"人<span style='color: #245078;margin-left: 5px'>("+peoples1+"</span>)";
                tems.push(cont)
                vm.tem=tems;
              }
              }else{
                  vm. data1=[]
              }
            })
          },
          changePagesize(size){
              this.pageSize=size;
              this.getDatalist();
          },
          sel(val){
            this.model1=val;
          },
          chaxun(){
            this.getDatalist();
          },
          ye(page){
            this.page=page;
            this.getDatalist();
          },
          selchange(obj){
            var idd=[];
            for(var i=0;i<obj.selection.length;i++){
              idd.push(obj.selection[i].id)
            }
            this.ids=idd;
          },
          del(){
            var url = this.$store.state.serverHost + 'uc/NoticeDetail/NoticeDetail/del';
            this.$http.get(url, {params:{
              id:this.ids.join(',')
            }}).then(function(res){
              vm.modal2=false;
              vm.getDatalist()
            })
          },
          delall(){
              if(this.ids.length>0){
                this.modal2=true;
              }

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
  .body1{
    height: 100%;
    background: white;
    padding: 20px;
    border: 1px solid #d7dde4;
    border-radius: 5px;
  }

  .ps{
    line-height: 20px;
    font-size: 18px;
    padding-left: 8px;
    border-left: 4px solid #4f4f4f;
    margin-bottom: 20px;
  }
  .tables{
    margin-top: 30px;
  }
  .footer{
    margin-top: 30px;
  }
</style>
