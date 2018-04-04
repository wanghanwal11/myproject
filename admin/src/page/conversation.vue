/**
* Created by bk on 2017/9/14.
*/
<template>
    <div class="box box_v" style="width:100%;height:100%;">
        <LazyTopbar :data="json" style="position:fixed;top:0px;z-index:11;padding-right:235px;">
            
        </LazyTopbar>
        <router-view></router-view>
    </div>
</template>
<script type="es6">
    var vm;
    import titletab from '../components/titletab'
    export default {
        name: 'activity',
        components: {
            titletab
        },
        data () {
            return {
                json:{
                    title:"消息"  
                },
                
            }
        },
        created: function(){
            
        },
        methods: {
            
        }
    }

</script>
<style scoped>

</style>
