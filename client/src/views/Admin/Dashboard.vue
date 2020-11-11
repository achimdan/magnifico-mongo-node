<template>
    <div class="dashboard">
        <h2>Dasboard</h2>
        
        <div class="products">           

            <b-table :table-class="'shop-table'"
                     striped
                     hover
                     :fields="fields"
                     :items="products">
                <template v-slot:cell(Images)="data">
                    <!-- <img :src="'http://localhost:3000/uploads/' + data.item.ProductImage[0]" alt=""> -->
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
            return MainModule.BASE_URL_MONGO
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
.products {
    .setup {
        text-align: right;
        margin-bottom: 20px;
        .main-button {
            margin-left: 10px;
        }
    }
}
</style>