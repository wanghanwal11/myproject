/**
* Created by bk on 2017/9/26.
*/
<template>
    <LazyLayout orient="v" style="height: 100%">
        <!--<LazyTopbar :data="json"  style="position:fixed;top:45px;left:0;right:0;z-index:1"></LazyTopbar>-->
        <!--<div style="height: 39px"></div>-->
        <LazyBox style="padding: 20px 20px 0">
                <Row :gutter="20" class-name="row">
                    <Col span="7" class-name="col">
                        <LazyLayout orient="v" style="height: 100%">
                            <LazyBox>
                                <div class="sendArticleList divList">
                                    <div class="sendItems" v-for="(item,key) in sendItems">
                                        <div class="sendDivList">
                                            <div v-if="key === 0" class="sendFirst" :style="{backgroundImage:'url('+item.imgPath+')'}">
                                                <div class="firstTitle">
                                                    {{item.title}}
                                                </div>
                                            </div>
                                            <div v-else class="sendOther">
                                                <div class="otherTitle">{{item.title}}</div>
                                                <div class="sendOtherPic" :style="{backgroundImage:'url('+item.imgPath+')'}"></div>
                                            </div>
                                        </div>
                                        <div class="sendListHandler">
                                            <div class="send-handler" style="transform: rotate(180deg)">
                                                <svg class="send-handler-icon" aria-hidden="true"  @click="moveForward(key)">
                                                    <use xlink:href="#icon-xiangshang"></use>
                                                </svg>
                                            </div>
                                            <div class="send-handler">
                                                <svg class="send-handler-icon" aria-hidden="true" @click="moveBack(key)">
                                                    <use xlink:href="#icon-xiangshang"></use>
                                                </svg>
                                            </div>
                                            <div class="send-handler" style="float: right">
                                                <svg class="send-handler-icon" aria-hidden="true" @click="delArticle(key)">
                                                    <use xlink:href="#icon-weibiaoti106"></use>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <!--<div class="addSend" @click="addSendArticle" v-if="sendItems.length < 8">-->
                                    <!--<div class="addPic" :style="{backgroundImage:'url('+addSend+')'}"></div>-->
                                    <!--</div>-->
                                </div>
                            </LazyBox>
                            <div class="sendFooter">
                                <!--<Button :disabled='preLoading' type="primary" :loading="preLoading" style="width: 100px">-->
                                    <!--<span v-if="!preLoading">预览</span>-->
                                    <!--<span v-else>推送中...</span>-->
                                <!--</Button>-->
                                <Button type="primary" @click="modalPreview = true" style="width: 100px">预览</Button>
                                <Button :disabled='loading' type="primary" :loading="loading" @click="send" style="width: 100px">
                                    <span v-if="!loading">发送</span>
                                    <span v-else>推送中...</span>
                                </Button>
                                <!--<Button type="primary" style="width: 80px" @click="send">确定</Button>-->
                            </div>
                        </LazyLayout>
                    </Col>
                    <Col span="17" class-name="col">
                        <div class="sendHistoryArticle">
                            <LazyLayout orient="v" style="height: 100%">
                                <div class="sendHistory-header">
                                   <span>推送历史</span>
                                </div>
                                <LazyBox>
                                    <router-view></router-view>
                                </LazyBox>
                            </LazyLayout>

                            <!--搜索可推送的文章改成了推送历史-->
                            <!--<div class="articleSearch">-->
                                <!--<Input v-model="searchKey" placeholder="搜索你感兴趣的文章">-->
                                <!--&lt;!&ndash;以后可能还要用,不要删除&ndash;&gt;-->
                                <!--&lt;!&ndash;<Select :value="searchType" v-model="searchType" slot="prepend" style="width: 80px">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<Option value="all">全部</Option>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<Option value="cmyactivity">活动</Option>&ndash;&gt;-->
                                    <!--&lt;!&ndash;<Option value="cmyarticle">图文</Option>&ndash;&gt;-->
                                <!--&lt;!&ndash;</Select>&ndash;&gt;-->
                                <!--<Button slot="append" type="primary" @click="searchBtn">搜文章</Button>-->
                                <!--</Input>-->
                            <!--</div>-->
                            <!--<CheckboxGroup v-model="selectedArticles" @on-change="selectArticle">-->
                            <!--<div v-if="isSearching">-->
                                <!--<loading ></loading>-->
                            <!--</div>-->
                             <!--<div v-else>-->
                                 <!--<div  v-for="(article,key) in articleList" class="searchResult" v-show="article.isShow">-->
                                     <!--&lt;!&ndash;<div style="position:absolute;top:50%;transform:translateY(-50%);width: 10%;text-align: center"><Checkbox :label="article.id"><span></span></Checkbox></div>&ndash;&gt;-->
                                     <!--<div class="addToSend" @click="addToSend(article,key)">-->
                                         <!--<svg class="add-icon" aria-hidden="true">-->
                                             <!--<use xlink:href="#icon-tianjia"></use>-->
                                         <!--</svg>-->
                                     <!--</div>-->
                                     <!--<div class="searchItems">-->
                                         <!--<article-search-list :data="article" height="100">-->

                                         <!--</article-search-list>-->
                                     <!--</div>-->
                                 <!--</div>-->
                             <!--</div>-->
                            <!--</CheckboxGroup>-->
                        </div>
                    </Col>
                </Row>
        </LazyBox>
        <!--<div class="sendFooter">-->
            <!--<Button :disabled='loading' type="primary" :loading="loading" @click="send" style="width: 100px">-->
                <!--<span v-if="!loading">确定</span>-->
                <!--<span v-else>推送中...</span>-->
            <!--</Button>-->
            <!--&lt;!&ndash;<Button type="primary" style="width: 80px" @click="send">确定</Button>&ndash;&gt;-->
        <!--</div>-->
        <Modal width="700"
                v-model="modalPreview"
                title="发送预览">
            <div style="height: 300px;display:flex;justify-content:center;align-items:center;">
                <div>
                    <div style="font-size: 14px">关注公众号后，才能接受图文信息预览</div>
                    <div style="margin-top: 5px"><Input v-model="wxNum" placeholder="请输入微信号" style="width: 400px"></Input></div>
                    <div style="width:400px;margin-top: 5px;color: #999;font-size: 14px">预览功能仅用于公众号查看文章效果，不适用于公众传播，预览链接会在短期内失效</div>
                </div>
            </div>
            <div slot="footer">
                <Button type="text" @click="modalPreview = false">取消</Button>
                <Button :disabled='preLoading' type="primary" :loading="preLoading" @click="sendPreview" style="width: 100px">
                    <span v-if="!preLoading">确定</span>
                    <span v-else>推送中...</span>
                </Button>
            </div>
        </Modal>
    </LazyLayout>
</template>
<script type="es6">
    var vm;
    import Button from 'iview/src/components/button'
    import {Row,Col} from 'iview/src/components/grid'
    import Card from 'iview/src/components/card'
    import Input from 'iview/src/components/input'
    import {Select,Option} from 'iview/src/components/select'
    import CheckboxGroup from 'iview/src/components/checkbox/checkbox-group'
    import Checkbox from 'iview/src/components/checkbox'
    import Modal from 'iview/src/components/modal'
    import loading from '../components/loading'

    import articleSearchList from '../components/articleSearchList'
    import defaultPic from '../assets/images/articleDef.png'
    import addArticle from '../assets/images/addArticle.png'
    export default {
        name: 'articleSend',
        data () {
            return {
                json: {
                    title: '推送'
                },
                addSend: addArticle,
                sendItems: [],
                articleList: [],
                searchType: 'cmyarticle',
                selectedArticles: [],
                searchKey: '',
                page: 0,
                rows: 15,
                loading: false,
                preLoading: false,
                modalPreview: false,
                wxNum: '',
                isSearching: true
            }
        },
        components: {
            Button,
            Row,
            Col,
            Card,
            Input,
            Select,
            Option,
            CheckboxGroup,
            Checkbox,
            Modal,
            loading,
            articleSearchList
        },
        computed: {
            isUpdateSend() {
                return this.$store.state.article.sendArticle;
            }
        },
        watch: {
            isUpdateSend(curVal, oldVal) {
                //从localStorage中取值
                this.sendItems = JSON.parse(localStorage.sendItems);
                //给selectedArticles赋值
                debugger;
                //将sendItems里有的，不显示
                for(var i = 0; i < this.articleList.length; i++) {
                    this.articleList[i].isShow = true;
                    for(var j = 0; j < this.sendItems.length; j++){
                        if(this.sendItems[j].comeid == this.articleList[i].id){
                            this.articleList[i].isShow = false;
                        }
                    }
                }
            }
        },
        //created: function(){
        //    vm = this;
        //    //从localStorage中取值
        //    this.sendItems = JSON.parse(localStorage.sendItems);
        //    //给selectedArticles赋值
        //    //for(var i = 0; i < this.sendItems.length; i++){
        //    //    this.selectedArticles.push(this.sendItems[i].id);
        //    //}
        //    window.addEventListener('beforeunload',this.beforeunload);
        //},
        created: function () {
            vm = this;
            //搜索文章和活动
            this.searchArticles();
            this.$emit("change",2);
            //从localStorage中取值
            this.sendItems = JSON.parse(localStorage.sendItems);
        },
        activated : function() {

            //window.addEventListener('beforeunload',this.beforeunload);
        },
        methods: {
            beforeunload () {
                debugger;
                //this.saveSend();
            },
            saveSend () {
                var url =  this.$lazy.url.host + '/cmy/article/cmysendcart/saveCart';
                this.$http.post(url, JSON.stringify(this.sendItems), {
                    headers: {
                        'token': this.$store.state.userInfo.access_token,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                        .then(function (response) {
                            debugger;
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            searchBtn () {
                this.page = 0;
                this.articleList = [];
                this.searchArticles();
            },
            searchArticleScroll () {
                var offsetHeight = event.target.offsetHeight,
                        scrollHeight = event.target.scrollHeight,
                        scrollTop = event.target.scrollTop,
                        scrollBottom = offsetHeight + scrollTop + 20;
                if(scrollBottom > scrollHeight)
                {
                    debugger
                    this.page++;
                    this.searchArticles();
                }
            },
            searchArticles () {
                //getCmySearch
                var type = this.searchType === 'all' ? '' : this.searchType;
                var url =  this.$lazy.url.host + this.$lazy.url.getCmySearch;
                this.$http.get(url, {
                    params: {
                        title: this.searchKey,
                        type: type,
                        initid: this.$store.state.communityDetail.initid,
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity,
                        page: this.page,
                        rows: this.rows
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.isSearching = false;
                            for(var i = 0; i < response.data.rows.length; i++){
                                response.data.rows[i].imgPath = response.data.rows[i].cover;
                                response.data.rows[i].isShow = true;
                                for(var j = 0; j < vm.sendItems.length; j++){
                                    if(vm.sendItems[j].comeid == response.data.rows[i].id){
                                        response.data.rows[i].isShow = false;
                                    }
                                }
                            }
                            if(response.data.rows.length == 0 && vm.page > 0){
                                vm.page--;
                            }
                            vm.articleList = vm.articleList.concat(response.data.rows);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                ////将sendItems里有的，不显示
                //for(var j = 0; j < this.sendItems.length; j++){
                //    for(var i = 0; i < this.articleList.length; i++) {
                //        if(this.sendItems[j].id == this.articleList[i].id){
                //            this.articleList[i].isShow = false;
                //        }
                //    }
                //}

            },
            getCurrentArticle (article,index) {
                debugger;
                console.log(article);
                console.log(index);
            },
            addToSend (article,index) {
                if(this.sendItems.length < 8) {
                    article.comeid = article.id;
                    article.initid = this.$store.state.communityDetail.initid;
                    article.communityid = this.$store.state.userInfo.streetorcommunityid;
                    article.communitytype = this.$store.state.userInfo.streetorcommunity;
                    this.sendItems.push(article);
                    article.isShow = false;
                    //改变localStorage
                    localStorage.sendItems = JSON.stringify(this.sendItems);
                    var dStr = new Date().getTime();
                    this.$store.commit('updateSendArticle', dStr);
                    //保存到库中
                    //this.saveSend();
                } else {
                    this.$Message.info('最多推送八篇文章!');
                }
            },
            selectArticle () {
                debugger;
                if (this.selectedArticles.length <= 8) {
                    if (this.selectedArticles.length > this.sendItems.length) {
                        for (var j = 0; j < this.articleList.length; j++) {
                            if (this.articleList[j].id == this.selectedArticles[this.selectedArticles.length - 1]) {
                                this.sendItems.push(this.articleList[j]);
                                break;
                            }
                        }
                    } else {
                        for (var i = 0; i < this.sendItems.length; i++) {
                            if (this.selectedArticles.indexOf(this.sendItems[i].id) > -1) {

                            } else {
                                this.sendItems.splice(i, 1);
                            }
                        }
                    }
                    localStorage.sendItems = JSON.stringify(this.sendItems);
                    var dStr = new Date().getTime();
                    this.$store.commit('updateSendArticle', dStr);
                } else {
                    //保证只能选中八篇
                    this.selectedArticles.splice(this.selectedArticles.length, 1);
                    this.$Message.info('最多推送八篇文章!');
                }
            },
            moveForward (index) {
                if (index != 0) {
                    var temp = this.sendItems[index - 1];
                    this.$set(this.sendItems, index - 1, this.sendItems[index]);
                    this.$set(this.sendItems, index, temp);
                    //改变localStorage
                    localStorage.sendItems = JSON.stringify(this.sendItems);
                    var dStr = new Date().getTime();
                    this.$store.commit('updateSendArticle', dStr);
                }
            },
            moveBack (index) {
                if (index < this.sendItems.length - 1) {
                    var temp = this.sendItems[index];
                    this.$set(this.sendItems, index, this.sendItems[index + 1]);
                    this.$set(this.sendItems, index + 1, temp);
                    //改变localStorage
                    localStorage.sendItems = JSON.stringify(this.sendItems);
                    var dStr = new Date().getTime();
                    this.$store.commit('updateSendArticle', dStr);
                }
            },
            delArticle (index) {
                var id = this.sendItems[index].comeid;
                for(var i = 0; i < this.articleList.length; i++) {
                    if(this.articleList[i].id == id){
                        this.articleList[i].isShow = true;
                    }
                    break;
                }
                this.sendItems.splice(index, 1);
                localStorage.sendItems = JSON.stringify(this.sendItems);
                var dStr = new Date().getTime();
                this.$store.commit('updateSendArticle', dStr);
                //保存到库中
                //this.saveSend();
            },
            addSendArticle () {
                if (this.sendItems.length < 8) {
                    var temp = {
                        title: '标题',
                        imgPath: defaultPic
                    };
                    this.sendItems.push(temp);
                } else {
                    this.$Message.info('最多推送八篇文章!');
                }
            },
            send () {
                this.loading = true;
                if(this.sendItems.length == 0){
                    this.loading = false;
                    this.$Message.info('没有要推送的内容');
                    return;
                }
                this.saveSend();
                var url =  this.$lazy.url.host + '/cmy/article/cmysendcart/cartSend';
                this.$http.post(url, JSON.stringify(this.sendItems), {
                    headers: {
                        'token': this.$store.state.userInfo.access_token,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.loading = false;
                            if(response.data.isSucceed) {
                                vm.$Message.success('发送中...');
                                vm.sendItems = [];
                                localStorage.sendItems = JSON.stringify(vm.sendItems);
                                var dStr = new Date().getTime();
                                vm.$store.commit('updateSendArticle', dStr);
                            } else {
                                vm.$Message.error(response.data.message);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            sendPreview () {
                debugger;
                if(!this.wxNum){
                    this.$Message.error('请输入微信号');
                    return;
                }
                this.preLoading = true;
                var url =  this.$lazy.url.host + '/cmy/article/cmysendcart/cartSend?openid='+  this.wxNum;
                this.$http.post(url, JSON.stringify(this.sendItems), {
                    headers: {
                        'token': this.$store.state.userInfo.access_token,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.preLoading = false;
                            vm.wxNum = '';
                            if(response.data.isSucceed) {
                                vm.$Message.success('发送成功');
                                vm.modalPreview = false;
                            } else {
                                vm.$Message.error(response.data.message);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                            vm.preLoading = false;
                        });
            }
        }
    }

</script>
<style scoped>
    .send {
        padding: 20px 20px 0;
    }
    .sendFooter {
        text-align: right;
        padding: 20px;
    }
    .row {
        height: 100%;
    }
    .col {
        height: 100%;
    }
    .sendHistoryArticle {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        /*overflow: hidden;*/
        overflow-y: hidden;
    }
    .divList {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        overflow: hidden;
        overflow-y: auto;
    }
    .divList:hover {
        /*box-shadow: 0 1px 6px rgba(0,0,0,.2);*/
        /*border-color: #d7dde4;*/
        /*border-radius: 4px;*/
    }
    .divList::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .divList::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .divList::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .sendItems {
        position: relative;
    }
    .sendDivList {
        padding: 15px;
        border-bottom: 1px solid #d7dde4;
    }
    .sendItems:hover .sendListHandler {
        display: block;
    }
    .sendListHandler {
        position: absolute;
        width: 100%;
        height: 50px;
        background-color: rgba( 0, 0, 0,.5 );
        bottom: 0;
        display: none;
        padding: 0 10px;
    }
    .sendFirst  {
        width: 100%;
        padding-top: 56.25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
    }
    .firstTitle {
        position: absolute;
        width: 100%;
        height: 34px;
        background-color: rgba( 0, 0, 0,.5 );
        bottom: 0;
        color: #fff;
        font-size: 12px;
        line-height: 34px;
    }
    .sendOther {
        display: table;
        width: 100%;
    }
    .sendOtherPic {
        width: 25%;
        padding-top: 25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        display: table-cell;
    }
    .otherTitle {
        display: table-cell;
        width: 75%;
        vertical-align: middle;
    }
    .addSend {
        width: 100%;
        padding: 30px;
        border-bottom: 1px solid #d7dde4;
        cursor: pointer;
    }
    .addPic {
        width: 25%;
        padding-top: 25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin: 0 auto;
    }
    .send-handler {
        width: 20px;
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        display: inline-block;
    }
    .send-handler-icon {
        width: 20px;
        height: 20px;
        fill: #fff;
        margin-top: 15px;
    }
    .searchResult {
        border-bottom: 1px solid #dddddd;
        position: relative
    }
    .searchResult:hover .addToSend {
        display: block;
    }
    .add-icon {
        width: 16px;
        height: 16px;
        fill: #ddd;
    }
    .addToSend {
        position:absolute;
        top:50%;
        transform:translateY(-50%);
        width: 10%;
        text-align: center;
        cursor: pointer;
        display: none;;
    }
    .articleSearch {
        width: 50%;
        max-width: 600px;
        min-width: 200px;
        background-color: #fff;
        margin: 40px auto;
    }
    .searchItems {
        width: 75%;
        height: auto;
        max-width: 900px;
        min-width: 300px;
        background-color: #fff;
        /*margin: 0 auto;*/
        margin-left: 6%;
    }
    .sendHistory-header {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 16px;
        color: #666;
        border-bottom: 1px solid #d7dde4;
        position: relative;
    }
</style>
 