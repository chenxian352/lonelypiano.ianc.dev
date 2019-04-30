import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSubmitPopup: false,
    pianos: [],
    map: null
  },
  mutations: {
    toggleSubmitPopup: function(state) {
      state.showSubmitPopup = !state.showSubmitPopup;
    },
    updatePianos: function(state, value) {
      state.pianos = value;
    },
    assignMap: function(state, value) {
      state.map = value;
    }
  },
  actions: {

  }
})
