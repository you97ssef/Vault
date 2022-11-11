import VuexPersistence from "vuex-persist";
import Vuex, { type StoreOptions } from "vuex";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

const store: StoreOptions<any> = {
    state: {
        code: null,
        dataExist: false,
    },
    getters: {
        GET_CODE(state) {
            if (state.code) return atob(state.code);
            return null;
        },
        DATA_EXISTS(state) {
            return state.dataExist;
        },
    },
    mutations: {
        SET_CODE(state, payload) {
            if (payload) payload = btoa(payload);
            state.code = payload;
        },
        SET_DATA(state, payload) {
            state.dataExist = payload;
        },
    },
    actions: {},
    modules: {},
    plugins: [vuexLocal.plugin],
};

export default new Vuex.Store<any>(store);
