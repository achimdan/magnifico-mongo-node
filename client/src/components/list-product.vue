<template>
    <div class="product"
         @mouseenter="isVisible = true"
         @mouseleave="isVisible = false">

        <div class="wrapper">
            <transition name="slide-down">
                <button type="button"
                        v-if="isVisible"
                        v-b-toggle.sidebar-backdrop
                        @click="$router.push({ path: '/cart' })"
                        class="favorite">
                    <img src="@/assets/img/favorite.svg"
                         alt="view-product">
                </button>
            </transition>
            <router-link class="image-container"
                         :to="`/product/${product._id}`">
                <img :src="`http://localhost:3000/uploads/${product.ProductImage[0]}`"
                     alt=""
                     class="image">

            </router-link>
            <transition name="slide-up">
                <div class="options"
                     v-if="isVisible">
                    <button class="add-cart"
                            aria-controls="cart-sidebar"
                            @click="addToCart"
                            v-b-toggle.cart-sidebar
                            type="button">
                        <b-spinner small></b-spinner>
                        <span class="text">
                            Add to cart
                        </span>
                    </button>
                    <button type="button"
                            class="view"
                            @click="viewProduct">
                        <img src="@/assets/img/eye.svg"
                             alt="view-product">
                    </button>
                </div>
            </transition>
        </div>
        <div class="details">
            <router-link class="route"
                         :to="`/product/${product.Id}`">
                {{product.Name}}
            </router-link>
            <span class="price">
                {{product.Price}} RON
            </span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { MainModule } from '../store/main-module';
    import { CartModule } from '../store/cart-module';

    @Component({
        components: {}
    })
    export default class ListProductComponent extends Vue {

        @Prop() product: any

        isVisible: boolean = false

        viewProduct() {
            MainModule.setSelectedProduct(this.product)
            this.$bvModal.show('view-product-modal')
        }

        addToCart() {
            CartModule.addToCart(this.product)
        }

    }

</script>

<style lang="scss" scoped>
@import "@/assets/commons.scss";

.product {
    height: 450px;
    position: relative;
    .wrapper {
        display: grid;
        height: 85%;
        position: relative;
        overflow: hidden;
        .favorite {
            position: absolute;
            top: 10px;
            left: 10px;
            border: none;
            border-radius: 50px;
            height: 40px;
            width: 40px;
            outline: none;
            img {
                width: 22px;
            }
        }
        .image-container {
            align-self: center;
            .image {
                margin: auto;
                width: 100%;
            }
        }
        .options {
            display: grid;
            grid-template-columns: 245px auto;
            height: 50px;
            position: absolute;
            bottom: 0;
            width: 100%;
            .add-cart {
                background: $primary-color;
                border: none;
                color: white;
                width: 100%;
                outline: none;
                .text {
                    text-transform: uppercase;
                    font-size: 14px;
                    font-weight: 500;
                    position: relative;
                    top: 1px;
                }
            }
            .view {
                border: none;
                padding: 0;
                background: white;
                outline: none;
                img {
                    width: 20px;
                }
            }
        }
    }
    .route {
        text-align: left;
    }
    .details {
        .route {
            display: block;
            text-align: center;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 500;
            color: black;
        }
        .price {
            display: block;
            font-size: 12px;
            font-weight: 500;
        }
    }
}
</style>