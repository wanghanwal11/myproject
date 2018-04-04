/**
 * Created by bk on 2017/5/23.
 */
export default {
    state: {
        volunteerInfo: {}
    },
    mutations: {
        update (state,volunteer) {
            state.volunteerInfo = volunteer;
        },
        updateSex (state,sex) {
            state.volunteerInfo.sex = sex;
        }
    }
}