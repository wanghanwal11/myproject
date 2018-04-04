<template>
  <LazyLayout class="LazyLayoutBg" align="" justify="">
    <LazyLayout class="iphone" orient="v">
      <div class="titleInput inputdiv">{{titleInputValue}}</div>
      <div class="authorInput inputdiv">{{authorInputValue}}</div>
      <div v-html="html" class="content"></div>
    </LazyLayout>
  </LazyLayout>
</template>

<script>
    export default {
        created() {
          this.$eventHub.$on('LazyPhoneHtml',(arr)=>{
              this.titleInputValue = arr[0];
              this.authorInputValue = arr[1];
              this.html = this.clearStr(arr[2]);
          });
        },
        data() {
              return {
                titleInputValue : '标题',
                authorInputValue : '作者',
                html:""
              }
        },
        methods : {
          clearStr(str) {
            return str = str.replace(/\<([a-z]*?)\s.*?\>/g, function(str,str2) {
                if(str.indexOf("<img")==-1) {
                  return str.replace(/(\d*)px/g,function(s1,s2) {
                    var v = parseInt(s2/3);
                    if(v!==0)return v+"px";
                    else return s2+"px";
                  });
                }else {
                  return str;
                }
              })
           }
        }
    }
</script>

<style scoped>
  .LazyLayoutBg {
    width: 225px;
    height: 450px;
    background-image: url("../../../static/images/iPhone.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
    position: relative;
  }
  .inputdiv {
    height: 30px;
    width: 100%;
  }
  .authorInput {
    border-bottom: 1px solid #ccc;
  }
  .iphone {
    width: 190px;
    height: 335px;
    top: 58px;
    left: 17px;
    position: absolute;
    background-color: #fff;
  }
  .content{
    word-wrap: break-word;
    overflow: auto;
    letter-spacing: 0.15em;
    line-height: 1.5;
  }

</style>
<style>
  .iphone img {
    max-width: 100%;
  }
</style>
