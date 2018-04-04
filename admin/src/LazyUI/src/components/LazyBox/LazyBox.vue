<template>
    <div :class="className">
        <template v-if="visible1==true">
          <div class="LazyBoxDiv">
            <div class="LazyBoxDiv2">
              <slot></slot>
            </div>
          </div>
        </template>
        <template v-else>
          <slot></slot>
        </template>
    </div>
</template>

<script>
    export default {
        created () {
          if(this.m1 || this.m2 || this.m3 || this.m4) {
            this.className = 'LazyBox box';
            this.visible1 = false;
          }
          if(this.span != undefined) {
            this.className = 'LazyBox box LazyBox_w_0 box_f'+this.span;
          }
          if(this.auto != undefined) {
            this.visible1 = this.auto;
          }
          this.m1 && (this.className += ' box_m1_' + this.m1);
          this.m2 && (this.className += ' box_m2_' + this.m2);
          this.m3 && (this.className += ' box_m3_' + this.m3);
          this.m4 && (this.className += ' box_m4_' + this.m4);
         },
        props : ['span', 'm1', 'm2', 'm3', 'm4', 'auto'],
        data () {
            return {
              className: 'LazyBox box LazyBox_w_0 box_f1',
              visible1 : true
            }
        }
    }
</script>

<style>
  .LazyBox {
    position: relative;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .LazyBoxDiv {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding: inherit;
  }
  .LazyBoxDiv2{
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  @media screen and (min-width:1366px){
    .box_m4_1 {
      width: 8.33%;
    }
    .box_m4_2 {
      width: 16.66%;
    }
    .box_m4_3 {
      width: 25%;
    }
    .box_m4_4 {
      width: 33.33%;
    }
    .box_m4_5 {
      width: 41.66%;
    }
    .box_m4_6 {
      width: 50%;
    }
    .box_m4_7 {
      width: 58.33%;
    }
    .box_m4_8 {
      width: 66.66%;
    }
    .box_m4_9 {
      width: 75%;
    }
    .box_m4_10 {
      width: 83.33%;
    }
    .box_m4_11 {
      width: 91.66%;
    }
    .box_m4_12 {
      width: 100%;
    }
  }
  @media screen and (min-width: 1200px) and (max-width: 1366px) {
    .box_m3_1 {
      width: 8.33%;
    }
    .box_m3_2 {
      width: 16.66%;
    }
    .box_m3_3 {
      width: 25%;
    }
    .box_m3_4 {
      width: 33.33%;
    }
    .box_m3_5 {
      width: 41.66%;
    }
    .box_m3_6 {
      width: 50%;
    }
    .box_m3_7 {
      width: 58.33%;
    }
    .box_m3_8 {
      width: 66.66%;
    }
    .box_m3_9 {
      width: 75%;
    }
    .box_m3_10 {
      width: 83.33%;
    }
    .box_m3_11 {
      width: 91.66%;
    }
    .box_m3_12 {
      width: 100%;
    }
  }
  @media screen and (min-width: 992px) and (max-width: 1200px) {
    .box_m2_1 {
      width: 8.33%;
    }
    .box_m2_2 {
      width: 16.66%;
    }
    .box_m2_3 {
      width: 25%;
    }
    .box_m2_4 {
      width: 33.33%;
    }
    .box_m2_5 {
      width: 41.66%;
    }
    .box_m2_6 {
      width: 50%;
    }
    .box_m2_7 {
      width: 58.33%;
    }
    .box_m2_8 {
      width: 66.66%;
    }
    .box_m2_9 {
      width: 75%;
    }
    .box_m2_10 {
      width: 83.33%;
    }
    .box_m2_11 {
      width: 91.66%;
    }
    .box_m2_12 {
      width: 100%;
    }
  }
  @media only screen and (max-width:992px){
    .box_m1_1 {
      width: 8.33%;
    }
    .box_m1_2 {
      width: 16.66%;
    }
    .box_m1_3 {
      width: 25%;
    }
    .box_m1_4 {
      width: 33.33%;
    }
    .box_m1_5 {
      width: 41.66%;
    }
    .box_m1_6 {
      width: 50%;
    }
    .box_m1_7 {
      width: 58.33%;
    }
    .box_m1_8 {
      width: 66.66%;
    }
    .box_m1_9 {
      width: 75%;
    }
    .box_m1_10 {
      width: 83.33%;
    }
    .box_m1_11 {
      width: 91.66%;
    }
    .box_m1_12 {
      width: 100%;
    }
  }
</style>

