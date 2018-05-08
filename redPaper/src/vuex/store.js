import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    userId: "",
    userPhone:""
}
const getters = {
    count: function (state) {
        return state.count += 100;
    }
}
const mutations = {
    saveUserId(state, id) {
        state.userId = id;
    },
    savePhone(state, phone) {
        state.userPhone = phone;
    }
}
const actions = {
    addAction(context) {
        setTimeout(() => {
            context.commit('add', 10)
        }, 3000);
        console.log('我比add提前执行');
    },
    reduceAction({ commit }) {
        commit('reduce', 2)
    }
}
const moduleA = {
    state, mutations, getters, actions
}
export default new Vuex.Store({
    modules: { a: moduleA }
});