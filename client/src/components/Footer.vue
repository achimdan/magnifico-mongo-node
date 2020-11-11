<template>
    <div class="footer">
        <div class="social">
            <img src="@/assets/img/facebook.svg" class="logo">      
            <img src="@/assets/img/instagram.svg" class="logo">      
            <img src="@/assets/img/pinterest.svg" class="logo">      
        </div>
        <div class="links">
            <router-link class="link"
                            to="/"
                            @click.native="isResponsive = false">
                            Home
            </router-link>
            <router-link class="link"
                            to="/"
                            @click.native="isResponsive = false">
                            About
            </router-link>
            <router-link class="link"
                            to="/products"
                            @click.native="isResponsive = false">
                            Jewelry
            </router-link>
            <router-link class="link"
                            to="/"
                            @click.native="isResponsive = false">
                            Contact
            </router-link>
        </div>
        <div class="brand">
            MAGNIFICO
            <span class="year">2020</span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component
    export default class FooterComponent extends Vue {

    }
</script>

<style lang="scss" scoped>
.footer {
    background: #161616;
    padding: 30px 0 20px;
    .social {
        width: 160px;
        margin: auto;
        display: flex;
        justify-content: space-evenly;
        .logo {
            width: 30px;
        }
    }
    .links {
        display: flex;
        justify-content: space-evenly;
        width: 400px;
        margin: 30px auto;
        .link {
            color: #888888;
            font-size: 14px;
            font-weight: bold;
        }
    }
    .brand {
        text-align: center;
        font-size: 20px;
        color: #4a4a4a;
        font-weight: 500;
        text-indent: 30px;
        .year {
            font-size: 12px;
            position: relative;
        }
    }
}
@media only screen and (max-width: 600px) {
    .footer {
        .links {
            width: 100%;
        }
    }
}
</style>
