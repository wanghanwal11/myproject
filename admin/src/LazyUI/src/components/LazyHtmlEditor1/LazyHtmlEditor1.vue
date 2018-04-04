<template>
  <div @click="xiugaisrc">
    <div style=" position: fixed;left: 496px;right: 201px;z-index: 33" :style="{top:tops}" class="hehe">
  <LazyLayout class="LazyLayout LazyLayout1 txt1" orient="v" align="" justify="" style="height: 74px">
    <div style="height: 36px"  >
      <Tooltip content="撤销"  placement="top">
        <i class="line lineright"></i>
        <Button :disabled="disabled" type="text"  @click="execCommand('undo')"><i class="fa fa-undo"></i></Button>
      </Tooltip>
      <Tooltip content="字号"  class="fonts"   placement="top">
        <div style="width: 65px;background: white;display: inline-block">
          <Select v-model="model8"  style="width:65px;" @on-change="setFontSize">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </Tooltip>
      <Tooltip content="字体类型"  class="fonts"   placement="top" style="margin-left: 8px">
        <div style="width: 85px;background: white;display: inline-block">
          <Select v-model="model9"  style="width:85px;" @on-change="setFontName">
            <Option v-for="item in nameList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
          </Select>
        </div>
      </Tooltip>
      <!--<Tooltip content="横线"  placement="top">-->
        <!--<i class="line"></i>-->
        <!--<Button :disabled="disabled" type="text" @click="execCommand('insertHorizontalRule')"><i class="fa fa-arrows-h"></i></Button>-->
      <!--</Tooltip>-->
      <!--<Tooltip content="删除线"  placement="top">-->
        <!--<Button :disabled="disabled" type="text"  @click="execCommand('strikeThrough')"><i class="fa fa-strikethrough"></i></Button>-->
      <!--</Tooltip>-->
      <Tooltip content="清除格式"  placement="top">
        <i class="line"></i>
        <Button :disabled="disabled" type="text"  @click="execCommand('removeFormat')"><i class="fa fa-eraser"></i></Button>
      </Tooltip>
      <!--<div style="display: inline-block">-->
      <!--<Tooltip content="超链接"  placement="top" >-->
        <!--<Button :disabled="disabled" type="text"  @click.stop="modal('link')"><i class="fa fa-chain"></i><i class="fa fa-caret-down" style=" margin-left: 3px;"></i></Button>-->
      <!--</Tooltip>-->
        <!--<div  style="width: 260px;background: white;position: absolute;z-index: 44;top:41px;  border: 1px solid #ccc;    padding: 10px 5px;border-radius: 5px;" v-if="modals=='link'">-->
          <!--<Form>-->
            <!--<Input type="text"  v-model="url" placeholder="添加超链接" style="width: 200px"></Input>-->
            <!--<Button @click.stop="createLink">确定</Button>-->
          <!--</Form>-->
        <!--</div>-->
      <!--</div>-->
      <!--<Tooltip content="移除超链接"  placement="top">-->
        <!--<Button :disabled="disabled" type="text"  @click="execCommand('unlink')"><i class="fa fa-chain-broken"></i></Button>-->
      <!--</Tooltip>-->
      <div v-if="huodong" style="display: inline-block">
        <!--<Tooltip content="模板"  placement="top">-->
          <!--<i class="line"></i>-->
          <!--<Button :disabled="disabled" type="text" icon="grid"  @click="execCommand('moban')"></Button>-->
        <!--</Tooltip>-->
        <!--<Tooltip content="样式"  placement="top">-->
          <!--<Button :disabled="disabled" type="text" icon="ios-list"  @click="execCommand('yangshi')"></Button>-->
        <!--</Tooltip>-->
        <Tooltip content="图片"  placement="top">
          <Button :disabled="disabled" type="text" icon="image"  @click="execCommand('tupian')"></Button>
        </Tooltip>
      </div>
    </div>
    <LazyLayout class="toolbar" >
      <div >
      <Tooltip content="加粗"  placement="top">
        <Button :disabled="disabled" type="text"  @click="execCommand('bold')"><i class="fa fa-bold"></i></Button>
      </Tooltip>
      <Tooltip content="倾斜"  placement="top">
        <Button :disabled="disabled" type="text"   @click="execCommand('italic')"><i class="fa fa-italic"></i></Button>
      </Tooltip>
      <Tooltip content="下划线"  placement="top">
        <Button :disabled="disabled" type="text"   @click="execCommand('underline')"><i class="fa fa-underline"></i></Button>
      </Tooltip>
        <div style="display: inline-block">
      <Tooltip content="颜色"  placement="top" >
        <Button :disabled="disabled" type="text"   @click.stop="modal('color')"><i class="fa fa-font"></i><i class="fa fa-caret-down" style=" margin-left: 2px;"></i></Button>
      </Tooltip>
          <div  style="width: 200px;background: white;position: absolute;z-index: 44;top: 41px;    border: 1px solid #ccc;border-radius: 5px;padding: 7px" v-if="modals=='color'" @mousemove.stop>
            <div v-for="color in colors" :style="{'background-color':color}" style="width: 20px;height: 20px;float: left;margin: 3px"
                 @click="changeColor(color)">
            </div>
          </div>
        </div>
      <Tooltip content="左对齐"  placement="top">
        <i class="line"></i>
        <Button :disabled="disabled" type="text"  @click="execCommand('justifyLeft')"><i class="fa fa-align-left"></i></Button>
      </Tooltip>
      <Tooltip content="居中"  placement="top">
        <Button :disabled="disabled" type="text"  @click="execCommand('justifyCenter')"><i class="fa fa-align-center"></i></Button>
      </Tooltip>
      <Tooltip content="右对齐"  placement="top">
        <Button :disabled="disabled" type="text"   @click="execCommand('justifyRight')"><i class="fa fa-align-right"></i></Button>
      </Tooltip>
        <div style="display: inline-block">
      <!--<Tooltip content="表格"  placement="top" >-->
        <!--<i class="line"></i>-->
        <!--<Button :disabled="disabled" type="text"  @click.stop="modal('table')"><i class="fa fa-table"></i><i class="fa fa-caret-down" style=" margin-left: 5px;"></i></Button>-->
      <!--</Tooltip>-->
          <Tooltip content="上标"  placement="top">
            <Button :disabled="disabled" type="text"   @click="execCommand('superscript')"><i class="fa fa-superscript"></i></Button>
          </Tooltip>
          <Tooltip content="下标"  placement="top">
            <Button :disabled="disabled" type="text"   @click="execCommand('subscript')"><i class="fa fa-subscript"></i></Button>
          </Tooltip>
          <div style="width: 185px;background: white;position: absolute;z-index: 44;top: 41px;    border: 1px solid #ccc;    padding: 10px 5px;border-radius: 5px;" v-if="modals=='table'">
            <Form>
              <Input type="text" number style="width: 60px" maxlength="1"  v-model="rows"></Input>
              <Input type="text" number style="width: 60px" maxlength="1"   v-model="cols"></Input>
              <Button @click="insertTable">确定</Button>
            </Form>
          </div>
        </div>
      <!--<Tooltip content="全屏">-->
        <!--<Button :disabled="disabled" type="text" icon="arrow-expand" shape="circle" @click="toggleFullScreen()"></Button>-->
      <!--</Tooltip>-->
      <!--<Tooltip content="图片">-->
        <!--<Button :disabled="disabled" type="text" icon="image" shape="circle" @click="addImage('url')"></Button>-->
      <!--</Tooltip>-->
      </div>
    </LazyLayout>
  </LazyLayout>
    </div>
  <LazyLayout orient="v" class="contentLazyLayout" >
    <!--<div class="div" >-->
      <!--<Input @focus="disabled=true" maxlength="64"  @on-change="inputChange" v-model="titleInputValue" type="text" autofocus="true" :placeholder="placeholdertitle" class="titleInput"></Input>-->
      <!--<span style="position: absolute;right: 20px;top: 80px;font-size: 14px;color: #aaa">{{titleInputValue.length}}/64</span>-->
    <!--</div>-->
    <div class="div div1">
      <Input @focus="disabled=true"  @on-change="inputChange" v-model="authorInputValue" type="text"  :placeholder="placeholderarcher" class="authorInput"></Input>
    </div>
    <div @contextmenu.prevent="show1($event)">
    <editor @focus="" class="editor" :content="content" :height="50" :show-module-name="showModuleName"
            @change="updateData" ref="editor" ></editor>
    </div>
    <div style="position: absolute;background:#ccc;z-index: 500;padding: 5px;border-radius: 5px;" :style="{top:layerY,left:layerX}" v-if="showphotobj">
    <Button @click="tihuan">替换</Button>  <Button  @click="juzhong('left')">左对齐</Button> <Button  @click="juzhong('center')">居中</Button> <Button  @click="juzhong('right')">右对齐</Button>
  </div>
    <div style="position: absolute;background:#ccc;z-index: 500;padding: 5px;border-radius: 5px;" :style="{top:layerY,left:layerX}" v-if="showyangshi">
      <Button @click="delect">删除</Button><Button @click="qian">前插入一行</Button><Button @click="hou">后插入一行</Button>
    </div>
    <div style="position: absolute;background:#ccc;z-index: 500;padding: 5px;border-radius: 5px;" :style="{top:layerY,left:layerX}" v-if="youjian">
      <Button @click="resault">清空</Button><br>
      <Button @click="execCommand('undo')">上一步</Button>
      <!--<Button @click="copy">复制</Button>-->
      <!--<Button @click="caste">粘贴</Button>-->
    </div>
  </LazyLayout>
    <!--<Affix :offset-bottom="0">-->
    <!--<div class="shouqi">-->
      <!--<div class="shang" :style="{backgroundImage:'url('+point.shang+')'}" @click="point1">-->
        <!--{{point.name}}-->
      <!--</div>-->
    <!--</div>-->
    <!--</Affix>-->
  </div>
</template>

<script>
    import VueHtml5Editor from 'vue-html5-editor'
    import Affix from 'iview/src/components/affix'
    import Tooltip from 'iview/src/components/tooltip'
    import {Input,Select,Form,Option} from 'iview'
    import Button from 'iview/src/components/button'
    const editor = new VueHtml5Editor({
      showModuleName: true,
      image: {
        sizeLimit: 512 * 1024,
        compress: true,
        width: 500,
        height: 500,
        quality: 80
      },
      language: "zh-cn",
      i18n: {
        //specify your language here
        "zh-cn": {
          "align": "对齐方式",
          "image": "图片",
          "list": "列表",
          "link": "链接",
          "unlink": "去除链接",
          "table": "表格",
          "font": "文字",
          "full screen": "全屏",
          "text": "排版",
          "eraser": "格式清除",
          "info": "关于",
          "color": "颜色",
          "please enter a url": "请输入地址",
          "create link": "创建链接",
          "bold": "加粗",
          "italic": "倾斜",
          "underline": "下划线",
          "strike through": "删除线",
          "subscript": "上标",
          "superscript": "下标",
          "heading": "标题",
          "font name": "字体",
          "font size": "文字大小",
          "left justify": "左对齐",
          "center justify": "居中",
          "right justify": "右对齐",
          "ordered list": "有序列表",
          "unordered list": "无序列表",
          "fore color": "前景色",
          "background color": "背景色",
          "row count": "行数",
          "column count": "列数",
          "save": "确定",
          "upload": "上传",
          "progress": "进度",
          "unknown": "未知",
          "please wait": "请稍等",
          "error": "错误",
          "abort": "中断",
          "reset": "重置"
        }
      }
    })
    var vm
    import shang from '../../../static/images/shang.png'
    import xia from '../../../static/images/xia.png'
    export default {
        created() {
          vm = this
        },
        mounted() {
          this.$refs.editor.$el.getElementsByClassName('content')[0].style.borderBottom="1px solid #e7e7eb"
          this.$refs.editor.$el.getElementsByClassName('toolbar')[0].getElementsByTagName('ul')[0].style.display = 'none';
          /*this.$refs.editor.$el.getElementsByClassName('content')[0].onfocus = function() {
            vm.disabled = false;
            if(vm.point.bol=="zk"){
              vm.point.bol=="zk"
              vm.point1()
            }
          }*/
          this.$refs.editor.$el.getElementsByClassName('content')[0].setAttribute('placeholder',this.placeholdcontent)
          window.addEventListener('click',function(){
            vm.youjian=false;
          })
          document.onmousedown =function(e) {
            if (e.button == 2) {
              vm.youjian = false
            }
          }
          /*window.addEventListener('copy',this.copy)*/
        },
        props:{
          tops:{
              type:String,
              default:"120px"
          },
          placeholdertitle:{
            type:String,
            default:"请在这里输入标题"
          },
          placeholderarcher:{
            type:String,
            default:"请输入作者"
          },
          placeholdcontent:{
            type:String,
            default:"请输入内容"
          },
          classes:{
              type:String,
              default:"init"
          },
          huodong:{
            type:Boolean,
            default:false
          }
        },
        data () {
            return {
              model8:'16',
              model9:'微软雅黑',
              cityList: [{value: '16', label: '16px'},{value: '18', label: '18px'},{value: '24', label: '24px'},{value: '36', label: '36px'},{value: '48', label: '48px'},{value: '72', label: '72px'}],
              nameList: [{value: '微软雅黑', label: '微软雅黑'},{value: '宋体', label: '宋体'},{value: 'Arial', label: 'Arial'},{value: 'sans-serif', label: 'sans-serif'},{value: 'Impact', label: 'Impact'},{value: 'Consolas', label: 'Consolas'}],
              url: null,
              rows: 2,
              cols: 2,
              hasHead: false,
              striped: false,
              hover: false,
              command: 'foreColor',
              colors: [
                '#000000', '#000033', '#000066', '#000099', '#003300', '#003333', '#003366',
                '#003399', '#006600', '#006633', '#009900', '#330000', '#330033', '#330066',
                '#333300', '#333366', '#660000', '#660033', '#663300', '#666600', '#666633',
                '#666666', '#666699', '#990000', '#990033', '#9900CC', '#996600', '#FFCC00',
                '#FFCCCC', '#FFCC99', '#FFFF00', '#FF9900', '#CCFFCC', '#CCFFFF', '#CCFF99'
              ],
              layerX:0,
              layerY:0,
              el:'',
              txt:'',
              modals:'',
              showphotobj:false,
              showyangshi:false,
              youjian:false,
              disabled : false,
              showModuleName: false,
              titleInputValue:"",
              authorInputValue:"",
              content:"",
              point:{
                  shang:xia,
                  name:"展开内容",
                  bol:"zk"
              },
              huodonglist:{
                  "moban":0,
                  "yangshi":1,
                  "tupian":2
              }
            }
        },
        components : {editor,Tooltip,Button,Affix,Input,Select,Form,Option},
        methods : {
          setFontName(){
            this.execCommand('fontName', this.model9)
          },
          setFontSize(){
            this.execCommand('fontSize', this.model8+'px')
          },
          createLink(){
            if (!this.url) {
              return
            }
            this.execCommand('createLink', this.url)
            this.url = null
            this.modals="";
          },
          insertTable(){
            if (this.rows < 2 || this.rows > 10) {
              return
            }
            if (this.cols < 2 || this.cols > 10) {
              return
            }
            let table = '<table style="border-spacing: 0px; border-collapse: collapse; width: 100%; max-width: 100%; margin-bottom: 0px; border: 1px solid rgb(221, 221, 221); color: rgb(51, 51, 51); font-size: 14px; line-height: 20px; background-color: transparent;"><tbody>'
            for (let i = 0; i < this.rows; i++) {
              table += '<tr>'
              for (let j = 0; j < this.cols; j++) {
                table += '<td style="padding: 8px; line-height: 1.42857; vertical-align: top; border: 1px solid rgb(221, 221, 221);">&nbsp;</td>'
              }
              table += '</tr>'
            }
            table += '</tbody></table>'
            this.execCommand('insertHTML', table)
            this.modals="";
          },
          modal(index){
              if(index!=this.modals){
                this.modals=index;
              }else{
                this.modals="";
              }
          },
          changeColor(color){
            this.execCommand(this.command, color);
            this.modals='';
          },
          xiugaisrc(){
              var el=event.target;
              var content=document.getElementsByClassName('content')[0];
              if(el.src){
                if(this.el.src&&this.el.src!=el.src){
                  this.el.style.border='none';
                }
                this.el=el;
                console.log(event)
                el.style.border='3px solid #ffb400';
                this.layerX=(event.layerX+50)+"px";
                this.layerY=(event.layerY+130)+"px";
                this.showphotobj=true
              }else{
                if(this.el.src){
                  this.el.style.border='none';
                }
                this.showphotobj=false
              }
              if(el.getAttribute("type")=='yangshidiv'){
                event.stopPropagation();
                  /*if(this.el){
                    if(this.el.getAttribute("type")&&this.el.getAttribute("type")!=el.getAttribute("type")){
                      this.el.className='';
                    }
                  }*/
                this.el=el;
               // this.el.className='border';
                this.layerX=(event.layerX+50)+"px";
                this.layerY=(event.layerY+130)+"px";
                this.showyangshi=true
              }else{
                /*if(this.el.getAttribute("type")){
                  this.el.className='';
                }*/
                this.showyangshi=false
              }

          },
          juzhong(pos){
              this.el.style.display='block';
              switch (pos){
                case 'left':   this.el.style.margin='auto 0';break;
                case 'center':   this.el.style.margin='0 auto';break;
                case 'right':   this.el.style.margin=' auto 0 auto auto';break;
              }
          },
          tihuan(){
            this.$emit('xiugaisrc',this.el);
          },
          delect(){
              this.el.remove();
          },
          qian(){
            this.el.insertAdjacentHTML('beforebegin','<br>')
          },
          hou(){
            this.el.insertAdjacentHTML('afterEnd','<br>')
          },
          show1(event){
            this.layerX=(event.layerX+50)+"px";
            this.layerY=(event.layerY+130)+"px";
            this.youjian=true
          },
          resault(){
            this.content="";
            this.updateData('')
          },
         /* copy(e){
            var txt=''
            txt = window.getSelection();
            alert(txt)
            if (txt.toString().length > 1) {
              txt=txt.toString()
            }
            this.txt=txt
            document.execCommand('copy')
          },
          caste(){
            document.execCommand('paste')
            this.execCommand('insertHTML',this.txt)
          },*/
          point1(){
              if(this.point.bol=="zk"){
                this.point.shang=shang;
                this.point.name="收起内容";
                this.point.bol="sq";
              }else{
                this.point.shang=xia;
                this.point.name="展开内容";
                this.point.bol="zk";
              }
            this.$emit('point1',this.point);
          },
          inputChange() {
            this.$emit('change',[this.titleInputValue, this.authorInputValue, this.content]);
          },
          updateData (str) {
            this.content = str;
            this.$emit('change',[this.titleInputValue, this.authorInputValue, this.content]);
          },
          toggleDashboard(a) {
            this.$refs.editor.toggleDashboard('dashboard-'+a);
          },
          toggleFullScreen() {
            this.$refs.editor.toggleFullScreen();
          },
          execCommand(...obj) {
            if (obj.length == 1)
              this.$refs.editor.execCommand(obj[0]);
            else if (obj.length == 2)
              this.$refs.editor.execCommand(obj[0], obj[1]);
            if(this.huodong){
              this.$emit('huodong',this.huodonglist[obj[0]]);
            }
          },
          addImage(url){
            this.execCommand('insertImage',url)
          },
          insertHTML(html){
            this.execCommand('insertHTML',html)
          },
          remove(bol){
            if(bol==true){
              this.content="";
            }else{
              this.content=bol;
            }
          },
          addtitle(arr){
            this.titleInputValue=arr[0]
            this.authorInputValue=arr[1]
          },
          getval(){
                 this.content=this.$refs.editor.$el.getElementsByClassName('content')[0].innerHTML
                 return [this.titleInputValue, this.authorInputValue,this.content]
          }

        }
    }
</script>

<style scoped>
  .line{
    display: inline-block;
    border-left: 1px solid #ddd;
    height: 17px;
    margin-top: 7px;
    position: absolute;
    top: 0;
  }
  .lineright{
    right: 0;
  }
  .ivu-btn{
    padding: 6px 9px;
  }
  .LazyLayout {
    background-color: #fff;
  }
  .LazyLayout1{
    border-bottom: 1px solid #e7e7eb;
  }
  .init{
    height: 200px;
    overflow: hidden;
  }
  .init1{
    min-height: 650px;
    height: auto;
  }
  .contentLazyLayout {
    padding: 50px 50px 0px 50px;
    overflow: hidden;
    border: 1px solid #e7e7eb;
    border-bottom: none;
  }
  .titleInput {
    font-size: 22px;
    height: 46px;
    line-height: 46px;
    width: 100%;
    border: none;
    background: none;
  }
  .div{
    padding:10px 10px;
  }
  .shouqi{
    width: 100%;
    text-align: center;
    border: 1px solid #e7e7eb;
    border-top: 0px;
    background: white;
  }
  .authorInput{
    margin: 30px 0 ;
    height: 22px;
    line-height: 22px;
    width: 100%;
    border: none;
    background: none;
  }
  .vue-html5-editor{
    border: none;
    border-radius: 0px;
    overflow: initial;

  }
  .editor{
    z-index: 0!important;
    position: relative;
    text-align: justify;
    padding-bottom: 50px;

  }
  .content{
    border-bottom: 1px solid red;
  }
  .txt1{
    border-top: 1px solid #e7e7eb;
    border-left: 1px solid #e7e7eb;
  }
  .toolbar{
    z-index: 0!important;
  }
  .shang{
    width: 100px;
    height: 25px;
    margin: 0 auto;
    line-height: 25px;
    background-repeat: no-repeat;
    background-position-x: 8px;
    background-position-y: 5px;
  }
  .shang:hover{
    cursor: pointer;
  }
  .ivu-select{
    width: 65px;
    height: 28px;
  }
</style>
