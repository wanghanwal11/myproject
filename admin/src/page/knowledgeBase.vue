/**
* Created by bk on 2017/3/28.
*/
<template>
    <div>
        <div class="development">
            <div style="height:44px;">
              <Affix :offset-top="45">
                 <LazyTopbar :data="json">
                      <img style="width: 130px;height: 130px;" :src="img" slot="Button">
                 </LazyTopbar> 
              </Affix>
            </div>

            <LazyLayout>
                <div style="width:100%;height:100%;box-sizing:border-box;">
                    <div class="imgBox">
                        <img src="../assets/images/daikaifa.png" alt="">
                        <p style="width:200px;height:30px;text-align:center;line-height:30px;font-size:16px;margin-top:15px;color:#666666;padding-left:40px;">即将开放，敬请期待...</p>
                    </div>
                </div>
            </LazyLayout>

        </div>
    </div>
</template>

<script type="es6">

    import Input from 'iview/src/components/input'
    import Affix from 'iview/src/components/affix'
    export default {
        data(){
            return{
                json:{
                    title:"知识库"
                }
            }
        },
        components: {
            Input,
            Affix
        }
       
    }
</script>

<style scoped>
    
    .imgBox{
        width:200px;
        height:200px;
        margin:16% auto;
    }

    .imgBox img{
        width:260px;
        height:260px;
    }

</style>

 