import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

import './registerServiceWorker';

import 'bootstrap';
import '@/assets/styles/style.scss';

Vue.config.productionTip = false;

Vue.use(router);

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app');
