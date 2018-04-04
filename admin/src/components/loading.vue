/**
* Created by bk on 2017/11/15.
*/
<template>
    <div class="showLoading">
        <Spin fix style="background: transparent;">
            <Icon type="load-c" size=16 class="demo-spin-icon-load"></Icon>
            <slot name="tip">
                <div style="display: inline-block;font-size: 16px">正在加载...</div>
            </slot>
        </Spin>
    </div>
</template>
<script type="es6">
    import Spin from 'iview/src/components/spin'
    import Icon from 'iview/src/components/icon'
    export default {
        name: 'loading',
        data () {
            return {
                
            }
        },
        components: {
            Spin,
            Icon
        }
    }

</script>
<style scoped>
    .showLoading {
        height: 100%;
        /*display: flex;*/
        /*justify-content: center;*/
        /*margin-top:15%;*/
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
</style>
 