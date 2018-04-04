<template>
  <editor :content="content" :height="300"></editor>
</template>
<script>
  
  import VueHtml5Editor from 'vue-html5-editor'
    var vm;
    const editor = new VueHtml5Editor({
        showModuleName: true,
        image: {
            sizeLimit: 512 * 1024,
            compress: true,
            width: 500,
            height: 500,
            quality: 80
        }})
    export default {

        data () {
            return {
                content : '123'
            }
        },

        created:function(){
            vm = this; 
        },
        components:{
          editor
        },
        methods:{
            

        }

    }
</script>
