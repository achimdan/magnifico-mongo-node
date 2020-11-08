<template>
    <div class="main-container products-container">
        <div class="filter">
            <Dropdown :options="categories"
                      :name="'All'"
                      :label="false"
                      v-model="category" />
        </div>
        <div class="products">
            <ListProduct v-for="product in products"
                         :key="product.Id"
                         :product="product" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Watch } from "vue-property-decorator";
    import Dropdown from '@/components/Dropdown.vue';
    import ListProduct from '../components/list-product.vue';
    import { MainModule } from '../store/main-module';

    @Component({
        components: { Dropdown, ListProduct }
    })
    export default class ProductsComponent extends Vue {

        get categories() {
            return [{ Id: 0, Name: 'All' }, ...MainModule.categories]
        }

        get products() {
            console.log(this.category.Name)
            if (this.category.Name === 'All') {
                return MainModule.products
            } else {
                return MainModule.products.filter((el: any) => {
                    if (el.Category && el.Category.Id === this.category.Id) {
                        return el
                    }
                })
            }
        }

        @Watch('category')
        setCatergory() {
            this.$router.replace({ name: 'Products', query: { orderby: this.category.Name } })
        }

        category: any = {}

        created() {
            MainModule.fetchCategories()
            MainModule.fetchProducts()
        }

    }
</script>

<style lang="scss" scoped>
@import "@/assets/commons.scss";

.products-container {
    display: grid;
    grid-template-rows: auto auto;
    .filter {
        width: 150px;
        margin-bottom: 30px;
    }
    .products {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 40px;
    }
}

@media only screen and (max-width: 600px) {
    .products-container {
        .products {
            grid-template-columns: auto;
        }
    }
}
</style>
