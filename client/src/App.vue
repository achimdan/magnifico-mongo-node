<template>
    <div id="app">
        <Nav v-if="freeRoute" />

        <div class="wrapper">
            <!-- <transition name="fade"> -->
            <router-view></router-view>
            <!-- </transition> -->
        </div>

        <Footer v-if="freeRoute" />

        <b-sidebar id="cart-sidebar"
                   title="Cart"
                   backdrop
                   shadow
                   :width="'500px'"
                   right>
            <ListCart :toSidebar="true" />
        </b-sidebar>

        <!-- Modals -->
        <AddCategoryModal />
        <AddProductModal />
        <ViewProductModal />
        <CheckoutModal />
        <AuthModal />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Nav from '@/components/Nav.vue';
    import Footer from '@/components/Footer.vue';
    import ListCart from '@/components/list-cart.vue';
    // import AddCategoryModal from '@/components/modals/add-category.vue'
    // import AddProductModal from '@/components/modals/add-product.vue'
    // import ViewProductModal from '@/components/modals/view-product.vue'
    import { AuthModule } from './store/auth-module';
    import { CartModule } from './store/cart-module';
    import { MainModule } from './store/main-module';

    @Component({
        components: {
            Nav,
            Footer,
            ListCart,
            // AddCategoryModal,
            // AddProductModal,
            // ViewProductModal,

            AddCategoryModal: () => import(/* webpackChunkName: "add-category-modal" */ '@/components/modals/add-category.vue'),
            AddProductModal: () => import(/* webpackChunkName: "add-product" */ '@/components/modals/add-product.vue'),
            ViewProductModal: () => import(/* webpackChunkName: "view-product" */ '@/components/modals/view-product.vue'),
            CheckoutModal: () => import(/* webpackChunkName: "checkout-modal" */ '@/components/modals/checkout.vue'),
            AuthModal: () => import(/* webpackChunkName: "auth-modal" */ '@/components/modals/auth-modal.vue')
        },
    })
    export default class App extends Vue {

        get freeRoute() {
            return MainModule.freeRoute
        }

    }
</script>

<style lang="scss">
@import "../src/assets/commons.scss";
#app {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    // height: 100%;
    .wrapper {
        // height: 100%;
    }
}

@media only screen and (max-width: 600px) {
    #app {
        .wrapper {
            margin: 60px 0;
        }
    }
}
</style>
