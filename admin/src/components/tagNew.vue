/**
* Created by bk on 2017/12/27.
*/
<template>
    <div class="tag">
        <slot name="tagItem">
            <div class="tagItem" :class="{active: item.active}" v-for="(item,index) in items" :key="index" @click="isShow(item)">
                <span>{{item.name}}</span>
                <sup v-show="item.active" class="badge-remove" @click="deleteGroup(item,index)">×</sup>
            </div>
        </slot>
        <Dropdown trigger="click" style="line-height: normal">
            <div class="tagItem tagAdd">+</div>
            <Dropdown-menu slot="list" v-if="otherGroup.length > 0">
                <Dropdown-item v-for="(group,index) in otherGroup"><li @click="joinGroup(group,index)" style="margin-bottom: 5px;text-align: center;">{{group.name}}</li></Dropdown-item>
            </Dropdown-menu>
            <Dropdown-menu slot="list" v-else>
                <Dropdown-item>
                    <div style="display: flex;justify-content: center;align-items: center">
                        没有其他分组
                    </div>
                </Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <!--<Poptip placement="bottom" trigger="hover">-->
            <!--<div class="tagItem tagAdd">+</div>-->
            <!--<div v-if="otherGroup.length > 0" class="" slot="content">-->
                <!--&lt;!&ndash;<Checkbox-group v-model="otherGroupChecked" style="padding: 5px 10px 5px 20px;" @on-change="checkedGroup">&ndash;&gt;-->
                    <!--&lt;!&ndash;<div style="margin-bottom: 5px" v-for="group in otherGroup">&ndash;&gt;-->
                        <!--&lt;!&ndash;<Checkbox :label="JSON.stringify(group)">{{group.name}}</Checkbox>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                <!--&lt;!&ndash;</Checkbox-group>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="footer">&ndash;&gt;-->
                    <!--&lt;!&ndash;<Button type="primary" size="small" @click="joinGroup">确定</Button>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
            <!--<div v-else slot="content" style="display: flex;justify-content: center;align-items: center">-->
                <!--没有其他分组-->
            <!--</div>-->
        <!--</Poptip>-->
    </div>
</template>
<script type="es6">
    import CheckboxGroup from 'iview/src/components/checkbox/checkbox-group'
    import Checkbox from 'iview/src/components/checkbox'
    import Poptip from 'iview/src/components/poptip'
    import Button from 'iview/src/components/button'
    import Dropdown from 'iview/src/components/dropdown'
    import DropdownMenu from 'iview/src/components/dropdown/dropdown-menu'
    import DropdownItem from 'iview/src/components/dropdown/dropdown-item'
    export default {
        name: 'tagNew',
        components: {
            CheckboxGroup,
            Checkbox,
            Poptip,
            Button,
            Dropdown,
            DropdownMenu,
            DropdownItem
        },
        props:{
            items: {
                type: Array,
                default () {
                    return [];
                }
            },
            otherGroup: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                otherGroupChecked: []
            }
        },
        created () {
            debugger;
            console.log(this.items);
        },
        methods: {
            isShow (item) {
                this.$set(item,'active',!item.active);
            },
            deleteGroup (item,index) {
                this.items.splice(index, 1);
                this.$emit('listenToChildDelEvent', item);
            },
            checkedGroup () {
                debugger;
                console.log(this.otherGroupChecked);
            },
            joinGroup (group,index) {
                debugger;
                group.index = index;
                this.$emit('listenToChildAddGroupEvent', group);
            }
        }
    }

</script>
<style scoped>
    .tagItem {
        display: inline-block;
        min-width: 50px;
        background-color: #f7f5fa;
        border: 1px solid #eeeeee;
        font-size: 12px;
        color: #999999;
        text-align: center;
        cursor: pointer;
        margin-left: 20px;
        padding: 3px 5px;
        position: relative;
    }
    .tagAdd {
        background-color: #ffffff;
        border: 1px dashed #999999;
    }
    .active {
        border: 1px solid #e30b0b;
    }
    .badge-remove {
        position: absolute;
        transform: translateX(50%);
        top: -7px;
        right: 0;
        height: 15px;
        border-radius: 7px;
        width: 14px;
        background: #e30b0b;
        border: 1px solid transparent;
        color: #fff;
        line-height: 10px;
        text-align: center;
        font-size: 15px;
        white-space: nowrap;
        transform-origin: -10% center;
        z-index: 10;
        box-shadow: 0 0 0 1px #fff;
    }
    .footer {
        text-align: right;
    }
</style>
 