<template>
  <div :class="['LazyInput',{'LazyInputError':error}]">
    <Input @on-focus="inputfocus" @on-keydown="keydown" :icon="icon" placeholder="请输入..."></Input>
  </div>
</template>

<script>
    import Input from 'iview/src/components/input'
    var vm = null
    export default {
      data () {
        return {
          t: null,
          error : false,
          newformat : ''
        }
      },
      props : ['format','icon'],
      created:function(){
        vm = this;
        vm.newformat = vm.format.replace(/\d|[a-z]|[A-Z]/g,'_')
      },
      components:{
        Input
      },
      methods:{
        inputerror() {
          vm.error = true
          if(vm.t)clearTimeout(vm.t)
          vm.t = setTimeout(function () {
            vm.error = false
            vm.t = null
          },500)
        },
        inputfocus() {
          if(event.target.value=="") {
            vm.inputformat(event.target)
          }
        },
        keydown(event) {
          vm.inputformat(event.target)
        },
        inputformat(input) {

          if(input.value=="") {
            vm.$emit('change','')
            var i = vm.newformat.indexOf('_')
            if(i!=-1) {
              input.value = vm.newformat
              input.selectionStart = i
              input.selectionEnd = i
            }
          }else if(vm.newformat.length >= input.value.length){
            event.preventDefault()
            if(event.keyCode == 8 || event.keyCode == 46 || (event.keyCode>=65 && event.keyCode<=90) || (event.keyCode>=48 && event.keyCode<=57) || (event.keyCode>=96 && event.keyCode<=105)) {
              //a-z 0-9
              var i = input.selectionStart
              //end
              var arr = input.value.split("")
              if(event.keyCode==8) {
                for(var j = i-1; j >= 0; j--) {
                  if(arr[j].match(/[A-Za-z0-9_]/)) {
                    arr.splice(j,1,'_')
                    input.value = arr.join("")
                    input.selectionStart = j
                    input.selectionEnd = j
                    vm.$emit('change',input.value)
                    return
                  }
                }
              }else if(event.keyCode==46) {
                for(var j = i;j < arr.length; j++) {
                  if(arr[j].match(/[A-Za-z0-9_]/)) {
                    arr.splice(j,1,'_')
                    input.value = arr.join("")
                    input.selectionStart = j+1
                    input.selectionEnd = j+1
                    vm.$emit('change',input.value)
                    return
                  }
                }
              }else {
                for(var j = i;j < arr.length; j++) {
                  if(arr[j].match(/[A-Za-z0-9_]/)) {
                    if(!vm.pan(event.key,j)) {
                      vm.inputerror()
                      return
                    }
                    arr.splice(j,1,event.key)

                    input.value = arr.join("")
                    input.selectionStart = j+1
                    input.selectionEnd = j+1
                    vm.$emit('change',input.value)
                    return
                  }
                }
              }
            }else {
              vm.inputerror()
            }
          }
        },
        pan(key,i) {
          //判断数字字母
          var s1 = key
          var s2 = vm.format.charAt(i)
          var szre = /\d/
          var zmre = /[A-Za-z]/
          if(s2=='_')return true
          if(szre.test(s1) && szre.test(s2))return true
          else if(zmre.test(s1) && zmre.test(s2))return true
          return false
        }
      }
    }
</script>

<style>
  .LazyInputError .ivu-input-icon {
    color: #ed3f14;
  }
  .LazyInputError .ivu-input {
    border: 1px solid #ed3f14;
  }
  .LazyInputError .ivu-input:focus {
    border-color: #ed3f14;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(237,63,20,.2);
  }
</style>

