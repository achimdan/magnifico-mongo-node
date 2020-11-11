<template>
    <div class="menu">
        <div class="links">
            <router-link class="link"
                        to="/">
                <font-awesome-icon :icon="['fas', 'eye']"
                                class="icon"
                                    />
                <span class="text">
                    Home
                </span>
            </router-link>
            <router-link class="link"
                        to="/dashboard">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"
                                        class="icon"
                                            />
                        <span class="text">
                            Dashboard
                        </span>
            </router-link>
            <router-link class="link"
                        to="/catalog">
                        <font-awesome-icon :icon="['fas', 'pen']"
                                            class="icon alt"
                                                />
                        <span class="text">
                            Catalog
                        </span>
            </router-link>
            <router-link class="link"
                        to="/dashboard">
                        <font-awesome-icon :icon="['fas', 'eye']"
                                            class="icon alt"
                                                />
                        <span class="text">
                            Orders
                        </span>
            </router-link>
            <router-link class="link"
                        to="/components">
                        <font-awesome-icon :icon="['fas', 'trash-alt']"
                                            class="icon alt"
                                                />
                        <span class="text">
                            Components
                        </span>
            </router-link>
            <router-link class="link"
                        to="/profile">
                        <font-awesome-icon :icon="['fas', 'pen']"
                                            class="icon alt"
                                                />
                        <span class="text">
                            Profile
                        </span>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";

    @Component({
        components: {  }
    })
    export default class LeftNavComponent extends Vue {

    }
</script>

<style lang="scss" scoped>
.menu {
    background: #F9F9F9;            
    .links {
        margin-top: 70px;
        .link {
            color: black;
            text-align: left;
            display: block;
            text-indent: 50px;
            height: 50px;
            line-height: 50px;
            opacity: .5;
            font-size: 13px;
            font-weight: bold;
            .icon {
                font-size: 15px;
            }
            .text {
                margin-left: 10px;
            }
            &:hover {
                background: #eaeaea;
                text-decoration: none;
                .icon {
                    color: #007bff;
                }
            }
        }
    }
}
</style>
