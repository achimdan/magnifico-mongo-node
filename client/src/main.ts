import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'


const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)

import {
	IconsPlugin,
	DropdownPlugin,
	CardPlugin,
	ModalPlugin,
	FormInputPlugin,
	FormPlugin,
	FormGroupPlugin,
	FormDatepickerPlugin,
	FormCheckboxPlugin,
	FormSpinbuttonPlugin,
	ButtonPlugin,
	PopoverPlugin,
	TablePlugin,
	CarouselPlugin,
	FormRadioPlugin,
	SidebarPlugin,
	SpinnerPlugin,
	ListGroupPlugin 
} from 'bootstrap-vue'

import VueSlickCarousel from 'vue-slick-carousel'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fas, far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('VueSlickCarousel', VueSlickCarousel)

Vue.use(IconsPlugin)
Vue.use(DropdownPlugin)
Vue.use(CardPlugin)
Vue.use(ButtonPlugin)
Vue.use(ModalPlugin)
Vue.use(FormInputPlugin)
Vue.use(FormPlugin)
Vue.use(FormGroupPlugin)
Vue.use(FormDatepickerPlugin)
Vue.use(FormCheckboxPlugin)
Vue.use(FormSpinbuttonPlugin)
Vue.use(PopoverPlugin)
Vue.use(TablePlugin)
Vue.use(CarouselPlugin)
Vue.use(FormRadioPlugin)
Vue.use(SidebarPlugin)
Vue.use(SpinnerPlugin)
Vue.use(ListGroupPlugin)

Vue.config.productionTip = false

Vue.config.performance = process.env.NODE_ENV !== "production";

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
