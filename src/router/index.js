import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'OrderView',
		component: () => import('@/views/OrderView.vue'),
		meta: { layout: 'MainLayout', role: ['USER', 'ADMIN'] },
	},
	{
		path: '/create',
		name: 'OrderCreateView',
		component: () => import('@/views/OrderCreateView.vue'),
		meta: { layout: 'MainLayout', role: ['ADMIN'] },
	},

	{
		path: '/login',
		name: 'LoginView',
		component: () => import('@/views/LoginView.vue'),
		meta: { layout: 'LoginLayout' },
	},

	{
		path: "/:catchAll(.*)",
    	name: "NotFound",
    	component: () => import('@/views/NotFoundView.vue'),
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach(async (to, from, next) => {
	const user = store.getters.user;
	if (to.meta.role) {
        if (!user && to.meta.layout != 'LoginLayout') {
            return next({ name: 'LoginView' });
        }
        if (user && !to.meta.role.includes(user.role)) {
            return next({ path: 'NotFound' });
        }
    }
	next();
});

export default router
