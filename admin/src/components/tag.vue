/**
* Created by bk on 2017/5/5.
*/
<template>
    <div>
        <Tag v-for="tag in dynamicTags" :key="tag.id" :name="tag.id" closable @on-close="handleClose(tag)">{{ tag.name }}</Tag>
        <div v-if="inputVisible" class="newtag">
            <input   class="inputAdd" v-model="inputValue"   ref="inputValue"  @keyup.enter="handleInputConfirm"  @blur="handleInputConfirm">
        </div>
        <Button icon="ios-plus-empty" v-else type="dashed" size="small" @click="showInput" style="height: 22px;">添加标签</Button>
    </div>
</template>
<script type="es6">
    export default {
        name: 'dynamicTag',
        props: [
            'dynamicTags'
        ],
        data () {
            return {
                inputVisible: false,
                inputValue: ''
            }
        },
        watch: {

        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                this.$emit('listenToChildDelEvent', tag);
            },

            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.inputValue.focus()
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.$emit('listenToChildAddEvent', inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }

</script>
<style scoped>
    .newtag {
    	height: 22px;
    	margin:2px 4px 2px 0;
        display: inline-block;
        vertical-align: bottom;
        border-radius: 4px;
        /*border: 1px solid #20a0ff;*/
    }
    .inputAdd {
        width: 70px;
        height: 22px;
        border: none;
        border-radius: 4px;
        padding: 3px;
    }
</style>
 