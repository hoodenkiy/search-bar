import Vue from 'vue';
import VueRouter from 'vue-router';
import UserProfile from '../components/UserProfile';

Vue.use(VueRouter);

export default new VueRouter({
	routes: [{ path: '/user/:id', name: 'user', component: UserProfile }],
	mode: 'history'
});
