import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { AuthModule } from '@/store/auth-module'
import { MainModule } from '@/store/main-module';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/products',
		name: 'Products',
		component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue'),
		children: [
		]
	},
	{
		path: '/product/:id',
		name: 'Product',
		component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
		// beforeEnter: (to: any, from: any, next: any) => {

		// }
	},

	{
		path: '/cart',
		name: 'Cart',
		component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
	},

	{
		path: '/admin',
		name: 'Admin',
		redirect: "/dashboard",
		component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/Admin.vue'),
		children: [
			{
				path: '/catalog',
				name: 'Catalog',
				component: () => import(/* webpackChunkName: "catalog" */ '../views/Admin/Catalog.vue')
			},

			{
				path: '/dashboard',
				name: 'Dashboard',
				component: () => import(/* webpackChunkName: "dashboard" */ '../views/Admin/Dashboard.vue')
			},

			{
				path: '/components',
				name: 'Components',
				component: () => import(/* webpackChunkName: "components" */ '../views/Admin/Components.vue')
			},

			{
				path: '/profile',
				name: 'Profile',
				component: () => import(/* webpackChunkName: "profile" */ '../views/Admin/Profile.vue')
			},

		]
	}
]

const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes
})


const openRoutes: any = ['Home', 'Products', 'Product', 'Cart']
const lockedRouts: any = ['Catalog', 'Dashboard', 'Profile', 'Components']

router.beforeEach((to, from, next) => {
	if (to.name !== from.name) {
		MainModule.fetchProducts()
	}
	if (openRoutes.includes(to.name)) {
		MainModule.setRouteType(true)
		// console.log('free')
		next()
	}
	else if (lockedRouts.includes(to.name)) {
		MainModule.setRouteType(false)
		// console.log('locked')
		next()
	}
	next()
})

export default router
