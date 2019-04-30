import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  uri: 'https://api-uswest.graphcms.com/v1/cjv28wpka42tg01ghebhc80eh/master'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false

new Vue({
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app-wrapper')
