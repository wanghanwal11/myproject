/**
* Created by bk on 2017/3/28.
*/
<template>
        <div class="info">
			<Form :model="formItem" :label-width="80">
				<Form-item label="名称">
					<Input v-model="formItem.input" placeholder="请输入"></Input>
				</Form-item>
				<Form-item label="行政区域">
					<Input v-model="formItem.input" placeholder="请输入"></Input>
				</Form-item>
				<Form-item>
					<Button type="primary" long>确定</Button>
				</Form-item>
			</Form>
        </div>
</template>

<script type="es6">

    export default {
        name: 'personal',
		data () {
		return {
			formItem: {
				input: '',
				select: '',
				radio: 'male',
				checkbox: [],
				switch: true,
				date: '',
				time: '',
				slider: [20, 50],
				textarea: ''
			}
		}
	}
    }
</script>

<style scoped>
	.info{
		width: 60%;
		margin: 0 auto;
		padding-top: 100px;
		font-family: "Microsoft YaHei";
		font-size: 20px;
	}
	.infor span{
		width:500px;
		margin-left: 100px;
	}
</style>

 