/**
* Created by bk on 2017/3/28.
*/
<template>
    <div class="map">
        <div class="left"></div>
        <div class="top"></div>
    </div>
</template>

<script>
    import myAmap from '../components/amap'

    export default {
        name: 'test',
        components: {
            myAmap
        }
    }
</script>

<style scoped>

.left{
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        width: 230px;
        border-radius: 0px;
        z-index: 2;
        box-shadow: 0px 1px 1px 0px rgb( 60, 102, 165 );
        background: linear-gradient(#3c7ce6, #325ccc); 
    }
.top{
        position: fixed;
        top: 0px;
        left: 230px;
        right: 0px;
        height: 62px;
		border-bottom: 1px solid #aaa;
		z-index: 9;
		background: #eee;
    }
</style>

 