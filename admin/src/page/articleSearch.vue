/**
* Created by bk on 2017/9/22.
*/
<template>
    <LazyLayout orient="v" class="articleFind">
        <div class="articleSearch">
            <Input v-model="searchKey" placeholder="搜索你感兴趣的文章" @on-enter="searchBtn">
                <Button slot="append" type="primary" @click="searchBtn">搜文章</Button>
            </Input>
        </div>
        <div v-if="isLoading" style="height: calc(100% - 112px);">
            <loading></loading>
        </div>
        <div v-else>
            <div class="searchItems">
                <article-search-list :data="article" v-for="(article,key) in articleList" style="border-bottom: 1px solid #dddddd;">
                    <!--<div slot="collectBtn" class="collectBtn" @click="collectArticle(article,key)">收藏</div>-->
                    <!--<div slot="articleTitle">-->
                    <span slot="articleTitle" v-html="article.title" @click="routeToPreview(article)" style="cursor: pointer">{{}}</span>
                    <!--</div>-->
                    <div slot="articleGroup"></div>
                </article-search-list>
            </div>
            <div style="height: 32px;">
                <loading v-if="spinShow"></loading>
            </div>
            <div class="toTop" @click="goToTop">
                <Card style="width:40px;height: 40px;text-align: center;vertical-align: middle;display: table-cell;">
                    <Icon type="chevron-up"></Icon>
                </Card>
            </div>
        </div>
    </LazyLayout>
</template>
<script type="es6">
    import Input from 'iview/src/components/input'
    import Button from 'iview/src/components/button'
    import {Row,Col} from 'iview/src/components/grid'
    import Card from 'iview/src/components/card'
    import Icon from 'iview/src/components/icon'

    import articleSearchList from '../components/articleSearchList'
    import defaultPic from '../assets/images/bili.jpg'
    import loading from '../components/loading'
    var vm;
    export default {
        name: 'articleSearch',
        data () {
            return {
                articleList: [],
                page: 1,
                searchKey: '',
                isFirst: true,
                isLoading: true,
                spinShow: false,
                isScrollLoading: true
            }
        },
        components: {
            Input,
            Button,
            Row,
            Col,
            Card,
            Icon,
            loading,
            articleSearchList
        },
        //created: function(){
        //    debugger;
        //    vm = this;
        //    this.$emit("change",0); // 触发父组件article.vue的change方法
        //    this.getArticles(); //  获取文章
        //    window.addEventListener('scroll',vm.scrollSearch);
        //},
        destroyed: function () {
            debugger;
            window.removeEventListener('scroll',vm.scrollSearch,false);
        },
        activated : function() {
            debugger
            vm = this;
            this.$emit("change",1); // 触发父组件article.vue的change方法
            if(this.$lazy.data.isFirstMore) {
                //this.articleList = [];
                this.$lazy.data.isFirstMore = false;
            }
            if(!this.$lazy.data.isFirst){
                this.getArticles(); //  获取文章
                this.isFirst = false;
                this.$lazy.data.isFirst = true;
                this.$lazy.data.isFirstMore = true;
            }
            window.addEventListener('scroll',vm.scrollSearch);
        },
        deactivated: function () {
            debugger;
            window.removeEventListener('scroll',vm.scrollSearch,false);
        },
        methods: {
            scrollSearch: function() {
                var offsetHeight = document.body.offsetHeight,
                        scrollHeight = document.body.scrollHeight,
                        scrollTop = document.body.scrollTop;
                if(document.body.scrollTop == 0){
                    offsetHeight = document.documentElement.offsetHeight;
                    scrollHeight = document.documentElement.scrollHeight;
                    scrollTop = document.documentElement.scrollTop;
                }
                var scrollBottom = offsetHeight + scrollTop + 50; //滚动条滚到底部时，相加的和可能比scrollHeight大一点点
                if(scrollBottom >= scrollHeight && scrollTop != 0) {
                    debugger;
                    if(this.isScrollLoading){
                        this.isScrollLoading = false; //
                        vm.page++;
                        vm.spinShow = true;
                        vm.getArticles();
                    }
                }
            },
            goToTop () {
                //document.body.scrollTop = 0;
                //document.documentElement.scrollTop = 0;
                clearInterval(timer);
                var timer = setInterval(function() {
                    let curHeight = document.documentElement.scrollTop || document.body.scrollTop;  // 得到当前高度
                    var now = curHeight;
                    var speed = (0 - now) / 7;                              // 随着高度减速
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    //console.log(`当前的高度应该是:` + curHeight);
                    //console.log('我是零你也那我没办法');
                    if (curHeight === 0) {                          //当前高度为零,停止这次计时器
                        clearInterval(timer);                             // C1
                    }
                    document.documentElement.scrollTop = curHeight + speed;         //直接给高度赋值
                    document.body.scrollTop = curHeight + speed;                //谷歌的
                    //stop = false;                               // A
                    //console.log('回到顶部一次');
                }, 30);
            },
            collectArticle (article,index) {
                if(!localStorage.initid) {
                    vm.$Message.warning('请先绑定微信号');
                    return;
                }
                var title = article.title.replace(/\<em\>\<!--red_beg--\>(.*?)\<!--red_end--\>\<\/em\>/,'$1');
                var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/save';
                this.$http.post(url, this.qs.stringify({
                    def3: this.$store.state.userInfo.streetorcommunityid,
                    def6: this.$store.state.userInfo.streetorcommunity,
                    def7: localStorage.initid,
                    articletitle: title,
                    articleauthor: article.account,
                    articlecontent: article.info,
                    def1: article.imgPath,
                    def8: article.href,
                    id: 0
                }))
                        .then(function (response) {
                            console.log(response);
                            //vm.$router.push('/list');
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            searchBtn () {
                this.page = 1;
                this.articleList = [];
                this.getArticles();
            },
            getArticles () {
                var url =  this.$lazy.url.nodeWebSpiders + 'getWeixinList';
                this.$http.get(url, {
                    params: {
                        page: this.page,
                        name: this.searchKey
                    }
                })
                        .then(function (response) {
                            debugger;
                            //vm.articleList = response.data.rows;
                            vm.isScrollLoading = true;
                            vm.isLoading = false;
                            vm.spinShow=false;
                            var temp = response.data.rows;
                            for (var i = 0; i < temp.length; i++) {
                                if(temp[i].time){
                                    temp[i].timeFormat = vm.$lazy.FormatDate(parseInt(temp[i].time)*1000,'yyyy-MM-dd');
                                } else {
                                    temp[i].timeFormat = '';
                                }

                                var imgPath = vm.$lazy.url.nodeWebSpiders + 'getWeixinImg?img='+ encodeURIComponent(temp[i].img);
                                vm.$set(temp[i],'imgPath',imgPath);
                            }
                            vm.articleList = vm.articleList.concat(temp);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
            },
            routeToPreview (article) {
                debugger;
                //记录下封面图和原文链接
                this.$lazy.data.coverImg = article.imgPath;
                this.$lazy.data.href = article.href;
                this.$router.push({
                        name:"articlePreview",
                        query:{
                            href: article.href
                        }
                    });
            }
        }
    }

</script>
<style scoped>
    .LazyLayout {
        width: 100%;
        height: 100%;
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
        margin: 0 auto;
        border: 1px solid #dddddd;
        border-bottom: none;
    }
    .searchItems:last-child {
        border-bottom: none;
    }
    .toTop {
        position: fixed;
        bottom: 100px;
        right: 50px;
        cursor: pointer;
    }
    .toTop:hover {
        color: #3c7ce6;
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
 