/**
 * Created by bk on 2017/4/26.
 */
export default {
    state: {
        photo: "111",
        systemName: "社区服务系统",
        orderNumOfReSend: 0,
        citizen: 0,
        userName: ''
    },
    mutations: {
        updatePath (state,path) {
            state.photo = path;
        },
        updateSystemName (state,name) {
            state.systemName = name;
        },
        updateOrderNumOfReSend (state,num) {
            state.orderNumOfReSend = num;
        },
        updateUserName (state,name) {
            state.userName = name;
            localStorage.userName = name;
        },
        updatenum (state,num) {
            state.citizen = num;
        },
    }
}