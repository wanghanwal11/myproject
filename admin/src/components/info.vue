/**
* Created by bk on 2017/8/15.
*/
<template>
    <div class="appealDetails">
        <LazyLayout orient="v" class="wraps">

            <!-- 事件 -->
            <LazyLayout class="kuai" dis-hover align="center" @click="seeToDetail('appealDetails')">
                    <div class="orderInfo" style="width: 150px;border-right: 1px solid #eeeeee;">
                        <span style="cursor: pointer;margin-left:16px;">事件编号  {{ eventnum }}</span>
                    </div>
                    <div class="orderInfo">
                        <span><img src="../assets/images/moren.png" alt="" style="width: 40px;height: 40px;vertical-align: middle;display: inline-block;border-radius: 50%;margin-left:15px;"></span>
                        <span style="word-break: break-word;white-space: pre-wrap;padding-left:8px;">{{ username }}</span>
                    </div>
                    <div class="orderInfo" style="width:187px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer">
                        <span class="phone">
                            <svg class="title-icon" aria-hidden="true">
                                <use xlink:href="#icon-dianhua4"></use>
                            </svg>
                        </span>
                        <span class="phonenum">{{ userphone }}</span>
                    </div>
            </LazyLayout>
            <!-- 事件 -->

            <!-- 图片区域 -->
            <LazyLayout class="kuai" orient="v">
                <div style="height:30px;border-bottom:1px solid #ccc;">
                    <svg class="title-icons" aria-hidden="true">
                        <use xlink:href="#icon-img"></use>
                    </svg>
                    <span style="padding-left:5px;font-size:13px;">图片</span>
                </div>

                <LazyLayout align="center" wrap="top" style="width:100%; min-height:150px;cursor:pointer">
                    <template v-if="imgs.length">
                        <Modal v-model="modal10" width="400" :title="(imgindex+1)+'/'+imgs.length">
                            <img class="img" style="width: 100%;" :src="imgsrc">
                             <div slot="footer">
                            </div>
                            <div class="btn1" @click="imgChange(-1)"></div>
                            <div class="btn2" @click="imgChange(1)"></div>
                        </Modal>
                        <img class="img" v-for="(value, index) in imgs" :src="imgs[index]" @click="modalShow(index)" />
                    </template>

                    <template v-else>
                       <div style="margin:0 auto;">没有上传任何照片</div>
                    </template>
                </LazyLayout>
            </LazyLayout>
            <!-- 图片区域 -->

            <!-- 举报 -->
            <LazyLayout class="kuai">
                <p class="info">{{ content }}</p>
            </LazyLayout>
            <!-- 举报 -->

            <!-- 标签 -->
            <!-- <LazyLayout class="kuai" orient="v">
                <div style="height:30px;border-bottom:1px solid #ccc;">
                    <svg class="title-icons" aria-hidden="true">
                        <use xlink:href="#icon-cantingmingcheng"></use>
                    </svg>
                    <span style="padding-left:5px;font-size:13px;">标签</span>
                </div>
                <LazyLayout align="center" wrap="top" style="width:100%; min-height:77px;">
                    <template v-if="tag">
                        <div class="biaoqian">
                           {{ tag }}
                        </div>
                    </template>
                    <div v-else class="wu">没有任何标签</div>
                </LazyLayout>
            </LazyLayout> -->
            <!-- 标签 -->

            <!-- 举报 -->
            <LazyLayout class="kuai">
                <p class="info">
                    <span>
                        <svg class="title-icon" aria-hidden="true">
                            <use xlink:href="#icon-dingwei"></use>
                        </svg>
                    </span>
                    <span style="padding-left:7px;">{{ address }}</span>
                </p>
            </LazyLayout>
            <!-- 举报 -->

            <!-- 线条 -->
            <!-- <div>
                <div style="height:50px;border-bottom:1px dotted #ccc;"></div>
                <div style="height:50px;"></div>
            </div> -->
            <!-- 线条 -->

        </LazyLayout>
    </div>
</template>


<script>

    var vm;
    import Modal from 'iview/src/components/modal'
    import Carousel from 'iview/src/components/carousel'
    import CarouselItem from 'iview/src/components/carousel/carousel-item'

    export default {

        data () {
            return {
                modal10:false,
                value1:0,
                eventnum:"",
                userimg:"",
                username:"",
                userphone:"",
                content:"",
                address:"",
                tag:"",
                imgs:[],
                imgsrc:'',
                imgindex :0,
                id:0,
                code:"",
                json:{
                    title:"诉求"
                },
                reply:"",
                img:[]

            }
        },

        created:function(){
            vm = this;

            //获取路由传过来的id
            this.id = this.$router.history.current.query.routeParams;
            var url = this.$store.state.serverHost + this.$lazy.url.weixineventget;
            this.$http.get(url,{
                params:{
                    eventid:this.id
                }
            })
            .then(function(response){
                debugger;
                console.log(response);
                vm.eventnum = response.data.rows[0].eventNumber;
                vm.userimg = response.data.rows[0].headpicture;
                vm.username = response.data.rows[0].username;
                vm.userphone = response.data.rows[0].def2;
                vm.code = response.data.rows[0].def3;
                vm.content = response.data.rows[0].content;
                vm.id = response.data.rows[0].id;
                vm.tag = response.data.rows[0].tag;
                vm.address = response.data.rows[0].address;
                vm.reply = response.data.rows[0].reply;
                //子组件向父组件传值
                vm.$emit('getData',[vm.id,vm.code,vm.reply])
                var imgList = response.data.rows[0].imageList;
                for(var i in response.data.rows[0].imageList){
                    vm.imgs.push(response.data.rows[0].imageList[i].imgurl)
                }
            })
            .catch(function(error){
                console.log(error);
            })
        },
        components:{
            Modal,
            Carousel,
            CarouselItem
        },
        methods:{
            modalShow(index) {
                this.imgindex = index;
                this.modal10 = true;
                this.imgsrc = this.imgs[index];
            },
            imgChange(n) {
                if(n>0) this.imgindex ++;
                else this.imgindex--;
                if(this.imgindex > this.imgs.length-1)this.imgindex = 0;
                if(this.imgindex < 0)this.imgindex = this.imgs.length-1;
                this.imgsrc = this.imgs[this.imgindex];
            }
        }
    }
</script>


<style scoped>

    .btn1{
        width:50%;
        height:93%;
        position: absolute;
        left:0;
        top:50px;
        cursor: pointer;
    }

    .btn2{
        width:50%;
        height:93%;
        position: absolute;
        right:0;
        top:50px;
        cursor: pointer;
    }

    .wraps{
        padding: 20px 30px 0 30px ;
        box-sizing: border-box;
        min-width:950px;
    }

    .kuai {
        background:#fff;
        margin-bottom:10px;
        border:1px solid #e1e1e1;
        box-sizing:border-box;
        border-radius:5px;
        padding: 10px;
    }
    .kuai .img {
        width: 250px;
        height: 150px;
        margin: 15px 15px 0 0;
    }
    .phone{
        margin-left:40px;
    }

    .title-icon{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
        fill: #45c6d5;
        margin-top:-2px;
    }

    .title-icons{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        cursor: pointer;
        fill: #888888;
        margin-top:-2px;
    }

    .phonenum{
        padding-left:5px;
    }

    .info{
        padding:10px 0 10px 0;
        font-size:13px;
    }

    .biaoqian span{
        padding-right:10px;
    }

</style>