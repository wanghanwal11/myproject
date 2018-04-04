/**
* Created by bk on 2017/3/28.
*/
<template>
    <div class="header">
	    <span class="title">
	      <!--{{$store.state.pageTitle}}-->
	    </span>
		<div class="rBox">

			<div class="personInfo">
	            <img v-if="this.$store.state.headpicurl" :src="this.$store.state.headpicurl">
	            <img v-else src="../assets/images/moren.png">
	            <div class="person">
	                <!--<div class="mation" @click="router('personal')">个人信息</div>-->
	                <div class="out" @click="exit">退出</div>
	            </div>
	        </div>
            
                <div class="msg">
                    <Poptip trigger="hover"  placement="bottom-end">
                       <svg class="search-icon" aria-hidden="true" style="fill:#6b6b6b;">
                            <use xlink:href="#icon-kefu"></use>
                       </svg> 
                        <div class="api" slot="content">
                            <p style="text-align:center;font-weight:bolder;">联系客服</p>
                            <img style="width: 150px;height: 150px;" src="../assets/images/kefu.jpg">
                        </div>
                    </Poptip>
                </div>
	        <!--<div class="searchBox">-->
				<!--<input class="seach" placeholder="搜索..." type="text" />-->
				<!--&lt;!&ndash;<div class="search-icon"></div>&ndash;&gt;-->
				<!--<svg class="search-icon" aria-hidden="true">-->
                    <!--<use xlink:href="#icon-fangdajing"></use>-->
                <!--</svg>-->
			<!--</div>-->
            <!--下一版的功能-->
            <div class="sendArticleBox">
                <Poptip placement="bottom-start" width="400" trigger="hover">
                    <Badge :count="articleList.length"><Button type="ghost" shape="circle" icon="paper-airplane"></Button></Badge>
                    <div class="sendList" slot="content">
                        <div class="sendItems" v-show="articleList.length > 0">
                            <div class="searchItems" v-for="(article,key) in articleList">
                                <Row :gutter="10">
                                    <Col span="10">
                                    <div style="display:flex;align-items:center;height: 100px">
                                        <div class="articlePic" :style="{backgroundImage:'url('+article.imgPath+')'}"></div>
                                    </div>
                                    </Col>
                                    <Col span="14">
                                    <div class="articleInfo">
                                        <div class="articleTitle">
                                            <div style="-webkit-line-clamp: 2;display: -webkit-box;overflow: hidden; -webkit-box-orient: vertical;white-space: pre-wrap;">{{article.title}}</div>
                                        </div>
                                        <div class="articleGroup">
                                            <svg class="articleGroup-icon" aria-hidden="true">
                                                <use xlink:href="#icon-biaoqian1"></use>
                                            </svg>
                                            <span style="margin-left: 25px" v-if="article.type === 'cmyarticle'">文章</span>
                                            <span style="margin-left: 25px" v-else>活动</span>
                                            <svg class="articleDel-icon" aria-hidden="true" @click="delSendArticle(key)">
                                                <use xlink:href="#icon-weibiaoti106"></use>
                                            </svg>
                                        </div>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div v-show="articleList.length == 0" style="width: 100%;height: 350px;color: #5498c8;display: flex;justify-content: center;align-items: center">没有要推送的文章</div>
                        <div class="header-searchMore" @click="router('articleSend')">
                            查看更多
                        </div>
                    </div>
                </Poptip>
            </div>
		</div>
    </div>
</template>

<script type="es6">
    var vm;
    import Poptip from 'iview/src/components/poptip'
    import Button from 'iview/src/components/button'
    import {Row,Col} from 'iview/src/components/grid'
    import Badge from 'iview/src/components/badge'
    import defaultPic from '../assets/images/bili.jpg'
    export default {
        name: 'header',
        data () {
        return {
            title: '维拓云',
            searchValue: "",
            articleList: []
        }
    },
    components:{
        Poptip,
        Button,
        Row,
        Col,
        Badge
    },
    computed: {
        isUpdateSend() {
            return this.$store.state.article.sendArticle;
        }
    },
    watch: {
        isUpdateSend(curVal, oldVal) {
            //从localStorage中取值
            this.articleList = JSON.parse(localStorage.sendItems);
        }
    },
    created: function(){
        vm = this;
        //this.getSeanArticle();
        var sendItems;
        try {
            this.articleList = JSON.parse(localStorage.sendItems);
        } catch (e) {
            this.articleList = [];
            localStorage.sendItems = JSON.stringify(this.articleList);
        }
        //this.articleList = JSON.parse(localStorage.sendItems);
    },
    methods: {
        showSideBar: function(event){
            this.$store.commit('toggleSideBar')
        },
        router: function(name) {
            this.$router.push(name);
        },
        exit: function() {
            this.$router.push('/');
            //退出时清除localStorage
            localStorage.removeItem('initid');
            localStorage.removeItem('streetorcommunity');
            localStorage.removeItem('streetorcommunityid');
            localStorage.removeItem('token');
            localStorage.removeItem('uid');
            localStorage.removeItem('headpicurl');
            localStorage.removeItem('sendItems');
        },
        delSendArticle (index) {
            debugger;
            this.articleList.splice(index, 1);
            localStorage.sendItems = JSON.stringify(this.articleList);
            var dStr = new Date().getTime();
            this.$store.commit('updateSendArticle', dStr);
            //if(this.articleList[index].id !== this.articleList[index].comeid){
            //    var url =  this.$lazy.url.host + '/cmy/article/cmysendcart/del';
            //    this.$http.get(url, {
            //        params: {
            //            id: this.articleList[index].id
            //        }
            //    })
            //            .then(function (response) {
            //                debugger;
            //                if(response.data.isSucceed){
            //                    vm.articleList.splice(index, 1);
            //                    localStorage.sendItems = JSON.stringify(vm.articleList);
            //                    var dStr = new Date().getTime();
            //                    vm.$store.commit('updateSendArticle', dStr);
            //                } else {
            //                    vm.$Message.info(response.data.message);
            //                }
            //            })
            //            .catch(function (error) {
            //                console.log(error);
            //            });
            //} else {
            //    this.articleList.splice(index, 1);
            //    localStorage.sendItems = JSON.stringify(this.articleList);
            //    var dStr = new Date().getTime();
            //    this.$store.commit('updateSendArticle', dStr);
            //}
        },
        getSeanArticle () {
            var url = this.$lazy.url.host + '/cmy/article/cmysendcart/list';
            this.$http.get(url, {
                params: {
                    initid: this.$store.state.communityDetail.initid,
                    communityid: this.$store.state.userInfo.streetorcommunityid,
                    communitytype: this.$store.state.userInfo.streetorcommunity,
                    issend: 0
                }
            })
                    .then(function (response) {
                        debugger;
                        for (var i = 0; i < response.data.rows.length; i++) {
                            response.data.rows[i].imgPath = response.data.rows[i].cover;
                        }
                        vm.articleList = response.data.rows;
                        localStorage.sendItems = JSON.stringify(vm.articleList);
                        var dStr = new Date().getTime();
                        vm.$store.commit('updateSendArticle', dStr);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        }
    }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header{
        position: fixed;
        top: 0px;
        left: 220px;
        right: 0px;
        height: 45px;
		border-bottom: 1px solid #dfdfdf;
		z-index: 100;
		background: #fff;
    }
    /*.rBox{
    	width: 258px;
    	height: 50px;
    	float: right;
    	margin-top: 15px;
    	margin-right: 20px;
    }*/
    .person{
    	width: 100px;
    	background: #fff;
    	border: 1px solid #aaa;
    	border-radius: 5px;
    	position: fixed;
    	top: 29px;
    	right: 0;
    	text-align: center;
    }
    .mation,.out{
    	line-height: 30px;
    	border-radius: 5px;
    }
    .mation:hover,.out:hover{
    	background: #eee;
    	cursor: pointer;
    }
    .searchBox{
    	width: 220px;
    	height: 28px;
    	float: left;
    	margin-top:8px;
        margin-left:20px;
    	background: #f1f2f4;
    	border-radius: 20px;
    	margin-right:9px;
    }
    .sendArticleBox {
        float: left;
        margin-left: 20px;
        margin-top: 7px;
        cursor: pointer;
    }
    .seach{
    	width: 180px;
        height:25px;
    	margin-left:12px;
    	border: none;
    	outline: none;
        margin-top:2px;
    	font-size: 14px;
    	background: #f1f2f4;
    }
    .search-icon{
    	width: 19px;
        height: 19px;
    	float: right;
    	margin-top: 5px;
    	margin-right: 5px;
        margin-left:4px;
    	fill: #666;
    }
    .person {
        display: none;
    }
    .personInfo{
    	width: 30px;
        height: 30px;
        border-radius: 50%;
        float: right;
        margin-top:7px;
        margin-right:10px;
        overflow: hidden;
    }

    .msg{
        width:35px;
        height:40px;
        float: right;
        margin-top:8px;
        cursor: pointer;
    }

    .personInfo img{
    	width: 30px;
        height: 30px;
    }
     .personInfo:hover .person {
        display: block;
    }
    .personInfo img:hover{
    	cursor: pointer;
    }
    .sendList {
        position: relative;
        height: 400px;
    }
    .sendItems {
        width: 100%;
        height: 350px;
        overflow: hidden;
        overflow-y: auto;
    }
    .sendItems::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .sendItems::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .sendItems::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .searchItems {
        padding: 8px 16px;
    }
    .articlePic {
        width: 100%;
        padding-top: 66.6%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .articleTitle {
        font-size: 14px;
        color: #333333;
    }
    .articleGroup {
        position: relative;
        font-size: 14px;
        color: #5498c8;
    }
    .articleGroup-icon {
        position: absolute;
        width: 14px;
        height: 14px;
        fill: #5498c8;
        top: 5px;
    }
    .articleDel-icon {
        position: absolute;
        width: 14px;
        height: 14px;
        fill: #a2a2a2;
        top: 5px;
        right: 0;
    }
    .header-searchMore {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        font-size: 14px;
        color: #666666;
        border-top: 1px solid #e3e8ee;
        text-align: center;
        line-height: 50px;
    }
</style>