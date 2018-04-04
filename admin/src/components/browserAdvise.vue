/**
* Created by bk on 2017/8/31.
*/
<template>
    <div>
        <LazyLayout>
            <Modal v-model="isShow" class-name="browser" width="900">
                <div style="height: 400px;display:flex;justify-content:center;align-items:center;">
                    <div>
                        <div style="font-size: 20px;font-weight: 800;font-family: 'Microsoft YaHei'">请尝试使用chrome最新版本浏览器</div>
                        <div style="text-align: center;">
                            <Button type="info" style="margin-top: 20px">去下载</Button>
                        </div>
                        <div style="margin-top: 30px;text-align: center;color: #747272;">
                            <div style="font-size: 13px;">
                                当浏览器前版本信息
                            </div>
                            <div style="font-family: '宋体';">
                                <div>{{browser[0] + ")"}}</div>
                                <div>{{browser[1] + ")"}}</div>
                                <div>{{ browser[2]}}</div>
                            </div>
                            <div @click="isShow = false" style="margin-top: 20px;color: #4DD5EA">
                                <span style="border-bottom: 1px solid #4DD5EA;cursor: pointer">
                                    我知道了，继续使用当前浏览器
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="footer">

                </div>
            </Modal>
        </LazyLayout>
    </div>
</template>
<script type="es6">
    import Modal from 'iview/src/components/modal'
    import Button from 'iview/src/components/button'
    export default {
        name: 'browserAdvise',
        data () {
            return {
                isShow: true,
                browser: []
            }
        },
        components: {
            Modal,
            Button
        },
        created () {
            this.browser = window.navigator.userAgent.split(') ');
        }
    }

</script>
<style scoped>

</style>
 