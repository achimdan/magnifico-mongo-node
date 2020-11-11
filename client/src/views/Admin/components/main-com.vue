<template>
    <section class="home-container">
        <div class="main-container main-product">
            <div class="product">
                <div class="item">
                    <!-- <div class="description">
                        <p>{{item.Name}}</p>
                        <p>from: {{item.Price}}</p>
                    </div> -->

                    <!-- <img src="../../../assets/handmade.jpg"
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
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { AuthModule } from "../../../store/auth-module";

    @Component({
        components: {  }
    })
    export default class MainComAdminComponent extends Vue {
        get user() {
            return AuthModule.user
        }
    }
</script>

<style lang="scss" scoped>
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
                // background: white;
                position: relative;
                top: -70px;
                background: url('../../../assets/handmade4.jpg') no-repeat;
                background-size: cover;
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
@media only screen and (max-width: 600px) {
    .home-container {
        background: #f5f5f5;
        .main-product {
            padding-top: 0;
            margin: 0;
            .product {
                grid-template-columns: auto;
                height: auto;
                .item {
                    top: 0;
                    height: 250px;
                }
                .info {
                    height: auto;
                    margin: 0;
                }
            }
        }
    }
}
</style>
