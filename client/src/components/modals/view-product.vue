<template>
    <b-modal centered
             title="view product"
             id="view-product-modal"
             dialog-class="view-product-modal"
             content-class="content-modal"
             body-class="body-modal"
             @hide="resetInfoModal"
             hide-header
             hide-footer>

        <div class="view-product">
            <div class="slider">
                <VueSlickCarousel :arrows="true"
                                  :dots="false">
                    <div class="slider-container"
                         v-for="(image, index) in selectedProduct.ProductImage"
                         :key="index">
                        <img :src="`http://localhost:3000/uploads/${image}`"
                             alt=""
                             class="landscape">
                    </div>
                </VueSlickCarousel>
            </div>
            <div class="details">
                <h1 class="title-h1">
                    {{selectedProduct.Name}}
                </h1>
                <p class="price">
                    {{selectedProduct.Price}} RON
                </p>
                <span class="description">
                    <!-- {{selectedProduct.Description}} -->
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolorem, totam, amet, culpa at odio sunt illo tempora accusantium nostrum quis voluptate dicta repellendus! Laborum rerum architecto vitae? Saepe, voluptatem?
                </span>

                <section class="flex space-between value-select">
                    <b-form-spinbutton id="sb-inline"
                                       class="selector"
                                       v-model="value"
                                       inline>
                    </b-form-spinbutton>
                    <button type="button"
                            class="primary-button"
                            v-b-toggle.cart-sidebar
                            @click="addToCart">
                        <img src="@/assets/img/shopping_cart.svg"
                             alt="view-product">
                        Add to cart
                    </button>
                </section>

                <section class="buttom-section">
                    <div class="wish-list">
                        <button type="button"
                                @click="$router.push({ path: '/cart' })"
                                class="icon-button favorite">
                            <font-awesome-icon :icon="['far', 'heart']"
                                               class="icon alt"
                                               size="lg" />
                            Add to Wishlist
                        </button>
                    </div>
                    <div class="whatsapp">
                        <button type="button"
                                @click="$router.push({ path: '/cart' })"
                                class="icon-button">
                            <img src="@/assets/img/whatsapp.svg"
                                 alt="view-product">
                            Order with WhatsApp
                        </button>
                    </div>
                    <div class="info">
                        <span class="text">Category:
                            <span class="light">
                                {{ selectedProduct.Category ? selectedProduct.Category.Name : 'No category' }}
                            </span>
                        </span>
                        <span class="text">Tags: <span class="light">xxx</span></span>
                    </div>
                    <div class="social">
                        <button type="button"
                                @click="$router.push({ path: '/cart' })"
                                class="icon-button">
                            <img src="@/assets/img/facebook.svg"
                                 alt="view-product">
                        </button>
                        <button type="button"
                                @click="$router.push({ path: '/cart' })"
                                class="icon-button">
                            <img src="@/assets/img/instagram.svg"
                                 alt="view-product">
                        </button>
                        <button type="button"
                                @click="$router.push({ path: '/cart' })"
                                class="icon-button">
                            <img src="@/assets/img/pinterest.svg"
                                 alt="view-product">
                        </button>
                    </div>
                </section>
            </div>
        </div>
    </b-modal>
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    import { MainModule } from "../../store/main-module";
    import Input from '@/components/Input.vue'
    import { CartModule } from '../../store/cart-module';

    @Component
    export default class viewModalComponent extends Vue {

        get selectedProduct() {
            return MainModule.selectedProduct
        }

        slide: number = 0
        sliding = null
        value: number = 1

        addToCart() {
            CartModule.addToCart(this.selectedProduct)
            this.$bvModal.hide('view-product-modal')
        }

        selectImage(index: number) {
            this.slide = index
        }

        resetInfoModal() {
            // MainModule.setSelectedProduct({})
        }
    }
</script>

<style lang="scss" scoped>
@import "@/assets/commons.scss";
.view-product {
    display: grid;
    grid-template-columns: 550px auto;
    .slider {
        height: 700px;
        background: #e8e8e8;
        .slider-container {
            position: relative;
            width: 640px;
            height: 700px;
            overflow: hidden;
            background: white;
            img {
                position: absolute;
                max-width: 100%;
                width: 100%;
                height: auto;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            img.landscape {
                height: 100%;
            }
        }
    }
    .details {
        padding: 60px 60px 20px;
        font-family: "Poppins", sans-serif;
        .title-h1 {
            font-weight: 800;
        }
        .price {
            font-weight: 600;
            font-size: 30px;
        }
        .description {
            color: #c5c5c5;
            font-size: 16px;
            font-weight: 400;
        }
        .value-select {
            margin: 50px 0 30px;
            display: grid;
            grid-template-columns: 47% 47%;
            .primary-button {
                width: 250px;
                img {
                    position: relative;
                    top: -2px;
                    margin-right: 5px;
                    filter: invert(1);
                }
            }
        }
        .buttom-section {
            margin-top: 50px;
            display: grid;
            grid-gap: 10px;
            .favorite {
                outline: none;
            }
            .info {
                margin-top: 70px;
                border-top: 1px solid lightgray;
                padding-top: 10px;
                font-size: 14px;
                .text {
                    margin-right: 20px;
                    .light {
                        color: $primary-color;
                        margin-left: 5px;
                    }
                }
            }
            .social {
                margin-top: 30px;
                .icon-button {
                    margin-right: 10px;
                    img {
                        width: 30px;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .view-product {
        display: block;
        .slider {
            height: 300px;
            .slider-container {
                height: 300px;
            }
        }
        .details {
            padding: 20px;
        }
    }
}
</style>