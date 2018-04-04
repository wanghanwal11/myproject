<template>
    <div class="tagBox">
      <p style="margin-bottom: 20px;">{{title}}</p>
      <span class="tag" v-if="" :class="{Border:suoyin==index}" v-for="(item,index) in items" :key="index" @click="dj(index)">
        {{item}}
        <i v-if="suoyin==index" @click="close(index)">x</i>
      </span>
    </div>
</template>
<script>
    var vm;
    export default {

        data () {
            return {
                bol:'',
                index:'',
                suoyin:''
            }
        },
        props: {
            title: String,
            items: {
              type: Array,
              default: []
          }
        },

        created: function () {
            vm = this;
        },
        components: {},
        methods: {
            dj(index){
                this.suoyin=index;
            },
            close(index){
                this.items.splice(index,1);
            }
        }

    }
</script>
<style scoped>
  .tag{
    float: left;
    position: relative;
    margin: 0 20px 10px 0;
    text-align: center;
    min-width: 60px;
    border:2px solid transparent;

    background-color: #f7f5fa;
    color: #999999;
    cursor:pointer;
  }
  .Border{
    border:2px solid #e30b0b!important;
  }
  i{
    position: absolute;
    font-style: normal;
    width: 14px;
    height: 14px;
    line-height: 12px;
    background-color: #e30b0b;
    border-radius: 7px;
    color: #fff;
    top: -8px;
    right: -8px;
    font-size: 10px;
  }
</style>
