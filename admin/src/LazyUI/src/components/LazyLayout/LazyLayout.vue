<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    created () {
      var _name = 'LazyLayout LazyLayout_h box'
      if(this.orient == 'v') {
        _name = 'LazyLayout LazyLayout_v box box_v'
      }
      switch(this.justify) {
        case 'strat' :
          _name += ' box_strat'
          break;
        case 'end' :
          _name += ' box_end'
          break;
        case 'center' :
          _name += ' box_center'
          break;
        case 'between' :
          _name += ' box_between'
          break;
        case 'around' :
          _name += ' box_around'
          break;
      }
      switch(this.align) {
        case 'strat' :
          _name += ' box_i_strat'
          break;
        case 'end' :
          _name += ' box_i_end'
          break;
        case 'center' :
          _name += ' box_i_center'
          break;
      }
      switch(this.wrap) {
        case 'top' :
          _name += ' box_hht'
          break;
        case 'bottom' :
          _name += ' box_hhb'
          break;
      }
      this.className = _name;
    },
    props : ['justify', 'align', 'orient', 'wrap'],
    data () {
      return {
        className : 'LazyLayout LazyLayout_h box'
      }
    }
  }
</script>
<style>
  .LazyLayout{
    width: auto;
    height:auto;
    -webkit-box-sizing:border-box;
    -moz-box-sizing: border-box;
    box-sizing:border-box;
    position:relative;
  }
  .LazyLayout_h>.LazyBox_w_0 {
      width: 0;
  }
  .LazyLayout_v>.LazyBox_w_0 {
    height: 0;
  }
</style>
