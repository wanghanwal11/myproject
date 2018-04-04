/**
* Created by bk on 2017/3/28.
*/
<template>
        <div style="height: 100%;padding: 25px 15px;">
        	<my-title></my-title>
        	<div class="content">
	            <Row :gutter="30" style="margin-left: 0;margin-right: 0;">
			        <Col span="8" draggable='true' @dragstart='drag($event)'>
			        	<Card class="cardBox" dis-hover>
					        <p slot="title" class="labelBox"><span style="background: #5bb0ff;color:#fff;padding:0 10px">•  儿童</span></p>
					        <a href="" slot="extra" @click.prevent="changeLimit">
					            <svg class="menu-icon" aria-hidden="true">
			                        <use xlink:href="#icon-caidan"></use>
			                    </svg>
					        </a>
					        <div class="eList" @mousedown="mousedown" @mouseup="mouseup">
					        	<div class="eLeft">
					        		<div class="eImg">
					        			<img src="../assets/images/portrait.png">
					        		</div>
					        	</div>
					        	<div class="eRight">
					        		<div class="eName">name<span>sex｜time</span></div>
					        		<div class="eEmail">
					        			<svg class="title-icon" style="width: 14px;height: 14px;margin: 5px 5px 0;" aria-hidden="true">
					                        <use xlink:href="#icon-dianhua1"></use>
					                    </svg>
					        			    item.mobile
					        		</div>
					        		<div class="eAddress">
					        			<svg class="title-icon" style="width: 25px;height: 25px;" aria-hidden="true">
					                        <use xlink:href="#icon-zhiwei2"></use>
					                    </svg>
					                    	item.address
					        		</div>
					        	</div>
					        </div>
					    </Card>
			        </Col>
			    </Row>
            </div>
            <div class="cation">
            	<Card style="width:350px" dis-hover>
			        <p slot="title">类型</p>
			        <a href="#" slot="extra">新增</a>
			        <ul>
			            <li @drop='drop($event)' @dragover='allowDrop($event)' style="padding: 5px 10px;">1111111111</li>
			            <li style="padding: 5px 10px;">1111111111</li>
			            <li style="padding: 5px 10px;">1111111111</li>
			        </ul>
			    </Card>
			    <Card style="width:350px;margin-top: 30px;" dis-hover>
			        <p slot="title">类型</p>
			        <a href="#" slot="extra">新增</a>
			        <Radio-group v-model="people" @on-change="peopleChange" style="padding: 10px 15px;">
				        <Radio label="党员"></Radio>
				        <Radio label="孕龄妇女"></Radio>
				        <Radio label="儿童"></Radio>
				    </Radio-group>
			    </Card>
            </div>
        </div>
</template>

<script>
	import myTitle from '../components/title'
    export default {
        name: 'list',
        components: {
			myTitle
		},
		data (){
            return {
                articleList: '',
                people:'党员'
            }
        },
        created: function(){
        	/*var vm = this;
        	this.$http.get('http://192.168.0.10:5555/wx/api/wx/list')
                    .then(function (response) {
                    	debugger
                    	for(var i=0;i<response.data.rows.length;i++ ){
                    		if(response.data.rows[i].sex == '0'){
                    			response.data.rows[i].sex = '女';
                    		}
                    		if(response.data.rows[i].sex == '1'){
                    			response.data.rows[i].sex = '男';
                    		}
                    	}
                        vm.articleList = response.data.rows;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });*/
        },
		methods: {
			routeTo(name) {
				this.$router.push(name);
			},
			drag:function(event){
                dom = event.currentTarget.cloneNode(true);
            },
            drop:function(event){
                event.preventDefault();
                event.target.appendChild(dom);
            },
            allowDrop:function(event){
                event.preventDefault();
            },
            peopleChange:function(){
            	console.log(this.people);
            }
		}
		
    }
</script>

<style scoped>
	.content{
		width: 72%;
	}
	.cation{
		width: 350px;
		position: fixed;
		top: 133px;
		right: 30px;
	}
	.ivu-card-head{
		height: 46px;
	}
	.menu-icon{
		width: 20px;
		height: 20px;
	}
	.eList{
		height: 200px;
	}
	.eLeft{
		width: 35%;
		float: left;
		position: relative;
	}
	.eRight{
		width: 65%;
		padding-right: 30px;
		float: left;
	}
	.eImg{
		width: 90px;
		height: 90px;
		border-radius: 50%;
		margin: 40px auto;
		overflow: hidden;
	}
	.eImg img{
		width: 90px;
		height: 90px;
	}
	.ecode{
		width: 22px;
		height: 22px;
		border-radius: 50%;
		position: absolute;
		top: 108px;
		left: 65%;
		overflow: hidden;
		z-index: 3;
	}
	.eStar{
		height: 16px;
	}
	.eRead{
		line-height: 20px;
		margin-left: 18px;
	}
	.eRead img{
		vertical-align: top;
		margin-right: 8px;
	}
	.eTitle{
		margin-top: 20px;
		font-size: 16px;
		color: #333;
	}
	.eName{
		margin-top: 5px;
		font-size: 18px;
		color: #333;
	}
	.eName span{
		line-height: 24px;
		margin-top: 3px;
		margin-left: 20px;
		font-size: 12px;
		color: #666;
	}
	.title-icon{
		vertical-align: top;
    	cursor: pointer;
    	fill: #ffae00;
    }
    .eContact{
    	height: 21px;
    	margin-top: 35px;
    	font-size: 16px;
    	color: #999;
    }
    .eMobile{
    	float: left;
    }
    .ePhone{
    	float: right;
    }
    .eEmail{
    	margin-top: 30px;
    	font-size: 16px;
    	color: #999;
    }
    .eAddress{
    	margin-top: 15px;
    	font-size: 16px;
    	color: #999;
    }
</style>

 