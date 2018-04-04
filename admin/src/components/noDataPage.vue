/**
* Created by bk on 2017/11/6.
*/
<template>
    <div style="height: 100%;display: flex;justify-content: center;margin-top:15%;">
        <div>
            <img src="../assets/images/noData.png" alt="" style="width: 260px;height: 260px;"/>
            <div style="text-align: center;font-size:16px;color:#666666;">暂无相关数据...</div>
            <div class="btn" @click="routeTo">点击新建</div>
        </div>
    </div>
</template>
<script type="es6">
    export default {
        name: 'noDataPage',
        data () {
            return {
                
            }
        },
        props:{
            path:{
                type:String,
                default:""
            }
        },
        methods: {
            routeTo() {
                this.$router.push(this.path);
            }
        }
    }

</script>
<style scoped>
.btn {
    width: 100px;
    height: 36px;
    color: #2b85e4;
    background-color: transparent;
    border: 1px solid  #2b85e4;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    white-space: nowrap;
    line-height: 1.9;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 4px;
    margin: 30px auto 0;
}
.btn:hover{
    background:#2b85e4;
    color:#fff;
}
</style>
 