import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showSubmitPopup: false,
    pianos: [],
    currentPianoId: ''
  },
  mutations: {
    toggleSubmitPopup: function(state) {
      state.showSubmitPopup = !state.showSubmitPopup;
    },
    updatePianos: function(state, value) {
      state.pianos = value;
    },
    updateCurrentPianoId: function(state, value) {
      state.currentPianoId = value;
    }
  },
  actions: {

  }
})
