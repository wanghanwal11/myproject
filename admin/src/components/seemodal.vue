<style scoped>
  .expand-row{
    padding: 5px;
  }
  .expand-row span{
    word-break: break-all;
  }
  .seemodal{
    margin: 10px;
    background: white;
    margin-top: 50px;
    max-height: 300px;
    overflow: auto;
    min-height: 150px;
  }
</style>
<template>
  <div class="seemodal">
    <Row class="expand-row">
      <Col span="24">
      <span class="expand-value"  style="font-size: 16px" >{{ title}}</span>
      </Col>
    </Row>
    <Row class="expand-row"  v-for="(item,index) in items" :key="index" v-if="index=='开头语'" style="">
      <Col span="24">
      <span class="expand-value"  style="color: #223655;font-size: 14px" >{{ item}}</span>
      </Col>
    </Row>
    <Row class="expand-row"  v-for="(item,index) in items" :key="index" v-if="index!='开头语'&&index!='结束语'">
      <Col span="24">
      <span class="expand-key"  >{{index}}:</span>
      <span class="expand-value"  >{{ item}}</span>
      </Col>
    </Row>
    <Row class="expand-row"  v-for="(item,index) in items" :key="index" v-if="index=='结束语'"  style="">
      <Col span="24">
      <span class="expand-value"   style="color: #223655;font-size: 14px">{{ item}}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { Row,Col } from 'iview'
  export default {
    props: {
      items: Object,
      title: String
    },
    components: {
      Row,Col
    },
  };
</script>
