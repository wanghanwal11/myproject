/**
 * Created by bk on 2017/6/28.
 */
export default {
    state: {
        access_token: "",
        streetorcommunityid: 0,
        streetorcommunity: 0,
        uid: "",
        cityCode: '',
        cityLatLng: '',
        isAdmin: '',
        isMsg: false
    },
    mutations: {
        updateToken (state,token) {
            localStorage.token = token;
            state.access_token = token;
        },
        updateCommunityid (state,id) {
            localStorage.streetorcommunityid = id;
            state.streetorcommunityid = id;
        },
        updateCommunity (state,type) {
            localStorage.streetorcommunity = type;
            state.streetorcommunity = type;
        },
        updateUid (state,uid) {
            localStorage.uid = uid;
            state.uid = uid;
        },
        updateCityCode (state,cityCode) {
            localStorage.cityCode = cityCode;
            state.cityCode = cityCode;
        },
        updateCityLatLng (state,cityLatLng) {
            localStorage.cityLatLng = cityLatLng;
            state.cityLatLng = cityLatLng;
        },
        updateIsAdmin (state,num) {
            localStorage.isAdmin = num;
            state.isAdmin = num;
        },
        updateIsMsg (state,flag) {
            state.isMsg = flag;
        }
    }
}