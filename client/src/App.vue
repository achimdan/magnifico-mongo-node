<template>
    <div id="app">
        <Nav />

        <div class="">
            <transition name="fade">
                <router-view></router-view>
            </transition>
            <div class="footer">
                footer
            </div>
        </div>

        <!-- no-header-close -->
        <b-sidebar id="cart-sidebar"
                   title="Cart"
                   bg-variant="dark"
                   text-variant="light"
                   backdrop
                   shadow
                   :width="'600px'"
                   right>
            <div class="px-5 py-5">
                <ListCart :toSidebar="true" />
            </div>
        </b-sidebar>

        <!-- Modals -->
        <AddCategoryModal />
        <AddProductModal />
        <ViewProductModal />
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Nav from '@/components/Nav.vue'
    import ListCart from '@/components/list-cart.vue'
    // import AddCategoryModal from '@/components/modals/add-category.vue'
    // import AddProductModal from '@/components/modals/add-product.vue'
    // import ViewProductModal from '@/components/modals/view-product.vue'
    import { AuthModule } from './store/auth-module';
    import { CartModule } from './store/cart-module';
    import { MainModule } from './store/main-module';

    @Component({
        components: {
            Nav,
            ListCart,
            // AddCategoryModal,
            // AddProductModal,
            // ViewProductModal,

            AddCategoryModal: () => import(/* webpackChunkName: "add-category-modal" */ '@/components/modals/add-category.vue'),
            AddProductModal: () => import(/* webpackChunkName: "cart" */ '@/components/modals/add-product.vue'),
            ViewProductModal: () => import(/* webpackChunkName: "cart" */ '@/components/modals/view-product.vue')
        },
    })
    export default class App extends Vue {

        created() {
            // AuthModule.checkIfLogged()
        }
    }
</script>

<style lang="scss">
@import "../src/assets/commons.scss";
#app {
    font-family: "Montserrat", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .magnifico {
        margin: 50px auto;
        text-align: center;
        padding: 0;
        max-width: 1300px;
    }
    .footer {
        margin-top: 100px;
    }
}

@media only screen and (max-width: 600px) {
    #app {
        .magnifico {
            width: 90%;
        }
    }
}
</style>
