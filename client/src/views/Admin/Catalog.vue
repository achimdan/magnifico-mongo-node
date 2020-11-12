<template>
    <div class="products">
        <div class="admin-card admin-table">
            <h3>Products (30)</h3>
            <div class="header-card">
                <!-- :id="product._id"
                             :name="product._id"
                             v-model="product.IsSelected" -->
                <b-form-checkbox :value="true"
                                 size="lg"
                                 :unchecked-value="false">
                </b-form-checkbox>
                <div class="filter-products">
                    <b-form-input v-model="searchProduct"
                                  placeholder="Search for product"
                                  class="search-input">
                    </b-form-input>
                    <div>
                        Filter by:
                    </div>
                </div>
            </div>

            <ul class="list-group">
                <li v-for="(product, index) in products"
                    :key="product._id"
                    class="list-group-product">
                    <div class="flex mt-3">
                        <b-form-checkbox :id="product._id"
                                         size="lg"
                                         :name="product._id"
                                         v-model="product.IsSelected"
                                         :value="true"
                                         :unchecked-value="false">
                        </b-form-checkbox>
                    </div>
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
                        <div class="col1">
                            <span class="name">
                                {{product.Name}}
                            </span>
                            <span class="price">
                                <font-awesome-icon :icon="['fas', 'dollar-sign']"
                                                   class="icon" />
                                {{product.Price}}
                            </span>
                        </div>
                        <div class="col1">
                            <span class="drops">
                                Display on home
                            </span>
                            <dropdown class="my-dropdown-toggle"
                                      :options="arrayOfObjects"
                                      :selected="object"
                                      v-on:updateOption="methodToRunOnSelect">
                            </dropdown>
                        </div>
                        <div class="col1">
                            <span class="drops">
                                In stock
                            </span>
                            <dropdown class="my-dropdown-toggle"
                                      :options="arrayOfObjects"
                                      :selected="object"
                                      v-on:updateOption="methodToRunOnSelect">
                            </dropdown>
                        </div>
                        <div class="col2">
                            <b-dropdown size="lg"
                                        menu-class="b-dropdown"
                                        toggle-class="text-decoration-none"
                                        no-caret>
                                <template #button-content>
                                    <font-awesome-icon :icon="['fas', 'ellipsis-h']"
                                                       class="icon alt icon"
                                                       size="lg" />
                                </template>
                                <b-dropdown-item @click="deleteProduct(product, index, $event.target)">
                                    <font-awesome-icon :icon="['fas', 'trash-alt']"
                                                       class="icon alt icon"
                                                       size="lg" />
                                    Delete
                                </b-dropdown-item>
                                <b-dropdown-item @click="edit(product)">
                                    <font-awesome-icon :icon="['fas', 'pen']"
                                                       class="icon alt icon"
                                                       size="lg" />
                                    Edit
                                </b-dropdown-item>
                                <b-dropdown-item @click="preview(product)">
                                    <font-awesome-icon :icon="['fas', 'eye']"
                                                       class="icon alt icon"
                                                       size="lg" />
                                    Preview
                                </b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Prop, Watch } from "vue-property-decorator";
    import { MainModule } from '../../store/main-module';
    import dropdown from 'vue-dropdowns';

    @Component({
        components: { dropdown }
    })
    export default class DashboardComponent extends Vue {

        get products() {
            return MainModule.products
        }

        get baseUrl() {
            return MainModule.BASE_URL_MONGO
        }

        get object() {
            return { name: 'Enable' }
        }
        set object(ev) {

        }

        @Watch('searchProduct')
        searchProductInput(ev) {
            console.log(ev)
        }

        searchProduct: string = ''

        arrayOfObjects = [
            { name: 'Enable' },
            { name: 'Disable' },
        ]

        created() {
            if (this.$route.query.productId) {
                setTimeout(() => {
                    this.getProductModalInfo()
                    this.$bvModal.show('add-product-modal')
                }, 300)
            }
            // this.$route.
        }

        private getProductModalInfo() {
            const productId = this.$route.query.productId
            console.log(productId)
            MainModule.setModalType('EDIT')
            MainModule.setSelectedProduct(MainModule.products.find((el: any) => el._id === productId ? el : null))
        }

        private methodToRunOnSelect(payload) {
            this.object = payload;
        }

        private edit(item: any) {
            MainModule.setModalType('EDIT')
            MainModule.setSelectedProduct(item)
            this.$bvModal.show('add-product-modal')
            this.$router.push({ path: 'catalog', query: { productId: `${item._id}`, modal: 'add-product-modal' } })
        }


        private deleteProduct(item: any, index: number) {
            MainModule.deleteProduct({ item, index })
        }

        private preview(item: any) {
            this.$router.push(`/product/${item._id}`)
        }

    }
</script>

<style lang="scss" scoped>
.products {
    .header-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        border-bottom: 2px solid #eeeeee;
        padding-bottom: 30px;
        h2 {
            font-size: 24px;
            margin: 0;
        }
    }
    .filter-products {
        display: flex;
        justify-content: flex-end;
        .search-input {
            width: 300px;
            margin-right: 30px;
        }
    }
    .list-group {
        .list-group-product {
            align-items: center;
            border: none;
            margin-bottom: 20px;
            display: grid;
            grid-template-columns: 50px 120px auto;
            // box-shadow: -2px 1px 10px 0px #eaeaea;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
            .carousel {
                width: 100px;
                border-radius: 10px;
                margin-right: 20px;
            }
            .info {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                .col1 {
                    display: flex;
                    flex-flow: column;
                    .name {
                        margin-bottom: 10px;
                        font-size: 18px;
                        text-transform: capitalize;
                        font-weight: 500;
                    }
                    .price {
                        font-weight: 600;
                    }
                }
                .col2 {
                    display: flex;
                    align-items: center;
                }
                .drops {
                    font-size: 13px;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
