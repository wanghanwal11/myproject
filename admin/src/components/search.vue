/**
* Created by bk on 2017/9/1.
*/
<template>
    <div class="search">
        <div v-if="isShow" class="searchPanel">
            <div class="searchInfo">
                <div class="searchItem" v-for="itemInput in searchItems.input">
                    <p class="searchType">{{itemInput.title}}</p>
                    <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                        <div>
                            <i-input v-model="itemInput.value" @on-blur="searchByKey" @on-enter="vSearchEnter" placeholder="请输入..."></i-input>
                        </div>
                    </Card>
                </div>
                <div class="searchItem" v-for="(itemDatePicker,index) in searchItems.DatePicker">
                    <p class="searchType">{{itemDatePicker.title}}</p>
                    <Date-picker type="daterange" v-model="itemDatePicker.value" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin-left: 20px;"></Date-picker>
                </div>
                <div class="searchItem" v-for="itemCascader in searchItems.Cascader">
                    <p class="searchType">{{itemCascader.title}}</p>
                    <Cascader :data="itemCascader.data" v-model="itemCascader.value"  @on-change="searchByServiceId" style="width:200px;margin-left: 20px;"></Cascader>
                </div>
                <div class="searchItem" v-for="itemTag in searchItems.tag">
                    <p class="searchType">{{itemTag.title}}</p>
                    <Card style="width:200px;margin-left: 20px;" :bordered="false" dis-hover>
                        <div class="selectState" v-for="tag in itemTag.data" @click="selectedState(tag.value,itemTag)"  :class="{selectedColor: itemTag.value == tag.value}" style="">{{tag.name}}</div>
                    </Card>
                </div>
                <slot></slot>
            </div>
            <div class="handle">
                <div class="handleButton handleLeft" @click="search">搜索</div>
                <div class="handleButton" @click="rest">重置</div>
            </div>
        </div>
        <i-button type="primary" shape="circle" icon="ios-search" @click="toggle"></i-button>
    </div>
</template>
<script type="es6">
    import iButton from 'iview/src/components/button'
    import Icon from 'iview/src/components/icon'
    import Card from 'iview/src/components/card'
    import iInput from 'iview/src/components/input'
    import DatePicker from 'iview/src/components/date-picker'
    import Cascader from 'iview/src/components/cascader'
    export default {
        name: 'search',
        props: [
            'searchItems'
        ],
        data () {
            return {
                isShow: false,
                timeValue: [],
                serviceList: [],
                orderStatus: []
            }
        },
        components:{
            iButton,
            Icon,
            Card,
            iInput,
            DatePicker,
            Cascader
        },
        created () {
            debugger;
            console.log(this.searchItems);
        },
        methods: {
            toggle () {
                this.isShow = !this.isShow;
            },
            searchByKey () {

            },
            vSearchEnter: function () {
                event.target.blur();
            },
            timeSearch (index) {
                debugger;
                console.log(this.searchItems);
            },
            searchByServiceId (value) {
                debugger;
                //if (value[1]) {
                //    this.serviceId = value[1];
                //} else {
                //    this.serviceId = "";
                //}
                console.log(this.searchItems);
            },
            selectedState (state,itemTag) {
                    //单选
                    if( itemTag.value === state) {
                        itemTag.value = "";
                    } else {
                        itemTag.value = state;
                    }
                this.searchByKey();
            },
            paddNum: function(num){
                num += "";
                return num.replace(/^(\d)$/,"0$1");
            },
            search () {
                debugger;
                //处理时间数据，将js标准的时间格式转换成字符串
                for(var i = 0; i < this.searchItems.DatePicker.length; i++) {
                    if(this.searchItems.DatePicker[i].value[0]) {
                        var beginTime = this.searchItems.DatePicker[i].value[0];
                        var endTime = this.searchItems.DatePicker[i].value[1];
                        this.searchItems.DatePicker[i].value[0] = beginTime.getFullYear() + '-' + this.paddNum( beginTime.getMonth() + 1 ) + '-' + this.paddNum(beginTime.getDate());
                        this.searchItems.DatePicker[i].value[1] = endTime.getFullYear() + '-' + this.paddNum( endTime.getMonth() + 1 ) + '-' + this.paddNum(endTime.getDate());
                    } else {
                        this.searchItems.DatePicker[i].value = [];
                    }
                }
                console.log(this.searchItems);
                this.$emit('getSearchItems', this.searchItems);
            },
            rest () {
                debugger;
                for(var k in this.searchItems) {
                    for(var i = 0; i < this.searchItems[k].length; i++) {
                        if(this.$lazy.typeof(this.searchItems[k][i].value)  === 'string') {
                            debugger;
                            this.searchItems[k][i].value = '';
                        } else if (this.$lazy.typeof(this.searchItems[k][i].value)  === 'array'){
                            this.searchItems[k][i].value = [];
                        }
                    }
                }
                console.log(this.searchItems);
            }
        }
    }

</script>
<style scoped>
.search {
    position: fixed;
    bottom: 20px;
    right: 20px;
    text-align: right;
    z-index: 9999;
}
.searchPanel {
    width: 240px;
    height: 627px;
    background-color: #fff;
    margin-bottom: 25px;
    border: 1px solid #ddd;
    text-align: initial;
    position: relative;
}
.searchInfo {
    height: 580px;
    overflow-y: auto;
}
.searchInfo::-webkit-scrollbar {
    width: 2px;
    height: 2px;
    background-color: #fff;
}

.searchInfo::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
}

.searchInfo::-webkit-scrollbar-thumb {
    height: 20px;
    border-radius: 10px;
    background-color: rgba(0,0,0,.3);
}

.searchType{
    padding: 15px;
    font-size: 14px;
    font-weight:bolder;
}
.handle {
    width: 100%;
    height: 40px;
    border-top: 1px solid #ddd;;
    position: absolute;
    bottom: 0;
}
.handleButton {
    display: inline-block;
    width: 49%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
}
.handleButton:hover {
    color: #3c7ce6;
}
.handleLeft {
    border-right: 1px solid #ddd;
}
.selectState {
    display: inline-block;
    height: 22px;
    line-height: 20px;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    border-radius: 3px;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    cursor: pointer;
    color: #fff;
    background: #aeaeae;
    margin-left:5px;
}
.selectedColor {
    background-color: #f90;;
}
</style>
 