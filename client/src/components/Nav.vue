<template>
    <div class="nav">
        <div class="nav-wrapper"
             v-if="window.width > 600">
            <div class="links">
                <router-link class="link"
                             to="/">HOME</router-link>
                <router-link class="link"
                             to="/">ABOUT</router-link>
                <router-link class="link"
                             to="/products">JEWELRY</router-link>
                <router-link class="link"
                             to="/">CONTACT</router-link>
            </div>
            <div class="flex options">

                <!-- <b-button :id="`popover-1-${placement}`"
                        variant="primary">{{ placement }}</b-button> -->
                <div>
                    <img src="../assets/img/shopping_cart.svg"
                         alt=""
                         v-b-toggle.cart-sidebar
                         id="popover-1-shop"
                         class="shop">
                </div>

                <div>
                    <span>{{cartProducts.length}}</span>
                    <img src="../assets/img/face.svg"
                         alt=""
                         id="popover-1-user"
                         class="user">
                    <b-popover target="popover-1-user"
                               placement="bottom"
                               triggers="hover">
                        <img src="../assets/img/favorite.svg"
                             alt=""
                             @click="$router.push({ path: '/cart' })"
                             id="popover-favorite"
                             class="favorite">
                        <button @click="facebook">Facebook Login</button>
                        <router-link to="/dashboard">
                            <!-- v-if="user.uid === '242kUdo3WJP7WifWyzBvSmmtEMs1'"> -->
                            Dashboard
                        </router-link>
                    </b-popover>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="nav-responsive"
                 v-if="isResponsive && window.width < 600">
                <div class="links">
                    <router-link class="link"
                                 to="/">HOME</router-link>
                    <router-link class="link"
                                 to="/">ABOUT</router-link>
                    <router-link class="link"
                                 to="/products">JEWELRY</router-link>
                    <router-link class="link"
                                 to="/">CONTACT</router-link>

                    <router-link to="/dashboard">
                        <!-- v-if="user.uid === '242kUdo3WJP7WifWyzBvSmmtEMs1'"> -->
                        Dashboard
                    </router-link>
                </div>
            </div>
        </transition>

        <button type="button"
                class="icon-button menu-icon"
                @click="isResponsive = !isResponsive"
                v-if="window.width < 600">
            <MenuIcon />
        </button>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { MainModule } from '../store/main-module';
    import { AuthModule } from '../store/auth-module';
    import { CartModule } from '@/store/cart-module';

    import MenuIcon from './menu-icon.vue'

    @Component({
        components: { MenuIcon }
    })
    export default class NavComponent extends Vue {

        get user() {
            return AuthModule.user
        }

        get cartProducts() {
            return CartModule.cartProducts
        }

        get favorites() {
            return MainModule.favorites
        }

        isResponsive: boolean = false

        window: {
            width: number,
            height: number,
        } = {
                width: 0,
                height: 0
            }

        created() {
            // CartModule.fetchCart() this.window.width
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
            // this.isResponsive = this.window.width < 600
        }

        private handleResize() {
            this.window.width = window.innerWidth
            this.window.height = window.innerHeight
        }

        private facebook() {
            AuthModule.faceBook()
        }

        private removeFromCart(prod: any) {
            CartModule.removeFromCart(prod)
        }

        signOut() {
            AuthModule.signOut()
            // console.log(this.$route)
            this.$route.name !== 'Home'
                ? this.$router.push({ path: '/' })
                : null
        }

        destroyed() {
            window.removeEventListener('resize', this.handleResize)
        }

    }
</script>

<style lang="scss" scoped>
.nav {
    align-items: center;
    margin: auto;
    position: fixed;
    width: 100%;
    background: white;
    z-index: 99;
    top: 0;
    box-shadow: 0 0.25rem 0.25rem rgba(218, 218, 218, 0.25),
        inset 0 -1px 5px rgba(255, 255, 255, 0);
    .nav-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        .links {
            display: grid;
            grid-template-columns: auto auto auto auto;
            margin: 30px auto;
            width: 450px;
            .link {
                font-family: "Montserrat";
                font-size: 13px;
                font-weight: 500;
                width: 100%;
                text-align: center;
                color: black;
                text-decoration: none;
                padding: 0 30px;
            }
        }
        .options {
            position: absolute;
            right: 50px;
            img {
                width: 32px;
                height: 32px;
                cursor: pointer;
                border-radius: 30px;
            }
            .user {
                margin-left: 20px;
                .list {
                    display: flex;
                }
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .menu-icon {
        position: absolute;
        top: 30px;
        right: 40px;
    }
    .nav-responsive {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
        background: white;
        z-index: 9;
        .nav-wrapper {
            position: absolute;
            top: 0;
            .links {
                grid-template-columns: auto;
            }
            .options {
                width: 100%;
                display: flex;
                justify-content: center;
            }
        }
        .links {
            display: grid;
            grid-template-columns: auto;
            margin-top: 60px;
            .link {
                color: grey;
                font-weight: 600;
                height: 60px;
            }
        }
    }
}
</style>
