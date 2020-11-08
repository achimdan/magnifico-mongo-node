<template>
    <div class="list-card">
        <ListCart />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { CartModule } from '../store/cart-module';
    import ListCart from '../components/list-cart.vue'

    @Component({
        components: { ListCart }
    })
    export default class CartComponent extends Vue {

    }
</script>

<style lang="scss" scoped>
</style>
