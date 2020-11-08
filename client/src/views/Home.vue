<template>
    <div>
        <section class="banner">
            <div class="logo">
                Magnifico
            </div>
        </section>
        <section class="home-container">
            <div class="main-container main-product">
                <div class="product">
                    <div class="item">
                        <!-- <div class="description">
                            <p>{{item.Name}}</p>
                            <p>from: {{item.Price}}</p>
                        </div> -->

                        <!-- <img v-if="products.find(el => el.Id === 18)"
                             :src="baseUrl + `api/files/${products.find(el => el.Id === 23).Images.find(el => el.Primary).Name}`"
                             alt=""> -->
                    </div>
                    <div class="info">
                        <h3>Lorem ipsum dolor</h3>
                        <span class="text">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit vel vero perferendis nostrum amet ipsam corrupti repellendus consequatur repudiandae voluptatem labore sed pariatur fugit, cum nisi ex blanditiis delectus nihil?
                        </span>
                        <button type="button"
                                class="primary-button primary-button-sm">
                            Learn more
                        </button>
                    </div>
                </div>
                <!-- {{products.find(el => el.Id === 23)}} -->
                <!-- <img v-if="products.find(el => el.Id === 23).Images[2].Name"
                     :src="baseUrl + `api/files/${products.find(el => el.Id === 23).Images[2].Name}`"
                     alt=""
                     class="back-img"> -->
            </div>
        </section>
        <section class="main-container">
            <h2>Lorem ipsum dolor sit amet.</h2>
            <VueSlickCarousel :arrows="true"
                              :dots="false">
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eos voluptate voluptates veritatis velit temporibus obcaecati, soluta rem. Quo aliquam atque cum eius ad quia ipsa magni perspiciatis numquam aperiam!</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eos voluptate voluptates veritatis velit temporibus obcaecati, soluta rem. Quo aliquam atque cum eius ad quia ipsa magni perspiciatis numquam aperiam!</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eos voluptate voluptates veritatis velit temporibus obcaecati, soluta rem. Quo aliquam atque cum eius ad quia ipsa magni perspiciatis numquam aperiam!</div>
            </VueSlickCarousel>
        </section>
        <section class="home-products main-container">
            <ListProduct v-for="product in products.filter(el => el.Home).slice(0, 4)"
                         :key="product.Id"
                         :product="product" />
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { MainModule } from '../store/main-module';
    import ListProduct from '../components/list-product.vue';

    @Component({
        components: { ListProduct }
    })
    export default class HomeComponent extends Vue {

        get baseUrl() {
            return MainModule.BASE_URL
        }

        get products() {
            return MainModule.products
        }

        created() {
            MainModule.fetchProducts()
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
    .logo {
        text-align: center;
        font-size: 30px;
        text-transform: uppercase;
    }
}
.home-container {
    background: #f5f5f5;
    .main-product {
        position: relative;
        padding-top: 100px;
        .product {
            display: grid;
            grid-template-columns: 500px auto;
            height: 500px;
            .item {
                z-index: 9;
                padding: 20px;
                background: white;
                position: relative;
                top: -70px;
                img {
                    width: 100%;
                }
            }
            .info {
                z-index: 9;
                margin: 50px 50px 50px 200px;
                background: white;
                padding: 40px;
                text-align: left;
                height: 300px;
                h3 {
                    font-family: "Poppins", sans-serif;
                    font-weight: 900;
                }
                .text {
                    margin: 10px 0 20px;
                    display: block;
                }
            }
        }
        .back-img {
            position: absolute;
            top: -60px;
            left: 0;
            right: 0;
            margin: auto;
            width: 500px;
        }
    }
}
.home-products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    margin-top: 100px;
}
</style>
