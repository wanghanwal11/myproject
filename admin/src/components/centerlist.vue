<template>
    <div :style="{width:liecount*number+'px',marginLeft:-1*liecount*number/2+'px'}" style="left: 50%;position: relative">
      <slot></slot>
    </div>
</template>

<script>
    export default {
        mounted(){
          this.initcount();
          window.addEventListener('resize',this.initcount);
        },
        props:{
          number:{
              type:Number,
              default:190
          },
          width:{
            type:Number,
            default:0
          }
        },
        data () {
            return {
              liecount:2
            }
        },
        watch:{
          width(){
            this.initcount()
          }
        },

        components: {},
        methods: {
          initcount(){
            this.liecount=parseInt(parseInt(this.width?this.width:window.innerWidth)/this.number)
          }
        }
    }
</script>

<style scoped>

</style>
