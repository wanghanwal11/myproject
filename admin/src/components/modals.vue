<template>
  <Modal v-model="modal" :title=title @on-ok="ok" @on-cancel="cancel" :width="width">
    <div slot="header" v-if="isheader">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </Modal>
</template>

<script>
  import Modal from 'iview/src/components/modal'
    export default {
        created:function(){
            var vm=this;
            this.$eventHub.$on("changemodal",function(val){
              vm.modal=val;
            })
        },
        data () {
            return {
              modal:false
            }
        },
        props:{
            width:{
                type:String,
                default:"760"
            },
            title:{
              type:String,
              default:""
            },
            isheader:{
              type:Boolean,
              default:false
            }
        },
        components: {
          Modal
        },
        methods: {
            ok(){
                this.$emit("ok")
            },
          cancel(){
                this.$emit("cancel")
          }
        }
    }
</script>

<style scoped>
</style>
