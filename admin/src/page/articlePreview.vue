/**
* Created by bk on 2017/5/17.
*/
<template>
    <div class="articlePreview" style="height: 100%">
        <LazyTopbar :data="json"  style="position:fixed;top:0px;left:0;right:0;z-index:1;padding-left:235px;"></LazyTopbar>
        <!--<div class="collectBtn" @click="collectArticle">收藏</div>-->
        <loading v-if="isLoading"></loading>
        <div v-else class="infoBox">
            <div class="title">
                <h1>{{ infoTitle }}</h1>
                <div class="time">
                    <span class="original" v-if="isOriginal">原创</span>
                    <span>{{ time }}</span>
                </div>
                <p class="jianjie">{{ summary }}</p>
            </div>
            <div v-if="infoPic" class="picBox" :style="{backgroundImage:'url('+infoPic+')'}"></div>
            <div class="footer articlePreview">
                <p v-html="content"></p>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    var vm;
    import loading from '../components/loading'
    export default {
        name: 'articlePreview',
        data (){
            return {
                //json : {
                //    title : "预览"
                //},
                href: "",
                infoPic : "",
                infoTitle : "",
                time : "",
                contact : "",
                content:"",
                summary : "",
                url: '',
                list: [],
                localList: [],
                author: '',
                json:{
                    title:"预览",
                    right:[
                        {
                            type : 'Button',
                            label : '收藏',
                            size:'small',
                            loading:false,
                            buttontype : 'primary',
                            onclick : function() {
                                vm.json.right[0].loading = true;
                                vm.collectArticle();
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
                isOriginal: false,
                isLoading: true
            }
        },
        components: {
            loading
        },

        created: function(){
            vm = this;
            //this.url = this.$store.state.serverHost + 'base/base/oss/upload';
            this.url =  'http://www.shequhao.cn/base/base/oss/upload';
            this.href = this.$router.history.current.query.href;
            debugger;
            console.log(this.href);
            this.getArticle();
        },

        methods:{
            getArticle () {
                debugger;
                var url =  this.$lazy.url.nodeWebSpiders + 'getWeixinContent';
                this.$http.get(url, {
                    params: {
                        href: this.href
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.isLoading = false;
                            var obj = response.data.rows[0];
                            vm.list = obj.list;
                            vm.localList = obj.localList;
                            vm.infoTitle = obj.title;
                            vm.time = obj.time;
                            vm.content = obj.content;
                            vm.author = obj.user;
                            vm.isOriginal = obj.bol;
                            //将封面图放到list和localList里面
                            if(vm.$lazy.data.coverImg){
                                vm.list.push(vm.$lazy.data.coverImg);
                                vm.localList.push(vm.$lazy.data.coverImg);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            collectArticle () {
                debugger;
                if(this.isOriginal){
                    this.$Message.info('原创文章不可收藏!');
                    vm.json.right[0].loading = false;
                    return;
                }
                var url =  this.$lazy.url.nodeWebSpiders + 'upload';
                this.$http.get(url, {
                    params: {
                        list: JSON.stringify(this.list),
                        localList: JSON.stringify(this.localList),
                        url: this.url
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response);
                            if(response.data.success) {
                                var arr = response.data.rows;
                                for(var i = 0; i < arr.length; i++) {
                                    vm.content = vm.content.replace(arr[i].href, arr[i].newHref).replace(arr[i].localHref, arr[i].newHref);
                                }
                                vm.collect(arr[arr.length - 1].newHref);
                            } else {
                                vm.json.right[0].loading = false;
                                vm.$Message.info(response.data.message);
                            }
                        })
                        .catch(function (error) {
                            vm.json.right[0].loading = false;
                            console.log(error);
                        });
            },
            collect (coverImg) {
                if(!localStorage.initid) {
                    vm.$Message.warning('请先绑定微信号');
                    return;
                }
                //var title = article.title.replace(/\<em\>\<!--red_beg--\>(.*?)\<!--red_end--\>\<\/em\>/,'$1');
                var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/save';
                this.$http.post(url, this.qs.stringify({
                    def3: this.$store.state.userInfo.streetorcommunityid,
                    def6: this.$store.state.userInfo.streetorcommunity,
                    def7: localStorage.initid,
                    articletitle: this.infoTitle,
                    articleauthor: this.author,
                    articlecontent: this.content,
                    def1: coverImg,
                    def8: this.$lazy.data.href,
                    id: 0
                }))
                        .then(function (response) {
                            debugger;
                            vm.json.right[0].loading = false;
                            console.log(response);
                            if(response.data.isSucceed) {
                                //vm.$Message.info('保存成功!');
                                vm.$lazy.data.list = true;
                                vm.$router.push('/articleList');
                            } else {
                                vm.$Message.info(response.data.message);
                            }

                        })
                        .catch(function (error) {
                            vm.json.right[0].loading = false;
                            console.log(error);
                        });
            }
        }
    }

</script>
<style scoped>
    .infoBox{
        width:670px;
        height:auto;
        margin:0 auto;
        padding-top:65px;
    }
    .time{
        font-size: 16px;
        padding-top:20px;
        color:#999999;
    }
    .original {
        display: inline-block;
        padding: 1px .5em;
        border: 1px solid #9e9e9e;
        border-top-left-radius: 20% 50%;
        -moz-border-radius-topleft: 20% 50%;
        -webkit-border-top-left-radius: 20% 50%;
        border-top-right-radius: 20% 50%;
        -moz-border-radius-topright: 20% 50%;
        -webkit-border-top-right-radius: 20% 50%;
        border-bottom-left-radius: 20% 50%;
        -moz-border-radius-bottomleft: 20% 50%;
        -webkit-border-bottom-left-radius: 20% 50%;
        border-bottom-right-radius: 20% 50%;
        -moz-border-radius-bottomright: 20% 50%;
        -webkit-border-bottom-right-radius: 20% 50%;
        font-size: 15px;
        line-height: 1.1;
    }
    .jianjie{
        padding-top:41px;
        font-size:20px;
    }
    .footer{
        margin-top:50px;
    }

    .picBox{
        width:670px;
        height:370px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-top:50px;
    }
    .collectBtn {
        float: right;
        width: 65px;
        border: 1px solid #3c7ce6;
        color: #3c7ce6;
        border-radius: 3px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    }
</style>
 