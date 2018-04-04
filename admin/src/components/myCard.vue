<template>
    <div>
      <Row v-for="(list,index) in lists" :key="index" style="margin-bottom: 50px;">
        <div class="dateBox" style="font-size: 14px;margin:0 0 30px 15px;">
          <span style="color: #3c7ce6;">{{list.number}}</span>
          <span  style="cursor: pointer;float:right;margin-right:2.5%;" @click="tract(list)" >
            <!--<Icon  type="chevron-down" style="color: #a8aeb6;"></Icon>-->
            <Icon v-if="list.backflag" type="chevron-down" style="color: #a8aeb6;"></Icon><Icon v-else type="chevron-up" style="color: #a8aeb6;"></Icon>
            <!--<Icon type="chevron-up"></Icon>-->
          </span>
          <span style="font-size:12px;color:#a8aeb6;padding-left:6px;">{{list.votecount}}</span>
        </div>

        <Col :xs="24" :sm="12" :md="8" :lg="6" v-for="(value,i) in list.users" :key="i"  style="margin: 0 25px 10px 0;" :class="{hide: list.backflag}">
          <div style="width: 190px;height: 90px;border-bottom:1px solid #d7dde4;margin-left: 15px;padding-top: 20px;">
            <div style="width: 55px;height: 55px;border-radius: 55px;background-color: #00b8ff;float: left;background-size: cover" :style="{backgroundImage:'url('+ value.headpicture +')'}"></div>
            <div style="float: left;margin-left: 10px;max-width: 125px;">
              <p style="margin: 5px 0 15px 0;color: #333333;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{value.username||'游客'}}</p>
              <span style="color: #999999;">{{value.votetime}}</span>
            </div>
          </div>
        </Col>

        <!--<centerlist :width="wid" :number="195">-->
            <!--<div  v-for="(value,index) in list.arr" :key="index"  style="margin: 0 35px 10px 0;float: left;" :class="{hide: list.backflag}">-->
              <!--<div style="width: 180px;height: 90px;border-bottom:1px solid #d7dde4;margin-left: 15px;padding-top: 20px;">-->
                <!--<div style="width: 55px;height: 55px;border-radius: 55px;background-color: #00b8ff;float: left;"></div>-->
                <!--<div style="float: left;margin-left: 10px;">-->
                  <!--<p style="margin: 5px 0 15px 0;color: #333333;">{{value.title}}</p>-->
                  <!--<span style="color: #999999;">{{value.time}}</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
        <!--</centerlist>-->

        <div v-if="list.users.length>=10&&(!list.backflag)" style="width: 100%;float:left;text-align: center;margin-top:10px;cursor: pointer;" @click="more(list.id,index)">
          <span v-if="list.noUser==1">已无更多...</span>
          <span v-else>更多</span>

          <!--<Icon v-if="list.backflag" type="chevron-up" style="color: #a8aeb6;"></Icon>-->
          <Icon v-if="list.noUser!=1" type="chevron-down" style="color: #a8aeb6;"></Icon>
        </div>
      </Row>
    </div>
</template>
<script>
  import {Row,Col,Icon}  from 'iview';
  import centerlist from '../components/centerlist.vue';
    var vm;
    export default {
        data () {
            return {
            }
        },
        props:{
            lists:{
                type:Array,
                default:[]
            },
            wid: {
              type: Number,
              default:0
            }
        },

        created: function () {
            vm = this;
        },
        components: {
          Row,
          Col,
          Icon,
          centerlist
        },
        methods: {
          tract (list) {
           vm.$set(list, 'backflag', !list.backflag);
          },
          more(id,i){
            this.$emit('more',{id:id,i:i})
          }
        }

    }
</script>
<style scoped>
  .hide{
    display: none;
  }
</style>
