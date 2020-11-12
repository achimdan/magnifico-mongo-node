<template>
    <div class="admin">
        <!-- <Header />  -->
        <div class="admin-container">
            <LeftNav />
            <div class="admin-content">

                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    import Header from './components/Header.vue'
    import LeftNav from './components/LeftNav.vue'

    @Component({
        components: { Header, LeftNav }
    })
    export default class AdminComponent extends Vue {

    }
</script>

<style lang="scss" scoped>
.admin {
    height: 100%;
    .admin-container {
        height: 100%;
        display: grid;
        grid-template-columns: 270px auto;
        .admin-content {
            background: #eeeeee;
            .content {
                padding: 30px;
                .products {
                    .setup {
                        text-align: right;
                        margin-bottom: 20px;
                        .main-button {
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
