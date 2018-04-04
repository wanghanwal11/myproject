<template>    
</template>
<script type="es6">
    var stompClient = null;
    import '../../static/js/sockjs.js'
    import '../../static/js/stomp.js'
    export default {
        created: function() {
            var vm = this; 
            var sock = new SockJS( "http://192.168.0.10:8092/endpointWechat");   
            stompClient = Stomp.over(sock);
            stompClient.connect({}, function (frame) {
                // stompClient.subscribe('/queue/conversations-' + vm.$store.state.userInfo.streetorcommunityid + vm.$store.state.userInfo.streetorcommunity+'lt' ,function (response){
                    
                //         console.log(JSON.parse(response.body))
                // });
                //  stompClient.subscribe('/queue/conversations-' + vm.$store.state.userInfo.streetorcommunityid + vm.$store.state.userInfo.streetorcommunity+'dd' ,function (response){
                //         console.log(JSON.parse(response.body))
                // });
                // 
                // 
                // stompClient.subscribe('/queue/notifications-' + localStorage.uid , function (response) {
                //          debugger
                //          console.log(response);                      
                // });
            });
        }
    }
</script>

<style scoped>
    
</style>

 