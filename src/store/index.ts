import { createStore } from 'vuex'
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default createStore({
  state: {
    code: null
  },
  getters: {
    GET_CODE(state) {
      if (state.code) return atob(state.code);
      return null;
    }
  },
  mutations: {
    SET_CODE(state, payload) {
      if (payload) payload = btoa(payload);
      state.code = payload;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins:[vuexLocal.plugin]
})
