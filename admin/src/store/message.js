/**
 * Created by bk on 2017/12/08.
 */
export default {
    state: {
        sessionList: [],
        chatArr: []
    },
    mutations: {
        updateSessionList (state,sessionList) {
            state.sessionList = sessionList;
        },
        updateChatArr (state,chatArr) {
            state.chatArr = chatArr;
        }
    }
}