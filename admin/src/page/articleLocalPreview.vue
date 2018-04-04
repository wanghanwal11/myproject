/**
* Created by bk on 2017/10/30.
*/
<template>
    <div class="articlePreview" style="height: 100%">
        <!--<LazyTopbar :data="json" style="position:fixed;top:0px;z-index:11;padding-right:220px;"></LazyTopbar>-->
        <loading v-if="isLoading"></loading>
        <div>
            <div class="infoBox">
                <div class="title">
                    <h1>{{ article.articletitle }}</h1>
                    <div class="time">
                        <span v-if="article.createtime">{{ $lazy.FormatDate(parseInt(article.createtime),'yyyy-MM-dd') }}</span>
                    </div>
                    <!--<p class="jianjie">{{ summary }}</p>-->
                </div>
                <!--<div v-if="infoPic" class="picBox" :style="{backgroundImage:'url('+infoPic+')'}"></div>-->
                <div class="footer articlePreview">
                    <p v-html="article.articlecontent"></p>
                </div>
            </div>
            <div class="share" v-if="article.def2">
                <Poptip trigger="hover" placement="bottom">
                    <Card style="width:40px;height: 40px;text-align: center;vertical-align: middle;display: table-cell;">
                        <Icon type="android-share-alt"></Icon>
                    </Card>
                    <div class="api" slot="content">
                        <p data-v-3d08df60="" style="text-align: center; font-weight: bolder;font-size: 14px;line-height: 1.5;">扫一扫分享到微信</p>
                        <img style="width: 150px;height: 150px;" :src="article.def2">
                    </div>
                </Poptip>
            </div>
            <div class="toTop" @click="goToTop">
                <Card style="width:40px;height: 40px;text-align: center;vertical-align: middle;display: table-cell;">
                    <Icon type="chevron-up"></Icon>
                </Card>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    var vm;
    import Card from 'iview/src/components/card'
    import Icon from 'iview/src/components/icon'
    import Poptip from 'iview/src/components/poptip'
    import loading from '../components/loading'
    export default {
        name: 'articleLocalPreview',
        data (){
            return {
                article: {},
                actid: '',
                json:{
                    title:"预览",
                    right:[{
                        type : 'Button',
                        label : '编辑',
                        size:'small',
                        buttontype : 'primary',
                        onclick : function() {
                            vm.$router.push({
                                path:"kong2",
                                query:{
                                    actid: vm.actid,
                                    yulan: true
                                }
                            });
                        }
                    }
                    ],
                    left:[{
                        type : 'Button',
                        svg : '#icon-fanhui',
                        buttontype : 'text',
                        onclick : function() {
                            vm.$router.push("articleList");
                        }
                    }]

                },
                isLoading: true
            }
        },
        components: {
            Card,
            Icon,
            Poptip,
            loading
        },

        created: function(){
            vm = this;
            this.$emit("change",1);
            this.actid = this.$route.query.actid;
            if(this.actid && !this.$store.state.article.articlecontent.id) {
                this.getArticle();
            }else {
                debugger;
                this.isLoading = false;
                this.article = this.$store.state.article.articlecontent;
                this.actid = this.article.id;
                this.article.articletitle = this.article.html[0];
                this.article.articlecontent = this.article.html[2];
            }
            //this.article = this.$store.state.article.articlecontent;
            //this.actid = this.article.id;
            //this.article.articletitle = this.article.html[0];
            //this.article.articlecontent = this.article.html[2];
        },

        methods:{
            getArticle () {
                debugger;
                var url = this.$store.state.serverHost + 'cmy/article/cmyarticle/getArticle';
                this.$http.get(url,{
                    params:{
                        id: this.actid
                    }
                }).then(function(res){
                    debugger;
                    vm.isLoading = false;
                    vm.article = res.data.rows[0];

                }).catch(function (error) {
                    console.log(error);
                });
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
    .toTop {
        position: fixed;
        bottom: 100px;
        right: 75px;
        cursor: pointer;
    }
    .share {
        position: fixed;
        top: 100px;
        right: 75px;
        cursor: pointer;
    }
</style>
 