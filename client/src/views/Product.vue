<template>
    <div class="main-container view-product">
        <div class="slider"
             v-if="product">
            <VueSlickCarousel :arrows="true"
                              :dots="false">
                <div class="slider-container"
                     v-for="image in product.Images"
                     :key="image.Id">
                    <img :src="baseUrl + `api/files/${image.Name}`"
                         alt=""
                         class="landscape">
                </div>
            </VueSlickCarousel>
        </div>
        <div class="details">
            <h1 class="title-h1">
                {{product.Name}}
            </h1>
            <p class="price">
                {{product.Price}} RON
            </p>
            <span class="description">
                <!-- {{product.Description}} -->
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
                            {{ product.Category ? product.Category.Name : 'No category' }}
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
</template>

<script lang="ts">
    import { Vue, Component, Prop, Watch } from "vue-property-decorator";
    import { MainModule } from "@/store/main-module";
    import Input from '@/components/Input.vue'
    import { CartModule } from '@/store/cart-module';

    @Component
    export default class ProductComponent extends Vue {

        get baseUrl() {
            return MainModule.BASE_URL
        }

        get product() {
            return MainModule.products.find((el: any) => {
                if (el.Id === Number(this.$route.params.id)) {
                    this.setImages(el.Images)
                    return el
                }
            })
        }

        slide: number = 0
        sliding = null
        value: number = 1

        created() {
            MainModule.fetchProducts()
        }

        private setImages(images: any) {
            return images.filter((img: any) => {
                img.thumbnail = this.baseUrl + `api/files/${img.Name}`
                img.src = this.baseUrl + `api/files/${img.Name}`
            })
        }

        addToCart() {
            CartModule.addToCart(this.product)
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
                width: auto;
            }
        }
    }
    .details {
        padding: 60px 60px 20px;
        font-family: "Poppins", sans-serif;
        text-align: left;
        .title-h1 {
            font-weight: 800;
        }
        .price {
            font-weight: 600;
            font-size: 30px;
        }
        .description {
            color: #969696;
            font-size: 16px;
            font-weight: 400;
        }
        .value-select {
            margin: 50px 0 30px;
            display: grid;
            grid-template-columns: 47% 47%;
            .primary-button {
                width: 100%;
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
            .buttom-section {
            }
        }
    }
}
</style>