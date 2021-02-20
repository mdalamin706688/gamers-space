import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import router from './routes';
import store from './Store/store';
import vuelidate from 'vuelidate';
import wysiwyg from 'vue-wysiwyg';


import { MdCard, MdButton, MdDialog, MdContent, MdTable, MdDialogConfirm } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

import Button from './components/UI/button.vue';
Vue.component('app-button',Button);

/* MATERIAL */
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdContent)
Vue.use(MdTable)
Vue.use(MdDialogConfirm)

/* RESOURCE */
Vue.use(VueResource);
Vue.http.options.root = 'https://gamespot-111f9-default-rtdb.firebaseio.com/'

/* MISC */
Vue.use(vuelidate);
Vue.use(wysiwyg,{});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
