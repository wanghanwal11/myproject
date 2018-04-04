<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row"  v-for="(item,index) in items" :key="index">
      <Col span="24">
      <span  style="text-align: right;display: inline-block;min-width: 100px;">{{index}}</span>
      <span  style="margin-left: 20px;display: inline-block" v-html="item">{{ item}}</span>
      </Col>
    </Row>
  </Row>
  </div>
</template>
<script>
  import { Row,Col } from 'iview'
  export default {
    props: {
      items: Object
    },
    components: {
      Row,Col
    },
  };
</script>
