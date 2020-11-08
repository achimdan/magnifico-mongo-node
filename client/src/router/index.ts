import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from "firebase/app";
import "firebase/auth";
import { AuthModule } from '@/store/auth-module'
import { MainModule } from '@/store/main-module';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/products',
		name: 'Products',
		component: () => import(/* webpackChunkName: "products" */ '../views/Products.vue')
	},
	{
		path: '/product/:id',
		name: 'Product',
		component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
	},

	{
		path: '/cart',
		name: 'Cart',
		component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue')
	},

	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Admin/Dashboard.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes
})


const openRoutes: any = ['Home', 'Products', 'Product', 'Cart']
const lockedRouts: any = ['Dashboard']

router.beforeEach((to, from, next) => {
	// console.log(localStorage.getItem('user-token'))
	// next()

	if (openRoutes.includes(to.name)) {
		console.log('free')
		next()
	}
	else if (lockedRouts.includes(to.name)) {
		console.log('locked')
		next()
	}
})

export default router
