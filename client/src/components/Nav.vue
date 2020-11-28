<template>
    <div class="nav"
         :class="{'nav-h': !hasLogo}">
        <div class="nav-wrapper"
             v-if="window.width > 600">
            <div class="links"
                 :class="{'has-logo': hasLogo}">
                <router-link class="link"
                             to="/">
                    HOME
                </router-link>
                <router-link class="link"
                             to="/">
                    ABOUT
                </router-link>
                <!-- <transition name="fade"> -->
                <router-link class="link magnifico"
                             to="/"
                             @click.native="isResponsive = false">
                    <img src="../assets/logo2.png"
                         alt=""
                         :class="{'small': !hasLogo}">
                </router-link>
                <!-- </transition> -->
                <router-link class="link"
                             to="/products">
                    JEWELRY
                </router-link>
                <router-link class="link"
                             to="/">
                    CONTACT
                </router-link>
            </div>
            <div class="flex space-around options">
                <div class="cart-option">
                    <img src="../assets/img/shopping_cart.svg"
                         alt=""
                         v-b-toggle.cart-sidebar
                         id="popover-1-shop"
                         class="shop">

                    <span class="count">{{cartProducts.length}}</span>
                </div>

                <div class="user-option">
                    <transition name="slide">
                        <button type="button"
                                v-b-modal.auth-modal
                                v-if="!user.uid"
                                class="user">
                            <img src="../assets/img/face.svg"
                                 alt="">
                        </button>
                    </transition>

                    <transition name="slide">
                        <!-- <div v-if="user.uid"> -->
                        <div>
                            <button type="button"
                                    id="popover-1-user"
                                    class="user">
                                <img :src="user.photoURL"
                                     alt="">
                            </button>

                            <b-popover :target="`popover-1-user`"
                                       placement="bottom"
                                       triggers="hover"
                                       ref="popover">
                                <div class="pop-inner">
                                    <ul class="settings">
                                        <li>
                                            <img src="../assets/img/favorite.svg"
                                                 alt=""
                                                 @click="$router.push({ path: '/cart' })"
                                                 id="popover-favorite"
                                                 class="favorite">
                                            <span class="link">Favorites</span>
                                        </li>
                                        <li>
                                            <img src="../assets/img/favorite.svg"
                                                 alt=""
                                                 @click="$router.push({ path: '/cart' })"
                                                 id="popover-favorite"
                                                 class="favorite">
                                            <router-link to="dashboard"
                                                         class="link">
                                                Dashboard
                                            </router-link>
                                        </li>
                                        <li>
                                            <img src="../assets/img/favorite.svg"
                                                 alt=""
                                                 @click="$router.push({ path: '/cart' })"
                                                 id="popover-favorite"
                                                 class="favorite">
                                            <router-link to="userAccount"
                                                         class="link">
                                                Account
                                            </router-link>
                                        </li>
                                        <li>
                                            <img src="../assets/img/favorite.svg"
                                                 alt=""
                                                 @click="$router.push({ path: '/cart' })"
                                                 id="popover-favorite"
                                                 class="favorite">
                                            <button type="button"
                                                    @click="signOut"
                                                    v-if="user.uid">
                                                Sign out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </b-popover>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
        <transition name="fade">
            <div class="nav-responsive"
                 v-if="isResponsive && window.width < 600">
                <div class="links">
                    <router-link class="link"
                                 to="/"
                                 @click.native="isResponsive = false">
                        HOME
                    </router-link>
                    <router-link class="link"
                                 to="/"
                                 @click.native="isResponsive = false">
                        ABOUT
                    </router-link>
                    <router-link class="link magnifico"
                                 to="/"
                                 @click.native="isResponsive = false">
                        MAGNIFICO
                    </router-link>
                    <router-link class="link"
                                 to="/products"
                                 @click.native="isResponsive = false">
                        JEWELRY
                    </router-link>
                    <router-link class="link"
                                 to="/"
                                 @click.native="isResponsive = false">
                        CONTACT
                    </router-link>

                    <router-link to="/dashboard"
                                 class="link"
                                 @click.native="isResponsive = false">
                        <!-- v-if="user.uid === '242kUdo3WJP7WifWyzBvSmmtEMs1'"> -->
                        Dashboard
                    </router-link>
                </div>
            </div>
        </transition>

        <div class="menu-icon"
             v-if="window.width < 600">
            <!-- <div class="cart" v-b-toggle.cart-sidebar>
                <span class="number">{{cartProducts.length}}</span>
                <font-awesome-icon :icon="['fas', 'shopping-cart']"
                                    class="icon alt" />
            </div> -->
            <button type="button"
                    class="icon-button"
                    @click="isResponsive = !isResponsive">
                <MenuIcon />
            </button>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { MainModule } from '../store/main-module';
    import { AuthModule } from '../store/auth-module';
    import { CartModule } from '../store/cart-module';

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
        offset: number = 105
        lastScrollPosition: number = 0
        hasLogo: boolean = true

        window: {
            width: number,
            height: number,
        } = {
                width: 0,
                height: 0
            }

        created() {
            window.addEventListener('resize', this.handleResize)
            this.handleResize()
        }

        mounted() {
            window.addEventListener('scroll', this.handleScroll)
            this.lastScrollPosition = window.pageYOffset
        }

        private handleScroll(event) {
            if (Math.abs(window.pageYOffset - this.lastScrollPosition) < this.offset) {
                this.hasLogo = true
            } else {
                this.hasLogo = false
            }
        }

        private handleResize() {
            this.window.width = window.innerWidth
            this.window.height = window.innerHeight
        }

        private facebook() {
            AuthModule.faceBook()
        }

        private removeFromCart(prod: any) {
            CartModule.removeProductFromCart(prod)
        }

        $refs: {
            popover: HTMLFormElement
        }

        signOut() {
            AuthModule.signOut()
            // console.log(this.$route)
            this.$refs['popover'].$emit('close')
            // this.$route.name !== 'Home'
            //     ? this.$router.push({ path: '/' })
            //     : null
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

    width: 100%;
    background: white;
    z-index: 999;
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
            grid-template-columns: repeat(5, 1fr);
            margin: 30px auto;
            width: 650px;
            align-items: center;
            .link {
                font-family: "Montserrat";
                font-size: 13px;
                font-weight: bold;
                width: 100%;
                text-align: center;
                color: #5a5a5a;
                text-decoration: none;
                padding: 0 20px;
            }
            .magnifico {
                font-size: 30px;
                font-weight: bold;
                color: #5a5a5a;
            }
        }
        .has-logo {
            grid-template-columns: repeat(5, 1fr);
            width: 650px;
        }
        .options {
            position: absolute;
            right: 50px;
            width: 100px;
            .cart-option {
                position: relative;
                img {
                    position: relative;
                    top: 3px;
                }
                .count {
                    background: #fc615d;
                    height: 19px;
                    width: 19px;
                    display: block;
                    position: absolute;
                    top: -5px;
                    right: 0;
                    font-size: 13px;
                    text-align: center;
                    font-weight: bold;
                    color: white;
                    border-radius: 30px;
                }
            }
            .user-option {
                .user {
                    border: none;
                    background: none;
                    outline: none;
                    .list {
                        display: flex;
                    }
                }
            }
            img {
                width: 32px;
                height: 32px;
                cursor: pointer;
                border-radius: 30px;
            }
        }
    }
}
.nav-h {
    height: 70px;
    position: sticky;
    .nav-wrapper {
        height: 70px;
        .magnifico {
            .small {
                width: 150px;
            }
        }
    }
}

.pop-inner {
    .settings {
        padding: 0;
        list-style: none;
        margin: 0;
        li {
            height: 30px;
            line-height: 30px;
            display: flex;
            img {
                margin-right: 10px;
                width: 20px;
            }
            .link {
                width: 100%;
                display: block;
                color: #5a5a5a;
                cursor: pointer;
                text-decoration: none;
            }
            button {
                border: none;
                background: none;
                padding: 0;
                color: #5a5a5a;
                width: 100%;
                text-align: left;
            }
            &:hover {
                .link {
                    color: #fc615d;
                }
                button {
                    color: #fc615d;
                }
            }
            &:last-child {
                border-top: 1px solid;
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .nav {
        height: 60px;
        box-shadow: none;
    }
    .menu-icon {
        // position: absolute;
        // top: 10px;
        // right: 0px;
        display: flex;
        align-items: center;
        background: white;
        .cart {
            position: relative;
            // color: #232323;
            top: 2px;
            color: #565656;
            padding: 5px 15px 5px 10px;
            .number {
                position: absolute;
                top: -5px;
                right: 0px;

                font-size: 12px;
                font-weight: 600;
                text-align: center;
                color: white;
                &:before {
                    content: "";
                    background: #fc615d;
                    border-radius: 50px;
                    width: 15px;
                    height: 15px;
                }
            }
            .icon {
                font-size: 1.233333em;
            }
        }
        .icon-button {
            padding: 5px;
        }
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
            padding-left: 20px;
            .link {
                color: grey;
                font-weight: 600;
                height: 60px;
                text-transform: uppercase;
            }
        }
    }
}
</style>
