import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import  MarkdowPreview  from './components/markdown-preview'
Vue.use(MarkdowPreview)

import CustomComponents from './custom-components'
Vue.use(CustomComponents)

import CodeView from "vue-code-view";
import "vue-code-view/lib/vue-code-viewer.css";
Vue.use(CodeView);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
