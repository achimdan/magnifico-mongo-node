<template>
    <div class="dashboard">
        <h5 class="title">
            My Dashboard
        </h5>
        <div class="cards">
            <b-card bg-variant="dark"
                    text-variant="white"
                    title="Add category">
                <b-card-text>
                    With supporting text below as a natural lead-in to additional content.
                </b-card-text>
                <b-button v-b-modal.add-category-modal
                          pill
                          variant="primary">
                    Add category
                </b-button>
            </b-card>

            <b-card bg-variant="dark"
                    text-variant="white"
                    title="Add product">
                <b-card-text>
                    With supporting text below as a natural lead-in to additional content.
                </b-card-text>
                <b-button @click="addProduct"
                          pill
                          variant="primary">
                    Add product
                </b-button>
            </b-card>
        </div>
        <div class="products">
            <b-table :table-class="'shop-table'"
                     striped
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
                        <b-carousel-slide v-for="image in data.item.Images"
                                          :key="image.Id"
                                          :img-src="baseUrl + `api/files/${image.Name}`">
                        </b-carousel-slide>

                    </b-carousel>
                </template>
                <template v-slot:cell(Category)="data">
                    <span v-if="data.item.Category">
                        {{data.item.Category.Name}}
                    </span>
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
                              class="mr-1">
                        Delete
                    </b-button>
                    <b-button size="sm"
                              @click="edit(data.item)">
                        Edit
                    </b-button>
                    <b-button size="sm"
                              @click="preview(data.item)">
                        Preview
                    </b-button>
                </template>
            </b-table>
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
            return MainModule.BASE_URL
        }

        fields = [
            { key: 'Images', class: 'image' },
            { key: 'Name', sortable: false },
            { key: 'Description' },
            { key: 'Price' },
            { key: 'Stock' },
            { key: 'Actions' }
        ]

        created() {
            MainModule.fetchProducts()
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
.dashboard {
    .title {
        margin: 0 0 20px;
        text-align: left;
    }
    .cards {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 20px;
    }
    .products {
        margin-top: 50px;
        .image {
            width: 100px;
        }
    }
}
</style>
