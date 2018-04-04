/**
* Created by bk on 2017/4/17.
*/
<template>
    <div class="article">
        <Affix :offset-top="45">
                <LazyTopbar :data="json"></LazyTopbar> 
        </Affix>
        <div class="content" style="margin:0 100px;">
    	<div class="Ititle">标题：　　　　<Input v-model="title" placeholder="请输入..." style="width: 300px"></Input><span :class="{hide: flag1}"></span></div>
    	<div class="Ititle">作者：　　　　<Input v-model="author" placeholder="请输入..." style="width: 300px"></Input><span :class="{hide: flag2}"></span></div>
    	内容：　　
    	　　
        <!-- bidirectional data binding��˫����ݰ󶨣� -->
        <div id="editorBox">
        	<quill-editor v-model="content"
	                  ref="myQuillEditor"
	                  :config="editorOption">
    		</quill-editor>
    		<span style="line-height: 30px;" :class="{hide: flag3}"></span>
        </div>
        <div class="Ititle">标题图：　　　
    		<a href="javascript:;" class="a-upload">
			    <input type="file" accept="image/*" name="" id="file" @change="imgChange">从本地上传
			    <div class="firstBox" :class="{hide: firstflag}"><img  style="width: 100%;height: 0;padding-top: 56.25%;background-size: cover;background-position: center;background-repeat: no-repeat;" v-bind:style="{backgroundImage:'url('+firstPath+')'}"></div>
			</a>
			<Button type="ghost" @click="firstImg">在文章中选取</Button><span style="margin-left: 222px;" :class="{hide: flag4}"></span>
    	</div>
        <Button type="success" @click="submit" long style="width:800px; margin-top: 60px;margin-left: 86px;">确认提交</Button>
        </div>
    </div>
</template>
<script type="es6">
	var vm;
    import Input from 'iview/src/components/input'
    import Button from 'iview/src/components/button'
    import Affix from 'iview/src/components/affix'



    export default {
        name: 'confFiles',
        data () {
            return {
            	title:'',
            	author:'',
                content: '',
                id: '',
                firstPath:'',
                editorOption: {
                    // some quill options
                },
                firstflag:true,
                flag1:true,
                flag2:true,
                flag3:true,
                flag4:true,
                json:{
                    title:"文章详情",
                    left:[{
                          type : 'Button',
                          svg : '#icon-fanhui',
                          buttontype : 'text',
                          onclick : function() {
                              window.history.go(-1);
                          }
                    }]
                }
            }
        },
        components:{
            Input,
            Button,
            Affix
        },
        created: function() {
        	vm = this;
            //this.content = '<p><img src="http://webapplayers.com/inspinia_admin-v2.6.2.1/img/profile_small.jpg"></p>';
        },
        // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
        // �����Ҫ�ֶ��������ͬ�����������Ҫ��ʽ�ش���changed�¼�
        methods: {
        	submit(editor) {
                this.$lazy.data.list = true;
        		console.log(this.title,this.author,this.content);
                console.log(this.editor);
                var vm = this;
                if(!vm.title){
                	vm.flag1 = false;
                	return
                }else{
                	vm.flag1 = true;
                }
                if(!vm.author){
                	vm.flag2 = false;
                	return
                }else{
                	vm.flag2 = true;
                }
                if(!vm.content){
                	vm.flag3 = false;
                	return
                }else{
                	vm.flag3 = true;
                }
                var url = vm.$store.state.serverHost + 'cmy/article/cmyarticle/save';
                this.$http.post(url, this.qs.stringify({
                	def3: this.$store.state.userInfo.streetorcommunityid,
                    def6: this.$store.state.userInfo.streetorcommunity,
                    articletitle: this.title,
                    articleauthor: this.author,
                    articlecontent: this.content,
                    def1: vm.firstPath,
                    id: this.id
                }))
                        .then(function (response) {
                            console.log(response);
                            window.history.go(-1);
                            //vm.$router.push('/list');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
			imgChange: function (e) {
				console.log(e);
				this.maskFlag = false;
				var file = e.target.files || e.dataTransfer.files;
				console.log(e.target.value);
				console.log(file);
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
						console.log(e.target.result);
						vm.src = e.target.result;
						vm.upload();
					};
				}
			},
			upload () {
				var fileObj = document.getElementById("file").files[0];
				var form = new FormData();
				form.append("file", fileObj);
				//form.append("id",id);
				var vm  = this;
				var url = this.$store.state.serverHost + 'base/base/oss/upload';
				this.$http.post(url, form)
						.then(function (response) {
							debugger
							vm.firstPath = response.data.filepath;
							vm.firstflag = false;
						})
						.catch(function (error) {
							console.log(error);
						});
			},
			firstImg(){
				var firstimg = document.querySelectorAll('.ql-editor img')[0];
				debugger
				if(!firstimg){
					vm.flag4 = false;
					vm.firstflag = true;
					return
				}
				vm.flag4 = true;
				vm.firstPath = firstimg.getAttribute('src');
				vm.firstflag = false;
			}
        },
        // get the current quill instace object.
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        mounted() {
            // you can use current editor object to do something(quill methods)
            console.log('this is current quill instance object', this.editor)
            this.author = this.$store.state.article.articleauthor;
            this.title = this.$store.state.article.articletitle;
            this.content = this.$store.state.article.articlecontent;
            this.id = this.$store.state.article.id;
            this.firstPath = this.$store.state.article.def1;
            this.firstflag = false;

            this.$store.commit('updateAuthor', '');
            this.$store.commit('updateTitle', '');
            this.$store.commit('updateContent', '');
            this.$store.commit('updateId', 0);
        }
    }

</script>
<style scoped>
	.article{
		width: 100%;
		height: 100% ;
		//padding: 50px 100px;
	}
	.Ititle{
		margin: 50px 0px;
	}
	.Ititle span{
		margin-left: 20px;
		color: red;
	}
	#editorBox{
		width: 800px;
		height: 300px;
		padding-bottom: 66px;
		margin-left: 86px;
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
.firstBox{
	width: 188px;
    height: 122px;
    position: absolute;
    top: 0;
    left: 228px;
}
</style>
 