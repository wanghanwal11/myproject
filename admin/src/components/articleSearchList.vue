/**
* Created by bk on 2017/9/26.
*/
<template>
    <div class="item">
        <Row :gutter="30">
            <Col span="7">
            <div style="display:flex;align-items:center;" :style="{height: height + 'px'}">
                <div class="articlePic" :style="{backgroundImage:'url('+article.imgPath+')'}"></div>
            </div>
            </Col>
            <Col span="17">
                <LazyLayout orient="v" :style="{height: height + 'px'}">
                    <slot name="articleInfo">
                        <LazyBox>
                            <div class="articleInfo">
                                <div class="articleTitle" :style="{fontSize: titleSize+'px'}">
                                    <slot name="articleTitle">
                                        <span v-html="article.title">{{}}</span>
                                    </slot>
                                    <slot name="collectBtn"></slot>
                                </div>
                                <slot name="articleContent">
                                    <div class="articleContent" v-html="article.info">
                                        {{}}
                                    </div>
                                </slot>
                                <slot name="articleGroup">
                                    <div class="articleGroup">
                                        <svg class="articleGroup-icon" aria-hidden="true">
                                            <use xlink:href="#icon-biaoqian1"></use>
                                        </svg>
                                        <span style="margin-left: 25px" v-if="article.type === 'cmyarticle'">文章</span>
                                        <span style="margin-left: 25px" v-else>活动</span>
                                    </div>
                                </slot>
                            </div>
                        </LazyBox>
                    </slot>
                    <slot name="articleFooter">
                        <div class="articleFooter">
                            <span>{{article.account}}</span>
                            <span>{{article.timeFormat}}</span>
                        </div>
                    </slot>
                </LazyLayout>

            </Col>
        </Row>
    </div>
</template>
<script type="es6">
    import {Row,Col} from 'iview/src/components/grid'
    export default {
        name: 'articleSearchList',
        props: {
            data: {
                type: Object,
                default () {
                    return {};
                }
            },
            height: {
                type: [String, Number],
                default: 140
            },
            titleSize: {
                type: [String, Number],
                default: 20
            }
        },
        data () {
            return {
                article: this.data
            }
        },
        components: {
            Row,
            Col
        },
        created: function(){

        },
        methods: {

        }
    }

</script>
<style scoped>
    .item {
        padding: 20px;

    }
    .articlePic {
        width: 100%;
        padding-top: 56.25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .articleInfo {
        /*height: 120px*/
    }
    .articleTitle {
        color: #333333;
    }
    .articleContent {
        margin-top: 10px;
        font-size: 14px;
        color: rgb( 143, 143, 143 );
    }
    .articleFooter {
        height: 20px;
        font-size: 14px;
        color: rgb( 187, 187, 187 );
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
</style>
 