<template>
  <div class="ff" :class="classes">
    <Form :model="formItem" :label-width="100">
      <div v-for="(item,index) in items" :key="index" >
        <Form-item :label="item.title" v-if="item.type=='input'">
          <Input v-model="item.val"  :type="item.number"  placeholder="请输入" @on-blur="ruler(item.val,item.ruler)" @on-change="changinput(item,index,item.val)"></Input>
        </Form-item>
        <Form-item :label="item.title"  v-if="item.type=='textarea'">
          <Input v-model="item.val" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."  @on-change="changinput(item,index,item.val)"></Input>
        </Form-item>
        <Form-item :label="item.title"   v-if="item.type=='time'">
          <Row >
            <Date-picker type="datetime"  placeholder="选择日期和时间" style="width: 200px" v-model="item.val"   @on-open-change="changinput(item,index,item.val,'time')"></Date-picker>
          </Row>
        </Form-item>
        <Form-item :label="item.title"   v-if="item.type=='timerange'">
          <Row >
            <Date-picker type="datetimerange" :options="item.options" placeholder="选择日期和时间" style="width: 200px" v-model="item.val"   @on-open-change="changinput(item,index,item.val,'timerange')"></Date-picker>
          </Row>
        </Form-item>
        <Form-item :label="item.title"   v-if="item.type=='time3'">
          <Row >
            <Col span="14">
            <Date-picker type="date" :options="item.options" :editable="false" placeholder="选择日期和时间" style="width: 200px" v-model="item.val"  @on-change="aaa(item,'time1')"  @on-open-change="changinput(item,index,item.val,'time3')"></Date-picker>
            </Col>
            <Col span="8" style="margin-left: 20px">
            <TimePicker type="time" @on-change="chang" :editable="false" placeholder="选择时间" :disabled="disabled" style="width: 168px" @on-open-change="onopenchange(item,index,item.val,'start')"  v-model="item.hms" :disabled-hours="hours" :disabled-minutes="minutes" :disabled-seconds="seconds"></TimePicker>
            </Col>
          </Row>
          <Row style="margin-top: 20px;font-size: 14px">{{item.title1}}</Row>
          <Row style="margin-top: 4px" >
            <Col span="14">
            <Date-picker type="date" :options="item.options" :editable="false" placeholder="选择日期和时间" style="width: 200px" v-model="item.val1" @on-change="aaa(item,'time2')"  @on-open-change="changinput(item,index,item.val1,'time3')"></Date-picker>
            </Col>
            <Col span="8" style="margin-left: 20px">
            <TimePicker type="time" @on-change="chang1" :editable="false" placeholder="选择时间" :disabled="disabled1" style="width: 168px" @on-open-change="onopenchange(item,index,item.val1,'end')" v-model="item.hms1" :disabled-hours="hours1" :disabled-minutes="minutes1" :disabled-seconds="seconds1"></TimePicker>
            </Col>
          </Row>
        </Form-item>
        <FormItem :label="item.title"   v-if="item.type=='select'">
          <div :class="{tishi: item.tishi}">
            <Select v-model="item.val" placeholder="请选择"  @on-change="changinput(item,index,item.val)">
              <Option :value="sel.val" v-for="(sel,index) in item.sel" :key="index">{{sel.text}}</Option>
            </Select>
            <p class="ptishi">{{item.tishi}}</p>
          </div>
        </FormItem>
        <FormItem :label="item.title"   v-if="item.type=='ditu'">
          <div style="width: 100%;position: relative;background: white;padding: 5px;">
            <Input type="text"  name="maps" placeholder="请输入.." v-model="selinput" @on-change="search(bol)" @on-focus="showmaps(true)" @on-blur="showmaps(false)" ></Input>
            <div id="container" :style="{display:showmap}" style="width: 100%;height: 300px;position: absolute;top: 40px;z-index: 999;"></div>
          </div>
          <!--<Row>-->
          <!--<Select @on-query-change="searchAddress"-->
          <!--v-model="item.val" ref="gps"-->
          <!--label-in-value-->
          <!--:filterable="true"-->
          <!--remote-->
          <!--:remote-method="searchAddress"-->
          <!--:loading="loading">-->
          <!--<Option v-for="option in options" :value="option.location" :label="option.name" :key="new Date()">-->
          <!--<span>{{option.name}}</span>-->
          <!--<span style="float:right;color:#ccc">{{option.district}}</span>-->
          <!--</Option>-->
          <!--</Select>-->
          <!--</Row>-->
        </FormItem>
      </div>
    </Form>
  </div>
</template>
<script>
  import {Form ,FormItem,Input,Radio,Checkbox,Switch,Select,Option,Slider,DatePicker,TimePicker,Cascader,Transfer,InputNumber,Rate,Upload,Row,Col} from 'iview'
  var vm='';
  export default {
    created(){
      vm=this;
      this.$eventHub.$on("addmap",function (val) {
        vm.selinput=val.y
        vm.zuobiao.value=val.x;
        vm.zuobiao.label=val.y;
      })
    },
    mounted(){
      document.addEventListener('click',function(e){
        if(!e.target.UK&&e.target.name!='maps'){
          vm.showmap='none';
        }
      })
    },
    props:{
      items:{
        type:Array,
        default:[]
      },
      classes:{
        type:String,
        default:""
      }
    },
    data () {
      return {
        showmap:'none',
        selinput:"",
        formItem: {
          input: [],
          time:  [],
          textarea: [],
          select:[],
        },
        options: [],
        loading: false,
        timeval:'',
        hours:[],
        minutes:[],
        seconds:[],
        hours1:[],
        minutes1:[],
        seconds1:[],
        disabled:true,
        disabled1:true,
        zuobiao:{},
        str:"",
        bol:false,
        moren:'',
        timebol:false,
        timebol1:false
      }
    },
    components: {Form ,FormItem,Input,Radio,Checkbox,Switch,Select,Option,Slider,DatePicker,TimePicker,Cascader,Transfer,InputNumber,Rate,Upload,Row,Col},
    methods: {
      ruler(val,ruler){
        if(ruler=='phone'){
          this.checkMobile(val)
        }
      },
      checkMobile(str) {
        if(str.substring(0,1)==1){
          var re = /^1\d{10}$/
          if (re.test(str)) {
          } else {
            this.$Notice.warning({
              title: '电话格式不正确!'
            });
            return
          }
        }else if(str.substring(0,1)==0){
          var re = /^0\d{2,3}-?\d{7,8}$/;
          if(re.test(str)){
          }else{
            this.$Notice.warning({
              title: '电话格式不正确!'
            });
            return
          }
        }else{
          var re = /^(\d{7,8})(-(\d{3,}))?$/;
          if(re.test(str)){
          }else{
            this.$Notice.warning({
              title: '电话格式不正确!'
            });
            return
          }
        }
      },
      showmaps(bol){
        if(vm.selinput==' '){
          vm.selinput=''
        }
        if(bol){
          this.showmap='block';
          this.search()
        }
      },
      aaa(item,type){
        if(type=="time1") this.disabled=false
        if(type=="time2") this.disabled1=false
      },
      search(val){
        if(vm.selinput==''){
          vm.selinput=' '
        }
        var map = new AMap.Map("container", {
          resizeEnable: true,
          zoom:36,
          center:vm.$store.state.userInfo.cityLatLng?vm.$store.state.userInfo.cityLatLng.split(','):[116.40717,39.90469]
        });
        map.on('click', function(e) {
          var adress=[e.lnglat.getLng(), e.lnglat.getLat()];
          var mark=  new AMap.Marker({
            map: map,
            position: [e.lnglat.getLng(), e.lnglat.getLat()],
            icon: new AMap.Icon({
              size: new AMap.Size(40, 50),  //图标大小
              image: "http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
            })
          });
          mark.on('click',function(){
            vm.regeocoder(adress)
          })
        });
        AMap.plugin('AMap.PlaceSearch',function(){
          var placeSearch = new AMap.PlaceSearch({
            pageSize:5,
            city:vm.$store.state.userInfo.cityCode,
            type:"商务住宅"
          })
          console.log(val)
          placeSearch.search(val?val:vm.selinput,function(status,data){
            if(JSON.stringify(data) == "{}"&&vm.selinput!=" "){
              vm.str=val?val.substring(0,val.length-1):vm.selinput
              if(vm.str!="") vm.search(vm.str)
            }else if(data.poiList.pois.length==0){
              vm.str=val?val.substring(0,val.length-1):vm.selinput
              if(vm.str!="") vm.search(vm.str)
            }else{
              //vm.str=vm.selinput
              if(status!=='complete')return;
              var pois = data.poiList.pois;
              if(vm.zuobiao.value&&vm.zuobiao.label==vm.selinput){
                var ps=(vm.zuobiao.value).split(",")
                var marker = new AMap.Marker({
                  position:ps,
                  map:map
                })
                marker.on('click',function(){
                  vm.selinput = vm.zuobiao.label;
                  vm.zuobiao.value=vm.zuobiao.value;
                  vm.zuobiao.label=vm.zuobiao.label;
                })
              }else{
                //  for(var i=0;i<1;i+=1){
                var marker = new AMap.Marker({
                  position:pois[0].location,
                  map:map
                })
                var jia=pois[0].location
                /* vm.zuobiao.value=jia.lng+','+jia.lat;
                 vm.zuobiao.label=pois[1].name;*/
                vm.moren=jia.lng+','+jia.lat
                marker.name = pois[0].name;
                marker.on('click',function(){
                  var sum=this.getPosition()
                  vm.selinput = this.name;
                  vm.zuobiao.value=sum.lng+','+sum.lat;
                  vm.zuobiao.label=this.name;
                })
                // }
              }
              map.setFitView();
            }
          })
        });
      },
      regeocoder(lnglatXY) {  //逆地理编码
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress(lnglatXY, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            vm.geocoder_CallBack(result,lnglatXY);
          }
        });
        var marker = new AMap.Marker({  //加点
          map: map,
          position: lnglatXY
        });
        map.setFitView();
      },
      geocoder_CallBack(data,zuobiao) {
        var address = data.regeocode.formattedAddress; //返回地址描述
        vm.selinput = address;
        vm.zuobiao.value=zuobiao[0]+','+zuobiao[1];
        vm.zuobiao.label=address;
      },
      getdituval () {
        vm.zuobiao.label=vm.selinput
        if(vm.zuobiao.value){
          return vm.zuobiao
        }else {
          vm.zuobiao.label=vm.selinput;
          vm.zuobiao.value=vm.moren;
        }
      },
      chooseAddress (data) {
        this.$emit('ditu',data)
      },
      setval(type,val,index){
        switch (type){
          case 'input':{
            this.formItem.input[index]=val;
          }
          case 'textarea':{
            this.formItem.textarea[index]=val;
          }
          case 'time':{
            this.formItem.time[index]=val;
          }
          case 'time3':{
            this.formItem.time[index]=val;
          }
          case 'select':{
            this.formItem.select[index]=val;
          }
          case 'timerange':{
            this.formItem.time[index]=val;
          }
          case 'ditu':{
            this.formItem.select[index]=val;
          }
        }
      },
      chang(val){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var newH=val.substring(0,2);
        if(newH==hour&&this.timebol){
          this.seconds.splice(0,60);
          this.minutes.splice(0,60)
          for(let i=0;i<minute;i++){
            this.minutes.push(i)
          }
        }else{
          this.minutes.splice(0,60)
          this.seconds.splice(0,60)
        }
      },
      chang1(val){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var newH=val.substring(0,2);
        if(newH==hour&&this.timebol1){
          this.seconds1.splice(0,60);
          this.minutes1.splice(0,60)
          for(let i=0;i<minute;i++){
            this.minutes1.push(i)
          }
        }else{
          this.minutes1.splice(0,60)
          this.seconds1.splice(0,60)
        }
      },
      onopenchange(...obj){
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var ttime = new Date(obj[0].val);
        var ttime1 = new Date(obj[0].val1);
        this.timebol=date.toLocaleDateString()==ttime.toLocaleDateString();
        this.timebol1=date.toLocaleDateString()==ttime1.toLocaleDateString();
        if(obj[0].val!=''&&date.toLocaleDateString()==ttime.toLocaleDateString()&&obj[3]=='start'){
          this.hours.splice(0,24)
          this.minutes.splice(0,60)
          this.seconds.splice(0,60)
          for(let i=0;i<hour;i++){
            this.hours.push(i)
          }
          for(let i=0;i<60;i++){
            this.minutes.push(i)
            this.seconds.push(i)
          }
        }else{
          this.hours.splice(0,this.hours.length)
          this.minutes.splice(0,60)
          this.seconds.splice(0,60)
        }
        if(obj[0].val1!=''&&date.toLocaleDateString()==ttime1.toLocaleDateString()&&obj[3]=='end'){
          this.hours1.splice(0,24)
          this.minutes1.splice(0,60)
          this.seconds1.splice(0,60)
          for(let i=0;i<hour;i++){
            this.hours1.push(i)
          }
          for(let i=0;i<60;i++){
            this.minutes1.push(i)
            this.seconds1.push(i)
          }
        }else{
          this.hours1.splice(0,this.hours1.length)
          this.minutes1.splice(0,60)
          this.seconds1.splice(0,60)
        }
      },
      changinput(item,index,val,type){
        if(type=="time"&&val!=""){
          val= this.FormatDate(val,"yyyy-MM-dd HH:mm:ss")
        }
        if(type=="time3"&&val!=""){
          this.timeval= this.FormatDate(val,"yyyy-MM-dd")
        }
        if(type=="timerange"&&val!=""){
          var arr=[]
          for(var i=0;i<val.length;i++){
            arr.push(this.FormatDate(val[i],"yyyy-MM-dd HH:mm:ss"))
          }
          val=arr.join(",");
        }
        this.$eventHub.$emit('changeInput',{item:item,index:index,val:val})
      },
      FormatDate(time,format){
        var t = new Date(time);
        var tf = function(i) {
          return (i < 10 ? "0" :"") + i;
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
          switch (a) {
            case "yyyy":
              return tf(t.getFullYear());
              break;

            case "MM":
              return tf(t.getMonth() + 1);
              break;

            case "mm":
              return tf(t.getMinutes());
              break;

            case "dd":
              return tf(t.getDate());
              break;

            case "HH":
              return tf(t.getHours());
              break;

            case "ss":
              return tf(t.getSeconds());
              break;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .tishi {
    display: -webkit-box;
  }
  .tishi .ivu-select{
    display:block;
    width: auto;
    width: 150px;
  }
  .tishi .ptishi{
    -webkit-box-flex: 1;
    padding-left: 10px;
    color: #999999;
  }
</style>
