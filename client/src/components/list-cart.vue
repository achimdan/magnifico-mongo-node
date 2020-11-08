<template>
    <div class="cart-products">
        <div v-for="(product, index) in cartProducts"
             :key="index"
             class="product"
             :class="{ 'to-sidebar' : toSidebar }">
            <img :src="baseUrl + `api/files/${product.Images[0].Name}`"
                 v-if="product.Images[0]"
                 alt=""
                 class="product-image">
            <div>
                {{ product.Name }}
            </div>
            <div>
                {{ product.Price }}
            </div>
            <div v-if="!toSidebar">
                Quantity
            </div>
            <div>
                <button type="button"
                        class="icon-button">
                    <img src="@/assets/img/clear.svg"
                         alt="view-product">
                </button>
            </div>
        </div>
        <div class="actions">
            <router-link class="side-btn view-cart"
                         :to="`/cart`">
                View cart
            </router-link>
            <router-link class="side-btn checkout"
                         :to="`/cart`">
                Checkout
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { MainModule } from '@/store/main-module';
    import { CartModule } from '../store/cart-module';

    @Component({
        components: {}
    })
    export default class ListCartComponent extends Vue {

        get cartProducts() {
            return CartModule.cartProducts
        }

        get baseUrl() {
            return MainModule.BASE_URL
        }

        @Prop() toSidebar: boolean

    }

</script>

<style lang="scss" scoped>
@import "@/assets/commons.scss";

.cart-products {
    .product {
        display: grid;
        grid-template-columns: 200px auto auto auto auto auto;
        border-top: 1px solid lightgrey;
        align-items: center;
        height: 150px;
        &:last-child {
            border-bottom: 1px solid lightgrey;
        }
        .product-image {
            width: 130px;
        }
    }
    .to-sidebar {
        border: none;
        grid-template-columns: 140px auto auto auto;
        .icon-button {
            background: white;
        }
        &:last-child {
            border-bottom: none;
        }
    }
    .actions {
        margin-top: 100px;
        .side-btn {
            height: 60px;
            cursor: pointer;
            line-height: 60px;
            display: block;
            font-weight: 500;
            font-size: 15px;
            text-transform: uppercase;
        }
        .view-cart {
            background: white;
            color: black;
            &:hover {
                text-decoration: none;
                background: #343a40;
                border: 1px solid white;
                color: white;
            }
        }
        .checkout {
            background: #343a40;
            color: white;
            border: 1px solid white;
            margin-top: 20px;
            &:hover {
                text-decoration: none;
                background: white;
                border: 1px solid #343a40;
                color: black;
            }
        }
    }
}
</style>