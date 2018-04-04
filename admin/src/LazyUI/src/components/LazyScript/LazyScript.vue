<template>
    <LazyScriptDiv @onload="onload" class="LazyScript" :src="src"></LazyScriptDiv>
</template>

<script>

    export default {

        components : {
            'LazyScriptDiv' : {
              render(createElement) {
                var self = this;
                return createElement('script', {on:{load : function() {self.$emit('onload')}}, attrs: {type: 'text/javascript', src: this.src}});
              },
              props: ['src']
            }
        },
        props: ['src'],
        methods : {
          onload : function() {
            this.$emit('onload')
          }
        }
    }
</script>
