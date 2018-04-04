/**
* Created by bk on 2017/12/11.
*/
<template>
    <LazyLayout orient="v" style="height: 100%">
        <!--<LazyTopbar :data="topBar"  style="position:fixed;top:0;right:0;z-index:1;padding-left: 220px"></LazyTopbar>-->
        <LazyBox style="padding: 20px">
            <Row :gutter="20" class-name="row">
                <Col span="7" class-name="col">
                    <div class="articleDetails divList divListScroll">
                        <div class="detailsDivList">
                            <div  class="articleImg" :style="{backgroundImage:'url('+articleInfo.def1+')'}">

                            </div>
                            <div class="articleTitle">
                                {{articleInfo.articletitle}}
                                <!--<span class="original">原创</span>-->
                            </div>
                            <!--<div class="articleReadCount">-->
                                <!--<div class="read readNum">-->
                                    <!--&lt;!&ndash;<div class="">&ndash;&gt;-->
                                        <!--<div class="num">23100</div>-->
                                        <!--<div class="numName">阅读</div>-->
                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--</div>-->
                                <!--<div style="display:inline-block;height: 52px;border-right: 1px solid #d8d8d8;"></div>-->
                                <!--<div class="read thumbUp">-->
                                    <!--&lt;!&ndash;<div class="">&ndash;&gt;-->
                                        <!--<div class="num">23100</div>-->
                                        <!--<div class="numName">点赞</div>-->
                                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--</div>-->
                            <!--</div>-->
                            <div class="articleUrl">原文链接</div>
                            <div class="articleOldUrl">{{articleInfo.def8}}</div>
                            <div class="articleTag">
                                <p class="tagName">标签</p>
                                <btnlist :items="tagList"class="btnlists"></btnlist>
                            </div>
                            <div class="articleTag">
                                <p class="tagName">分类</p>
                                <btnlist :items="classifyList"class="btnlists"></btnlist>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span="17" class-name="col">
                <div class="leaveWord divList">
                    <LazyLayout orient="v" style="height: 100%">
                        <div class="leaveWord-header">
                            <span style="float: left">留言</span>
                            <div class="leaveWord-header-type">
                                <div class="typeToggle"  :class="{active: isActive == 1}" @click="toggleLeaveWord(1)">普通</div><div class="typeToggle" :class="{active: isActive == 2}" @click="toggleLeaveWord(2)">精选</div>
                            </div>
                            <!--<span style="cursor: pointer;float: right" :class="{active: isActive == 2}" @click="toggleLeaveWord(2)">精选</span>-->
                            <!--<span style="cursor: pointer;float: right;margin-right: 20px;" :class="{active: isActive == 1}" @click="toggleLeaveWord(1)">普通</span>-->
                        </div>
                        <LazyBox>
                            <div class="leaveWord-content leaveWord-content-scroll" @scroll="scroll">
                                <div class="contentItem" v-for="(leaveWord,index) in leaveWords" :key="index">
                                    <div class="itemInfo">
                                        <div class="itemInfo-user">
                                            <img :src="leaveWord.headpicture">
                                            <span v-if="leaveWord.realname">{{leaveWord.realname}}</span>
                                            <span v-else>{{leaveWord.username}}</span>
                                            <!--<div class="itemInfo-thumbUp">-->
                                                <!--<img src="../assets/images/dianzan.png" alt="" style="margin-right:5px;">-->
                                                <!--<span>25</span>-->
                                            <!--</div>-->
                                        </div>
                                        <div class="itemInfo-content">
                                            {{leaveWord.content}}
                                        </div>
                                        <div class="itemInfo-footer">
                                            <div class="itemInfo-time">{{$lazy.FormatDate(parseInt(leaveWord.create_time*1000),'HH:mm')}}</div>
                                            <div class="itemInfo-handler">
                                                <span @click="reply(leaveWord.user_comment_id,index)" v-if="!leaveWord.reply">回复</span>
                                                <div class="fengeDiv" v-if="!leaveWord.reply"><span class="fenge"></span></div>
                                                <span @click="leaveWordHandler(3,leaveWord.user_comment_id,index)">删除</span>
                                                <div class="fengeDiv"><span class="fenge"></span></div>
                                                <!--<span>置顶</span>-->
                                                <!--<div class="fengeDiv"><span class="fenge"></span></div>-->
                                                <span v-if="isActive == 1" @click="leaveWordHandler(1,leaveWord.user_comment_id,index)">精选</span>
                                                <span v-else @click="leaveWordHandler(2,leaveWord.user_comment_id,index)">取消精选</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="itemAnswer" v-if="leaveWord.reply">
                                        <div class="answerContent">
                                            <div class="authorAnswer">
                                                <span>作者回复</span>
                                            </div>
                                            <div class="authorAnswer-content">{{leaveWord.reply.content}}</div>
                                            <div class="authorAnswer-footer">
                                                <div class="authorAnswer-time">{{$lazy.FormatDate(parseInt(leaveWord.reply.create_time*1000),'HH:mm')}}</div>
                                                <div class="authorAnswer-handler">
                                                    <span @click="leaveWordHandler(4,leaveWord.user_comment_id,index)">删除回复</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </LazyBox>
                        <div class="leaveWord-footer" v-show="isShowReply">
                            <Input v-model="answer" type="textarea" :rows="3" placeholder="请输入..."></Input>
                            <Button type="primary" size="small" style="float: right;margin-top: 10px" @click="addReply">确定</Button>
                        </div>
                    </LazyLayout>
                </div>
                </Col>
            </Row>
        </LazyBox>
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

    import btnlist from '../components/btnlist'
    import defaultPic from '../assets/images/articleDef.png'
    import addArticle from '../assets/images/addArticle.png'
    export default {
        name: 'articleDetail',
        data () {
            return {
                topBar: {
                    title: '文章详情'
                },
                articleInfo: {},
                tagList: [],
                classifyList: [],
                isActive: 1,
                leaveWords: [],
                answer: '',
                isShowReply: false,
                leaveWordKey: {},
                page: 1,
                row: 10,
                current_user_comment_id: -1,
                current_user_comment_index: -1,
                isScrollLoading: true
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
            btnlist
        },
        created: function () {
            vm = this;
            this.$emit("change",0);
            this.actid = this.$route.query.actid;
            this.getArticle();
            this.getMessageId();
        },
        methods: {
            scroll: function() {
                var offsetHeight = event.target.offsetHeight,
                        scrollHeight = event.target.scrollHeight,
                        scrollTop = event.target.scrollTop,
                        scrollBottom = offsetHeight + scrollTop + 50;
                if(scrollBottom >= scrollHeight)
                {
                    debugger;
                    if(this.isScrollLoading){
                        this.isScrollLoading = false;
                        this.page++;
                        this.getLeaveWords();
                    }
                }
            },
            getArticleType () {
                var url = this.$store.state.serverHost + 'cmy/article/cmyarticletype/getArticleTypeAdd';
                return this.$http.get(url,{
                    params:{
                        communityid: this.$store.state.userInfo.streetorcommunityid,
                        communitytype: this.$store.state.userInfo.streetorcommunity
                    }
                }).then(function(response){
                    var res=response.data.rows;
                    for(var i=0;i<res.length;i++){
                        var obj={};
                        obj.name=res[i].name;
                        obj.id=res[i].id;
                        obj.show=false;
                        vm.classifyList.push(obj)
                    }
                })
            },
            getActivityTag () {
                var url = vm.$store.state.serverHost + 'cmy/activity/cmyactivitytag/getActivityTag';
                return vm.$http.get(url,{
                    params:{}
                }).then(function(response){
                    var res=response.data.rows;
                    for(var i=0;i<res.length;i++){
                        var obj={};
                        obj.name=res[i].tag;
                        obj.id=res[i].id;
                        obj.show=false;
                        vm.tagList.push(obj)
                    }
                })
            },
            getArticle () {
                this.$http.all([this.getArticleType(), this.getActivityTag()])
                        .then(vm.$http.spread(function (acct, perms) {
                            var url = vm.$store.state.serverHost + 'cmy/article/cmyarticle/getArticle';
                            vm.$http.get(url,{
                                params:{
                                    id: vm.actid
                                }
                            }).then(function(res){
                                vm.articleInfo = res.data.rows[0];
                                var data = res.data.rows[0];
                                var activitytag = data.articletag;
                                var activitytype = data.articletype;
                                activitytag = activitytag.split(",");
                                activitytype = activitytype.split(",");
                                for(var j = 0;j < vm.tagList.length; j++){
                                    for(var i = 0;i < activitytag.length; i++){
                                        if(activitytag[i] == vm.tagList[j].id){
                                            vm.tagList[j].show = true;
                                        }
                                    }
                                }
                                for(var j = 0;j < vm.classifyList.length; j++){
                                    for(var i = 0;i < activitytype.length; i++){
                                        if(activitytype[i] == vm.classifyList[j].id){
                                            vm.classifyList[j].show = true;
                                        }
                                    }
                                }
                            })
                        }));
            },
            getMessageId () {
                var url = this.$store.state.serverHost + 'cmy/article/cmysendcart/getSendMessage';
                this.$http.get(url,{
                    params:{
                        comeid: this.actid
                    }
                })
                        .then(function (response) {
                            if (response.data.isSucceed) {
                                vm.leaveWordKey = response.data.rows[0];
                                vm.getLeaveWords();
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getLeaveWords () {
                var url = this.$store.state.serverHost + 'wx/api/wx/getCommentlist';
                this.$http.get(url,{
                    params:{
                        initid: this.$store.state.communityDetail.initid,
                        msg_data_id: this.leaveWordKey.msgdataid,
                        index: this.leaveWordKey.sort,
                        type: this.isActive,
                        page: this.page,
                        count: this.row
                    }
                })
                        .then(function (response) {
                            if (response.data.isSucceed) {
                                debugger;
                                vm.isScrollLoading = true;;
                                if(vm.page == 1){
                                    vm.leaveWords = response.data.rows;
                                } else {
                                    vm.leaveWords = vm.leaveWords.concat(response.data.rows);
                                }
                                if(response.data.rows.length == 0 && vm.page > 1){
                                    vm.page--;
                                }
                                for (var i = 0; i < response.data.rows.length; i++) {
                                    (function(openid,index){
                                        vm.getWeiXinUserInfo(openid,index,vm.page);
                                    })(response.data.rows[i].openid,i)
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            getWeiXinUserInfo (openid,index,page) {
                var url = this.$store.state.serverHost + 'wx/api/wx/getweixinuserinfo';
                this.$http.get(url,{
                    params:{
                        initid: this.$store.state.communityDetail.initid,
                        openid: openid
                    }
                })
                        .then(function (response) {
                            debugger;
                            vm.$set(vm.leaveWords[(page-1)*vm.row + index],'headpicture',response.data.rows[0].headpicture);
                            vm.$set(vm.leaveWords[(page-1)*vm.row + index],'realname',response.data.rows[0].realname);
                            vm.$set(vm.leaveWords[(page-1)*vm.row + index],'username',response.data.rows[0].username);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            toggleLeaveWord (num) {
                if(this.isActive == num){
                    return
                }
                this.isActive = num;
                this.page = 1;
                this.getLeaveWords();
            },
            reply (user_comment_id,index) {
                this.isShowReply = !this.isShowReply;
                if(this.isShowReply){
                    this.current_user_comment_id = user_comment_id;
                    this.current_user_comment_index = index;
                } else {
                    this.current_user_comment_id = -1;
                    this.current_user_comment_index = -1;
                }
            },
            addReply () {
                if(!this.answer){
                    this.isShowReply = false;
                    return
                }
                var url = this.$store.state.serverHost + 'wx/api/wx/replyAdd';
                this.$http.get(url,{
                    params:{
                        initid: this.$store.state.communityDetail.initid,
                        msg_data_id: this.leaveWordKey.msgdataid,
                        index: this.leaveWordKey.sort,
                        type: this.isActive,
                        user_comment_id: this.current_user_comment_id,
                        content: this.answer
                    }
                })
                        .then(function (response) {
                            if (response.data.isSucceed) {
                                vm.isShowReply = false;
                                var tempDate = Math.round(new Date().getTime()/1000);
                                vm.$set(vm.leaveWords[vm.current_user_comment_index],'reply',{content:vm.answer,create_time:tempDate});
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            leaveWordHandler (type,user_comment_id,index) {
                var url = this.$store.state.serverHost + 'wx/api/wx/commontMarkOperate';
                this.$http.get(url,{
                    params:{
                        initid: this.$store.state.communityDetail.initid,
                        msg_data_id: this.leaveWordKey.msgdataid,
                        index: this.leaveWordKey.sort,
                        type: type,
                        user_comment_id: user_comment_id
                    }
                })
                        .then(function (response) {
                            if (response.data.isSucceed) {
                                debugger;
                                if(type == 4){
                                    delete vm.leaveWords[index].reply;
                                    vm.$set(vm.leaveWords,index,vm.leaveWords[index]);
                                } else if (type == 3 || type == 2 || type == 1) {
                                    if(type == 2){
                                        vm.$Message.success('取消精选');
                                    } else if(type == 1){
                                        vm.$Message.success('设置为精选');
                                    }
                                    vm.leaveWords.splice(index, 1);
                                }
                            } else {
                                vm.$Message.error(response.data.mesage);
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
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
    .articleTitle {
        margin-top: 20px;
        font-size: 14px;
        color: #333333;;
    }
    .original {
        width: 50px;
        display: inline-block;
        padding: 1px .5em;
        border: 1px solid #ffc56a;
        font-size: 12px;
        line-height: 1.1;
        background-color: #ff9c00;
        color: #fff;
        text-align: center;
        border-top-left-radius: 15% 50%;
        border-top-right-radius: 15% 50%;
        border-bottom-left-radius: 15% 50%;
        border-bottom-right-radius: 15% 50%;
    }
    .articleReadCount {
        height: 70px;
        background-color: #f8f8f8;
        margin-top: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .read {
        display: inline-block;
        text-align: center;
        color: #333;
    }
    .readNum {
        width: 50%;
    }
    .thumbUp {
        width: 49%;
    }
    .num {
        font-size: 14px;
    }
    .numName {
        font-size: 12px;
    }
    .showNum {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .articleUrl {
        margin-top: 50px;
        font-size: 13px;
        margin-bottom: 20px;
    }
    .articleOldUrl {
        display: inline-block;
        width: 100%;
        min-height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: 1px solid #dddee1;
        border-radius: 4px;
        color: #495060;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
    }
    .articleTag {
        margin-top: 50px;
    }
    .tagName {
        font-size: 12px;
        color: #333333;
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
    .divListScroll::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .divListScroll::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .divListScroll::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .leaveWord-header {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        font-size: 16px;
        color: #666;
        border-bottom: 1px solid #d7dde4;
        position: relative;
    }
    .leaveWord-header-type {
        right: 20px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        line-height: 0;
    }
    .typeToggle {
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        padding: 6px 15px;
        cursor: pointer;
        border: 1px solid #dddee1;
        line-height: 1.5;
        font-size: 12px;
        border-radius: 32px;
        position: relative;
    }
    .typeToggle:hover {
        color: #57a3f3;
        background-color: transparent;
        border-color: #57a3f3;
        z-index: 2;
    }
    .typeToggle.active {
        /*color: #57a3f3;*/
        /*background-color: transparent;*/
        border-color: #2d8cf0;
        color: #fff;
        background-color: #2d8cf0;
        z-index: 3;
    }
    .typeToggle:first-child {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }
    .typeToggle:last-child {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
        margin-left: -1px;;
    }
    .sendItems {
        position: relative;
    }
    .detailsDivList {
        padding: 15px;
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
    .articleImg  {
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
    .leaveWord-content {
        height: 100%;
        padding-top: 10px;
    }
    .leaveWord-content-scroll {
        overflow: hidden;
        overflow-y: auto;
    }
    .leaveWord-content-scroll::-webkit-scrollbar {
        width: 2px;
        height: 2px;
        background-color: #fff;
    }
    .leaveWord-content-scroll::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #fff;
    }
    .leaveWord-content-scroll::-webkit-scrollbar-thumb {
        height: 20px;
        border-radius: 10px;
        background-color: rgba(0,0,0,.3);
    }
    .contentItem {
        /*height: 150px;*/
        padding-left: 20px;
        padding-right: 40px;
        /*background-color: #f9f9fc;*/
    }
    .itemInfo {
        padding-top: 30px;
    }
    .itemInfo-user {
        display: flex;
        align-items: center;
        position: relative;
    }
    .itemInfo-user > img {
        width: 36px;
        height: 36px;
    }
    .itemInfo-user > span {
        margin-left: 10px;
        font-size: 13px;
        color: #333333;
    }
    .itemInfo-thumbUp {
        position: absolute;
        right: 5px;
        font-size: 12px;
        color: #999999;
        display: flex;
        align-items: center;
    }
    .itemInfo-content {
        padding-left: 46px;
        font-size: 12px;
        color: #666666;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .itemInfo-footer {
        margin-top: 10px;
        font-size: 12px;
    }
    .itemInfo-time {
        padding-left: 46px;
        color: #c2c7cd;
        float: left;
    }
    .itemInfo-handler {
        float: right;
        display: flex;
    }
    .itemInfo-handler > span {
        color: #5e7da2;
        cursor: pointer;
    }
    .fengeDiv {
        display:inline-block;
        padding-top: 2px;
        margin-left: 4px;
        margin-right: 4px;
    }
    .fenge {
        border-right: 1px solid #5e7da2;
        display: inline-block;
        height: 12px;
        margin-left: 6px;
        margin-right: 6px;
    }
    .itemAnswer {
        margin-top: 40px;
        padding-left: 46px;
    }
    .answerContent {
        border-top: 1px solid #d7dde4;
    }
    .authorAnswer {
        margin-top: 20px;
        font-size: 13px;
        color: #333333;
    }
    .authorAnswer > span {
        border-left: 3px solid #2D8cF0;
        padding-left: 10px;
    }
    .authorAnswer-content {
        margin-top: 12px;
        font-size: 12px;
        color: #666666;
    }
    .authorAnswer-footer {
        margin-top: 10px;
        position: relative;
        height: 18px;
    }
    .authorAnswer-time {
        font-size: 12px;
        color: #c6cbd1;
    }
    .authorAnswer-handler {
        position: absolute;
        right: 0;
        color: #5e7da2;
        cursor: pointer;
    }
    .leaveWord-footer {
        height: 140px;
        padding: 22px 46px;
    }
</style>
 