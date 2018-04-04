<template>
    <LazyLayout class="LazyTopbar" align="center">
      <!--left-->
      <LazyBox>
        <LazyLayout class="leftdiv" align="center">
        <template v-for="(left_value, left_key) in data.left">
          <template v-if="left_value.type=='RadioButton'">
            <Radio-group :class="left_value.class" v-model="left_value.label" type="button" @on-change="left_value.onchange(left_value.label)">
              <Radio v-for="left_value_obj in left_value.content" :label="left_value_obj.label" :key = "left_value_obj"></Radio>
            </Radio-group>
          </template>

          <template v-if="left_value.type=='ButtonGroup'">
            <Button-group :class="left_value.class">
              <template v-for="left_value_obj in left_value.content">
                <template v-if="left_value_obj.poptip!=undefined">
                  <Poptip :placement="left_value_obj.poptip.placement" :trigger="left_value_obj.poptip.trigger" :title="left_value_obj.poptip.title" :content="left_value_obj.poptip.content">
                    <Button :size="left_value_obj.size" type="primary" @click="ButtonGroupClick(left_value_obj.onclick)">{{left_value_obj.label}}</Button>
                    <div v-if="left_value_obj.poptip.content==undefined" slot="content">
                      <slot name="ButtonGroup"></slot>
                    </div>
                  </Poptip>
                </template>
                <template v-else>
                  <Button :size="left_value_obj.size" type="primary" @click="ButtonGroupClick(left_value_obj.onclick)">{{left_value_obj.label}}</Button>
                </template>
              </template>
            </Button-group>
          </template>

          <template v-if="left_value.type=='Button'">
            <template v-if="left_value.poptip!=undefined">
              <Poptip :placement="left_value.poptip.placement" :trigger="left_value.poptip.trigger" :title="left_value.poptip.title" :content="left_value.poptip.content">
                <Button :size="left_value.size" :class="left_value.class" @click="ButtonClick(left_value.onclick)" :icon="left_value.icon" :type="(left_value.buttontype || 'ghost')">
                  <svg v-if="left_value.svg" class="title-icon btnsvg">
                    <use :xlink:href="left_value.svg"></use>
                  </svg>
                  {{left_value.label}}
                </Button>
                <div v-if="left_value.poptip.content==undefined" slot="content">
                  <slot name="Button"></slot>
                </div>
              </Poptip>
            </template>
            <template v-else>
              <Button :size="left_value.size" :class="left_value.class" @click="ButtonClick(left_value.onclick)" :icon="left_value.icon" :type="(left_value.buttontype || 'ghost')">
                <svg v-if="left_value.svg" class="title-icon btnsvg">
                  <use :xlink:href="left_value.svg"></use>
                </svg>
                {{left_value.label}}
              </Button>
            </template>
          </template>

        </template>
        </LazyLayout>
      </LazyBox>
        <div class="title">{{data.title}}</div>
      <slot name="centertitle"></slot>
      <!--right-->
      <LazyBox>
      <LazyLayout class="rightdiv" justify="end" align="center">
        <template v-for="(right_value, right_key) in data.right">
          <template v-if="right_value.type=='RadioButton'">
            <Radio-group :class="right_value.class" v-model="right_value.label" type="button" @on-change="right_value.onchange(right_value.label)">
              <Radio v-for="right_value_obj in right_value.content" :label="right_value_obj.label"></Radio>
            </Radio-group>
          </template>

          <template v-if="right_value.type=='ButtonGroup'">
            <Button-group :class="right_value.class">
              <template v-for="right_value_obj in right_value.content">
                <template v-if="right_value_obj.poptip!=undefined">
                  <Poptip :placement="right_value_obj.poptip.placement" :trigger="right_value_obj.poptip.trigger" :title="right_value_obj.poptip.title" :content="right_value_obj.poptip.content">
                    <Button :size="right_value_obj.size" type="primary" @click="ButtonGroupClick(right_value_obj.onclick)">{{right_value_obj.label}}11111</Button>
                    <div v-if="right_value_obj.poptip.content==undefined" slot="content">
                      <slot name="ButtonGroup"></slot>
                    </div>
                  </Poptip>
                </template>
                <template v-else>
                  <Button :size="right_value_obj.size" type="primary" @click="ButtonGroupClick(right_value_obj.onclick)">{{right_value_obj.label}}</Button>
                </template>
              </template>
            </Button-group>
          </template>


          <template v-if="right_value.type=='Button'">
            <template v-if="right_value.poptip!=undefined">
              <Poptip :placement="right_value.poptip.placement" :trigger="right_value.poptip.trigger" :title="right_value.poptip.title" :content="right_value.poptip.content">
                <Button :size="right_value.size" :class="right_value.class" @click="ButtonClick(right_value.onclick)" :icon="right_value.icon" :type="(right_value.buttontype || 'ghost')">
                  <svg v-if="right_value.svg" class="title-icon btnsvg">
                    <use :xlink:href="right_value.svg"></use>
                  </svg>
                  {{right_value.label}}
                </Button>
                <div v-if="right_value.poptip.content==undefined" slot="content">
                  <slot name="Button"></slot>
                </div>
              </Poptip>
            </template>
            <template v-else>
              <Button :size="right_value.size" :loading="right_value.loading" :class="right_value.class" @click="ButtonClick(right_value.onclick)" :icon="right_value.icon" :type="(right_value.buttontype || 'ghost')">
                <svg v-if="right_value.svg" class="title-icon btnsvg">
                  <use :xlink:href="right_value.svg"></use>
                </svg>
                {{right_value.label}}
              </Button>
            </template>


          </template>

        </template>
      </LazyLayout>
      </LazyBox>
    </LazyLayout>
</template>

<script>
    import Button from 'iview/src/components/button';
    import Poptip from 'iview/src/components/poptip';
    import ButtonGroup from 'iview/src/components/button/button-group';
    import RadioGroup from  'iview/src/components/radio/radio-group';

    export default {
        data () {
            return {}
        },
        props : ['data'],
        components : {
          Button,
          Poptip,
          ButtonGroup,
          RadioGroup
        },
        methods : {
          ButtonGroupClick (callback) {
            callback && callback();
          },
          ButtonClick (callback) {
            callback && callback();
          }
        }
    }
</script>

<style scoped>
  .LazyLayout {
    width: 100%;
    height: 100%;
  }
  .LazyTopbar {
    height: 45px;
    width: 100%;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-bottom:1px solid #dfdfdf;
    background-color: #fff;
  }
  .title {
    font-size: 18px;
  }
  .rightdiv >* {
    margin-right: 30px;
  }
  .leftdiv > * {
    margin-left: 30px;
  }
  .LazyTopbar svg {
    width: 1rem;
    height: 1rem;
  }
  .ivu-poptip-rel > .ivu-btn {
    border-radius : 4px;
  }
  .btnsvg {
    vertical-align: sub;
  }
</style>

