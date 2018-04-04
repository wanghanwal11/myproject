<template>
  <LazyLayout>
    <div :style="{width: widths,height:heights}">
      <vueCropper
        ref="cropper"
        :img="img"
        :outputSize="example2.size"
        :outputType="example2.outputType"
        :info="example2.info"
        :canScale="example2.canScale"
        :autoCrop="example2.autoCrop"
        :fixed="example2.fixed"
        :fixedNumber="example2.fixedNumber"
      ></vueCropper>
    </div>
    <LazyBox>
      <div style="text-align: center;">
        <div style="padding: 10px 0"  @click="changeScale(1)">
          <Icon type="android-add-circle"   size="20"></Icon>
        </div>
        <div style="padding: 10px 0" @click="changeScale(-1)">
          <Icon type="android-remove-circle"  size="20"></Icon>
        </div>
        <div style="padding: 10px 0"  @click="rotateRight()">
          <Icon type="loop" size="20"></Icon>
        </div>
      </div>
    </LazyBox>
  </LazyLayout>
</template>
<script>
  import { Icon} from 'iview'
  import VueCropper from "vue-cropper"
    export default {
        mounted(){

        },
      props:{
        img:{
          type:String,
          default:""
        },
        widths:{
          type:String,
          default:"400px"
        },
        heights:{
          type:String,
          default:"222px"
        }

      },
        data () {
            return {
              example2: {
                info: true,
                size: 1,
                outputType: 'png',
                canScale: true,
                autoCrop: true,
                // 开启宽度和高度比例
                fixed: true,
                fixedNumber:[9,5]
              },
            }
        },
      components : {
        VueCropper,
        Icon,
      },
        methods: {
          changeScale (num) {
            num = num || 1
            this.$refs.cropper.changeScale(num)
          },
          rotateRight () {
            this.$refs.cropper.rotateRight()
          },
          finish (type) {
            // 输出
            if (type === 'blob') {
              this.$refs.cropper.getCropBlob((data) => {
                var test = window.open('')
                this.$emit('finishend',window.URL.createObjectURL(data))
              })
            } else {
              this.$refs.cropper.getCropData((data) => {
                this.$emit('finishend',data)
              })
            }
          }

        }
    }
</script>

<style>
</style>
