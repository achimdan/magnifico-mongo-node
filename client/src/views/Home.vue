<template>
    <div>
        <section class="banner">
            <div class="banner-container">
                <div class="view-catalog">
                    <span class="text">
                        View our hand made products from the catalog !
                    </span>
                    <router-link class="primary-button view"
                                 to="/products">
                        VIEW CATALOG
                    </router-link>
                </div>
            </div>
        </section>

        <MainComp />

        <section class="main-container">
            <h1 class="new">New Arrivals</h1>
            <div class="home-products">
                <!-- <ListProduct v-for="product in products" -->
                <ListProduct v-for="product in products.filter(el => el.Home)"
                             :key="product._id"
                             :product="product"
                             :fb="true" />
            </div>
        </section>

        <NewsLetter />

        <section class="main-container carousel">
            <h2>WHAT THEY'RE SAYING</h2>
            <VueSlickCarousel :arrows="true"
                              :dots="false">
                <div class="opinions">
                    <div class="comments">
                        Dolor sit amet ipsum varius, ut tempor augue pretium. Fusce est magna, eleifend et enim sit amet, tempor scelerisque condimentum massa id massa. Etiam vel iaculis mi, at aliquet urna. Dolorsitesteste amet ipsum varius, ut tempor augue pretium. Fusce est magna, eleifend et enim sit amet, tempor scelerisque condimentum massa id massa. Etiam vel iaculis mi, at aliquet.
                    </div>
                    <div class="avatar">
                        <b-avatar src="https://placekitten.com/300/300"
                                  size="3em"></b-avatar>
                        <span class="text">VICTORIA SYDNEY</span>
                    </div>
                </div>
                <div class="opinions">
                    <div class="comments">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem corrupti earum assumenda? Fuga cum eius quam perspiciatis reiciendis ut, in possimus eos iste blanditiis amet molestiae iure dolore natus consectetur voluptate magnam praesentium id nemo. Asperiores non odit sit dolores?
                    </div>
                    <div class="avatar">
                        <b-avatar src="https://placekitten.com/300/300"
                                  size="3em"></b-avatar>
                        <span class="text">VICTORIA SYDNEY</span>
                    </div>
                </div>
                <div class="opinions">
                    <div class="comments">
                        Dolor sit amet ipsum varius, ut tempor augue pretium. Fusce est magna, eleifend et enim sit amet, tempor scelerisque condimentum massa id massa. Etiam vel iaculis mi, at aliquet urna. Dolorsitesteste amet ipsum varius, ut tempor augue pretium. Fusce est magna, eleifend et enim sit amet, tempor scelerisque condimentum massa id massa. Etiam vel iaculis mi, at aliquet.
                    </div>
                    <div class="avatar">
                        <b-avatar src="https://placekitten.com/300/300"
                                  size="3em"></b-avatar>
                        <span class="text">VICTORIA SYDNEY</span>
                    </div>
                </div>
            </VueSlickCarousel>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { MainModule } from '../store/main-module';
    import MainComp from './Admin/components/main-com.vue';
    import ListProduct from '@/components/list-product.vue';
    import NewsLetter from '@/components/news-letter.vue';

    @Component({
        components: { MainComp, ListProduct, NewsLetter }
    })
    export default class HomeComponent extends Vue {

        get baseUrl() {
            return MainModule.BASE_URL
        }

        get products() {
            return MainModule.products
        }

        created() {
            // MainModule.fetchProducts()
        }

    }
</script>

<style lang="scss" scoped>
@import "@/assets/commons.scss";
.banner {
    height: 600px;
    padding: 180px;
    background: url("../../src/assets/bg.png") center 40% no-repeat;
    background-size: cover;
    .banner-container {
        margin: 50px auto;
        .view-catalog {
            font-size: 30px;
            text-transform: uppercase;
            width: 490px;
            font-weight: 700;
            .text {
                font-family: "Poppins", sans-serif;
            }
            .view {
                text-align: center;
                width: 250px;
                font-size: 23px;
                line-height: 58px;
                margin-top: 20px;
                &:hover {
                    text-decoration: none;
                    background: #161616;
                }
            }
        }
    }
}

.new {
    font-family: "Poppins", sans-serif;
    font-weight: 800;
}

.home-products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    margin: 60px auto 150px !important;
}

.carousel {
    margin: 150px auto;
    h2 {
        font-family: "Poppins", sans-serif;
        font-weight: 700;
    }
    .opinions {
        width: 70% !important;
        outline: none;
        .comments {
            margin-top: 30px;
        }
        .avatar {
            margin-top: 20px;
            .text {
                font-size: 13px;
                font-weight: 600;
                margin-left: 10px;
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .banner {
        height: auto;
        padding: 0px;
        background: none;
        position: absolute;
        z-index: 99;
        .banner-container {
            width: 100%;
            .view-catalog {
                font-size: 30px;
                text-transform: uppercase;
                width: 100%;
                .text {
                    font-family: "Poppins", sans-serif;
                }
                .view {
                    text-align: center;
                    width: 250px;
                    font-size: 23px;
                    line-height: 58px;
                    margin-top: 20px;
                    &:hover {
                        text-decoration: none;
                        background: #161616;
                    }
                }
            }
        }
    }
    .home-products {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>
