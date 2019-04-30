import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showSubmitPopup: false
  },
  mutations: {
    toggleSubmitPopup: function(state) {
      state.showSubmitPopup = !state.showSubmitPopup;
      console.log('state.showSubmitPopup' + state.showSubmitPopup);
    }
  },
  actions: {

  }
})
