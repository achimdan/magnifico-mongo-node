<template>
    <div class="products">
        <h2>Catalog</h2>
        <div class="admin-card admin-table">
            <div class="setup">
                <b-button v-b-modal.add-category-modal
                        variant="primary"
                        class="main-button">
                    Add category
                </b-button>
                <b-button @click="addProduct"
                        variant="primary" 
                        class="main-button">
                    Add product
                </b-button>
            </div>

            <ul class="list-group">
                <li v-for="(product, index) in products"
                    :key="product._id"
                    class="list-group-product">
                    <div class="carousel">
                        <b-carousel :id="`carousel${product._id}`"
                                controls
                                :interval="80000000000000"
                                background="#ababab"
                                img-width="100"
                                img-height="100"
                                class="list"
                                style="text-shadow: 1px 1px 2px #333">
                            <b-carousel-slide v-for="image in product.ProductImage"
                                            :key="image.Id"
                                            :img-src="`http://localhost:3000/uploads//${image}`">
                            </b-carousel-slide>
                        </b-carousel>
                    </div>
                    <div class="info">
                        <div>
                            {{product.Name}}
                        </div>
                        <div>
                            <b-form-checkbox id="home"
                                disabled
                                v-model="product.tHome"
                                name="home">
                            </b-form-checkbox>
                        </div>
                        <div>
                            <b-form-checkbox id="stock"
                                disabled
                                v-model="product.Stock"
                                name="stock">
                            </b-form-checkbox>
                        </div>
                        <div>
                            <b-button size="sm"
                                    @click="deleteProduct(product, index, $event.target)"
                                    class="icon-button">
                                Delete
                                <font-awesome-icon :icon="['fas', 'trash-alt']"
                                    class="icon alt icon"
                                    size="lg" />
                            </b-button>
                            <b-button size="sm"
                                    class="icon-button"
                                    @click="edit(product)">
                                Edit
                                <font-awesome-icon :icon="['fas', 'pen']"
                                    class="icon alt icon"
                                    size="lg" />
                            </b-button>
                            <b-button size="sm"
                                    class="icon-button"
                                    @click="preview(product)">
                                Preview
                                <font-awesome-icon :icon="['fas', 'eye']"
                                    class="icon alt icon"
                                    size="lg" />
                            </b-button>
                        </div>
                    </div>
                </li>
            </ul>


            <!-- <b-table :table-class="'shop-table'"
                    hover
                    :fields="fields"
                    :items="products">
                <template v-slot:cell(Images)="data">
                    <b-carousel id="carousel-1"
                                controls
                                :interval="80000000000000"
                                background="#ababab"
                                img-width="100"
                                img-height="100"
                                style="text-shadow: 1px 1px 2px #333">
                        <b-carousel-slide v-for="image in data.item.ProductImage"
                                          :key="image.Id"
                                          :img-src="`http://localhost:3000/uploads//${image}`">
                        </b-carousel-slide>
                    </b-carousel>
                </template>
                <template v-slot:cell(Category)="data">
                    <span v-if="data.item.Category">
                        {{data.item.Category.Name}}
                    </span>
                </template>
                <template v-slot:cell(Home)="data">
                    <b-form-checkbox id="home"
                                    disabled
                                    v-model="data.item.Home"
                                    name="home">
                    </b-form-checkbox>
                </template>
                <template v-slot:cell(Stock)="data">
                    <b-form-checkbox id="stock"
                                    disabled
                                    v-model="data.item.Stock"
                                    name="stock">
                    </b-form-checkbox>
                </template>
                <template v-slot:cell(Actions)="data">
                    <b-button size="sm"
                            @click="deleteProduct(data.item, data.index, $event.target)"
                            class="icon-button">
                        Delete
                        <font-awesome-icon :icon="['fas', 'trash-alt']"
                                                    class="icon alt icon"
                                                    size="lg" />
                    </b-button>
                    <b-button size="sm"
                            class="icon-button"
                            @click="edit(data.item)">
                        Edit
                        <font-awesome-icon :icon="['fas', 'pen']"
                                                    class="icon alt icon"
                                                    size="lg" />
                    </b-button>
                    <b-button size="sm"
                            class="icon-button"
                            @click="preview(data.item)">
                        Preview
                        <font-awesome-icon :icon="['fas', 'eye']"
                                                    class="icon alt icon"
                                                    size="lg" />
                    </b-button>
                </template>
            </b-table> -->
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop } from "vue-property-decorator";
    import { MainModule } from '../../store/main-module';

    @Component
    export default class DashboardComponent extends Vue {

        get products() {
            return MainModule.products
        }

        get baseUrl() {
            return MainModule.BASE_URL_MONGO
        }

        get fields() {
            return MainModule.fields
        }

        created() {
            // MainModule.fetchProducts()
        }

        addProduct() {
            MainModule.setModalType('ADD')
            this.$bvModal.show('add-product-modal')
        }

        deleteProduct(item: any, index: number) {
            MainModule.deleteProduct({ item, index })
        }

        private edit(item: any) {
            MainModule.setModalType('EDIT')
            MainModule.setSelectedProduct(item)
            this.$bvModal.show('add-product-modal')
        }

        private preview(item: any) {
            this.$router.push(`/product/${item._id}`)
        }

    }
</script>

<style lang="scss" scoped>
.products {
    .setup {
        text-align: right;
        margin-bottom: 20px;
        .main-button {
            margin-left: 10px;
        }
    }
    .list-group {
        .list-group-product {
            display: flex;
            align-items: center;
            border: none;
            .carousel {
                width: 100px;
                border-radius: 10px;
            }
            .info {

            }
        }
    }
}
</style>
